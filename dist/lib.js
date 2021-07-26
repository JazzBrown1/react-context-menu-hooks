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
    doClose: () => {
        // do something
    },
    doSelect: () => {
        // do something
    },
    bridge: new ContextMenuBridge({}),
    dark: false,
});
const ContextMenuOption = ({ children, href, onClick, select, disabled, }) => {
    const { doClose, doSelect } = useContext(CMContext);
    const handleClick = (e) => {
        e.preventDefault();
        if (disabled)
            return;
        if (select) {
            doSelect(select, e);
            doClose(e);
        }
        if (onClick) {
            onClick(e);
            doClose(e);
        }
    };
    return (jsx("a", { onClick: handleClick, onContextMenu: handleClick, href: href || '#', className: `react-context-menu-option ${disabled ? 'disabled' : 'active'}`, "aria-label": "link", children: children }, void 0));
};
ContextMenuOption.defaultProps = {
    href: undefined,
    onClick: undefined,
    select: undefined,
    disabled: false,
};

const ContextMenuDivider = () => (jsx("div", { className: "react-context-menu-divider" }, void 0));

// eslint-disable-next-line react/require-default-props
const ContextMenuExpand = ({ children, style = {}, onSelect, text, }) => {
    const { bridge, dark } = useContext(CMContext);
    const optionRef = useRef(null);
    const menuRef = useRef(null);
    const [relativePosition, setRelativePosition] = useState({ x: 0, y: 0 });
    const [expanded, setExpanded] = useState(false);
    useLayoutEffect(() => {
        if (!expanded || !optionRef.current || !menuRef.current)
            return;
        const optionRect = optionRef.current.getBoundingClientRect();
        const menuRect = menuRef.current.getBoundingClientRect();
        const canGoRight = window.innerWidth - optionRect.right > menuRect.width;
        const canGoDown = window.innerHeight - optionRect.top > menuRect.height;
        const x = canGoRight
            ? optionRect.width
            : -optionRect.width;
        const y = canGoDown
            ? 0
            : window.innerHeight - menuRect.height - optionRect.top - 10;
        // console.log('expand', canGoDown, window.innerHeight, menuRect.height, optionRect.top, y);
        setRelativePosition({ x, y });
    }, [expanded]);
    const styles = Object.assign(Object.assign({}, style), { display: expanded ? 'block' : 'none', top: relativePosition.y, left: relativePosition.x });
    return (jsx(CMContext.Provider, Object.assign({ value: {
            doClose: (e) => {
                bridge.forceClose(e);
            },
            doSelect: (action, event) => {
                if (onSelect)
                    onSelect(action, event);
            },
            bridge,
            dark,
        } }, { children: jsxs("div", Object.assign({ onMouseEnter: () => { setExpanded(true); }, onMouseLeave: () => { setExpanded(false); }, className: "react-context-menu-option active expand-option", ref: optionRef, style: { position: 'relative' } }, { children: [text, jsx("span", Object.assign({ style: {
                        position: 'absolute', right: '0.5rem', top: '0.4rem', fontSize: '0.5rem',
                    } }, { children: "\u25B6" }), void 0), jsx("div", Object.assign({ className: `react-context-menu expand-menu${dark ? ' theme-dark' : 'theme-light'}`, ref: menuRef, style: styles }, { children: children }), void 0)] }), void 0) }), void 0));
};
ContextMenuExpand.defaultProps = {
    style: {},
    onSelect: undefined,
};

const getYDirection = (menuRect, clickPosition) => {
    if (window.innerHeight + window.pageYOffset - clickPosition.y > menuRect.height)
        return 'down';
    if (clickPosition.y - window.pageYOffset > menuRect.height)
        return 'up';
    return 'center';
};
const getXDirection = (menuRect, clickPosition) => {
    if (window.innerWidth + window.pageXOffset - clickPosition.x > menuRect.width)
        return 'right';
    return 'left';
};
// eslint-disable-next-line react/require-default-props
function ContextMenu({ children, style = {}, bridge, dark = false, onSelect, }) {
    const menuRef = useRef(null);
    const { clickPosition, open } = useContextMenu(bridge);
    const anchorRef = useRef(null);
    const [relativePosition, setRelativePosition] = useState({ x: 0, y: 0 });
    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (open) {
            const handleOutsideClick = (e) => {
                if (open
                    && menuRef.current
                    && e.target && e.target instanceof Element && !menuRef.current.contains(e.target)) {
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
        if (!anchorRef.current || !menuRef.current)
            return;
        const anchorRect = anchorRef.current.getBoundingClientRect();
        const menuRect = menuRef.current.getBoundingClientRect();
        const xDir = getXDirection(menuRect, clickPosition);
        const yDir = getYDirection(menuRect, clickPosition);
        const x = xDir === 'right'
            ? clickPosition.x - window.pageXOffset - anchorRect.left
            : clickPosition.x - window.pageXOffset - anchorRect.left - menuRect.width;
        // eslint-disable-next-line no-nested-ternary
        const y = yDir === 'down'
            ? clickPosition.y - window.pageYOffset - anchorRect.top
            : yDir === 'up'
                ? clickPosition.y - window.pageYOffset - anchorRect.top - menuRect.height
                : window.innerHeight - menuRect.height - (anchorRect.top) - 10;
        setRelativePosition({ x, y });
    }, [clickPosition, open]);
    const styles = Object.assign(Object.assign({}, style), {
        display: open ? 'block' : 'none',
        top: relativePosition.y,
        left: relativePosition.x,
        anchored: false,
    });
    const doSelect = (action, event) => {
        if (onSelect)
            onSelect(action, event);
    };
    const doClose = (e) => {
        bridge.forceClose(e);
    };
    return (jsx(CMContext.Provider, Object.assign({ value: {
            doClose,
            doSelect,
            bridge,
            dark,
        } }, { children: jsx("div", Object.assign({ className: "react-context-menu-anchor", ref: anchorRef }, { children: jsx("div", { className: `react-context-menu${dark ? ' theme-dark' : ''}`, style: styles, ref: menuRef, children: children, onContextMenu: (e) => { e.preventDefault(); } }, void 0) }), void 0) }), void 0));
}
ContextMenu.defaultProps = {
    style: {},
    dark: false,
    onSelect: undefined,
};
ContextMenu.Option = ContextMenuOption;
ContextMenu.Divider = ContextMenuDivider;
ContextMenu.Expand = ContextMenuExpand;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

const ContextMenuTriggerArea = (props) => {
    const { children, data, bridge } = props, other = __rest(props, ["children", "data", "bridge"]);
    return (jsx("div", Object.assign({}, other, { onContextMenu: (e) => {
            console.log('trigger', data);
            if (bridge)
                bridge.handleOpen(e, data);
        }, children: children }), void 0));
};

export default ContextMenu;
export { ContextMenu, ContextMenuBridge, ContextMenuTriggerArea, createBridge, useContextMenu };
