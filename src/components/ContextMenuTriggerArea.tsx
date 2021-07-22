/* eslint-disable react/no-children-prop */
import React from 'react';
import ContextMenuBridge from '../ContextMenuBridge';
import { ChildrenProp } from './ContextMenu';

type Props<T extends unknown> = {
  bridge: ContextMenuBridge<T>;
  data: T;
  children?: ChildrenProp;
  style?: React.CSSProperties;
};

const ContextMenuTriggerArea = <T extends unknown>({
  children, data, style, bridge,
} : Props<T>):JSX.Element => (
  <div
    onContextMenu={(e) => {
      console.log('trigger', data);
      if (bridge) bridge.handleOpen(e, data);
    }}
    children={children}
    style={style}
  />
  );
ContextMenuTriggerArea.defaultProps = {
  children: [],
  style: {},
};

export default ContextMenuTriggerArea;
