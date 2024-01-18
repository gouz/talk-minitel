const url = `http://${window.slidesk.env.MINITEL_IP}`;

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
    window.slidesk.minitel_array = [];
    setTimeout(async () => {
      await fetch(`${url}/new`);
      let num = 0;
      setInterval(() => {
        window.slidesk.sendMessage(
          JSON.stringify({ key: "minitel_launch", num: num++ })
        );
      }, 30000);
    }, 1000);
  }
};

const prepareImage = (img) => {
  const chunks = sliceIntoChunks(CV.convert(CM.getPixels(img)), 20);
  const arr = [`${url}/new`];
  for (let i = 0; i < chunks.length; i++)
    arr.push(
      `${url}/put?${new URLSearchParams({
        trame: chunks[i].join(","),
      }).toString()}`
    );
  arr.push(`${url}/end`);
  return arr;
};

const call = () => {
  fetch(window.slidesk.minitel_array.shift()).then(() => {
    if (window.slidesk.minitel_array.length) call();
  });
};

window.slidesk.minitel_array = [];

window.slidesk.Minitel = async (file) => {
  const img = document.createElement("img");
  img.addEventListener(
    "load",
    () => {
      window.slidesk.minitel_array = [];
      setTimeout(() => {
        window.slidesk.minitel_array = prepareImage(img);
        call();
      }, 500);
    },
    false
  );
  img.src = file;
};
