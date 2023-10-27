const video = document.querySelector("#webcam");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((err0r) => {
      console.log("Something went wrong!");
    });
}
