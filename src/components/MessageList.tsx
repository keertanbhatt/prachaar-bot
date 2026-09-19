import type { ChatMessage } from "../App";
import type { DemoReply } from "../lib/demoBot";
import { MessageBubble } from "./MessageBubble";

type Props = {
  messages: ChatMessage[];
  onOpenList: (list: Extract<DemoReply, { kind: "interactive_list" }>) => void;
};

export function MessageList({ messages, onOpenList }: Props) {
  return (
    <div className="message-list">
      <div className="message-list__inner">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} onOpenList={onOpenList} />
        ))}
      </div>
    </div>
  );
}
