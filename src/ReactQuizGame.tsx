import { useState } from "react";

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
  
  const checkMatch = (itemsToCheck) => {
    
    
    
    return
  }


  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const item: Item = (e.target as HTMLButtonElement).value;
    if (selectedItems.length === 0 || selectedItems.length === 2) {
      setSelectedItems([item]);
    } else if (selectedItems.length === 1) {
      setSelectedItems((prevItems) => [...prevItems, item]);
    }
  };

  return (
    <>
      {flattenedData.map((item, index) => (
        <button onClick={handleOnClick} key={index} value={item}>
          {item}
        </button>
      ))}
    </>
  );
};

export default ReactQuizGame;
