export default (data) => {
  let newData = data;
  [...newData.matchAll(/!minitel\((.*)\)/g)].forEach((match) => {
    newData = newData.replace(
      match[0],
      `<img src="/plugins/minitel/minitel.svg" data-minitel="${match[1]}" class="minitel-img" />`
    );
  });
  return newData;
};
