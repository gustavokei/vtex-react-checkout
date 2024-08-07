# vtex-react-checkout

This is a WIP boilerplate for using React (and more!) within [VTEX Checkout UI Custom](https://vtex.io/docs/components/functional/vtex.checkout-ui-custom@0.0.9/), created by [Enzo Spagnolli](https://github.com/Enzo3322), [Gabriel Nobrega](https://github.com/ganobrega), and [Gustavo Amemiya](https://github.com/gustavokei)

## Preview

![app image](https://i.imgur.com/UDLqxW1.gif)

## Features:

- ReactJS support and all its benefits (plugins, hooks, context api, etc)
- Typescript support
- SCSS support
- Easy SVG importing
- Support for legacy code (your old `checkout6-custom.js` scripts should work without any issues)
- Integrity Hash for files check-up
- A much more organized files structure

## Installation

- Run `vtex init`

- Select `checkout-ui-settings`
![Screenshot 2023-05-22 at 10 27 43](https://github.com/gustavokei/vtex-react-checkout/assets/20908077/c6ac71a5-17f0-4ef2-8f97-5d657a52be1e)

- You should get the following folder structure:
![Screenshot 2023-05-22 at 10 29 00](https://github.com/gustavokei/vtex-react-checkout/assets/20908077/d146c316-f6ac-4c4d-8816-377f2249e5d3)

- Make sure you have the `checkout-ui-custom` builder in your `manifest.json` file
![Screenshot 2023-05-22 at 10 29 48](https://github.com/gustavokei/vtex-react-checkout/assets/20908077/3c909836-3f3d-4aa9-8a0b-64850d37fe93)

- Delete all files inside the `checkout-ui-custom` folder and clone or download this repository into it. Your folder should look like this:
![Screenshot 2023-05-22 at 10 32 08](https://github.com/gustavokei/vtex-react-checkout/assets/20908077/831ef0fa-4745-4c52-bf73-844340e23156)

- Now, open a terminal INSIDE the folder `checkout-ui-custom` path and run `yarn`, then `yarn dev`. This should start the webpack watcher:
![Screenshot 2023-05-22 at 10 35 06](https://github.com/gustavokei/vtex-react-checkout/assets/20908077/74e64602-35e7-4f14-8b32-914096c8e1a0)

- Make sure `checkout6-custom.js` and `checkout6-custom.css` were generated:
![Screenshot 2023-05-22 at 10 38 34](https://github.com/gustavokei/vtex-react-checkout/assets/20908077/f36a151b-4461-4671-9dd3-20238e567de3)

- Finally, run `vtex link` in your vtex workspace and you should see a slider somewhere in `https://yourworkspace--youraccount.myvtex.com/checkout#/cart`
![app image](https://i.imgur.com/UDLqxW1.gif)

## Implementing a React Component

### Step 1 - Creating a render method

Inside the `scripts` folder, create a `renderComponent.tsx` file

    .
    ├── scripts
    │   ├── components
    │   ├── main.jsx
    │   └── renderComponent.tsx <<
    └── ...

```js
import React from "react";
import ReactDOM from "react-dom";
import ExampleComponent from "./components/ExampleComponent";

window.addEventListener("DOMContentLoaded", () => {
  const div = document.createElement("div");
  div.setAttribute("class", "example-preact-component");
  document.querySelector(".cart-template")?.prepend(div);
  ReactDOM.render(<ExampleComponent />, div);
});
```

This will render a react component before the first child of the `.cart-template` element as soon as the page loads

In order to timely render a component, you'll need to create your own methods:

```js
import React from "react";
import ReactDOM from "react-dom";
import AnotherExampleComponent from "./components/AnotherExampleComponent";

window.addEventListener("DOMContentLoaded", () => {
  const checkHash = () => {
    if (location.hash === "#/payment") {
      const div = document.createElement("div");
      div.setAttribute("class", "another-example-component");
      document.querySelector(".cart-template")?.prepend(div);
      ReactDOM.render(<AnotherExampleComponent />, div);
    }
  };
  checkHash();

  window.addEventListener("hashchange", () => {
    checkHash();
  });
});
```

In the example above, the component will render everytime `#/payment` loads

You can go even deeper into the complexity layers. To illustrate, by using `MutationObserver` and/or listening to VTEX's methods like `orderFormUpdated.vtex`, be creative 😉

### Step 2 - Creating your React Component

Just put your component inside the `components` folder. There is no catch!

    .
    ├── components/ExampleComponent
    │   ├── context
    │   ├── ExampleContent.tsx
    │   └── index.tsx
    └── ...

Feel free to take a look at this repo's example component. I have implemented React's Context API + [Swiper](https://github.com/nolimits4web/swiper) slider. Installing plugins is also easy, you should get away with it by following their instructions
