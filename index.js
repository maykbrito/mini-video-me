const { ipcRenderer } = require('electron');

import cameraConfig from './cameraConfig.js';
import Cam from './cam.js';

navigator.mediaDevices.enumerateDevices().then((devices) => {
  const videoDevices = devices.filter((device) => {
    return device.kind === 'videoinput';
  });

  // Using webcam in browser
  navigator.mediaDevices
    .getUserMedia({
      video: { ...cameraConfig, deviceId: videoDevices[0].deviceId } || true
    })
    .then((stream) => (Cam.video.srcObject = stream));

  // Start Controlling Cam
  Cam.init();

  ipcRenderer.send('videoInput', JSON.stringify(videoDevices));
  ipcRenderer.on('videoInputChange', (event, videoInputIndex) => {
    navigator.mediaDevices
      .getUserMedia({
        video:
          {
            ...cameraConfig,
            deviceId: videoDevices[videoInputIndex].deviceId
          } || true
      })
      .then((stream) => (Cam.video.srcObject = stream));
  });

  // Keyboard Events
  window.addEventListener('keydown', (e) => {
    if (Cam.controls[e.key]) {
      Cam.controls[e.key]();
    }
  });
});
