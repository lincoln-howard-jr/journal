(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{124:function(e,t,n){},130:function(e,t){},132:function(e,t){},142:function(e,t){},144:function(e,t){},171:function(e,t){},173:function(e,t){},174:function(e,t){},179:function(e,t){},181:function(e,t){},200:function(e,t){},212:function(e,t){},215:function(e,t){},219:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(4),a=n.n(c),i=n(8),s=n(5),o=n.n(s),u=n(115),l=n.n(u),d=n(15),h=n.p+"static/media/skill.23054f65.svg",f=n.p+"static/media/plus.a86e5868.svg",j=n.p+"static/media/book.65cd22a3.svg",b=n.p+"static/media/settings.d2739024.svg",p=(n(124),n(221)),w=n(16),m="2ac3ij97dhtkag9fljdsuo1203",O="us-east-1_tRcA2uwF6",x=null,g=new w.e({UserPoolId:O,ClientId:m}),v=null,y=null,k=function(){return new Promise((function(e,t){try{if(!v)throw"Cognito user must be defined to get access token";v.getSession((function(n,r){if(n)return t(n);y=r.getAccessToken().getJwtToken(),new w.b({RefreshToken:r.getRefreshToken().getToken()}),console.log("access token retrieved"),e()}))}catch(n){t(n)}}))},S=function(){var e=Object(i.a)(a.a.mark((function e(t,n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=Object(i.a)(a.a.mark((function e(r,c){var i,s,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i=new w.d({Name:"phone_number",Value:t}),s=new w.d({Name:"custom:custom:id",Value:Object(p.a)()}),o=[i,s],g.signUp(t,n,o,null,(function(e,t){if(e)return c(e);v=t.user,k().then((function(e){return r()})).err((function(e){return c(e)}))}));case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),F={get get(){return function(){return fetch("https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/entries",{method:"get",headers:new Headers({"x-amz-access-token":y})})}},get post(){return function(e){return fetch("https://akqxdqgf7l.execute-api.us-east-1.amazonaws.com/Prod/entries",{method:"post",headers:new Headers({"x-amz-access-token":y,"Content-Type":"application/json"}),body:JSON.stringify(e)})}}},I=["January","February","March","April","May","June","July","August","September","October","November","December"],C=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],D=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;return"".concat(C[e.getDay()],", ").concat(I[e.getMonth()]," ").concat(e.getDate())},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;return"".concat(e.getHours()%12||12,":").concat("0".concat(e.getMinutes()).slice(-2)," ").concat(e.getHours()>11?"pm":"am")};var A=function(e){var t=e.display,n=Object(s.useState)(new Date),c=Object(d.a)(n,2),o=c[0],u=c[1],l=Object(s.useRef)(),h=function(){var e=Object(i.a)(a.a.mark((function e(){var t,n,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Array.from(l.current.querySelectorAll("b")).map((function(e){return e.innerText})),n=Array.from(l.current.querySelectorAll("div")).map((function(e){return e.innerText})),r=new Date,e.next=5,F.post({questions:t,answers:n,start:o,end:r});case 5:Array.from(l.current.querySelectorAll("div")).map((function(e){return e.innerText="..."})),u(new Date);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(r.jsxs)("main",{style:{display:t},children:[Object(r.jsx)("h2",{children:D()}),Object(r.jsx)("h3",{children:T(o)}),Object(r.jsxs)("div",{ref:l,className:"questions",children:[Object(r.jsx)("b",{children:"What have I done today?"}),Object(r.jsx)("div",{contentEditable:!0,children:"..."}),Object(r.jsx)("b",{children:"How do I feel?"}),Object(r.jsx)("div",{contentEditable:!0,children:"..."}),Object(r.jsx)("b",{children:"What else am I going to do?"}),Object(r.jsx)("div",{contentEditable:!0,children:"..."})]}),Object(r.jsx)("button",{onClick:h,children:"Complete"})]})},J=n(117),N=n(39),M=["January","February","March","April","May","June","July","August","September","October","November","December"],q=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],P=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;return"".concat(e.getMonth(),"-").concat(e.getDate(),"-").concat(e.getFullYear()).toString()},R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;return"".concat(q[e.getDay()],", ").concat(M[e.getMonth()]," ").concat(e.getDate())},z=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},a=t.filter((function(e){return e[n]===r}));if(a.length>0)return a[0].list;var i=(e={},Object(N.a)(e,n,r),Object(N.a)(e,"meta",c),Object(N.a)(e,"list",[]),e);return t.push(i),i.list},E=function(e){var t=e.date,n=e.isOpen,c=e.open,a=e.close;return n?Object(r.jsxs)("header",{className:"entry-header",children:[Object(r.jsx)("span",{onClick:a,children:"x"}),Object(r.jsx)("h2",{children:t})]}):Object(r.jsxs)("header",{className:"entry-header",children:[Object(r.jsx)("span",{onClick:c,children:"more"}),Object(r.jsx)("h2",{children:t})]})},U=function(e){var t=e.entries,n=e.open;return t.map((function(e){return n?Object(r.jsx)("div",{children:e.questions.map((function(t,n){return Object(r.jsxs)("p",{children:[Object(r.jsxs)("b",{children:[t," "]}),e.answers[n]]})}))},"entry-".concat(e.id)):Object(r.jsx)("div",{})}))};var W=function(e){var t=e.display,n=Object(s.useState)([]),c=Object(d.a)(n,2),o=c[0],u=c[1],l=Object(s.useState)([]),h=Object(d.a)(l,2),f=h[0],j=h[1],b=function(){var e=Object(i.a)(a.a.mark((function e(){var t,n,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,F.get();case 3:return t=e.sent,e.next=6,t.json();case 6:n=(n=e.sent).map((function(e){return Object.assign(e,{start:new Date(e.start),end:new Date(e.end)})})),r=n.reduce((function(e,t){return z(e,"date",P(t.start),{date:R(t.start)}).push(t),e}),[]),u(r),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),alert(e.t0);case 15:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(){return e.apply(this,arguments)}}();return Object(s.useEffect)((function(){b()}),[]),Object(r.jsx)("main",{style:{display:t},children:o.map((function(e){return Object(r.jsxs)("article",{children:[Object(r.jsx)(E,{date:e.meta.date,isOpen:-1!==f.indexOf(e.date),open:function(){j((function(t){return[].concat(Object(J.a)(t),[e.date])}))},close:function(){j((function(t){return t.filter((function(t){return t!==e.date}))}))},index:e}),Object(r.jsx)(U,{open:-1!==f.indexOf(e.date),entries:e.list})]},"index-".concat(e.date))}))})},H={"calendar.svg":'<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>',"pen.svg":'Icons made by <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26">Icongeek26</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',"book.svg":'Icons made by <a href="https://www.flaticon.com/authors/zlatko-najdenovski" title="Zlatko Najdenovski">Zlatko Najdenovski</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',"plus.svg":'Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',"list.svg":'Icons made by <a href="https://www.flaticon.com/authors/phatplus" title="phatplus">phatplus</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',"skill.svg":'Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>',"settings.svg":'Icons made by <a href="https://www.flaticon.com/authors/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>'},V={write:"Check In",journal:"Therapy Journal",settings:"Customize",skills:"Coping Skills"};var Z=function(e){e.install,e.swStatus;var t=Object(s.useState)("write"),n=Object(d.a)(t,2),c=n[0],o=n[1],u=Object(s.useState)(null),l=Object(d.a)(u,2),p=l[0],m=l[1],O=function(){var e=Object(i.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,new Promise((function(e,t){try{if(!g)throw"Must configure user pool before calling login";v=g.getCurrentUser(),e()}catch(n){t(n)}}));case 3:return e.next=5,k();case 5:m(!0),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),m(!1);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();Object(s.useEffect)((function(){O()}),[]);var y=Object(s.useRef)(),F=Object(s.useRef)();return p?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("header",{children:Object(r.jsx)("h1",{children:V[c]})}),Object(r.jsx)(A,{display:"write"===c?"grid":"none"}),Object(r.jsx)(W,{display:"journal"===c?"grid":"none"}),Object(r.jsx)("nav",{children:Object(r.jsxs)("ul",{children:[Object(r.jsx)("li",{}),Object(r.jsxs)("li",{className:"calendar"===c?"active":"",onClick:function(){o("skills")},children:[Object(r.jsx)("img",{alt:"",width:"32",height:"32",src:h}),Object(r.jsx)("label",{children:"Skills"})]}),Object(r.jsxs)("li",{className:"write"===c?"active":"",onClick:function(){o("write")},children:[Object(r.jsx)("img",{alt:"",width:"32",height:"32",src:f}),Object(r.jsx)("label",{children:"Write"})]}),Object(r.jsxs)("li",{className:"journal"===c?"active":"",onClick:function(){o("journal")},children:[Object(r.jsx)("img",{alt:"",width:"32",height:"32",src:j}),Object(r.jsx)("label",{children:"Journal"})]}),Object(r.jsxs)("li",{className:"settings"===c?"active":"",onClick:function(){o("settings")},children:[Object(r.jsx)("img",{alt:"",width:"32",height:"32",src:b}),Object(r.jsx)("label",{children:"Settings"})]}),Object(r.jsx)("li",{})]})}),Object(r.jsxs)("div",{id:"attributions",children:[Object(r.jsx)("h2",{children:"Attributions"}),Object(r.jsx)("ul",{children:Object.keys(H).map((function(e){return Object(r.jsxs)("li",{children:[e," - ",H[e]]},"attribiution-".concat(e))}))})]})]}):Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("header",{children:Object(r.jsx)("h1",{children:"Therapy Journal"})}),Object(r.jsxs)("main",{children:[Object(r.jsx)("h2",{children:"can i get ur number?"}),Object(r.jsxs)("div",{children:[Object(r.jsx)("input",{ref:y}),Object(r.jsx)("p",{children:"(and password)"}),Object(r.jsx)("input",{type:"password",ref:F})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("button",{onClick:function(){var e,t,n=F.current.value,r=y.current.value,c="+1".concat(r.replaceAll("-",""));e=c,t=n,new Promise((function(n,r){try{x=new w.a({Username:e,Password:t}),(v=new w.c({Username:e,Pool:g})).authenticateUser(x,{onSuccess:function(e){return n(e)},onFailure:function(e){return r(e)}})}catch(c){r(c)}}))},children:"Log In"}),Object(r.jsx)("button",{onClick:function(){var e=F.current.value,t=y.current.value,n="+1".concat(t.replaceAll("-",""));S(n,e)},children:"Register"})]})]})]})};console.warn=function(){};var _=localStorage.getItem("sw-status"),B=function(){var e=Object(i.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!_){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,navigator.serviceWorker.register("/sw.js");case 5:localStorage.setItem("sw-status","installed"),alert("Therapy Journal has installed!"),window.location.reload(),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),alert(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();l.a.render(Object(r.jsx)(o.a.StrictMode,{children:Object(r.jsx)(Z,{install:B,swStatus:_})}),document.getElementById("root"))}},[[219,1,2]]]);
//# sourceMappingURL=main.91abf94f.chunk.js.map