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

interface ContextMenuExpandProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onSelect'> {
    style?: React.CSSProperties;
    onSelect?: (action: string, event: CMMouseEvent) => void;
    text: string;
}

interface ContextMenuOptionProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    onClick?: (event: CMMouseEvent) => void;
    select?: string;
    disabled?: boolean;
}

declare type XYPosition = {
    x: number;
    y: number;
};
interface ContextMenuProps<T> extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onSelect'> {
    style?: React.CSSProperties;
    bridge: ContextMenuBridge<T>;
    dark?: boolean;
    onSelect?: (action: string, event: CMMouseEvent) => void;
}
declare function ContextMenu<T>(props: ContextMenuProps<T>): JSX.Element;
declare namespace ContextMenu {
    var defaultProps: {
        style: {};
        dark: boolean;
        onSelect: undefined;
    };
    var Option: {
        (props: ContextMenuOptionProps): JSX.Element;
        defaultProps: {
            href: undefined;
            onClick: undefined;
            select: undefined;
            disabled: boolean;
        };
    };
    var Divider: () => JSX.Element;
    var Expand: {
        (props: ContextMenuExpandProps): JSX.Element;
        defaultProps: {
            style: {};
            onSelect: undefined;
        };
    };
}

interface ContextMenuTriggerAreaProps<T extends unknown> extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    bridge: ContextMenuBridge<T>;
    data: T;
}
declare const ContextMenuTriggerArea: <T extends unknown>(props: ContextMenuTriggerAreaProps<T>) => JSX.Element;

declare const useContextMenu: <Type>(bridge: ContextMenuBridge<Type>) => Type;

declare const useContextMenuDetails: <Type>(bridge: ContextMenuBridge<Type>) => {
    clickPosition: XYPosition;
    data: Type;
    open: boolean;
};

export { ContextMenu, ContextMenuBridge, ContextMenuExpandProps, ContextMenuOptionProps, ContextMenuProps, ContextMenuTriggerArea, ContextMenuTriggerAreaProps, XYPosition, createBridge, useContextMenu, useContextMenuDetails };
