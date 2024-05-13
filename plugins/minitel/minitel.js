const urls = window.slidesk.env.MINITEL_IPS.split(",").map(
  (m) => `http://${m.trim()}`
);

function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  res.push([arr.shift(), arr.shift()]);
  for (let i = 0; i < arr.length; i += chunkSize * 5) {
    const chunk = arr.slice(i, i + chunkSize * 5);
    res.push(chunk);
  }
  return res;
}

let CM = null;
const CV = new ConvertVideotex();

window.slidesk.checkSlide = () => {
  if (CM === null)
    CM = new CanvasManager(document.querySelector("#minitel-canvas"));
  const minitel =
    window.slidesk.slides[window.slidesk.currentSlide].querySelector(
      "span[data-minitel]"
    );
  if (minitel) window.slidesk.Minitel(minitel.getAttribute("data-minitel"));
  if (
    [...window.slidesk.slides[window.slidesk.currentSlide].classList].includes(
      "activate-minitel"
    )
  ) {
    minitel_array = [];
    setTimeout(() => {
      call();
    }, 500);
  }
};

const prepareImage = (img) => {
  const chunks = sliceIntoChunks(CV.convert(CM.getPixels(img)), 20);
  const arr = ["/new"];
  for (let i = 0; i < chunks.length; i++)
    arr.push(
      `/put?${new URLSearchParams({
        trame: chunks[i].join(","),
      }).toString()}`
    );
  arr.push("/end");
  return arr;
};

let isCalling = false;
let minitel_array = [];

const call = async () => {
  isCalling = true;
  if (minitel_array.length) {
    const endpoint = minitel_array.shift();
    const promises = [];
    urls.forEach((url) => {
      promises.push(
        new Promise((resolve) =>
          fetch(`${url}${endpoint}`).then(() => resolve())
        )
      );
    });
    await Promise.all(promises);
    if (minitel_array.length) await call();
    else isCalling = false;
  } else isCalling = false;
};

window.slidesk.Minitel = async (file) => {
  const img = document.createElement("img");
  img.addEventListener(
    "load",
    () => {
      minitel_array = [];
      setTimeout(async () => {
        minitel_array = prepareImage(img);
        await call();
      }, 500);
    },
    false
  );
  img.src = file;
};

window.slidesk.new_trame = async (data) => {
  const arr = sliceIntoChunks(data.trame, 20).map(
    (t) =>
      `/put?${new URLSearchParams({
        trame: t.join(","),
      }).toString()}`
  );
  minitel_array.push("/new", ...arr, "/end");
  if (!isCalling) await call();
};
