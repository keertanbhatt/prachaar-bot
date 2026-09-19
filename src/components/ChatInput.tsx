import { useState } from "react";

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
};

export function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");

  const submit = () => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  };

  return (
    <footer className="chat-input">
      <button type="button" className="chat-input__icon" disabled title="Emoji (demo)">
        ☺
      </button>
      <input
        type="text"
        placeholder="સંદેશ"
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
      />
      <button
        type="button"
        className="chat-input__icon chat-input__mic"
        disabled
        title="Voice — works on real WhatsApp"
      >
        🎤
      </button>
      <button
        type="button"
        className="chat-input__send"
        onClick={submit}
        disabled={disabled || !value.trim()}
        aria-label="Send"
      >
        ➤
      </button>
    </footer>
  );
}
