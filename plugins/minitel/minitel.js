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
    let num = 0;
    setInterval(() => {
      window.slidesk.sendMessage(
        JSON.stringify({ key: "minitel_launch", num: num++ })
      );
    }, 10000);
  }
};

window.slidesk.Minitel = async (file) => {
  const img = document.createElement("img");
  img.addEventListener(
    "load",
    async () => {
      const chunks = sliceIntoChunks(CV.convert(CM.getPixels(img)), 20);
      await fetch(`${url}/new`);
      for (let i = 0; i < chunks.length; i++) {
        const body = new FormData();
        body.append("trame", chunks[i].join(","));
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
