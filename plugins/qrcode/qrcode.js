window.slidesk.qrcode = () => {
  document.getElementById("sd-qrcode").innerHTML = window.QRCodeRender(
    window.QRCodeGetMatrix(
      document.getElementById("sd-qrcode").getAttribute("data-url")
    ),
    "#000"
  );
};

window.slidesk.qrcode();
