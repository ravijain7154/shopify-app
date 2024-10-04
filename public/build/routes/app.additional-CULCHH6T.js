import{b as h,d as x,e as _,f as w,i as b,j as S,k,l as C}from"/build/_shared/chunk-C35P34BX.js";import{a as I}from"/build/_shared/chunk-O3WTSDCE.js";import{a as B,b as P}from"/build/_shared/chunk-4HXKWYDW.js";import{c as g}from"/build/_shared/chunk-Q3IECNXJ.js";var t=g(B(),1),$=g(I(),1),L={exports:{}},v={};var N;function A(){if(N)return v;N=1;var a=t.default,n=Symbol.for("react.element"),i=Symbol.for("react.fragment"),l=Object.prototype.hasOwnProperty,y=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,u={key:!0,ref:!0,__self:!0,__source:!0};function e(f,o,m){var c,d={},s=null,p=null;m!==void 0&&(s=""+m),o.key!==void 0&&(s=""+o.key),o.ref!==void 0&&(p=o.ref);for(c in o)l.call(o,c)&&!u.hasOwnProperty(c)&&(d[c]=o[c]);if(f&&f.defaultProps)for(c in o=f.defaultProps,o)d[c]===void 0&&(d[c]=o[c]);return{$$typeof:n,type:f,key:s,ref:p,props:d,_owner:y.current}}return v.Fragment=i,v.jsx=e,v.jsxs=e,v}L.exports=A();var O=L.exports,M=(0,t.forwardRef)(function({open:a,onShow:n,onHide:i,children:l,...y},u){let[e,f]=(0,t.useState)(),{titleBar:o,saveBar:m,modalContent:c}=t.Children.toArray(l).reduce((s,p)=>{let j=U(p),R=j==="ui-title-bar",T=j==="ui-save-bar";return!R&&!T&&s.modalContent.push(p),{...s,titleBar:R?p:s.titleBar,saveBar:T?p:s.saveBar}},{modalContent:[]}),d=e&&e.content?$.default.createPortal(c,e.content):null;return(0,t.useEffect)(()=>{e&&(a?e.show():e.hide())},[e,a]),(0,t.useEffect)(()=>{if(!(!e||!n))return e.addEventListener("show",n),()=>{e.removeEventListener("show",n)}},[e,n]),(0,t.useEffect)(()=>{if(!(!e||!i))return e.addEventListener("hide",i),()=>{e.removeEventListener("hide",i)}},[e,i]),(0,t.useEffect)(()=>{if(e)return()=>{e.hide()}},[e]),O.jsxs("ui-modal",{...y,ref:s=>{f(s),u&&(typeof u=="function"?u(s):u.current=s)},children:[o,m,O.jsx("div",{children:d})]})});M.displayName="ui-modal";function U(a){if(!a)return;let n=typeof a=="object"&&"type"in a?a.type:void 0,i=typeof n=="string"?n:void 0,l=typeof n=="object"?n.displayName:void 0;return i||(typeof l=="string"?l:void 0)}var D="ui-title-bar",W=(0,t.forwardRef)(function({open:a,onShow:n,onHide:i,children:l,...y},u){let[e,f]=(0,t.useState)();return(0,t.useEffect)(()=>{e&&(a?e.show():e.hide())},[e,a]),(0,t.useEffect)(()=>{if(!(!e||!n))return e.addEventListener("show",n),()=>{e.removeEventListener("show",n)}},[e,n]),(0,t.useEffect)(()=>{if(!(!e||!i))return e.addEventListener("hide",i),()=>{e.removeEventListener("hide",i)}},[e,i]),(0,t.useEffect)(()=>{if(e)return()=>{e.hide()}},[e]),O.jsx("ui-save-bar",{...y,ref:o=>{f(o),u&&(typeof u=="function"?u(o):u.current=o)},children:l})});W.displayName="ui-save-bar";var z=new Proxy({},{get(a,n){throw Error(`shopify.${String(n)} can't be used in a server environment. You likely need to move this code into an Effect.`)}});var r=g(P(),1);function F(){return(0,r.jsxs)(C,{children:[(0,r.jsx)(D,{title:"Additional page"}),(0,r.jsxs)(b,{children:[(0,r.jsx)(b.Section,{children:(0,r.jsx)(_,{children:(0,r.jsxs)(w,{gap:"300",children:[(0,r.jsxs)(h,{as:"p",variant:"bodyMd",children:["The app template comes with an additional page which demonstrates how to create multiple pages within app navigation using"," ",(0,r.jsx)(S,{url:"https://shopify.dev/docs/apps/tools/app-bridge",target:"_blank",removeUnderline:!0,children:"App Bridge"}),"."]}),(0,r.jsxs)(h,{as:"p",variant:"bodyMd",children:["To create your own page and have it show up in the app navigation, add a page inside ",(0,r.jsx)(E,{children:"app/routes"}),", and a link to it in the ",(0,r.jsx)(E,{children:"<NavMenu>"})," component found in ",(0,r.jsx)(E,{children:"app/routes/app.jsx"}),"."]})]})})}),(0,r.jsx)(b.Section,{variant:"oneThird",children:(0,r.jsx)(_,{children:(0,r.jsxs)(w,{gap:"200",children:[(0,r.jsx)(h,{as:"h2",variant:"headingMd",children:"Resources"}),(0,r.jsx)(k,{children:(0,r.jsx)(k.Item,{children:(0,r.jsx)(S,{url:"https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav",target:"_blank",removeUnderline:!0,children:"App nav best practices"})})})]})})})]})]})}function E({children:a}){return(0,r.jsx)(x,{as:"span",padding:"025",paddingInlineStart:"100",paddingInlineEnd:"100",background:"bg-surface-active",borderWidth:"025",borderColor:"border",borderRadius:"100",children:(0,r.jsx)("code",{children:a})})}export{F as default};
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
