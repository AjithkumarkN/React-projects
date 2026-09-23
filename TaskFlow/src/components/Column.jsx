import { useState } from "react";
import Card from "./Card.jsx";

function Column({ title, cards, onAddCard, onDeleteCard, onDragStart, onDrop }) {
  const [text, setText] = useState("");

  function handleAdd() {
    if (text.trim() === "") return;
    onAddCard(text);
    setText("");
  }

  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <h2 className="column-title">
        {title} <span className="column-count">({cards.length})</span>
      </h2>

      {cards.map((card) => (
        <Card
          key={card.id}
          text={card.text}
          onDelete={() => onDeleteCard(card.id)}
          onDragStart={() => onDragStart(card.id)}
        />
      ))}

      <div className="add-card-row">
        <input
          className="add-card-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add a card..."
        />
        <button className="add-btn" onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

export default Column;