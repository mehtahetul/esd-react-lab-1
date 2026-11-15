// The whole app: App → Header, Matrix → Cell, Stats.
// App owns the numbers. Matrix and Stats only receive them as props.
import { useEffect, useState } from "react";
import Header from "./Header.jsx";
import Matrix from "./Matrix.jsx";
import Stats from "./Stats.jsx";
import { START, incrementAt, decrementAt, zeros } from "./matrix.js";

export default function App() {
  // Section 07: the matrix lives in App's state, starting from START.
  const [matrix, setMatrix] = useState(START);

  // Section 11: load the starting numbers from the "server" once, after the first render.
  useEffect(() => {
    let ignore = false; // StrictMode runs effects twice in dev; drop the stale answer.
    fetch("/matrix.json")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!ignore) setMatrix(data);
      })
      .catch(() => {
        // Keep the starting numbers if the request fails.
      });
    return () => {
      ignore = true;
    };
  }, []);

  // Section 08: events come up from Cell → Matrix → here. The updater form always
  // works on the latest matrix, and incrementAt returns a new one (no mutation).
  function increment(row, col) {
    setMatrix((prev) => incrementAt(prev, row, col));
  }

  // Section 09: Stats sits NEXT TO the matrix inside .board, not inside the table.
  return (
    <main className="app">
      <Header />
      <div className="board">
        <Matrix matrix={matrix} onIncrement={increment} />
        <Stats matrix={matrix} />
      </div>
    </main>
  );
}
