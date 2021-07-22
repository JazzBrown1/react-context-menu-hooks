import React from 'react';

declare type CMMouseEvent = React.MouseEvent | globalThis.MouseEvent;
declare class ContextMenuBridge<Type> {
    defaultData: Type;
    data: Type;
    clickPosition: XYPosition;
    open: boolean;
    hookListeners: Array<(event: CMMouseEvent, data: Type, open: boolean) => void>;
    constructor(defaultData: Type);
    addListener: (listener: (event: CMMouseEvent, data: Type, open: boolean) => void) => boolean;
    removeListener: (listener: (event: CMMouseEvent, data: Type, open: boolean) => void) => boolean;
    menuListener: (event: CMMouseEvent, data: Type, open: boolean) => void;
    dispatch: (event: CMMouseEvent) => void;
    handleOpen: (event: CMMouseEvent, data: Type) => void;
    handleClose: (event: CMMouseEvent) => void;
    forceClose: (event: CMMouseEvent) => void;
}
declare const createBridge: <Type>(defaultData: Type) => ContextMenuBridge<Type>;

interface ContextMenuOptionProps {
    children: ChildrenProp;
    href?: string;
    onClick?: () => void;
    select?: string;
}

declare type ChildrenProp = React.ReactChild | React.ReactChild[];
declare type XYPosition = {
    x: number;
    y: number;
};
interface ContextMenuExpand<T> {
    children: ChildrenProp;
    style?: React.CSSProperties;
    bridge: ContextMenuBridge<T>;
    dark?: boolean;
    anchored?: boolean;
    onSelect?: (action: string, event: CMMouseEvent) => void;
}
declare function ContextMenu<T>({ children, style, bridge, dark, onSelect, anchored, }: ContextMenuExpand<T>): JSX.Element;
declare namespace ContextMenu {
    var defaultProps: {
        style: {};
        dark: boolean;
        onSelect: undefined;
        anchored: boolean;
    };
    var Option: {
        ({ children, href, onClick, select, }: ContextMenuOptionProps): JSX.Element;
        defaultProps: {
            href: undefined;
            onClick: undefined;
            select: undefined;
        };
    };
    var Divider: () => JSX.Element;
    var Expand: typeof ContextMenuExpand;
}

declare type Props<T extends unknown> = {
    bridge: ContextMenuBridge<T>;
    data: T;
    children?: ChildrenProp;
    style?: React.CSSProperties;
};
declare const ContextMenuTriggerArea: {
    <T extends unknown>({ children, data, style, bridge, }: Props<T>): JSX.Element;
    defaultProps: {
        children: never[];
        style: {};
    };
};

declare const useContextMenu: <Type>(bridge: ContextMenuBridge<Type>) => {
    clickPosition: XYPosition;
    data: Type;
    open: boolean;
};

export default ContextMenu;
export { ContextMenu, ContextMenuBridge, ContextMenuTriggerArea, createBridge, useContextMenu };
