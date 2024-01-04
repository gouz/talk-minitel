const convertToSVG = async (img) => {
  const file = await fetch(img.src);
  const text = await file.text();
  img.parentElement.innerHTML = text;
};

const convertAllSVG = async () => {
  await Promise.all(
    [...document.querySelectorAll('.svgconvert img[src*=".svg"]')].map(
      async (img) => {
        await convertToSVG(img);
      }
    )
  );
};
convertAllSVG();

const brightness = (rgb) =>
  Math.round(
    (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) /
      1000
  );
