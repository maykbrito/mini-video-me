import cameraConfig from './cameraConfig.js'
import Cam from './cam.js'

navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
        const videoDevices = devices.filter((device) => {
        return device.kind === 'videoinput'
    });

    // Using webcam in browser
    navigator.mediaDevices
        .getUserMedia({
            video: { ...cameraConfig, deviceId: videoDevices[0].deviceId } || true
        })
        .then((stream) => (Cam.video.srcObject = stream))

    // Start Controlling Cam
    Cam.init();

    let counter = 1
    // Keyboard Events
    window.addEventListener('keydown', (e) => {
        if (Cam.controls[e.key]) {
            Cam.controls[e.key]()
        }

        if (e.key === 'c') {
            if(videoDevices.length === 0) {
                return
            }

            navigator.mediaDevices
            .getUserMedia({
                video:
                { ...cameraConfig, deviceId: videoDevices[counter].deviceId } ||
                true
            })
            .then((stream) => (Cam.video.srcObject = stream));

        counter++

        if (counter >= videoDevices.length) {
            counter = 0
            }
        }
    })
    })
