import{S as k,i as $,s as b,x as d,g as f,A as P,h as c,B as j,t as _,f as p,C as q,k as v,u as C,v as y,w as S,c as B,d as D,m as L,j as z,e as x,a as A,D as N,r as w,n as M}from"./index.475b1a21.js";import{t as E}from"./theme.30268315.js";import"./index.81f7e245.js";const F=o=>({}),h=o=>({}),G=o=>({}),g=o=>({});function H(o){let e;const n=o[2].light,t=v(n,o,o[1],h);return{c(){t&&t.c()},l(s){t&&t.l(s)},m(s,r){t&&t.m(s,r),e=!0},p(s,r){t&&t.p&&(!e||r&2)&&C(t,n,s,s[1],e?S(n,s[1],r,F):y(s[1]),h)},i(s){e||(_(t,s),e=!0)},o(s){c(t,s),e=!1},d(s){t&&t.d(s)}}}function I(o){let e;const n=o[2].dark,t=v(n,o,o[1],g);return{c(){t&&t.c()},l(s){t&&t.l(s)},m(s,r){t&&t.m(s,r),e=!0},p(s,r){t&&t.p&&(!e||r&2)&&C(t,n,s,s[1],e?S(n,s[1],r,G):y(s[1]),g)},i(s){e||(_(t,s),e=!0)},o(s){c(t,s),e=!1},d(s){t&&t.d(s)}}}function J(o){let e,n,t,s;const r=[I,H],a=[];function m(l,i){return l[0]==="dark"?0:1}return e=m(o),n=a[e]=r[e](o),{c(){n.c(),t=d()},l(l){n.l(l),t=d()},m(l,i){a[e].m(l,i),f(l,t,i),s=!0},p(l,[i]){let u=e;e=m(l),e===u?a[e].p(l,i):(P(),c(a[u],1,1,()=>{a[u]=null}),j(),n=a[e],n?n.p(l,i):(n=a[e]=r[e](l),n.c()),_(n,1),n.m(t.parentNode,t))},i(l){s||(_(n),s=!0)},o(l){c(n),s=!1},d(l){l&&p(t),a[e].d(l)}}}function K(o,e,n){let t;q(o,E,a=>n(0,t=a));let{$$slots:s={},$$scope:r}=e;return o.$$set=a=>{"$$scope"in a&&n(1,r=a.$$scope)},[t,r,s]}class O extends k{constructor(e){super(),$(this,e,K,J,b,{})}}function Q(o){let e,n="(dark)";return{c(){e=x("span"),e.textContent=n,this.h()},l(t){e=A(t,"SPAN",{slot:!0,"data-svelte-h":!0}),N(e)!=="svelte-14ov3lc"&&(e.textContent=n),this.h()},h(){w(e,"slot","dark")},m(t,s){f(t,e,s)},p:M,d(t){t&&p(e)}}}function R(o){let e,n="(light)";return{c(){e=x("span"),e.textContent=n,this.h()},l(t){e=A(t,"SPAN",{slot:!0,"data-svelte-h":!0}),N(e)!=="svelte-1fh1ua8"&&(e.textContent=n),this.h()},h(){w(e,"slot","light")},m(t,s){f(t,e,s)},p:M,d(t){t&&p(e)}}}function T(o){let e,n;return e=new O({props:{$$slots:{light:[R],dark:[Q]},$$scope:{ctx:o}}}),{c(){B(e.$$.fragment)},l(t){D(e.$$.fragment,t)},m(t,s){L(e,t,s),n=!0},p(t,[s]){const r={};s&1&&(r.$$scope={dirty:s,ctx:t}),e.$set(r)},i(t){n||(_(e.$$.fragment,t),n=!0)},o(t){c(e.$$.fragment,t),n=!1},d(t){z(e,t)}}}class X extends k{constructor(e){super(),$(this,e,null,T,b,{})}}export{X as default};
