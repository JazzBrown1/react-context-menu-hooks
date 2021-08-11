import { useEffect, useState } from 'react';
import ContextMenuBridge, { CMMouseEvent } from './ContextMenuBridge';

const useContextMenu = <Type>(bridge : ContextMenuBridge<Type>) : Type => {
  const [state, setState] = useState<Type>(bridge.defaultData);
  useEffect(() => {
    const listener = (event: CMMouseEvent, data: Type) => {
      setState(data);
    };
    bridge.addListener(listener);
    return () => {
      bridge.removeListener(listener);
    };
  }, [bridge]);
  return state;
};

export default useContextMenu;
