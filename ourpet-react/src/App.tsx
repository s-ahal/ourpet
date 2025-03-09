import React, { useEffect, useState } from "react";
import PetView from "./PetView";
import "./App.css";

function App() {
  interface PetData {
    name: string;
    health: number;
    happiness: number;
    cleanliness: number;
    _id: string;
  }

  const [petData, setPetData] = useState<PetData | null>(null);

  // Get the ID of the current pet from the URL
  const getPetID = (): string => {
    const petID =
      new URLSearchParams(window.location.search).get("petID") || "1";
    return petID;
  };

  // Fetch pet data from the backend
  const getPetData = async (petID: string) => {
    const response = await fetch(`http://localhost:4000/pet/${petID}`);
    const data = await response.json();
    return data;
  };

  // Send a POST request to the backend with interaction details
  const interact = async (petID: string, action: string) => {
    fetch(`http://localhost:4000/interact/${petID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action }),
    });

    // Fetch the updated pet data after interaction
    try {
      const petID = getPetID();
      getPetData(petID).then((data) => setPetData(data));
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch and populate page with pet data on render
  useEffect(() => {
    const petID = getPetID();
    getPetData(petID).then((data) => setPetData(data));
  }, []);

  return (
    <>
      <h1 id="pet-name">{petData?.name}</h1>
      <div id="popup-menu" className="popup-menu">
        <button id="close-menu">X</button>
        <ul>
          <li>
            <a href="petdex.html">PetDex</a>
          </li>
          <li>
            <a href="about.html">About</a>
          </li>
        </ul>
      </div>

      <div id="menu-button-container">
        <button id="open-menu">Open Menu</button>
      </div>
      <div id="interaction-container"></div>
      <PetView />
      <div id="info-container">
        <div id="stats">
          <h4>stats:</h4>
          <span id="happiness-stat">happiness: {petData?.happiness}</span>
          <span id="health-stat">health: {petData?.health}</span>
          <span id="cleanliness-stat">cleanliness: {petData?.cleanliness}</span>
        </div>

        <div id="buttons-container">
          <button
            onClick={() => {
              petData && interact(petData._id, "play");
            }}
          >
            play with me
          </button>
          <button onClick={() => petData && interact(petData._id, "feed")}>
            feed me
          </button>
          <button onClick={() => petData && interact(petData._id, "clean")}>
            clean me
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
