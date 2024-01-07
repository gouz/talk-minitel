const video = document.querySelector("#webcam");

async function getConnectedDevices(type) {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.filter((device) => device.kind === type);
}

// Open camera with at least minWidth and minHeight capabilities
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
      if (camera.label === "JOYACCESS JA-Webcam (0c45:89a0)") {
        openCamera(camera.deviceId, 1280, 720).then(
          (stream) => (video.srcObject = stream)
        );
      }
    });
  }
};

webcamize();
