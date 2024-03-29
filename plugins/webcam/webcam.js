const video = document.querySelector("#webcam");

async function getConnectedDevices(type) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === type);
}

async function openCamera(cameraId, minWidth, minHeight) {
  const constraints = {
    video: {
      deviceId: cameraId,
      width: { min: minWidth },
      height: { min: minHeight },
    },
  };

  return await navigator.mediaDevices.getUserMedia(constraints);
}

const webcamize = async () => {
  const cameras = await getConnectedDevices("videoinput");
  if (cameras && cameras.length > 0) {
    cameras.forEach((camera) => {
      console.log(camera, window.slidesk.env.WEBCAM);
      if (camera.label.includes(window.slidesk.env.WEBCAM)) {
        console.log("camera found");
        openCamera(camera.deviceId, 1280, 720).then(
          (stream) => (video.srcObject = stream)
        );
      }
    });
  }
};

webcamize();
