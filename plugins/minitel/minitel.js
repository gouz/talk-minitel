const url = `http://${window.slidesk.env.MINITEL_IP}`;

function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
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
      "img[data-minitel]"
    );
  if (minitel) window.slidesk.Minitel(minitel.getAttribute("data-minitel"));
};

window.slidesk.Minitel = async (file) => {
  const img = document.createElement("img");
  img.addEventListener(
    "load",
    async () => {
      const chunks = sliceIntoChunks(CV.convert(CM.getPixels(img)), 100);
      await fetch(`${url}/new`);
      for (let i = 0; i < chunks.length; i++) {
        const body = new FormData();
        body.append("encrypt", new Blob([Uint8ClampedArray.from(chunks[i])]));
        await fetch(`${url}/post`, {
          method: "post",
          body,
        });
      }
      await fetch(`${url}/end`);
    },
    false
  );
  img.src = file;
};
