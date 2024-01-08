# Plugin `webcam`

To add a webcam view in a slide, add this

```html
<video autoplay="true" id="webcam"></video>
```

and in the `.env` file, precise the label of the webcam needed.

```dotenv
WEBCAM="JOYACCESS JA-Webcam (0c45:89a0)"
```

(use `await navigator.mediaDevices.enumerateDevices()` to list all you cams)
