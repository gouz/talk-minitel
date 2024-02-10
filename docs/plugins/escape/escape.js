setTimeout(() => {
  [...document.querySelectorAll(".hljs span")].forEach((span) => {
    span.innerHTML = span.innerHTML.replace(/\$_/g, "_");
  });
}, 1000);
