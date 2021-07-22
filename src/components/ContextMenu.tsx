/* eslint-disable react/no-children-prop */
import React, {
  useState, useRef, useEffect, useLayoutEffect,
} from 'react';
import ContextMenuBridge, { CMMouseEvent } from '../ContextMenuBridge';
import useContextMenu from '../useContextMenu';
import ContextMenuOption, { CMContext } from './ContextMenuOption';
import ContextMenuDivider from './ContextMenuDivider';
import ContextMenuExpand from './ContextMenuExpand';

export type ChildrenProp = React.ReactChild | React.ReactChild[]

export type XYPosition = {
  x: number,
  y: number
};

interface ContextMenuExpand<T> {
  children: ChildrenProp,
  style?: React.CSSProperties,
  bridge: ContextMenuBridge<T>,
  dark?: boolean,
  anchored?: boolean,
  onSelect?: (action: string, event: CMMouseEvent) => void ;
}

// eslint-disable-next-line react/require-default-props
function ContextMenu<T>(
  {
    children, style = {}, bridge, dark = false, onSelect, anchored,
  }: ContextMenuExpand<T>,
): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const { clickPosition, open } = useContextMenu(bridge);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [relativePosition, setRelativePosition] = useState<XYPosition>({ x: 0, y: 0 });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (open) {
      const handleOutsideClick = (e: CMMouseEvent) => {
        if (
          open
          && ref.current
          && e.target && e.target instanceof Element && !ref.current.contains(e.target)
        ) {
          bridge.handleClose(e);
        }
      };
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    if (!anchored) {
      setRelativePosition(clickPosition);
      return;
    }
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setRelativePosition({ x: clickPosition.x - rect.left, y: clickPosition.y - rect.top });
  }, [clickPosition, open]);

  const styles:React.CSSProperties = {
    ...style,
    ...{
      display: open ? 'block' : 'none',
      top: relativePosition.y,
      left: relativePosition.x,
      anchored: false,
    },
  };
  return (
    <CMContext.Provider value={{
      close: (e) => {
        console.log('this happened', e);
        bridge.forceClose(e);
      },
      doSelect: (action, event) => {
        if (onSelect) onSelect(action, event);
      },
      bridge,
      dark,
    }}
    >
      <div className="react-context-menu-anchor" ref={anchorRef}>
        <div className={`react-context-menu${dark ? ' theme-dark' : ''}`} style={styles} ref={ref} children={children} />
      </div>
    </CMContext.Provider>
  );
}

ContextMenu.defaultProps = {
  style: {},
  dark: false,
  onSelect: undefined,
  anchored: true,
};

ContextMenu.Option = ContextMenuOption;

ContextMenu.Divider = ContextMenuDivider;

ContextMenu.Expand = ContextMenuExpand;

export default ContextMenu;
