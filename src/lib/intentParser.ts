import { extractNumber, normalizeText } from "./textNormalizer";

export type ParsedIntent =
  | { type: "GLOBAL"; command: "HELP" | "MENU" | "BACK" | "START" }
  | { type: "NUMBER"; value: number }
  | { type: "SECTION_KEY"; key: string }
  | { type: "UNKNOWN"; raw: string };

export type IntentContext = {
  availableOptionKeys?: string[];
};

const GLOBAL_COMMANDS = {
  HELP: ["help", "મદદ", "मदद", "सहायता"],
  MENU: ["menu", "મેનુ", "मेनू", "main menu", "મુખ્ય મેનુ"],
  BACK: ["back", "વાપસ", "वापस", "પાછા"],
  START: ["start", "hi", "hello", "hey", "નમસ્તે", "namaste"],
} as const;

const SECTION_ALIASES: Record<string, string[]> = {
  purpose: ["purpose", "હેતુ", "about"],
  eligibility: ["eligibility", "પાત્રતા", "patrata", "પાત્ર"],
  benefits: ["benefits", "લાભ", "labh"],
  documents: ["documents", "દસ્તાવેજ", "dastavez"],
  procedure: ["procedure", "કાર્યપદ્ધતિ", "process"],
  whereToApply: ["where", "ક્યાંથી", "apply"],
  downloads: ["download", "ડાઉનલોડ", "form", "faq"],
  main_menu: ["main menu", "મુખ્ય મેનુ", "home"],
};

function matchesAny(text: string, phrases: readonly string[]): boolean {
  return phrases.some(
    (p) => text === normalizeText(p) || text.includes(normalizeText(p)),
  );
}

export function parseGlobalCommand(text: string): ParsedIntent | null {
  const normalized = normalizeText(text);
  if (matchesAny(normalized, GLOBAL_COMMANDS.HELP)) {
    return { type: "GLOBAL", command: "HELP" };
  }
  if (matchesAny(normalized, GLOBAL_COMMANDS.MENU)) {
    return { type: "GLOBAL", command: "MENU" };
  }
  if (matchesAny(normalized, GLOBAL_COMMANDS.BACK)) {
    return { type: "GLOBAL", command: "BACK" };
  }
  if (matchesAny(normalized, GLOBAL_COMMANDS.START)) {
    return { type: "GLOBAL", command: "START" };
  }
  return null;
}

export function parseIntent(text: string, context?: IntentContext): ParsedIntent {
  const trimmed = text.trim();
  if (!trimmed) return { type: "UNKNOWN", raw: text };

  const global = parseGlobalCommand(trimmed);
  if (global) return global;

  const num = extractNumber(trimmed);
  if (num !== null) return { type: "NUMBER", value: num };

  const normalized = normalizeText(trimmed);
  const available = new Set(
    context?.availableOptionKeys ?? Object.keys(SECTION_ALIASES),
  );
  for (const [key, phrases] of Object.entries(SECTION_ALIASES)) {
    if (!available.has(key)) continue;
    if (phrases.some((p) => normalized.includes(normalizeText(p)))) {
      return { type: "SECTION_KEY", key };
    }
  }

  return { type: "UNKNOWN", raw: trimmed };
}
