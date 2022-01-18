# PRESETS

- qualidade da camera no menu [1080p, 720p, 480p ]
- framerate [60fps, 30fps]
- criar documentação para presets (com devidas opções de config)
- preset base dentro do .json

```json
{
  "presets": [
    {
      "name": "base",
      "isDefault": true,
      "config": {
        "zoom": 1,
        "flipHorizontal": false,
        "borderWidth": "5px",
        "borderColor": "linear-gradient(to right, #988BC7, #FF79C6)",
        "filters": ["initial", "grayscale(1)"],
        "screen": {
          "initial": {
            "width": 300,
            "height": 300
          },
          "large": {
            "width": 600,
            "height": 600
          }
        },
        "shapes": ["circle(50% at 50% 50%)"]
      }
    }
  ]
}
```
