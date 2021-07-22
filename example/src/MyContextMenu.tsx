import React from 'react';
import { ContextMenu, useContextMenu, createBridge } from 'react-context-menu-hooks';

interface MyContextMenuTriggerData {
  changeColor: (color: string) => void;
  color: string
}

export const myContextMenuBridge = createBridge<MyContextMenuTriggerData>({
  changeColor: () => { /* do nothing */ },
  color: 'none',
});

function MyContextMenu():JSX.Element {
  const { data } = useContextMenu(myContextMenuBridge);
  const { changeColor } = data;
  const handleColorSelect = (action: string) => { changeColor(action); };
  const handleShapeSelect = (action: string) => { changeColor(action); };
  return (
    <ContextMenu dark bridge={myContextMenuBridge}>
      <ContextMenu.Option>Copy Layer Styles</ContextMenu.Option>
      <ContextMenu.Option>Paste Layer Styles</ContextMenu.Option>
      <ContextMenu.Divider />
      <ContextMenu.Option>Reset Shape</ContextMenu.Option>
      <ContextMenu.Divider />
      <ContextMenu.Expand text="Change Color..." onSelect={handleColorSelect}>
        <ContextMenu.Option select="yellow">Change to Yellow</ContextMenu.Option>
        <ContextMenu.Option select="green">Change to Green</ContextMenu.Option>
        <ContextMenu.Option select="red">Change to Red</ContextMenu.Option>
        <ContextMenu.Option select="blue">Change to Blue</ContextMenu.Option>
      </ContextMenu.Expand>
      <ContextMenu.Expand text="Change Shape" onSelect={handleShapeSelect}>
        <ContextMenu.Option select="square">Change to Square</ContextMenu.Option>
        <ContextMenu.Option select="circle">Change to Circle</ContextMenu.Option>
      </ContextMenu.Expand>
    </ContextMenu>
  );
}

export default MyContextMenu;
