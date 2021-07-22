/* eslint-disable react/no-children-prop */
import React, {
  useState, useRef, useEffect, useLayoutEffect, useContext,
} from 'react';
import { CMMouseEvent } from '../ContextMenuBridge';
import useContextMenu from '../useContextMenu';
import { CMContext } from './ContextMenuOption';
import { ChildrenProp, XYPosition } from './ContextMenu';

interface ContextMenuExpandProps {
  children: ChildrenProp,
  style?: React.CSSProperties,
  onSelect?: (action: string, event: CMMouseEvent) => void ;
  text: string
}

// eslint-disable-next-line react/require-default-props
function ContextMenuExpand(
  {
    children, style = {}, onSelect, text,
  }: ContextMenuExpandProps,
): JSX.Element {
  const { bridge, dark } = useContext(CMContext);
  const ref = useRef<HTMLDivElement>(null);
  const { clickPosition, open } = useContextMenu(bridge);
  const [relativePosition, setRelativePosition] = useState<XYPosition>({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (!open) return;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setRelativePosition({ x: rect.width, y: 0 });
  }, [clickPosition, open]);

  const styles:React.CSSProperties = {
    ...style,
    ...{
      top: 0,
      left: relativePosition.x,
    },
  };
  return (
    <CMContext.Provider value={{
      close: (e) => {
        bridge.forceClose(e);
      },
      doSelect: (action, event) => {
        if (onSelect) onSelect(action, event);
      },
      bridge,
      dark,
    }}
    >
      <div className="react-context-menu-option expand-option" ref={ref} style={{ position: 'relative' }}>
        {text}
        <span style={{
          position: 'absolute', right: '0.5rem', top: '0.4rem', fontSize: '0.5rem',
        }}
        >
          ▶
        </span>
        <div className={`react-context-menu expand-menu${dark ? ' theme-dark' : 'theme-light'}`} style={styles}>
          {children}
        </div>
      </div>
    </CMContext.Provider>
  );
}

ContextMenuExpand.defaultProps = {
  style: {},
  onSelect: undefined,
};

export default ContextMenuExpand;
