const container = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const resultPara = document.getElementById("para");

let selected = [];
let imagesData = [];

const baseImages = ["img1", "img2", "img3", "img4", "img5"];

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function setupImages() {
  container.innerHTML = "";
  selected = [];
  resultPara.textContent = "";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";

  const dupIndex = Math.floor(Math.random() * baseImages.length);
  const tiles = [...baseImages];
  tiles.push(baseImages[dupIndex]);

  shuffle(tiles);
  imagesData = tiles;

  tiles.forEach((cls, index) => {
    const img = document.createElement("img");
    img.className = cls;
    img.dataset.key = cls;
    img.dataset.index = index;
    img.addEventListener("click", handleClick);
    container.appendChild(img);
  });
}
function handleClick(e) {
  const img = e.target;

  if (img.classList.contains("selected")) return;

  if (selected.length >= 2) return;

  img.classList.add("selected");
  selected.push(img);

  resetBtn.style.display = "inline-block";

  if (selected.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

resetBtn.addEventListener("click", () => {
  setupImages();
});

verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  if (selected.length !== 2) return;

  const same =
    selected[0].dataset.key === selected[1].dataset.key;

  if (same) {
    resultPara.textContent =
      "You are a human. Congratulations!";
  } else {
    resultPara.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

setupImages();