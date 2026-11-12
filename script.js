function money(value) {
  return "$" + Number(value).toLocaleString("en-US");
}

function getImageUrl(car) {
  const special = {
    "Molten M12": "moltenm12",
    "Volt 4x4": "volt4x4",
    "LittleBird": "littlebird",
    "BlackHawk": "blackhawk",
    "ICEBreaker": "icebreaker",
    "Model3": "model3",
    "JetSki": "jetski",
    "DuneBuggy": "dune-buggy",
    "Vehicle.BankTruck": "vehicle-banktruck"
  };

  const slug = special[car.name] ||
    car.name.toLowerCase().replaceAll(" ", "-");

  return "https://jbvalues.com/_next/image?q=75&url=" +
    encodeURIComponent("/images/watermarked/items/vehicle/" + slug + ".webp") +
    "&w=2048";
}

function renderCars() {
  const list = document.getElementById("cars");
  const search = document.getElementById("search").value.toLowerCase();
  const rarity = document.getElementById("rarity").value;
  const sort = document.getElementById("sort").value;

  let filtered = window.cars.filter(car =>
    car.name.toLowerCase().includes(search) &&
    (rarity === "all" || car.rarity === rarity)
  );

  if (sort === "high") filtered.sort((a,b) => b.value-a.value);
  if (sort === "low") filtered.sort((a,b) => a.value-b.value);
  if (sort === "az") filtered.sort((a,b) => a.name.localeCompare(b.name));

  list.innerHTML = "";

  filtered.forEach(car => {
    const card = document.createElement("div");
    card.className = "car";

    const img = document.createElement("img");
    img.src = getImageUrl(car);
    img.alt = car.name;
    img.loading = "lazy";

    img.onerror = () => {
      img.style.display = "none";
    };

    const title = document.createElement("h3");
    title.textContent = car.name;

    const price = document.createElement("p");
    price.textContent = "Value: " + money(car.value);

    const button = document.createElement("button");
    button.textContent = "View details";
    button.onclick = () => openCar(car);

    card.append(img, title, price, button);
    list.appendChild(card);
  });

  document.getElementById("count").textContent =
    filtered.length + " cars";
}

function openCar(car) {
  document.getElementById("catalogPage").classList.add("hidden");
  document.getElementById("details").classList.remove("hidden");

  document.getElementById("carName").textContent = car.name;
  document.getElementById("carValue").textContent = money(car.value);
  document.getElementById("carDuped").textContent =
    car.duped ? money(car.duped) : "Not available";
  document.getElementById("carRarity").textContent = car.rarity;
}

function backToCatalog() {
  document.getElementById("details").classList.add("hidden");
  document.getElementById("catalogPage").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("search").addEventListener("input", renderCars);
  document.getElementById("sort").addEventListener("change", renderCars);
  document.getElementById("rarity").addEventListener("change", renderCars);
  renderCars();
});