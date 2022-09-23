# Zerolines.js
Headless UI components without writing a single line of JavaScript.

## Components
- Tab
- Modal
- Dropdown
- Drawer
- Onetime content
- ScrollTop

## Usage
Add library from CDN, or download from Release Page on Github.

```html
<script src="https://cdn.jsdelivr.net/npm/zerolinesjs@0.1.0/dist/index.js" crossorigin="anonymous"></script>
<link href="https://cdn.jsdelivr.net/npm/zerolinesjs@0.1.0/dist/style.min.css" rel="stylesheet" />
```

Simply attach roll and behavior to your styled HTML element with `data-zl` attribute.
Here is the modal sample.

```html
<button type="button" data-zl="modal-toggle target-[#modal1]">
  Modal Open
</button>
<div id="modal1" data-zl="modal-backdrop" zl-cloak>
  <div data-zl="modal-content move-down-md">
    <!-- Content Here -->
    <button data-zl="modal-dismiss">Cancel</button>
  </div>
</div>
```

## License
Available under the MIT License.
