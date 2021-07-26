/*! For license information please see main.c6964e49.chunk.js.LICENSE.txt */
(this["webpackJsonpreact-context-menu-hooks-example"]=this["webpackJsonpreact-context-menu-hooks-example"]||[]).push([[0],[,,,,,,,,,,function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o=n(1),c=n.n(o),i=n(4),r=n.n(i),a=(n(10),n(2)),s=n(5),l=n(0),d=function(e){var t=Object(o.useState)({data:e.defaultData,clickPosition:{x:0,y:0},open:!1}),n=Object(a.a)(t,2),c=n[0],i=n[1];return Object(o.useEffect)((function(){var t=function(e,t,n){var o={x:e.pageX,y:e.pageY};i({data:t,clickPosition:o,open:n}),console.log("hook-listener",{open:n,event:e,data:t})};return e.addListener(t),function(){e.removeListener(t)}}),[e]),c},u=function e(t){var n=this;Object(s.a)(this,e),this.clickPosition={x:0,y:0},this.open=!1,this.hookListeners=[],this.addListener=function(e){return n.hookListeners.push(e),!0},this.removeListener=function(e){var t=n.hookListeners.indexOf(e);return-1!==t&&(n.hookListeners.splice(t,1),!0)},this.menuListener=function(e,t,n){},this.dispatch=function(e){n.hookListeners.forEach((function(t){t(e,n.data,n.open)})),n.menuListener(e,n.data,n.open)},this.handleOpen=function(e,t){e.defaultPrevented||(e.preventDefault(),console.log("bridgeOpenEvent",e,t,n.hookListeners.length),n.data=t,n.open=!0,n.clickPosition={x:e.pageX,y:e.pageY},n.dispatch(e))},this.handleClose=function(e){e.defaultPrevented||(console.log("bridgeCloseEvent",e,n.hookListeners.length),n.data=n.defaultData,n.open=!1,n.dispatch(e))},this.forceClose=function(e){console.log("bridgeForceCloseEvent",e,n.hookListeners.length),n.data=n.defaultData,n.open=!1,n.dispatch(e)},this.defaultData=t,this.data=t},h=Object(o.createContext)({doClose:function(){},doSelect:function(){},bridge:new u({}),dark:!1}),f=function(e){var t=e.children,n=e.href,c=e.onClick,i=e.select,r=e.disabled,a=Object(o.useContext)(h),s=a.doClose,d=a.doSelect,u=function(e){e.preventDefault(),r||(i&&(d(i,e),s(e)),c&&(c(e),s(e)))};return Object(l.jsx)("a",{onClick:u,onContextMenu:u,href:n||"#",className:"react-context-menu-option ".concat(r?"disabled":"active"),"aria-label":"link",children:t},void 0)};f.defaultProps={href:void 0,onClick:void 0,select:void 0,disabled:!1};var b=function(e){var t=e.children,n=e.style,c=void 0===n?{}:n,i=e.onSelect,r=e.text,s=Object(o.useContext)(h),d=s.bridge,u=s.dark,f=Object(o.useRef)(null),b=Object(o.useRef)(null),j=Object(o.useState)({x:0,y:0}),p=Object(a.a)(j,2),O=p[0],g=p[1],x=Object(o.useState)(!1),v=Object(a.a)(x,2),m=v[0],w=v[1];Object(o.useLayoutEffect)((function(){if(m&&f.current&&b.current){var e=f.current.getBoundingClientRect(),t=b.current.getBoundingClientRect(),n=window.innerWidth-e.right>t.width,o=window.innerHeight-e.top>t.height,c=n?e.width:-e.width,i=o?0:window.innerHeight-t.height-e.top-10;g({x:c,y:i})}}),[m]);var C=Object.assign(Object.assign({},c),{display:m?"block":"none",top:O.y,left:O.x});return Object(l.jsx)(h.Provider,Object.assign({value:{doClose:function(e){d.forceClose(e)},doSelect:function(e,t){i&&i(e,t)},bridge:d,dark:u}},{children:Object(l.jsxs)("div",Object.assign({onMouseEnter:function(){w(!0)},onMouseLeave:function(){w(!1)},className:"react-context-menu-option active expand-option",ref:f,style:{position:"relative"}},{children:[r,Object(l.jsx)("span",Object.assign({style:{position:"absolute",right:"0.5rem",top:"0.4rem",fontSize:"0.5rem"}},{children:"\u25b6"}),void 0),Object(l.jsx)("div",Object.assign({className:"react-context-menu expand-menu".concat(u?" theme-dark":"theme-light"),ref:b,style:C},{children:t}),void 0)]}),void 0)}),void 0)};b.defaultProps={style:{},onSelect:void 0};function j(e){var t=e.children,n=e.style,c=void 0===n?{}:n,i=e.bridge,r=e.dark,s=void 0!==r&&r,u=e.onSelect,f=Object(o.useRef)(null),b=d(i),j=b.clickPosition,p=b.open,O=Object(o.useRef)(null),g=Object(o.useState)({x:0,y:0}),x=Object(a.a)(g,2),v=x[0],m=x[1];Object(o.useEffect)((function(){if(p){var e=function(e){p&&f.current&&e.target&&e.target instanceof Element&&!f.current.contains(e.target)&&i.handleClose(e)};return document.addEventListener("mousedown",e),function(){document.removeEventListener("mousedown",e)}}}),[p]),Object(o.useLayoutEffect)((function(){if(p&&O.current&&f.current){var e=O.current.getBoundingClientRect(),t=f.current.getBoundingClientRect(),n=function(e,t){return window.innerWidth+window.pageXOffset-t.x>e.width?"right":"left"}(t,j),o=function(e,t){return window.innerHeight+window.pageYOffset-t.y>e.height?"down":t.y-window.pageYOffset>e.height?"up":"center"}(t,j),c="right"===n?j.x-window.pageXOffset-e.left:j.x-window.pageXOffset-e.left-t.width,i="down"===o?j.y-window.pageYOffset-e.top:"up"===o?j.y-window.pageYOffset-e.top-t.height:window.innerHeight-t.height-e.top-10;m({x:c,y:i})}}),[j,p]);var w=Object.assign(Object.assign({},c),{display:p?"block":"none",top:v.y,left:v.x,anchored:!1});return Object(l.jsx)(h.Provider,Object.assign({value:{doClose:function(e){i.forceClose(e)},doSelect:function(e,t){u&&u(e,t)},bridge:i,dark:s}},{children:Object(l.jsx)("div",Object.assign({className:"react-context-menu-anchor",ref:O},{children:Object(l.jsx)("div",{className:"react-context-menu".concat(s?" theme-dark":""),style:w,ref:f,children:t,onContextMenu:function(e){e.preventDefault()}},void 0)}),void 0)}),void 0)}j.defaultProps={style:{},dark:!1,onSelect:void 0},j.Option=f,j.Divider=function(){return Object(l.jsx)("div",{className:"react-context-menu-divider"},void 0)},j.Expand=b;var p=function(e){var t=e.children,n=e.data,o=e.bridge,c=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var c=0;for(o=Object.getOwnPropertySymbols(e);c<o.length;c++)t.indexOf(o[c])<0&&Object.prototype.propertyIsEnumerable.call(e,o[c])&&(n[o[c]]=e[o[c]])}return n}(e,["children","data","bridge"]);return Object(l.jsx)("div",Object.assign({},c,{onContextMenu:function(e){console.log("trigger",n),o&&o.handleOpen(e,n)},children:t}),void 0)},O=(n(12),n(13),new u({changeColor:function(){},color:"none",changeShape:function(){},shape:"none"}));var g=function(){var e=Object(o.useState)(),t=Object(a.a)(e,2),n=t[0],c=t[1],i=d(O).data,r=i.changeColor,s=i.changeShape,u=i.color,h=i.shape;return Object(l.jsxs)(j,{dark:!0,bridge:O,children:[Object(l.jsx)(j.Option,{onClick:function(){c({color:u,shape:h})},children:"Copy Shape Styles"}),Object(l.jsx)(j.Option,{disabled:!n,onClick:function(){n&&(r(n.color),s(n.shape))},children:"Paste Shape Styles"}),Object(l.jsx)(j.Divider,{}),Object(l.jsx)(j.Option,{onClick:function(){r("blue"),s("circle")},children:"Reset Shape"}),Object(l.jsx)(j.Divider,{}),Object(l.jsxs)(j.Expand,{text:"Change Color...",onSelect:function(e){r(e)},children:[Object(l.jsx)(j.Option,{disabled:"yellow"===u,select:"yellow",children:"Change to Yellow"}),Object(l.jsx)(j.Option,{disabled:"green"===u,select:"green",children:"Change to Green"}),Object(l.jsx)(j.Option,{disabled:"red"===u,select:"red",children:"Change to Red"}),Object(l.jsx)(j.Option,{disabled:"blue"===u,select:"blue",children:"Change to Blue"})]}),Object(l.jsxs)(j.Expand,{text:"Change Shape",onSelect:function(e){s(e)},children:[Object(l.jsx)(j.Option,{disabled:"square"===h,select:"square",children:"Change to Square"}),Object(l.jsx)(j.Option,{disabled:"circle"===h,select:"circle",children:"Change to Circle"})]})]})},x=function(){var e=Object(o.useState)("blue"),t=Object(a.a)(e,2),n=t[0],c=t[1],i=Object(o.useState)("circle"),r=Object(a.a)(i,2),s=r[0],d=r[1];return Object(l.jsx)(p,{bridge:O,className:"shape ".concat(n," ").concat(s),data:{color:n,changeColor:function(e){c(e)},shape:s,changeShape:function(e){d(e)}},children:Object(l.jsx)("p",{children:"Right click and change how I look!"})})};var v=function(){return Object(l.jsxs)("div",{className:"App",children:[Object(l.jsx)("h1",{children:"react-context-menu-hooks example"}),Object(l.jsx)(g,{}),Object(l.jsxs)("div",{children:[Object(l.jsx)(x,{}),Object(l.jsx)(x,{})]}),Object(l.jsxs)("div",{children:[Object(l.jsx)(x,{}),Object(l.jsx)(x,{})]}),Object(l.jsxs)("p",{children:["Check out the"," ",Object(l.jsx)("a",{href:"https://github.com/JazzBrown1/react-context-menu-hooks",rel:"noreferrer",target:"_blank",children:"Github"})]}),Object(l.jsxs)("p",{children:["The example source code available"," ",Object(l.jsx)("a",{href:"https://github.com/JazzBrown1/react-context-menu-hooks/tree/main/example",rel:"noreferrer",target:"_blank",children:"here"})]})]})},m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,15)).then((function(t){var n=t.getCLS,o=t.getFID,c=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),o(e),c(e),i(e),r(e)}))};r.a.render(Object(l.jsx)(c.a.StrictMode,{children:Object(l.jsx)(v,{})}),document.getElementById("root")),m()}],[[14,1,2]]]);
//# sourceMappingURL=main.c6964e49.chunk.js.map