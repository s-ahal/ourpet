import React, { useEffect, useState } from "react";

const PetDex = () => {
  interface PetData {
    name: string;
    health: number;
    happiness: number;
    cleanliness: number;
    _id: string;
  }

  const [allPets, setAllPets] = useState<PetData[] | null>(null);

  // Fetch all pet data from the backend
  const getAllPets = async (): Promise<PetData[]> => {
    const response = await fetch(`http://localhost:4000/all-pets`);
    const data: PetData[] = await response.json();
    return data;
  };
  // Create a new pet using the form data
  const createNewPet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const petName = formData.get("name");

    await fetch("http://localhost:4000/create-pet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: petName }),
    });

    // Re-render the pet list
    const updatedPets = await getAllPets();
    setAllPets(updatedPets);
  };

  // Fetch all pets on render
  useEffect(() => {
    getAllPets().then((data) => setAllPets(data));
  }, []);

  return (
    <div>
      <ul>
        {allPets &&
          allPets.map((pet: PetData) => (
            <li key={pet._id}>
              <a href={`/?petID=${pet._id}`}>{pet.name}</a>
            </li>
          ))}
      </ul>
      <form onSubmit={(e) => createNewPet(e)}>
        <input type="text" name="name" placeholder="Pet Name" required />
        <button type="submit">Create Pet</button>
      </form>
    </div>
  );
};
export default PetDex;
