import { useState } from "react";
import "./ReactAPIFetch.css";

type APIObject = {
  word: string;
  score: number;
};

const BASE_URL = "http://api.datamuse.com/words?rel_syn="

const ReactAPIFetch = () => {
  const [word, setWord] = useState<string>("");
  const [data, setData] = useState<APIObject[]>([]);

  const fetchData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${BASE_URL}${word}`
      );
      const data = await response.json();
      if (response.ok) {
        setData(data);
      } else {
        throw new Error(`${response.status} and ${response.statusText}`);
      }
    } catch (error) {
      console.error(
        "This terrible error has happened:",
        (error as Error).message
      );
    }
  };

  return (
    <>
      <form onSubmit={fetchData}>
        <label htmlFor="word-input"></label>
        <input
          type="text"
          name="word-input"
          id="word-input"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button type="submit">Submit!</button>
      </form>
      {data.map((item, index) => (
        <div className="result-container" key={index}>
          {Object.entries(item).map(([key, value]) => (
            <p key={key}>{`${key}: ${value}`}</p>
          ))}
        </div>
      ))}
    </>
  );
};

export default ReactAPIFetch;
