import React, { useState } from 'react';
import { ContextMenuTriggerArea } from 'react-context-menu-hooks';
import '../node_modules/react-context-menu-hooks/src/ContextMenu.css';

import './App.css';

import MyContextMenu from './MyContextMenu';
import { myContextMenuBridge } from './myContextMenuBridge';

const Shape = () => {
  const [color, setColor] = useState<string>('blue');
  const [shape, setShape] = useState<string>('circle');

  return (
    <ContextMenuTriggerArea
      bridge={myContextMenuBridge}
      className={`shape ${color} ${shape}`}
      data={{
        color,
        changeColor: (newColor) => {
          setColor(newColor);
        },
        shape,
        changeShape: (newColor) => {
          setShape(newColor);
        },
      }}
    >
      <p>Right click and change how I look!</p>
    </ContextMenuTriggerArea>
  );
};

function App():JSX.Element {
  return (
    <div className="App">
      <h1>react-context-menu-hooks example</h1>
      <MyContextMenu />
      <div>
        <Shape />
        <Shape />
      </div>
      <div>
        <Shape />
        <Shape />
      </div>
      <p>
        Check out the
        {' '}
        <a href="https://github.com/JazzBrown1/react-context-menu-hooks" rel="noreferrer" target="_blank">
          Github
        </a>
      </p>
      <p>
        The example source code available
        {' '}
        <a href="https://github.com/JazzBrown1/react-context-menu-hooks/tree/main/example" rel="noreferrer" target="_blank">
          here
        </a>
      </p>
    </div>
  );
}

export default App;
