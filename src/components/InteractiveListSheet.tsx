import type { DemoReply } from "../lib/demoBot";

type Props = {
  list: Extract<DemoReply, { kind: "interactive_list" }>;
  onClose: () => void;
  onSelect: (rowId: string) => void;
};

export function InteractiveListSheet({ list, onClose, onSelect }: Props) {
  return (
    <div className="sheet-backdrop" onClick={onClose} role="presentation">
      <div
        className="sheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={list.buttonLabel}
      >
        <div className="sheet__handle" />
        <div className="sheet__header">
          <h2>{list.header ?? list.buttonLabel}</h2>
          <button type="button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <ul className="sheet__rows">
          {list.rows.map((row) => (
            <li key={row.id}>
              <button type="button" onClick={() => onSelect(row.id)}>
                <span className="sheet__row-title">{row.title}</span>
                {row.description && (
                  <span className="sheet__row-desc">{row.description}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
