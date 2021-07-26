/* eslint-disable react/no-children-prop */

import React, { createContext, useContext } from 'react';
import ContextMenuBridge, { CMMouseEvent } from '../ContextMenuBridge';
import { ChildrenProp } from './ContextMenu';

interface CMContextType {
  doClose: (e: CMMouseEvent) => void,
  doSelect: (action: string, event: CMMouseEvent) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bridge: ContextMenuBridge<any>;
  dark: boolean;
}

export const CMContext = createContext<CMContextType>({
  doClose: () => {
    // do something
  },
  doSelect: () => {
    // do something
  },
  bridge: new ContextMenuBridge({}),
  dark: false,
});

export interface ContextMenuOptionProps {
  children: ChildrenProp,
  href?:string,
  onClick?: (event: CMMouseEvent) => void ;
  select?: string;
  disabled?: boolean
}

const ContextMenuOption = (
  {
    children, href, onClick, select, disabled,
  }: ContextMenuOptionProps,
):JSX.Element => {
  const { doClose, doSelect } = useContext(CMContext);
  const handleClick = (e:CMMouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    if (select) {
      doSelect(select, e);
      doClose(e);
    }
    if (onClick) {
      onClick(e);
      doClose(e);
    }
  };

  return (
    <a
      onClick={handleClick}
      onContextMenu={handleClick}
      href={href || '#'}
      className={`react-context-menu-option ${disabled ? 'disabled' : 'active'}`}
      aria-label="link"
      children={children}
    />
  );
};

ContextMenuOption.defaultProps = {
  href: undefined,
  onClick: undefined,
  select: undefined,
  disabled: false,
};

export default ContextMenuOption;
