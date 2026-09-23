function Card({ text, onDelete, onDragStart }) {
  return (
    <div className="card" draggable onDragStart={onDragStart}>
      <span>{text}</span>
      <button className="delete-btn" onClick={onDelete}>✕</button>
    </div>
  );
}

export default Card;