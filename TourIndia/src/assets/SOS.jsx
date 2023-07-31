import React, { useState } from "react";
import Button from "@mui/material/Button";

const SosButton = ({ onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleButtonClick = () => {
    setIsClicked(true);
    onClick();
  };

  return (
    <center>
      <Button
        variant="contained"
        color={isClicked ? "inherit" : "secondary"}
        style={{
          backgroundColor: isClicked ? "black" : "red",
          border: "4px solid orange",
          borderRadius: "50%",
          width: "75px",
          height: "75px",
          fontWeight: "bold",
          fontSize: "16px",
        }}
        onClick={handleButtonClick}
      >
        S.O.S
      </Button>
    </center>
  );
};

export default SosButton;
