import "./App.css";
import { useState } from "react";

function App() {
  const [itemsInCart, setItems] = useState(0);
  const [lines, setlines] = useState([[10, 5, 2], [34], [2, 4, 5, 6], [3], [4]]);

  const onCheckout = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let leastAmount: number | undefined;
    let currentIndex = 0;
    let lineWithLeast: number | undefined;

    for (const line of lines) {
      const totalInLine: number = line.reduce(
        (total: number, item: number): number => total + item,
        0
      );
      if (leastAmount === undefined || totalInLine < leastAmount) {
        leastAmount = totalInLine;
        lineWithLeast = currentIndex;
      }
      currentIndex++;
    }

    console.log(lineWithLeast);
  };
  return (
    <main>
      <form onSubmit={onCheckout}>
        <input
          required
          type="number"
          value={itemsInCart}
          onChange={(e) => {
            setItems(e.currentTarget.valueAsNumber);
          }}
        />
        <button type="submit">Checkout!</button>
      </form>
      <div className="lines">
        {" "}
        {lines.map((people, index) => (
          <div key={index}>X</div>
        ))}
      </div>
    </main>
  );
}

export default App;
