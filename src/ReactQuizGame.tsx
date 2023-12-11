import { useEffect, useState } from "react";
import "./ReactQuizGame.css";

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
    { city: "Brasília", country: "Brazil" },
    { city: "Canberra", country: "Australia" },
  ];
  // const flattenedData: ItemsToCheck = gameData.flatMap((obj) =>
  //   Object.values(obj)
  // );

 
  const [selectedItems, setSelectedItems] = useState<ItemsToCheck>([]);
  const [itemsToDisappear, setItemsToDisappear] = useState<ItemsToCheck>([]);
  const [wrongItems, setWrongItems] = useState<ItemsToCheck>([]);
  const [shuffledData, setShuffledData] = useState<ItemsToCheck>([]);

  useEffect(() => {
    setShuffledData(shuffleArray(gameData.flatMap((obj) => Object.values(obj))));
  }, []);

  const checkMatch = (itemsToCheck: ItemsToCheck): boolean => {
    const flatData: GameDataString = gameData.flatMap((obj) => [
      Object.values(obj),
    ]);
    const checkIfMatch: boolean = flatData.some((item) => {
      return item.sort().join(",") === itemsToCheck.sort().join(",");
    });
    return checkIfMatch;
  };
  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const item: Item = (e.target as HTMLButtonElement).value;
    setWrongItems([]);

    if (selectedItems.length < 2) {
      const updatedItems: ItemsToCheck = [...selectedItems, item];
      if (updatedItems.length === 2) {
        const isMatch: boolean = checkMatch(updatedItems);
        setSelectedItems([]);
        if (isMatch) {
          setItemsToDisappear((prevItems) => [...prevItems, ...updatedItems]);
        } else {
          setWrongItems(updatedItems);
        }
      } else {
        setSelectedItems(updatedItems);
      }
    }
  };

  function shuffleArray(array: ItemsToCheck): ItemsToCheck {
    const shuffledArray: ItemsToCheck = array.slice();
    // Fisher-Yates (Knuth) algorithm for shuffling
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex: number = Math.floor(Math.random() * (i + 1));
      // Swap elements between current position and random position
      [shuffledArray[i], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }
  return (
    <>
      <div className="game">
        {shuffledData.map(
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
      </div>
    </>
  );
};

export default ReactQuizGame;
