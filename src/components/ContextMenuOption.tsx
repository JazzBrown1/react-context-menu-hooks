/* eslint-disable react/no-children-prop */

import React, { createContext, useContext } from 'react';
import ContextMenuBridge, { CMMouseEvent } from '../ContextMenuBridge';
import { ChildrenProp } from './ContextMenu';

export interface ContextMenuOptionProps {
  children: ChildrenProp,
  href?:string,
  onClick?: () => void,
  select?: string
}

interface CMContextType {
  close: (e: CMMouseEvent) => void,
  doSelect: (action: string, event: CMMouseEvent) => void,
  bridge: ContextMenuBridge<any>;
  dark: boolean;
}

export const CMContext = createContext<CMContextType>({
  close: (e: CMMouseEvent) => {
  // do someything
  },
  doSelect: (action: string, event: CMMouseEvent) => {
  // do someything
  },
  bridge: new ContextMenuBridge({}),
  dark: false,
});

const ContextMenuOption = (
  {
    children, href, onClick, select,
  }: ContextMenuOptionProps,
):JSX.Element => {
  const { close, doSelect } = useContext(CMContext);
  const handleClick = (e:CMMouseEvent) => {
    e.preventDefault();
    if (select) doSelect(select, e);
    if (onClick) {
      onClick();
      close(e);
    }
  };

  return (
    <a
      onClick={handleClick}
      onContextMenu={handleClick}
      href={href || '#'}
      className="react-context-menu-option"
      aria-label="link"
      children={children}
    />
  );
};

ContextMenuOption.defaultProps = {
  href: undefined,
  onClick: undefined,
  select: undefined,
};

export default ContextMenuOption;
