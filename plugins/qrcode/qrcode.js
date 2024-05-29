window.slidesk.qrcode = () => {
  document.querySelectorAll(".sd-qrcode").forEach((el) => {
    el.innerHTML = window.QRCodeRender(
      window.QRCodeGetMatrix(el.dataset.url),
      "#000"
    );
  });
};

window.slidesk.qrcode();
