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

interface ContextMenuProps<T> {
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
  }: ContextMenuProps<T>,
): JSX.Element {
  const menuRef = useRef<HTMLDivElement>(null);
  const { clickPosition, open } = useContextMenu(bridge);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [relativePosition, setRelativePosition] = useState<XYPosition>({ x: 0, y: 0 });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (open) {
      const handleOutsideClick = (e: CMMouseEvent) => {
        if (
          open
          && menuRef.current
          && e.target && e.target instanceof Element && !menuRef.current.contains(e.target)
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

    if (!anchorRef.current || !menuRef.current) return;
    const anchorRect = anchorRef.current.getBoundingClientRect();
    const menuRect = menuRef.current.getBoundingClientRect();
    const canGoRight = window.innerWidth - clickPosition.x > menuRect.width;
    const canGoDown = window.innerHeight - clickPosition.y > menuRect.height;
    const canGoUp = clickPosition.y > menuRect.height;
    const x = canGoRight
      ? clickPosition.x - anchorRect.left
      : clickPosition.x - anchorRect.left - menuRect.width;
    // eslint-disable-next-line no-nested-ternary
    const y = canGoDown
      ? clickPosition.y - anchorRect.top
      : (canGoUp
        ? clickPosition.y - anchorRect.top - menuRect.height
        : window.innerHeight - menuRect.height - anchorRect.top - 10
      );
    setRelativePosition({ x, y });
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

  const doSelect = (action:string, event:CMMouseEvent): void => {
    if (onSelect) onSelect(action, event);
  };

  const doClose = (e:CMMouseEvent) => {
    bridge.forceClose(e);
  };

  return (
    <CMContext.Provider
      value={{
        doClose,
        doSelect,
        bridge,
        dark,
      }}
    >
      <div className="react-context-menu-anchor" ref={anchorRef}>
        <div
          className={`react-context-menu${dark ? ' theme-dark' : ''}`}
          style={styles}
          ref={menuRef}
          children={children}
          onContextMenu={(e) => { e.preventDefault(); }}
        />
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
