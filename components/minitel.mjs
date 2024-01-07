export default (data) => {
  let newData = data;
  [...newData.matchAll(/!minitel\((.*)\)/g)].forEach((match) => {
    newData = newData.replace(
      match[0],
      `<span data-minitel="${match[1]}"></span>`
    );
  });
  return newData;
};
