document.getElementById("open-menu").addEventListener("click", function () {
  document.getElementById("popup-menu").style.display = "flex";
});

document.getElementById("close-menu").addEventListener("click", function () {
  document.getElementById("popup-menu").style.display = "none";
});

window.onload = async () => {
  fetch("/all-pets")
    .then((response) => response.json())
    .then((pets) => {
      const petList = document.getElementById("pet-list");
      pets.forEach((pet) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = `/?petID=${pet._id}`;
        link.textContent = pet.name;
        listItem.appendChild(link);
        petList.appendChild(listItem);
      });

      // Select a random pet
      const randomPet = pets[Math.floor(Math.random() * pets.length)];

      // Update the "random pet" link
      const randomPetLink = document.getElementById("random-pet-link");
      if (randomPetLink) {
        randomPetLink.href = `/?petID=${randomPet.id}`;
      }
    });
};

document.getElementById("new-pet").addEventListener("click", function () {
  document.getElementById("new-pet-popup").style.display = "flex";
});

document.getElementById("close-popup").addEventListener("click", function () {
  document.getElementById("new-pet-popup").style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("new-pet-popup")) {
    document.getElementById("new-pet-popup").style.display = "none";
  }
});

document
  .getElementById("submit-pet-name")
  .addEventListener("click", async function () {
    var petName = document.getElementById("pet-name-input").value;
    if (petName) {
      try {
        const response = await fetch("/create-pet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: petName }),
        });
        const newPetID = await response.text();
        window.location.href = `index.html?petID=${newPetID}`;
      } catch (err) {
        console.error("Error creating new pet:", err);
      }
    } else {
      alert("Please enter a name for your pet!");
    }
  });
