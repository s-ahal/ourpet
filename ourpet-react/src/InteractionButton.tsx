import React from "react";

const InteractionButton = ({
  petID,
  action,
  fetchPetData,
  updatePetData,
}: {
  petID: string;
  action: string;
  fetchPetData: (id: string) => Promise<any>;
  updatePetData: (data: any) => void;
}) => {
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
      fetchPetData(petID).then((data) => updatePetData(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={async () => await interact(petID, action)}>
      {action}
    </button>
  );
};

export default InteractionButton;
