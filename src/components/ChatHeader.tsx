type Props = {
  onReset: () => void;
};

const BOT_NAME = "BOCW Scheme Assistant";

export function ChatHeader({ onReset }: Props) {
  return (
    <header className="chat-header">
      <div className="chat-header__avatar">BS</div>
      <div className="chat-header__info">
        <div className="chat-header__title">{BOT_NAME}</div>
        <div className="chat-header__subtitle">Demo · same flow on WhatsApp</div>
      </div>
      <button type="button" className="chat-header__action" onClick={onReset} title="Reset chat">
        ↺
      </button>
    </header>
  );
}
