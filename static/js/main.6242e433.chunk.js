(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{130:function(e,t){},132:function(e,t){},142:function(e,t){},144:function(e,t){},171:function(e,t){},173:function(e,t){},174:function(e,t){},179:function(e,t){},181:function(e,t){},200:function(e,t){},212:function(e,t){},215:function(e,t){},219:function(e,t,n){},220:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(1),a=n.n(c),s=n(6),i=n(5),o=n.n(i),u=n(116),l=n.n(u),f=n(7),p=n.p+"static/media/skill.23054f65.svg",d=n.p+"static/media/plus.a86e5868.svg",h=n.p+"static/media/book.65cd22a3.svg",j=n.p+"static/media/settings.d2739024.svg",b=n(222),g=n(17),m="2ac3ij97dhtkag9fljdsuo1203",O="us-east-1_tRcA2uwF6",x=null,w=new g.e({UserPoolId:O,ClientId:m}),v=null,y=null,k=null,S=function(e){return new Promise((function(t,n){try{x=new g.a({Username:e,ClientMetadata:{phoneNumber:e}}),v=new g.c({Username:e,Pool:w}),t()}catch(r){n(r)}}))},C=function(){return new Promise((function(e,t){try{v=w.getCurrentUser(),e()}catch(n){t(n)}}))},T=function(){return new Promise((function(e,t){try{if(!v)throw"Cognito user must be defined to get access token";v.getSession((function(n,r){if(n)return t(n);y=r.getAccessToken().getJwtToken(),k=new g.b({RefreshToken:r.getRefreshToken().getToken()}),console.log("access token retrieved"),e()}))}catch(n){t(n)}}))},N=function(){var e=Object(s.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(s.a)(a.a.mark((function e(t,n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v.signOut();case 3:t(),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),n(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t,n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),I=function(){var e=Object(s.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(s.a)(a.a.mark((function e(n,r){var c,s,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c=new g.d({Name:"phone_number",Value:t}),s=new g.d({Name:"custom:custom:id",Value:Object(b.a)()}),i=[c,s],w.signUp(t,Object(b.a)(),i,null,(function(e,t){if(e)return r(e);v=t.user,n()}));case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),F=function(e,t,n){return new Promise(function(){var r=Object(s.a)(a.a.mark((function r(c,s){return a.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,S(e);case 2:v.setAuthenticationFlowType("CUSTOM_CHALLENGE"),console.log(v,x),v.initiateAuth(x,{onSuccess:function(e){return c(e)},onFailure:function(e){return s(e)},customChallenge:function(e){var r=this;n(),t((function(e){return v.sendCustomChallengeAnswer(e,r)}))}});case 5:case"end":return r.stop()}}),r)})));return function(e,t){return r.apply(this,arguments)}}())},A={get get(){return function(){return fetch("https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/entries",{method:"get",headers:new Headers({"x-amz-access-token":y})})}},get post(){return function(e){return fetch("https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/entries",{method:"post",headers:new Headers({"x-amz-access-token":y,"Content-Type":"application/json"}),body:JSON.stringify(e)})}}},J={get get(){return function(){return fetch("https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/skills",{method:"get",headers:new Headers({"x-amz-access-token":y})})}},get post(){return function(e){return fetch("https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/skills",{method:"post",headers:new Headers({"x-amz-access-token":y,"Content-Type":"application/json"}),body:JSON.stringify(e)})}}};var P=n(10),D=n(34);var E=["January","February","March","April","May","June","July","August","September","October","November","December"],q=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],M=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;return"".concat(q[e.getDay()],", ").concat(E[e.getMonth()]," ").concat(e.getDate())},z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;return"".concat(e.getHours()%12||12,":").concat("0".concat(e.getMinutes()).slice(-2)," ").concat(e.getHours()>11?"pm":"am")};var R=function(e){var t=e.display,n=e.freeze,c=e.settings,o=e.createEntry,u=c.getSetting,l=Object(i.useState)(new Date),p=Object(f.a)(l,2),d=p[0],h=p[1],j=Object(i.useRef)(),b=Object(i.useRef)(),g=function(){var e=Object(s.a)(a.a.mark((function e(){var t,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n(),r={start:d,end:new Date,entryType:u("freeform")?"freeform":"questions"},e.prev=2,"questions"===r.entryType?(r.questions=Array.from(j.current.querySelectorAll("b")).map((function(e){return e.innerText})),r.answers=Array.from(j.current.querySelectorAll("div")).map((function(e){return e.innerText}))):r.freeform=b.current.innerText,e.next=6,o(r);case 6:h(new Date),"freeform"!==r.entryType&&Array.from(j.current.querySelectorAll("div")).map((function(e){return e.innerText="..."})),"freeform"===r.entryType&&(b.current.innerText="Write your entry here!"),t(),e.next=17;break;case 12:e.prev=12,e.t0=e.catch(2),"freeform"!==r.entryType&&Array.from(j.current.querySelectorAll("div")).map((function(e){return e.innerText="..."})),"freeform"===r.entryType&&(b.current.innerText="Write your entry here!"),t();case 17:case"end":return e.stop()}}),e,null,[[2,12]])})));return function(){return e.apply(this,arguments)}}();return Object(r.jsxs)("main",{style:{display:t},children:[Object(r.jsx)("h2",{children:M()}),Object(r.jsx)("h3",{children:z(d)}),!u("freeform")&&Object(r.jsxs)("div",{ref:j,className:"questions",children:[Object(r.jsx)("b",{children:"What have I done today?"}),Object(r.jsx)("div",{contentEditable:!0,children:"..."}),Object(r.jsx)("b",{children:"How do I feel?"}),Object(r.jsx)("div",{contentEditable:!0,children:"..."}),Object(r.jsx)("b",{children:"What else am I going to do?"}),Object(r.jsx)("div",{contentEditable:!0,children:"..."})]}),u("freeform")&&Object(r.jsx)("div",{contentEditable:!0,ref:b,children:"Write your entry here!"}),Object(r.jsx)("button",{onClick:g,children:"Complete"})]})},H=n(118),W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;return"".concat(e.getHours()%12||12,":").concat("0".concat(e.getMinutes()).slice(-2)," ").concat(e.getHours()>11?"pm":"am")},U=function(e){var t=e.date,n=e.isOpen,c=e.open,a=e.close;return n?Object(r.jsxs)("header",{className:"entry-header",children:[Object(r.jsx)("span",{onClick:a,children:"x"}),Object(r.jsx)("h2",{children:t})]}):Object(r.jsxs)("header",{className:"entry-header",children:[Object(r.jsx)("span",{onClick:c,children:"more"}),Object(r.jsx)("h2",{children:t})]})},L=function(e){var t=e.entries,n=e.open;return t.map((function(e){return n?Object(r.jsxs)("section",{children:[Object(r.jsx)("h3",{children:W(e.start)}),"freeform"!==e.entryType&&e.questions.map((function(t,n){return Object(r.jsx)("section",{children:Object(r.jsxs)("p",{children:[Object(r.jsxs)("b",{children:[t," "]}),e.answers[n]]})})})),"freeform"===e.entryType&&Object(r.jsx)("section",{children:Object(r.jsx)("p",{children:e.freeform})})]},"entry-".concat(e.id)):Object(r.jsx)("div",{})}))};var _=function(e){var t=e.display,n=e.entries,c=Object(i.useState)([]),a=Object(f.a)(c,2),s=a[0],o=a[1];return Object(r.jsx)("main",{style:{display:t},children:n.map((function(e){return Object(r.jsxs)("article",{children:[Object(r.jsx)(U,{date:e.meta.date,isOpen:-1!==s.indexOf(e.date),open:function(){o((function(t){return[].concat(Object(H.a)(t),[e.date])}))},close:function(){o((function(t){return t.filter((function(t){return t!==e.date}))}))},index:e}),Object(r.jsx)(L,{open:-1!==s.indexOf(e.date),entries:e.list})]},"index-".concat(e.date))}))})},V=n.p+"static/media/pen.27ec406e.svg";var G=function(e){var t=e.display,n=e.skills,c=e.submitSkill,o=Object(i.useState)("reference"),u=Object(f.a)(o,2),l=u[0],p=u[1],d=Object(i.useRef)(),h=Object(i.useRef)(),j=function(){var e=Object(s.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c({category:d.current.value,skill:h.current.innerText});case 3:e.next=7;break;case 5:e.prev=5,e.t0=e.catch(0);case 7:p("reference");case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(){return e.apply(this,arguments)}}();return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("datalist",{id:"skills-categories",children:n.map((function(e){return Object(r.jsx)("option",{children:e.meta.category})}))}),Object(r.jsxs)("main",{style:{display:"edit"===l?t:"none"},children:[Object(r.jsx)("h2",{children:"New Skill"}),Object(r.jsxs)("div",{children:["Category: ",Object(r.jsx)("input",{list:"skills-categories",ref:d,defaultValue:"Tools For"})]}),Object(r.jsxs)("div",{children:["Skill: ",Object(r.jsx)("p",{style:{padding:7.5},ref:h,contentEditable:!0,children:"..."})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("button",{onClick:j,children:"Add Skill"}),Object(r.jsx)("button",{onClick:function(){p("reference")},children:"Cancel"})]})]}),Object(r.jsxs)("main",{style:{display:"reference"===l?t:"none"},children:[Object(r.jsx)("span",{onClick:function(){p("edit")},style:{height:64,display:"grid",alignItems:"center",justifyContent:"center"},children:Object(r.jsx)("img",{src:V,width:24,height:24})}),n.map((function(e){return Object(r.jsxs)("section",{children:[Object(r.jsx)("h2",{children:e.meta.category}),Object(r.jsx)("ul",{children:e.list.map((function(e){return Object(r.jsx)("li",{children:e.skill})}))})]})}))]})]})},Z={"calendar.svg":'<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>',"pen.svg":'Icons made by <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26">Icongeek26</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',"book.svg":'Icons made by <a href="https://www.flaticon.com/authors/zlatko-najdenovski" title="Zlatko Najdenovski">Zlatko Najdenovski</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',"plus.svg":'Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',"list.svg":'Icons made by <a href="https://www.flaticon.com/authors/phatplus" title="phatplus">phatplus</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',"skill.svg":'Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',"settings.svg":'Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>'};function B(e){var t=e.setting,n=e.title,c=e.toggle,a=e.getSetting;return Object(r.jsxs)("div",{className:"setting",children:[Object(r.jsx)("div",{children:n}),Object(r.jsx)("div",{children:Object(r.jsx)("span",{onClick:c(t),className:a(t)?"toggle on":"toggle"})})]})}var Y=function(e){var t=e.settings,n=e.swStatus,c=e.install,a=e.display,s=e.logout;return Object(r.jsxs)("main",{className:"settings",style:{display:a},children:[Object(r.jsx)(B,Object(D.a)({setting:"freeform",title:"Enable Freeform"},t)),!n&&Object(r.jsx)("div",{className:"action",children:Object(r.jsx)("span",{onClick:c,children:"Install!"})}),Object(r.jsx)("div",{className:"action",children:Object(r.jsx)("span",{onClick:s,children:"Log Out"})}),Object(r.jsxs)("div",{id:"attributions",children:[Object(r.jsx)("h2",{children:"Attributions"}),Object(r.jsx)("ul",{children:Object.keys(Z).map((function(e){return Object(r.jsx)("li",{dangerouslySetInnerHTML:{__html:Z[e]}},"attribiution-".concat(e))}))})]})]})},K=function(e,t,n){var r,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},a=e.filter((function(e){return e[t]===n}));if(a.length>0)return a[0].list;var s=(r={},Object(P.a)(r,t,n),Object(P.a)(r,"meta",c),Object(P.a)(r,"list",[]),r);return e.push(s),s.list};var Q=["January","February","March","April","May","June","July","August","September","October","November","December"],X=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],$=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date,t=new Date(e);return"".concat(t.getMonth(),"-").concat(t.getDate(),"-").concat(t.getFullYear()).toString()},ee=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date,t=new Date(e);return"".concat(X[t.getDay()],", ").concat(Q[t.getMonth()]," ").concat(t.getDate())},te=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},a=t.filter((function(e){return e[n]===r}));if(a.length>0)return a[0].list;var s=(e={},Object(P.a)(e,n,r),Object(P.a)(e,"meta",c),Object(P.a)(e,"list",[]),e);return t.push(s),s.list};n(219);var ne={write:"Check In",journal:"Therapy Journal",settings:"Customize",skills:"Coping Skills"},re=JSON.parse(localStorage.getItem("pending-actions")||"[]");var ce=function(e){var t=e.install,n=e.swStatus,c=function(){var e=Object(i.useState)([]),t=Object(f.a)(e,2),n=t[0],r=t[1];return{skills:n,getSkills:function(){var e=Object(s.a)(a.a.mark((function e(){var t,n,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,J.get();case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,c=n.reduce((function(e,t){return K(e,"category",t.category,{category:t.category}).push(t),e}),[]),r(c),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),alert(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}(),submitSkill:function(e){return new Promise(function(){var t=Object(s.a)(a.a.mark((function t(n,c){var s;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r((function(t){return K(t,"category",e.category,{category:e.category}).push(e),t})),t.next=4,J.post(e);case 4:n(),t.next=13;break;case 7:t.prev=7,t.t0=t.catch(0),(s=JSON.parse(localStorage.getItem("pending-actions")||"[]")).push({action:"submit-skill",body:e}),localStorage.setItem("pending-actions",JSON.stringify(s)),c(t.t0);case 13:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e,n){return t.apply(this,arguments)}}())}}}(),o=c.skills,u=c.getSkills,l=c.submitSkill,b=function(){var e=Object(i.useState)([]),t=Object(f.a)(e,2),n=t[0],r=t[1],c=function(){var e=Object(s.a)(a.a.mark((function e(){var t,n,c;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,A.get();case 3:return t=e.sent,e.next=6,t.json();case 6:(n=(n=e.sent).map((function(e){return Object.assign(e,{start:new Date(e.start),end:new Date(e.end)})}))).sort((function(e,t){return t.start-e.start})),c=n.reduce((function(e,t){return te(e,"date",$(t.start),{date:ee(t.start)}).push(t),e}),[]),r(c),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),alert(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(){return e.apply(this,arguments)}}(),o=function(){var e=Object(s.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(s.a)(a.a.mark((function e(c,s){var i,o,u;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i=$(t.start),n[0].date===i?(console.log("adding entry at existing index"),n[0].list.splice(0,0,t)):(console.log("adding entry at new index"),n.splice(0,0,(o={date:i},Object(P.a)(o,"date",ee(t.start)),Object(P.a)(o,"list",[t]),o))),console.log(n),r(n),e.next=7,A.post(t);case 7:c(),e.next=16;break;case 10:e.prev=10,e.t0=e.catch(0),(u=JSON.parse(localStorage.getItem("pending-actions")||"[]")).push({action:"create-entry",body:t}),localStorage.setItem("pending-actions",JSON.stringify(u)),s(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t,n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return{entries:n,getEntries:c,createEntry:o}}(),m=b.entries,O=b.getEntries,x=b.createEntry,w=function(e){var t=localStorage.getItem("therapy-journal-settings")||"{}",n=Object(i.useState)(JSON.parse(t)),r=Object(f.a)(n,2),c=r[0],a=r[1];return Object(i.useEffect)((function(){localStorage.setItem("therapy-journal-settings",JSON.stringify(c))}),[c]),{getSetting:function(e){return c[e]},toggle:function(e){return function(t){console.log("Changing setting for ".concat(e," from ").concat(c[e]," to ").concat(!c[e])),a(Object(D.a)(Object(D.a)({},c),{},Object(P.a)({},e,!c[e])))}}}}(),S=function(e){var t=Object(i.useState)(null),n=Object(f.a)(t,2),r=n[0],c=n[1],o=Object(i.useState)(null),u=Object(f.a)(o,2),l=u[0],p=u[1],d=function(){var e=Object(s.a)(a.a.mark((function e(t,n,r){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(s.a)(a.a.mark((function e(s,i){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,F(t,n,r);case 3:return console.log("custom flow complete"),e.next=6,T();case 6:c(!0),s(),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.log("custom flow complete - on err"),i(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t,n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),h=function(){var e=Object(s.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(s.a)(a.a.mark((function e(t,n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C();case 3:return e.next=5,T();case 5:t(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),n(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),j=function(){var e=Object(s.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(s.a)(a.a.mark((function e(t,n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,N();case 3:window.location.reload(),t(),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),n(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),b=function(){var e=Object(s.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log("init auth"),e.next=4,C();case 4:return e.next=6,h();case 6:return e.next=8,new Promise((function(e,t){try{if(!v)throw"Cannot refresh empty cognito user";if(!k)throw"Cannot refresh empty refresh token";v.refreshSession(k,(function(n,r){if(n)return t(n);y=r.getAccessToken().getJwtToken(),k=new g.b({RefreshToken:r.getRefreshToken().getToken()}),e()}))}catch(n){t(n)}}));case 8:c(!0),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0),c(!1);case 15:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}(),m=function(){var e=Object(s.a)(a.a.mark((function e(t,n,r){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(s.a)(a.a.mark((function e(s,i){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,I(t);case 3:return e.next=5,d(t,n,r);case 5:c(!0),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),p(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}();return Object(i.useEffect)((function(){r&&e&&e()}),[r]),Object(i.useEffect)((function(){b()}),[]),{user:r,err:l,login:d,logout:j,register:m}}((function(){u(),O(),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};localStorage.setItem("pending-actions",[]),re.forEach((function(t){var n=t.action,r=t.body;return e[n](r)}))}({"submit-skill":l,"create-entry":x})})),E=S.user,q=S.login,M=S.register,z=S.logout,H=new URLSearchParams(window.location.search).get("page")||"write",W=Object(i.useState)(H),U=Object(f.a)(W,2),L=U[0],V=U[1],Z=Object(i.useState)(!1),B=Object(f.a)(Z,2),Q=B[0],X=B[1],ce=Object(i.useRef)(),ae=Object(i.useRef)(),se=Object(i.useState)((function(e){return console.log(e)})),ie=Object(f.a)(se,2),oe=ie[0],ue=ie[1],le=function(e){X(!0),ue((function(){return function(){console.log("answering!"),e(ae.current.value)}}))},fe=Object(i.useState)(!1),pe=Object(f.a)(fe,2),de=pe[0],he=pe[1],je=function(){he(!0)},be=function(){var e=Object(s.a)(a.a.mark((function e(){var t,n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=ce.current.value,n="+1".concat(t.replaceAll("-","")),e.next=5,M(n,le,je);case 5:e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),ge=function(){var e=Object(s.a)(a.a.mark((function e(){var t,n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=ce.current.value,n="+1".concat(t.replaceAll("-","")),e.next=5,q(n,le,je);case 5:e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),me=Object(i.useState)("none"),Oe=Object(f.a)(me,2),xe=Oe[0],we=Oe[1],ve=function(){return we("grid"),function(){we("none")}};return E?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("div",{id:"loading-animation",style:{display:xe}}),Object(r.jsx)("header",{children:Object(r.jsx)("h1",{children:ne[L]})}),Object(r.jsx)(R,{createEntry:x,settings:w,user:E,freeze:ve,display:"write"===L?"grid":"none"}),Object(r.jsx)(_,{entries:m,user:E,freeze:ve,display:"journal"===L?"grid":"none"}),Object(r.jsx)(G,{submitSkill:l,skills:o,user:E,display:"skills"===L?"grid":"none"}),Object(r.jsx)(Y,{settings:w,logout:z,user:E,freeze:ve,display:"settings"===L?"grid":"none",install:t,swStatus:n}),Object(r.jsx)("nav",{children:Object(r.jsxs)("ul",{children:[Object(r.jsx)("li",{}),Object(r.jsxs)("li",{className:"skills"===L?"active":"",onClick:function(){V("skills")},children:[Object(r.jsx)("img",{alt:"",width:"32",height:"32",src:p}),Object(r.jsx)("label",{children:"Skills"})]}),Object(r.jsxs)("li",{className:"write"===L?"active":"",onClick:function(){V("write")},children:[Object(r.jsx)("img",{alt:"",width:"32",height:"32",src:d}),Object(r.jsx)("label",{children:"Write"})]}),Object(r.jsxs)("li",{className:"journal"===L?"active":"",onClick:function(){V("journal")},children:[Object(r.jsx)("img",{alt:"",width:"32",height:"32",src:h}),Object(r.jsx)("label",{children:"Journal"})]}),Object(r.jsxs)("li",{className:"settings"===L?"active":"",onClick:function(){V("settings")},children:[Object(r.jsx)("img",{alt:"",width:"32",height:"32",src:j}),Object(r.jsx)("label",{children:"Settings"})]}),Object(r.jsx)("li",{})]})})]}):Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("div",{id:"loading-animation",style:{display:xe}}),Object(r.jsx)("header",{children:Object(r.jsx)("h1",{children:"Therapy Journal"})}),Object(r.jsxs)("main",{children:[Object(r.jsx)("h2",{children:de?"code is sending!":"can i get ur number?"}),Object(r.jsx)("div",{className:"phone-number-input",children:Object(r.jsx)("input",{type:"tel",placeholder:"123-456-7890",ref:ce,disabled:!!Q})}),Q&&Object(r.jsx)("div",{className:"phone-number-input",children:Object(r.jsx)("input",{autoComplete:"one-time-code",placeholder:"Secret Code",ref:ae})}),Object(r.jsxs)("div",{className:"phone-number-input",children:[!Q&&Object(r.jsxs)("span",{children:[Object(r.jsx)("button",{onClick:ge,children:"Get Login Code"}),Object(r.jsx)("button",{onClick:be,children:"Register"})]}),Q&&Object(r.jsx)(r.Fragment,{children:Object(r.jsx)("button",{onClick:oe,children:"Submit!"})})]})]})]})};console.warn=function(){},console.error=function(){};var ae=localStorage.getItem("sw-status"),se=function(){var e=Object(s.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!ae){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,navigator.serviceWorker.register("/journal/sw.js",{scope:"/journal/"});case 5:localStorage.setItem("sw-status","installed"),alert("Therapy Journal has installed!"),window.location.reload(),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),alert(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();l.a.render(Object(r.jsx)(o.a.StrictMode,{children:Object(r.jsx)(ce,{install:se,swStatus:ae})}),document.getElementById("root"))}},[[220,1,2]]]);
//# sourceMappingURL=main.6242e433.chunk.js.map