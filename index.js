const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));

mongoose
  .connect("mongodb://127.0.0.1:27017/ourpet", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const petSchema = new mongoose.Schema({
  name: { type: String, default: "no_name" },
  happiness: { type: Number, default: 10 },
  health: { type: Number, default: 10 },
  cleanliness: { type: Number, default: 10 },
  id: { type: Number, default: 1 },
});

const Pet = mongoose.model("Pet", petSchema);

console.log("backend! / server");

app.get("/pet/:petID", async (req, res) => {
  console.log("req.params:", req.params);
  try {
    console.log("petID:", req.params.petID);
    let pet = await Pet.findOne({ id: req.params.petID });
    console.log("pet:", pet);
    res.json(pet);
  } catch (err) {
    console.error("Error when fetching pet data:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/interact/:petID", async (req, res) => {
  const { action } = req.body;
  try {
    let pet = await Pet.findOne({ id: req.params.petID });
    if (action === "play") {
      pet.happiness = Math.min(100, pet.happiness + 10);
    } else if (action === "feed") {
      pet.health = Math.min(100, pet.health + 10);
    } else if (action === "clean") {
      pet.cleanliness = Math.min(100, pet.cleanliness + 10);
    }
    await pet.save();
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/all-pets", async (req, res) => {
  const pets = await Pet.find({});
  res.json(pets);
});

app.post("/create-pet", async (req, res) => {
  try {
    const newPetID = await getNextPetID();
    const petName = req.body.name; // Extract the pet's name from the request body
    const newPet = new Pet({ id: newPetID, name: petName }); // Include the pet's name in the new Pet
    await newPet.save();
    res.send(String(newPetID));
  } catch (err) {
    console.error("Error creating new pet:", err);
    res.status(500).send("Internal Server Error");
  }
});

async function getNextPetID() {
  try {
    const highestPet = await Pet.findOne().sort("-id");
    console.log("Highest pet:", highestPet);
    if (highestPet) {
      const id = Number(highestPet.id);
      if (!isNaN(id)) {
        return id + 1;
      } else {
        console.log("ID is not a number:", highestPet.id);
      }
    } else {
      console.log("No highest pet found");
    }
  } catch (err) {
    console.error("Error in getNextPetID:", err);
  }
  return 1;
}

setInterval(async () => {
  try {
    let pets = await Pet.find();
    for (let pet of pets) {
      pet.health = Math.max(0, pet.health - 1);
      pet.happiness = Math.max(0, pet.happiness - 1);
      await pet.save();
    }
  } catch (err) {
    console.error("Error updating pets:", err);
  }
}, 10000); // Decrease health and happiness by 1 every 10 seconds
app.listen(3000, () => {
  console.log("Express server initialized");
});
