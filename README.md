<p align="center">
  <img src="./src/resources/icons/icon.png" width="140px" />
</p>

<h1 align="center">Mini Video Me</h1>
<p align="center">A small webcam player focused on providing an easy way to add and control your webcam during recordings.</p>

<h3 align="center">
  <!-- <a href="https://github.com/maykbrito/mini-video-me/actions/workflows/release.yml" target="_blank">
    <img alt="Build" src="https://github.com/maykbrito/mini-video-me/actions/workflows/release.yml/badge.svg" />
  </a> -->

  <!-- Version -->
  <a href="https://github.com/maykbrito/mini-video-me/releases">
    <img alt="releases url" src="https://img.shields.io/github/v/release/maykbrito/mini-video-me?style=for-the-badge&labelColor=1C1E26&color=FF79C6">
  </a>  
  
 <!-- License -->
  <a href="./LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/license%20-MIT-1C1E26?style=for-the-badge&labelColor=1C1E26&color=FF79C6">
  </a>

 <!-- Twitter -->
  <a href="https://twitter.com/maykbrito" target="_blank">
    <img alt="Twitter: maykbrito" src="https://img.shields.io/twitter/follow/maykbrito.svg?style=for-the-badge&labelColor=1C1E26&color=FF79C6&logo=twitter" />
  </a>
</h3>

<br />

# Features

- 👨‍🚀 Shortcuts
- ⚙️ Highly configurable
- 💅 Themes and custom themes
- 🚀 Cross-platform (Windows, Mac, Linux)
- 🌎 Languages and custom languages (i18n)

<img src=".github/preview.png" alt="Sample preview running the app showing Diego Fernandes happy on the app screen with Visual Studio Code open in the background">

# Installation

- [Download](https://github.com/maykbrito/mini-video-me/releases)

⚠️ **For MacOS**, move the extracted app to the **Applications** folder, open your terminal and run the following command to sign the app
```bash
codesign --force --deep --sign - /Applications/Mini\ Video\ Me.app
```
Wait until the command finishes, then open the app and allow the camera permissions asked you. 🚀

# Usage & settings

After running for the first time you can access the app settings through the **tray menu** and click on `Settings` to change default shortcuts, camera size, zoom, shapes, themes, languages etc.

## Default shortcuts

> ⚠️ **For Linux/Windows users:** if you're not new to Mini Video Me, you'll probably need to update the shortcuts manually. For this, open the camera settings in `tray menu` > `Settings` and update it with the new default shortcuts or others that you like, and the operating system allows, or just select `Reset Settings`.

<table>
  <thead>
    <tr>
      <th>MacOS</th>
      <th>Linux / Windows</th>
      <th>Function</th>
      <th>Window must be focused</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><kbd>+</kbd> / <kbd>-</kbd></td>
      <td><kbd>+</kbd> / <kbd>-</kbd></td>
      <td>Zoom in/out</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><kbd>/</kbd></td>
      <td><kbd>/</kbd></td>
      <td>Flip horizontal</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><kbd>o</kbd></td>
      <td><kbd>o</kbd></td>
      <td>Toggle <a href="#using-custom-shapes">custom shapes</a></td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><kbd>r</kbd></td>
      <td><kbd>r</kbd></td>
      <td>Reset zoom</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><kbd>Backspace</kbd></td>
      <td><kbd>Backspace</kbd></td>
      <td>Switch cam</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><kbd>Space</kbd></td>
      <td><kbd>Space</kbd></td>
      <td>Toggle window size (small/large)</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><kbd>Command</kbd> + <kbd>,</kbd></td>
      <td><kbd>Ctrl</kbd> + <kbd>,</kbd></td>
      <td>Open the settings file</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><kbd>Arrow Up</kbd> / <kbd>Down</kbd> / <kbd>Left</kbd> / <kbd>Right</kbd></td>
      <td><kbd>Arrow Up</kbd> / <kbd>Down</kbd> / <kbd>Left</kbd> / <kbd>Right</kbd></td>
      <td>Adjust video offset</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><kbd>Command</kbd> + <kbd>Shift</kbd> + <kbd>Option</kbd> + <kbd>Up</kbd></td>
      <td><kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>Up</kbd></td>
      <td>Move camera to upper screen edge</td>
      <td>No</td>
    </tr>
    <tr>
      <td><kbd>Command</kbd> + <kbd>Shift</kbd> + <kbd>Option</kbd> + <kbd>Down</kbd></td>
      <td><kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>Down</kbd></td>
      <td>Move camera to lower screen edge</td>
      <td>No</td>
    </tr>
    <tr>
      <td><kbd>Command</kbd> + <kbd>Shift</kbd> + <kbd>Option</kbd> + <kbd>Right</kbd></td>
      <td><kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>Right</kbd></td>
      <td>Move camera to right screen edge</td>
      <td>No</td>
    </tr>
    <tr>
      <td><kbd>Command</kbd> + <kbd>Shift</kbd> + <kbd>Option</kbd> + <kbd>1</kbd></td>
      <td><kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>1</kbd></td>
      <td>Toggle camera size (small/large)</td>
      <td>No</td>
    </tr>
    <tr>
      <td><kbd>Command</kbd> + <kbd>Shift</kbd> + <kbd>Option</kbd> + <kbd>3</kbd></td>
      <td><kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>2</kbd></td>
      <td>Toggle camera visibility (show/hide)</td>
      <td>No</td>
    </tr>
  </tbody>
</table>

## Adjusting the border

Open the camera settings in `tray menu` > `Settings`, then look for `"themeOverrides"` and change `"borderWith"` property to `"0"` if you should to **remove the border**. Or you can make it thick by changing the value above to `"10px"` for example.

## Using custom shapes

You can use custom shapes using the [`clip-path`](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)
CSS property. You can use a tool like [Clippy](https://bennettfeely.com/clippy/) to play around with different shapes
you can build with `clip-path`.

### How to add/remove shapes

Open the camera settings in `tray menu` > `Settings` and in the `"shapes"` property, place the CSS's clip-path value as you wish.

<details>
  <summary>See this image example</summary>
  <img src="https://i.imgur.com/EfTwfr6.png">
</details>

## Change size

Open the camera settings in `tray menu` > `Settings` and change `"screen.initial"` and/or `"screen.large"`'s width and height properties as you wish

<details>
  <summary>See this image example</summary>
  <img src="https://i.imgur.com/D53cdtr.png">
</details>

# Contributing

Clone de repository, open its folder and install dependencies with:

```sh
yarn
```

Run it using:

```sh
yarn dev
```

# Author

👤 **Mayk Brito**

- Twitter: [@maykbrito](https://twitter.com/maykbrito)
- Github: [@maykbrito](https://github.com/maykbrito)
- LinkedIn: [@maykbrito](https://linkedin.com/in/maykbrito)

## Show your support

Give a ⭐️ if this project helped you!
