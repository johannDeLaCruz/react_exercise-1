import { useMemo, useState } from "react";

const itemCategory = ["Fruit", "Vegetable", "Nut"] as const;

type ItemName = string;
type ItemCategory = (typeof itemCategory)[number];
type Item = { name: ItemName; category: ItemCategory };
type ItemsList = Item[];

const ReactToDoList = () => {
  const initialItemsList: ItemsList = [
    { name: "Mango", category: "Fruit" },
    { name: "Pineapple", category: "Fruit" },
    { name: "Cabbage", category: "Vegetable" },
    { name: "Banana", category: "Fruit" },
    { name: "Pistache", category: "Nut" },
  ];

  const [itemList, setItemList] = useState<ItemsList>(initialItemsList);
  const [itemInput, setItemInput] = useState<ItemName>("");
  const [categoryInput, setCategoryInput] = useState<ItemCategory>("");
  const [query, setQuery] = useState<ItemName>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (itemInput === "") return;
    setItemList((prevList) => [...prevList, itemInput]);
    setItemInput("");
  };

  const filteredItems = useMemo(() => {
    return itemList
      .filter((item) => item.category.includes(categoryInput))
      .map((item) => item.name)
      .filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  }, [query, itemList, categoryInput]);

  return (
    <>
      <label htmlFor="search-input">Search by Name:</label>
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select
        name="select-category"
        id="select-category"
        value={categoryInput}
        onChange={(e) => setCategoryInput(e.target.value as ItemCategory)}
      >
        {" "}
        <option value="">Select By</option>
        {itemCategory.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
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

export default ReactToDoList;
