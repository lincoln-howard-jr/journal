(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{130:function(e,t){},132:function(e,t){},142:function(e,t){},144:function(e,t){},171:function(e,t){},173:function(e,t){},174:function(e,t){},179:function(e,t){},181:function(e,t){},200:function(e,t){},212:function(e,t){},215:function(e,t){},219:function(e,t,n){},220:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(1),c=n.n(a),s=n(5),i=n(4),o=n.n(i),u=n(117),l=n.n(u),f=n(15),p=n(7),d=n.p+"static/media/skill.23054f65.svg",h=n.p+"static/media/plus.a86e5868.svg",j=n.p+"static/media/book.65cd22a3.svg",b=n.p+"static/media/settings.d2739024.svg",g=n(222),m=n(18),x="2ac3ij97dhtkag9fljdsuo1203",O="us-east-1_tRcA2uwF6",w=null,v=new m.e({UserPoolId:O,ClientId:x}),y=null,k=null,S=null,C=function(e){return new Promise((function(t,n){try{w=new m.a({Username:e,ClientMetadata:{phoneNumber:e}}),y=new m.c({Username:e,Pool:v}),t()}catch(r){n(r)}}))},T=function(){return new Promise((function(e,t){try{y=v.getCurrentUser(),e()}catch(n){t(n)}}))},N=function(){return new Promise((function(e,t){try{if(!y)throw"Cognito user must be defined to get access token";y.getSession((function(n,r){if(n)return t(n);k=r.getAccessToken().getJwtToken(),S=new m.b({RefreshToken:r.getRefreshToken().getToken()}),console.log("access token retrieved"),e()}))}catch(n){t(n)}}))},I=function(){var e=Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(s.a)(c.a.mark((function e(t,n){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.signOut();case 3:t(),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),n(e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(t,n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),J=function(){var e=Object(s.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(s.a)(c.a.mark((function e(n,r){var a,s,i;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=new m.d({Name:"phone_number",Value:t}),s=new m.d({Name:"custom:custom:id",Value:Object(g.a)()}),i=[a,s],v.signUp(t,Object(g.a)(),i,null,(function(e,t){if(e)return r(e);y=t.user,n()}));case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=function(e,t,n){return new Promise(function(){var r=Object(s.a)(c.a.mark((function r(a,s){return c.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,C(e);case 2:y.setAuthenticationFlowType("CUSTOM_CHALLENGE"),console.log(y,w),y.initiateAuth(w,{onSuccess:function(e){return a(e)},onFailure:function(e){return s(e)},customChallenge:function(e){var r=this;n(),t((function(e){return y.sendCustomChallengeAnswer(e,r)}))}});case 5:case"end":return r.stop()}}),r)})));return function(e,t){return r.apply(this,arguments)}}())},F={get get(){return function(){return fetch("https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/entries",{method:"get",headers:new Headers({"x-amz-access-token":k})})}},get post(){return function(e){return fetch("https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/entries",{method:"post",headers:new Headers({"x-amz-access-token":k,"Content-Type":"application/json"}),body:JSON.stringify(e)})}}},P={get get(){return function(){return fetch("https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/skills",{method:"get",headers:new Headers({"x-amz-access-token":k})})}},get post(){return function(e){return fetch("https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/skills",{method:"post",headers:new Headers({"x-amz-access-token":k,"Content-Type":"application/json"}),body:JSON.stringify(e)})}}},A={get get(){return function(){return fetch("https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/shares",{method:"get",headers:new Headers({"x-amz-access-token":k})})}},get getById(){return function(e){return fetch("https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/entries/".concat(e),{method:"get",headers:new Headers({"x-amz-access-token":k})})}},get post(){return function(e){return fetch("https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/shares",{method:"post",headers:new Headers({"x-amz-access-token":k,"Content-Type":"application/json"}),body:JSON.stringify(e)})}}};var q=n(8);var M=["January","February","March","April","May","June","July","August","September","October","November","December"],z=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;return"".concat(z[e.getDay()],", ").concat(M[e.getMonth()]," ").concat(e.getDate())},R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;return"".concat(e.getHours()%12||12,":").concat("0".concat(e.getMinutes()).slice(-2)," ").concat(e.getHours()>11?"pm":"am")};var H=function(e){var t=e.display,n=e.freeze,a=e.settings,o=e.createEntry,u=a.getSetting,l=Object(i.useState)(new Date),f=Object(p.a)(l,2),d=f[0],h=f[1],j=Object(i.useRef)(),b=Object(i.useRef)(),g=function(){var e=Object(s.a)(c.a.mark((function e(){var t,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n(),r={start:d,end:new Date,entryType:u("freeform")?"freeform":"questions"},e.prev=2,"questions"===r.entryType?(r.questions=Array.from(j.current.querySelectorAll("b")).map((function(e){return e.innerText})),r.answers=Array.from(j.current.querySelectorAll("div")).map((function(e){return e.innerText}))):r.freeform=b.current.innerText,e.next=6,o(r);case 6:h(new Date),"freeform"!==r.entryType&&Array.from(j.current.querySelectorAll("div")).map((function(e){return e.innerText="..."})),"freeform"===r.entryType&&(b.current.innerText="Write your entry here!"),t(),e.next=17;break;case 12:e.prev=12,e.t0=e.catch(2),"freeform"!==r.entryType&&Array.from(j.current.querySelectorAll("div")).map((function(e){return e.innerText="..."})),"freeform"===r.entryType&&(b.current.innerText="Write your entry here!"),t();case 17:case"end":return e.stop()}}),e,null,[[2,12]])})));return function(){return e.apply(this,arguments)}}();return Object(r.jsxs)("main",{style:{display:t},children:[Object(r.jsx)("h2",{children:E()}),Object(r.jsx)("h3",{children:R(d)}),!u("freeform")&&Object(r.jsxs)("div",{ref:j,className:"questions",children:[Object(r.jsx)("b",{children:"What have I done today?"}),Object(r.jsx)("div",{contentEditable:!0,children:"..."}),Object(r.jsx)("b",{children:"How do I feel?"}),Object(r.jsx)("div",{contentEditable:!0,children:"..."}),Object(r.jsx)("b",{children:"What else am I going to do?"}),Object(r.jsx)("div",{contentEditable:!0,children:"..."})]}),u("freeform")&&Object(r.jsx)("div",{contentEditable:!0,ref:b,children:"Write your entry here!"}),Object(r.jsx)("button",{onClick:g,children:"Complete"})]})},W=n(65),U=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;return"".concat(e.getHours()%12||12,":").concat("0".concat(e.getMinutes()).slice(-2)," ").concat(e.getHours()>11?"pm":"am")},L=function(e){var t=e.date,n=e.isOpen,a=e.open,c=e.close;return n?Object(r.jsxs)("header",{className:"entry-header",children:[Object(r.jsx)("span",{onClick:c,children:"x"}),Object(r.jsx)("h2",{children:t})]}):Object(r.jsxs)("header",{className:"entry-header",children:[Object(r.jsx)("span",{onClick:a,children:"more"}),Object(r.jsx)("h2",{children:t})]})},B=function(e){var t=e.entries,n=e.open;return t.map((function(e){return n?Object(r.jsxs)("section",{children:[Object(r.jsx)("h3",{children:U(e.start)}),"freeform"!==e.entryType&&e.questions.map((function(t,n){return Object(r.jsx)("section",{children:Object(r.jsxs)("p",{children:[Object(r.jsxs)("b",{children:[t," "]}),e.answers[n]]})})})),"freeform"===e.entryType&&Object(r.jsx)("section",{children:Object(r.jsx)("p",{children:e.freeform})})]},"entry-".concat(e.id)):Object(r.jsx)("div",{})}))};var Y=function(e){var t=e.display,n=e.entries,a=e.isNotMain,c=Object(i.useState)([]),s=Object(p.a)(c,2),o=s[0],u=s[1];return a?Object(r.jsx)(r.Fragment,{children:n.map((function(e){return Object(r.jsxs)("article",{children:[Object(r.jsx)(L,{date:e.meta.date,isOpen:-1!==o.indexOf(e.date),open:function(){u((function(t){return[].concat(Object(W.a)(t),[e.date])}))},close:function(){u((function(t){return t.filter((function(t){return t!==e.date}))}))},index:e}),Object(r.jsx)(B,{open:-1!==o.indexOf(e.date),entries:e.list})]},"index-".concat(e.date))}))}):Object(r.jsx)("main",{style:{display:t},children:n.map((function(e){return Object(r.jsxs)("article",{children:[Object(r.jsx)(L,{date:e.meta.date,isOpen:-1!==o.indexOf(e.date),open:function(){u((function(t){return[].concat(Object(W.a)(t),[e.date])}))},close:function(){u((function(t){return t.filter((function(t){return t!==e.date}))}))},index:e}),Object(r.jsx)(B,{open:-1!==o.indexOf(e.date),entries:e.list})]},"index-".concat(e.date))}))})},_=n.p+"static/media/pen.27ec406e.svg";var V=function(e){var t=e.display,n=e.skills,a=e.submitSkill,o=Object(i.useState)("reference"),u=Object(p.a)(o,2),l=u[0],f=u[1],d=Object(i.useRef)(),h=Object(i.useRef)(),j=function(){var e=Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a({category:d.current.value,skill:h.current.innerText});case 3:e.next=7;break;case 5:e.prev=5,e.t0=e.catch(0);case 7:f("reference");case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(){return e.apply(this,arguments)}}();return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("datalist",{id:"skills-categories",children:n.map((function(e){return Object(r.jsx)("option",{children:e.meta.category})}))}),Object(r.jsxs)("main",{style:{display:"edit"===l?t:"none"},children:[Object(r.jsx)("h2",{children:"New Skill"}),Object(r.jsxs)("div",{children:["Category: ",Object(r.jsx)("input",{list:"skills-categories",ref:d,defaultValue:"Tools For"})]}),Object(r.jsxs)("div",{children:["Skill: ",Object(r.jsx)("p",{style:{padding:7.5},ref:h,contentEditable:!0,children:"..."})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("button",{onClick:j,children:"Add Skill"}),Object(r.jsx)("button",{onClick:function(){f("reference")},children:"Cancel"})]})]}),Object(r.jsxs)("main",{style:{display:"reference"===l?t:"none"},children:[Object(r.jsx)("span",{onClick:function(){f("edit")},style:{height:64,display:"grid",alignItems:"center",justifyContent:"center"},children:Object(r.jsx)("img",{src:_,width:24,height:24})}),n.map((function(e){return Object(r.jsxs)("section",{children:[Object(r.jsx)("h2",{children:e.meta.category}),Object(r.jsx)("ul",{children:e.list.map((function(e){return Object(r.jsx)("li",{children:e.skill})}))})]})}))]})]})},G={"calendar.svg":'<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>',"pen.svg":'Icons made by <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26">Icongeek26</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',"book.svg":'Icons made by <a href="https://www.flaticon.com/authors/zlatko-najdenovski" title="Zlatko Najdenovski">Zlatko Najdenovski</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',"plus.svg":'Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',"list.svg":'Icons made by <a href="https://www.flaticon.com/authors/phatplus" title="phatplus">phatplus</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',"skill.svg":'Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',"settings.svg":'Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>'};function Z(e){var t=e.shareJournal,n=Object(i.useRef)(),a=Object(i.useRef)();return Object(r.jsxs)("div",{className:"action",children:[Object(r.jsx)("p",{style:{textDecoration:"none"},children:"Share Your Journal With"}),Object(r.jsx)("input",{type:"tel",ref:n}),Object(r.jsx)("p",{style:{textDecoration:"none"},children:"Your Name"}),Object(r.jsx)("input",{ref:a}),Object(r.jsx)("br",{}),Object(r.jsx)("span",{onClick:function(){var e=n.current.value,r=a.current.value;t(e,r),n.current.value=""},children:"Submit"})]})}function K(e){var t=e.sharing,n=e.redirect;return Object(r.jsxs)("div",{className:"action",children:[Object(r.jsx)("p",{style:{textDecoration:"none"},children:"Journals Shared With You"}),Object(r.jsx)("p",{style:{textDecoration:"none"},children:"Click To View"}),Object(r.jsx)("hr",{style:{width:"45vw"}}),t.map((function(e){return Object(r.jsx)("span",{onClick:function(){n("http://localhost:3000?page=sharing&id=".concat(e.id,"&name=").concat(e.name))},children:e.name})}))]})}function Q(e){var t=e.setting,n=e.title,a=e.toggle,c=e.getSetting;return Object(r.jsxs)("div",{className:"setting",children:[Object(r.jsx)("div",{children:n}),Object(r.jsx)("div",{children:Object(r.jsx)("span",{onClick:a(t),className:c(t)?"toggle on":"toggle"})})]})}var X=function(e){var t=e.settings,n=e.swStatus,a=e.install,c=e.display,s=e.logout,i=e.shareJournal,o=e.sharing,u=e.redirect;return Object(r.jsxs)("main",{className:"settings",style:{display:c},children:[Object(r.jsx)(Q,Object(f.a)({setting:"freeform",title:"Enable Freeform"},t)),!n&&Object(r.jsx)("div",{className:"action",children:Object(r.jsx)("span",{onClick:a,children:"Install!"})}),Object(r.jsx)(Z,{shareJournal:i}),Object(r.jsx)(K,{sharing:o,redirect:u}),Object(r.jsx)("div",{className:"action",children:Object(r.jsx)("span",{onClick:s,children:"Log Out"})}),Object(r.jsxs)("section",{id:"attributions",children:[Object(r.jsx)("h2",{children:"Attributions"}),Object(r.jsx)("ul",{children:Object.keys(G).map((function(e){return Object(r.jsx)("li",{dangerouslySetInnerHTML:{__html:G[e]}},"attribiution-".concat(e))}))})]})]})},$=function(e,t,n){var r,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},c=e.filter((function(e){return e[t]===n}));if(c.length>0)return c[0].list;var s=(r={},Object(q.a)(r,t,n),Object(q.a)(r,"meta",a),Object(q.a)(r,"list",[]),r);return e.push(s),s.list};var ee=["January","February","March","April","May","June","July","August","September","October","November","December"],te=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date,t=new Date(e);return"".concat(t.getMonth(),"-").concat(t.getDate(),"-").concat(t.getFullYear()).toString()},re=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date,t=new Date(e);return"".concat(te[t.getDay()],", ").concat(ee[t.getMonth()]," ").concat(t.getDate())},ae=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},c=t.filter((function(e){return e[n]===r}));if(c.length>0)return c[0].list;var s=(e={},Object(q.a)(e,n,r),Object(q.a)(e,"meta",a),Object(q.a)(e,"list",[]),e);return t.push(s),s.list};n(219);var ce=function(e){var t=e.shareId,n=e.name,a=e.display,o=e.getShareById,u=Object(i.useState)([]),l=Object(p.a)(u,2),f=l[0],d=l[1];return Object(i.useEffect)((function(){t&&Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.t0=d,e.next=4,o(t);case 4:e.t1=e.sent,(0,e.t0)(e.t1),e.next=11;break;case 8:e.prev=8,e.t2=e.catch(0),alert(e.t2);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()}),[t]),Object(r.jsx)(r.Fragment,{children:Object(r.jsxs)("main",{style:{display:a},children:[Object(r.jsxs)("h2",{children:["Journal Of ",n]}),Object(r.jsx)(Y,{isNotMain:!0,display:a,entries:f})]})})},se=["January","February","March","April","May","June","July","August","September","October","November","December"],ie=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],oe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date,t=new Date(e);return"".concat(t.getMonth(),"-").concat(t.getDate(),"-").concat(t.getFullYear()).toString()},ue=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date,t=new Date(e);return"".concat(ie[t.getDay()],", ").concat(se[t.getMonth()]," ").concat(t.getDate())},le=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},c=t.filter((function(e){return e[n]===r}));if(c.length>0)return c[0].list;var s=(e={},Object(q.a)(e,n,r),Object(q.a)(e,"meta",a),Object(q.a)(e,"list",[]),e);return t.push(s),s.list};var fe={write:"Check In",journal:"Therapy Journal",settings:"Customize",skills:"Coping Skills"},pe=JSON.parse(localStorage.getItem("pending-actions")||"[]");var de=function(e){var t=e.install,n=e.swStatus,a=function(){var e=Object(i.useState)([]),t=Object(p.a)(e,2),n=t[0],r=t[1];return{skills:n,getSkills:function(){var e=Object(s.a)(c.a.mark((function e(){var t,n,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,P.get();case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,a=n.reduce((function(e,t){return $(e,"category",t.category,{category:t.category}).push(t),e}),[]),r(a),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),alert(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}(),submitSkill:function(e){return new Promise(function(){var t=Object(s.a)(c.a.mark((function t(n,a){var s;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r((function(t){return $(t,"category",e.category,{category:e.category}).push(e),t})),t.next=4,P.post(e);case 4:n(),t.next=13;break;case 7:t.prev=7,t.t0=t.catch(0),(s=JSON.parse(localStorage.getItem("pending-actions")||"[]")).push({action:"submit-skill",body:e}),localStorage.setItem("pending-actions",JSON.stringify(s)),a(t.t0);case 13:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e,n){return t.apply(this,arguments)}}())}}}(),o=a.skills,u=a.getSkills,l=a.submitSkill,g=function(){var e=Object(i.useState)([]),t=Object(p.a)(e,2),n=t[0],r=t[1],a=function(){var e=Object(s.a)(c.a.mark((function e(){var t,n,a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,F.get();case 3:return t=e.sent,e.next=6,t.json();case 6:(n=(n=e.sent).map((function(e){return Object.assign(e,{start:new Date(e.start),end:new Date(e.end)})}))).sort((function(e,t){return t.start-e.start})),a=n.reduce((function(e,t){return ae(e,"date",ne(t.start),{date:re(t.start)}).push(t),e}),[]),r(a),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),alert(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(){return e.apply(this,arguments)}}(),o=function(){var e=Object(s.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(s.a)(c.a.mark((function e(a,s){var i,o,u;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,i=ne(t.start),n[0].date===i?(console.log("adding entry at existing index"),n[0].list.splice(0,0,t)):(console.log("adding entry at new index"),n.splice(0,0,(o={date:i},Object(q.a)(o,"date",re(t.start)),Object(q.a)(o,"list",[t]),o))),console.log(n),r(n),e.next=7,F.post(t);case 7:a(),e.next=16;break;case 10:e.prev=10,e.t0=e.catch(0),(u=JSON.parse(localStorage.getItem("pending-actions")||"[]")).push({action:"create-entry",body:t}),localStorage.setItem("pending-actions",JSON.stringify(u)),s(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t,n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return{entries:n,getEntries:a,createEntry:o}}(),x=g.entries,O=g.getEntries,w=g.createEntry,v=function(){var e=Object(i.useState)([]),t=Object(p.a)(e,2),n=t[0],r=t[1],a=function(){var e=Object(s.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,A.get();case 3:return t=e.sent,e.next=6,t.json();case 6:n=e.sent,r(n),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),alert(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();return{sharing:n,getShareById:function(){var e=Object(s.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(s.a)(c.a.mark((function e(n,r){var a,s,i;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,A.getById(t);case 3:return a=e.sent,e.next=6,a.json();case 6:(s=(s=e.sent).map((function(e){return Object.assign(e,{start:new Date(e.start),end:new Date(e.end)})}))).sort((function(e,t){return t.start-e.start})),i=s.reduce((function(e,t){return le(e,"date",oe(t.start),{date:ue(t.start)}).push(t),e}),[]),n(i),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),r(e.t0);case 16:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t,n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),getShares:a,shareJournal:function(){var e=Object(s.a)(c.a.mark((function e(t,n){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(s.a)(c.a.mark((function e(r,a){var s;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,s=10===t.length?"+1".concat(t):t,e.next=4,A.post({shareWith:s,name:n});case 4:alert("Successfully shared your journal with ".concat(t,"!")),r(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),a(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()}}(),C=function(e){var t=localStorage.getItem("therapy-journal-settings")||"{}",n=Object(i.useState)(JSON.parse(t)),r=Object(p.a)(n,2),a=r[0],c=r[1];return Object(i.useEffect)((function(){localStorage.setItem("therapy-journal-settings",JSON.stringify(a))}),[a]),{getSetting:function(e){return a[e]},toggle:function(e){return function(t){console.log("Changing setting for ".concat(e," from ").concat(a[e]," to ").concat(!a[e])),c(Object(f.a)(Object(f.a)({},a),{},Object(q.a)({},e,!a[e])))}}}}(),M=function(e){var t=Object(i.useState)(null),n=Object(p.a)(t,2),r=n[0],a=n[1],o=Object(i.useState)(null),u=Object(p.a)(o,2),l=u[0],f=u[1],d=function(){var e=Object(s.a)(c.a.mark((function e(t,n,r){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(s.a)(c.a.mark((function e(s,i){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,D(t,n,r);case 3:return console.log("custom flow complete"),e.next=6,N();case 6:a(!0),s(),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(0),console.log("custom flow complete - on err"),i(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t,n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),h=function(){var e=Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(s.a)(c.a.mark((function e(t,n){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,T();case 3:return e.next=5,N();case 5:t(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),n(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),j=function(){var e=Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(s.a)(c.a.mark((function e(t,n){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,I();case 3:window.location.reload(),t(),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),n(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),b=function(){var e=Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,console.log("init auth"),e.next=4,T();case 4:return e.next=6,h();case 6:return e.next=8,new Promise((function(e,t){try{if(!y)throw"Cannot refresh empty cognito user";if(!S)throw"Cannot refresh empty refresh token";y.refreshSession(S,(function(n,r){if(n)return t(n);k=r.getAccessToken().getJwtToken(),S=new m.b({RefreshToken:r.getRefreshToken().getToken()}),e()}))}catch(n){t(n)}}));case 8:a(!0),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0),a(!1);case 15:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}(),g=function(){var e=Object(s.a)(c.a.mark((function e(t,n,r){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(s.a)(c.a.mark((function e(s,i){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,J(t);case 3:return e.next=5,d(t,n,r);case 5:a(!0),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),f(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t,n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}();return Object(i.useEffect)((function(){r&&e&&e()}),[r]),Object(i.useEffect)((function(){b()}),[]),{user:r,err:l,login:d,logout:j,register:g}}((function(){u(),O(),v.getShares(),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};localStorage.setItem("pending-actions",[]),pe.forEach((function(t){var n=t.action,r=t.body;return e[n](r)}))}({"submit-skill":l,"create-entry":w})})),z=M.user,E=M.login,R=M.register,W=M.logout,U=new URLSearchParams(window.location.search).get("page")||"write",L=Object(i.useState)(U),B=Object(p.a)(L,2),_=B[0],G=B[1],Z=function(e){var t=e.split("?"),n=t.length>1?new URLSearchParams("?".concat(t[1])).get("page"):"write";console.log(e,n),window.history.pushState({previous:_,next:n},"Journal",e),G(n)},K=Object(i.useState)(!1),Q=Object(p.a)(K,2),ee=Q[0],te=Q[1],se=Object(i.useRef)(),ie=Object(i.useRef)(),de=Object(i.useState)((function(e){return console.log(e)})),he=Object(p.a)(de,2),je=he[0],be=he[1],ge=function(e){te(!0),be((function(){return function(){console.log("answering!"),e(ie.current.value)}}))},me=Object(i.useState)(!1),xe=Object(p.a)(me,2),Oe=xe[0],we=xe[1],ve=function(){we(!0)},ye=function(){var e=Object(s.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=se.current.value,n="+1".concat(t.replaceAll("-","")),e.next=5,R(n,ge,ve);case 5:e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),ke=function(){var e=Object(s.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=se.current.value,n="+1".concat(t.replaceAll("-","")),e.next=5,E(n,ge,ve);case 5:e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),Se=Object(i.useState)("none"),Ce=Object(p.a)(Se,2),Te=Ce[0],Ne=Ce[1],Ie=function(){return Ne("grid"),function(){Ne("none")}};return z?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("div",{id:"loading-animation",style:{display:Te}}),Object(r.jsx)("header",{children:Object(r.jsx)("h1",{children:fe[_]})}),Object(r.jsx)(H,{createEntry:w,settings:C,user:z,freeze:Ie,display:"write"===_?"grid":"none"}),Object(r.jsx)(Y,{entries:x,user:z,freeze:Ie,display:"journal"===_?"grid":"none"}),Object(r.jsx)(V,{submitSkill:l,skills:o,user:z,display:"skills"===_?"grid":"none"}),Object(r.jsx)(X,Object(f.a)(Object(f.a)({redirect:Z,settings:C},v),{},{logout:W,user:z,freeze:Ie,display:"settings"===_?"grid":"none",install:t,swStatus:n})),Object(r.jsx)(ce,Object(f.a)(Object(f.a)({},v),{},{display:"sharing"===_?"grid":"none",shareId:new URLSearchParams(window.location.search).get("id"),name:new URLSearchParams(window.location.search).get("name")})),Object(r.jsx)("nav",{children:Object(r.jsxs)("ul",{children:[Object(r.jsx)("li",{}),Object(r.jsxs)("li",{className:"skills"===_?"active":"",onClick:function(){Z("http://localhost:3000?page=skills")},children:[Object(r.jsx)("img",{alt:"",width:"32",height:"32",src:d}),Object(r.jsx)("label",{children:"Skills"})]}),Object(r.jsxs)("li",{className:"write"===_?"active":"",onClick:function(){Z("http://localhost:3000?page=write")},children:[Object(r.jsx)("img",{alt:"",width:"32",height:"32",src:h}),Object(r.jsx)("label",{children:"Write"})]}),Object(r.jsxs)("li",{className:"journal"===_?"active":"",onClick:function(){Z("http://localhost:3000?page=journal")},children:[Object(r.jsx)("img",{alt:"",width:"32",height:"32",src:j}),Object(r.jsx)("label",{children:"Journal"})]}),Object(r.jsxs)("li",{className:"settings"===_?"active":"",onClick:function(){Z("http://localhost:3000?page=settings")},children:[Object(r.jsx)("img",{alt:"",width:"32",height:"32",src:b}),Object(r.jsx)("label",{children:"Settings"})]}),Object(r.jsx)("li",{})]})})]}):Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("div",{id:"loading-animation",style:{display:Te}}),Object(r.jsx)("header",{children:Object(r.jsx)("h1",{children:"Therapy Journal"})}),Object(r.jsxs)("main",{children:[Object(r.jsx)("h2",{children:Oe?"code is sending!":"can i get ur number?"}),Object(r.jsx)("div",{className:"phone-number-input",children:Object(r.jsx)("input",{type:"tel",placeholder:"123-456-7890",ref:se,disabled:!!ee})}),ee&&Object(r.jsx)("div",{className:"phone-number-input",children:Object(r.jsx)("input",{autoComplete:"one-time-code",placeholder:"Secret Code",ref:ie})}),Object(r.jsxs)("div",{className:"phone-number-input",children:[!ee&&Object(r.jsxs)("span",{children:[Object(r.jsx)("button",{onClick:ke,children:"Get Login Code"}),Object(r.jsx)("button",{onClick:ye,children:"Register"})]}),ee&&Object(r.jsx)(r.Fragment,{children:Object(r.jsx)("button",{onClick:je,children:"Submit!"})})]})]})]})};console.warn=function(){},console.error=function(){};var he=localStorage.getItem("sw-status"),je=function(){var e=Object(s.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!he){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,navigator.serviceWorker.register("/journal/sw.js",{scope:"/journal/"});case 5:localStorage.setItem("sw-status","installed"),alert("Therapy Journal has installed!"),window.location.reload(),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),alert(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();l.a.render(Object(r.jsx)(o.a.StrictMode,{children:Object(r.jsx)(de,{install:je,swStatus:he})}),document.getElementById("root"))}},[[220,1,2]]]);
//# sourceMappingURL=main.f93aeec2.chunk.js.map