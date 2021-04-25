<p align="center">
<img src="./assets/webcam.png" width="190px"/>
</p>

<h1 align="center">Mini video me 📹</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
  <a href="https://twitter.com/maykbrito" target="_blank">
    <img alt="Twitter: maykbrito" src="https://img.shields.io/twitter/follow/maykbrito.svg?style=social" />
  </a>
</p>

> A small webcam player built with html, css, javascript and electron

*Tested only on MacOS and Windows 10*


## Install
With the terminal open in the project, execute the following command to be able to install the dependencies:
```sh
npm install
```

## Usage

You will need change your camera configuration in `./cameraConfig.js` because cameras have different proportions, like: width, height, frame rates and aspect ratios.

You'll need to know about your camera OR try to not mess with `width`, `height`, `aspectRatio` and `frameRate` options, like this

```js
export default {
    // width: 1920,
    // height: 1080,
    // aspectRatio: 1.77778,
    // frameRate: 59.94,
    flipHorizontal: true, // start flipped
    rounded: true, // border radius for camera
    scale: 1.1, // zoom?
    
    // move point of interest
    // number will be converted to percent
    horizontal: "-20", // 0 left - translateX
    vertical: "0", // 0 top - translateY
}
```

Then, generate your app with command bellow

```sh
npm run build
```

---
## Shortcuts

<table>
  <thead>
    <tr>
      <th>Keystroke</th>
      <th>Function</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>+/-</td>
      <td>Zoom in/out (inside wrapper)</td>
    </tr>
    <tr>
      <td>/</td>
      <td>Flip horizontal</td>
    </tr>
    <tr>
      <td>o</td>
      <td>Toggle wrap rounded cam</td>
    </tr>
    <tr>
      <td>Arrow up/ Down / Left / Right</td>
      <td>Move cam position (inside wrapper)</td>
    </tr>
    <tr>
      <td>0 or *</td>
      <td>Increase size of cam</td>
    </tr>
  </tbody>
</table>

---

## Author

👤 **Mayk Brito**

* Twitter: [@maykbrito](https://twitter.com/maykbrito)
* Github: [@maykbrito](https://github.com/maykbrito)
* LinkedIn: [@maykbrito](https://linkedin.com/in/maykbrito)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
