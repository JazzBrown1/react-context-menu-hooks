import React, { useEffect, useState } from 'react';
import { XYPosition } from './components/ContextMenu';
import ContextMenuBridge, { CMMouseEvent } from './ContextMenuBridge';

const useContextMenu = <Type>(bridge : ContextMenuBridge<Type>) : {
  clickPosition: XYPosition,
  data: Type,
  open: boolean
} => {
  const [state, setState] = useState<{data: Type, clickPosition: XYPosition, open: boolean}>(
    {
      data: bridge.defaultData,
      clickPosition: { x: 0, y: 0 },
      open: false,
    },
  );
  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    const listener = (event: CMMouseEvent, data: Type, open: boolean) => {
      const clickPosition = { x: event.pageX, y: event.pageY };
      setState({ data, clickPosition, open });
      console.log('hook-listener', { open, event, data });
    };
    bridge.addListener(listener);
    return () => {
      bridge.removeListener(listener);
    };
  }, [bridge]);
  return state;
};

export default useContextMenu;
