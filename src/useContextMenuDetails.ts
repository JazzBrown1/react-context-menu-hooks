import { useEffect, useState } from 'react';
import { XYPosition } from './components/ContextMenu';
import ContextMenuBridge, { CMMouseEvent } from './ContextMenuBridge';

const useContextMenuDetails = <Type>(bridge : ContextMenuBridge<Type>) : {
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
    const listener = (event: CMMouseEvent, data: Type, open: boolean) => {
      const clickPosition = { x: event.pageX, y: event.pageY };
      setState({ data, clickPosition, open });
    };
    bridge.addListener(listener);
    return () => {
      bridge.removeListener(listener);
    };
  }, [bridge]);
  return state;
};

export default useContextMenuDetails;
