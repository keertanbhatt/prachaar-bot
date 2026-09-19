import {
  STATIC_SCHEMES,
  getSchemeById,
  getSchemeByOrder,
  type StaticScheme,
} from "../data/static-schemes";
import { parseGlobalCommand, parseIntent } from "./intentParser";
import {
  BOT_DISPLAY_NAME,
  type DemoChatResult,
  type DemoReply,
  type DemoSession,
  newSessionId,
} from "./demoTypes";

const sessions = new Map<string, DemoSession>();

const WELCOME = `નમસ્તે 👋\n\n*${BOT_DISPLAY_NAME}*\n\nનીચેની યોજનાઓમાંથી એક પસંદ કરો અથવા નંબર (1–14) લખો.\n\n\`menu\` · \`back\` · \`help\``;

function textReply(text: string): DemoReply {
  return { kind: "text", text };
}

function wrap(session: DemoSession, replies: DemoReply[]): DemoChatResult {
  return {
    sessionId: session.id,
    replies,
    state: session.state,
    schemeId: session.schemeId,
  };
}

function toSchemeSelection(
  session: DemoSession,
  withWelcome: boolean,
): DemoChatResult {
  session.state = "SCHEME_SELECTION";
  session.schemeId = undefined;

  const lines = STATIC_SCHEMES.map(
    (s) =>
      `${s.order}. ${s.nameGu} (${s.onlineStatus === "open" ? "ઓપન" : "બંધ"})`,
  ).join("\n");

  const body = withWelcome ? `${WELCOME}\n\n${lines}` : lines;

  const rows = STATIC_SCHEMES.map((s) => ({
    id: `scheme_${s.order}`,
    title: `${s.order}. ${s.nameGu}`.slice(0, 24),
    description: s.onlineStatus === "open" ? "ઓનલાઇન અરજી ઓપન" : "બંધ",
  }));

  return wrap(session, [
    {
      kind: "interactive_list",
      header: "યોજના સૂચિ",
      body,
      buttonLabel: "યોજના પસંદ કરો",
      rows,
    },
  ]);
}

function toSchemeMenu(session: DemoSession, scheme: StaticScheme): DemoChatResult {
  session.state = "SCHEME_MENU";

  const menuLines = scheme.menuOptions
    .filter((o) => o.key !== "main_menu")
    .sort((a, b) => a.order - b.order)
    .map((o) => `${o.order}. ${o.labelGu}`);
  menuLines.push("0. મુખ્ય મેનુ");

  const body = `✅ *${scheme.nameGu}*\n\nમાહિતી પસંદ કરો:\n\n${menuLines.join("\n")}`;

  const rows = scheme.menuOptions
    .filter((o) => o.special !== "main_menu" && o.key !== "main_menu")
    .sort((a, b) => a.order - b.order)
    .map((o) => ({
      id: `opt_${o.key}`,
      title: o.labelGu.slice(0, 24),
    }));
  rows.push({ id: "opt_main_menu", title: "મુખ્ય મેનુ" });

  return wrap(session, [
    {
      kind: "interactive_list",
      header: scheme.nameGu.slice(0, 60),
      body,
      buttonLabel: "વિકલ્પ પસંદ કરો",
      rows,
    },
  ]);
}

function goBack(session: DemoSession): DemoChatResult {
  if (session.state === "SCHEME_DETAIL" && session.schemeId) {
    session.state = "SCHEME_MENU";
    const scheme = getSchemeById(session.schemeId);
    if (scheme) return toSchemeMenu(session, scheme);
  }
  session.schemeId = undefined;
  return toSchemeSelection(session, false);
}

function handleSchemeSelection(session: DemoSession, text: string): DemoChatResult {
  let order: number | null = null;
  const listMatch = /^scheme_(\d+)$/.exec(text);
  if (listMatch) {
    order = parseInt(listMatch[1], 10);
  } else {
    const intent = parseIntent(text);
    if (intent.type === "NUMBER") order = intent.value;
  }

  if (order === null || order < 1 || order > STATIC_SCHEMES.length) {
    return wrap(session, [
      textReply("કૃપા કરીને 1 થી 14 વચ્ચેની યોજના પસંદ કરો."),
    ]);
  }

  const scheme = getSchemeByOrder(order);
  if (!scheme) return wrap(session, [textReply("યોજના મળી નહીં.")]);

  session.schemeId = scheme.id;
  session.state = "SCHEME_MENU";
  return toSchemeMenu(session, scheme);
}

function handleSchemeMenu(session: DemoSession, text: string): DemoChatResult {
  if (!session.schemeId) return toSchemeSelection(session, false);
  const scheme = getSchemeById(session.schemeId);
  if (!scheme) return toSchemeSelection(session, false);

  let key: string | null = null;
  const optMatch = /^opt_(.+)$/.exec(text);
  if (optMatch) {
    key = optMatch[1];
  } else {
    const intent = parseIntent(text, {
      availableOptionKeys: scheme.menuOptions.map((o) => o.key),
    });
    if (intent.type === "NUMBER") {
      if (intent.value === 0) {
        session.schemeId = undefined;
        return toSchemeSelection(session, false);
      }
      const opt = scheme.menuOptions.find((o) => o.order === intent.value);
      key = opt?.key ?? null;
    } else if (intent.type === "SECTION_KEY") {
      key = intent.key;
    }
  }

  if (!key) {
    return wrap(session, [
      textReply("કૃપા કરીને મેનૂમાંથી એક વિકલ્પ પસંદ કરો."),
    ]);
  }

  if (key === "main_menu") {
    session.schemeId = undefined;
    return toSchemeSelection(session, false);
  }

  const option = scheme.menuOptions.find((o) => o.key === key);
  if (!option) return wrap(session, [textReply("અમાન્ય વિકલ્પ.")]);

  if (option.special === "downloads") {
    session.state = "SCHEME_DETAIL";
    return wrap(session, [
      {
        kind: "documents",
        title: `${scheme.nameGu} — ડાઉનલોડ`,
        items: [
          {
            label: scheme.documents.applicationFormLabel,
            url: scheme.documents.applicationFormUrl ?? "#",
            note: scheme.documents.applicationFormUrl
              ? undefined
              : "PDF ટૂંક સમયમાં અપલોડ થશે",
          },
          {
            label: scheme.documents.attachmentsLabel,
            url: scheme.documents.attachmentsUrl ?? "#",
            note: scheme.documents.attachmentsUrl ? undefined : "ટૂંક સમયમાં",
          },
          {
            label: scheme.documents.faqLabel,
            url: scheme.documents.faqUrl ?? "#",
            note: scheme.documents.faqUrl ? undefined : "ટૂંક સમયમાં",
          },
        ],
      },
      textReply(
        `🟢 *ઓનલાઇન અરજી:* ${scheme.onlineStatus === "open" ? "ઓપન" : "બંધ"}\n\n0 અથવા \`menu\` — પાછા`,
      ),
    ]);
  }

  if (option.sectionKey && scheme.sections[option.sectionKey]) {
    session.state = "SCHEME_DETAIL";
    const title = option.labelGu;
    const body = scheme.sections[option.sectionKey] ?? "";
    return wrap(session, [
      textReply(
        `*${title}*\n\n${body}\n\n---\n0 · મુખ્ય મેનુ\n\`back\` · યોજના મેનુ`,
      ),
    ]);
  }

  return wrap(session, [
    textReply("આ વિભાગ માટે માહિતી હજુ અપડેટ થવાની બાકી છે."),
  ]);
}

export function startDemoSession(): DemoChatResult {
  const session: DemoSession = {
    id: newSessionId(),
    state: "WELCOME",
    updatedAt: Date.now(),
  };
  sessions.set(session.id, session);
  return toSchemeSelection(session, true);
}

export function resetDemoSession(sessionId: string): DemoChatResult | null {
  const session = sessions.get(sessionId);
  if (!session) return null;
  session.state = "WELCOME";
  session.schemeId = undefined;
  session.updatedAt = Date.now();
  return toSchemeSelection(session, true);
}

export function sendDemoMessage(
  sessionId: string,
  rawText: string,
): DemoChatResult {
  const session = sessions.get(sessionId);
  if (!session) throw new Error("Session not found");

  const text = rawText.trim();
  session.updatedAt = Date.now();

  const global = parseGlobalCommand(text);
  if (global?.type === "GLOBAL") {
    if (global.command === "HELP") {
      return wrap(session, [
        textReply(
          "📌 *મદદ*\n• નંબર અથવા સૂચિ પસંદ કરો\n• `menu` — યોજના સૂચિ\n• `back` — પાછા\n• `help` — આ સંદેશ",
        ),
      ]);
    }
    if (global.command === "MENU" || global.command === "START") {
      session.schemeId = undefined;
      return toSchemeSelection(session, false);
    }
    if (global.command === "BACK") {
      return goBack(session);
    }
  }

  if (session.state === "WELCOME") {
    return toSchemeSelection(session, true);
  }
  if (session.state === "SCHEME_SELECTION") {
    return handleSchemeSelection(session, text);
  }
  if (session.state === "SCHEME_MENU" || session.state === "SCHEME_DETAIL") {
    return handleSchemeMenu(session, text);
  }

  return toSchemeSelection(session, true);
}

export type { DemoChatResult, DemoReply };
