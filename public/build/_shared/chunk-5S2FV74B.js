import{a as O,b as E}from"/build/_shared/chunk-TQC3RT7F.js";import{c as _}from"/build/_shared/chunk-Q3IECNXJ.js";var r=_(O(),1),S=_(E(),1),k={exports:{}},d={};var w;function j(){if(w)return d;w=1;var o=r.default,t=Symbol.for("react.element"),a=Symbol.for("react.fragment"),c=Object.prototype.hasOwnProperty,y=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function e(f,n,v){var u,p={},i=null,l=null;v!==void 0&&(i=""+v),n.key!==void 0&&(i=""+n.key),n.ref!==void 0&&(l=n.ref);for(u in n)c.call(n,u)&&!s.hasOwnProperty(u)&&(p[u]=n[u]);if(f&&f.defaultProps)for(u in n=f.defaultProps,n)p[u]===void 0&&(p[u]=n[u]);return{$$typeof:t,type:f,key:i,ref:l,props:p,_owner:y.current}}return d.Fragment=a,d.jsx=e,d.jsxs=e,d}k.exports=j();var m=k.exports,R=(0,r.forwardRef)(function({open:o,onShow:t,onHide:a,children:c,...y},s){let[e,f]=(0,r.useState)(),{titleBar:n,saveBar:v,modalContent:u}=r.Children.toArray(c).reduce((i,l)=>{let g=P(l),h=g==="ui-title-bar",b=g==="ui-save-bar";return!h&&!b&&i.modalContent.push(l),{...i,titleBar:h?l:i.titleBar,saveBar:b?l:i.saveBar}},{modalContent:[]}),p=e&&e.content?S.default.createPortal(u,e.content):null;return(0,r.useEffect)(()=>{e&&(o?e.show():e.hide())},[e,o]),(0,r.useEffect)(()=>{if(!(!e||!t))return e.addEventListener("show",t),()=>{e.removeEventListener("show",t)}},[e,t]),(0,r.useEffect)(()=>{if(!(!e||!a))return e.addEventListener("hide",a),()=>{e.removeEventListener("hide",a)}},[e,a]),(0,r.useEffect)(()=>{if(e)return()=>{e.hide()}},[e]),m.jsxs("ui-modal",{...y,ref:i=>{f(i),s&&(typeof s=="function"?s(i):s.current=i)},children:[n,v,m.jsx("div",{children:p})]})});R.displayName="ui-modal";function P(o){if(!o)return;let t=typeof o=="object"&&"type"in o?o.type:void 0,a=typeof t=="string"?t:void 0,c=typeof t=="object"?t.displayName:void 0;return a||(typeof c=="string"?c:void 0)}var N="ui-nav-menu",C="ui-title-bar",T=(0,r.forwardRef)(function({open:o,onShow:t,onHide:a,children:c,...y},s){let[e,f]=(0,r.useState)();return(0,r.useEffect)(()=>{e&&(o?e.show():e.hide())},[e,o]),(0,r.useEffect)(()=>{if(!(!e||!t))return e.addEventListener("show",t),()=>{e.removeEventListener("show",t)}},[e,t]),(0,r.useEffect)(()=>{if(!(!e||!a))return e.addEventListener("hide",a),()=>{e.removeEventListener("hide",a)}},[e,a]),(0,r.useEffect)(()=>{if(e)return()=>{e.hide()}},[e]),m.jsx("ui-save-bar",{...y,ref:n=>{f(n),s&&(typeof s=="function"?s(n):s.current=n)},children:c})});T.displayName="ui-save-bar";var x=new Proxy({},{get(o,t){throw Error(`shopify.${String(t)} can't be used in a server environment. You likely need to move this code into an Effect.`)}});function $(){if(typeof window>"u")return x;if(!window.shopify)throw Error("The shopify global is not defined. This likely means the App Bridge script tag was not added correctly to this page");return window.shopify}export{N as a,C as b,$ as c};
/*! Bundled license information:

@shopify/app-bridge-react/dist/index.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@shopify/app-bridge-react/dist/index.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
