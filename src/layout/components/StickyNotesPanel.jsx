import "./StickyNotesPanel.css"

const StickyNotesPanel = ({ open, onClose }) => {
  return (
    <aside className={`sticky-panel ${open ? "open" : ""}`}>
      <div className="sticky-header">
        <h4>Sticky Notes</h4>
        <button onClick={onClose}>×</button>
      </div>

      <div className="sticky-body">
        <textarea placeholder="Write your note…" />
        <button className="save-btn">Save</button>
      </div>
    </aside>
  );
};

export default StickyNotesPanel;

