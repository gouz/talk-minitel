const video = document.querySelector("#webcam");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((_) => {
      console.log("Something went wrong!");
    });
}
