import { useMemo, useState } from "react";

type ItemsList = string[];
type Item = string;

const ReactAnswersGame = () => {
  const initialItemsList: ItemsList = ["Banana", "Mango", "Cabbage"];

  const [itemList, setItemList] = useState<ItemsList>(initialItemsList);
  const [itemInput, setItemInput] = useState<Item>("");
  const [query, setQuery] = useState<Item>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (itemInput === "") return;
    setItemList((prevList) => [...prevList, itemInput]);
    setItemInput("");
  };

  const filteredItems = useMemo(() => {
    return itemList.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, itemList]);

  return (
    <>
      <label htmlFor="search-input">Search:</label>
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <form
        action=""
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          gap: "0.5rem",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="task-input">Task:</label>
        <input
          id="task-input"
          type="text"
          required
          value={itemInput}
          onChange={(e) => setItemInput(e.target.value)}
          // ref={inputRef}
        />
        <button type="submit">Submit!</button>
      </form>
      <h1>Items:</h1>
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item} </li>
        ))}
      </ul>
    </>
  );
};

export default ReactAnswersGame;
