import React from 'react';
import { XYPosition } from './components/ContextMenu';

export type CMMouseEvent = React.MouseEvent | globalThis.MouseEvent;

// type InternalListener = <T>(event: CMMouseEvent, data: T) => void;

class ContextMenuBridge <Type> {
  defaultData: Type;

  data: Type;

  clickPosition: XYPosition = { x: 0, y: 0 };

  open = false;

  hookListeners: Array<(event: CMMouseEvent, data: Type, open: boolean) => void> = []

  constructor(defaultData: Type) {
    this.defaultData = defaultData;
    this.data = defaultData;
  }

  addListener = (listener: (event: CMMouseEvent, data: Type, open: boolean) => void) : boolean => {
    this.hookListeners.push(listener);
    return true;
  }

  removeListener = (
    listener: (event: CMMouseEvent, data: Type, open: boolean) => void,
  ) : boolean => {
    const index = this.hookListeners.indexOf(listener);
    if (index === -1) return false;
    this.hookListeners.splice(index, 1);
    return true;
  }

  menuListener = (event: CMMouseEvent, data: Type, open: boolean) : void => {
    // noop
  };

  dispatch = (event: CMMouseEvent) => {
    this.hookListeners.forEach((handler) => { handler(event, this.data, this.open); });
    this.menuListener(event, this.data, this.open);
  }

  handleOpen = (event: CMMouseEvent, data: Type) : void => {
    if (event.defaultPrevented) return;
    event.preventDefault();
    console.log('bridgeOpenEvent', event, data, this.hookListeners.length);
    this.data = data;
    this.open = true;
    this.clickPosition = { x: event.pageX, y: event.pageY };
    this.dispatch(event);
  }

  handleClose = (event: CMMouseEvent) : void => {
    if (event.defaultPrevented) return;
    console.log('bridgeCloseEvent', event, this.hookListeners.length);
    this.data = this.defaultData;
    this.open = false;
    this.dispatch(event);
  }

  forceClose = (event: CMMouseEvent) : void => {
    console.log('bridgeForceCloseEvent', event, this.hookListeners.length);
    this.data = this.defaultData;
    this.open = false;
    this.dispatch(event);
  }
}

const createBridge:<Type>(defaultData: Type) => ContextMenuBridge<Type> = (data) => (
  new ContextMenuBridge(data)
);

export default ContextMenuBridge;

export { createBridge };
