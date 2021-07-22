import React from 'react';
import './App.css';
import { ContextMenuTriggerArea, useContextMenu } from 'react-context-menu-hooks';
import MyContextMenu, { myContextMenuBridge } from './MyContextMenu';

import '../node_modules/react-context-menu-hooks/src/ContextMenu.css';

function App():JSX.Element {
  const { data } = useContextMenu(myContextMenuBridge);
  return (
    <div className="App">
      {data.color}
      <MyContextMenu />
      <ContextMenuTriggerArea
        bridge={myContextMenuBridge}
        data={{
          color: 'red',
          changeColor: (color) => {
            console.log(color);
          },
        }}
        style={{
          width: 300, height: 300, padding: 75, backgroundColor: 'red', display: 'block', borderRadius: 10,
        }}
      >
        <ContextMenuTriggerArea
          bridge={myContextMenuBridge}
          data={{
            color: 'blue',
            changeColor: (color) => {
              console.log(color);
            },
          }}
          style={{
            width: '100%', height: '100%', backgroundColor: 'blue', display: 'block', borderRadius: 10,
          }}
        >
          Click Here
        </ContextMenuTriggerArea>
      </ContextMenuTriggerArea>
    </div>
  );
}

export default App;
