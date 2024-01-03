# Plugin `sbs` (for Step By Step)

Display elements on a slide step by step.

To do this, add the class `sbs` on the slide

```sdf
## My Title .[sbs]
```

And to control your elements, wrap your element by a `div` with the `step` class :

```html
<div class="step">First item</div>
<div class="step">!image(my/image.png, alt)</div>
<div class="step">All you want</div>
<div class="step">Last item</div>
```
