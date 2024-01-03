const convertToSVG = async (img) => {
  const file = await fetch(img.src);
  const text = await file.text();
  img.parentElement.innerHTML = text;
};

const convertAllSVG = async () => {
  await Promise.all(
    [...document.querySelectorAll('img[src*=".svg"]')].map(async (img) => {
      await convertToSVG(img);
    })
  );
};
convertAllSVG();
