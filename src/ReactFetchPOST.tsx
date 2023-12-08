import { useState } from "react";

type DataObject = {
  name: string;
  city: string;
};

const ReactFetchPOST = () => {
  const [requestData, setRequestData] = useState<DataObject>({
    name: "",
    city: "",
  });
  const [data, setData] = useState<DataObject>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify(requestData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("You encountered this error:", (error as Error).message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRequestData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <form
        action=""
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        <label htmlFor="name-input">Your Name:</label>
        <input
          name="name"
          type="text"
          id="name-input"
          value={requestData.name}
          onChange={handleInputChange}
          placeholder="Input your name here"
          required
        />

        <label htmlFor="city-input">Your Text Data</label>
        <input
          name="city"
          type="text"
          id="city-input"
          value={requestData.city}
          onChange={handleInputChange}
          placeholder="Input your city here"
          required
        />

        <button type="submit">Submit your data!</button>
      </form>
      <div>{data ? data.name : "Name not available!"}</div>
      <div>{data ? data.city : "City not available!"}</div>
    </>
  );
};

export default ReactFetchPOST;
