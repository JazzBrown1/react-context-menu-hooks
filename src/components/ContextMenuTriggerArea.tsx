/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-children-prop */
import React from 'react';
import ContextMenuBridge from '../ContextMenuBridge';

// eslint-disable-next-line max-len
export interface ContextMenuTriggerAreaProps<T extends unknown> extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  bridge: ContextMenuBridge<T>;
  data: T;
}

const ContextMenuTriggerArea = <T extends unknown>(
  props : ContextMenuTriggerAreaProps<T>,
):JSX.Element => {
  const {
    children, data, bridge, ...other
  } = props;
  return (
    <div
      {...other}
      onContextMenu={(e) => {
        // console.log('trigger', data);
        if (bridge) bridge.handleOpen(e, data);
      }}
      children={children}
    />
  );
};

export default ContextMenuTriggerArea;
