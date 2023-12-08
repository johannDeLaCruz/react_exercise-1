import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [itemsInCart, setItems] = useState<number>(0);
  const [lines, setLines] = useState([
    [10, 5, 2],
    [34],
    [2, 4, 5, 6],
    [5],
    [8],
  ]);

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

    if (lineWithLeast !== undefined) {
      setLines((prevLines) => {
        const newLine = [...prevLines];
        newLine[lineWithLeast!] = [itemsInCart, ...newLine[lineWithLeast!]];
        return newLine;
      });
    }
    console.log(lineWithLeast);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prevLines) =>
        prevLines.map((line) =>
          [line[0] - 1, ...line.slice(1)].filter((value) => value >= 0)
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
        {lines.map((line, index) => (
          <div key={index}>
            {line.map((numberOfItems, itemIndex) => (
              <div key={itemIndex}>{numberOfItems}</div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
