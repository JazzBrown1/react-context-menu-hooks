import React, { useState } from 'react';
import { ContextMenu, useContextMenu } from 'react-context-menu-hooks';

import { myContextMenuBridge } from './myContextMenuBridge';

type NaiveClipboardData = {
  color: string,
  shape: string,
} | undefined;

function MyContextMenu():JSX.Element {
  const [clipboard, setClipboard] = useState<NaiveClipboardData>();
  const {
    changeColor, changeShape, color, shape,
  } = useContextMenu(myContextMenuBridge);

  const handleColorSelect = (action: string) => { changeColor(action); };
  const handleShapeSelect = (action: string) => { changeShape(action); };
  const handlePaste = () => {
    if (!clipboard) return;
    changeColor(clipboard.color);
    changeShape(clipboard.shape);
  };
  const handleCopy = () => {
    setClipboard({ color, shape });
  };
  const handleReset = () => {
    changeColor('blue');
    changeShape('circle');
  };
  const darkMode: boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <ContextMenu dark={darkMode} bridge={myContextMenuBridge}>
      <ContextMenu.Option onClick={handleCopy}>Copy Shape Styles</ContextMenu.Option>
      <ContextMenu.Option disabled={!clipboard} onClick={handlePaste}>
        Paste Shape Styles
      </ContextMenu.Option>
      <ContextMenu.Divider />
      <ContextMenu.Option onClick={handleReset}>Reset Shape</ContextMenu.Option>
      <ContextMenu.Divider />
      <ContextMenu.Expand text="Change Color..." onSelect={handleColorSelect}>
        <ContextMenu.Option disabled={color === 'yellow'} select="yellow">Change to Yellow</ContextMenu.Option>
        <ContextMenu.Option disabled={color === 'green'} select="green">Change to Green</ContextMenu.Option>
        <ContextMenu.Option disabled={color === 'red'} select="red">Change to Red</ContextMenu.Option>
        <ContextMenu.Option disabled={color === 'blue'} select="blue">Change to Blue</ContextMenu.Option>
      </ContextMenu.Expand>
      <ContextMenu.Expand text="Change Shape" onSelect={handleShapeSelect}>
        <ContextMenu.Option disabled={shape === 'square'} select="square">Change to Square</ContextMenu.Option>
        <ContextMenu.Option disabled={shape === 'circle'} select="circle">Change to Circle</ContextMenu.Option>
      </ContextMenu.Expand>
    </ContextMenu>
  );
}

export default MyContextMenu;
