import { useCallback, useEffect, useRef, useState } from "react";
import {
  type DemoChatResult,
  type DemoReply,
  resetDemoSession,
  sendDemoMessage,
  startDemoSession,
} from "./lib/demoBot";
import { ChatHeader } from "./components/ChatHeader";
import { ChatInput } from "./components/ChatInput";
import { DemoBanner } from "./components/DemoBanner";
import { InteractiveListSheet } from "./components/InteractiveListSheet";
import { MessageList } from "./components/MessageList";
import { TypingIndicator } from "./components/TypingIndicator";

export type ChatMessage = {
  id: string;
  direction: "in" | "out";
  time: string;
  reply: DemoReply;
};

function nowTime() {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function repliesToMessages(replies: DemoReply[], direction: "in" | "out"): ChatMessage[] {
  return replies.map((reply, i) => ({
    id: `${Date.now()}-${i}-${Math.random()}`,
    direction,
    time: nowTime(),
    reply,
  }));
}

export default function App() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [listSheet, setListSheet] = useState<Extract<
    DemoReply,
    { kind: "interactive_list" }
  > | null>(null);
  const booted = useRef(false);

  const applyBotResult = useCallback((result: DemoChatResult) => {
    setSessionId(result.sessionId);
    setMessages((prev) => [
      ...prev,
      ...repliesToMessages(result.replies, "in"),
    ]);
  }, []);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    const boot = async () => {
      setTyping(true);
      await new Promise((r) => setTimeout(r, 400));
      applyBotResult(startDemoSession());
      setTyping(false);
    };
    void boot();
  }, [applyBotResult]);

  const sendText = async (text: string) => {
    if (!sessionId || !text.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `out-${Date.now()}`,
        direction: "out",
        time: nowTime(),
        reply: { kind: "text", text: text.trim() },
      },
    ]);
    setTyping(true);
    try {
      await new Promise((r) => setTimeout(r, 350));
      const result = sendDemoMessage(sessionId, text.trim());
      applyBotResult(result);
    } finally {
      setTyping(false);
    }
  };

  const onListSelect = (rowId: string) => {
    setListSheet(null);
    void sendText(rowId);
  };

  const onReset = () => {
    if (!sessionId) return;
    setTyping(true);
    setMessages([]);
    const result = resetDemoSession(sessionId);
    if (result) applyBotResult(result);
    setTyping(false);
  };

  return (
    <div className="phone-frame">
      <DemoBanner />
      <div className="chat-app">
        <ChatHeader onReset={onReset} />
        <MessageList
          messages={messages}
          onOpenList={(list) => setListSheet(list)}
        />
        {typing && <TypingIndicator />}
        <ChatInput onSend={sendText} disabled={!sessionId || typing} />
      </div>
      {listSheet && (
        <InteractiveListSheet
          list={listSheet}
          onClose={() => setListSheet(null)}
          onSelect={onListSelect}
        />
      )}
    </div>
  );
}
