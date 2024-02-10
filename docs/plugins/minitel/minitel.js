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
    minitel_array = [];
    setTimeout(() => {
      call();
    }, 500);
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

let isCalling = false;
let minitel_array = [];

const call = () => {
  isCalling = true;
  if (minitel_array.length)
    fetch(minitel_array.shift()).then(() => {
      if (minitel_array.length) call();
      else isCalling = false;
    });
  else isCalling = false;
};

window.slidesk.Minitel = async (file) => {
  const img = document.createElement("img");
  img.addEventListener(
    "load",
    () => {
      minitel_array = [];
      setTimeout(() => {
        minitel_array = prepareImage(img);
        call();
      }, 500);
    },
    false
  );
  img.src = file;
};

window.slidesk.new_trame = (data) => {
  minitel_array.push(
    ...sliceIntoChunks(data.trame, 20).map(
      (t) =>
        `${url}/put?${new URLSearchParams({
          trame: t.join(","),
        }).toString()}`
    )
  );
  if (!isCalling) call();
};
