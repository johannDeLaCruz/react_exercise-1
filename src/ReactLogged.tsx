import { useState } from "react";

const ReactLogged = () => {
  const [isInView, setIsInView] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setIsInView((prevState) => !prevState);
        }}
      >
        Make the div appear!
      </button>
      <div style={{visibility: isInView ? "visible" : "hidden" }}>I appeared!</div>
    </>
  );
};

export default ReactLogged;
