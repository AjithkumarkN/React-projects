import { useState, useEffect } from "react";
import Column from "./components/Column";
import "./App.css";

function App() {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("kanban-columns");
    if (saved) return JSON.parse(saved);
    return {
      todo: { title: "To Do", cards: [{ id: crypto.randomUUID(), text: "Learn React basics" }] },
      inprogress: { title: "In Progress", cards: [] },
      done: { title: "Done", cards: [] },
    };
  });

  const [draggedCard, setDraggedCard] = useState(null);

  useEffect(() => {
    localStorage.setItem("kanban-columns", JSON.stringify(columns));
  }, [columns]);

  function addCard(columnKey, text) {
    setColumns({
      ...columns,
      [columnKey]: {
        ...columns[columnKey],
        cards: [...columns[columnKey].cards, { id: crypto.randomUUID(), text }],
      },
    });
  }

  function deleteCard(columnKey, cardId) {
    setColumns({
      ...columns,
      [columnKey]: {
        ...columns[columnKey],
        cards: columns[columnKey].cards.filter((card) => card.id !== cardId),
      },
    });
  }

  function handleDragStart(cardId, fromColumn) {
    setDraggedCard({ cardId, fromColumn });
  }

  function handleDrop(toColumn) {
    if (!draggedCard) return;
    const { cardId, fromColumn } = draggedCard;

    if (fromColumn === toColumn) {
      setDraggedCard(null);
      return;
    }

    const cardToMove = columns[fromColumn].cards.find((c) => c.id === cardId);

    setColumns({
      ...columns,
      [fromColumn]: {
        ...columns[fromColumn],
        cards: columns[fromColumn].cards.filter((c) => c.id !== cardId),
      },
      [toColumn]: {
        ...columns[toColumn],
        cards: [...columns[toColumn].cards, cardToMove],
      },
    });

    setDraggedCard(null);
  }

  const totalCards = Object.values(columns).reduce((sum, col) => sum + col.cards.length, 0);

 return (
  <div>
    <nav className="navbar">
      <div className="navbar-logo">
        <span>📋</span> TaskFlow
      </div>
      <ul className="navbar-links">
        <li><a href="#">Board</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>

        <div className="app-container">
      <div className="app-header">
        <h1>TaskFlow Board</h1>
        <p>Organize your tasks with drag-and-drop simplicity</p>
      </div>

      <div className="layout">
        <aside className="sidebar">
          <h3>Overview</h3>
          <div className="sidebar-total">{totalCards}</div>
          <div className="sidebar-total-label">Total Tasks</div>

          {Object.keys(columns).map((key) => (
            <div className="sidebar-stat" key={key}>
              <span className="sidebar-stat-label">
                <span className={`sidebar-dot dot-${key}`}></span>
                {columns[key].title}
              </span>
              <span className="sidebar-stat-value">{columns[key].cards.length}</span>
            </div>
          ))}
        </aside>

        <div className="main-content">
        <div className="board">
        {Object.keys(columns).map((key) => (
          <Column
            key={key}
            columnKey={key}
            title={columns[key].title}
            cards={columns[key].cards}
            onAddCard={(text) => addCard(key, text)}
            onDeleteCard={(cardId) => deleteCard(key, cardId)}
            onDragStart={(cardId) => handleDragStart(cardId, key)}
            onDrop={() => handleDrop(key)}
          />
        ))}
      </div>
      </div>
      </div>
      </div>
    <footer id="contact" className="footer">
      <div className="contact-section">
        <h2>Get in Touch</h2>
        <p>Have questions or feedback? Reach out anytime.</p>
        <div className="contact-list">
          <div className="contact-item">
            📧 <a href="mailto:youremail@example.com">youremail@example.com</a>
          </div>
          <div className="contact-item">
            🔗 <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">linkedin.com/in/yourprofile</a>
          </div>
          <div className="contact-item">
            💻 <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">github.com/yourusername</a>
          </div>
        </div>
      </div>

      <p>© 2026 TaskFlow. Built with React.</p>
    </footer>
    
  </div>
  );
}

export default App;