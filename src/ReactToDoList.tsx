import { useMemo, useState } from "react";

const itemCategory = ["Fruit", "Vegetable", "Nut"] as const;

type ItemName = string;
type ItemCategory = (typeof itemCategory)[number] | "All";
type Item = { name: ItemName; category: ItemCategory[] };
type ItemsList = Item[];

const ReactToDoList = () => {
  const initialItemsList: ItemsList = [
    { name: "Mango", category: ["Fruit", "All" ]},
    { name: "Pineapple", category: ["Fruit", "All" ]},
    { name: "Cabbage", category: ["Vegetable", "All"] },
    { name: "Banana", category: ["Fruit", "All"] },
    { name: "Pistache", category: ["Nut", "All" ]},
  ];

  const [itemList, setItemList] = useState<ItemsList>(initialItemsList);
  const [itemInput, setItemInput] = useState<ItemName>("");
  const [categoryInput, setCategoryInput] = useState<ItemCategory>("All");
  const [category, setCategory] = useState<ItemCategory>("All");
  const [query, setQuery] = useState<ItemName>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (itemInput === "") return;
    setItemList((prevList) => [
      ...prevList,
      { name: itemInput, category: [category, "All"] }, 
    ]);
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
        <option value="All">All</option>
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
        <label htmlFor="task-input">Product:</label>
        <input
          id="task-input"
          type="text"
          required
          value={itemInput}
          onChange={(e) => setItemInput(e.target.value)}
        />
        <label htmlFor="category-input">Set Category:</label>
        <select
          name="category-input"
          id="category-input"
          onChange={(e) => setCategory(e.target.value as ItemCategory)}
          value={category}
          required
        >
          <option value="All">All</option>
          {itemCategory.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
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
