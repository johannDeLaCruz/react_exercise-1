import { useState } from "react";

type GameDataString = string[][];
type ItemsToCheck = string[];
type DataItem = {
  city: string;
  country: string;
};
type Item = string;
type GameData = DataItem[];

const ReactQuizGame = () => {
  const gameData: GameData = [
    { city: "Moscow", country: "Russia" },
    { city: "Madrid", country: "Spain" },
    { city: "Berlin", country: "Germany" },
    { city: "Santiago", country: "Chile" },
  ];
  const flattenedData: ItemsToCheck = gameData.flatMap((obj) =>
    Object.values(obj)
  );

  const [selectedItems, setSelectedItems] = useState<ItemsToCheck>([]);
  const [itemsToDisappear, setItemsToDisappear] = useState<ItemsToCheck>([]);
  const [wrongItems, setWrongItems] = useState<ItemsToCheck>([]);

  const checkMatch = (itemsToCheck: ItemsToCheck) => {
    const flatData: GameDataString = gameData.flatMap((obj) => [
      Object.values(obj),
    ]);
    const checkIfMatch = flatData.some((item) => {
      return item.sort().join(",") === itemsToCheck.sort().join(",");
    });
    return checkIfMatch;
  };

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const item: Item = (e.target as HTMLButtonElement).value;

    if (selectedItems.length === 0) {
      setSelectedItems([item]);
    } else if (selectedItems.length === 1) {
      const updatedItems = [...selectedItems, item];
      const isMatch = checkMatch(updatedItems);

      if (isMatch) {
        setItemsToDisappear((prevItems) => [...prevItems, ...updatedItems]);
        setSelectedItems(updatedItems);
      } else {
        setSelectedItems([]);
        setWrongItems(updatedItems);
      }
    } else if (selectedItems.length === 2) {
      setWrongItems([]);
      setSelectedItems([item]);
    }
  };

  console.log(wrongItems);
  return (
    <>
      {flattenedData.map(
        (item, index) =>
          !itemsToDisappear.some((i) => i === item) && (
            <button
              style={{
                backgroundColor: selectedItems.some((i) => i === item)
                  ? "blue"
                  : wrongItems.some((i) => i === item)
                  ? "red"
                  : "inherit",
              }}
              onClick={handleOnClick}
              key={index}
              value={item}
            >
              {item}
            </button>
          )
      )}
    </>
  );
};

export default ReactQuizGame;
