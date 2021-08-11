/* eslint-disable react/no-children-prop */

import React, { createContext, useContext } from 'react';
import ContextMenuBridge, { CMMouseEvent } from '../ContextMenuBridge';

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

export interface ContextMenuOptionProps extends React.DetailedHTMLProps<
React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  onClick?: (event: CMMouseEvent) => void ;
  select?: string;
  disabled?: boolean
}

const ContextMenuOption = (props : ContextMenuOptionProps):JSX.Element => {
  const {
    children, onClick, select, disabled, href, className, ...other
  } = props;
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
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
      onClick={handleClick}
      onContextMenu={handleClick}
      href={href || '#'}
      className={`react-context-menu-option ${className || ''} ${disabled ? 'disabled' : 'active'}`}
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
