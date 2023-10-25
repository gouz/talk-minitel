const url = `http://192.168.1.11`;

const CM = new CanvasManager(document.querySelector("#minitel-canvas"));
const CV = new ConvertVideotex();

function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

window.slideskMinitel = async (file) => {
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
