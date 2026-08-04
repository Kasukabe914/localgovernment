(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=n(i);fetch(i.href,a)}})();var wu={exports:{}},Ji={},ku={exports:{}},D={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Br=Symbol.for("react.element"),ep=Symbol.for("react.portal"),tp=Symbol.for("react.fragment"),np=Symbol.for("react.strict_mode"),rp=Symbol.for("react.profiler"),ip=Symbol.for("react.provider"),ap=Symbol.for("react.context"),lp=Symbol.for("react.forward_ref"),op=Symbol.for("react.suspense"),sp=Symbol.for("react.memo"),up=Symbol.for("react.lazy"),Jo=Symbol.iterator;function cp(e){return e===null||typeof e!="object"?null:(e=Jo&&e[Jo]||e["@@iterator"],typeof e=="function"?e:null)}var Su={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Cu=Object.assign,Ru={};function $n(e,t,n){this.props=e,this.context=t,this.refs=Ru,this.updater=n||Su}$n.prototype.isReactComponent={};$n.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};$n.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Eu(){}Eu.prototype=$n.prototype;function Fl(e,t,n){this.props=e,this.context=t,this.refs=Ru,this.updater=n||Su}var $l=Fl.prototype=new Eu;$l.constructor=Fl;Cu($l,$n.prototype);$l.isPureReactComponent=!0;var qo=Array.isArray,Nu=Object.prototype.hasOwnProperty,Ul={current:null},ju={key:!0,ref:!0,__self:!0,__source:!0};function Tu(e,t,n){var r,i={},a=null,l=null;if(t!=null)for(r in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(a=""+t.key),t)Nu.call(t,r)&&!ju.hasOwnProperty(r)&&(i[r]=t[r]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var u=Array(s),c=0;c<s;c++)u[c]=arguments[c+2];i.children=u}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)i[r]===void 0&&(i[r]=s[r]);return{$$typeof:Br,type:e,key:a,ref:l,props:i,_owner:Ul.current}}function dp(e,t){return{$$typeof:Br,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Vl(e){return typeof e=="object"&&e!==null&&e.$$typeof===Br}function pp(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var es=/\/+/g;function xa(e,t){return typeof e=="object"&&e!==null&&e.key!=null?pp(""+e.key):t.toString(36)}function pi(e,t,n,r,i){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(a){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case Br:case ep:l=!0}}if(l)return l=e,i=i(l),e=r===""?"."+xa(l,0):r,qo(i)?(n="",e!=null&&(n=e.replace(es,"$&/")+"/"),pi(i,t,n,"",function(c){return c})):i!=null&&(Vl(i)&&(i=dp(i,n+(!i.key||l&&l.key===i.key?"":(""+i.key).replace(es,"$&/")+"/")+e)),t.push(i)),1;if(l=0,r=r===""?".":r+":",qo(e))for(var s=0;s<e.length;s++){a=e[s];var u=r+xa(a,s);l+=pi(a,t,n,u,i)}else if(u=cp(e),typeof u=="function")for(e=u.call(e),s=0;!(a=e.next()).done;)a=a.value,u=r+xa(a,s++),l+=pi(a,t,n,u,i);else if(a==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function Gr(e,t,n){if(e==null)return e;var r=[],i=0;return pi(e,r,"","",function(a){return t.call(n,a,i++)}),r}function fp(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ne={current:null},fi={transition:null},hp={ReactCurrentDispatcher:Ne,ReactCurrentBatchConfig:fi,ReactCurrentOwner:Ul};function bu(){throw Error("act(...) is not supported in production builds of React.")}D.Children={map:Gr,forEach:function(e,t,n){Gr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Gr(e,function(){t++}),t},toArray:function(e){return Gr(e,function(t){return t})||[]},only:function(e){if(!Vl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};D.Component=$n;D.Fragment=tp;D.Profiler=rp;D.PureComponent=Fl;D.StrictMode=np;D.Suspense=op;D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=hp;D.act=bu;D.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Cu({},e.props),i=e.key,a=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(a=t.ref,l=Ul.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(u in t)Nu.call(t,u)&&!ju.hasOwnProperty(u)&&(r[u]=t[u]===void 0&&s!==void 0?s[u]:t[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){s=Array(u);for(var c=0;c<u;c++)s[c]=arguments[c+2];r.children=s}return{$$typeof:Br,type:e.type,key:i,ref:a,props:r,_owner:l}};D.createContext=function(e){return e={$$typeof:ap,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:ip,_context:e},e.Consumer=e};D.createElement=Tu;D.createFactory=function(e){var t=Tu.bind(null,e);return t.type=e,t};D.createRef=function(){return{current:null}};D.forwardRef=function(e){return{$$typeof:lp,render:e}};D.isValidElement=Vl;D.lazy=function(e){return{$$typeof:up,_payload:{_status:-1,_result:e},_init:fp}};D.memo=function(e,t){return{$$typeof:sp,type:e,compare:t===void 0?null:t}};D.startTransition=function(e){var t=fi.transition;fi.transition={};try{e()}finally{fi.transition=t}};D.unstable_act=bu;D.useCallback=function(e,t){return Ne.current.useCallback(e,t)};D.useContext=function(e){return Ne.current.useContext(e)};D.useDebugValue=function(){};D.useDeferredValue=function(e){return Ne.current.useDeferredValue(e)};D.useEffect=function(e,t){return Ne.current.useEffect(e,t)};D.useId=function(){return Ne.current.useId()};D.useImperativeHandle=function(e,t,n){return Ne.current.useImperativeHandle(e,t,n)};D.useInsertionEffect=function(e,t){return Ne.current.useInsertionEffect(e,t)};D.useLayoutEffect=function(e,t){return Ne.current.useLayoutEffect(e,t)};D.useMemo=function(e,t){return Ne.current.useMemo(e,t)};D.useReducer=function(e,t,n){return Ne.current.useReducer(e,t,n)};D.useRef=function(e){return Ne.current.useRef(e)};D.useState=function(e){return Ne.current.useState(e)};D.useSyncExternalStore=function(e,t,n){return Ne.current.useSyncExternalStore(e,t,n)};D.useTransition=function(){return Ne.current.useTransition()};D.version="18.3.1";ku.exports=D;var W=ku.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mp=W,gp=Symbol.for("react.element"),vp=Symbol.for("react.fragment"),yp=Object.prototype.hasOwnProperty,xp=mp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,wp={key:!0,ref:!0,__self:!0,__source:!0};function Pu(e,t,n){var r,i={},a=null,l=null;n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(l=t.ref);for(r in t)yp.call(t,r)&&!wp.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:gp,type:e,key:a,ref:l,props:i,_owner:xp.current}}Ji.Fragment=vp;Ji.jsx=Pu;Ji.jsxs=Pu;wu.exports=Ji;var o=wu.exports,_u={exports:{}},$e={},zu={exports:{}},Lu={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(k,O){var _=k.length;k.push(O);e:for(;0<_;){var H=_-1>>>1,ee=k[H];if(0<i(ee,O))k[H]=O,k[_]=ee,_=H;else break e}}function n(k){return k.length===0?null:k[0]}function r(k){if(k.length===0)return null;var O=k[0],_=k.pop();if(_!==O){k[0]=_;e:for(var H=0,ee=k.length,Ae=ee>>>1;H<Ae;){var Ie=2*(H+1)-1,Ve=k[Ie],j=Ie+1,Z=k[j];if(0>i(Ve,_))j<ee&&0>i(Z,Ve)?(k[H]=Z,k[j]=_,H=j):(k[H]=Ve,k[Ie]=_,H=Ie);else if(j<ee&&0>i(Z,_))k[H]=Z,k[j]=_,H=j;else break e}}return O}function i(k,O){var _=k.sortIndex-O.sortIndex;return _!==0?_:k.id-O.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var l=Date,s=l.now();e.unstable_now=function(){return l.now()-s}}var u=[],c=[],v=1,g=null,m=3,w=!1,C=!1,S=!1,B=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,d=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h(k){for(var O=n(c);O!==null;){if(O.callback===null)r(c);else if(O.startTime<=k)r(c),O.sortIndex=O.expirationTime,t(u,O);else break;O=n(c)}}function y(k){if(S=!1,h(k),!C)if(n(u)!==null)C=!0,ut(E);else{var O=n(c);O!==null&&Yt(y,O.startTime-k)}}function E(k,O){C=!1,S&&(S=!1,p(b),b=-1),w=!0;var _=m;try{for(h(O),g=n(u);g!==null&&(!(g.expirationTime>O)||k&&!pe());){var H=g.callback;if(typeof H=="function"){g.callback=null,m=g.priorityLevel;var ee=H(g.expirationTime<=O);O=e.unstable_now(),typeof ee=="function"?g.callback=ee:g===n(u)&&r(u),h(O)}else r(u);g=n(u)}if(g!==null)var Ae=!0;else{var Ie=n(c);Ie!==null&&Yt(y,Ie.startTime-O),Ae=!1}return Ae}finally{g=null,m=_,w=!1}}var N=!1,P=null,b=-1,Q=5,A=-1;function pe(){return!(e.unstable_now()-A<Q)}function z(){if(P!==null){var k=e.unstable_now();A=k;var O=!0;try{O=P(!0,k)}finally{O?K():(N=!1,P=null)}}else N=!1}var K;if(typeof d=="function")K=function(){d(z)};else if(typeof MessageChannel<"u"){var fe=new MessageChannel,Te=fe.port2;fe.port1.onmessage=z,K=function(){Te.postMessage(null)}}else K=function(){B(z,0)};function ut(k){P=k,N||(N=!0,K())}function Yt(k,O){b=B(function(){k(e.unstable_now())},O)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(k){k.callback=null},e.unstable_continueExecution=function(){C||w||(C=!0,ut(E))},e.unstable_forceFrameRate=function(k){0>k||125<k?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Q=0<k?Math.floor(1e3/k):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return n(u)},e.unstable_next=function(k){switch(m){case 1:case 2:case 3:var O=3;break;default:O=m}var _=m;m=O;try{return k()}finally{m=_}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(k,O){switch(k){case 1:case 2:case 3:case 4:case 5:break;default:k=3}var _=m;m=k;try{return O()}finally{m=_}},e.unstable_scheduleCallback=function(k,O,_){var H=e.unstable_now();switch(typeof _=="object"&&_!==null?(_=_.delay,_=typeof _=="number"&&0<_?H+_:H):_=H,k){case 1:var ee=-1;break;case 2:ee=250;break;case 5:ee=1073741823;break;case 4:ee=1e4;break;default:ee=5e3}return ee=_+ee,k={id:v++,callback:O,priorityLevel:k,startTime:_,expirationTime:ee,sortIndex:-1},_>H?(k.sortIndex=_,t(c,k),n(u)===null&&k===n(c)&&(S?(p(b),b=-1):S=!0,Yt(y,_-H))):(k.sortIndex=ee,t(u,k),C||w||(C=!0,ut(E))),k},e.unstable_shouldYield=pe,e.unstable_wrapCallback=function(k){var O=m;return function(){var _=m;m=O;try{return k.apply(this,arguments)}finally{m=_}}}})(Lu);zu.exports=Lu;var kp=zu.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sp=W,Fe=kp;function x(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Ou=new Set,kr={};function fn(e,t){An(e,t),An(e+"Capture",t)}function An(e,t){for(kr[e]=t,e=0;e<t.length;e++)Ou.add(t[e])}var kt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ka=Object.prototype.hasOwnProperty,Cp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ts={},ns={};function Rp(e){return Ka.call(ns,e)?!0:Ka.call(ts,e)?!1:Cp.test(e)?ns[e]=!0:(ts[e]=!0,!1)}function Ep(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Np(e,t,n,r){if(t===null||typeof t>"u"||Ep(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function je(e,t,n,r,i,a,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=l}var ye={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ye[e]=new je(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];ye[t]=new je(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ye[e]=new je(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ye[e]=new je(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ye[e]=new je(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ye[e]=new je(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ye[e]=new je(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ye[e]=new je(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ye[e]=new je(e,5,!1,e.toLowerCase(),null,!1,!1)});var Gl=/[\-:]([a-z])/g;function Ql(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Gl,Ql);ye[t]=new je(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Gl,Ql);ye[t]=new je(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Gl,Ql);ye[t]=new je(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ye[e]=new je(e,1,!1,e.toLowerCase(),null,!1,!1)});ye.xlinkHref=new je("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ye[e]=new je(e,1,!1,e.toLowerCase(),null,!0,!0)});function Kl(e,t,n,r){var i=ye.hasOwnProperty(t)?ye[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Np(t,n,i,r)&&(n=null),r||i===null?Rp(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Et=Sp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Qr=Symbol.for("react.element"),yn=Symbol.for("react.portal"),xn=Symbol.for("react.fragment"),Zl=Symbol.for("react.strict_mode"),Za=Symbol.for("react.profiler"),Mu=Symbol.for("react.provider"),Au=Symbol.for("react.context"),Yl=Symbol.for("react.forward_ref"),Ya=Symbol.for("react.suspense"),Xa=Symbol.for("react.suspense_list"),Xl=Symbol.for("react.memo"),Pt=Symbol.for("react.lazy"),Iu=Symbol.for("react.offscreen"),rs=Symbol.iterator;function Jn(e){return e===null||typeof e!="object"?null:(e=rs&&e[rs]||e["@@iterator"],typeof e=="function"?e:null)}var re=Object.assign,wa;function lr(e){if(wa===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);wa=t&&t[1]||""}return`
`+wa+e}var ka=!1;function Sa(e,t){if(!e||ka)return"";ka=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),a=r.stack.split(`
`),l=i.length-1,s=a.length-1;1<=l&&0<=s&&i[l]!==a[s];)s--;for(;1<=l&&0<=s;l--,s--)if(i[l]!==a[s]){if(l!==1||s!==1)do if(l--,s--,0>s||i[l]!==a[s]){var u=`
`+i[l].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=l&&0<=s);break}}}finally{ka=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?lr(e):""}function jp(e){switch(e.tag){case 5:return lr(e.type);case 16:return lr("Lazy");case 13:return lr("Suspense");case 19:return lr("SuspenseList");case 0:case 2:case 15:return e=Sa(e.type,!1),e;case 11:return e=Sa(e.type.render,!1),e;case 1:return e=Sa(e.type,!0),e;default:return""}}function Ja(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case xn:return"Fragment";case yn:return"Portal";case Za:return"Profiler";case Zl:return"StrictMode";case Ya:return"Suspense";case Xa:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Au:return(e.displayName||"Context")+".Consumer";case Mu:return(e._context.displayName||"Context")+".Provider";case Yl:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Xl:return t=e.displayName||null,t!==null?t:Ja(e.type)||"Memo";case Pt:t=e._payload,e=e._init;try{return Ja(e(t))}catch{}}return null}function Tp(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ja(t);case 8:return t===Zl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Vt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Bu(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function bp(e){var t=Bu(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,a=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(l){r=""+l,a.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Kr(e){e._valueTracker||(e._valueTracker=bp(e))}function Hu(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Bu(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Ni(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function qa(e,t){var n=t.checked;return re({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function is(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Vt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Du(e,t){t=t.checked,t!=null&&Kl(e,"checked",t,!1)}function el(e,t){Du(e,t);var n=Vt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?tl(e,t.type,n):t.hasOwnProperty("defaultValue")&&tl(e,t.type,Vt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function as(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function tl(e,t,n){(t!=="number"||Ni(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var or=Array.isArray;function Pn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Vt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function nl(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(x(91));return re({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ls(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(x(92));if(or(n)){if(1<n.length)throw Error(x(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Vt(n)}}function Wu(e,t){var n=Vt(t.value),r=Vt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function os(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Fu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function rl(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Fu(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Zr,$u=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Zr=Zr||document.createElement("div"),Zr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Zr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Sr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var dr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Pp=["Webkit","ms","Moz","O"];Object.keys(dr).forEach(function(e){Pp.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),dr[t]=dr[e]})});function Uu(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||dr.hasOwnProperty(e)&&dr[e]?(""+t).trim():t+"px"}function Vu(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Uu(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var _p=re({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function il(e,t){if(t){if(_p[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(x(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(x(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(x(61))}if(t.style!=null&&typeof t.style!="object")throw Error(x(62))}}function al(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ll=null;function Jl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var ol=null,_n=null,zn=null;function ss(e){if(e=Wr(e)){if(typeof ol!="function")throw Error(x(280));var t=e.stateNode;t&&(t=ra(t),ol(e.stateNode,e.type,t))}}function Gu(e){_n?zn?zn.push(e):zn=[e]:_n=e}function Qu(){if(_n){var e=_n,t=zn;if(zn=_n=null,ss(e),t)for(e=0;e<t.length;e++)ss(t[e])}}function Ku(e,t){return e(t)}function Zu(){}var Ca=!1;function Yu(e,t,n){if(Ca)return e(t,n);Ca=!0;try{return Ku(e,t,n)}finally{Ca=!1,(_n!==null||zn!==null)&&(Zu(),Qu())}}function Cr(e,t){var n=e.stateNode;if(n===null)return null;var r=ra(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(x(231,t,typeof n));return n}var sl=!1;if(kt)try{var qn={};Object.defineProperty(qn,"passive",{get:function(){sl=!0}}),window.addEventListener("test",qn,qn),window.removeEventListener("test",qn,qn)}catch{sl=!1}function zp(e,t,n,r,i,a,l,s,u){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(v){this.onError(v)}}var pr=!1,ji=null,Ti=!1,ul=null,Lp={onError:function(e){pr=!0,ji=e}};function Op(e,t,n,r,i,a,l,s,u){pr=!1,ji=null,zp.apply(Lp,arguments)}function Mp(e,t,n,r,i,a,l,s,u){if(Op.apply(this,arguments),pr){if(pr){var c=ji;pr=!1,ji=null}else throw Error(x(198));Ti||(Ti=!0,ul=c)}}function hn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Xu(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function us(e){if(hn(e)!==e)throw Error(x(188))}function Ap(e){var t=e.alternate;if(!t){if(t=hn(e),t===null)throw Error(x(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var a=i.alternate;if(a===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===a.child){for(a=i.child;a;){if(a===n)return us(i),e;if(a===r)return us(i),t;a=a.sibling}throw Error(x(188))}if(n.return!==r.return)n=i,r=a;else{for(var l=!1,s=i.child;s;){if(s===n){l=!0,n=i,r=a;break}if(s===r){l=!0,r=i,n=a;break}s=s.sibling}if(!l){for(s=a.child;s;){if(s===n){l=!0,n=a,r=i;break}if(s===r){l=!0,r=a,n=i;break}s=s.sibling}if(!l)throw Error(x(189))}}if(n.alternate!==r)throw Error(x(190))}if(n.tag!==3)throw Error(x(188));return n.stateNode.current===n?e:t}function Ju(e){return e=Ap(e),e!==null?qu(e):null}function qu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=qu(e);if(t!==null)return t;e=e.sibling}return null}var ec=Fe.unstable_scheduleCallback,cs=Fe.unstable_cancelCallback,Ip=Fe.unstable_shouldYield,Bp=Fe.unstable_requestPaint,ae=Fe.unstable_now,Hp=Fe.unstable_getCurrentPriorityLevel,ql=Fe.unstable_ImmediatePriority,tc=Fe.unstable_UserBlockingPriority,bi=Fe.unstable_NormalPriority,Dp=Fe.unstable_LowPriority,nc=Fe.unstable_IdlePriority,qi=null,ft=null;function Wp(e){if(ft&&typeof ft.onCommitFiberRoot=="function")try{ft.onCommitFiberRoot(qi,e,void 0,(e.current.flags&128)===128)}catch{}}var lt=Math.clz32?Math.clz32:Up,Fp=Math.log,$p=Math.LN2;function Up(e){return e>>>=0,e===0?32:31-(Fp(e)/$p|0)|0}var Yr=64,Xr=4194304;function sr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Pi(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,a=e.pingedLanes,l=n&268435455;if(l!==0){var s=l&~i;s!==0?r=sr(s):(a&=l,a!==0&&(r=sr(a)))}else l=n&~i,l!==0?r=sr(l):a!==0&&(r=sr(a));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,a=t&-t,i>=a||i===16&&(a&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-lt(t),i=1<<n,r|=e[n],t&=~i;return r}function Vp(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Gp(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes;0<a;){var l=31-lt(a),s=1<<l,u=i[l];u===-1?(!(s&n)||s&r)&&(i[l]=Vp(s,t)):u<=t&&(e.expiredLanes|=s),a&=~s}}function cl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function rc(){var e=Yr;return Yr<<=1,!(Yr&4194240)&&(Yr=64),e}function Ra(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Hr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-lt(t),e[t]=n}function Qp(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-lt(n),a=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~a}}function eo(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-lt(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var V=0;function ic(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var ac,to,lc,oc,sc,dl=!1,Jr=[],It=null,Bt=null,Ht=null,Rr=new Map,Er=new Map,Lt=[],Kp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ds(e,t){switch(e){case"focusin":case"focusout":It=null;break;case"dragenter":case"dragleave":Bt=null;break;case"mouseover":case"mouseout":Ht=null;break;case"pointerover":case"pointerout":Rr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Er.delete(t.pointerId)}}function er(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Wr(t),t!==null&&to(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Zp(e,t,n,r,i){switch(t){case"focusin":return It=er(It,e,t,n,r,i),!0;case"dragenter":return Bt=er(Bt,e,t,n,r,i),!0;case"mouseover":return Ht=er(Ht,e,t,n,r,i),!0;case"pointerover":var a=i.pointerId;return Rr.set(a,er(Rr.get(a)||null,e,t,n,r,i)),!0;case"gotpointercapture":return a=i.pointerId,Er.set(a,er(Er.get(a)||null,e,t,n,r,i)),!0}return!1}function uc(e){var t=tn(e.target);if(t!==null){var n=hn(t);if(n!==null){if(t=n.tag,t===13){if(t=Xu(n),t!==null){e.blockedOn=t,sc(e.priority,function(){lc(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function hi(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=pl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);ll=r,n.target.dispatchEvent(r),ll=null}else return t=Wr(n),t!==null&&to(t),e.blockedOn=n,!1;t.shift()}return!0}function ps(e,t,n){hi(e)&&n.delete(t)}function Yp(){dl=!1,It!==null&&hi(It)&&(It=null),Bt!==null&&hi(Bt)&&(Bt=null),Ht!==null&&hi(Ht)&&(Ht=null),Rr.forEach(ps),Er.forEach(ps)}function tr(e,t){e.blockedOn===t&&(e.blockedOn=null,dl||(dl=!0,Fe.unstable_scheduleCallback(Fe.unstable_NormalPriority,Yp)))}function Nr(e){function t(i){return tr(i,e)}if(0<Jr.length){tr(Jr[0],e);for(var n=1;n<Jr.length;n++){var r=Jr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(It!==null&&tr(It,e),Bt!==null&&tr(Bt,e),Ht!==null&&tr(Ht,e),Rr.forEach(t),Er.forEach(t),n=0;n<Lt.length;n++)r=Lt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Lt.length&&(n=Lt[0],n.blockedOn===null);)uc(n),n.blockedOn===null&&Lt.shift()}var Ln=Et.ReactCurrentBatchConfig,_i=!0;function Xp(e,t,n,r){var i=V,a=Ln.transition;Ln.transition=null;try{V=1,no(e,t,n,r)}finally{V=i,Ln.transition=a}}function Jp(e,t,n,r){var i=V,a=Ln.transition;Ln.transition=null;try{V=4,no(e,t,n,r)}finally{V=i,Ln.transition=a}}function no(e,t,n,r){if(_i){var i=pl(e,t,n,r);if(i===null)Oa(e,t,r,zi,n),ds(e,r);else if(Zp(i,e,t,n,r))r.stopPropagation();else if(ds(e,r),t&4&&-1<Kp.indexOf(e)){for(;i!==null;){var a=Wr(i);if(a!==null&&ac(a),a=pl(e,t,n,r),a===null&&Oa(e,t,r,zi,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Oa(e,t,r,null,n)}}var zi=null;function pl(e,t,n,r){if(zi=null,e=Jl(r),e=tn(e),e!==null)if(t=hn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Xu(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return zi=e,null}function cc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Hp()){case ql:return 1;case tc:return 4;case bi:case Dp:return 16;case nc:return 536870912;default:return 16}default:return 16}}var Mt=null,ro=null,mi=null;function dc(){if(mi)return mi;var e,t=ro,n=t.length,r,i="value"in Mt?Mt.value:Mt.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var l=n-e;for(r=1;r<=l&&t[n-r]===i[a-r];r++);return mi=i.slice(e,1<r?1-r:void 0)}function gi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function qr(){return!0}function fs(){return!1}function Ue(e){function t(n,r,i,a,l){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=a,this.target=l,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(a):a[s]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?qr:fs,this.isPropagationStopped=fs,this}return re(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=qr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=qr)},persist:function(){},isPersistent:qr}),t}var Un={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},io=Ue(Un),Dr=re({},Un,{view:0,detail:0}),qp=Ue(Dr),Ea,Na,nr,ea=re({},Dr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ao,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==nr&&(nr&&e.type==="mousemove"?(Ea=e.screenX-nr.screenX,Na=e.screenY-nr.screenY):Na=Ea=0,nr=e),Ea)},movementY:function(e){return"movementY"in e?e.movementY:Na}}),hs=Ue(ea),ef=re({},ea,{dataTransfer:0}),tf=Ue(ef),nf=re({},Dr,{relatedTarget:0}),ja=Ue(nf),rf=re({},Un,{animationName:0,elapsedTime:0,pseudoElement:0}),af=Ue(rf),lf=re({},Un,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),of=Ue(lf),sf=re({},Un,{data:0}),ms=Ue(sf),uf={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},cf={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},df={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function pf(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=df[e])?!!t[e]:!1}function ao(){return pf}var ff=re({},Dr,{key:function(e){if(e.key){var t=uf[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=gi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?cf[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ao,charCode:function(e){return e.type==="keypress"?gi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?gi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),hf=Ue(ff),mf=re({},ea,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),gs=Ue(mf),gf=re({},Dr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ao}),vf=Ue(gf),yf=re({},Un,{propertyName:0,elapsedTime:0,pseudoElement:0}),xf=Ue(yf),wf=re({},ea,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),kf=Ue(wf),Sf=[9,13,27,32],lo=kt&&"CompositionEvent"in window,fr=null;kt&&"documentMode"in document&&(fr=document.documentMode);var Cf=kt&&"TextEvent"in window&&!fr,pc=kt&&(!lo||fr&&8<fr&&11>=fr),vs=" ",ys=!1;function fc(e,t){switch(e){case"keyup":return Sf.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function hc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var wn=!1;function Rf(e,t){switch(e){case"compositionend":return hc(t);case"keypress":return t.which!==32?null:(ys=!0,vs);case"textInput":return e=t.data,e===vs&&ys?null:e;default:return null}}function Ef(e,t){if(wn)return e==="compositionend"||!lo&&fc(e,t)?(e=dc(),mi=ro=Mt=null,wn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return pc&&t.locale!=="ko"?null:t.data;default:return null}}var Nf={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function xs(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Nf[e.type]:t==="textarea"}function mc(e,t,n,r){Gu(r),t=Li(t,"onChange"),0<t.length&&(n=new io("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var hr=null,jr=null;function jf(e){Nc(e,0)}function ta(e){var t=Cn(e);if(Hu(t))return e}function Tf(e,t){if(e==="change")return t}var gc=!1;if(kt){var Ta;if(kt){var ba="oninput"in document;if(!ba){var ws=document.createElement("div");ws.setAttribute("oninput","return;"),ba=typeof ws.oninput=="function"}Ta=ba}else Ta=!1;gc=Ta&&(!document.documentMode||9<document.documentMode)}function ks(){hr&&(hr.detachEvent("onpropertychange",vc),jr=hr=null)}function vc(e){if(e.propertyName==="value"&&ta(jr)){var t=[];mc(t,jr,e,Jl(e)),Yu(jf,t)}}function bf(e,t,n){e==="focusin"?(ks(),hr=t,jr=n,hr.attachEvent("onpropertychange",vc)):e==="focusout"&&ks()}function Pf(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return ta(jr)}function _f(e,t){if(e==="click")return ta(t)}function zf(e,t){if(e==="input"||e==="change")return ta(t)}function Lf(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var st=typeof Object.is=="function"?Object.is:Lf;function Tr(e,t){if(st(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ka.call(t,i)||!st(e[i],t[i]))return!1}return!0}function Ss(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Cs(e,t){var n=Ss(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ss(n)}}function yc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?yc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function xc(){for(var e=window,t=Ni();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ni(e.document)}return t}function oo(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Of(e){var t=xc(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&yc(n.ownerDocument.documentElement,n)){if(r!==null&&oo(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,a=Math.min(r.start,i);r=r.end===void 0?a:Math.min(r.end,i),!e.extend&&a>r&&(i=r,r=a,a=i),i=Cs(n,a);var l=Cs(n,r);i&&l&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),a>r?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Mf=kt&&"documentMode"in document&&11>=document.documentMode,kn=null,fl=null,mr=null,hl=!1;function Rs(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;hl||kn==null||kn!==Ni(r)||(r=kn,"selectionStart"in r&&oo(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),mr&&Tr(mr,r)||(mr=r,r=Li(fl,"onSelect"),0<r.length&&(t=new io("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=kn)))}function ei(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Sn={animationend:ei("Animation","AnimationEnd"),animationiteration:ei("Animation","AnimationIteration"),animationstart:ei("Animation","AnimationStart"),transitionend:ei("Transition","TransitionEnd")},Pa={},wc={};kt&&(wc=document.createElement("div").style,"AnimationEvent"in window||(delete Sn.animationend.animation,delete Sn.animationiteration.animation,delete Sn.animationstart.animation),"TransitionEvent"in window||delete Sn.transitionend.transition);function na(e){if(Pa[e])return Pa[e];if(!Sn[e])return e;var t=Sn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in wc)return Pa[e]=t[n];return e}var kc=na("animationend"),Sc=na("animationiteration"),Cc=na("animationstart"),Rc=na("transitionend"),Ec=new Map,Es="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Qt(e,t){Ec.set(e,t),fn(t,[e])}for(var _a=0;_a<Es.length;_a++){var za=Es[_a],Af=za.toLowerCase(),If=za[0].toUpperCase()+za.slice(1);Qt(Af,"on"+If)}Qt(kc,"onAnimationEnd");Qt(Sc,"onAnimationIteration");Qt(Cc,"onAnimationStart");Qt("dblclick","onDoubleClick");Qt("focusin","onFocus");Qt("focusout","onBlur");Qt(Rc,"onTransitionEnd");An("onMouseEnter",["mouseout","mouseover"]);An("onMouseLeave",["mouseout","mouseover"]);An("onPointerEnter",["pointerout","pointerover"]);An("onPointerLeave",["pointerout","pointerover"]);fn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));fn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fn("onBeforeInput",["compositionend","keypress","textInput","paste"]);fn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));fn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));fn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ur="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Bf=new Set("cancel close invalid load scroll toggle".split(" ").concat(ur));function Ns(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Mp(r,t,void 0,e),e.currentTarget=null}function Nc(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var a=void 0;if(t)for(var l=r.length-1;0<=l;l--){var s=r[l],u=s.instance,c=s.currentTarget;if(s=s.listener,u!==a&&i.isPropagationStopped())break e;Ns(i,s,c),a=u}else for(l=0;l<r.length;l++){if(s=r[l],u=s.instance,c=s.currentTarget,s=s.listener,u!==a&&i.isPropagationStopped())break e;Ns(i,s,c),a=u}}}if(Ti)throw e=ul,Ti=!1,ul=null,e}function X(e,t){var n=t[xl];n===void 0&&(n=t[xl]=new Set);var r=e+"__bubble";n.has(r)||(jc(t,e,2,!1),n.add(r))}function La(e,t,n){var r=0;t&&(r|=4),jc(n,e,r,t)}var ti="_reactListening"+Math.random().toString(36).slice(2);function br(e){if(!e[ti]){e[ti]=!0,Ou.forEach(function(n){n!=="selectionchange"&&(Bf.has(n)||La(n,!1,e),La(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ti]||(t[ti]=!0,La("selectionchange",!1,t))}}function jc(e,t,n,r){switch(cc(t)){case 1:var i=Xp;break;case 4:i=Jp;break;default:i=no}n=i.bind(null,t,n,e),i=void 0,!sl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Oa(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var s=r.stateNode.containerInfo;if(s===i||s.nodeType===8&&s.parentNode===i)break;if(l===4)for(l=r.return;l!==null;){var u=l.tag;if((u===3||u===4)&&(u=l.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;l=l.return}for(;s!==null;){if(l=tn(s),l===null)return;if(u=l.tag,u===5||u===6){r=a=l;continue e}s=s.parentNode}}r=r.return}Yu(function(){var c=a,v=Jl(n),g=[];e:{var m=Ec.get(e);if(m!==void 0){var w=io,C=e;switch(e){case"keypress":if(gi(n)===0)break e;case"keydown":case"keyup":w=hf;break;case"focusin":C="focus",w=ja;break;case"focusout":C="blur",w=ja;break;case"beforeblur":case"afterblur":w=ja;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=hs;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=tf;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=vf;break;case kc:case Sc:case Cc:w=af;break;case Rc:w=xf;break;case"scroll":w=qp;break;case"wheel":w=kf;break;case"copy":case"cut":case"paste":w=of;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=gs}var S=(t&4)!==0,B=!S&&e==="scroll",p=S?m!==null?m+"Capture":null:m;S=[];for(var d=c,h;d!==null;){h=d;var y=h.stateNode;if(h.tag===5&&y!==null&&(h=y,p!==null&&(y=Cr(d,p),y!=null&&S.push(Pr(d,y,h)))),B)break;d=d.return}0<S.length&&(m=new w(m,C,null,n,v),g.push({event:m,listeners:S}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",m&&n!==ll&&(C=n.relatedTarget||n.fromElement)&&(tn(C)||C[St]))break e;if((w||m)&&(m=v.window===v?v:(m=v.ownerDocument)?m.defaultView||m.parentWindow:window,w?(C=n.relatedTarget||n.toElement,w=c,C=C?tn(C):null,C!==null&&(B=hn(C),C!==B||C.tag!==5&&C.tag!==6)&&(C=null)):(w=null,C=c),w!==C)){if(S=hs,y="onMouseLeave",p="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(S=gs,y="onPointerLeave",p="onPointerEnter",d="pointer"),B=w==null?m:Cn(w),h=C==null?m:Cn(C),m=new S(y,d+"leave",w,n,v),m.target=B,m.relatedTarget=h,y=null,tn(v)===c&&(S=new S(p,d+"enter",C,n,v),S.target=h,S.relatedTarget=B,y=S),B=y,w&&C)t:{for(S=w,p=C,d=0,h=S;h;h=vn(h))d++;for(h=0,y=p;y;y=vn(y))h++;for(;0<d-h;)S=vn(S),d--;for(;0<h-d;)p=vn(p),h--;for(;d--;){if(S===p||p!==null&&S===p.alternate)break t;S=vn(S),p=vn(p)}S=null}else S=null;w!==null&&js(g,m,w,S,!1),C!==null&&B!==null&&js(g,B,C,S,!0)}}e:{if(m=c?Cn(c):window,w=m.nodeName&&m.nodeName.toLowerCase(),w==="select"||w==="input"&&m.type==="file")var E=Tf;else if(xs(m))if(gc)E=zf;else{E=Pf;var N=bf}else(w=m.nodeName)&&w.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(E=_f);if(E&&(E=E(e,c))){mc(g,E,n,v);break e}N&&N(e,m,c),e==="focusout"&&(N=m._wrapperState)&&N.controlled&&m.type==="number"&&tl(m,"number",m.value)}switch(N=c?Cn(c):window,e){case"focusin":(xs(N)||N.contentEditable==="true")&&(kn=N,fl=c,mr=null);break;case"focusout":mr=fl=kn=null;break;case"mousedown":hl=!0;break;case"contextmenu":case"mouseup":case"dragend":hl=!1,Rs(g,n,v);break;case"selectionchange":if(Mf)break;case"keydown":case"keyup":Rs(g,n,v)}var P;if(lo)e:{switch(e){case"compositionstart":var b="onCompositionStart";break e;case"compositionend":b="onCompositionEnd";break e;case"compositionupdate":b="onCompositionUpdate";break e}b=void 0}else wn?fc(e,n)&&(b="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(b="onCompositionStart");b&&(pc&&n.locale!=="ko"&&(wn||b!=="onCompositionStart"?b==="onCompositionEnd"&&wn&&(P=dc()):(Mt=v,ro="value"in Mt?Mt.value:Mt.textContent,wn=!0)),N=Li(c,b),0<N.length&&(b=new ms(b,e,null,n,v),g.push({event:b,listeners:N}),P?b.data=P:(P=hc(n),P!==null&&(b.data=P)))),(P=Cf?Rf(e,n):Ef(e,n))&&(c=Li(c,"onBeforeInput"),0<c.length&&(v=new ms("onBeforeInput","beforeinput",null,n,v),g.push({event:v,listeners:c}),v.data=P))}Nc(g,t)})}function Pr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Li(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,a=i.stateNode;i.tag===5&&a!==null&&(i=a,a=Cr(e,n),a!=null&&r.unshift(Pr(e,a,i)),a=Cr(e,t),a!=null&&r.push(Pr(e,a,i))),e=e.return}return r}function vn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function js(e,t,n,r,i){for(var a=t._reactName,l=[];n!==null&&n!==r;){var s=n,u=s.alternate,c=s.stateNode;if(u!==null&&u===r)break;s.tag===5&&c!==null&&(s=c,i?(u=Cr(n,a),u!=null&&l.unshift(Pr(n,u,s))):i||(u=Cr(n,a),u!=null&&l.push(Pr(n,u,s)))),n=n.return}l.length!==0&&e.push({event:t,listeners:l})}var Hf=/\r\n?/g,Df=/\u0000|\uFFFD/g;function Ts(e){return(typeof e=="string"?e:""+e).replace(Hf,`
`).replace(Df,"")}function ni(e,t,n){if(t=Ts(t),Ts(e)!==t&&n)throw Error(x(425))}function Oi(){}var ml=null,gl=null;function vl(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var yl=typeof setTimeout=="function"?setTimeout:void 0,Wf=typeof clearTimeout=="function"?clearTimeout:void 0,bs=typeof Promise=="function"?Promise:void 0,Ff=typeof queueMicrotask=="function"?queueMicrotask:typeof bs<"u"?function(e){return bs.resolve(null).then(e).catch($f)}:yl;function $f(e){setTimeout(function(){throw e})}function Ma(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),Nr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Nr(t)}function Dt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ps(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Vn=Math.random().toString(36).slice(2),pt="__reactFiber$"+Vn,_r="__reactProps$"+Vn,St="__reactContainer$"+Vn,xl="__reactEvents$"+Vn,Uf="__reactListeners$"+Vn,Vf="__reactHandles$"+Vn;function tn(e){var t=e[pt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[St]||n[pt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Ps(e);e!==null;){if(n=e[pt])return n;e=Ps(e)}return t}e=n,n=e.parentNode}return null}function Wr(e){return e=e[pt]||e[St],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Cn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(x(33))}function ra(e){return e[_r]||null}var wl=[],Rn=-1;function Kt(e){return{current:e}}function J(e){0>Rn||(e.current=wl[Rn],wl[Rn]=null,Rn--)}function G(e,t){Rn++,wl[Rn]=e.current,e.current=t}var Gt={},Ce=Kt(Gt),Le=Kt(!1),sn=Gt;function In(e,t){var n=e.type.contextTypes;if(!n)return Gt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},a;for(a in n)i[a]=t[a];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function Oe(e){return e=e.childContextTypes,e!=null}function Mi(){J(Le),J(Ce)}function _s(e,t,n){if(Ce.current!==Gt)throw Error(x(168));G(Ce,t),G(Le,n)}function Tc(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(x(108,Tp(e)||"Unknown",i));return re({},n,r)}function Ai(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Gt,sn=Ce.current,G(Ce,e),G(Le,Le.current),!0}function zs(e,t,n){var r=e.stateNode;if(!r)throw Error(x(169));n?(e=Tc(e,t,sn),r.__reactInternalMemoizedMergedChildContext=e,J(Le),J(Ce),G(Ce,e)):J(Le),G(Le,n)}var vt=null,ia=!1,Aa=!1;function bc(e){vt===null?vt=[e]:vt.push(e)}function Gf(e){ia=!0,bc(e)}function Zt(){if(!Aa&&vt!==null){Aa=!0;var e=0,t=V;try{var n=vt;for(V=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}vt=null,ia=!1}catch(i){throw vt!==null&&(vt=vt.slice(e+1)),ec(ql,Zt),i}finally{V=t,Aa=!1}}return null}var En=[],Nn=0,Ii=null,Bi=0,Ge=[],Qe=0,un=null,yt=1,xt="";function qt(e,t){En[Nn++]=Bi,En[Nn++]=Ii,Ii=e,Bi=t}function Pc(e,t,n){Ge[Qe++]=yt,Ge[Qe++]=xt,Ge[Qe++]=un,un=e;var r=yt;e=xt;var i=32-lt(r)-1;r&=~(1<<i),n+=1;var a=32-lt(t)+i;if(30<a){var l=i-i%5;a=(r&(1<<l)-1).toString(32),r>>=l,i-=l,yt=1<<32-lt(t)+i|n<<i|r,xt=a+e}else yt=1<<a|n<<i|r,xt=e}function so(e){e.return!==null&&(qt(e,1),Pc(e,1,0))}function uo(e){for(;e===Ii;)Ii=En[--Nn],En[Nn]=null,Bi=En[--Nn],En[Nn]=null;for(;e===un;)un=Ge[--Qe],Ge[Qe]=null,xt=Ge[--Qe],Ge[Qe]=null,yt=Ge[--Qe],Ge[Qe]=null}var We=null,De=null,q=!1,at=null;function _c(e,t){var n=Ke(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Ls(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,We=e,De=Dt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,We=e,De=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=un!==null?{id:yt,overflow:xt}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Ke(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,We=e,De=null,!0):!1;default:return!1}}function kl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Sl(e){if(q){var t=De;if(t){var n=t;if(!Ls(e,t)){if(kl(e))throw Error(x(418));t=Dt(n.nextSibling);var r=We;t&&Ls(e,t)?_c(r,n):(e.flags=e.flags&-4097|2,q=!1,We=e)}}else{if(kl(e))throw Error(x(418));e.flags=e.flags&-4097|2,q=!1,We=e}}}function Os(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;We=e}function ri(e){if(e!==We)return!1;if(!q)return Os(e),q=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!vl(e.type,e.memoizedProps)),t&&(t=De)){if(kl(e))throw zc(),Error(x(418));for(;t;)_c(e,t),t=Dt(t.nextSibling)}if(Os(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(x(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){De=Dt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}De=null}}else De=We?Dt(e.stateNode.nextSibling):null;return!0}function zc(){for(var e=De;e;)e=Dt(e.nextSibling)}function Bn(){De=We=null,q=!1}function co(e){at===null?at=[e]:at.push(e)}var Qf=Et.ReactCurrentBatchConfig;function rr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(x(309));var r=n.stateNode}if(!r)throw Error(x(147,e));var i=r,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(l){var s=i.refs;l===null?delete s[a]:s[a]=l},t._stringRef=a,t)}if(typeof e!="string")throw Error(x(284));if(!n._owner)throw Error(x(290,e))}return e}function ii(e,t){throw e=Object.prototype.toString.call(t),Error(x(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ms(e){var t=e._init;return t(e._payload)}function Lc(e){function t(p,d){if(e){var h=p.deletions;h===null?(p.deletions=[d],p.flags|=16):h.push(d)}}function n(p,d){if(!e)return null;for(;d!==null;)t(p,d),d=d.sibling;return null}function r(p,d){for(p=new Map;d!==null;)d.key!==null?p.set(d.key,d):p.set(d.index,d),d=d.sibling;return p}function i(p,d){return p=Ut(p,d),p.index=0,p.sibling=null,p}function a(p,d,h){return p.index=h,e?(h=p.alternate,h!==null?(h=h.index,h<d?(p.flags|=2,d):h):(p.flags|=2,d)):(p.flags|=1048576,d)}function l(p){return e&&p.alternate===null&&(p.flags|=2),p}function s(p,d,h,y){return d===null||d.tag!==6?(d=$a(h,p.mode,y),d.return=p,d):(d=i(d,h),d.return=p,d)}function u(p,d,h,y){var E=h.type;return E===xn?v(p,d,h.props.children,y,h.key):d!==null&&(d.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Pt&&Ms(E)===d.type)?(y=i(d,h.props),y.ref=rr(p,d,h),y.return=p,y):(y=Ci(h.type,h.key,h.props,null,p.mode,y),y.ref=rr(p,d,h),y.return=p,y)}function c(p,d,h,y){return d===null||d.tag!==4||d.stateNode.containerInfo!==h.containerInfo||d.stateNode.implementation!==h.implementation?(d=Ua(h,p.mode,y),d.return=p,d):(d=i(d,h.children||[]),d.return=p,d)}function v(p,d,h,y,E){return d===null||d.tag!==7?(d=ln(h,p.mode,y,E),d.return=p,d):(d=i(d,h),d.return=p,d)}function g(p,d,h){if(typeof d=="string"&&d!==""||typeof d=="number")return d=$a(""+d,p.mode,h),d.return=p,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case Qr:return h=Ci(d.type,d.key,d.props,null,p.mode,h),h.ref=rr(p,null,d),h.return=p,h;case yn:return d=Ua(d,p.mode,h),d.return=p,d;case Pt:var y=d._init;return g(p,y(d._payload),h)}if(or(d)||Jn(d))return d=ln(d,p.mode,h,null),d.return=p,d;ii(p,d)}return null}function m(p,d,h,y){var E=d!==null?d.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return E!==null?null:s(p,d,""+h,y);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case Qr:return h.key===E?u(p,d,h,y):null;case yn:return h.key===E?c(p,d,h,y):null;case Pt:return E=h._init,m(p,d,E(h._payload),y)}if(or(h)||Jn(h))return E!==null?null:v(p,d,h,y,null);ii(p,h)}return null}function w(p,d,h,y,E){if(typeof y=="string"&&y!==""||typeof y=="number")return p=p.get(h)||null,s(d,p,""+y,E);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Qr:return p=p.get(y.key===null?h:y.key)||null,u(d,p,y,E);case yn:return p=p.get(y.key===null?h:y.key)||null,c(d,p,y,E);case Pt:var N=y._init;return w(p,d,h,N(y._payload),E)}if(or(y)||Jn(y))return p=p.get(h)||null,v(d,p,y,E,null);ii(d,y)}return null}function C(p,d,h,y){for(var E=null,N=null,P=d,b=d=0,Q=null;P!==null&&b<h.length;b++){P.index>b?(Q=P,P=null):Q=P.sibling;var A=m(p,P,h[b],y);if(A===null){P===null&&(P=Q);break}e&&P&&A.alternate===null&&t(p,P),d=a(A,d,b),N===null?E=A:N.sibling=A,N=A,P=Q}if(b===h.length)return n(p,P),q&&qt(p,b),E;if(P===null){for(;b<h.length;b++)P=g(p,h[b],y),P!==null&&(d=a(P,d,b),N===null?E=P:N.sibling=P,N=P);return q&&qt(p,b),E}for(P=r(p,P);b<h.length;b++)Q=w(P,p,b,h[b],y),Q!==null&&(e&&Q.alternate!==null&&P.delete(Q.key===null?b:Q.key),d=a(Q,d,b),N===null?E=Q:N.sibling=Q,N=Q);return e&&P.forEach(function(pe){return t(p,pe)}),q&&qt(p,b),E}function S(p,d,h,y){var E=Jn(h);if(typeof E!="function")throw Error(x(150));if(h=E.call(h),h==null)throw Error(x(151));for(var N=E=null,P=d,b=d=0,Q=null,A=h.next();P!==null&&!A.done;b++,A=h.next()){P.index>b?(Q=P,P=null):Q=P.sibling;var pe=m(p,P,A.value,y);if(pe===null){P===null&&(P=Q);break}e&&P&&pe.alternate===null&&t(p,P),d=a(pe,d,b),N===null?E=pe:N.sibling=pe,N=pe,P=Q}if(A.done)return n(p,P),q&&qt(p,b),E;if(P===null){for(;!A.done;b++,A=h.next())A=g(p,A.value,y),A!==null&&(d=a(A,d,b),N===null?E=A:N.sibling=A,N=A);return q&&qt(p,b),E}for(P=r(p,P);!A.done;b++,A=h.next())A=w(P,p,b,A.value,y),A!==null&&(e&&A.alternate!==null&&P.delete(A.key===null?b:A.key),d=a(A,d,b),N===null?E=A:N.sibling=A,N=A);return e&&P.forEach(function(z){return t(p,z)}),q&&qt(p,b),E}function B(p,d,h,y){if(typeof h=="object"&&h!==null&&h.type===xn&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case Qr:e:{for(var E=h.key,N=d;N!==null;){if(N.key===E){if(E=h.type,E===xn){if(N.tag===7){n(p,N.sibling),d=i(N,h.props.children),d.return=p,p=d;break e}}else if(N.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Pt&&Ms(E)===N.type){n(p,N.sibling),d=i(N,h.props),d.ref=rr(p,N,h),d.return=p,p=d;break e}n(p,N);break}else t(p,N);N=N.sibling}h.type===xn?(d=ln(h.props.children,p.mode,y,h.key),d.return=p,p=d):(y=Ci(h.type,h.key,h.props,null,p.mode,y),y.ref=rr(p,d,h),y.return=p,p=y)}return l(p);case yn:e:{for(N=h.key;d!==null;){if(d.key===N)if(d.tag===4&&d.stateNode.containerInfo===h.containerInfo&&d.stateNode.implementation===h.implementation){n(p,d.sibling),d=i(d,h.children||[]),d.return=p,p=d;break e}else{n(p,d);break}else t(p,d);d=d.sibling}d=Ua(h,p.mode,y),d.return=p,p=d}return l(p);case Pt:return N=h._init,B(p,d,N(h._payload),y)}if(or(h))return C(p,d,h,y);if(Jn(h))return S(p,d,h,y);ii(p,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,d!==null&&d.tag===6?(n(p,d.sibling),d=i(d,h),d.return=p,p=d):(n(p,d),d=$a(h,p.mode,y),d.return=p,p=d),l(p)):n(p,d)}return B}var Hn=Lc(!0),Oc=Lc(!1),Hi=Kt(null),Di=null,jn=null,po=null;function fo(){po=jn=Di=null}function ho(e){var t=Hi.current;J(Hi),e._currentValue=t}function Cl(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function On(e,t){Di=e,po=jn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(ze=!0),e.firstContext=null)}function Ye(e){var t=e._currentValue;if(po!==e)if(e={context:e,memoizedValue:t,next:null},jn===null){if(Di===null)throw Error(x(308));jn=e,Di.dependencies={lanes:0,firstContext:e}}else jn=jn.next=e;return t}var nn=null;function mo(e){nn===null?nn=[e]:nn.push(e)}function Mc(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,mo(t)):(n.next=i.next,i.next=n),t.interleaved=n,Ct(e,r)}function Ct(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var _t=!1;function go(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ac(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function wt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Wt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,$&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,Ct(e,n)}return i=r.interleaved,i===null?(t.next=t,mo(r)):(t.next=i.next,i.next=t),r.interleaved=t,Ct(e,n)}function vi(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,eo(e,n)}}function As(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};a===null?i=a=l:a=a.next=l,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Wi(e,t,n,r){var i=e.updateQueue;_t=!1;var a=i.firstBaseUpdate,l=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var u=s,c=u.next;u.next=null,l===null?a=c:l.next=c,l=u;var v=e.alternate;v!==null&&(v=v.updateQueue,s=v.lastBaseUpdate,s!==l&&(s===null?v.firstBaseUpdate=c:s.next=c,v.lastBaseUpdate=u))}if(a!==null){var g=i.baseState;l=0,v=c=u=null,s=a;do{var m=s.lane,w=s.eventTime;if((r&m)===m){v!==null&&(v=v.next={eventTime:w,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var C=e,S=s;switch(m=t,w=n,S.tag){case 1:if(C=S.payload,typeof C=="function"){g=C.call(w,g,m);break e}g=C;break e;case 3:C.flags=C.flags&-65537|128;case 0:if(C=S.payload,m=typeof C=="function"?C.call(w,g,m):C,m==null)break e;g=re({},g,m);break e;case 2:_t=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,m=i.effects,m===null?i.effects=[s]:m.push(s))}else w={eventTime:w,lane:m,tag:s.tag,payload:s.payload,callback:s.callback,next:null},v===null?(c=v=w,u=g):v=v.next=w,l|=m;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;m=s,s=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(!0);if(v===null&&(u=g),i.baseState=u,i.firstBaseUpdate=c,i.lastBaseUpdate=v,t=i.shared.interleaved,t!==null){i=t;do l|=i.lane,i=i.next;while(i!==t)}else a===null&&(i.shared.lanes=0);dn|=l,e.lanes=l,e.memoizedState=g}}function Is(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(x(191,i));i.call(r)}}}var Fr={},ht=Kt(Fr),zr=Kt(Fr),Lr=Kt(Fr);function rn(e){if(e===Fr)throw Error(x(174));return e}function vo(e,t){switch(G(Lr,t),G(zr,e),G(ht,Fr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:rl(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=rl(t,e)}J(ht),G(ht,t)}function Dn(){J(ht),J(zr),J(Lr)}function Ic(e){rn(Lr.current);var t=rn(ht.current),n=rl(t,e.type);t!==n&&(G(zr,e),G(ht,n))}function yo(e){zr.current===e&&(J(ht),J(zr))}var te=Kt(0);function Fi(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ia=[];function xo(){for(var e=0;e<Ia.length;e++)Ia[e]._workInProgressVersionPrimary=null;Ia.length=0}var yi=Et.ReactCurrentDispatcher,Ba=Et.ReactCurrentBatchConfig,cn=0,ne=null,se=null,ce=null,$i=!1,gr=!1,Or=0,Kf=0;function xe(){throw Error(x(321))}function wo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!st(e[n],t[n]))return!1;return!0}function ko(e,t,n,r,i,a){if(cn=a,ne=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,yi.current=e===null||e.memoizedState===null?Jf:qf,e=n(r,i),gr){a=0;do{if(gr=!1,Or=0,25<=a)throw Error(x(301));a+=1,ce=se=null,t.updateQueue=null,yi.current=eh,e=n(r,i)}while(gr)}if(yi.current=Ui,t=se!==null&&se.next!==null,cn=0,ce=se=ne=null,$i=!1,t)throw Error(x(300));return e}function So(){var e=Or!==0;return Or=0,e}function dt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ce===null?ne.memoizedState=ce=e:ce=ce.next=e,ce}function Xe(){if(se===null){var e=ne.alternate;e=e!==null?e.memoizedState:null}else e=se.next;var t=ce===null?ne.memoizedState:ce.next;if(t!==null)ce=t,se=e;else{if(e===null)throw Error(x(310));se=e,e={memoizedState:se.memoizedState,baseState:se.baseState,baseQueue:se.baseQueue,queue:se.queue,next:null},ce===null?ne.memoizedState=ce=e:ce=ce.next=e}return ce}function Mr(e,t){return typeof t=="function"?t(e):t}function Ha(e){var t=Xe(),n=t.queue;if(n===null)throw Error(x(311));n.lastRenderedReducer=e;var r=se,i=r.baseQueue,a=n.pending;if(a!==null){if(i!==null){var l=i.next;i.next=a.next,a.next=l}r.baseQueue=i=a,n.pending=null}if(i!==null){a=i.next,r=r.baseState;var s=l=null,u=null,c=a;do{var v=c.lane;if((cn&v)===v)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var g={lane:v,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(s=u=g,l=r):u=u.next=g,ne.lanes|=v,dn|=v}c=c.next}while(c!==null&&c!==a);u===null?l=r:u.next=s,st(r,t.memoizedState)||(ze=!0),t.memoizedState=r,t.baseState=l,t.baseQueue=u,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do a=i.lane,ne.lanes|=a,dn|=a,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Da(e){var t=Xe(),n=t.queue;if(n===null)throw Error(x(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,a=t.memoizedState;if(i!==null){n.pending=null;var l=i=i.next;do a=e(a,l.action),l=l.next;while(l!==i);st(a,t.memoizedState)||(ze=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,r]}function Bc(){}function Hc(e,t){var n=ne,r=Xe(),i=t(),a=!st(r.memoizedState,i);if(a&&(r.memoizedState=i,ze=!0),r=r.queue,Co(Fc.bind(null,n,r,e),[e]),r.getSnapshot!==t||a||ce!==null&&ce.memoizedState.tag&1){if(n.flags|=2048,Ar(9,Wc.bind(null,n,r,i,t),void 0,null),de===null)throw Error(x(349));cn&30||Dc(n,t,i)}return i}function Dc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ne.updateQueue,t===null?(t={lastEffect:null,stores:null},ne.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Wc(e,t,n,r){t.value=n,t.getSnapshot=r,$c(t)&&Uc(e)}function Fc(e,t,n){return n(function(){$c(t)&&Uc(e)})}function $c(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!st(e,n)}catch{return!0}}function Uc(e){var t=Ct(e,1);t!==null&&ot(t,e,1,-1)}function Bs(e){var t=dt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Mr,lastRenderedState:e},t.queue=e,e=e.dispatch=Xf.bind(null,ne,e),[t.memoizedState,e]}function Ar(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ne.updateQueue,t===null?(t={lastEffect:null,stores:null},ne.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Vc(){return Xe().memoizedState}function xi(e,t,n,r){var i=dt();ne.flags|=e,i.memoizedState=Ar(1|t,n,void 0,r===void 0?null:r)}function aa(e,t,n,r){var i=Xe();r=r===void 0?null:r;var a=void 0;if(se!==null){var l=se.memoizedState;if(a=l.destroy,r!==null&&wo(r,l.deps)){i.memoizedState=Ar(t,n,a,r);return}}ne.flags|=e,i.memoizedState=Ar(1|t,n,a,r)}function Hs(e,t){return xi(8390656,8,e,t)}function Co(e,t){return aa(2048,8,e,t)}function Gc(e,t){return aa(4,2,e,t)}function Qc(e,t){return aa(4,4,e,t)}function Kc(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Zc(e,t,n){return n=n!=null?n.concat([e]):null,aa(4,4,Kc.bind(null,t,e),n)}function Ro(){}function Yc(e,t){var n=Xe();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&wo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Xc(e,t){var n=Xe();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&wo(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Jc(e,t,n){return cn&21?(st(n,t)||(n=rc(),ne.lanes|=n,dn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,ze=!0),e.memoizedState=n)}function Zf(e,t){var n=V;V=n!==0&&4>n?n:4,e(!0);var r=Ba.transition;Ba.transition={};try{e(!1),t()}finally{V=n,Ba.transition=r}}function qc(){return Xe().memoizedState}function Yf(e,t,n){var r=$t(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},ed(e))td(t,n);else if(n=Mc(e,t,n,r),n!==null){var i=Ee();ot(n,e,r,i),nd(n,t,r)}}function Xf(e,t,n){var r=$t(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(ed(e))td(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var l=t.lastRenderedState,s=a(l,n);if(i.hasEagerState=!0,i.eagerState=s,st(s,l)){var u=t.interleaved;u===null?(i.next=i,mo(t)):(i.next=u.next,u.next=i),t.interleaved=i;return}}catch{}finally{}n=Mc(e,t,i,r),n!==null&&(i=Ee(),ot(n,e,r,i),nd(n,t,r))}}function ed(e){var t=e.alternate;return e===ne||t!==null&&t===ne}function td(e,t){gr=$i=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function nd(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,eo(e,n)}}var Ui={readContext:Ye,useCallback:xe,useContext:xe,useEffect:xe,useImperativeHandle:xe,useInsertionEffect:xe,useLayoutEffect:xe,useMemo:xe,useReducer:xe,useRef:xe,useState:xe,useDebugValue:xe,useDeferredValue:xe,useTransition:xe,useMutableSource:xe,useSyncExternalStore:xe,useId:xe,unstable_isNewReconciler:!1},Jf={readContext:Ye,useCallback:function(e,t){return dt().memoizedState=[e,t===void 0?null:t],e},useContext:Ye,useEffect:Hs,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,xi(4194308,4,Kc.bind(null,t,e),n)},useLayoutEffect:function(e,t){return xi(4194308,4,e,t)},useInsertionEffect:function(e,t){return xi(4,2,e,t)},useMemo:function(e,t){var n=dt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=dt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Yf.bind(null,ne,e),[r.memoizedState,e]},useRef:function(e){var t=dt();return e={current:e},t.memoizedState=e},useState:Bs,useDebugValue:Ro,useDeferredValue:function(e){return dt().memoizedState=e},useTransition:function(){var e=Bs(!1),t=e[0];return e=Zf.bind(null,e[1]),dt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ne,i=dt();if(q){if(n===void 0)throw Error(x(407));n=n()}else{if(n=t(),de===null)throw Error(x(349));cn&30||Dc(r,t,n)}i.memoizedState=n;var a={value:n,getSnapshot:t};return i.queue=a,Hs(Fc.bind(null,r,a,e),[e]),r.flags|=2048,Ar(9,Wc.bind(null,r,a,n,t),void 0,null),n},useId:function(){var e=dt(),t=de.identifierPrefix;if(q){var n=xt,r=yt;n=(r&~(1<<32-lt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Or++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Kf++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},qf={readContext:Ye,useCallback:Yc,useContext:Ye,useEffect:Co,useImperativeHandle:Zc,useInsertionEffect:Gc,useLayoutEffect:Qc,useMemo:Xc,useReducer:Ha,useRef:Vc,useState:function(){return Ha(Mr)},useDebugValue:Ro,useDeferredValue:function(e){var t=Xe();return Jc(t,se.memoizedState,e)},useTransition:function(){var e=Ha(Mr)[0],t=Xe().memoizedState;return[e,t]},useMutableSource:Bc,useSyncExternalStore:Hc,useId:qc,unstable_isNewReconciler:!1},eh={readContext:Ye,useCallback:Yc,useContext:Ye,useEffect:Co,useImperativeHandle:Zc,useInsertionEffect:Gc,useLayoutEffect:Qc,useMemo:Xc,useReducer:Da,useRef:Vc,useState:function(){return Da(Mr)},useDebugValue:Ro,useDeferredValue:function(e){var t=Xe();return se===null?t.memoizedState=e:Jc(t,se.memoizedState,e)},useTransition:function(){var e=Da(Mr)[0],t=Xe().memoizedState;return[e,t]},useMutableSource:Bc,useSyncExternalStore:Hc,useId:qc,unstable_isNewReconciler:!1};function rt(e,t){if(e&&e.defaultProps){t=re({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Rl(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:re({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var la={isMounted:function(e){return(e=e._reactInternals)?hn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ee(),i=$t(e),a=wt(r,i);a.payload=t,n!=null&&(a.callback=n),t=Wt(e,a,i),t!==null&&(ot(t,e,i,r),vi(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ee(),i=$t(e),a=wt(r,i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=Wt(e,a,i),t!==null&&(ot(t,e,i,r),vi(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ee(),r=$t(e),i=wt(n,r);i.tag=2,t!=null&&(i.callback=t),t=Wt(e,i,r),t!==null&&(ot(t,e,r,n),vi(t,e,r))}};function Ds(e,t,n,r,i,a,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,a,l):t.prototype&&t.prototype.isPureReactComponent?!Tr(n,r)||!Tr(i,a):!0}function rd(e,t,n){var r=!1,i=Gt,a=t.contextType;return typeof a=="object"&&a!==null?a=Ye(a):(i=Oe(t)?sn:Ce.current,r=t.contextTypes,a=(r=r!=null)?In(e,i):Gt),t=new t(n,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=la,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=a),t}function Ws(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&la.enqueueReplaceState(t,t.state,null)}function El(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},go(e);var a=t.contextType;typeof a=="object"&&a!==null?i.context=Ye(a):(a=Oe(t)?sn:Ce.current,i.context=In(e,a)),i.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(Rl(e,t,a,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&la.enqueueReplaceState(i,i.state,null),Wi(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Wn(e,t){try{var n="",r=t;do n+=jp(r),r=r.return;while(r);var i=n}catch(a){i=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:i,digest:null}}function Wa(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Nl(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var th=typeof WeakMap=="function"?WeakMap:Map;function id(e,t,n){n=wt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Gi||(Gi=!0,Al=r),Nl(e,t)},n}function ad(e,t,n){n=wt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){Nl(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(n.callback=function(){Nl(e,t),typeof r!="function"&&(Ft===null?Ft=new Set([this]):Ft.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),n}function Fs(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new th;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=mh.bind(null,e,t,n),t.then(e,e))}function $s(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Us(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=wt(-1,1),t.tag=2,Wt(n,t,1))),n.lanes|=1),e)}var nh=Et.ReactCurrentOwner,ze=!1;function Re(e,t,n,r){t.child=e===null?Oc(t,null,n,r):Hn(t,e.child,n,r)}function Vs(e,t,n,r,i){n=n.render;var a=t.ref;return On(t,i),r=ko(e,t,n,r,a,i),n=So(),e!==null&&!ze?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Rt(e,t,i)):(q&&n&&so(t),t.flags|=1,Re(e,t,r,i),t.child)}function Gs(e,t,n,r,i){if(e===null){var a=n.type;return typeof a=="function"&&!zo(a)&&a.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=a,ld(e,t,a,r,i)):(e=Ci(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!(e.lanes&i)){var l=a.memoizedProps;if(n=n.compare,n=n!==null?n:Tr,n(l,r)&&e.ref===t.ref)return Rt(e,t,i)}return t.flags|=1,e=Ut(a,r),e.ref=t.ref,e.return=t,t.child=e}function ld(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Tr(a,r)&&e.ref===t.ref)if(ze=!1,t.pendingProps=r=a,(e.lanes&i)!==0)e.flags&131072&&(ze=!0);else return t.lanes=e.lanes,Rt(e,t,i)}return jl(e,t,n,r,i)}function od(e,t,n){var r=t.pendingProps,i=r.children,a=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},G(bn,He),He|=n;else{if(!(n&1073741824))return e=a!==null?a.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,G(bn,He),He|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=a!==null?a.baseLanes:n,G(bn,He),He|=r}else a!==null?(r=a.baseLanes|n,t.memoizedState=null):r=n,G(bn,He),He|=r;return Re(e,t,i,n),t.child}function sd(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function jl(e,t,n,r,i){var a=Oe(n)?sn:Ce.current;return a=In(t,a),On(t,i),n=ko(e,t,n,r,a,i),r=So(),e!==null&&!ze?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,Rt(e,t,i)):(q&&r&&so(t),t.flags|=1,Re(e,t,n,i),t.child)}function Qs(e,t,n,r,i){if(Oe(n)){var a=!0;Ai(t)}else a=!1;if(On(t,i),t.stateNode===null)wi(e,t),rd(t,n,r),El(t,n,r,i),r=!0;else if(e===null){var l=t.stateNode,s=t.memoizedProps;l.props=s;var u=l.context,c=n.contextType;typeof c=="object"&&c!==null?c=Ye(c):(c=Oe(n)?sn:Ce.current,c=In(t,c));var v=n.getDerivedStateFromProps,g=typeof v=="function"||typeof l.getSnapshotBeforeUpdate=="function";g||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(s!==r||u!==c)&&Ws(t,l,r,c),_t=!1;var m=t.memoizedState;l.state=m,Wi(t,r,l,i),u=t.memoizedState,s!==r||m!==u||Le.current||_t?(typeof v=="function"&&(Rl(t,n,v,r),u=t.memoizedState),(s=_t||Ds(t,n,s,r,m,u,c))?(g||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),l.props=r,l.state=u,l.context=c,r=s):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,Ac(e,t),s=t.memoizedProps,c=t.type===t.elementType?s:rt(t.type,s),l.props=c,g=t.pendingProps,m=l.context,u=n.contextType,typeof u=="object"&&u!==null?u=Ye(u):(u=Oe(n)?sn:Ce.current,u=In(t,u));var w=n.getDerivedStateFromProps;(v=typeof w=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(s!==g||m!==u)&&Ws(t,l,r,u),_t=!1,m=t.memoizedState,l.state=m,Wi(t,r,l,i);var C=t.memoizedState;s!==g||m!==C||Le.current||_t?(typeof w=="function"&&(Rl(t,n,w,r),C=t.memoizedState),(c=_t||Ds(t,n,c,r,m,C,u)||!1)?(v||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,C,u),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,C,u)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=C),l.props=r,l.state=C,l.context=u,r=c):(typeof l.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),r=!1)}return Tl(e,t,n,r,a,i)}function Tl(e,t,n,r,i,a){sd(e,t);var l=(t.flags&128)!==0;if(!r&&!l)return i&&zs(t,n,!1),Rt(e,t,a);r=t.stateNode,nh.current=t;var s=l&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&l?(t.child=Hn(t,e.child,null,a),t.child=Hn(t,null,s,a)):Re(e,t,s,a),t.memoizedState=r.state,i&&zs(t,n,!0),t.child}function ud(e){var t=e.stateNode;t.pendingContext?_s(e,t.pendingContext,t.pendingContext!==t.context):t.context&&_s(e,t.context,!1),vo(e,t.containerInfo)}function Ks(e,t,n,r,i){return Bn(),co(i),t.flags|=256,Re(e,t,n,r),t.child}var bl={dehydrated:null,treeContext:null,retryLane:0};function Pl(e){return{baseLanes:e,cachePool:null,transitions:null}}function cd(e,t,n){var r=t.pendingProps,i=te.current,a=!1,l=(t.flags&128)!==0,s;if((s=l)||(s=e!==null&&e.memoizedState===null?!1:(i&2)!==0),s?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),G(te,i&1),e===null)return Sl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(l=r.children,e=r.fallback,a?(r=t.mode,a=t.child,l={mode:"hidden",children:l},!(r&1)&&a!==null?(a.childLanes=0,a.pendingProps=l):a=ua(l,r,0,null),e=ln(e,r,n,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=Pl(n),t.memoizedState=bl,e):Eo(t,l));if(i=e.memoizedState,i!==null&&(s=i.dehydrated,s!==null))return rh(e,t,l,r,s,i,n);if(a){a=r.fallback,l=t.mode,i=e.child,s=i.sibling;var u={mode:"hidden",children:r.children};return!(l&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=Ut(i,u),r.subtreeFlags=i.subtreeFlags&14680064),s!==null?a=Ut(s,a):(a=ln(a,l,n,null),a.flags|=2),a.return=t,r.return=t,r.sibling=a,t.child=r,r=a,a=t.child,l=e.child.memoizedState,l=l===null?Pl(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},a.memoizedState=l,a.childLanes=e.childLanes&~n,t.memoizedState=bl,r}return a=e.child,e=a.sibling,r=Ut(a,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Eo(e,t){return t=ua({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function ai(e,t,n,r){return r!==null&&co(r),Hn(t,e.child,null,n),e=Eo(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function rh(e,t,n,r,i,a,l){if(n)return t.flags&256?(t.flags&=-257,r=Wa(Error(x(422))),ai(e,t,l,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=r.fallback,i=t.mode,r=ua({mode:"visible",children:r.children},i,0,null),a=ln(a,i,l,null),a.flags|=2,r.return=t,a.return=t,r.sibling=a,t.child=r,t.mode&1&&Hn(t,e.child,null,l),t.child.memoizedState=Pl(l),t.memoizedState=bl,a);if(!(t.mode&1))return ai(e,t,l,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var s=r.dgst;return r=s,a=Error(x(419)),r=Wa(a,r,void 0),ai(e,t,l,r)}if(s=(l&e.childLanes)!==0,ze||s){if(r=de,r!==null){switch(l&-l){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|l)?0:i,i!==0&&i!==a.retryLane&&(a.retryLane=i,Ct(e,i),ot(r,e,i,-1))}return _o(),r=Wa(Error(x(421))),ai(e,t,l,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=gh.bind(null,e),i._reactRetry=t,null):(e=a.treeContext,De=Dt(i.nextSibling),We=t,q=!0,at=null,e!==null&&(Ge[Qe++]=yt,Ge[Qe++]=xt,Ge[Qe++]=un,yt=e.id,xt=e.overflow,un=t),t=Eo(t,r.children),t.flags|=4096,t)}function Zs(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Cl(e.return,t,n)}function Fa(e,t,n,r,i){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=r,a.tail=n,a.tailMode=i)}function dd(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;if(Re(e,t,r.children,n),r=te.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Zs(e,n,t);else if(e.tag===19)Zs(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(G(te,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&Fi(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Fa(t,!1,i,n,a);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Fi(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Fa(t,!0,n,null,a);break;case"together":Fa(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function wi(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Rt(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),dn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(x(153));if(t.child!==null){for(e=t.child,n=Ut(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ut(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ih(e,t,n){switch(t.tag){case 3:ud(t),Bn();break;case 5:Ic(t);break;case 1:Oe(t.type)&&Ai(t);break;case 4:vo(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;G(Hi,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(G(te,te.current&1),t.flags|=128,null):n&t.child.childLanes?cd(e,t,n):(G(te,te.current&1),e=Rt(e,t,n),e!==null?e.sibling:null);G(te,te.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return dd(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),G(te,te.current),r)break;return null;case 22:case 23:return t.lanes=0,od(e,t,n)}return Rt(e,t,n)}var pd,_l,fd,hd;pd=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};_l=function(){};fd=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,rn(ht.current);var a=null;switch(n){case"input":i=qa(e,i),r=qa(e,r),a=[];break;case"select":i=re({},i,{value:void 0}),r=re({},r,{value:void 0}),a=[];break;case"textarea":i=nl(e,i),r=nl(e,r),a=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Oi)}il(n,r);var l;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var s=i[c];for(l in s)s.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(kr.hasOwnProperty(c)?a||(a=[]):(a=a||[]).push(c,null));for(c in r){var u=r[c];if(s=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&u!==s&&(u!=null||s!=null))if(c==="style")if(s){for(l in s)!s.hasOwnProperty(l)||u&&u.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in u)u.hasOwnProperty(l)&&s[l]!==u[l]&&(n||(n={}),n[l]=u[l])}else n||(a||(a=[]),a.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,s=s?s.__html:void 0,u!=null&&s!==u&&(a=a||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(a=a||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(kr.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&X("scroll",e),a||s===u||(a=[])):(a=a||[]).push(c,u))}n&&(a=a||[]).push("style",n);var c=a;(t.updateQueue=c)&&(t.flags|=4)}};hd=function(e,t,n,r){n!==r&&(t.flags|=4)};function ir(e,t){if(!q)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function we(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function ah(e,t,n){var r=t.pendingProps;switch(uo(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return we(t),null;case 1:return Oe(t.type)&&Mi(),we(t),null;case 3:return r=t.stateNode,Dn(),J(Le),J(Ce),xo(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(ri(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,at!==null&&(Hl(at),at=null))),_l(e,t),we(t),null;case 5:yo(t);var i=rn(Lr.current);if(n=t.type,e!==null&&t.stateNode!=null)fd(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(x(166));return we(t),null}if(e=rn(ht.current),ri(t)){r=t.stateNode,n=t.type;var a=t.memoizedProps;switch(r[pt]=t,r[_r]=a,e=(t.mode&1)!==0,n){case"dialog":X("cancel",r),X("close",r);break;case"iframe":case"object":case"embed":X("load",r);break;case"video":case"audio":for(i=0;i<ur.length;i++)X(ur[i],r);break;case"source":X("error",r);break;case"img":case"image":case"link":X("error",r),X("load",r);break;case"details":X("toggle",r);break;case"input":is(r,a),X("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!a.multiple},X("invalid",r);break;case"textarea":ls(r,a),X("invalid",r)}il(n,a),i=null;for(var l in a)if(a.hasOwnProperty(l)){var s=a[l];l==="children"?typeof s=="string"?r.textContent!==s&&(a.suppressHydrationWarning!==!0&&ni(r.textContent,s,e),i=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(a.suppressHydrationWarning!==!0&&ni(r.textContent,s,e),i=["children",""+s]):kr.hasOwnProperty(l)&&s!=null&&l==="onScroll"&&X("scroll",r)}switch(n){case"input":Kr(r),as(r,a,!0);break;case"textarea":Kr(r),os(r);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(r.onclick=Oi)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{l=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Fu(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),n==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[pt]=t,e[_r]=r,pd(e,t,!1,!1),t.stateNode=e;e:{switch(l=al(n,r),n){case"dialog":X("cancel",e),X("close",e),i=r;break;case"iframe":case"object":case"embed":X("load",e),i=r;break;case"video":case"audio":for(i=0;i<ur.length;i++)X(ur[i],e);i=r;break;case"source":X("error",e),i=r;break;case"img":case"image":case"link":X("error",e),X("load",e),i=r;break;case"details":X("toggle",e),i=r;break;case"input":is(e,r),i=qa(e,r),X("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=re({},r,{value:void 0}),X("invalid",e);break;case"textarea":ls(e,r),i=nl(e,r),X("invalid",e);break;default:i=r}il(n,i),s=i;for(a in s)if(s.hasOwnProperty(a)){var u=s[a];a==="style"?Vu(e,u):a==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&$u(e,u)):a==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&Sr(e,u):typeof u=="number"&&Sr(e,""+u):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(kr.hasOwnProperty(a)?u!=null&&a==="onScroll"&&X("scroll",e):u!=null&&Kl(e,a,u,l))}switch(n){case"input":Kr(e),as(e,r,!1);break;case"textarea":Kr(e),os(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Vt(r.value));break;case"select":e.multiple=!!r.multiple,a=r.value,a!=null?Pn(e,!!r.multiple,a,!1):r.defaultValue!=null&&Pn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Oi)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return we(t),null;case 6:if(e&&t.stateNode!=null)hd(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(x(166));if(n=rn(Lr.current),rn(ht.current),ri(t)){if(r=t.stateNode,n=t.memoizedProps,r[pt]=t,(a=r.nodeValue!==n)&&(e=We,e!==null))switch(e.tag){case 3:ni(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ni(r.nodeValue,n,(e.mode&1)!==0)}a&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[pt]=t,t.stateNode=r}return we(t),null;case 13:if(J(te),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(q&&De!==null&&t.mode&1&&!(t.flags&128))zc(),Bn(),t.flags|=98560,a=!1;else if(a=ri(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(x(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(x(317));a[pt]=t}else Bn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;we(t),a=!1}else at!==null&&(Hl(at),at=null),a=!0;if(!a)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||te.current&1?ue===0&&(ue=3):_o())),t.updateQueue!==null&&(t.flags|=4),we(t),null);case 4:return Dn(),_l(e,t),e===null&&br(t.stateNode.containerInfo),we(t),null;case 10:return ho(t.type._context),we(t),null;case 17:return Oe(t.type)&&Mi(),we(t),null;case 19:if(J(te),a=t.memoizedState,a===null)return we(t),null;if(r=(t.flags&128)!==0,l=a.rendering,l===null)if(r)ir(a,!1);else{if(ue!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=Fi(e),l!==null){for(t.flags|=128,ir(a,!1),r=l.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)a=n,e=r,a.flags&=14680066,l=a.alternate,l===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=l.childLanes,a.lanes=l.lanes,a.child=l.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=l.memoizedProps,a.memoizedState=l.memoizedState,a.updateQueue=l.updateQueue,a.type=l.type,e=l.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return G(te,te.current&1|2),t.child}e=e.sibling}a.tail!==null&&ae()>Fn&&(t.flags|=128,r=!0,ir(a,!1),t.lanes=4194304)}else{if(!r)if(e=Fi(l),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),ir(a,!0),a.tail===null&&a.tailMode==="hidden"&&!l.alternate&&!q)return we(t),null}else 2*ae()-a.renderingStartTime>Fn&&n!==1073741824&&(t.flags|=128,r=!0,ir(a,!1),t.lanes=4194304);a.isBackwards?(l.sibling=t.child,t.child=l):(n=a.last,n!==null?n.sibling=l:t.child=l,a.last=l)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=ae(),t.sibling=null,n=te.current,G(te,r?n&1|2:n&1),t):(we(t),null);case 22:case 23:return Po(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?He&1073741824&&(we(t),t.subtreeFlags&6&&(t.flags|=8192)):we(t),null;case 24:return null;case 25:return null}throw Error(x(156,t.tag))}function lh(e,t){switch(uo(t),t.tag){case 1:return Oe(t.type)&&Mi(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Dn(),J(Le),J(Ce),xo(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return yo(t),null;case 13:if(J(te),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(x(340));Bn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return J(te),null;case 4:return Dn(),null;case 10:return ho(t.type._context),null;case 22:case 23:return Po(),null;case 24:return null;default:return null}}var li=!1,Se=!1,oh=typeof WeakSet=="function"?WeakSet:Set,T=null;function Tn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ie(e,t,r)}else n.current=null}function zl(e,t,n){try{n()}catch(r){ie(e,t,r)}}var Ys=!1;function sh(e,t){if(ml=_i,e=xc(),oo(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,a=r.focusNode;r=r.focusOffset;try{n.nodeType,a.nodeType}catch{n=null;break e}var l=0,s=-1,u=-1,c=0,v=0,g=e,m=null;t:for(;;){for(var w;g!==n||i!==0&&g.nodeType!==3||(s=l+i),g!==a||r!==0&&g.nodeType!==3||(u=l+r),g.nodeType===3&&(l+=g.nodeValue.length),(w=g.firstChild)!==null;)m=g,g=w;for(;;){if(g===e)break t;if(m===n&&++c===i&&(s=l),m===a&&++v===r&&(u=l),(w=g.nextSibling)!==null)break;g=m,m=g.parentNode}g=w}n=s===-1||u===-1?null:{start:s,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(gl={focusedElem:e,selectionRange:n},_i=!1,T=t;T!==null;)if(t=T,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,T=e;else for(;T!==null;){t=T;try{var C=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(C!==null){var S=C.memoizedProps,B=C.memoizedState,p=t.stateNode,d=p.getSnapshotBeforeUpdate(t.elementType===t.type?S:rt(t.type,S),B);p.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var h=t.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(x(163))}}catch(y){ie(t,t.return,y)}if(e=t.sibling,e!==null){e.return=t.return,T=e;break}T=t.return}return C=Ys,Ys=!1,C}function vr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var a=i.destroy;i.destroy=void 0,a!==void 0&&zl(t,n,a)}i=i.next}while(i!==r)}}function oa(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Ll(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function md(e){var t=e.alternate;t!==null&&(e.alternate=null,md(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[pt],delete t[_r],delete t[xl],delete t[Uf],delete t[Vf])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function gd(e){return e.tag===5||e.tag===3||e.tag===4}function Xs(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||gd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ol(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Oi));else if(r!==4&&(e=e.child,e!==null))for(Ol(e,t,n),e=e.sibling;e!==null;)Ol(e,t,n),e=e.sibling}function Ml(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ml(e,t,n),e=e.sibling;e!==null;)Ml(e,t,n),e=e.sibling}var me=null,it=!1;function bt(e,t,n){for(n=n.child;n!==null;)vd(e,t,n),n=n.sibling}function vd(e,t,n){if(ft&&typeof ft.onCommitFiberUnmount=="function")try{ft.onCommitFiberUnmount(qi,n)}catch{}switch(n.tag){case 5:Se||Tn(n,t);case 6:var r=me,i=it;me=null,bt(e,t,n),me=r,it=i,me!==null&&(it?(e=me,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):me.removeChild(n.stateNode));break;case 18:me!==null&&(it?(e=me,n=n.stateNode,e.nodeType===8?Ma(e.parentNode,n):e.nodeType===1&&Ma(e,n),Nr(e)):Ma(me,n.stateNode));break;case 4:r=me,i=it,me=n.stateNode.containerInfo,it=!0,bt(e,t,n),me=r,it=i;break;case 0:case 11:case 14:case 15:if(!Se&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var a=i,l=a.destroy;a=a.tag,l!==void 0&&(a&2||a&4)&&zl(n,t,l),i=i.next}while(i!==r)}bt(e,t,n);break;case 1:if(!Se&&(Tn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){ie(n,t,s)}bt(e,t,n);break;case 21:bt(e,t,n);break;case 22:n.mode&1?(Se=(r=Se)||n.memoizedState!==null,bt(e,t,n),Se=r):bt(e,t,n);break;default:bt(e,t,n)}}function Js(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new oh),t.forEach(function(r){var i=vh.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function nt(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var a=e,l=t,s=l;e:for(;s!==null;){switch(s.tag){case 5:me=s.stateNode,it=!1;break e;case 3:me=s.stateNode.containerInfo,it=!0;break e;case 4:me=s.stateNode.containerInfo,it=!0;break e}s=s.return}if(me===null)throw Error(x(160));vd(a,l,i),me=null,it=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(c){ie(i,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)yd(t,e),t=t.sibling}function yd(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(nt(t,e),ct(e),r&4){try{vr(3,e,e.return),oa(3,e)}catch(S){ie(e,e.return,S)}try{vr(5,e,e.return)}catch(S){ie(e,e.return,S)}}break;case 1:nt(t,e),ct(e),r&512&&n!==null&&Tn(n,n.return);break;case 5:if(nt(t,e),ct(e),r&512&&n!==null&&Tn(n,n.return),e.flags&32){var i=e.stateNode;try{Sr(i,"")}catch(S){ie(e,e.return,S)}}if(r&4&&(i=e.stateNode,i!=null)){var a=e.memoizedProps,l=n!==null?n.memoizedProps:a,s=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{s==="input"&&a.type==="radio"&&a.name!=null&&Du(i,a),al(s,l);var c=al(s,a);for(l=0;l<u.length;l+=2){var v=u[l],g=u[l+1];v==="style"?Vu(i,g):v==="dangerouslySetInnerHTML"?$u(i,g):v==="children"?Sr(i,g):Kl(i,v,g,c)}switch(s){case"input":el(i,a);break;case"textarea":Wu(i,a);break;case"select":var m=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!a.multiple;var w=a.value;w!=null?Pn(i,!!a.multiple,w,!1):m!==!!a.multiple&&(a.defaultValue!=null?Pn(i,!!a.multiple,a.defaultValue,!0):Pn(i,!!a.multiple,a.multiple?[]:"",!1))}i[_r]=a}catch(S){ie(e,e.return,S)}}break;case 6:if(nt(t,e),ct(e),r&4){if(e.stateNode===null)throw Error(x(162));i=e.stateNode,a=e.memoizedProps;try{i.nodeValue=a}catch(S){ie(e,e.return,S)}}break;case 3:if(nt(t,e),ct(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Nr(t.containerInfo)}catch(S){ie(e,e.return,S)}break;case 4:nt(t,e),ct(e);break;case 13:nt(t,e),ct(e),i=e.child,i.flags&8192&&(a=i.memoizedState!==null,i.stateNode.isHidden=a,!a||i.alternate!==null&&i.alternate.memoizedState!==null||(To=ae())),r&4&&Js(e);break;case 22:if(v=n!==null&&n.memoizedState!==null,e.mode&1?(Se=(c=Se)||v,nt(t,e),Se=c):nt(t,e),ct(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!v&&e.mode&1)for(T=e,v=e.child;v!==null;){for(g=T=v;T!==null;){switch(m=T,w=m.child,m.tag){case 0:case 11:case 14:case 15:vr(4,m,m.return);break;case 1:Tn(m,m.return);var C=m.stateNode;if(typeof C.componentWillUnmount=="function"){r=m,n=m.return;try{t=r,C.props=t.memoizedProps,C.state=t.memoizedState,C.componentWillUnmount()}catch(S){ie(r,n,S)}}break;case 5:Tn(m,m.return);break;case 22:if(m.memoizedState!==null){eu(g);continue}}w!==null?(w.return=m,T=w):eu(g)}v=v.sibling}e:for(v=null,g=e;;){if(g.tag===5){if(v===null){v=g;try{i=g.stateNode,c?(a=i.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(s=g.stateNode,u=g.memoizedProps.style,l=u!=null&&u.hasOwnProperty("display")?u.display:null,s.style.display=Uu("display",l))}catch(S){ie(e,e.return,S)}}}else if(g.tag===6){if(v===null)try{g.stateNode.nodeValue=c?"":g.memoizedProps}catch(S){ie(e,e.return,S)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;v===g&&(v=null),g=g.return}v===g&&(v=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:nt(t,e),ct(e),r&4&&Js(e);break;case 21:break;default:nt(t,e),ct(e)}}function ct(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(gd(n)){var r=n;break e}n=n.return}throw Error(x(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Sr(i,""),r.flags&=-33);var a=Xs(e);Ml(e,a,i);break;case 3:case 4:var l=r.stateNode.containerInfo,s=Xs(e);Ol(e,s,l);break;default:throw Error(x(161))}}catch(u){ie(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function uh(e,t,n){T=e,xd(e)}function xd(e,t,n){for(var r=(e.mode&1)!==0;T!==null;){var i=T,a=i.child;if(i.tag===22&&r){var l=i.memoizedState!==null||li;if(!l){var s=i.alternate,u=s!==null&&s.memoizedState!==null||Se;s=li;var c=Se;if(li=l,(Se=u)&&!c)for(T=i;T!==null;)l=T,u=l.child,l.tag===22&&l.memoizedState!==null?tu(i):u!==null?(u.return=l,T=u):tu(i);for(;a!==null;)T=a,xd(a),a=a.sibling;T=i,li=s,Se=c}qs(e)}else i.subtreeFlags&8772&&a!==null?(a.return=i,T=a):qs(e)}}function qs(e){for(;T!==null;){var t=T;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Se||oa(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Se)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:rt(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&Is(t,a,r);break;case 3:var l=t.updateQueue;if(l!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Is(t,l,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var v=c.memoizedState;if(v!==null){var g=v.dehydrated;g!==null&&Nr(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(x(163))}Se||t.flags&512&&Ll(t)}catch(m){ie(t,t.return,m)}}if(t===e){T=null;break}if(n=t.sibling,n!==null){n.return=t.return,T=n;break}T=t.return}}function eu(e){for(;T!==null;){var t=T;if(t===e){T=null;break}var n=t.sibling;if(n!==null){n.return=t.return,T=n;break}T=t.return}}function tu(e){for(;T!==null;){var t=T;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{oa(4,t)}catch(u){ie(t,n,u)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(u){ie(t,i,u)}}var a=t.return;try{Ll(t)}catch(u){ie(t,a,u)}break;case 5:var l=t.return;try{Ll(t)}catch(u){ie(t,l,u)}}}catch(u){ie(t,t.return,u)}if(t===e){T=null;break}var s=t.sibling;if(s!==null){s.return=t.return,T=s;break}T=t.return}}var ch=Math.ceil,Vi=Et.ReactCurrentDispatcher,No=Et.ReactCurrentOwner,Ze=Et.ReactCurrentBatchConfig,$=0,de=null,oe=null,ve=0,He=0,bn=Kt(0),ue=0,Ir=null,dn=0,sa=0,jo=0,yr=null,_e=null,To=0,Fn=1/0,gt=null,Gi=!1,Al=null,Ft=null,oi=!1,At=null,Qi=0,xr=0,Il=null,ki=-1,Si=0;function Ee(){return $&6?ae():ki!==-1?ki:ki=ae()}function $t(e){return e.mode&1?$&2&&ve!==0?ve&-ve:Qf.transition!==null?(Si===0&&(Si=rc()),Si):(e=V,e!==0||(e=window.event,e=e===void 0?16:cc(e.type)),e):1}function ot(e,t,n,r){if(50<xr)throw xr=0,Il=null,Error(x(185));Hr(e,n,r),(!($&2)||e!==de)&&(e===de&&(!($&2)&&(sa|=n),ue===4&&Ot(e,ve)),Me(e,r),n===1&&$===0&&!(t.mode&1)&&(Fn=ae()+500,ia&&Zt()))}function Me(e,t){var n=e.callbackNode;Gp(e,t);var r=Pi(e,e===de?ve:0);if(r===0)n!==null&&cs(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&cs(n),t===1)e.tag===0?Gf(nu.bind(null,e)):bc(nu.bind(null,e)),Ff(function(){!($&6)&&Zt()}),n=null;else{switch(ic(r)){case 1:n=ql;break;case 4:n=tc;break;case 16:n=bi;break;case 536870912:n=nc;break;default:n=bi}n=jd(n,wd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function wd(e,t){if(ki=-1,Si=0,$&6)throw Error(x(327));var n=e.callbackNode;if(Mn()&&e.callbackNode!==n)return null;var r=Pi(e,e===de?ve:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Ki(e,r);else{t=r;var i=$;$|=2;var a=Sd();(de!==e||ve!==t)&&(gt=null,Fn=ae()+500,an(e,t));do try{fh();break}catch(s){kd(e,s)}while(!0);fo(),Vi.current=a,$=i,oe!==null?t=0:(de=null,ve=0,t=ue)}if(t!==0){if(t===2&&(i=cl(e),i!==0&&(r=i,t=Bl(e,i))),t===1)throw n=Ir,an(e,0),Ot(e,r),Me(e,ae()),n;if(t===6)Ot(e,r);else{if(i=e.current.alternate,!(r&30)&&!dh(i)&&(t=Ki(e,r),t===2&&(a=cl(e),a!==0&&(r=a,t=Bl(e,a))),t===1))throw n=Ir,an(e,0),Ot(e,r),Me(e,ae()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(x(345));case 2:en(e,_e,gt);break;case 3:if(Ot(e,r),(r&130023424)===r&&(t=To+500-ae(),10<t)){if(Pi(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){Ee(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=yl(en.bind(null,e,_e,gt),t);break}en(e,_e,gt);break;case 4:if(Ot(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var l=31-lt(r);a=1<<l,l=t[l],l>i&&(i=l),r&=~a}if(r=i,r=ae()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*ch(r/1960))-r,10<r){e.timeoutHandle=yl(en.bind(null,e,_e,gt),r);break}en(e,_e,gt);break;case 5:en(e,_e,gt);break;default:throw Error(x(329))}}}return Me(e,ae()),e.callbackNode===n?wd.bind(null,e):null}function Bl(e,t){var n=yr;return e.current.memoizedState.isDehydrated&&(an(e,t).flags|=256),e=Ki(e,t),e!==2&&(t=_e,_e=n,t!==null&&Hl(t)),e}function Hl(e){_e===null?_e=e:_e.push.apply(_e,e)}function dh(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!st(a(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ot(e,t){for(t&=~jo,t&=~sa,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-lt(t),r=1<<n;e[n]=-1,t&=~r}}function nu(e){if($&6)throw Error(x(327));Mn();var t=Pi(e,0);if(!(t&1))return Me(e,ae()),null;var n=Ki(e,t);if(e.tag!==0&&n===2){var r=cl(e);r!==0&&(t=r,n=Bl(e,r))}if(n===1)throw n=Ir,an(e,0),Ot(e,t),Me(e,ae()),n;if(n===6)throw Error(x(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,en(e,_e,gt),Me(e,ae()),null}function bo(e,t){var n=$;$|=1;try{return e(t)}finally{$=n,$===0&&(Fn=ae()+500,ia&&Zt())}}function pn(e){At!==null&&At.tag===0&&!($&6)&&Mn();var t=$;$|=1;var n=Ze.transition,r=V;try{if(Ze.transition=null,V=1,e)return e()}finally{V=r,Ze.transition=n,$=t,!($&6)&&Zt()}}function Po(){He=bn.current,J(bn)}function an(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,Wf(n)),oe!==null)for(n=oe.return;n!==null;){var r=n;switch(uo(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Mi();break;case 3:Dn(),J(Le),J(Ce),xo();break;case 5:yo(r);break;case 4:Dn();break;case 13:J(te);break;case 19:J(te);break;case 10:ho(r.type._context);break;case 22:case 23:Po()}n=n.return}if(de=e,oe=e=Ut(e.current,null),ve=He=t,ue=0,Ir=null,jo=sa=dn=0,_e=yr=null,nn!==null){for(t=0;t<nn.length;t++)if(n=nn[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,a=n.pending;if(a!==null){var l=a.next;a.next=i,r.next=l}n.pending=r}nn=null}return e}function kd(e,t){do{var n=oe;try{if(fo(),yi.current=Ui,$i){for(var r=ne.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}$i=!1}if(cn=0,ce=se=ne=null,gr=!1,Or=0,No.current=null,n===null||n.return===null){ue=1,Ir=t,oe=null;break}e:{var a=e,l=n.return,s=n,u=t;if(t=ve,s.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,v=s,g=v.tag;if(!(v.mode&1)&&(g===0||g===11||g===15)){var m=v.alternate;m?(v.updateQueue=m.updateQueue,v.memoizedState=m.memoizedState,v.lanes=m.lanes):(v.updateQueue=null,v.memoizedState=null)}var w=$s(l);if(w!==null){w.flags&=-257,Us(w,l,s,a,t),w.mode&1&&Fs(a,c,t),t=w,u=c;var C=t.updateQueue;if(C===null){var S=new Set;S.add(u),t.updateQueue=S}else C.add(u);break e}else{if(!(t&1)){Fs(a,c,t),_o();break e}u=Error(x(426))}}else if(q&&s.mode&1){var B=$s(l);if(B!==null){!(B.flags&65536)&&(B.flags|=256),Us(B,l,s,a,t),co(Wn(u,s));break e}}a=u=Wn(u,s),ue!==4&&(ue=2),yr===null?yr=[a]:yr.push(a),a=l;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var p=id(a,u,t);As(a,p);break e;case 1:s=u;var d=a.type,h=a.stateNode;if(!(a.flags&128)&&(typeof d.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(Ft===null||!Ft.has(h)))){a.flags|=65536,t&=-t,a.lanes|=t;var y=ad(a,s,t);As(a,y);break e}}a=a.return}while(a!==null)}Rd(n)}catch(E){t=E,oe===n&&n!==null&&(oe=n=n.return);continue}break}while(!0)}function Sd(){var e=Vi.current;return Vi.current=Ui,e===null?Ui:e}function _o(){(ue===0||ue===3||ue===2)&&(ue=4),de===null||!(dn&268435455)&&!(sa&268435455)||Ot(de,ve)}function Ki(e,t){var n=$;$|=2;var r=Sd();(de!==e||ve!==t)&&(gt=null,an(e,t));do try{ph();break}catch(i){kd(e,i)}while(!0);if(fo(),$=n,Vi.current=r,oe!==null)throw Error(x(261));return de=null,ve=0,ue}function ph(){for(;oe!==null;)Cd(oe)}function fh(){for(;oe!==null&&!Ip();)Cd(oe)}function Cd(e){var t=Nd(e.alternate,e,He);e.memoizedProps=e.pendingProps,t===null?Rd(e):oe=t,No.current=null}function Rd(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=lh(n,t),n!==null){n.flags&=32767,oe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ue=6,oe=null;return}}else if(n=ah(n,t,He),n!==null){oe=n;return}if(t=t.sibling,t!==null){oe=t;return}oe=t=e}while(t!==null);ue===0&&(ue=5)}function en(e,t,n){var r=V,i=Ze.transition;try{Ze.transition=null,V=1,hh(e,t,n,r)}finally{Ze.transition=i,V=r}return null}function hh(e,t,n,r){do Mn();while(At!==null);if($&6)throw Error(x(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(x(177));e.callbackNode=null,e.callbackPriority=0;var a=n.lanes|n.childLanes;if(Qp(e,a),e===de&&(oe=de=null,ve=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||oi||(oi=!0,jd(bi,function(){return Mn(),null})),a=(n.flags&15990)!==0,n.subtreeFlags&15990||a){a=Ze.transition,Ze.transition=null;var l=V;V=1;var s=$;$|=4,No.current=null,sh(e,n),yd(n,e),Of(gl),_i=!!ml,gl=ml=null,e.current=n,uh(n),Bp(),$=s,V=l,Ze.transition=a}else e.current=n;if(oi&&(oi=!1,At=e,Qi=i),a=e.pendingLanes,a===0&&(Ft=null),Wp(n.stateNode),Me(e,ae()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Gi)throw Gi=!1,e=Al,Al=null,e;return Qi&1&&e.tag!==0&&Mn(),a=e.pendingLanes,a&1?e===Il?xr++:(xr=0,Il=e):xr=0,Zt(),null}function Mn(){if(At!==null){var e=ic(Qi),t=Ze.transition,n=V;try{if(Ze.transition=null,V=16>e?16:e,At===null)var r=!1;else{if(e=At,At=null,Qi=0,$&6)throw Error(x(331));var i=$;for($|=4,T=e.current;T!==null;){var a=T,l=a.child;if(T.flags&16){var s=a.deletions;if(s!==null){for(var u=0;u<s.length;u++){var c=s[u];for(T=c;T!==null;){var v=T;switch(v.tag){case 0:case 11:case 15:vr(8,v,a)}var g=v.child;if(g!==null)g.return=v,T=g;else for(;T!==null;){v=T;var m=v.sibling,w=v.return;if(md(v),v===c){T=null;break}if(m!==null){m.return=w,T=m;break}T=w}}}var C=a.alternate;if(C!==null){var S=C.child;if(S!==null){C.child=null;do{var B=S.sibling;S.sibling=null,S=B}while(S!==null)}}T=a}}if(a.subtreeFlags&2064&&l!==null)l.return=a,T=l;else e:for(;T!==null;){if(a=T,a.flags&2048)switch(a.tag){case 0:case 11:case 15:vr(9,a,a.return)}var p=a.sibling;if(p!==null){p.return=a.return,T=p;break e}T=a.return}}var d=e.current;for(T=d;T!==null;){l=T;var h=l.child;if(l.subtreeFlags&2064&&h!==null)h.return=l,T=h;else e:for(l=d;T!==null;){if(s=T,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:oa(9,s)}}catch(E){ie(s,s.return,E)}if(s===l){T=null;break e}var y=s.sibling;if(y!==null){y.return=s.return,T=y;break e}T=s.return}}if($=i,Zt(),ft&&typeof ft.onPostCommitFiberRoot=="function")try{ft.onPostCommitFiberRoot(qi,e)}catch{}r=!0}return r}finally{V=n,Ze.transition=t}}return!1}function ru(e,t,n){t=Wn(n,t),t=id(e,t,1),e=Wt(e,t,1),t=Ee(),e!==null&&(Hr(e,1,t),Me(e,t))}function ie(e,t,n){if(e.tag===3)ru(e,e,n);else for(;t!==null;){if(t.tag===3){ru(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Ft===null||!Ft.has(r))){e=Wn(n,e),e=ad(t,e,1),t=Wt(t,e,1),e=Ee(),t!==null&&(Hr(t,1,e),Me(t,e));break}}t=t.return}}function mh(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ee(),e.pingedLanes|=e.suspendedLanes&n,de===e&&(ve&n)===n&&(ue===4||ue===3&&(ve&130023424)===ve&&500>ae()-To?an(e,0):jo|=n),Me(e,t)}function Ed(e,t){t===0&&(e.mode&1?(t=Xr,Xr<<=1,!(Xr&130023424)&&(Xr=4194304)):t=1);var n=Ee();e=Ct(e,t),e!==null&&(Hr(e,t,n),Me(e,n))}function gh(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Ed(e,n)}function vh(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(x(314))}r!==null&&r.delete(t),Ed(e,n)}var Nd;Nd=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Le.current)ze=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return ze=!1,ih(e,t,n);ze=!!(e.flags&131072)}else ze=!1,q&&t.flags&1048576&&Pc(t,Bi,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;wi(e,t),e=t.pendingProps;var i=In(t,Ce.current);On(t,n),i=ko(null,t,r,e,i,n);var a=So();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Oe(r)?(a=!0,Ai(t)):a=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,go(t),i.updater=la,t.stateNode=i,i._reactInternals=t,El(t,r,e,n),t=Tl(null,t,r,!0,a,n)):(t.tag=0,q&&a&&so(t),Re(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(wi(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=xh(r),e=rt(r,e),i){case 0:t=jl(null,t,r,e,n);break e;case 1:t=Qs(null,t,r,e,n);break e;case 11:t=Vs(null,t,r,e,n);break e;case 14:t=Gs(null,t,r,rt(r.type,e),n);break e}throw Error(x(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:rt(r,i),jl(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:rt(r,i),Qs(e,t,r,i,n);case 3:e:{if(ud(t),e===null)throw Error(x(387));r=t.pendingProps,a=t.memoizedState,i=a.element,Ac(e,t),Wi(t,r,null,n);var l=t.memoizedState;if(r=l.element,a.isDehydrated)if(a={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){i=Wn(Error(x(423)),t),t=Ks(e,t,r,n,i);break e}else if(r!==i){i=Wn(Error(x(424)),t),t=Ks(e,t,r,n,i);break e}else for(De=Dt(t.stateNode.containerInfo.firstChild),We=t,q=!0,at=null,n=Oc(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Bn(),r===i){t=Rt(e,t,n);break e}Re(e,t,r,n)}t=t.child}return t;case 5:return Ic(t),e===null&&Sl(t),r=t.type,i=t.pendingProps,a=e!==null?e.memoizedProps:null,l=i.children,vl(r,i)?l=null:a!==null&&vl(r,a)&&(t.flags|=32),sd(e,t),Re(e,t,l,n),t.child;case 6:return e===null&&Sl(t),null;case 13:return cd(e,t,n);case 4:return vo(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Hn(t,null,r,n):Re(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:rt(r,i),Vs(e,t,r,i,n);case 7:return Re(e,t,t.pendingProps,n),t.child;case 8:return Re(e,t,t.pendingProps.children,n),t.child;case 12:return Re(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,a=t.memoizedProps,l=i.value,G(Hi,r._currentValue),r._currentValue=l,a!==null)if(st(a.value,l)){if(a.children===i.children&&!Le.current){t=Rt(e,t,n);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var s=a.dependencies;if(s!==null){l=a.child;for(var u=s.firstContext;u!==null;){if(u.context===r){if(a.tag===1){u=wt(-1,n&-n),u.tag=2;var c=a.updateQueue;if(c!==null){c=c.shared;var v=c.pending;v===null?u.next=u:(u.next=v.next,v.next=u),c.pending=u}}a.lanes|=n,u=a.alternate,u!==null&&(u.lanes|=n),Cl(a.return,n,t),s.lanes|=n;break}u=u.next}}else if(a.tag===10)l=a.type===t.type?null:a.child;else if(a.tag===18){if(l=a.return,l===null)throw Error(x(341));l.lanes|=n,s=l.alternate,s!==null&&(s.lanes|=n),Cl(l,n,t),l=a.sibling}else l=a.child;if(l!==null)l.return=a;else for(l=a;l!==null;){if(l===t){l=null;break}if(a=l.sibling,a!==null){a.return=l.return,l=a;break}l=l.return}a=l}Re(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,On(t,n),i=Ye(i),r=r(i),t.flags|=1,Re(e,t,r,n),t.child;case 14:return r=t.type,i=rt(r,t.pendingProps),i=rt(r.type,i),Gs(e,t,r,i,n);case 15:return ld(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:rt(r,i),wi(e,t),t.tag=1,Oe(r)?(e=!0,Ai(t)):e=!1,On(t,n),rd(t,r,i),El(t,r,i,n),Tl(null,t,r,!0,e,n);case 19:return dd(e,t,n);case 22:return od(e,t,n)}throw Error(x(156,t.tag))};function jd(e,t){return ec(e,t)}function yh(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ke(e,t,n,r){return new yh(e,t,n,r)}function zo(e){return e=e.prototype,!(!e||!e.isReactComponent)}function xh(e){if(typeof e=="function")return zo(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Yl)return 11;if(e===Xl)return 14}return 2}function Ut(e,t){var n=e.alternate;return n===null?(n=Ke(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ci(e,t,n,r,i,a){var l=2;if(r=e,typeof e=="function")zo(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case xn:return ln(n.children,i,a,t);case Zl:l=8,i|=8;break;case Za:return e=Ke(12,n,t,i|2),e.elementType=Za,e.lanes=a,e;case Ya:return e=Ke(13,n,t,i),e.elementType=Ya,e.lanes=a,e;case Xa:return e=Ke(19,n,t,i),e.elementType=Xa,e.lanes=a,e;case Iu:return ua(n,i,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Mu:l=10;break e;case Au:l=9;break e;case Yl:l=11;break e;case Xl:l=14;break e;case Pt:l=16,r=null;break e}throw Error(x(130,e==null?e:typeof e,""))}return t=Ke(l,n,t,i),t.elementType=e,t.type=r,t.lanes=a,t}function ln(e,t,n,r){return e=Ke(7,e,r,t),e.lanes=n,e}function ua(e,t,n,r){return e=Ke(22,e,r,t),e.elementType=Iu,e.lanes=n,e.stateNode={isHidden:!1},e}function $a(e,t,n){return e=Ke(6,e,null,t),e.lanes=n,e}function Ua(e,t,n){return t=Ke(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function wh(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ra(0),this.expirationTimes=Ra(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ra(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Lo(e,t,n,r,i,a,l,s,u){return e=new wh(e,t,n,s,u),t===1?(t=1,a===!0&&(t|=8)):t=0,a=Ke(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},go(a),e}function kh(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:yn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function Td(e){if(!e)return Gt;e=e._reactInternals;e:{if(hn(e)!==e||e.tag!==1)throw Error(x(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Oe(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(x(171))}if(e.tag===1){var n=e.type;if(Oe(n))return Tc(e,n,t)}return t}function bd(e,t,n,r,i,a,l,s,u){return e=Lo(n,r,!0,e,i,a,l,s,u),e.context=Td(null),n=e.current,r=Ee(),i=$t(n),a=wt(r,i),a.callback=t??null,Wt(n,a,i),e.current.lanes=i,Hr(e,i,r),Me(e,r),e}function ca(e,t,n,r){var i=t.current,a=Ee(),l=$t(i);return n=Td(n),t.context===null?t.context=n:t.pendingContext=n,t=wt(a,l),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Wt(i,t,l),e!==null&&(ot(e,i,l,a),vi(e,i,l)),l}function Zi(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function iu(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Oo(e,t){iu(e,t),(e=e.alternate)&&iu(e,t)}function Sh(){return null}var Pd=typeof reportError=="function"?reportError:function(e){console.error(e)};function Mo(e){this._internalRoot=e}da.prototype.render=Mo.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(x(409));ca(e,t,null,null)};da.prototype.unmount=Mo.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;pn(function(){ca(null,e,null,null)}),t[St]=null}};function da(e){this._internalRoot=e}da.prototype.unstable_scheduleHydration=function(e){if(e){var t=oc();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Lt.length&&t!==0&&t<Lt[n].priority;n++);Lt.splice(n,0,e),n===0&&uc(e)}};function Ao(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function pa(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function au(){}function Ch(e,t,n,r,i){if(i){if(typeof r=="function"){var a=r;r=function(){var c=Zi(l);a.call(c)}}var l=bd(t,r,e,0,null,!1,!1,"",au);return e._reactRootContainer=l,e[St]=l.current,br(e.nodeType===8?e.parentNode:e),pn(),l}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var s=r;r=function(){var c=Zi(u);s.call(c)}}var u=Lo(e,0,!1,null,null,!1,!1,"",au);return e._reactRootContainer=u,e[St]=u.current,br(e.nodeType===8?e.parentNode:e),pn(function(){ca(t,u,n,r)}),u}function fa(e,t,n,r,i){var a=n._reactRootContainer;if(a){var l=a;if(typeof i=="function"){var s=i;i=function(){var u=Zi(l);s.call(u)}}ca(t,l,e,i)}else l=Ch(n,t,e,i,r);return Zi(l)}ac=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=sr(t.pendingLanes);n!==0&&(eo(t,n|1),Me(t,ae()),!($&6)&&(Fn=ae()+500,Zt()))}break;case 13:pn(function(){var r=Ct(e,1);if(r!==null){var i=Ee();ot(r,e,1,i)}}),Oo(e,1)}};to=function(e){if(e.tag===13){var t=Ct(e,134217728);if(t!==null){var n=Ee();ot(t,e,134217728,n)}Oo(e,134217728)}};lc=function(e){if(e.tag===13){var t=$t(e),n=Ct(e,t);if(n!==null){var r=Ee();ot(n,e,t,r)}Oo(e,t)}};oc=function(){return V};sc=function(e,t){var n=V;try{return V=e,t()}finally{V=n}};ol=function(e,t,n){switch(t){case"input":if(el(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=ra(r);if(!i)throw Error(x(90));Hu(r),el(r,i)}}}break;case"textarea":Wu(e,n);break;case"select":t=n.value,t!=null&&Pn(e,!!n.multiple,t,!1)}};Ku=bo;Zu=pn;var Rh={usingClientEntryPoint:!1,Events:[Wr,Cn,ra,Gu,Qu,bo]},ar={findFiberByHostInstance:tn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Eh={bundleType:ar.bundleType,version:ar.version,rendererPackageName:ar.rendererPackageName,rendererConfig:ar.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Et.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ju(e),e===null?null:e.stateNode},findFiberByHostInstance:ar.findFiberByHostInstance||Sh,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var si=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!si.isDisabled&&si.supportsFiber)try{qi=si.inject(Eh),ft=si}catch{}}$e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Rh;$e.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ao(t))throw Error(x(200));return kh(e,t,null,n)};$e.createRoot=function(e,t){if(!Ao(e))throw Error(x(299));var n=!1,r="",i=Pd;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Lo(e,1,!1,null,null,n,!1,r,i),e[St]=t.current,br(e.nodeType===8?e.parentNode:e),new Mo(t)};$e.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(x(188)):(e=Object.keys(e).join(","),Error(x(268,e)));return e=Ju(t),e=e===null?null:e.stateNode,e};$e.flushSync=function(e){return pn(e)};$e.hydrate=function(e,t,n){if(!pa(t))throw Error(x(200));return fa(null,e,t,!0,n)};$e.hydrateRoot=function(e,t,n){if(!Ao(e))throw Error(x(405));var r=n!=null&&n.hydratedSources||null,i=!1,a="",l=Pd;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),t=bd(t,null,e,1,n??null,i,!1,a,l),e[St]=t.current,br(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new da(t)};$e.render=function(e,t,n){if(!pa(t))throw Error(x(200));return fa(null,e,t,!1,n)};$e.unmountComponentAtNode=function(e){if(!pa(e))throw Error(x(40));return e._reactRootContainer?(pn(function(){fa(null,null,e,!1,function(){e._reactRootContainer=null,e[St]=null})}),!0):!1};$e.unstable_batchedUpdates=bo;$e.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!pa(n))throw Error(x(200));if(e==null||e._reactInternals===void 0)throw Error(x(38));return fa(e,t,n,!1,r)};$e.version="18.3.1-next-f1338f8080-20240426";function _d(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(_d)}catch(e){console.error(e)}}_d(),_u.exports=$e;var Nh=_u.exports,zd,lu=Nh;zd=lu.createRoot,lu.hydrateRoot;const jh={farnorth:{assets:2772994e3,liabilities:170582e3},whangarei:{assets:2805602e3,liabilities:319828e3},kaipara:{assets:119162e4,liabilities:78192e3},auckland:{assets:50282e6,liabilities:15875e6},thames:{assets:2251411e3,liabilities:114362e3},hauraki:{assets:876534e3,liabilities:116639e3},waikatod:{assets:277677e4,liabilities:26586e4},matamata:{assets:1041981e3,liabilities:83777e3},hamilton:{assets:6765782e3,liabilities:1205658e3},waipa:{assets:2681642e3,liabilities:351743e3},otorohanga:{assets:427986e3,liabilities:16939e3},swaikato:{assets:640662e3,liabilities:55897e3},waitomo:{assets:711273e3,liabilities:41767e3},taupo:{assets:2156498e3,liabilities:231909e3},wbop:{assets:1949343e3,liabilities:156204e3},tauranga:{assets:7820214e3,liabilities:1326499e3},rotorua:{assets:2256862e3,liabilities:499291e3},whakatane:{assets:1386004e3,liabilities:185537e3},kawerau:{assets:119505e3,liabilities:17144e3},opotiki:{assets:346857e3,liabilities:14136e3},gisborne:{assets:2976707e3,liabilities:261524e3},wairoa:{assets:535881e3,liabilities:33816e3},hastings:{assets:3381175e3,liabilities:476045e3},napier:{assets:2486523e3,liabilities:53894e3},chb:{assets:1102638e3,liabilities:65202e3},newplymouth:{assets:4022419e3,liabilities:397623e3},stratford:{assets:534717e3,liabilities:40882e3},staranaki:{assets:1470603e3,liabilities:169038e3},ruapehu:{assets:602412e3,liabilities:66191e3},whanganui:{assets:1553606e3,liabilities:205418e3},rangitikei:{assets:806154e3,liabilities:50614e3},manawatu:{assets:1215994e3,liabilities:111905e3},palmy:{assets:2365474e3,liabilities:31689e4},tararua:{assets:121946e4,liabilities:89777e3},horowhenua:{assets:1033043e3,liabilities:232128e3},kapiti:{assets:2416162e3,liabilities:365885e3},porirua:{assets:2344336e3,liabilities:328848e3},upperhutt:{assets:163487e4,liabilities:197141e3},hutt:{assets:3611816e3,liabilities:572291e3},wellington:{assets:12209905e3,liabilities:1873122e3},masterton:{assets:1175577e3,liabilities:77664e3},carterton:{assets:299872e3,liabilities:29881e3},swairarapa:{assets:654281e3,liabilities:33286e3},tasman:{assets:2727241e3,liabilities:408821e3},nelson:{assets:2540685e3,liabilities:306147e3},marlborough:{assets:2483564e3,liabilities:247217e3},buller:{assets:582093e3,liabilities:56005e3},grey:{assets:588317e3,liabilities:42577e3},westland:{assets:572055e3,liabilities:45428e3},kaikoura:{assets:317772e3,liabilities:17237e3},hurunui:{assets:768794e3,liabilities:80928e3},waimakariri:{assets:2855612e3,liabilities:229403e3},christchurch:{assets:20836748e3,liabilities:2784881e3},selwyn:{assets:306173e4,liabilities:237098e3},ashburton:{assets:1124563e3,liabilities:14612e4},timaru:{assets:2030128e3,liabilities:25832e4},mackenzie:{assets:425457e3,liabilities:27918e3},waimate:{assets:54066e4,liabilities:9951e3},waitaki:{assets:1324561e3,liabilities:85607e3},centralotago:{assets:1200485e3,liabilities:45737e3},qldc:{assets:3222826e3,liabilities:711214e3},dunedin:{assets:5025332e3,liabilities:676562e3},clutha:{assets:1941673e3,liabilities:138475e3},southlandd:{assets:2309842e3,liabilities:63687e3},gore:{assets:552716e3,liabilities:59688e3},invercargill:{assets:137663e4,liabilities:173594e3},chathams:{assets:101744e3,liabilities:3236e3}},ou=e=>Number.isFinite(e==null?void 0:e.assets24)&&Number.isFinite(e==null?void 0:e.liabilities24)&&Number.isFinite(e==null?void 0:e.pop)&&e.pop>0;function Th(e){const t=e.filter(ou);if(t.length<2||t.length!==e.length)return{mergedPerResident:null,totalAssets:null,totalLiabilities:null,totalNetAssets:null,rows:[],missing:e.filter(u=>!ou(u))};const n=t.reduce((u,c)=>u+c.pop,0),r=t.reduce((u,c)=>u+c.assets24,0),i=t.reduce((u,c)=>u+c.liabilities24,0),a=r-i,l=a/n,s=t.map(u=>{const c=(u.assets24-u.liabilities24)/u.pop;return{council:u,before:c,after:l,change:l-c}}).sort((u,c)=>c.change-u.change);return{mergedPerResident:l,totalAssets:r,totalLiabilities:i,totalNetAssets:a,rows:s,missing:[]}}const bh=new Set(["facebook","linkedin","x","reddit"]),le=Object.freeze({viewedHomepageVariantA:"homepage-variant-a-viewed",viewedHomepageVariantB:"homepage-variant-b-viewed",startedAmalgamation:"journey-started-amalgamation",selectedFirstCouncil:"journey-selected-first-council",addedAnotherCouncil:"journey-added-another-council",viewedCalculatedResult:"journey-viewed-calculated-result",completedScenario:"journey-completed-scenario",changedAssumptions:"journey-changed-assumptions",sharedResult:"journey-shared-result",copiedOrDownloadedResult:"journey-copied-or-downloaded-result",openedExplanatoryMaterial:"journey-opened-explanatory-material"}),Ph=new Set(Object.values(le));function ui(e,t){if(!bh.has(t))throw new Error(`Unsupported social platform: ${t}`);const n=new URL(e);return n.searchParams.set("utm_source",t),n.searchParams.set("utm_medium","social"),n.searchParams.set("utm_campaign","result_share"),n.searchParams.set("utm_content","share_icon"),n.toString()}function cr(e,t){var n;return typeof window>"u"||typeof((n=window.umami)==null?void 0:n.track)!="function"?!1:(t===void 0?window.umami.track(e):window.umami.track(e,t),!0)}function he(e){if(!Ph.has(e))throw new Error(`Unsupported journey event: ${e}`);return cr(e)}const _h=15e3,zh=4,Lh=(e,t=1)=>Math.max(zh,Math.floor(Math.max(0,e)/_h),Math.max(0,t)),Oh=e=>e.map(({member:t,seats:n})=>{const r=Lh(t.pop,n);return{member:t,totalMembers:r,unitarySeats:n,communityOnlySeats:r-n}}),Mh={farnorth:10,whangarei:13,kaipara:8,auckland:20,thames:10,hauraki:13,waikatod:13,matamata:12,hamilton:14,waipa:11,otorohanga:9,swaikato:10,waitomo:6,taupo:12,wbop:9,tauranga:9,rotorua:10,whakatane:10,kawerau:8,opotiki:7,gisborne:13,wairoa:6,hastings:15,napier:11,chb:9,newplymouth:14,stratford:11,staranaki:13,ruapehu:9,whanganui:12,rangitikei:11,manawatu:11,palmy:15,tararua:9,horowhenua:12,kapiti:10,porirua:10,upperhutt:10,hutt:13,wellington:15,masterton:8,carterton:8,swairarapa:10,tasman:14,nelson:12,marlborough:14,buller:10,grey:8,westland:8,kaikoura:7,hurunui:10,waimakariri:10,christchurch:16,selwyn:10,ashburton:9,timaru:9,mackenzie:7,waimate:8,waitaki:10,centralotago:10,qldc:11,dunedin:14,clutha:9,southlandd:12,gore:11,invercargill:12,chathams:8},su={Northland:{name:"Northland Regional Council",seats:9},Waikato:{name:"Waikato Regional Council",seats:14},"Bay of Plenty":{name:"Bay of Plenty Regional Council",seats:14},"Hawke's Bay":{name:"Hawke's Bay Regional Council",seats:11},Taranaki:{name:"Taranaki Regional Council",seats:11},"Manawatū-Whanganui":{name:"Manawatū-Whanganui Regional Council",seats:14},Wellington:{name:"Greater Wellington Regional Council",seats:14},"West Coast":{name:"West Coast Regional Council",seats:7},Canterbury:{name:"Canterbury Regional Council",seats:14},Otago:{name:"Otago Regional Council",seats:12},Southland:{name:"Southland Regional Council",seats:12}},Je=[{id:"farnorth",name:"Far North",region:"Northland",pop:73500,area:6687,r24:103039e3,r26:122142e3},{id:"whangarei",name:"Whangārei",region:"Northland",pop:100500,area:2711,r24:127432e3,r26:162152e3},{id:"kaipara",name:"Kaipara",region:"Northland",pop:26800,area:3109,r24:45682e3,r26:55604e3},{id:"auckland",name:"Auckland",region:"Auckland",pop:1797300,area:4940,r24:2523e6,r26:3035235e3,locked:!0},{id:"thames",name:"Thames-Coromandel",region:"Waikato",pop:32400,area:2208,r24:94354e3,r26:117517e3},{id:"hauraki",name:"Hauraki",region:"Waikato",pop:21900,area:1270,r24:39359e3,r26:5194e4},{id:"waikatod",name:"Waikato District",region:"Waikato",pop:90600,area:4404,r24:130394e3,r26:156832e3},{id:"matamata",name:"Matamata-Piako",region:"Waikato",pop:39100,area:1755,r24:50741e3,r26:62249e3},{id:"hamilton",name:"Hamilton City",region:"Waikato",pop:189700,area:110,r24:255719e3,r26:353949e3},{id:"waipa",name:"Waipā",region:"Waikato",pop:61400,area:1470,r24:81073e3,r26:114179e3},{id:"otorohanga",name:"Ōtorohanga",region:"Waikato",pop:10750,area:1999,r24:15714e3,r26:19161e3},{id:"swaikato",name:"South Waikato",region:"Waikato",pop:25900,area:1819,r24:39895e3,r26:47649e3},{id:"waitomo",name:"Waitomo",region:"Waikato",pop:9950,area:3535,r24:22502e3,r26:25738e3},{id:"taupo",name:"Taupō",region:"Waikato",pop:42200,area:6333,r24:92833e3,r26:118089e3},{id:"wbop",name:"Western Bay of Plenty",region:"Bay of Plenty",pop:60800,area:1944,r24:89024e3,r26:113112e3},{id:"tauranga",name:"Tauranga City",region:"Bay of Plenty",pop:161300,area:142,r24:295016e3,r26:367996e3},{id:"rotorua",name:"Rotorua Lakes",region:"Bay of Plenty",pop:77100,area:2409,r24:128139e3,r26:159928e3},{id:"whakatane",name:"Whakatāne",region:"Bay of Plenty",pop:38300,area:4444,r24:59049e3,r26:79144e3},{id:"kawerau",name:"Kawerau",region:"Bay of Plenty",pop:7670,area:29,r24:13057847,r26:15811e3},{id:"opotiki",name:"Ōpōtiki",region:"Bay of Plenty",pop:10300,area:3090,r24:14814e3,r26:17218e3},{id:"gisborne",name:"Gisborne",region:"Gisborne",pop:53e3,area:8385,r24:76965e3,r26:94904e3},{id:"wairoa",name:"Wairoa",region:"Hawke's Bay",pop:8920,area:4079,r24:19141e3,r26:23437e3},{id:"hastings",name:"Hastings",region:"Hawke's Bay",pop:89200,area:5227,r24:112761e3,r26:155043e3},{id:"napier",name:"Napier City",region:"Hawke's Bay",pop:66800,area:105,r24:85724e3,r26:11189e4},{id:"chb",name:"Central Hawke's Bay",region:"Hawke's Bay",pop:16050,area:3333,r24:27622e3,r26:36067e3},{id:"newplymouth",name:"New Plymouth",region:"Taranaki",pop:90300,area:2205,r24:132257e3,r26:1623e5},{id:"stratford",name:"Stratford",region:"Taranaki",pop:10400,area:2163,r24:16219e3,r26:19938e3},{id:"staranaki",name:"South Taranaki",region:"Taranaki",pop:29900,area:3575,r24:48312e3,r26:57414e3},{id:"ruapehu",name:"Ruapehu",region:"Manawatū-Whanganui",pop:13550,area:6734,r24:28731e3,r26:34373e3},{id:"whanganui",name:"Whanganui",region:"Manawatū-Whanganui",pop:48900,area:2373,r24:76562e3,r26:88001e3},{id:"rangitikei",name:"Rangitīkei",region:"Manawatū-Whanganui",pop:16200,area:4484,r24:2889e4,r26:35573e3},{id:"manawatu",name:"Manawatū",region:"Manawatū-Whanganui",pop:33700,area:2567,r24:47102e3,r26:54555e3},{id:"palmy",name:"Palmerston North",region:"Manawatū-Whanganui",pop:91300,area:395,r24:124714e3,r26:1459e5},{id:"tararua",name:"Tararua",region:"Manawatū-Whanganui",pop:19050,area:4365,r24:33761e3,r26:41504e3},{id:"horowhenua",name:"Horowhenua",region:"Manawatū-Whanganui",pop:38200,area:1064,r24:52533e3,r26:68694e3},{id:"kapiti",name:"Kāpiti Coast",region:"Wellington",pop:57700,area:732,r24:87643e3,r26:114024e3},{id:"porirua",name:"Porirua City",region:"Wellington",pop:61800,area:175,r24:96417e3,r26:122653e3},{id:"upperhutt",name:"Upper Hutt City",region:"Wellington",pop:47500,area:540,r24:53506e3,r26:75739e3},{id:"hutt",name:"Hutt City",region:"Wellington",pop:113400,area:376,r24:156488e3,r26:208411e3},{id:"wellington",name:"Wellington City",region:"Wellington",pop:209900,area:290,r24:483252e3,r26:628974e3},{id:"masterton",name:"Masterton",region:"Wellington",pop:28700,area:2300,r24:41025706,r26:49663e3},{id:"carterton",name:"Carterton",region:"Wellington",pop:10300,area:1180,r24:17755e3,r26:20641e3},{id:"swairarapa",name:"South Wairarapa",region:"Wellington",pop:12250,area:2388,r24:25966e3,r26:31027e3},{id:"tasman",name:"Tasman",region:"Nelson-Tasman",pop:59800,area:9616,r24:100049e3,r26:121655e3},{id:"nelson",name:"Nelson City",region:"Nelson-Tasman",pop:54400,area:422,r24:84741e3,r26:10606e4},{id:"marlborough",name:"Marlborough",region:"Marlborough",pop:51600,area:10458,r24:88218e3,r26:109456e3},{id:"buller",name:"Buller",region:"West Coast",pop:10600,area:7943,r24:1636e4,r26:23195e3,r24note:"2023/24 actual unavailable; 2021/22 shown"},{id:"grey",name:"Grey District",region:"West Coast",pop:14400,area:3474,r24:21483e3,r26:29361e3},{id:"westland",name:"Westland",region:"West Coast",pop:9270,area:11829,r24:18891e3,r26:25984e3},{id:"kaikoura",name:"Kaikōura",region:"Canterbury",pop:4380,area:2049,r24:9625e3,r26:1173e4},{id:"hurunui",name:"Hurunui",region:"Canterbury",pop:14200,area:8641,r24:29127e3,r26:34355e3},{id:"waimakariri",name:"Waimakariri",region:"Canterbury",pop:69e3,area:2217,r24:88031e3,r26:106942e3},{id:"christchurch",name:"Christchurch City",region:"Canterbury",pop:412e3,area:1415,r24:68703e4,r26:836698e3},{id:"selwyn",name:"Selwyn",region:"Canterbury",pop:85200,area:6381,r24:96104e3,r26:135673e3},{id:"ashburton",name:"Ashburton",region:"Canterbury",pop:36800,area:6181,r24:48462e3,r26:56303e3},{id:"timaru",name:"Timaru",region:"Canterbury",pop:49500,area:2732,r24:72809e3,r26:9194e4},{id:"mackenzie",name:"Mackenzie",region:"Canterbury",pop:5500,area:7139,r24:16074e3,r26:20242e3},{id:"waimate",name:"Waimate",region:"Canterbury",pop:8500,area:3554,r24:141e5,r26:17479e3},{id:"waitaki",name:"Waitaki",region:"Otago",pop:24300,area:7108,r24:4128e4,r26:51064e3},{id:"centralotago",name:"Central Otago",region:"Otago",pop:25500,area:9933,r24:43992e3,r26:60106e3},{id:"qldc",name:"Queenstown-Lakes",region:"Otago",pop:52900,area:8719,r24:123066e3,r26:175548e3},{id:"dunedin",name:"Dunedin City",region:"Otago",pop:131800,area:3286,r24:203946e3,r26:264596e3},{id:"clutha",name:"Clutha",region:"Otago",pop:18700,area:6335,r24:30706e3,r26:41716e3},{id:"southlandd",name:"Southland District",region:"Southland",pop:33300,area:29586,r24:63282e3,r26:77151e3},{id:"gore",name:"Gore",region:"Southland",pop:13e3,area:1254,r24:22341e3,r26:29553e3},{id:"invercargill",name:"Invercargill City",region:"Southland",pop:57600,area:390,r24:71292e3,r26:85019e3},{id:"chathams",name:"Chatham Islands",region:"Chatham Islands",pop:610,area:795,r24:787e3,r26:873e3}],Ah=e=>{const t=new Map;return e.forEach(n=>{if(!su[n.region])return;const r=t.get(n.region)||[];r.push(n),t.set(n.region,r)}),[...t.entries()].map(([n,r])=>{const i=su[n],a=Je.filter(g=>g.region===n&&!g.locked),l=r.reduce((g,m)=>g+m.pop,0),s=a.reduce((g,m)=>g+m.pop,0),u=s?l/s:0,c=r.length===a.length,v=c?i.seats:Math.max(1,Math.min(i.seats,Math.round(i.seats*u)));return{...i,region:n,overlappingSeats:v,populationShare:u,wholeRegion:c}})},Ih=(e,t)=>{const n=Math.max(6,t);return Math.max(n,Math.min(20,Math.round(e/25e3)))},Bh=(e,t)=>{const n=Math.max(6,t),r=[];return[e-2,e,e+2,e+4].forEach(i=>{const a=Math.max(n,i);r.includes(a)||r.push(a)}),r.slice(0,3)},Hh=(e,t)=>{if(!e.length)return[];const n=Math.min(t,e.length),r=Math.max(0,t-n),i=e.reduce((s,u)=>s+u.pop,0),a=e.map((s,u)=>{const c=i?s.pop/i*r:0;return{member:s,index:u,seats:u<n?1+Math.floor(c):0,remainder:c-Math.floor(c)}});let l=a.reduce((s,u)=>s+u.seats,0);return[...a].sort((s,u)=>u.remainder-s.remainder||u.member.pop-s.member.pop).forEach(s=>{l<t&&(a[s.index].seats+=1,l+=1)}),a},Dh={farnorth:{hh:32538,avgRes:3276.19},whangarei:{hh:41319,avgRes:3112.65},kaipara:{hh:13368,avgRes:3181},auckland:{hh:609774,avgRes:3520},thames:{hh:26829,avgRes:4266.86},hauraki:{hh:9729,avgRes:3753.94},waikatod:{hh:31869,avgRes:4409.74},matamata:{hh:15162,avgRes:3346.08},hamilton:{hh:65403,avgRes:3620},waipa:{hh:23379,avgRes:3895.81},otorohanga:{hh:4416,avgRes:2554.36},swaikato:{hh:9912,avgRes:3736.34},waitomo:{hh:4407,avgRes:3621.96},taupo:{hh:22044,avgRes:4090},wbop:{hh:23895,avgRes:null},tauranga:{hh:61587,avgRes:4534.04},rotorua:{hh:29658,avgRes:4031.59},whakatane:{hh:14928,avgRes:4508},kawerau:{hh:2823,avgRes:3130.37},opotiki:{hh:4713,avgRes:3163.49},gisborne:{hh:19314,avgRes:3786},wairoa:{hh:4260,avgRes:3420.97},hastings:{hh:32614,avgRes:4368},napier:{hh:26739,avgRes:3558.83},chb:{hh:6867,avgRes:3697},newplymouth:{hh:36060,avgRes:3663.87},stratford:{hh:4302,avgRes:3664.37},staranaki:{hh:12378,avgRes:2975.71},ruapehu:{hh:7602,avgRes:4001.78},whanganui:{hh:20544,avgRes:3861.48},rangitikei:{hh:6960,avgRes:3440},manawatu:{hh:13139,avgRes:3791.48},palmy:{hh:33987,avgRes:3648},tararua:{hh:8190,avgRes:3738},horowhenua:{hh:17109,avgRes:4402},kapiti:{hh:26208,avgRes:4357},porirua:{hh:20580,avgRes:5591},upperhutt:{hh:17850,avgRes:3392.95},hutt:{hh:42348,avgRes:4004.47},wellington:{hh:84678,avgRes:5093.73},masterton:{hh:12453,avgRes:3378},carterton:{hh:4626,avgRes:4770.53},swairarapa:{hh:6258,avgRes:4494},tasman:{hh:25755,avgRes:4240.68},nelson:{hh:22626,avgRes:4650},marlborough:{hh:24324,avgRes:3828},buller:{hh:6054,avgRes:3089.61},grey:{hh:6888,avgRes:2702.89},westland:{hh:5007,avgRes:null},kaikoura:{hh:2466,avgRes:4019.42},hurunui:{hh:7353,avgRes:3041.77},waimakariri:{hh:27375,avgRes:3940},christchurch:{hh:166029,avgRes:3923.1},selwyn:{hh:30075,avgRes:4306.71},ashburton:{hh:15343,avgRes:3142.7},timaru:{hh:21429,avgRes:3380.63},mackenzie:{hh:4134,avgRes:3311.32},waimate:{hh:3957,avgRes:2901.21},waitaki:{hh:12051,avgRes:null},centralotago:{hh:12441,avgRes:3743.03},qldc:{hh:25101,avgRes:4848.32},dunedin:{hh:54198,avgRes:3532},clutha:{hh:8841,avgRes:2677.74},southlandd:{hh:16344,avgRes:2995.65},gore:{hh:5781,avgRes:3711.93},invercargill:{hh:23922,avgRes:2894},chathams:{hh:270,avgRes:null,est:!0}},Wh={farnorth:{ru:40045},whangarei:{ru:46203,ruStatus:"older"},kaipara:{ru:16936},auckland:{ru:63e4,ruStatus:"proxy"},thames:{ru:28650},hauraki:{ru:11960},waikatod:{ru:37739},matamata:{ru:16660},hamilton:{ru:65076},waipa:{ru:25609},otorohanga:{ru:5619},swaikato:{ru:10440},waitomo:{ru:5955},taupo:{ru:25628},wbop:{ru:24970},tauranga:{ru:62101},rotorua:{ru:31254},whakatane:{ru:17166},kawerau:{ru:3006,ruStatus:"older"},opotiki:{ru:5599,ruStatus:"projected"},gisborne:{ru:23847,ruStatus:"older"},wairoa:{ru:6958,ruStatus:"projected"},hastings:{ru:32575,ruStatus:"projected"},napier:{ru:26857,ruStatus:"proxy"},chb:{ru:8395,ruStatus:"proxy"},newplymouth:{ru:38466},stratford:{ru:5469},staranaki:{ru:14806},ruapehu:{ru:10196},whanganui:{ru:21801,ruStatus:"projected"},rangitikei:{ru:8884},manawatu:{ru:15580},palmy:{ru:34932},tararua:{ru:10451,ruStatus:"draft"},horowhenua:{ru:19649},kapiti:{ru:26195},porirua:{ru:20139},upperhutt:{ru:18129},hutt:{ru:42916},wellington:{ru:82547},masterton:{ru:13822},carterton:{ru:5331},swairarapa:{ru:7546},tasman:{ru:28036,ruStatus:"draft"},nelson:{ru:23237},marlborough:{ru:27497},buller:{ru:7570,ruStatus:"older"},grey:{ru:9234},westland:{ru:6685,ruStatus:"projected"},kaikoura:{ru:3340},hurunui:{ru:10271},waimakariri:{ru:29013},christchurch:{ru:181698},selwyn:{ru:35398},ashburton:{ru:16367},timaru:{ru:23390},mackenzie:{ru:5539},waimate:{ru:4347,ruStatus:"proxy"},waitaki:{ru:14007},centralotago:{ru:15310},qldc:{ru:33823},dunedin:{ru:57553},clutha:{ru:11371},southlandd:{ru:20993},gore:{ru:6743},invercargill:{ru:27310},chathams:{ru:null}};Je.forEach(e=>{const t=Dh[e.id];t&&(e.hh=t.hh,e.avgRes=t.avgRes,e.hhEst=!!t.est);const n=Wh[e.id];n&&(e.ru=n.ru,e.ruStatus=n.ruStatus||null);const r=jh[e.id];r&&(e.assets24=r.assets,e.liabilities24=r.liabilities)});const Be=Object.fromEntries(Je.map(e=>[e.id,e])),Io=["Northland","Auckland","Waikato","Bay of Plenty","Gisborne","Hawke's Bay","Taranaki","Manawatū-Whanganui","Wellington"],Bo=["Nelson-Tasman","Marlborough","West Coast","Canterbury","Otago","Southland","Chatham Islands"],on=["#E4572E","#17BEBB","#FFC914","#76B041","#A26DC2","#3D6FB6","#EF7BAE","#B0413E","#F18F01","#2E933C","#6B4E71","#0FA3B1","#D1495B","#4C9F70","#8D6A9F","#EDAE49"],Fh={Northland:["Auckland"],Auckland:["Northland","Waikato"],Waikato:["Auckland","Bay of Plenty","Manawatū-Whanganui","Taranaki"],"Bay of Plenty":["Waikato","Gisborne","Hawke's Bay","Manawatū-Whanganui"],Gisborne:["Bay of Plenty","Hawke's Bay"],"Hawke's Bay":["Gisborne","Bay of Plenty","Manawatū-Whanganui","Wellington"],Taranaki:["Waikato","Manawatū-Whanganui"],"Manawatū-Whanganui":["Taranaki","Waikato","Bay of Plenty","Hawke's Bay","Wellington"],Wellington:["Manawatū-Whanganui","Hawke's Bay"],"Nelson-Tasman":["Marlborough","West Coast"],Marlborough:["Nelson-Tasman","West Coast","Canterbury"],"West Coast":["Nelson-Tasman","Marlborough","Canterbury","Otago"],Canterbury:["Marlborough","West Coast","Otago"],Otago:["Canterbury","West Coast","Southland"],Southland:["Otago"],"Chatham Islands":[]},$h=[{a:"kapiti",b:"horowhenua",label:"Kāpiti's northern option with Horowhenua"},{a:"tararua",b:"masterton",label:"Tararua's 'go south' option toward Wairarapa"},{a:"ruapehu",b:"taupo",label:"northern Ruapehu's Taupō option"}],I={PREFERRED:"preferred",NOT_SUBMITTING:"not-submitting",NON_CONFORMING:"non-conforming",NO_RESOLUTION:"no-resolution"},Uh={[I.PREFERRED]:"Resolved preferred option",[I.NOT_SUBMITTING]:"Resolved not to submit",[I.NON_CONFORMING]:"Resolved non-conforming proposal",[I.NO_RESOLUTION]:"No preferred-option resolution"},Yi={farnorth:{category:I.PREFERRED,note:"Resolved on a Far North unitary-authority option."},whangarei:{category:I.PREFERRED,note:"Resolved on a preferred option with Kaipara. Kaipara has not agreed and resolved not to submit."},kaipara:{category:I.NOT_SUBMITTING,note:"Resolved not to submit a Head Start proposal and does not support Whangārei District Council's preferred pairing with Kaipara."},thames:{category:I.NO_RESOLUTION,note:"No resolution on a preferred option as at 3 August. Community feedback had favoured an East Waikato option; a final decision was due on 6 August."},hauraki:"Consulted its community and is named in Thames-Coromandel's preferred East Waikato option, but no shared and mutually resolved grouping is reported.",matamata:"Completed community consultation and is named in Thames-Coromandel's preferred East Waikato option, but no shared and mutually resolved grouping is reported.",tauranga:"A resident survey supported council-led reform and a larger Bay of Plenty council if it delivered efficiencies; Western Bay of Plenty was the preferred partner. No configuration has been selected.",wbop:"Is investigating two Head Start merger scenarios and has not selected a final configuration.",swaikato:{category:I.PREFERRED,note:"Resolved on a preferred option with Hamilton, Waitomo, Ōtorohanga and Taupō. Being named does not establish those councils' agreement; Taupō resolved not to submit."},rotorua:{category:I.PREFERRED,note:"Resolved on a Rotorua unitary-authority option."},napier:{category:I.PREFERRED,note:"Resolved on a preferred option with Hastings and Central Hawke's Bay."},hastings:{category:I.PREFERRED,note:"Resolved on a preferred option with Napier and Central Hawke's Bay."},chb:{category:I.PREFERRED,note:"Resolved on a preferred option with Napier and Hastings."},wairoa:{category:I.NOT_SUBMITTING,note:"Resolved not to participate in the Head Start process."},newplymouth:{category:I.NO_RESOLUTION,note:"The 3 August map records no resolution on a preferred Head Start option."},taupo:{category:I.NOT_SUBMITTING,note:"Resolved not to submit a Head Start proposal."},ruapehu:{category:I.NOT_SUBMITTING,note:"Resolved not to submit a Head Start proposal."},manawatu:{category:I.NOT_SUBMITTING,note:"Resolved not to submit a Head Start proposal under the present circumstances."},buller:{category:I.NOT_SUBMITTING,note:"Resolved not to submit a Head Start proposal. Grey and Westland nevertheless identify Buller in their preferred West Coast option."},tararua:{category:I.NOT_SUBMITTING,note:"Resolved not to submit a Head Start proposal."},stratford:{category:I.PREFERRED,note:"Resolved on a preferred option with South Taranaki."},staranaki:{category:I.PREFERRED,note:"Resolved on a preferred option with Stratford."},grey:{category:I.PREFERRED,note:"Resolved on a preferred West Coast option with Westland and Buller. Buller resolved not to submit."},westland:{category:I.PREFERRED,note:"Resolved on a preferred West Coast option with Grey and Buller. Buller resolved not to submit."},ashburton:"Is named in Selwyn's shortlisted two-council option, but no separate Ashburton decision or shared grouping is reported.",hurunui:"Is named in North Canterbury and possible Greater Christchurch options. Waimakariri reported working with Hurunui and Kaikōura, but no shared grouping is settled.",waimakariri:"Community feedback favoured a North Canterbury authority with Hurunui and potentially Kaikōura (54.5%). A council decision was due on 4 August.",christchurch:"Received more than 7,000 community responses and is developing its position. It is also named in Selwyn's possible Greater Christchurch option.",selwyn:{category:I.PREFERRED,note:"Resolved on a Selwyn unitary-authority option."},kaikoura:{category:I.PREFERRED,note:"Resolved on a preferred unitary-authority option with Marlborough; Marlborough had no preferred-option resolution in the snapshot."},waimate:{category:I.PREFERRED,note:"Resolved on an Aoraki option with Waitaki, Mackenzie, Timaru and Ashburton; Ashburton had no preferred-option resolution."},waitaki:{category:I.PREFERRED,note:"Resolved on an Aoraki option with Waimate, Mackenzie, Timaru and Ashburton; Ashburton had no preferred-option resolution."},mackenzie:{category:I.PREFERRED,note:"Resolved on an Aoraki option with Waitaki, Waimate, Timaru and Ashburton; Ashburton had no preferred-option resolution."},timaru:{category:I.PREFERRED,note:"Resolved on an Aoraki option with Waitaki, Waimate, Mackenzie and Ashburton; Ashburton had no preferred-option resolution."},qldc:{category:I.PREFERRED,note:"Resolved on an Inland Otago option with Central Otago and Clutha."},centralotago:{category:I.PREFERRED,note:"Resolved on an Inland Otago option with Clutha and Queenstown Lakes."},clutha:{category:I.PREFERRED,note:"Resolved on an Inland Otago option with Central Otago and Queenstown Lakes."},dunedin:{category:I.PREFERRED,note:"Resolved on an option with Clutha and potentially Waitaki; those councils do not reciprocate this exact option."},rangitikei:{category:I.NON_CONFORMING,note:"Resolved to submit a non-conforming proposal."},palmy:{category:I.NO_RESOLUTION,note:"No resolution on a preferred option as at 3 August; a decision was due on 5 August."},whanganui:"Engaging neighbours; its mayor says the Horizons councils won't have an agreed proposal by 9 August.",wellington:{category:I.NO_RESOLUTION,note:"No preferred-option resolution is recorded in the 3 August map. Wellington was developing a metropolitan proposal with Hutt and Porirua that includes Upper Hutt."},hutt:{category:I.NO_RESOLUTION,note:"No preferred-option resolution is recorded in the 3 August map. Hutt was participating in the metropolitan proposal, with a council decision scheduled after the snapshot."},porirua:{category:I.NO_RESOLUTION,note:"No preferred-option resolution is recorded in the 3 August map. Porirua was participating in the metropolitan proposal."},upperhutt:{category:I.NO_RESOLUTION,note:"No preferred-option resolution is recorded in the 3 August map. The developing metropolitan proposal includes Upper Hutt, but inclusion does not indicate Upper Hutt's agreement."},kapiti:"No decision has been made. In its community survey, a standalone Kāpiti authority was the first preference (43%) and Kāpiti with Horowhenua was the second preference (36.2%).",horowhenua:"In discussions with Kāpiti, where a Kāpiti-Horowhenua authority was the second preference in Kāpiti's community survey. No joint proposal has been agreed.",nelson:"Supports amalgamation with Tasman District Council, but there is no joint Nelson-Tasman position.",tasman:"Remains opposed to amalgamating with Nelson. No joint Nelson-Tasman proposal has been agreed."};Object.entries(Yi).forEach(([e,t])=>{typeof t=="string"&&(Yi[e]={category:I.NO_RESOLUTION,note:t})});const Vh=Object.fromEntries(Object.entries(Yi).map(([e,t])=>[e,t.note])),Gh=[...Io,...Bo].map(e=>({region:e,councils:Object.entries(Yi).map(([t,n])=>({council:Be[t],status:n.note,category:n.category})).filter(({council:t})=>(t==null?void 0:t.region)===e)})).filter(({councils:e})=>e.length),uu={};Je.forEach(e=>{e.locked||(uu[e.region]=(uu[e.region]||0)+e.pop)});const cu=Object.fromEntries(Je.map((e,t)=>[e.id,t])),Qh={person:"p",household:"h",unit:"u",bill:"b"},Kh={p:"person",h:"unit",u:"unit",b:"bill"},Zh=e=>e.toString(36).padStart(2,"0");function Yh(e,t,n,r){const i={};e.forEach(l=>i[l.id]=[]),Object.entries(t).forEach(([l,s])=>{i[s]&&cu[l]!=null&&i[s].push(cu[l])});const a=e.filter(l=>i[l.id].length).map(l=>{const s=on.indexOf(l.color),u=i[l.id].sort((c,v)=>c-v).map(Zh).join("");return`${encodeURIComponent(l.name)}:${(s<0?0:s).toString(36)}:${u}`});return a.length?`1${Qh[n]}6~${a.join("~")}`:null}function Xh(e){try{const t=String(e).split("~"),n=t.shift();if(!n||n[0]!=="1"||!t.length)return null;const r=Kh[n[1]]||"person",i=n[2]==="4"?"r24":"r26",a=[],l={};return t.forEach((s,u)=>{const c=s.split(":");if(c.length<3)return;const v="sg"+u,g=decodeURIComponent(c[0]).slice(0,60)||`Council ${u+1}`,m=on[parseInt(c[1],36)]||on[u%on.length],w=c[2],C=[];for(let S=0;S+1<w.length+1;S+=2){const B=w.slice(S,S+2);if(B.length<2)break;const p=Je[parseInt(B,36)];p&&l[p.id]==null&&(l[p.id]=v,C.push(p.id))}C.length&&a.push({id:v,name:g,color:m})}),a.length?{groups:a,assignment:l,basis:r,year:i}:null}catch{return null}}const Xi=e=>e>=999500?(e/1e6).toFixed(2).replace(/0$/,"")+"m":e>=1e3?Math.round(e/1e3)+"k":String(Math.round(e)),ge=e=>e==null||!isFinite(e)?"—":"$"+Math.round(e).toLocaleString("en-NZ"),Jh=[{name:"Megatron",anchor:"hamilton",ids:["thames","hauraki","waikatod","matamata","waipa","otorohanga","swaikato","waitomo","taupo"],need:3},{name:"Hamiltron",anchor:"hamilton",ids:["waikatod","waipa","matamata","hauraki"],need:1},{name:"Greater Tron",anchor:"hamilton",ids:["waikatod","waipa","otorohanga","swaikato","waitomo","taupo","thames","hauraki","matamata"],need:2},{name:"Kiwiana Country",ids:["otorohanga","waitomo"],need:2},{name:"Glowworm District",ids:["otorohanga","waitomo","swaikato"],need:2},{name:"The Winterless Council",ids:["farnorth","whangarei","kaipara"],need:2},{name:"Northlandia",ids:["farnorth","whangarei","kaipara"],need:2},{name:"Plentyville",ids:["wbop","tauranga","rotorua","whakatane","kawerau","opotiki"],need:4},{name:"The Sunrise Coast",ids:["whakatane","kawerau","opotiki"],need:3},{name:"Mount Metropolitan",anchor:"tauranga",ids:["wbop","tauranga"],need:2},{name:"The Fruit Bowl",ids:["hastings","napier","chb","wairoa"],need:3},{name:"The Twin Cities",ids:["napier","hastings"],need:2},{name:"Art Deco Council",anchor:"napier",ids:["napier","hastings","chb"],need:2},{name:"The Naki",ids:["newplymouth","stratford","staranaki"],need:2},{name:"Ring Plain Council",ids:["newplymouth","stratford","staranaki"],need:2},{name:"Greater Palmy",anchor:"palmy",ids:["manawatu","horowhenua","tararua","rangitikei"],need:1},{name:"Windfarm Country",ids:["palmy","manawatu","tararua","rangitikei","horowhenua","whanganui","ruapehu"],need:4},{name:"River City & Friends",anchor:"whanganui",ids:["whanganui","rangitikei","ruapehu"],need:2},{name:"Wellingtron",anchor:"wellington",ids:["hutt","upperhutt","porirua","kapiti"],need:2},{name:"Wellywood",anchor:"wellington",ids:["hutt","upperhutt","porirua","kapiti","masterton","carterton","swairarapa"],need:2},{name:"The Big Windy",ids:["wellington","hutt","upperhutt","porirua","kapiti"],need:3},{name:"The Wairarapa Three",ids:["masterton","carterton","swairarapa"],need:3},{name:"The Sunbelt",ids:["nelson","tasman"],need:2},{name:"Nelmania",ids:["nelson","tasman"],need:2},{name:"Wine & Whales",ids:["marlborough","kaikoura"],need:2},{name:"Sauv Blanc Shire",anchor:"marlborough",ids:["marlborough","kaikoura","tasman"],need:1},{name:"The Coast",ids:["buller","grey","westland"],need:2},{name:"Wild West Council",ids:["buller","grey","westland"],need:2},{name:"Megachurch",anchor:"christchurch",ids:["selwyn","waimakariri","hurunui","ashburton"],need:2},{name:"The Garden Metro",anchor:"christchurch",ids:["selwyn","waimakariri"],need:1},{name:"Cantropolis",ids:["kaikoura","hurunui","waimakariri","christchurch","selwyn","ashburton","timaru","mackenzie","waimate"],need:6},{name:"North Canterbury",ids:["waimakariri","hurunui","kaikoura"],need:2},{name:"Aoraki Council",ids:["timaru","mackenzie","waimate","waitaki"],need:3},{name:"Edinburgh of the South",anchor:"dunedin",ids:["clutha","centralotago","waitaki","qldc"],need:1},{name:"The Goldfields",ids:["centralotago","qldc","clutha","waitaki"],need:3},{name:"Otagopolis",ids:["waitaki","centralotago","qldc","dunedin","clutha"],need:4},{name:"The Kauri Coast",ids:["kaipara","farnorth","whangarei"],need:2},{name:"Twin Harbours",ids:["kaipara","whangarei"],need:2},{name:"Tail of the Fish",ids:["farnorth","whangarei","kaipara"],need:3},{name:"Gold & Gulf",ids:["thames","hauraki"],need:2},{name:"The Pōhutukawa Coast",ids:["thames","hauraki"],need:2},{name:"Hobbiton Shire",ids:["matamata","waipa","swaikato"],need:2},{name:"The Dairy Belt",ids:["matamata","waipa","swaikato","hauraki","waikatod"],need:3},{name:"King Country",ids:["otorohanga","waitomo","ruapehu"],need:2},{name:"The Great Lake District",anchor:"taupo",ids:["taupo","ruapehu","swaikato"],need:1},{name:"Mighty River Council",ids:["waikatod","hamilton","swaikato","taupo"],need:3},{name:"Kiwifruit Country",ids:["wbop","tauranga","opotiki"],need:2},{name:"Geyserland",anchor:"rotorua",ids:["rotorua","taupo","whakatane"],need:1},{name:"Steam & Surf",ids:["rotorua","tauranga","whakatane"],need:2},{name:"The Eastland Council",ids:["gisborne","wairoa","opotiki"],need:2},{name:"First Light Council",ids:["gisborne","wairoa"],need:2},{name:"Tairāwhiti Combined",ids:["gisborne","wairoa","opotiki"],need:2},{name:"Bay Vintage",ids:["hastings","napier","chb"],need:2},{name:"The Heretaunga Council",anchor:"hastings",ids:["hastings","napier","chb","wairoa"],need:1},{name:"Mounga Council",ids:["newplymouth","stratford","staranaki"],need:2},{name:"Surf Highway",ids:["newplymouth","staranaki"],need:2},{name:"Two Rivers",ids:["whanganui","rangitikei"],need:2},{name:"Volcanic Plateau",ids:["ruapehu","taupo","rangitikei"],need:2},{name:"Central Plateau Council",ids:["ruapehu","taupo","rangitikei","swaikato"],need:2},{name:"The Manawatū Council",ids:["palmy","manawatu","horowhenua","tararua"],need:3},{name:"Tararua Council",ids:["tararua","manawatu","horowhenua","masterton"],need:2},{name:"Kāpiti–Horowhenua",ids:["kapiti","horowhenua"],need:2},{name:"The Northern Option",ids:["kapiti","horowhenua"],need:2},{name:"Wellington Metro",anchor:"wellington",ids:["hutt","upperhutt","porirua"],need:3},{name:"Harbour City Council",anchor:"wellington",ids:["hutt","upperhutt","porirua","kapiti"],need:1},{name:"Two Hutts & Friends",ids:["hutt","upperhutt","wellington","porirua"],need:3},{name:"The Wairarapa",ids:["masterton","carterton","swairarapa"],need:2},{name:"Over the Rimutakas",ids:["masterton","carterton","swairarapa"],need:2},{name:"Golden Bay & Beyond",anchor:"tasman",ids:["tasman","nelson","buller"],need:1},{name:"Top of the South",ids:["nelson","tasman","marlborough"],need:3},{name:"The Sounds Council",anchor:"marlborough",ids:["marlborough","nelson","tasman"],need:1},{name:"Glacier Country",ids:["westland","grey"],need:2},{name:"Coal & Greenstone",ids:["buller","grey","westland"],need:2},{name:"Te Tai Poutini",ids:["buller","grey","westland"],need:3},{name:"The Braided Rivers",ids:["ashburton","selwyn","waimakariri","timaru"],need:3},{name:"Canterbury Plains Council",ids:["ashburton","selwyn","waimakariri","christchurch","timaru"],need:3},{name:"Dark Sky Council",anchor:"mackenzie",ids:["mackenzie","waitaki","timaru"],need:1},{name:"Whale Coast",ids:["kaikoura","hurunui","marlborough"],need:2},{name:"South Canterbury",ids:["timaru","mackenzie","waimate"],need:2},{name:"The Quake Belt",anchor:"christchurch",ids:["christchurch","selwyn","waimakariri","hurunui","kaikoura"],need:2},{name:"The Remarkables Council",anchor:"qldc",ids:["qldc","centralotago"],need:1},{name:"Central Otago Council",ids:["centralotago","qldc","clutha"],need:2},{name:"Pinot Country",ids:["centralotago","qldc"],need:2},{name:"Steampunk Shire",anchor:"waitaki",ids:["waitaki","centralotago","waimate"],need:1},{name:"The Deep South",ids:["southlandd","gore","invercargill","clutha"],need:3},{name:"Gorevercargill",ids:["gore","invercargill"],need:2},{name:"Bottom of the World",ids:["southlandd","invercargill","gore","clutha"],need:3},{name:"Catlins Coast",ids:["clutha","southlandd"],need:2},{name:"Fiordland Council",anchor:"southlandd",ids:["southlandd","qldc","invercargill"],need:1},{name:"Southlandia",ids:["southlandd","gore","invercargill"],need:2},{name:"The Deep South",ids:["southlandd","gore","invercargill","clutha"],need:2},{name:"Gorevercargill",ids:["gore","invercargill"],need:2}];function du(e){const t=new Set(e.map(n=>n.id));return Jh.filter(n=>{if(n.anchor&&!t.has(n.anchor))return!1;const r=e.filter(a=>n.ids.includes(a.id)||a.id===n.anchor).length;return n.ids.filter(a=>t.has(a)).length>=n.need&&r>=e.length*.7}).map(n=>n.name)}const Dl=/[aeiouyāēīōū]/i,qh=new Set(["north","south","east","west","northern","southern","eastern","western","central","upper","lower","far","new","of","the","bay","district","city","lakes","islands","coast","greater"]);function zt(e){const t=String(e).replace(/[’']/g,"").split(/[\s\-–]+/).filter(Boolean),n=t.filter(r=>!qh.has(r.toLowerCase()));return(n.length?n:t).reduce((r,i)=>i.length>r.length?i:r)}function pu(e){const t=[];let n=0;for(;n<e.length;)if(Dl.test(e[n])){const r=n;for(;n<e.length&&Dl.test(e[n]);)n++;t.push([r,n])}else n++;return t}function fu(e,t){const n=zt(e),r=zt(t),i=pu(n),a=pu(r),l=i.length>=2?n.slice(0,i[1][1]):n;let s=r;if(a.length>=2){let c=a[1][0];for(;c>0&&!Dl.test(r[c-1]);)c--;s=r.slice(c)}s.length<3&&(s=r);let u=(l+s.toLowerCase()).replace(/([aeiou])\1+/gi,"$1");return u.length>15&&(u=u.slice(0,15)),u.charAt(0).toUpperCase()+u.slice(1)}const em={farnorth:["Ninety Mile","Cape Rēinga"],whangarei:["Whangārei Heads"],kaipara:["Kauri"],thames:["Coromandel"],hauraki:["Hauraki"],waikatod:["Waikato River"],matamata:["Kaimai"],hamilton:["Waikato"],waipa:["Maungatautari"],otorohanga:["Kiwi House"],swaikato:["Kinleith"],waitomo:["Glowworm"],taupo:["Great Lake"],wbop:["Kiwifruit"],tauranga:["Mauao"],rotorua:["Geyser","Te Arawa"],whakatane:["Whakaari"],kawerau:["Pūtauaki"],opotiki:["Sunrise"],gisborne:["First Light","Tairāwhiti"],wairoa:["Waikaremoana"],hastings:["Heretaunga"],napier:["Art Deco"],chb:["Ruahine"],newplymouth:["Taranaki Maunga"],stratford:["Ring Plain"],staranaki:["Surf Highway"],ruapehu:["Ruapehu","Volcanic"],whanganui:["Awa","River City"],rangitikei:["Rangitīkei"],manawatu:["Manawatū"],palmy:["Square"],tararua:["Tararua"],horowhenua:["Horowhenua"],kapiti:["Kāpiti Island"],porirua:["Pauatahanui"],upperhutt:["Akatarawa"],hutt:["Te Awa Kairangi"],wellington:["Harbour City","Windy"],masterton:["Wairarapa"],carterton:["Daffodil"],swairarapa:["Palliser"],tasman:["Abel Tasman","Golden Bay"],nelson:["Centre of NZ"],marlborough:["Sounds","Sauvignon"],buller:["Pancake Rocks"],grey:["Greenstone"],westland:["Glacier"],kaikoura:["Whale"],hurunui:["Hanmer"],waimakariri:["Waimakariri"],christchurch:["Garden City","Ōtautahi"],selwyn:["Rakaia"],ashburton:["Hakatere"],timaru:["Caroline Bay"],mackenzie:["Dark Sky","Aoraki"],waimate:["Whitehorse"],waitaki:["Steampunk","Moeraki"],centralotago:["Pinot","Rail Trail"],qldc:["Remarkables","Whakatipu"],dunedin:["Ōtepoti","Albatross"],clutha:["Catlins"],southlandd:["Fiordland"],gore:["Brown Trout"],invercargill:["Bluff","Southern"],chathams:["Rēkohu"]},hu=["Council","District","Coast","Country","Region","Combined"];function tm(e){const t=[...e].sort((a,l)=>l.pop-a.pop),n=[];if(t.forEach(a=>(em[a.id]||[]).forEach(l=>n.push(l))),!n.length)return[];const r=[],i=e.length+e.reduce((a,l)=>a+l.id.length,0);return n.slice(0,4).forEach((a,l)=>{const s=hu[(i+l)%hu.length];r.push(a.endsWith("Council")||a.endsWith("City")?a:`${a} ${s}`)}),n.length>=2&&r.push(`${n[0]} & ${n[1]}`),r}function mu(e){if(e.length<2)return[];const t=[...e].sort((v,g)=>g.pop-v.pop),[n,r]=t,i=new Set(e.map(v=>v.id)),a=[...du(e)];a.push(fu(n.name,r.name)),a.push(`Greater ${zt(n.name)}`);const l=[...new Set(e.map(v=>v.region))];if(l.length===1){const v=Je.filter(g=>g.region===l[0]&&!g.locked);a.push(v.every(g=>i.has(g.id))?l[0]:`${l[0]} Combined`)}else l.length===2&&a.push(`${zt(l[0])}–${zt(l[1])}`);a.push(`${zt(n.name)}–${zt(r.name)}`),a.push(fu(r.name,n.name)),e.length>=5&&a.push(`${zt(n.name)} Metro`);const s=du(e),u=tm(e),c=a.filter(v=>!s.includes(v));return[...new Set([...s,...u,...c])].filter(Boolean)}const wr={article:{label:"Where talks stand, 3 August",groups:[{name:"Far North unitary option",ids:["farnorth"],note:"Far North's resolved unitary-authority preference; shown as a position rather than a multi-council proposal."},{name:"Whangārei–Kaipara option",ids:["whangarei","kaipara"],note:"Whangārei's preferred option. Kaipara resolved not to submit and does not support the pairing."},{name:"The Fruit Bowl",ids:["hastings","napier","chb"],note:"Matching preferred-option resolutions across all three councils."},{name:"South Waikato option",ids:["swaikato","hamilton","waitomo","otorohanga","taupo"],note:"South Waikato's resolved preference. The named councils are not all recorded as agreeing, and Taupō resolved not to submit."},{name:"Rotorua unitary option",ids:["rotorua"],note:"Rotorua Lakes' resolved unitary-authority preference; shown as a position rather than a multi-council proposal."},{name:"Stratford–South Taranaki",ids:["stratford","staranaki"]},{name:"Metropolitan Wellington proposal in development",ids:["wellington","hutt","porirua","upperhutt"],note:"Wellington, Hutt and Porirua were developing a proposal that includes Upper Hutt. Upper Hutt's inclusion is permitted by the Head Start rules and does not imply its agreement; the 3 August map records no preferred-option resolution for any of the four."},{name:"Kaikōura–Marlborough option",ids:["kaikoura","marlborough"],note:"Kaikōura's resolved preference; Marlborough had no preferred-option resolution in the snapshot."},{name:"West Coast option",ids:["buller","grey","westland"],note:"Grey and Westland's preferred option includes Buller, but Buller resolved not to submit."},{name:"Aoraki option",ids:["timaru","mackenzie","waimate","waitaki","ashburton"],note:"The four resolved Aoraki preferences name Ashburton; Ashburton had no preferred-option resolution in the snapshot."},{name:"Inland Otago",ids:["centralotago","clutha","qldc"],note:"Matching preferred-option resolutions across Central Otago, Clutha and Queenstown Lakes."},{name:"Dunedin preference",ids:["dunedin","clutha","waitaki"],note:"Dunedin resolved on an option with Clutha and potentially Waitaki. The other councils' resolved preferences do not reciprocate this exact option."},{name:"Selwyn unitary option",ids:["selwyn"],note:"Selwyn's resolved unitary-authority preference; shown as a position rather than a multi-council proposal."}]},wgtnOne:{label:"Wellington: one authority",groups:[{name:"Greater Wellington",ids:["wellington","hutt","upperhutt","porirua","kapiti","masterton","carterton","swairarapa"]}]},megatron:{label:"Megatron",groups:[{name:"Megatron",ids:["thames","hauraki","waikatod","matamata","hamilton","waipa","otorohanga","swaikato","waitomo","taupo"]}]},regional:{label:"One council per region",groups:[{name:"Northlandia",ids:["farnorth","whangarei","kaipara"]},{name:"Megatron",ids:["thames","hauraki","waikatod","matamata","hamilton","waipa","otorohanga","swaikato","waitomo","taupo"]},{name:"Plentyville",ids:["wbop","tauranga","rotorua","whakatane","kawerau","opotiki"]},{name:"The Fruit Bowl",ids:["wairoa","hastings","napier","chb"]},{name:"The Naki",ids:["newplymouth","stratford","staranaki"]},{name:"Windfarm Country",ids:["ruapehu","whanganui","rangitikei","manawatu","palmy","tararua","horowhenua"]},{name:"Wellywood",ids:["kapiti","porirua","upperhutt","hutt","wellington","masterton","carterton","swairarapa"]},{name:"The Sunbelt",ids:["tasman","nelson"]},{name:"The Coast",ids:["buller","grey","westland"]},{name:"Cantropolis",ids:["kaikoura","hurunui","waimakariri","christchurch","selwyn","ashburton","timaru","mackenzie","waimate"]},{name:"Otagopolis",ids:["waitaki","centralotago","qldc","dunedin","clutha"]},{name:"Southlandia",ids:["southlandd","gore","invercargill"]}]}},nm=new Set(wr.article.groups.flatMap(e=>e.ids)),rm=Je.filter(e=>!e.locked&&!nm.has(e.id)&&!Vh[e.id]),im=Je.filter(e=>e.locked),gu="amalgamator-homepage-variant-v1";function am(){if(typeof window>"u")return{variant:"a",isOverride:!1};const e=new URLSearchParams(window.location.search).get("variant");if(e==="a"||e==="b")return{variant:e,isOverride:!0};try{const t=window.localStorage.getItem(gu);if(t==="a"||t==="b")return{variant:t,isOverride:!1};const n=Math.random()<.5?"a":"b";return window.localStorage.setItem(gu,n),{variant:n,isOverride:!1}}catch{return{variant:Math.random()<.5?"a":"b",isOverride:!1}}}function lm(e){const t=wr[e],n=t.groups.map((i,a)=>({id:"p"+e+a,name:i.name,color:on[a%on.length]})),r={};return t.groups.forEach((i,a)=>i.ids.forEach(l=>{Be[l]&&!Be[l].locked&&(r[l]=n[a].id)})),{groups:n,assignment:r,activeId:n[0].id}}lm("article");const om=[...Io,...Bo].filter(e=>Je.filter(t=>t.region===e&&!t.locked).length>=2),Wl="https://www.amalgamator.nz/",sm=`${Wl}about/`;function um(e){const t=e.filter(a=>a.avgRes!=null&&a.hh);if(t.length<2)return{blended:null,rows:[],missing:e};const n=t.reduce((a,l)=>a+l.hh,0),r=t.reduce((a,l)=>a+l.avgRes*l.hh,0)/n,i=e.map(a=>({council:a,before:a.avgRes,after:a.avgRes==null?null:r,change:a.avgRes==null?null:r-a.avgRes})).sort((a,l)=>a.change==null?1:l.change==null?-1:l.change-a.change);return{blended:r,rows:i,missing:e.filter(a=>a.avgRes==null)}}const ke=1200,Va=1200,Ga="#fbf8ef",be="#193036",Pe="#4d6267",Qa="#ad3936",vu="#0069a8",Ri="#d9d3c4",cm="#ffffff",F="'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif";function dm({councilName:e,members:t,rates:n,totalPopulation:r}){const i=n.rows.filter(m=>m.change!=null),a=i.filter(m=>m.change>0),l=i.filter(m=>m.change<0),s=a.length?a[0]:null,u=l.length?l[l.length-1]:null,c=u?`In ${u.council.name}, it is ${ge(Math.abs(u.change))} lower a year`:s?`In ${s.council.name}, it is ${ge(s.change)} higher a year`:"No comparable rates data for this combination",v=n.blended?`Compared with each council’s published 2024/25 average residential rates bill, the combined figure would be higher in ${a.length} of the ${i.length} council areas and lower in ${l.length}. ${c}.`:"Population, land area and rates data for this combination.",g=n.rows.filter(m=>m.change==null).map(m=>m.council.name);return{councilName:e,councilCount:t.length,councilNames:t.map(m=>m.name),outsideHeadStart:t.some(m=>m.locked),population:r,rising:a,falling:l,noData:g,biggestRise:s,biggestFall:u,blended:n.blended,headline:c,comparisonSummary:v,summary:`${v}${t.some(m=>m.locked)?" Hypothetical only: Auckland is outside Head Start.":""}`}}function pm(e,t){const n=[];return n.push(`Meet ${e.councilName} — ${e.councilCount} New Zealand councils merged into one, ${Xi(e.population)} people.`),e.outsideHeadStart&&n.push("Hypothetical only: Auckland is expressly excluded from Head Start."),n.push(""),e.blended&&(n.push("Comparing the published council-wide averages:"),e.biggestRise&&n.push(`↑ ${e.biggestRise.council.name}: ${ge(e.biggestRise.change)} above its published average`),e.biggestFall&&n.push(`↓ ${e.biggestFall.council.name}: ${ge(Math.abs(e.biggestFall.change))} below its published average`),n.push(""),n.push(e.comparisonSummary),n.push(`Combined figure: ${ge(e.blended)} a year.`),e.noData.length&&n.push(`(${e.noData.join(", ")} ${e.noData.length>1?"publish":"publishes"} no average residential bill, so ${e.noData.length>1?"they are":"it is"} left out of the blend.)`),n.push("")),n.push("Built with The Amalgamator — an independent model of council amalgamation, not a proposal and not a prediction of anyone's rates."),n.push(`About, method and limitations: ${sm}`),n.push(""),n.push(`See this combination: ${t}`),n.push(""),n.push("What would yours look like?"),n.join(`
`)}function Ei(e,t,n,r,i,a=18){let l=r;for(e.font=`${i} ${l}px ${F}`;e.measureText(t).width>n&&l>a;)l-=2,e.font=`${i} ${l}px ${F}`;return l}function ci(e,t,n){const r=t.split(/\s+/),i=[];let a="";return r.forEach(l=>{const s=a?`${a} ${l}`:l;a&&e.measureText(s).width>n?(i.push(a),a=l):a=s}),a&&i.push(a),i}function yu(e,t,{x:n,y:r,width:i,labelFor:a,valueFor:l,colorFor:s,emptyText:u}){const c=t.slice(0,8),v=35;c.forEach((g,m)=>{const w=r+m*v;m>0&&(e.strokeStyle=Ri,e.lineWidth=1,e.beginPath(),e.moveTo(n,w-12.5),e.lineTo(n+i,w-12.5),e.stroke()),e.textBaseline="middle",e.textAlign="left",e.fillStyle=be;const C=a(g),S=Ei(e,C,i-190,17,650,11);e.font=`650 ${S}px ${F}`,e.fillText(C,n,w),e.textAlign="right",e.fillStyle=s(g),e.font=`750 18px ${F}`,e.fillText(l(g),n+i,w)}),e.textBaseline="alphabetic",e.textAlign="left",t.length?t.length>c.length&&(e.fillStyle=Pe,e.font=`600 15px ${F}`,e.fillText(`Plus ${t.length-c.length} more council${t.length-c.length===1?"":"s"} in the full result`,n,r+c.length*v)):(e.fillStyle=Pe,e.font=`600 18px ${F}`,e.fillText(u,n,r))}function xu(e,t,n,r){e.fillStyle=Pe,e.font=`750 13px ${F}`,e.textBaseline="alphabetic",e.textAlign="left",e.fillText("CURRENT STATE",t,n),e.textAlign="right",e.fillText("AFTER AMALGAMATION",t+r,n),e.textAlign="left"}function fm(e,t,n,r,i,a){e.width=ke,e.height=Va;let l=e.getContext("2d");const s=84,u=s+160;l.font=`650 18px ${F}`;const c=t.councilNames.join(" · "),v=ci(l,c,ke-112),g=u+(v.length-1)*23,m=u+v.length*23+14,w=t.outsideHeadStart?m:g;l.font=`600 17px ${F}`;const C=ci(l,t.comparisonSummary,ke-112),S=w+36,B=S+(C.length-1)*22+30,p=B+24,d=p+142,h=247,y=Math.max(0,d-362),E=Va+y+(h-200);E!==Va&&(e.height=E,l=e.getContext("2d")),l.fillStyle=Ga,l.fillRect(0,0,ke,E),l.fillStyle=be,l.fillRect(0,0,ke,s),l.fillStyle=Ga,l.font=`800 26px ${F}`,l.textBaseline="middle",l.fillText("The Amalgamator",56,s/2),l.font=`600 19px ${F}`,l.globalAlpha=.72,l.textAlign="right",l.fillText("Independent modelling · New Zealand local government",ke-56,s/2),l.globalAlpha=1,l.textAlign="left";let N=s+62;const P=Ei(l,t.councilName,ke-112,62,800);l.fillStyle=be,l.font=`800 ${P}px ${F}`,l.fillText(t.councilName,56,N),N+=38,l.fillStyle=Pe,l.font=`600 22px ${F}`,l.fillText(`${t.councilCount} councils · ${Xi(t.population)} people · ${Math.round(i).toLocaleString("en-NZ")} km²`,56,N),N+=32,l.fillStyle=Pe,l.font=`750 14px ${F}`,l.fillText("COUNCILS INCLUDED",56,N),N+=28,l.fillStyle=be,l.font=`650 18px ${F}`,v.forEach((j,Z)=>{l.fillText(j,56,N+Z*23)}),t.outsideHeadStart&&(l.fillStyle=Qa,l.font=`750 16px ${F}`,l.fillText("HYPOTHETICAL ONLY · AUCKLAND IS OUTSIDE HEAD START",56,N+v.length*23+14)),l.fillStyle=Pe,l.font=`600 17px ${F}`,C.forEach((j,Z)=>{l.fillText(j,56,S+Z*22)}),l.strokeStyle=Ri,l.lineWidth=1,l.beginPath(),l.moveTo(56,B+.5),l.lineTo(ke-56,B+.5),l.stroke(),l.fillStyle=be,l.font=`800 16px ${F}`,l.fillText("ELECTED REPRESENTATION",56,p+2);const b=470,Q=ke-b-104,A=Math.max(a.beforeTotal,a.afterTotal,1);[{y:p+42,label:"Before",detail:`${a.beforeRepresentatives} representatives · ${a.beforeMayors} ${a.beforeMayors===1?"mayor":"mayors"}`,total:a.beforeTotal,parts:[[a.beforeRepresentatives,be],[a.beforeMayors,"#d39a27"]]},{y:p+91,label:"After",detail:`${a.afterRepresentatives} representatives · ${a.communityCouncilMembers} community members · 1 mayor`,total:a.afterTotal,parts:[[a.afterRepresentatives,be],[a.communityCouncilMembers,"#d94720"],[1,"#d39a27"]]}].forEach(j=>{l.fillStyle=be,l.font=`800 17px ${F}`,l.fillText(j.label,56,j.y),l.fillStyle=Pe;const Z=Ei(l,j.detail,b-150,14,600,10);l.font=`600 ${Z}px ${F}`,l.fillText(j.detail,130,j.y),l.fillStyle="rgba(25, 48, 54, 0.10)",l.fillRect(b,j.y-16,Q,20);const Nt=j.total/A*Q;let mt=b;j.parts.forEach(([mn,Gn])=>{const qe=mn/j.total*Nt;l.fillStyle=Gn,l.fillRect(mt,j.y-16,qe,20),mt+=qe}),l.fillStyle=be,l.font=`800 22px ${F}`,l.textAlign="right",l.fillText(String(j.total),ke-56,j.y+1),l.textAlign="left"});const pe=28,z=(ke-112-pe)/2,K=505,fe=56,Te=fe+z+pe;[fe,Te].forEach(j=>{l.fillStyle=cm,l.fillRect(j,d,z,K),l.strokeStyle=Ri,l.lineWidth=1.5,l.strokeRect(j+.75,d+.75,z-1.5,K-1.5)});const ut=(j,Z,Nt,mt,mn)=>{l.fillStyle=Pe;const Gn=Ei(l,Z.toUpperCase(),z-48,16,750,12);l.font=`750 ${Gn}px ${F}`,l.fillText(Z.toUpperCase(),j+24,d+35),l.fillStyle=be,l.font=`800 25px ${F}`,l.fillText(Nt,j+24,d+72),l.font=`800 33px ${F}`,l.fillText(mt,j+24,d+116),l.fillStyle=Pe,l.font=`600 17px ${F}`,l.fillText(mn,j+24,d+143)};ut(fe,"Residential rates","How do averages compare?",n.blended!=null?ge(n.blended):"Not enough data",n.blended!=null?"household-weighted comparison a year":"for a household-weighted comparison"),ut(Te,"Historic net assets per resident · 30 June 2024","How would balance sheets combine?",r.mergedPerResident!=null?ge(r.mergedPerResident):"Not enough data",r.mergedPerResident!=null?"merged average per resident":"for a merged accounting comparison"),l.fillStyle=Pe,l.font=`600 15px ${F}`,l.fillText(n.blended!=null?`Above ${t.rising.length} published council averages; below ${t.falling.length}.`:"Not enough published residential-bill data to compare.",fe+24,d+174);const Yt=r.rows.filter(j=>j.change>0).length,k=r.rows.filter(j=>j.change<0).length;l.fillText(r.mergedPerResident!=null?`${Yt} council areas move higher; ${k} move lower.`:"Not enough comparable council-only financial data.",Te+24,d+174);const O=n.rows,_=d+235;xu(l,fe+24,d+207,z-48),xu(l,Te+24,d+207,z-48),yu(l,O,{x:fe+24,y:_,width:z-48,labelFor:j=>j.before==null?j.council.name:`${j.council.name} · ${ge(j.before)} in 2024`,valueFor:j=>j.change==null?"No data":`${j.change>0?"+":j.change<0?"−":""}${ge(Math.abs(j.change))} / year`,colorFor:j=>j.change==null?Pe:j.change>0?Qa:vu,emptyText:"No comparable residential-bill rows."}),yu(l,r.rows,{x:Te+24,y:_,width:z-48,labelFor:j=>`${j.council.name} · ${ge(j.before)}`,valueFor:j=>`${j.change>0?"+":j.change<0?"−":""}${ge(Math.abs(j.change))} / resident`,colorFor:j=>j.change>0?vu:j.change<0?Qa:Pe,emptyText:"No comparable council-only balance sheets."});const H=d+K+28;l.fillStyle="#f1ede2",l.fillRect(56,H,ke-112,h),l.fillStyle=be,l.font=`800 20px ${F}`,l.fillText("WHAT THESE ESTIMATES MEAN",80,H+31);const ee="We combine each council's published 2024/25 average residential rates bill, weighted by the report's household count. This compares council-wide averages. It does not predict what any individual property would pay.",Ae="We subtract liabilities from assets for each council at 30 June 2024, combine the results, and divide by the combined population. This is an accounting comparison. It is not money residents would receive or a forecast balance sheet. Assets outside the councils' own accounts are not included.",Ie="Water is included exactly as it appeared in each source at that date. Later transfers of water services, assets, debt and billing to separate water organisations are not included.";[["RATES",ee,80],["NET ASSETS",Ae,620]].forEach(([j,Z,Nt])=>{l.fillStyle=be,l.font=`800 14px ${F}`,l.fillText(j,Nt,H+59),l.fillStyle=Pe,l.font=`600 14px ${F}`,ci(l,Z,500).slice(0,5).forEach((mt,mn)=>{l.fillText(mt,Nt,H+82+mn*17)})}),l.strokeStyle=Ri,l.lineWidth=1,l.beginPath(),l.moveTo(80,H+167.5),l.lineTo(ke-80,H+167.5),l.stroke(),l.fillStyle=be,l.font=`800 14px ${F}`,l.fillText("WATER",80,H+193),l.fillStyle=Pe,l.font=`600 14px ${F}`,ci(l,Ie,ke-160).slice(0,2).forEach((j,Z)=>{l.fillText(j,80,H+216+Z*17)});const Ve=76;return l.fillStyle=be,l.fillRect(0,E-Ve,ke,Ve),l.textBaseline="middle",l.fillStyle=Ga,l.font=`700 18px ${F}`,l.fillText("Indicative only. Rates changes subject to transition arrangements.",56,E-Ve/2),l.globalAlpha=.75,l.textAlign="right",l.font=`600 17px ${F}`,l.fillText("www.amalgamator.nz/about/",ke-56,E-Ve/2),l.globalAlpha=1,l.textAlign="left",l.textBaseline="alphabetic",e}function Jt({type:e}){return e==="download"?o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[o.jsx("path",{d:"M12 3v12"}),o.jsx("path",{d:"m7 11 5 5 5-5"}),o.jsx("path",{d:"M4 20h16"})]}):e==="copy"?o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[o.jsx("rect",{x:"9",y:"9",width:"11",height:"11",rx:"2"}),o.jsx("path",{d:"M15 5.5A1.5 1.5 0 0 0 13.5 4h-8A1.5 1.5 0 0 0 4 5.5v8A1.5 1.5 0 0 0 5.5 15"})]}):e==="check"?o.jsx("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:o.jsx("path",{d:"m5 12.5 4.5 4.5L19 7.5"})}):e==="link"?o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[o.jsx("path",{d:"M10 13a5 5 0 0 0 7.1.1l2-2A5 5 0 0 0 12 4l-1.2 1.2"}),o.jsx("path",{d:"M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.2-1.2"})]}):e==="email"?o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[o.jsx("rect",{x:"3",y:"5",width:"18",height:"14",rx:"2"}),o.jsx("path",{d:"m4 7 8 6 8-6"})]}):e==="whatsapp"?o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[o.jsx("path",{d:"M20.5 11.6a8.4 8.4 0 0 1-12.4 7.3L3.5 20l1.2-4.4a8.4 8.4 0 1 1 15.8-4Z"}),o.jsx("path",{d:"M8.2 7.8c.5 3.9 2.5 6 6.3 6.6"}),o.jsx("path",{d:"m8.2 7.8 1.9-.9 1.4 2.5-1.1 1.2M14.5 14.4l1.1-1.2 2.4 1.5-.8 1.8"})]}):e==="facebook"?o.jsx("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:o.jsx("path",{className:"simpleShareSolid",d:"M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v6h4v-6h3.5l.5-4h-4V9c0-.7.3-1 1-1Z"})}):e==="linkedin"?o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[o.jsx("circle",{className:"simpleShareSolid",cx:"6",cy:"5.5",r:"2"}),o.jsx("path",{className:"simpleShareSolid",d:"M4 9h4v11H4zM11 9h3.8v1.5c.8-1.2 2-2 3.8-2 3.1 0 4.4 2 4.4 5.5v6h-4v-5.3c0-1.7-.6-2.7-1.9-2.7-1.5 0-2.1 1-2.1 3.1V20h-4z"})]}):e==="x"?o.jsx("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:o.jsx("path",{className:"simpleShareSolid",d:"M18.6 3H22l-7.4 8.5L23 21h-6.6l-5.1-6.7L5.4 21H2l7.7-8.8L1.7 3h6.7l4.6 6.1L18.6 3Zm-1.2 16h1.9L7.4 4.9h-2L17.4 19Z"})}):e==="reddit"?o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[o.jsx("path",{d:"M5.2 13.2a7.4 5.7 0 0 0 13.6 0"}),o.jsx("circle",{cx:"8.8",cy:"12.5",r:"1"}),o.jsx("circle",{cx:"15.2",cy:"12.5",r:"1"}),o.jsx("path",{d:"M9 16c1.7 1 4.3 1 6 0M12.6 7.4l1-4 3.4.8"}),o.jsx("circle",{cx:"18.3",cy:"5",r:"1.7"}),o.jsx("circle",{cx:"4.2",cy:"11.2",r:"2"}),o.jsx("circle",{cx:"19.8",cy:"11.2",r:"2"})]}):o.jsxs("svg",{viewBox:"0 0 24 24","aria-hidden":"true",focusable:"false",children:[o.jsx("circle",{className:"simpleShareSolid",cx:"5",cy:"12",r:"2"}),o.jsx("circle",{className:"simpleShareSolid",cx:"12",cy:"12",r:"2"}),o.jsx("circle",{className:"simpleShareSolid",cx:"19",cy:"12",r:"2"})]})}const di=["#c7461b","#286f9b","#7a5195","#2f7d62","#d18b21","#9d3f63","#536f22","#5c57a8"];function hm({members:e}){const t=e.reduce((r,i)=>r+i.pop,0)||1,n=[...e].sort((r,i)=>i.pop-r.pop);return o.jsxs("div",{className:"simpleShare","aria-label":"Share of the merged population",children:[o.jsx("div",{className:"simpleShareBar",children:n.map((r,i)=>o.jsx("span",{style:{width:`${r.pop/t*100}%`,backgroundColor:di[i%di.length]}},r.id))}),o.jsx("div",{className:"simpleShareLegend",children:n.map((r,i)=>o.jsxs("span",{children:[o.jsx("i",{className:"simpleShareLegendSwatch",style:{backgroundColor:di[i%di.length]},"aria-hidden":"true"}),r.name," ",o.jsxs("strong",{children:[Math.round(r.pop/t*100),"%"]})]},r.id))})]})}function mm(){const[e]=W.useState(am),t=e.variant,[n,r]=W.useState("start"),[i,a]=W.useState(""),[l,s]=W.useState(!1),[u,c]=W.useState([]),[v,g]=W.useState(""),[m,w]=W.useState(""),[C,S]=W.useState(!1),[B,p]=W.useState(""),[d,h]=W.useState(!1),[y,E]=W.useState(""),[N,P]=W.useState({}),[b,Q]=W.useState({}),A=W.useRef(!1),pe=W.useRef(!1);W.useEffect(()=>{n!=="start"||e.isOverride||pe.current||(pe.current=!0,he(t==="b"?le.viewedHomepageVariantB:le.viewedHomepageVariantA))},[n,e.isOverride,t]),W.useEffect(()=>{try{const f=/[#&]m=([^&]+)/.exec(window.location.hash||""),M=new URLSearchParams(window.location.search).get("m")||(f?f[1]:"");if(!M)return;const L=Xh(decodeURIComponent(M));if(!L||!L.groups.length)return;const U=L.groups[0],Y=Object.entries(L.assignment).filter(([,tt])=>tt===U.id).map(([tt])=>tt).filter(tt=>Be[tt]);if(Y.length<2)return;const et=[...new Set(Y.map(tt=>Be[tt].region))],Tt=Y.map(tt=>Be[tt]).filter(Boolean),Yd=Object.values(wr).flatMap(tt=>tt.groups.filter(ya=>{const Yo=[...ya.ids].sort(),Xo=[...Y].sort();return Yo.length===Xo.length&&Yo.every((Jd,qd)=>Jd===Xo[qd])}).map(ya=>ya.name)),Xd=new Set([...mu(Tt),...Yd]);c(Y),a(et.length===1?et[0]:""),s(et.length>1),w(Xd.has(U.name)?U.name:""),r("result")}catch{}},[]),W.useEffect(()=>{n==="result"&&u.length>=2&&he(le.viewedCalculatedResult)},[n,u.length]),W.useEffect(()=>{var M;const f=()=>{document.documentElement.scrollTop=0,document.body.scrollTop=0,window.scrollTo({top:0,left:0,behavior:"auto"})};f();const R=(M=window.requestAnimationFrame)==null?void 0:M.call(window,f);return()=>{var L;R!=null&&((L=window.cancelAnimationFrame)==null||L.call(window,R))}},[n]);const z=W.useMemo(()=>u.map(f=>Be[f]).filter(Boolean),[u]),K=W.useMemo(()=>{const f=new Set(u.length?u.map(L=>{var U;return(U=Be[L])==null?void 0:U.region}).filter(Boolean):i?[i]:[]),R=new Set;f.forEach(L=>{(Fh[L]||[]).forEach(U=>{f.has(U)||R.add(U)})});const M=new Map;return $h.forEach(L=>{u.includes(L.a)&&!u.includes(L.b)&&M.set(L.b,L.label),u.includes(L.b)&&!u.includes(L.a)&&M.set(L.a,L.label)}),{anchorRegions:f,neighbouringRegions:R,linkedCouncils:M}},[i,u]),fe=W.useMemo(()=>{const f=l?Je.filter(M=>!M.locked||u.includes(M.id)):Je.filter(M=>M.region===i&&(!M.locked||u.includes(M.id)));l&&f.sort((M,L)=>{const U=Tt=>u.includes(Tt.id)?0:K.linkedCouncils.has(Tt.id)?1:K.anchorRegions.has(Tt.region)?2:K.neighbouringRegions.has(Tt.region)?3:4,Y=U(M)-U(L);if(Y)return Y;const et=M.region.localeCompare(L.region,"en-NZ");return et||M.name.localeCompare(L.name,"en-NZ")});const R=v.trim().toLocaleLowerCase("en-NZ");return R?f.filter(M=>u.includes(M.id)||M.name.toLocaleLowerCase("en-NZ").includes(R)||M.region.toLocaleLowerCase("en-NZ").includes(R)):f},[l,K,v,i,u]),Te=W.useMemo(()=>{const f=fe.filter(Y=>u.includes(Y.id)),R=fe.filter(Y=>!u.includes(Y.id)),M=R.filter(Y=>K.linkedCouncils.has(Y.id)||K.anchorRegions.has(Y.region)||K.neighbouringRegions.has(Y.region)),L=R.filter(Y=>!K.linkedCouncils.has(Y.id)&&!K.anchorRegions.has(Y.region)&&!K.neighbouringRegions.has(Y.region)),U=Y=>[...Io,...Bo].map(et=>({region:et,councils:Y.filter(Tt=>Tt.region===et)})).filter(et=>et.councils.length);return{selected:f,nearbyByRegion:U(M),distantByRegion:U(L)}},[fe,K,u]),ut=W.useMemo(()=>mu(z),[z]),Yt=ut[0]||"New council",k=m.trim()||Yt,O=W.useMemo(()=>[...new Set([m.trim(),...ut].filter(Boolean))].slice(0,8),[ut,m]),_=W.useMemo(()=>um(z),[z]),H=W.useMemo(()=>Th(z),[z]),ee=z.some(f=>f.locked),Ae=z.reduce((f,R)=>f+R.pop,0),Ie=z.reduce((f,R)=>f+R.area,0),Ve=u.slice().sort().join(","),j=Ih(Ae,z.length);Bh(j,z.length);const Z=N[Ve]||j,Nt=z.reduce((f,R)=>f+1+(Mh[R.id]||0),0),mt=W.useMemo(()=>Ah(z),[z]),Gn=(Object.prototype.hasOwnProperty.call(b,Ve)?b[Ve]:mt.length>0)?mt.reduce((f,R)=>f+R.overlappingSeats,0):0,qe=Nt+Gn,Ho=W.useMemo(()=>Hh(z,Z),[z,Z]),Do=W.useMemo(()=>Oh(Ho),[Ho]),Qn=Do.reduce((f,R)=>f+R.totalMembers,0);Do.reduce((f,R)=>f+R.communityOnlySeats,0);const $r=qe-z.length,jt=Z+Qn+1,Wo=Math.max(qe,jt,1),Fo=W.useMemo(()=>({beforeRepresentatives:$r,beforeMayors:z.length,beforeTotal:qe,afterRepresentatives:Z,communityCouncilMembers:Qn,afterTotal:jt}),[$r,z.length,qe,Z,Qn,jt]),ha=[...z].sort((f,R)=>R.pop-f.pop)[0],$o=ha&&Ae?Math.round(ha.pop/Ae*100):0,Ld=_.rows.filter(f=>f.change>0),Od=_.rows.filter(f=>f.change<0),Uo=H.rows.filter(f=>f.change>0),Md=H.rows.filter(f=>f.change<0),Ad=()=>{i&&(he(le.startedAmalgamation),S(!1),s(!1),c([]),g(""),r("build"))},ma=()=>{he(le.startedAmalgamation),S(!1),a(""),s(!0),c([]),g(""),r("build")},Id=()=>{s(!0),g("")},Vo=()=>{S(!1),c([]),g(""),r("talks")},Bd=f=>{const R=f.ids.filter(L=>Be[L]&&!Be[L].locked);if(R.length<2)return;he(le.startedAmalgamation),he(le.completedScenario);const M=[...new Set(R.map(L=>Be[L].region))];S(!0),a(M.length===1?M[0]:""),s(M.length>1),c(R),w(f.name),r("result")},ga=f=>{const R=Be[f];R&&(he(le.startedAmalgamation),he(le.selectedFirstCouncil),S(!0),a(R.region),s(!!R.locked),c([f]),w(""),g(""),r("build"))},Hd=f=>{A.current&&(he(le.changedAssumptions),A.current=!1),u.includes(f)?c(u.filter(R=>R!==f)):(he(u.length===0?le.selectedFirstCouncil:le.addedAnotherCouncil),c([...u,f]))},Dd=()=>{u.length<2||(he(le.completedScenario),w(""),r("result"))},Go=()=>{A.current=!0,r("build")},Kn=()=>{he(le.openedExplanatoryMaterial)},Zn=f=>{f.currentTarget.open&&Kn()},Wd=f=>{var R,M;(M=(R=f.target).closest)!=null&&M.call(R,'a[href^="about/"]')&&Kn()},Yn=()=>{try{if(/^https?:$/.test(window.location.protocol)){const f=e.isOverride?`?variant=${t}`:"";window.history.replaceState(null,"",`${window.location.pathname}${f}`)}}catch{}r("start"),a(""),s(!1),c([]),g(""),w(""),S(!1),A.current=!1},gn=()=>{const f={id:"simple",name:k,color:on[0]},R=Object.fromEntries(u.map(L=>[L,f.id])),M=Yh([f],R,"bill");if(!M)return"";try{if(/^https?:$/.test(window.location.protocol))return`${/^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname)?Wl:`${window.location.origin}${window.location.pathname}`}?m=${M}`}catch{}return`${Wl}?m=${M}`},Xt=W.useMemo(()=>dm({councilName:k,members:z,rates:_,totalPopulation:Ae}),[k,z,_,Ae]),Xn=f=>{p(f),window.clearTimeout(Xn.timer),Xn.timer=window.setTimeout(()=>p(""),2400)},Qo=async(f,R)=>{try{return await navigator.clipboard.writeText(f),Xn(R),!0}catch{const L=document.createElement("textarea");L.value=f,L.setAttribute("readonly",""),L.style.position="fixed",L.style.opacity="0",document.body.appendChild(L),L.select();let U=!1;try{U=document.execCommand("copy")}catch{U=!1}return document.body.removeChild(L),U&&Xn(R),U}},Ko=async()=>{try{document.fonts&&document.fonts.load&&(await document.fonts.load("800 68px 'Bricolage Grotesque'"),await document.fonts.ready)}catch{}const f=document.createElement("canvas");return fm(f,Xt,_,H,Ie,Fo),f},Fd=`${k.replace(/[^\wÀ-ɏḀ-ỿ-]+/g,"-").toLowerCase()}-amalgamator.png`,Zo=f=>{const R=document.createElement("a");R.href=f,R.download=Fd,document.body.appendChild(R),R.click(),document.body.removeChild(R),Xn("card"),cr("share-image-download",{format:"png",surface:"result",chosen_name:k}),he(le.copiedOrDownloadedResult)},$d=async()=>{h(!0);try{if(y){Zo(y);return}const f=await Ko();Zo(f.toDataURL("image/png"))}finally{h(!1)}},Ud=async()=>{await Qo(pm(Xt,gn()),"post")&&(cr("share-writeup-copy",{surface:"result",chosen_name:k}),he(le.copiedOrDownloadedResult))},Vd=async()=>{await Qo(gn(),"link")&&(cr("share-click",{platform:"copy-link",surface:"result",chosen_name:k}),he(le.sharedResult),he(le.copiedOrDownloadedResult))},Ur=f=>{cr("share-click",{platform:f,surface:"result",chosen_name:k}),he(le.sharedResult)},va=`${k} — The Amalgamator`,Gd=()=>{const f=ui(gn(),"linkedin"),R=new URL("https://www.linkedin.com/shareArticle");return R.searchParams.set("mini","true"),R.searchParams.set("url",f),R.searchParams.set("title",va),R.searchParams.set("summary",Xt.summary),R.searchParams.set("source","www.amalgamator.nz"),R.toString()},Qd=()=>{const f=ui(gn(),"facebook");return`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(f)}`},Kd=()=>{const f=ui(gn(),"x"),R=new URL("https://twitter.com/intent/tweet");return R.searchParams.set("text",va),R.searchParams.set("url",f),R.toString()},Zd=()=>{const f=ui(gn(),"reddit"),R=new URL("https://www.reddit.com/submit");return R.searchParams.set("url",f),R.searchParams.set("title",va),R.toString()};W.useEffect(()=>{let f=!1;if(n!=="result"||z.length<2){E("");return}return(async()=>{try{const R=await Ko();f||E(R.toDataURL("image/png"))}catch{f||E("")}})(),()=>{f=!0}},[n,Xt,_,H,Ie,z.length,Fo]);const Vr=f=>{const R=u.includes(f.id);return o.jsxs("label",{className:`simpleCouncil ${R?"simpleCouncilSelected":""}`,children:[o.jsx("input",{type:"checkbox",checked:R,onChange:()=>Hd(f.id)}),o.jsxs("span",{className:"simpleCouncilCopy",children:[o.jsx("strong",{children:f.name}),o.jsxs("span",{children:[Xi(f.pop)," people",l?` · ${f.region}`:""]}),f.locked&&o.jsx("span",{className:"simpleCouncilRelation",children:"Outside Head Start"}),l&&K.linkedCouncils.has(f.id)&&o.jsx("span",{className:"simpleCouncilRelation",title:K.linkedCouncils.get(f.id),children:"Direct cross-boundary option"}),l&&!K.linkedCouncils.has(f.id)&&K.neighbouringRegions.has(f.region)&&o.jsx("span",{className:"simpleCouncilRelation",children:"Neighbouring region"})]})]},f.id)};return o.jsxs("div",{className:"simpleApp",children:[o.jsx("style",{children:gm}),o.jsx("a",{className:"simpleSkip",href:"#simpleMain",children:"Skip to the main content"}),o.jsxs("header",{className:"simpleHeader",children:[o.jsx("button",{className:"simpleBrand",type:"button",onClick:Yn,children:"The Amalgamator"}),n!=="start"&&o.jsx("button",{className:"simpleHeaderAction",type:"button",onClick:Yn,children:"Start over"})]}),o.jsxs("main",{id:"simpleMain",children:[n==="start"&&t==="a"&&o.jsxs("section",{className:"simpleStart",children:[o.jsx("p",{className:"simpleEyebrow",children:"Aotearoa local government explorer"}),o.jsx("h1",{children:"Build a bigger council."}),o.jsx("p",{className:"simpleLead",children:"Explore possible New Zealand council amalgamations. Choose territorial authorities and compare their combined population, land area, published 2024/25 average residential rates and historic net assets per resident."}),o.jsx("div",{className:"simpleStartOptions",children:o.jsxs("button",{className:"simpleExample simpleTalksEntry",type:"button",onClick:Vo,children:[o.jsxs("span",{children:[o.jsx("strong",{children:"Not sure where to begin?"}),"Start from all ",wr.article.groups.length," reported council combinations."]}),o.jsx("span",{"aria-hidden":"true",children:"View current talks"})]})}),o.jsx("div",{className:"simpleChoiceDivider",children:o.jsx("span",{children:"Or build your own"})}),o.jsxs("div",{className:"simpleStartCard",children:[o.jsx("label",{htmlFor:"simpleRegion",children:"Where do you want to start?"}),o.jsxs("select",{id:"simpleRegion",value:i,onChange:f=>a(f.target.value),children:[o.jsx("option",{value:"",children:"Choose a region"}),om.map(f=>o.jsx("option",{value:f,children:f},f))]}),o.jsx("button",{className:"simplePrimary simpleFull",type:"button",disabled:!i,onClick:Ad,children:"Choose councils"}),o.jsx("button",{className:"simpleTextButton",type:"button",onClick:ma,children:"I need councils from different regions"})]}),o.jsx("p",{className:"simpleIndependence",children:"Independent modelling tool. It is not an official proposal or a prediction of any household’s rates."}),o.jsxs("section",{className:"simpleHomeSummary","aria-labelledby":"simpleHomeSummaryHeading",children:[o.jsx("h2",{id:"simpleHomeSummaryHeading",children:"What this tool compares"}),o.jsx("p",{children:"The Amalgamator covers all 67 New Zealand territorial authorities. Choose two or more councils to compare:"}),o.jsxs("ul",{children:[o.jsx("li",{children:"Their combined population and land area."}),o.jsx("li",{children:"Published 2024/25 average residential rates bills using a household-weighted comparison."}),o.jsx("li",{children:"Historic net assets per resident at 30 June 2024."}),o.jsx("li",{children:"Where the combined population would live."})]}),o.jsx("p",{children:"The figures are indicative comparisons, not forecasts of an individual property’s rates. Regional council rates and future decisions by a merged council are not modelled."}),o.jsxs("div",{className:"simpleHomeSummaryLinks",children:[o.jsx("a",{href:"about/",children:"Read the methodology and limitations"}),o.jsx("a",{href:"council-data/",children:"Browse the council data"}),o.jsx("a",{href:"the-amalgamator-data.csv",download:!0,children:"Download the underlying dataset"})]}),o.jsxs("section",{className:"simpleHomeDetail","aria-labelledby":"simpleHomeHowHeading",children:[o.jsx("h2",{id:"simpleHomeHowHeading",children:"How the calculator works"}),o.jsxs("ol",{children:[o.jsx("li",{children:"Choose two or more of New Zealand’s 67 territorial authorities."}),o.jsx("li",{children:"The calculator combines their published population, land area and historic balance-sheet figures."}),o.jsx("li",{children:"It pools published 2024/25 average residential rates to show the indicative direction of change."})]}),o.jsx("p",{children:"The result is a comparison, not a forecast or an official amalgamation proposal."})]}),o.jsxs("section",{className:"simpleHomeDetail simpleHomeQuestions",id:"common-questions","aria-labelledby":"simpleHomeQuestionsHeading",children:[o.jsx("h2",{id:"simpleHomeQuestionsHeading",children:"Common questions"}),o.jsx("h3",{children:"What does council amalgamation mean?"}),o.jsx("p",{children:"Council amalgamation means combining two or more existing councils into one local authority. Any actual reform would require an official process and decisions that this tool does not model."}),o.jsx("h3",{children:"Are the rates figures predictions?"}),o.jsxs("p",{children:["No. They compare published 2024/25 average residential rates. They do not predict the bill for an individual property or decisions a future council might make. ",o.jsx("a",{href:"about/#method",children:"See the rates method."})]}),o.jsx("h3",{children:"What do net assets per resident mean?"}),o.jsxs("p",{children:["This is a historic accounting comparison: council assets less liabilities at 30 June 2024, divided by population. It is not cash available to residents and does not forecast a merged council’s balance sheet. ",o.jsx("a",{href:"about/#sources",children:"See the source details."})]}),o.jsx("h3",{children:"Where does the information come from?"}),o.jsxs("p",{children:["The calculator uses published council and public-sector data. The full sources, calculation method and limitations are available on the"," ",o.jsx("a",{href:"about/#sources",children:"About and method page."})]})]}),o.jsxs("section",{className:"simpleHomeDetail","aria-labelledby":"simpleHomeCoverageHeading",children:[o.jsx("h2",{id:"simpleHomeCoverageHeading",children:"Data coverage"}),o.jsx("p",{children:"Covers all 67 New Zealand territorial authorities. Rates comparisons use published 2024/25 averages. Net assets use council accounts at 30 June 2024."}),o.jsxs("div",{className:"simpleHomeSummaryLinks",children:[o.jsx("a",{href:"about/#sources",children:"See the sources and methodology"}),o.jsx("a",{href:"council-data/",children:"Browse the council data"}),o.jsx("a",{href:"the-amalgamator-data.csv",download:!0,children:"Download the dataset"})]})]})]})]}),(n==="talks"||n==="start"&&t==="b")&&o.jsxs("section",{className:"simpleTalks",children:[o.jsxs("div",{className:"simplePageHead",children:[o.jsx("p",{className:"simpleEyebrow",children:n==="start"?"Aotearoa local government explorer":"Optional starting point"}),o.jsx("h1",{children:"Where talks stand"}),o.jsx("p",{children:n==="start"?"Explore council combinations being discussed, or choose any councils to build your own.":"Every reported combination in this snapshot is shown below. Choose one to explore it, then change the councils if you want."})]}),n==="start"&&o.jsxs("div",{className:"simpleTalksHomeActions",children:[o.jsx("button",{className:"simplePrimary simpleHeroPrimary",type:"button",onClick:ma,children:"Choose any councils"}),o.jsx("span",{children:"No sign-up · uses published council data"})]}),o.jsxs("div",{className:"simpleTalksNotice",children:[o.jsx("strong",{children:"Snapshot as at 3 August 2026"}),o.jsx("span",{children:"These are reported discussions and stated positions, not endorsements, predictions, or final proposals."})]}),o.jsx("div",{className:"simpleTalkGrid","aria-label":"Reported council combinations",children:wr.article.groups.map(f=>{const R=f.ids.map(U=>Be[U]).filter(Boolean),M=[...new Set(R.map(U=>U.region))],L=R.reduce((U,Y)=>U+Y.pop,0);return o.jsxs("button",{className:"simpleTalkCard",type:"button",onClick:()=>Bd(f),children:[o.jsx("span",{className:"simpleTalkRegion",children:M.join(" · ")}),o.jsx("strong",{children:f.name}),o.jsx("span",{className:"simpleTalkMembers",children:R.map(U=>U.name).join(" + ")}),o.jsxs("span",{className:"simpleTalkMeta",children:[R.length," councils · ",Xi(L)," people"]}),f.note&&o.jsx("span",{className:"simpleTalkNote",children:f.note})]},f.name)})}),o.jsxs("details",{className:"simpleExploring",onToggle:Zn,children:[o.jsx("summary",{children:"Council decisions and current positions"}),o.jsxs("div",{children:[o.jsx("p",{className:"simpleExploringIntro",children:"Snapshot as at 3 August 2026. This list distinguishes preferred-option resolutions, decisions not to submit, non-conforming proposals and councils with no preferred-option resolution. Being named in another council's option does not establish agreement. Select a council to test who it could join."}),o.jsx("div",{className:"simpleStatusRegions",children:Gh.map(({region:f,councils:R})=>o.jsxs("section",{className:"simpleStatusRegion",children:[o.jsxs("h3",{children:[o.jsx("span",{children:f}),o.jsxs("span",{className:"simpleStatusRegionCount",children:[R.length," ",R.length===1?"council":"councils"]})]}),o.jsx("div",{children:R.map(({council:M,status:L,category:U})=>o.jsxs("button",{className:"simpleExploringCouncil",type:"button",onClick:()=>ga(M.id),children:[o.jsxs("span",{children:[o.jsx("strong",{children:M.name}),o.jsx("span",{children:Uh[U]}),o.jsx("span",{children:L})]}),o.jsx("span",{"aria-hidden":"true",children:"Choose partners →"})]},M.id))})]},f))}),o.jsx("p",{className:"simpleExploringSource",onClick:Kn,children:o.jsx("a",{href:"about/#sources",children:"Sources and status notes"})})]})]}),o.jsxs("details",{className:"simpleExploring",onToggle:Zn,children:[o.jsx("summary",{children:"Other eligible councils"}),o.jsxs("div",{children:[o.jsx("p",{className:"simpleExploringIntro",children:"These councils are eligible for Head Start, but this dated snapshot records no separate reported combination or status note for them. Select one to test possible partners. Any grouping you make is your scenario, not a reported proposal."}),rm.map(f=>o.jsxs("button",{className:"simpleExploringCouncil",type:"button",onClick:()=>ga(f.id),children:[o.jsxs("span",{children:[o.jsx("strong",{children:f.name}),o.jsx("span",{children:"Eligible; no separate status recorded in this snapshot."})]}),o.jsx("span",{"aria-hidden":"true",children:"Choose partners →"})]},f.id))]})]}),o.jsxs("details",{className:"simpleExploring simpleOutsideHeadStart",onToggle:Zn,children:[o.jsx("summary",{children:"Outside Head Start"}),o.jsxs("div",{children:[o.jsx("p",{className:"simpleExploringIntro",children:"Auckland is the only territorial authority expressly excluded from Head Start. You can still combine it with other councils here as a hypothetical comparison, but the result is not a Head Start option."}),im.map(f=>o.jsxs("button",{className:"simpleExploringCouncil",type:"button",onClick:()=>ga(f.id),children:[o.jsxs("span",{children:[o.jsx("strong",{children:f.name}),o.jsx("span",{children:"Excluded from the Head Start pathway."})]}),o.jsx("span",{"aria-hidden":"true",children:"Test hypothetically →"})]},f.id)),o.jsx("p",{className:"simpleExploringSource",onClick:Kn,children:o.jsx("a",{href:"about/#sources",children:"Official eligibility source"})})]})]}),n==="talks"?o.jsx("button",{className:"simpleSecondary",type:"button",onClick:Yn,children:"Back to the start"}):o.jsx("button",{className:"simpleSecondary",type:"button",onClick:ma,children:"Build your own combination"})]}),n==="build"&&o.jsxs("section",{className:"simpleBuild",children:[o.jsxs("div",{className:"simplePageHead",children:[o.jsx("p",{className:"simpleEyebrow",children:"Step 1 of 2"}),o.jsx("h1",{children:"Which councils should join?"}),o.jsx("p",{children:u.length===1?`${z[0].name} is selected. Choose at least one more council.`:l?"Search across Aotearoa and choose at least two councils.":`Choose at least two councils in ${i}.`})]}),ee&&o.jsxs("div",{className:"simpleHeadStartWarning",role:"note",children:[o.jsx("strong",{children:"Hypothetical only: Auckland is outside Head Start."}),o.jsx("span",{children:"This tool lets you compare it with other councils, but the combination is not eligible under the Head Start pathway."})]}),!l&&o.jsxs("div",{className:"simpleCrossRegion",children:[o.jsxs("div",{children:[o.jsx("strong",{children:"Need a council from somewhere else?"}),o.jsx("span",{children:"Your current selections will stay selected."})]}),o.jsx("button",{className:"simpleSecondary",type:"button",onClick:Id,children:"Add councils from another region"})]}),l&&i&&o.jsx("div",{className:"simpleCrossRegion simpleCrossRegionActive",role:"status",children:o.jsxs("div",{children:[o.jsx("strong",{children:"All regions are available"}),o.jsx("span",{children:"Nearby options are separated from councils further afield. The groups update as you select."})]})}),(l||fe.length>7)&&o.jsxs("label",{className:"simpleSearch",children:[o.jsx("span",{children:"Find a council"}),o.jsx("input",{type:"search",value:v,onChange:f=>g(f.target.value),placeholder:"Type a council or region"})]}),!l&&o.jsx("div",{className:"simpleCouncilList","aria-label":"Councils",children:fe.map(Vr)}),l&&fe.length>0&&o.jsxs("div",{className:"simpleGeoChoices",children:[Te.selected.length>0&&o.jsxs("section",{className:"simpleSelectedZone","aria-labelledby":"selectedCouncilsHeading",children:[o.jsx("h2",{id:"selectedCouncilsHeading",children:"Selected councils"}),o.jsx("div",{className:"simpleCouncilList",children:Te.selected.map(Vr)})]}),Te.nearbyByRegion.length>0&&o.jsxs("section",{className:"simpleNearbyZone","aria-labelledby":"nearbyCouncilsHeading",children:[o.jsxs("div",{className:"simpleZoneHead",children:[o.jsx("p",{className:"simpleEyebrow",children:"Geographically closer"}),o.jsx("h2",{id:"nearbyCouncilsHeading",children:"Nearby options"}),o.jsx("p",{children:"Councils in the same or neighbouring regions are shown here. Documented cross-boundary options are marked."})]}),Te.nearbyByRegion.map(f=>o.jsxs("section",{className:"simpleNearbyRegion",children:[o.jsx("h3",{children:f.region}),o.jsx("div",{className:"simpleCouncilList",children:f.councils.map(Vr)})]},f.region))]}),Te.distantByRegion.length>0&&o.jsxs("section",{className:"simpleDistantZone","aria-labelledby":"distantCouncilsHeading",children:[o.jsxs("div",{className:"simpleZoneHead",children:[o.jsx("p",{className:"simpleEyebrow",children:"Geographically separate"}),o.jsx("h2",{id:"distantCouncilsHeading",children:"Further afield"}),o.jsx("p",{children:"Open a region to browse its councils."})]}),o.jsx("div",{className:"simpleDistantRegions",children:Te.distantByRegion.map(f=>o.jsxs("details",{className:"simpleDistantRegion",open:!!v.trim(),children:[o.jsxs("summary",{children:[o.jsx("span",{children:f.region}),o.jsxs("span",{children:[f.councils.length," council",f.councils.length===1?"":"s"]})]}),o.jsx("div",{className:"simpleCouncilList",children:f.councils.map(Vr)})]},f.region))})]})]}),fe.length===0&&o.jsx("p",{className:"simpleEmpty",children:"No councils match that search."}),o.jsxs("div",{className:"simpleBuildActions",children:[o.jsx("button",{className:"simpleSecondary",type:"button",onClick:Yn,children:"Change starting point"}),o.jsx("button",{className:"simplePrimary",type:"button",disabled:u.length<2,onClick:Dd,children:u.length<2?`Choose ${2-u.length} more`:`See result for ${u.length} councils`})]})]}),n==="result"&&z.length>=2&&o.jsxs("section",{className:"simpleResult",children:[C&&o.jsxs("div",{className:"simpleTalkOrigin",children:[o.jsx("span",{children:"Started from the “where things stand” snapshot."}),o.jsx("button",{className:"simpleTextButton",type:"button",onClick:Vo,children:"View all reported combinations"})]}),ee&&o.jsxs("div",{className:"simpleHeadStartWarning",role:"note",children:[o.jsx("strong",{children:"Hypothetical only: this combination includes Auckland."}),o.jsx("span",{children:"Auckland is expressly excluded from Head Start, so this is a comparison scenario rather than an eligible proposal."})]}),o.jsxs("div",{className:"simplePageHead simpleResultHead",children:[o.jsx("p",{className:"simpleEyebrow",children:"Step 2 of 2"}),o.jsx("p",{className:"simpleOverline",children:"Your new council"}),o.jsx("h1",{children:k}),o.jsx("p",{children:z.map(f=>f.name).join(" + ")}),o.jsx("div",{className:"simpleNameActions",children:o.jsx("button",{className:"simpleTextButton",type:"button",onClick:Go,children:"Change councils"})}),O.length>1&&o.jsxs("fieldset",{className:"simpleNameChooser",children:[o.jsx("legend",{children:"Other names"}),o.jsx("div",{children:O.map(f=>o.jsx("button",{className:`simpleNameChoice ${f===k?"simpleNameChoiceSelected":""}`,type:"button","aria-pressed":f===k,onClick:()=>w(f),children:f},f))})]})]}),o.jsxs("div",{className:"simpleStats","aria-label":"Combined council summary",children:[o.jsxs("div",{children:[o.jsx("span",{children:"People"}),o.jsx("strong",{children:Ae.toLocaleString("en-NZ")})]}),o.jsxs("div",{children:[o.jsx("span",{children:"Land area"}),o.jsxs("strong",{children:[Math.round(Ie).toLocaleString("en-NZ")," km²"]})]}),o.jsxs("div",{children:[o.jsx("span",{children:"Existing councils"}),o.jsx("strong",{children:z.length})]})]}),o.jsxs("article",{className:"simplePanel",children:[o.jsx("p",{className:"simpleEyebrow",children:"Balance of the new council"}),o.jsx("h2",{children:"Where would most people live?"}),o.jsxs("p",{className:"simpleAnswer",children:[o.jsx("strong",{children:ha.name})," would account for ",$o,"% of the population.",$o>50?" It would be larger than all the other council areas combined.":" No single area would hold a majority of residents."]}),o.jsx(hm,{members:z}),o.jsx("p",{className:"simpleFinePrint",children:"Population share is not voting power. The illustrative representation model below can be adjusted; final wards and local arrangements would be decided separately."})]}),o.jsxs("article",{className:"simplePanel simpleRepresentation",children:[o.jsx("p",{className:"simpleEyebrow",children:"Representation"}),o.jsx("h2",{children:"How many elected roles would there be?"}),o.jsx("p",{className:"simpleAnswer",children:"A simple comparison of the current councils with the illustrative merged model."}),o.jsxs("div",{className:"simpleRepresentationBars","aria-live":"polite",children:[o.jsxs("div",{className:"simpleRepresentationBarRow",children:[o.jsxs("div",{className:"simpleRepresentationBarCopy",children:[o.jsx("strong",{children:"Before"}),o.jsxs("span",{children:[$r," elected representatives · ",z.length," ",z.length===1?"mayor":"mayors"]})]}),o.jsx("div",{className:"simpleRepresentationBarTrack","aria-hidden":"true",children:o.jsxs("div",{className:"simpleRepresentationBar",style:{width:`${qe/Wo*100}%`},children:[o.jsx("span",{className:"simpleRepresentationSegment simpleRepresentationElected",style:{width:`${$r/qe*100}%`}}),o.jsx("span",{className:"simpleRepresentationSegment simpleRepresentationMayors",style:{width:`${z.length/qe*100}%`}})]})}),o.jsx("strong",{className:"simpleRepresentationBarTotal",children:qe})]}),o.jsxs("div",{className:"simpleRepresentationBarRow",children:[o.jsxs("div",{className:"simpleRepresentationBarCopy",children:[o.jsx("strong",{children:"After"}),o.jsxs("span",{children:[Z," elected representatives · ",Qn," Community Council members · 1 mayor"]})]}),o.jsx("div",{className:"simpleRepresentationBarTrack","aria-hidden":"true",children:o.jsxs("div",{className:"simpleRepresentationBar",style:{width:`${jt/Wo*100}%`},children:[o.jsx("span",{className:"simpleRepresentationSegment simpleRepresentationElected",style:{width:`${Z/jt*100}%`}}),o.jsx("span",{className:"simpleRepresentationSegment simpleRepresentationCommunity",style:{width:`${Qn/jt*100}%`}}),o.jsx("span",{className:"simpleRepresentationSegment simpleRepresentationMayors",style:{width:`${100/jt}%`}})]})}),o.jsx("strong",{className:"simpleRepresentationBarTotal",children:jt})]})]}),o.jsx("p",{className:"simpleFinePrint",children:"The totals are elected roles. Some representatives would sit on both tiers. See About & method for the assumptions and counting rules."})]}),!1,o.jsxs("article",{className:"simplePanel",children:[o.jsxs("div",{className:"simplePanelHead",children:[o.jsxs("div",{children:[o.jsx("p",{className:"simpleEyebrow",children:"Residential rates"}),o.jsx("h2",{children:"How do the published council averages compare?"})]}),_.blended!=null&&o.jsxs("div",{className:"simpleBlend",children:[o.jsx("span",{children:"Weighted comparison"}),o.jsx("strong",{children:ge(_.blended)}),o.jsx("span",{children:"a year"})]})]}),_.blended==null?o.jsx("p",{className:"simpleEmpty",children:"There is not enough published residential-bill data for this combination."}):o.jsxs(o.Fragment,{children:[o.jsx("p",{className:"simpleAnswer",children:Ld.length>0||Od.length>0?Xt.comparisonSummary:"Published averages are already very similar."}),o.jsxs("div",{className:"simpleRateChart",children:[o.jsxs("div",{className:"simpleRateAxis","aria-hidden":"true",children:[o.jsx("span",{children:"Below published average"}),o.jsx("span",{children:"Above published average"})]}),o.jsx("div",{className:"simpleRateRows",children:_.rows.map(f=>o.jsxs("div",{className:"simpleRateRow",children:[o.jsxs("div",{className:"simpleRateCopy",children:[o.jsx("strong",{children:f.council.name}),o.jsx("span",{children:f.before==null?"No published average bill":`${ge(f.before)} now`})]}),f.change==null?o.jsx("span",{className:"simpleNoData",children:"No data"}):o.jsxs(o.Fragment,{children:[o.jsxs("strong",{className:f.change>0?"simpleUp":f.change<0?"simpleDown":"simpleFlat",children:[f.change>0?"+":f.change<0?"−":"",ge(Math.abs(f.change))," a year"]}),o.jsxs("div",{className:"simpleRateBar","aria-hidden":"true",children:[o.jsx("span",{className:"simpleRateZero"}),f.change!==0&&o.jsx("span",{className:`simpleRateFill ${f.change>0?"simpleRateMore":"simpleRateLess"}`,style:{width:`${Math.min(50,Math.abs(f.change)/Math.abs(_.blended)*50)}%`}})]})]})]},f.council.id))})]})]}),o.jsxs("details",{className:"simpleDisclosure",onToggle:Zn,children:[o.jsx("summary",{children:"These figures show a possible direction rather than a final result"}),o.jsx("p",{children:"This compares each council’s published 2024/25 average residential bill with a weighted average using the Ratepayers’ Report’s separately published household count. That count is not necessarily the residential rating-unit count used by the council to calculate its published bill. The result can indicate how the council-wide averages compare, but it does not reconstruct the residential rates pool or forecast an individual property."}),o.jsx("p",{children:"Real mergers use property values, targeted rates, differentials, caps, and multi-year transition arrangements. These can alter the size, timing and direction of a property-level change. Establishment costs and savings are not included. The bars share one scale within this result, so the bar length is the difference divided by the combined weighted average. The same percentage difference therefore has the same length in every result; half the track represents a difference equal to 100% of the combined figure."}),o.jsx("p",{children:"Water follows a historical continuity basis. Each 2024/25 figure retains the treatment in its published source; later transfers to water organisations and later separate water charges are not substituted. Where water was already separately owned, billed or excluded, that source-date treatment remains."})]}),o.jsx("p",{className:"simpleMethodLink",onClick:Kn,children:o.jsx("a",{href:"about/#limitations",children:"What these numbers mean"})})]}),o.jsxs("article",{className:"simplePanel",children:[o.jsxs("div",{className:"simplePanelHead",children:[o.jsxs("div",{children:[o.jsx("p",{className:"simpleEyebrow",children:"Historic net assets per resident · 30 June 2024"}),o.jsx("h2",{children:"How would the balance sheets combine?"})]}),H.mergedPerResident!=null&&o.jsxs("div",{className:"simpleBlend",children:[o.jsx("span",{children:"Merged average"}),o.jsx("strong",{children:ge(H.mergedPerResident)}),o.jsx("span",{children:"per resident"})]})]}),H.mergedPerResident==null?o.jsx("p",{className:"simpleEmpty",children:"There is not enough comparable financial-position data for this combination."}):o.jsxs(o.Fragment,{children:[o.jsxs("p",{className:"simpleAnswer",children:[Uo.length," council ",Uo.length===1?"area would":"areas would"," move to higher net assets per resident, while ",Md.length," would move lower."]}),o.jsxs("div",{className:"simpleRateChart","aria-label":"Change in net assets per resident after pooling council balance sheets",children:[o.jsxs("div",{className:"simpleRateAxis","aria-hidden":"true",children:[o.jsx("span",{children:"Lower after pooling"}),o.jsx("span",{children:"Higher after pooling"})]}),o.jsx("div",{className:"simpleRateRows",children:H.rows.map(f=>o.jsxs("div",{className:"simpleRateRow simpleAssetRow",children:[o.jsxs("div",{className:"simpleRateCopy",children:[o.jsx("strong",{children:f.council.name}),o.jsxs("span",{children:[ge(f.before)," per resident at 30 June 2024"]})]}),o.jsxs("strong",{className:f.change>0?"simpleDown":f.change<0?"simpleUp":"simpleFlat",children:[f.change>0?"+":f.change<0?"−":"",ge(Math.abs(f.change))," per resident"]}),o.jsxs("div",{className:"simpleRateBar","aria-hidden":"true",children:[o.jsx("span",{className:"simpleRateZero"}),f.change!==0&&o.jsx("span",{className:`simpleRateFill ${f.change>0?"simpleAssetHigher":"simpleAssetLower"}`,style:{width:`${Math.min(50,Math.abs(f.change)/Math.abs(H.mergedPerResident)*50)}%`}})]})]},f.council.id))})]})]}),o.jsxs("details",{className:"simpleDisclosure",onToggle:Zn,children:[o.jsx("summary",{children:"These figures show a possible direction rather than a final result"}),o.jsx("p",{children:"Net assets are total assets minus total liabilities. The merged figure pools the selected councils’ 30 June 2024 council-only balance sheets and divides the result by their combined 2024 population. Each row compares that accounting benchmark with the TLA’s historic net assets per resident. It shows the direction of that comparison, not what residents would receive or what a final merger agreement would allocate."}),o.jsx("p",{children:"Bar length is the difference divided by the combined net-assets figure per resident. The same percentage difference therefore has the same length in every result; half the track represents a difference equal to 100% of the combined figure."}),o.jsx("p",{children:"This is an accounting comparison, not a cash gain or loss. It does not show where assets are located, their condition, whether liabilities would be ring-fenced, or how services and rates would change. Council-controlled organisations are excluded; unitary authorities also perform regional functions."}),o.jsx("p",{children:"Water follows a historical continuity basis. Water assets and liabilities held directly by councils at 30 June 2024 remain in these figures; later transfers to separate water organisations are ignored. Assets already held outside council-only accounts remain excluded. This is not a post-reform legal balance sheet."}),o.jsxs("p",{children:["Source:"," ",o.jsx("a",{href:"https://www.stats.govt.nz/information-releases/local-authority-financial-statistics-year-ended-june-2024/",target:"_blank",rel:"noreferrer",children:"Stats NZ Local Authority Financial Statistics"}),"."]})]})]}),o.jsxs("article",{className:"simpleSharePanel",children:[o.jsxs("div",{className:"simpleShareHead",children:[o.jsx("p",{className:"simpleEyebrow",children:"Keep the conversation going"}),o.jsxs("h2",{children:["Share ",k]}),o.jsx("p",{className:"simpleShareLead",children:Xt.summary})]}),y&&o.jsxs("figure",{className:"simpleCardPreview",children:[o.jsx("img",{src:y,alt:`Share card for ${k}. ${Xt.summary}`}),o.jsx("figcaption",{children:"Preview of the downloadable share image."})]}),o.jsxs("div",{className:"simpleSocialShare",children:[o.jsx("h3",{children:"Share"}),o.jsxs("div",{className:"simpleSocialShareButtons",children:[o.jsx("a",{className:"simpleSocialIconButton simpleFacebookIconButton",href:Qd(),target:"_blank",rel:"noreferrer nofollow noopener","aria-label":`Share ${k} on Facebook`,title:"Share on Facebook",onClick:()=>Ur("facebook"),children:o.jsx(Jt,{type:"facebook"})}),o.jsx("a",{className:"simpleSocialIconButton simpleXIconButton",href:Kd(),target:"_blank",rel:"noreferrer nofollow noopener","aria-label":`Share ${k} on X`,title:"Share on X",onClick:()=>Ur("x"),children:o.jsx(Jt,{type:"x"})}),o.jsx("a",{className:"simpleSocialIconButton simpleLinkedInIconButton",href:Gd(),target:"_blank",rel:"noreferrer nofollow noopener","aria-label":`Share ${k} on LinkedIn`,title:"Share on LinkedIn",onClick:()=>Ur("linkedin"),children:o.jsx(Jt,{type:"linkedin"})}),o.jsx("a",{className:"simpleSocialIconButton simpleRedditIconButton",href:Zd(),target:"_blank",rel:"noreferrer nofollow noopener","aria-label":`Share ${k} on Reddit`,title:"Share on Reddit",onClick:()=>Ur("reddit"),children:o.jsx(Jt,{type:"reddit"})}),o.jsx("button",{className:"simpleSocialIconButton simpleCopyLinkIconButton",type:"button",onClick:Vd,"aria-label":`Copy link to ${k}`,title:"Copy link",children:o.jsx(Jt,{type:B==="link"?"check":"link"})})]})]}),o.jsxs("div",{className:"simpleShareSecondary",children:[o.jsxs("button",{type:"button",onClick:$d,disabled:d,children:[o.jsx(Jt,{type:B==="card"?"check":"download"}),B==="card"?"Image saved":"Download image"]}),o.jsxs("button",{type:"button",onClick:Ud,children:[o.jsx(Jt,{type:B==="post"?"check":"copy"}),B==="post"?"Write-up copied":"Copy write-up"]})]}),o.jsx("p",{className:"simpleShareStatus",role:"status","aria-live":"polite",children:B==="card"?"Image saved to your downloads.":B==="post"?"Write-up copied.":B==="link"?"Link copied.":""})]}),o.jsxs("div",{className:"simpleEndActions",children:[o.jsx("button",{className:"simpleSecondary",type:"button",onClick:Go,children:"Change councils"}),o.jsx("button",{className:"simpleTextButton",type:"button",onClick:Yn,children:"Build another council"})]})]})]}),o.jsxs("footer",{className:"simpleFooter",children:[o.jsxs("div",{children:[o.jsx("strong",{children:"The Amalgamator"}),o.jsx("span",{children:"Independent modelling for local government reform."})]}),o.jsxs("nav",{"aria-label":"More information",onClickCapture:Wd,children:[o.jsx("a",{href:"/about/index.html",children:"About & method"}),o.jsx("a",{href:"privacy-policy/",children:"Privacy"}),o.jsx("a",{href:"council-data/",children:"Council data"}),o.jsx("a",{href:"the-amalgamator-data.csv",download:!0,children:"Download the data"}),o.jsx("a",{href:"https://github.com/Kasukabe914/localgovernment",target:"_blank",rel:"noreferrer",children:"Source code"})]})]})]})}const gm=`
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&display=swap');

.simpleApp {
  --ink: #193036;
  --ink-soft: #4d6267;
  --sea: #dfeff0;
  --paper: #fbf8ef;
  --white: #ffffff;
  --accent: #d94720;
  --accent-dark: #ae3214;
  --line: #b8c9ca;
  --good: #1f7250;
  --bad: #ad3936;
  min-height: 100vh;
  background: var(--sea);
  color: var(--ink);
  font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

.simpleApp *,
.simpleApp *::before,
.simpleApp *::after { box-sizing: border-box; }
.simpleApp button,
.simpleApp input,
.simpleApp select { font: inherit; }
.simpleApp button,
.simpleApp select,
.simpleApp summary,
.simpleApp label { -webkit-tap-highlight-color: transparent; }
.simpleApp a { color: inherit; }
.simpleApp h1,
.simpleApp h2,
.simpleApp p { margin-top: 0; }

.simpleSkip {
  position: fixed;
  left: 12px;
  top: -80px;
  z-index: 100;
  background: var(--ink);
  color: var(--white);
  padding: 10px 14px;
  border-radius: 8px;
  font-weight: 700;
}
.simpleSkip:focus { top: 12px; }

.simpleHeader {
  min-height: 68px;
  max-width: 1120px;
  margin: 0 auto;
  padding: 14px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.simpleBrand,
.simpleHeaderAction,
.simpleTextButton {
  border: 0;
  background: transparent;
  color: var(--ink);
  cursor: pointer;
}
.simpleBrand {
  padding: 0;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.simpleHeaderAction,
.simpleTextButton {
  padding: 7px 3px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 4px;
}

.simpleStart,
.simpleTalks,
.simpleBuild,
.simpleResult {
  width: min(100% - 32px, 800px);
  margin: 0 auto;
}
.simpleStart {
  --start-box-gap: 72px;
  min-height: calc(100vh - 190px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 44px 0 72px;
}
.simpleEyebrow,
.simpleOverline {
  margin-bottom: 8px;
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.simpleStart > h1,
.simplePageHead > h1 {
  margin-bottom: 18px;
  font-size: clamp(44px, 9vw, 78px);
  line-height: 0.96;
  letter-spacing: -0.055em;
}
.simpleLead {
  max-width: 600px;
  margin-bottom: 30px;
  color: var(--ink-soft);
  font-size: clamp(18px, 3vw, 23px);
  line-height: 1.4;
}

.simpleHeroPrimary {
  min-height: 54px;
  padding-inline: 24px;
  min-width: 210px;
  box-shadow: 5px 5px 0 var(--ink);
  font-size: 17px;
}

.simpleStartCard {
  position: relative;
  z-index: 1;
  max-width: 560px;
  padding: 22px;
  display: grid;
  gap: 12px;
  background: var(--paper);
  border: 2px solid var(--ink);
  border-radius: 18px;
  box-shadow: 7px 7px 0 var(--ink);
}
.simpleStartCard label,
.simpleSearch > span {
  font-size: 14px;
  font-weight: 800;
}
.simpleStartCard select,
.simpleSearch input,
.simpleShareInput {
  width: 100%;
  min-height: 50px;
  padding: 11px 13px;
  background: var(--white);
  color: var(--ink);
  border: 1.5px solid var(--line);
  border-radius: 10px;
}

.simplePrimary,
.simpleSecondary {
  min-height: 48px;
  padding: 11px 18px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 800;
  transition: transform 140ms ease, background 140ms ease;
}
.simplePrimary {
  background: var(--accent);
  color: var(--white);
  border: 2px solid var(--accent);
}
.simplePrimary:hover { background: var(--accent-dark); border-color: var(--accent-dark); }
.simplePrimary:disabled {
  background: #91a3a5;
  border-color: #91a3a5;
  cursor: not-allowed;
}
.simpleSecondary {
  background: transparent;
  color: var(--ink);
  border: 2px solid var(--ink);
}
.simpleSecondary:hover { background: var(--ink); color: var(--white); }
.simplePrimary:not(:disabled):active,
.simpleSecondary:active { transform: translateY(1px); }
.simpleFull { width: 100%; }

.simpleStartOptions {
  max-width: 560px;
  margin-top: 0;
  display: grid;
  gap: 10px;
}
.simpleExample {
  width: 100%;
  padding: 17px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  background: transparent;
  color: var(--ink);
  border: 1.5px solid rgba(25, 48, 54, 0.35);
  border-radius: 14px;
  cursor: pointer;
  text-align: left;
}
.simpleTalksEntry {
  padding: 22px;
  background: var(--ink);
  color: var(--white);
  border: 2px solid var(--ink);
  box-shadow: 6px 6px 0 var(--accent);
}
.simpleExample:hover { background: rgba(255, 255, 255, 0.45); }
.simpleTalksEntry:hover { background: #27434a; }
.simpleExample > span:first-child {
  display: grid;
  color: var(--ink-soft);
  font-size: 13px;
}
.simpleExample strong { color: var(--ink); font-size: 15px; }
.simpleExample.simpleTalksEntry > span:first-child,
.simpleExample.simpleTalksEntry strong { color: var(--white); }
.simpleExample.simpleTalksEntry > span:first-child {
  gap: 4px;
  font-size: 14px;
  line-height: 1.45;
}
.simpleExample.simpleTalksEntry strong { font-size: 20px; }
.simpleExample > span:last-child {
  flex: none;
  font-size: 13px;
  font-weight: 800;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.simpleExample.simpleTalksEntry > span:last-child {
  padding: 10px 16px;
  background: var(--accent);
  color: var(--white);
  border-radius: 999px;
  font-size: 15px;
  text-decoration: none;
}
.simpleChoiceDivider {
  max-width: 560px;
  min-height: 18px;
  margin: calc((var(--start-box-gap) - 18px) / 2) 0;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.simpleChoiceDivider::before,
.simpleChoiceDivider::after {
  height: 1px;
  flex: 1;
  background: rgba(25, 48, 54, 0.28);
  content: "";
}
.simpleApp .simpleIndependence {
  position: relative;
  z-index: 2;
  max-width: 560px;
  margin: var(--start-box-gap) 0 0;
  padding: 12px 14px;
  background: var(--white);
  color: var(--ink-soft);
  border: 1.5px solid var(--line);
  border-radius: 12px;
  font-size: 12px;
  line-height: 1.5;
}

.simpleTalks,
.simpleBuild,
.simpleResult { padding: 54px 0 90px; }
.simplePageHead { margin-bottom: 30px; }
.simplePageHead > p:last-child {
  max-width: 650px;
  color: var(--ink-soft);
  font-size: 18px;
}
.simpleBuild .simplePageHead > h1 { font-size: clamp(38px, 7vw, 64px); }

.simpleTalks .simplePageHead > h1 { font-size: clamp(42px, 8vw, 70px); }
.simpleTalksHomeActions {
  margin: -8px 0 30px;
  display: flex;
  align-items: center;
  gap: 18px;
}
.simpleTalksHomeActions > span {
  color: var(--ink-soft);
  font-size: 13px;
  font-weight: 700;
}
.simpleTalksNotice {
  margin-bottom: 20px;
  padding: 16px 18px;
  display: grid;
  gap: 3px;
  background: var(--paper);
  border-left: 5px solid var(--accent);
  border-radius: 0 12px 12px 0;
}
.simpleTalksNotice span {
  color: var(--ink-soft);
  font-size: 13px;
}
.simpleTalkGrid {
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.simpleTalkCard {
  min-height: 190px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--paper);
  color: var(--ink);
  border: 1.5px solid var(--line);
  border-radius: 16px;
  cursor: pointer;
  text-align: left;
}
.simpleTalkCard:hover {
  background: var(--white);
  border-color: var(--ink);
  transform: translateY(-1px);
}
.simpleTalkCard > strong {
  margin: 6px 0;
  font-size: 21px;
  line-height: 1.15;
}
.simpleTalkRegion,
.simpleTalkMeta {
  color: var(--ink-soft);
  font-size: 12px;
}
.simpleTalkRegion {
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.simpleTalkMembers {
  margin-bottom: 18px;
  color: var(--ink-soft);
  font-size: 13px;
  line-height: 1.4;
}
.simpleTalkMeta {
  margin-top: auto;
  font-weight: 700;
}
.simpleTalkNote {
  margin-top: 10px;
  color: var(--ink-soft);
  font-size: 11px;
  line-height: 1.45;
}
.simpleExploring {
  margin: 4px 0 22px;
  padding: 16px 18px;
  background: rgba(255, 255, 255, 0.5);
  border: 1.5px solid var(--line);
  border-radius: 14px;
}
.simpleExploring summary {
  cursor: pointer;
  font-weight: 800;
}
.simpleExploring > div {
  margin-top: 15px;
  display: grid;
  gap: 12px;
}
.simpleExploringIntro,
.simpleExploringSource {
  margin: 0;
  color: var(--ink-soft);
  font-size: 13px;
  line-height: 1.55;
}
.simpleExploringSource {
  padding-top: 12px;
  border-top: 1px solid var(--line);
}
.simpleExploringSource a {
  font-weight: 800;
}
.simpleStatusRegions {
  display: grid;
  gap: 8px;
}
.simpleStatusRegion {
  border-top: 1px solid var(--line);
}
.simpleStatusRegion > h3 {
  margin: 0;
  padding: 11px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-size: 15px;
}
.simpleStatusRegionCount {
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 700;
}
.simpleStatusRegion > div {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 18px;
}
.simpleStatusRegion .simpleExploringCouncil:first-child {
  border-top: 0;
}
.simpleExploringCouncil {
  width: 100%;
  padding-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: transparent;
  color: var(--ink);
  border-top: 1px solid var(--line);
  border-right: 0;
  border-bottom: 0;
  border-left: 0;
  cursor: pointer;
  font: inherit;
  text-align: left;
}
.simpleExploringCouncil:hover strong {
  text-decoration: underline;
  text-underline-offset: 3px;
}
.simpleExploringCouncil > span:first-child {
  display: grid;
  gap: 3px;
}
.simpleExploringCouncil > span:first-child > span {
  color: var(--ink-soft);
  font-size: 13px;
  line-height: 1.45;
}
.simpleExploringCouncil > span:last-child {
  flex: none;
  color: var(--accent);
  font-size: 12px;
  font-weight: 800;
}
.simpleOutsideHeadStart {
  border-left: 5px solid var(--accent);
}
@media (max-width: 720px) {
  .simpleStatusRegion > div {
    grid-template-columns: 1fr;
  }
}
.simpleHeadStartWarning {
  margin: 0 0 18px;
  padding: 14px 16px;
  display: grid;
  gap: 3px;
  background: var(--paper);
  border: 1.5px solid var(--line);
  border-left: 5px solid var(--accent);
  border-radius: 12px;
}
.simpleHeadStartWarning span {
  color: var(--ink-soft);
  font-size: 13px;
  line-height: 1.5;
}

.simpleHomeSummary {
  max-width: 680px;
  margin: 42px 0 0;
  padding: 22px;
  background: var(--paper);
  border: 1.5px solid var(--line);
  border-radius: 16px;
}
.simpleHomeSummary h2 {
  margin-bottom: 10px;
  font-size: 22px;
  letter-spacing: -0.02em;
}
.simpleHomeSummary p,
.simpleHomeSummary li {
  color: var(--ink-soft);
  font-size: 14px;
  line-height: 1.55;
}
.simpleHomeSummary p { margin-bottom: 12px; }
.simpleHomeSummary ul {
  margin: 0 0 14px;
  padding-left: 22px;
}
.simpleHomeSummaryLinks {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
}
.simpleHomeSummaryLinks a {
  font-size: 14px;
  font-weight: 800;
  text-underline-offset: 4px;
}
.simpleHomeDetail {
  margin-top: 26px;
  padding-top: 24px;
  border-top: 1px solid #dce4e5;
}
.simpleHomeDetail h2 {
  margin-bottom: 10px;
}
.simpleHomeDetail h3 {
  margin: 18px 0 5px;
  font-size: 15px;
}
.simpleHomeDetail ol {
  margin: 0 0 14px;
  padding-left: 22px;
}
.simpleHomeDetail a {
  color: var(--ink);
  font-weight: 700;
  text-underline-offset: 3px;
}

.simpleCrossRegion {
  margin: -8px 0 18px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: var(--paper);
  border: 1.5px solid var(--line);
  border-radius: 14px;
}
.simpleCrossRegion > div { display: grid; }
.simpleCrossRegion > div span {
  color: var(--ink-soft);
  font-size: 13px;
}
.simpleCrossRegion .simpleSecondary {
  min-height: 42px;
  flex: none;
  padding: 8px 15px;
  font-size: 13px;
}
.simpleCrossRegionActive {
  border-left: 5px solid var(--accent);
}

.simpleSearch {
  margin-bottom: 18px;
  display: grid;
  gap: 7px;
}
.simpleCouncilList {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}
.simpleCouncil {
  min-height: 84px;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.62);
  border: 1.5px solid var(--line);
  border-radius: 14px;
  cursor: pointer;
}
.simpleCouncil:hover { background: var(--white); border-color: var(--ink); }
.simpleCouncilSelected {
  background: var(--paper);
  border: 2px solid var(--ink);
  box-shadow: inset 0 0 0 2px var(--paper);
}
.simpleCouncil input {
  width: 24px;
  height: 24px;
  flex: none;
  accent-color: var(--accent);
}
.simpleCouncilCopy { min-width: 0; display: grid; }
.simpleCouncilCopy strong {
  overflow: hidden;
  font-size: 16px;
  line-height: 1.25;
  text-overflow: ellipsis;
}
.simpleCouncilCopy span {
  color: var(--ink-soft);
  font-size: 13px;
}
.simpleCouncilCopy .simpleCouncilRelation {
  margin-top: 4px;
  color: var(--accent-dark);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.simpleGeoChoices {
  display: grid;
  gap: 24px;
}
.simpleSelectedZone,
.simpleNearbyZone,
.simpleDistantZone {
  padding: 20px;
  border-radius: 18px;
}
.simpleSelectedZone {
  background: var(--ink);
  color: var(--white);
}
.simpleSelectedZone h2 {
  margin: 0 0 12px;
  font-size: 18px;
}
.simpleSelectedZone .simpleCouncil {
  background: var(--paper);
  color: var(--ink);
}
.simpleNearbyZone {
  background: #edf6f0;
  border: 2px solid var(--good);
}
.simpleNearbyZone .simpleEyebrow { color: var(--good); }
.simpleDistantZone {
  background: rgba(255, 255, 255, 0.42);
  border: 2px solid var(--ink);
}
.simpleDistantZone .simpleEyebrow { color: var(--ink); }
.simpleZoneHead {
  margin-bottom: 18px;
}
.simpleZoneHead h2 {
  margin: 0 0 5px;
  font-size: clamp(26px, 4vw, 34px);
  line-height: 1.1;
}
.simpleZoneHead > p:last-child {
  margin: 0;
  color: var(--ink-soft);
  font-size: 13px;
}
.simpleNearbyRegion + .simpleNearbyRegion { margin-top: 20px; }
.simpleNearbyRegion h3 {
  margin: 0 0 9px;
  font-size: 14px;
  letter-spacing: 0.04em;
}
.simpleDistantRegions {
  display: grid;
  gap: 8px;
}
.simpleDistantRegion {
  overflow: hidden;
  background: var(--paper);
  border: 1.5px solid var(--line);
  border-radius: 12px;
}
.simpleDistantRegion summary {
  padding: 13px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  cursor: pointer;
  font-weight: 800;
  list-style-position: inside;
}
.simpleDistantRegion summary span:last-child {
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 700;
}
.simpleDistantRegion[open] summary {
  border-bottom: 1px solid var(--line);
}
.simpleDistantRegion .simpleCouncilList {
  padding: 12px;
}
.simpleBuildActions,
.simpleEndActions {
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.simpleEmpty {
  padding: 20px;
  color: var(--ink-soft);
  text-align: center;
}

.simpleResultHead {
  padding-bottom: 30px;
  border-bottom: 2px solid var(--ink);
}
.simpleTalkOrigin {
  margin-bottom: 18px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  background: var(--paper);
  border: 1.5px solid var(--line);
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
}
.simpleResultHead .simpleOverline { margin-top: 28px; }
.simpleResultHead > h1 { margin-bottom: 10px; }
.simpleResultHead > p:last-of-type {
  max-width: 720px;
  font-size: 16px;
}
.simpleNameActions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.simpleDisclosure summary {
  cursor: pointer;
  font-size: 13px;
  font-weight: 800;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.simpleNameChooser {
  margin: 18px 0 0;
  padding: 0;
  border: 0;
}
.simpleNameChooser legend {
  margin-bottom: 8px;
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.simpleNameChooser > div {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.simpleNameChoice {
  padding: 8px 13px;
  background: var(--white);
  color: var(--ink);
  border: 1.5px solid var(--line);
  border-radius: 999px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
}
.simpleNameChoice:hover {
  border-color: var(--ink);
}
.simpleNameChoiceSelected {
  background: var(--ink);
  color: var(--white);
  border-color: var(--ink);
}

.simpleStats {
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: var(--ink);
  color: var(--white);
  border-radius: 16px;
  overflow: hidden;
}
.simpleStats > div {
  padding: 20px;
  display: grid;
  gap: 3px;
  border-right: 1px solid rgba(255, 255, 255, 0.18);
}
.simpleStats > div:last-child { border-right: 0; }
.simpleStats span { font-size: 12px; opacity: 0.75; }
.simpleStats strong { font-size: clamp(20px, 4vw, 30px); line-height: 1.1; }

.simplePanel,
.simpleSharePanel {
  margin-top: 18px;
  padding: clamp(20px, 4vw, 30px);
  background: var(--paper);
  border: 1.5px solid var(--line);
  border-radius: 18px;
}
.simplePanel h2,
.simpleSharePanel h2 {
  margin-bottom: 12px;
  font-size: clamp(24px, 4vw, 34px);
  line-height: 1.08;
  letter-spacing: -0.025em;
}
.simplePanelHead {
  display: flex;
  justify-content: space-between;
  gap: 24px;
}
.simpleBlend {
  flex: none;
  display: grid;
  text-align: right;
  font-size: 12px;
  color: var(--ink-soft);
}
.simpleBlend strong { color: var(--ink); font-size: 28px; line-height: 1.1; }
.simpleAnswer {
  max-width: 650px;
  margin-bottom: 20px;
  font-size: 18px;
}
.simpleRepresentation {
  border-color: rgba(25, 48, 54, 0.34);
}
.simpleRepresentationHead {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 28px;
}
.simpleRepresentationHead .simpleAnswer {
  margin-bottom: 0;
}
.simpleRegionalAssumption {
  margin-top: 22px;
  padding: 15px 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: rgba(217, 71, 32, 0.07);
  border-left: 5px solid var(--accent);
  border-radius: 0 12px 12px 0;
  cursor: pointer;
}
.simpleRegionalAssumption input {
  width: 19px;
  height: 19px;
  margin: 2px 0 0;
  flex: none;
  accent-color: var(--accent-dark);
}
.simpleRegionalAssumption > span {
  display: grid;
  gap: 3px;
}
.simpleRegionalAssumption strong { color: var(--ink); }
.simpleRegionalAssumption small {
  max-width: 72ch;
  color: var(--ink-soft);
  font-size: 12px;
  line-height: 1.45;
}
.simpleCouncilSize {
  min-width: 250px;
  display: grid;
  gap: 7px;
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 700;
}
.simpleCouncilSize > span {
  color: var(--ink);
  font-size: 13px;
  font-weight: 800;
}
.simpleCouncilSize > div {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow: hidden;
  border: 1.5px solid var(--ink);
  border-radius: 10px;
}
.simpleSizeChoice {
  min-height: 40px;
  padding: 8px 14px;
  background: var(--white);
  color: var(--ink);
  border: 0;
  border-right: 1px solid var(--line);
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 800;
}
.simpleSizeChoice:last-child { border-right: 0; }
.simpleSizeChoice:hover { background: rgba(217, 71, 32, 0.08); }
.simpleSizeChoiceSelected {
  background: var(--accent);
  color: var(--white);
}
.simpleSizeChoiceSelected:hover { background: var(--accent-dark); }
.simpleRepresentationStats {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 2px solid var(--ink);
  border-bottom: 1px solid var(--line);
}
.simpleRepresentationStats > div {
  min-width: 0;
  padding: 18px 18px 18px 0;
  display: grid;
  gap: 3px;
  border-right: 1px solid var(--line);
}
.simpleRepresentationStats > div + div { padding-left: 18px; }
.simpleRepresentationStats > div:last-child { border-right: 0; }
.simpleRepresentationStats span,
.simpleRepresentationStats small {
  color: var(--ink-soft);
  font-size: 12px;
}
.simpleRepresentationStats strong {
  color: var(--ink);
  font-size: clamp(30px, 5vw, 44px);
  line-height: 1;
}
.simpleRepresentationStats .simpleRepresentationChange strong {
  color: var(--accent-dark);
}
.simpleBeforeAfter {
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}
.simpleBeforeAfter section {
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 12px;
}
.simpleBeforeAfter section:last-child {
  border-color: rgba(217, 71, 32, 0.45);
  background: rgba(217, 71, 32, 0.055);
}
.simpleBeforeAfter h3 { margin: 0 0 12px; font-size: 18px; }
.simpleBeforeAfter section > div {
  min-height: 45px;
  padding-top: 10px;
  margin-top: 10px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 18px;
  border-top: 1px solid var(--line);
}
.simpleBeforeAfter span {
  color: var(--ink-soft);
  font-size: 13px;
  font-weight: 700;
}
.simpleBeforeAfter strong {
  color: var(--ink);
  font-size: 30px;
  line-height: 1;
}
.simpleRepresentationBars {
  margin-top: 22px;
  display: grid;
  gap: 20px;
}
.simpleRepresentationBarRow {
  display: grid;
  grid-template-columns: minmax(210px, 0.8fr) minmax(180px, 1.2fr) 48px;
  align-items: center;
  gap: 18px;
}
.simpleRepresentationBarCopy {
  min-width: 0;
  display: grid;
  gap: 3px;
}
.simpleRepresentationBarCopy > strong { font-size: 16px; }
.simpleRepresentationBarCopy > span {
  color: var(--ink-soft);
  font-size: 12px;
  line-height: 1.45;
}
.simpleRepresentationBarTrack {
  height: 22px;
  overflow: hidden;
  border-radius: 6px;
  background: rgba(25, 48, 54, 0.1);
}
.simpleRepresentationBar {
  height: 100%;
  min-width: 2px;
  display: flex;
  overflow: hidden;
  border-radius: inherit;
}
.simpleRepresentationSegment { display: block; height: 100%; }
.simpleRepresentationElected { background: var(--ink); }
.simpleRepresentationCommunity { background: var(--accent); }
.simpleRepresentationMayors { background: #d39a27; }
.simpleRepresentationBarTotal {
  color: var(--ink);
  font-size: 26px;
  text-align: right;
}
.simpleCommunitySummary {
  margin: 18px 0 6px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.simpleCommunitySummary > div {
  min-width: 0;
  padding: 14px;
  display: grid;
  gap: 4px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: rgba(217, 71, 32, 0.055);
}
.simpleCommunitySummary span,
.simpleCommunitySummary small {
  color: var(--ink-soft);
  font-size: 12px;
}
.simpleCommunitySummary strong {
  color: var(--ink);
  font-size: 28px;
  line-height: 1;
}
.simpleCommunityTable { margin-top: 16px; }
.simpleRepresentationRatio {
  padding: 18px 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid var(--line);
}
.simpleRepresentationRatio > span {
  color: var(--ink-soft);
  font-size: 13px;
  font-weight: 700;
}
.simpleRepresentationRatio strong {
  color: var(--ink);
  font-size: clamp(22px, 4vw, 32px);
  line-height: 1.1;
  white-space: nowrap;
}
.simpleWardTable {
  margin-top: 18px;
  display: grid;
}
.simpleWardHeader,
.simpleWardRow,
.simpleWardTotal {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 92px 160px;
  align-items: center;
  gap: 16px;
}
.simpleWardHeader {
  padding: 0 0 8px;
  color: var(--ink-soft);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.simpleWardHeader span:not(:first-child),
.simpleWardRow strong,
.simpleWardTotal strong {
  text-align: right;
}
.simpleWardRow,
.simpleWardTotal {
  min-height: 44px;
  padding: 8px 0;
  border-top: 1px solid var(--line);
}
.simpleWardRow > span {
  min-width: 0;
  font-weight: 700;
}
.simpleWardRegionalRow {
  background: rgba(217, 71, 32, 0.055);
}
.simpleWardRegionalRow > span {
  padding-left: 10px;
  display: grid;
  gap: 2px;
}
.simpleWardRegionalRow small {
  color: var(--ink-soft);
  font-size: 11px;
  font-weight: 500;
}
.simpleWardRegionalRow strong:last-child {
  color: var(--accent-dark);
  font-size: 12px;
}
.simpleWardTotal {
  border-top: 2px solid var(--ink);
  font-weight: 800;
}
.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.simpleRateChart {
  display: grid;
  gap: 4px;
}
.simpleRateAxis {
  display: grid;
  grid-template-columns: 1fr 1fr;
  color: var(--ink-soft);
  font-size: 11px;
  font-weight: 700;
}
.simpleRateAxis span:first-child {
  padding-right: 9px;
  text-align: right;
}
.simpleRateAxis span:last-child { padding-left: 9px; }
.simpleRateRows {
  display: grid;
  border-top: 1px solid var(--line);
}
.simpleRateRow {
  padding: 14px 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px 18px;
  border-bottom: 1px solid var(--line);
}
.simpleRateCopy { display: grid; }
.simpleRateCopy span {
  color: var(--ink-soft);
  font-size: 13px;
}
.simpleRateRow > strong { text-align: right; }
.simpleRateBar {
  position: relative;
  grid-column: 1 / -1;
  height: 10px;
  overflow: hidden;
  background: rgba(25, 48, 54, 0.09);
  border-radius: 999px;
}
.simpleRateZero {
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 50%;
  border-left: 2px solid rgba(25, 48, 54, 0.48);
}
.simpleRateFill {
  position: absolute;
  top: 0;
  bottom: 0;
}
.simpleRateLess {
  right: 50%;
  background: var(--good);
  border-radius: 999px 0 0 999px;
}
.simpleRateMore {
  left: 50%;
  background: var(--bad);
  border-radius: 0 999px 999px 0;
}
.simpleAssetLower {
  right: 50%;
  background: var(--bad);
  border-radius: 999px 0 0 999px;
}
.simpleAssetHigher {
  left: 50%;
  background: var(--good);
  border-radius: 0 999px 999px 0;
}
.simpleUp { color: var(--bad); }
.simpleDown { color: var(--good); }
.simpleFlat,
.simpleNoData { color: var(--ink-soft); }
.simpleNoData { font-size: 13px; }
.simpleDisclosure {
  margin-top: 18px;
  padding-top: 2px;
}
.simpleDisclosure p {
  max-width: 680px;
  margin: 12px 0 0;
  color: var(--ink-soft);
  font-size: 13px;
}
.simpleMethodLink {
  margin: 14px 0 0;
  font-size: 14px;
  font-weight: 800;
}

.simpleShareBar {
  height: 22px;
  display: flex;
  overflow: hidden;
  background: var(--line);
  border: 2px solid var(--ink);
  border-radius: 999px;
}
.simpleShareBar span { display: block; }
.simpleShareBar span + span { border-left: 2px solid var(--paper); }
.simpleShareLegend {
  margin-top: 10px;
  display: flex;
  gap: 8px 16px;
  flex-wrap: wrap;
  color: var(--ink-soft);
  font-size: 12px;
}
.simpleShareLegend > span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.simpleShareLegendSwatch {
  width: 10px;
  height: 10px;
  flex: none;
  border: 1px solid rgba(25, 48, 54, 0.28);
  border-radius: 2px;
}
.simpleShareLegend strong { color: var(--ink); }
.simpleFinePrint {
  margin: 18px 0 0;
  color: var(--ink-soft);
  font-size: 12px;
}

.simpleSharePanel {
  background: var(--ink);
  color: var(--white);
  border-color: var(--ink);
}
.simpleSharePanel .simpleEyebrow { color: rgba(255, 255, 255, 0.72); }
.simpleSharePanel h2 { color: var(--white); }
.simpleShareHead { display: grid; gap: 4px; }
.simpleShareLead {
  margin: 4px 0 0;
  font-size: 16px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.82);
  max-width: 62ch;
}

.simpleCardPreview {
  margin: 18px 0 0;
  display: grid;
  gap: 8px;
  justify-items: start;
}
.simpleCardPreview img {
  width: 100%;
  max-width: 520px;
  height: auto;
  display: block;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.28);
}
.simpleCardPreview figcaption {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.66);
}

.simpleSocialShare {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
.simpleSocialShare h3 {
  margin: 0;
  font-size: 17px;
  font-weight: 800;
  color: var(--white);
}
.simpleSocialShareButtons {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}
.simpleSocialIconButton {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  padding: 0;
  font: inherit;
  color: var(--white);
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease, transform 120ms ease;
}
.simpleSocialIconButton:hover {
  transform: translateY(-1px);
}
.simpleSocialIconButton:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.72);
  outline-offset: 3px;
}
.simpleLinkedInIconButton {
  background: #0a66c2;
  border-color: #0a66c2;
}
.simpleLinkedInIconButton:hover {
  background: #08529b;
  border-color: #08529b;
}
.simpleFacebookIconButton {
  background: #1877f2;
  border-color: #1877f2;
}
.simpleFacebookIconButton:hover {
  background: #0c5fca;
  border-color: #0c5fca;
}
.simpleXIconButton {
  background: #000000;
  border-color: rgba(255, 255, 255, 0.34);
}
.simpleXIconButton:hover {
  background: #252525;
  border-color: rgba(255, 255, 255, 0.55);
}
.simpleRedditIconButton {
  background: #ff4500;
  border-color: #ff4500;
}
.simpleRedditIconButton:hover {
  background: #d93b00;
  border-color: #d93b00;
}
.simpleCopyLinkIconButton {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.45);
}
.simpleCopyLinkIconButton:hover {
  background: rgba(255, 255, 255, 0.22);
  border-color: rgba(255, 255, 255, 0.72);
}

.simpleShareSecondary {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.simpleShareSecondary button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  font-size: 14px;
  font-weight: 700;
  color: var(--white);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 999px;
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease;
}
.simpleShareSecondary button:hover {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.6);
}
.simpleShareSecondary button:disabled { opacity: 0.55; cursor: default; }
.simpleShareStatus {
  margin: 10px 0 0;
  min-height: 18px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.76);
}
.simpleSharePanel svg {
  width: 18px;
  height: 18px;
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.simpleSharePanel .simpleShareSolid {
  fill: currentColor;
  stroke: none;
}
.simpleFooter {
  max-width: 1120px;
  margin: 0 auto;
  padding: 28px 22px 44px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 26px;
  color: var(--ink-soft);
  border-top: 1px solid rgba(25, 48, 54, 0.24);
  font-size: 12px;
}
.simpleFooter > div { display: grid; }
.simpleFooter strong { color: var(--ink); font-size: 14px; }
.simpleFooter nav { display: flex; gap: 16px; flex-wrap: wrap; }
.simpleFooter a { font-weight: 700; }

.simpleApp button:focus-visible,
.simpleApp input:focus-visible,
.simpleApp select:focus-visible,
.simpleApp summary:focus-visible,
.simpleApp a:focus-visible,
.simpleCouncil:has(input:focus-visible) {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}

@media (max-width: 650px) {
  .simpleHeader { min-height: 58px; padding: 12px 16px; }
  .simpleStart,
  .simpleTalks,
  .simpleBuild,
  .simpleResult { width: min(100% - 24px, 800px); }
  .simpleStart {
    --start-box-gap: 64px;
    justify-content: flex-start;
    padding-top: 40px;
  }
  .simpleStart > h1,
  .simplePageHead > h1 { font-size: clamp(42px, 14vw, 64px); }
  .simpleCouncilList { grid-template-columns: 1fr; }
  .simpleExample {
    align-items: flex-start;
    flex-direction: column;
  }
  .simpleExample.simpleTalksEntry > span:last-child {
    width: 100%;
    text-align: center;
  }
  .simpleCrossRegion {
    align-items: stretch;
    flex-direction: column;
  }
  .simpleCrossRegion .simpleSecondary { width: 100%; }
  .simpleTalkGrid { grid-template-columns: 1fr; }
  .simpleTalksHomeActions {
    align-items: stretch;
    flex-direction: column;
  }
  .simpleTalksHomeActions > span { text-align: center; }
  .simpleTalkCard { min-height: 0; }
  .simpleTalkOrigin {
    align-items: flex-start;
    flex-direction: column;
  }
  .simpleBuildActions {
    align-items: stretch;
    flex-direction: column-reverse;
  }
  .simpleBuildActions button { width: 100%; }
  .simpleStats { grid-template-columns: 1fr; }
  .simpleStats > div {
    grid-template-columns: 1fr auto;
    align-items: baseline;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.18);
  }
  .simpleStats > div:last-child { border-bottom: 0; }
  .simplePanelHead { display: block; }
  .simpleRepresentationHead {
    display: grid;
    gap: 20px;
  }
  .simpleCouncilSize { min-width: 0; }
  .simpleRepresentationStats { grid-template-columns: 1fr; }
  .simpleBeforeAfter { grid-template-columns: 1fr; }
  .simpleRepresentationBarRow {
    grid-template-columns: minmax(0, 1fr) 44px;
    gap: 10px;
  }
  .simpleRepresentationBarCopy { grid-column: 1 / -1; }
  .simpleCommunitySummary { grid-template-columns: 1fr; }
  .simpleRepresentationStats > div {
    padding: 15px 0;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }
  .simpleRepresentationStats > div + div { padding-left: 0; }
  .simpleRepresentationStats > div:last-child { border-bottom: 0; }
  .simpleRepresentationRatio {
    align-items: flex-start;
    flex-direction: column;
    gap: 7px;
  }
  .simpleWardHeader,
  .simpleWardRow,
  .simpleWardTotal {
    grid-template-columns: minmax(0, 1fr) 58px 78px;
    gap: 9px;
  }
  .simpleWardHeader {
    font-size: 9px;
    letter-spacing: 0;
  }
  .simpleBlend {
    margin-bottom: 20px;
    display: flex;
    align-items: baseline;
    gap: 7px;
    text-align: left;
  }
  .simpleRateRow { align-items: flex-start; }
  .simpleRateRow > strong { max-width: 145px; }
  .simpleAssetRow { grid-template-columns: 1fr; }
  .simpleAssetRow > strong {
    max-width: none;
    text-align: left;
  }
  .simpleFooter { flex-direction: column; }
}

@media (prefers-reduced-motion: reduce) {
  .simpleApp * { scroll-behavior: auto !important; transition: none !important; }
}
`;zd(document.getElementById("root")).render(o.jsx(W.StrictMode,{children:o.jsx(mm,{})}));
