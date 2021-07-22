import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect, createContext, useContext, useRef, useLayoutEffect } from 'react';

const useContextMenu = (bridge) => {
    const [state, setState] = useState({
        data: bridge.defaultData,
        clickPosition: { x: 0, y: 0 },
        open: false,
    });
    useEffect(() => {
        // eslint-disable-next-line no-param-reassign
        const listener = (event, data, open) => {
            const clickPosition = { x: event.pageX, y: event.pageY };
            setState({ data, clickPosition, open });
            console.log('hook-listener', { open, event, data });
        };
        bridge.addListener(listener);
        return () => {
            bridge.removeListener(listener);
        };
    }, [bridge]);
    return state;
};

// type InternalListener = <T>(event: CMMouseEvent, data: T) => void;
class ContextMenuBridge {
    constructor(defaultData) {
        this.clickPosition = { x: 0, y: 0 };
        this.open = false;
        this.hookListeners = [];
        this.addListener = (listener) => {
            this.hookListeners.push(listener);
            return true;
        };
        this.removeListener = (listener) => {
            const index = this.hookListeners.indexOf(listener);
            if (index === -1)
                return false;
            this.hookListeners.splice(index, 1);
            return true;
        };
        this.menuListener = (event, data, open) => {
            // noop
        };
        this.dispatch = (event) => {
            this.hookListeners.forEach((handler) => { handler(event, this.data, this.open); });
            this.menuListener(event, this.data, this.open);
        };
        this.handleOpen = (event, data) => {
            if (event.defaultPrevented)
                return;
            event.preventDefault();
            console.log('bridgeOpenEvent', event, data, this.hookListeners.length);
            this.data = data;
            this.open = true;
            this.clickPosition = { x: event.pageX, y: event.pageY };
            this.dispatch(event);
        };
        this.handleClose = (event) => {
            if (event.defaultPrevented)
                return;
            console.log('bridgeCloseEvent', event, this.hookListeners.length);
            this.data = this.defaultData;
            this.open = false;
            this.dispatch(event);
        };
        this.forceClose = (event) => {
            console.log('bridgeForceCloseEvent', event, this.hookListeners.length);
            this.data = this.defaultData;
            this.open = false;
            this.dispatch(event);
        };
        this.defaultData = defaultData;
        this.data = defaultData;
    }
}
const createBridge = (data) => (new ContextMenuBridge(data));

const CMContext = createContext({
    close: (e) => {
        // do someything
    },
    doSelect: (action, event) => {
        // do someything
    },
    bridge: new ContextMenuBridge({}),
    dark: false,
});
const ContextMenuOption = ({ children, href, onClick, select, }) => {
    const { close, doSelect } = useContext(CMContext);
    const handleClick = (e) => {
        e.preventDefault();
        if (select)
            doSelect(select, e);
        if (onClick) {
            onClick();
            close(e);
        }
    };
    return (jsx("a", { onClick: handleClick, onContextMenu: handleClick, href: href || '#', className: "react-context-menu-option", "aria-label": "link", children: children }, void 0));
};
ContextMenuOption.defaultProps = {
    href: undefined,
    onClick: undefined,
    select: undefined,
};

const ContextMenuDivider = () => (jsx("div", { className: "react-context-menu-divider" }, void 0));

// eslint-disable-next-line react/require-default-props
function ContextMenuExpand({ children, style = {}, onSelect, text, }) {
    const { bridge, dark } = useContext(CMContext);
    const ref = useRef(null);
    const { clickPosition, open } = useContextMenu(bridge);
    const [relativePosition, setRelativePosition] = useState({ x: 0, y: 0 });
    useLayoutEffect(() => {
        if (!open)
            return;
        if (!ref.current)
            return;
        const rect = ref.current.getBoundingClientRect();
        setRelativePosition({ x: rect.width, y: 0 });
    }, [clickPosition, open]);
    const styles = Object.assign(Object.assign({}, style), {
        top: 0,
        left: relativePosition.x,
    });
    return (jsx(CMContext.Provider, Object.assign({ value: {
            close: (e) => {
                bridge.forceClose(e);
            },
            doSelect: (action, event) => {
                if (onSelect)
                    onSelect(action, event);
            },
            bridge,
            dark,
        } }, { children: jsxs("div", Object.assign({ className: "react-context-menu-option expand-option", ref: ref, style: { position: 'relative' } }, { children: [text, jsx("span", Object.assign({ style: {
                        position: 'absolute', right: '0.5rem', top: '0.4rem', fontSize: '0.5rem',
                    } }, { children: "\u25B6" }), void 0), jsx("div", Object.assign({ className: `react-context-menu expand-menu${dark ? ' theme-dark' : 'theme-light'}`, style: styles }, { children: children }), void 0)] }), void 0) }), void 0));
}
ContextMenuExpand.defaultProps = {
    style: {},
    onSelect: undefined,
};

// eslint-disable-next-line react/require-default-props
function ContextMenu({ children, style = {}, bridge, dark = false, onSelect, anchored, }) {
    const ref = useRef(null);
    const { clickPosition, open } = useContextMenu(bridge);
    const anchorRef = useRef(null);
    const [relativePosition, setRelativePosition] = useState({ x: 0, y: 0 });
    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (open) {
            const handleOutsideClick = (e) => {
                if (open
                    && ref.current
                    && e.target && e.target instanceof Element && !ref.current.contains(e.target)) {
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
        if (!open)
            return;
        if (!anchored) {
            setRelativePosition(clickPosition);
            return;
        }
        if (!anchorRef.current)
            return;
        const rect = anchorRef.current.getBoundingClientRect();
        setRelativePosition({ x: clickPosition.x - rect.left, y: clickPosition.y - rect.top });
    }, [clickPosition, open]);
    const styles = Object.assign(Object.assign({}, style), {
        display: open ? 'block' : 'none',
        top: relativePosition.y,
        left: relativePosition.x,
        anchored: false,
    });
    return (jsx(CMContext.Provider, Object.assign({ value: {
            close: (e) => {
                console.log('this happened', e);
                bridge.forceClose(e);
            },
            doSelect: (action, event) => {
                if (onSelect)
                    onSelect(action, event);
            },
            bridge,
            dark,
        } }, { children: jsx("div", Object.assign({ className: "react-context-menu-anchor", ref: anchorRef }, { children: jsx("div", { className: `react-context-menu${dark ? ' theme-dark' : ''}`, style: styles, ref: ref, children: children }, void 0) }), void 0) }), void 0));
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

const ContextMenuTriggerArea = ({ children, data, style, bridge, }) => (jsx("div", { onContextMenu: (e) => {
        console.log('trigger', data);
        if (bridge)
            bridge.handleOpen(e, data);
    }, children: children, style: style }, void 0));
ContextMenuTriggerArea.defaultProps = {
    children: [],
    style: {},
};

export default ContextMenu;
export { ContextMenu, ContextMenuBridge, ContextMenuTriggerArea, createBridge, useContextMenu };
