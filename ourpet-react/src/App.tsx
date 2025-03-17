import React, { useEffect, useState } from "react";
import PetView from "./PetView";
import PetDex from "./PetDex";
import InteractionButton from "./InteractionButton";
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
  const [showMenu, setShowMenu] = useState(false);

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

  // Fetch and populate page with pet data on render
  useEffect(() => {
    const petID = getPetID();
    getPetData(petID).then((data) => setPetData(data));
  }, []);

  return (
    <>
      <div id="view-container">
        <div id="top">
          <div id="stats">
            <span>stats:</span>
            <span id="happiness-stat">happiness: {petData?.happiness}</span>
            <span id="health-stat">health: {petData?.health}</span>
            <span id="cleanliness-stat">
              cleanliness: {petData?.cleanliness}
            </span>
          </div>
          <PetView /> {/* Pet animation */}
          {!showMenu && (
            <button id="open-menu" onClick={() => setShowMenu(true)}>
              Open Menu
            </button>
          )}
          {showMenu && (
            <div id="popup-menu">
              <button id="close-menu" onClick={() => setShowMenu(false)}>
                X
              </button>
              <PetDex /> {/* Index of all pets */}
            </div>
          )}
        </div>
        <div id="dialog">
          <p id="dialog-text">
            Hello, I'm <strong>{petData?.name}</strong>!
          </p>
        </div>
      </div>
      <div id="buttons-container">
        <InteractionButton
          petID={petData?._id || ""}
          action="play"
          fetchPetData={getPetData}
          updatePetData={setPetData}
        />
        <InteractionButton
          petID={petData?._id || ""}
          action="feed"
          fetchPetData={getPetData}
          updatePetData={setPetData}
        />
        <InteractionButton
          petID={petData?._id || ""}
          action="clean"
          fetchPetData={getPetData}
          updatePetData={setPetData}
        />
      </div>
    </>
  );
}

export default App;
