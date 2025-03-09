const express = require("express");
const cors = require("cors");
const nedb = require("@seald-io/nedb");

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));

const database = new nedb({
  filename: "database.txt",
  autoload: true,
});

// Look up a pet's data in the database and send it to the frontend
app.get("/pet/:petID", async (req, res) => {
  console.log("req.params:", req.params);
  try {
    petID = Number(req.params.petID);
    console.log("petID:", petID);
    let pet = await database.findOneAsync({ _id: petID });
    console.log("pet:", pet);
    res.json(pet);
  } catch (err) {
    console.error("Error when fetching pet data:", err);
    res.status(500).json({ error: err.message });
  }
});

// Receive interactions from the frontend and update the pet's data in the database
app.post("/interact/:petID", async (req, res) => {
  const { action } = req.body;
  try {
    let pet = await database.findOneAsync({ _id: Number(req.params.petID) });
    if (action === "play") {
      pet.happiness = Math.min(100, pet.happiness + 10);
    } else if (action === "feed") {
      pet.health = Math.min(100, pet.health + 10);
    } else if (action === "clean") {
      pet.cleanliness = Math.min(100, pet.cleanliness + 10);
    }
    database.update(
      { _id: Number(req.params.petID) },
      {
        $set: {
          happiness: pet.happiness,
          health: pet.health,
          cleanliness: pet.cleanliness,
        },
      },
      {},
      function () {
        res.json(pet);
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Look up all pets in the database and send them to the frontend
app.get("/all-pets", async (req, res) => {
  console.log("GET received");
  const pets = await database.findAsync({});
  res.json(pets);
});

// Create a new pet in the database and send its ID to the frontend
app.post("/create-pet", async (req, res) => {
  const newPetID = (await getNextPetID()) ?? 1;
  console.log("newPetID:", newPetID);
  let newPet = {
    name: req.body.name,
    happiness: 10,
    health: 10,
    cleanliness: 10,
    _id: newPetID,
  };

  try {
    await database.insertAsync(newPet);
  } catch (err) {
    console.log(err);
  }

  res.send(String(newPetID));
});

// Look up the most recently created pet in the database and send the next available ID to the frontend
async function getNextPetID() {
  try {
    const highestPet = await database.findAsync({}).sort({ _id: -1 });
    console.log("Highest pet:", highestPet[0]);
    if (highestPet[0]) {
      const id = Number(highestPet[0]._id);
      if (!isNaN(id)) {
        return id + 1;
      } else {
        console.log("ID is not a number:", highestPet[0]._id);
      }
    } else {
      console.log("No highest pet found");
    }
  } catch (err) {
    console.error("Error in getNextPetID:", err);
  }
}

// Update pet stats in the database at an interval
// Decrease health, happiness, and cleanliness by 1 every 10 seconds
setInterval(async () => {
  try {
    let pets = await database.findAsync();
    for (let pet of pets) {
      pet.health = Math.max(0, pet.health - 1);
      pet.happiness = Math.max(0, pet.happiness - 1);
      await database.updateAsync(
        { _id: pet.id },
        {
          $set: {
            happiness: pet.happiness,
            health: pet.health,
            cleanliness: pet.cleanliness,
          },
        },
        {}
      );
    }
  } catch (err) {
    console.error("Error updating pets:", err);
  }
}, 10000);

app.listen(4000, () => {
  console.log("Express server initialized");
});
