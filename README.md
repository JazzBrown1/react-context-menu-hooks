# react-context-menu-hooks

React Context Menu Hooks is an easy to use and feature rich scalable custom context menu solution for react.

## [Check out the Demo](https://jazzbrown1.github.io/react-context-menu-hooks/)

### Features
- All complexity such as handlers and registers are hidden and abstracted to provide a simple and easy to use API
- Built using modern react hooks patterns, making it both performant and easy to use with modern react > 16.8
- Dynamic directional menus - The context and expand menus will be dynamically positioned so they are always on the screen
- Scalability - Works well in small apps with a single context menu and is able to scale up to very large apps with various context menu layouts
- CSS based easy to control, style, update and themes
- Dark mode theme

#### Think carefully when adding custom context menus to your app, most mobile users will not be able to open a context menu, so if you are targeting mobile users for your app, you should not have functionality that is only accessible in context menus.

## Install
```
$ npm install react-context-menu-hooks
```


## Usage

import the react-context-menu-hooks css in your app.

```tsx
import '../node_modules/react-context-menu-hooks/src/ContextMenu.css';
```


### Bridge

The bridge is where define your data structure and your default data.

It also does the job of binding your context menu to the trigger area/s. You will see further down that you will pass the returned value from createBridge to your context menu and trigger areas to create a link.

The first argument of create bridge function is where you define the default data for your context menu. The user will never see this data but it is used for the first render of the menu while it is hidden.

```js
import { createBridge } from 'react-context-menu-hooks';

export const myContextMenuBridge = createBridge({
  changeColor: () => { /* do nothing */ },
  color: 'none',
});
```

### Trigger Area

A trigger area is the area of the page that will trigger the opening of the context menu. 

The TriggerArea component has two required props, bridge, and data. Provide the bridge prop with a Bridge instance created using the createBridge function as above. And the data prop is the data that will be provided to your context menu when the user right clicks in the Trigger Area.

 You can pass any div element props to the TriggerElement component which will be rendered on the underlying div element. In the snippit below you can see we pass the common HTML prop className to the TriggerArea component.

```jsx
import React, { useState } from 'react';
import { ContextMenuTriggerArea } from 'react-context-menu-hooks';

import { myContextMenuBridge } from './myContextMenuBridge';

const Shape = () => {
  const [color, setColor] = useState('blue');

  return (
    <ContextMenuTriggerArea
      bridge={myContextMenuBridge}
      className={`shape ${color}`}
      data={{
        color,
        changeColor: (newColor) => { setColor(newColor) },
      }}
    >
      <p>Right click to change the color!</p>
    </ContextMenuTriggerArea>
  );
};

```

### ContextMenu

The ContextMenu component is the layout component for your ContextMenu. ContextMenu has property components; Option, Select, and Divider which can be used to easily layout your menu.

In the ContextMenu component the bridge prop is required which you provide with the Bridge instance created using the createBridge function as above.

The useContextMenu hook is used to get the context data provided from the trigger area and render the menu accordingly.
```jsx
import React from 'react';
import { ContextMenu, useContextMenu } from 'react-context-menu-hooks';

import { myContextMenuBridge } from './myContextMenuBridge';

function MyContextMenu() {
  const { data } = useContextMenu(myContextMenuBridge);
  const { changeColor, color } = data;

  const handleColorSelect = (action) => { changeColor(action); };

  return (
    <ContextMenu bridge={myContextMenuBridge} onSelect={handleColorSelect}>
      <ContextMenu.Option disabled={color === 'red'} select="red">Change to Red</ContextMenu.Option>
      <ContextMenu.Option disabled={color === 'blue'} select="blue">Change to Blue</ContextMenu.Option>
    </ContextMenu>
  );
}
```

### TypeScript

The Library is fully typescript integrated. If you are using typescript in your project you can pass your data interface as the first type argument to createBridge. Your type will then be inferred in the useContextMenu hook and the TriggerArea component props. 

```ts
import { createBridge } from 'react-context-menu-hooks';

export interface MyContextMenuTriggerData {
  changeColor: (color: string) => void;
  color: string;
}

export const myContextMenuBridge = createBridge<MyContextMenuTriggerData>({
  changeColor: () => { /* do nothing */ },
  color: 'none',
});
```


## Issues

If you find any bugs please raise them in the github issues section. Also if you are in need of support / or the documentation is unclear please also raise a ticket there.


## Contribute

Contributors welcome. Just Fork, Hack and Create a Pull Request! :)
