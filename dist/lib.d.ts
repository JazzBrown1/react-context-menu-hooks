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

interface ContextMenuExpandProps {
    children: ChildrenProp;
    style?: React.CSSProperties;
    onSelect?: (action: string, event: CMMouseEvent) => void;
    text: string;
}

interface ContextMenuOptionProps {
    children: ChildrenProp;
    href?: string;
    onClick?: (event: CMMouseEvent) => void;
    select?: string;
    disabled?: boolean;
}

declare type ChildrenProp = React.ReactChild | React.ReactChild[];
declare type XYPosition = {
    x: number;
    y: number;
};
interface ContextMenuProps<T> {
    children: ChildrenProp;
    style?: React.CSSProperties;
    bridge: ContextMenuBridge<T>;
    dark?: boolean;
    anchored?: boolean;
    onSelect?: (action: string, event: CMMouseEvent) => void;
}
declare function ContextMenu<T>({ children, style, bridge, dark, onSelect, anchored, }: ContextMenuProps<T>): JSX.Element;
declare namespace ContextMenu {
    var defaultProps: {
        style: {};
        dark: boolean;
        onSelect: undefined;
        anchored: boolean;
    };
    var Option: {
        ({ children, href, onClick, select, disabled, }: ContextMenuOptionProps): JSX.Element;
        defaultProps: {
            href: undefined;
            onClick: undefined;
            select: undefined;
            disabled: boolean;
        };
    };
    var Divider: () => JSX.Element;
    var Expand: {
        ({ children, style, onSelect, text, }: ContextMenuExpandProps): JSX.Element;
        defaultProps: {
            style: {};
            onSelect: undefined;
        };
    };
}

interface Props<T extends unknown> extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    bridge: ContextMenuBridge<T>;
    data: T;
}
declare const ContextMenuTriggerArea: <T extends unknown>(props: Props<T>) => JSX.Element;

declare const useContextMenu: <Type>(bridge: ContextMenuBridge<Type>) => {
    clickPosition: XYPosition;
    data: Type;
    open: boolean;
};

export default ContextMenu;
export { ContextMenu, ContextMenuBridge, ContextMenuTriggerArea, createBridge, useContextMenu };
