import { createBridge } from 'react-context-menu-hooks';

export interface MyContextMenuTriggerData {
  changeColor: (color: string) => void;
  color: string;
  changeShape: (shape: string) => void;
  shape: string;
}

export const myContextMenuBridge = createBridge<MyContextMenuTriggerData>({
  changeColor: () => { /* do nothing */ },
  color: 'none',
  changeShape: () => { /* do nothing */ },
  shape: 'none',
});
