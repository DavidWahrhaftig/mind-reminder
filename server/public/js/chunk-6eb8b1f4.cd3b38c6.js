(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6eb8b1f4"],{"177d":function(e,t,n){"use strict";var i=n("e637"),r=n.n(i);r.a},"1aeb":function(e,t,n){},"2eaf":function(e,t,n){e.exports=n.p+"media/harp-strumming-trimmed3.c49681ec.mp3"},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,n){var i=n("1d80"),r=n("5899"),a="["+r+"]",s=RegExp("^"+a+a+"*"),o=RegExp(a+a+"*$"),c=function(e){return function(t){var n=String(i(t));return 1&e&&(n=n.replace(s,"")),2&e&&(n=n.replace(o,"")),n}};e.exports={start:c(1),end:c(2),trim:c(3)}},"5e30":function(e,t,n){"use strict";var i=n("cf61"),r=n.n(i);r.a},7156:function(e,t,n){var i=n("861d"),r=n("d2bb");e.exports=function(e,t,n){var a,s;return r&&"function"==typeof(a=t.constructor)&&a!==n&&i(s=a.prototype)&&s!==n.prototype&&r(e,s),e}},"99af":function(e,t,n){"use strict";var i=n("23e7"),r=n("d039"),a=n("e8b5"),s=n("861d"),o=n("7b0b"),c=n("50c4"),u=n("8418"),l=n("65f0"),m=n("1dde"),d=n("b622"),f=n("2d00"),h=d("isConcatSpreadable"),p=9007199254740991,v="Maximum allowed index exceeded",g=f>=51||!r((function(){var e=[];return e[h]=!1,e.concat()[0]!==e})),b=m("concat"),w=function(e){if(!s(e))return!1;var t=e[h];return void 0!==t?!!t:a(e)},T=!g||!b;i({target:"Array",proto:!0,forced:T},{concat:function(e){var t,n,i,r,a,s=o(this),m=l(s,0),d=0;for(t=-1,i=arguments.length;t<i;t++)if(a=-1===t?s:arguments[t],w(a)){if(r=c(a.length),d+r>p)throw TypeError(v);for(n=0;n<r;n++,d++)n in a&&u(m,d,a[n])}else{if(d>=p)throw TypeError(v);u(m,d++,a)}return m.length=d,m}})},a9e3:function(e,t,n){"use strict";var i=n("83ab"),r=n("da84"),a=n("94ca"),s=n("6eeb"),o=n("5135"),c=n("c6b6"),u=n("7156"),l=n("c04e"),m=n("d039"),d=n("7c73"),f=n("241c").f,h=n("06cf").f,p=n("9bf2").f,v=n("58a8").trim,g="Number",b=r[g],w=b.prototype,T=c(d(w))==g,_=function(e){var t,n,i,r,a,s,o,c,u=l(e,!1);if("string"==typeof u&&u.length>2)if(u=v(u),t=u.charCodeAt(0),43===t||45===t){if(n=u.charCodeAt(2),88===n||120===n)return NaN}else if(48===t){switch(u.charCodeAt(1)){case 66:case 98:i=2,r=49;break;case 79:case 111:i=8,r=55;break;default:return+u}for(a=u.slice(2),s=a.length,o=0;o<s;o++)if(c=a.charCodeAt(o),c<48||c>r)return NaN;return parseInt(a,i)}return+u};if(a(g,!b(" 0o1")||!b("0b1")||b("+0x1"))){for(var y,C=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof C&&(T?m((function(){w.valueOf.call(n)})):c(n)!=g)?u(new b(_(t)),n,C):_(t)},x=i?f(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),N=0;x.length>N;N++)o(b,y=x[N])&&!o(C,y)&&p(C,y,h(b,y));C.prototype=w,w.constructor=C,s(r,g,C)}},b0c0:function(e,t,n){var i=n("83ab"),r=n("9bf2").f,a=Function.prototype,s=a.toString,o=/^\s*function ([^ (]*)/,c="name";i&&!(c in a)&&r(a,c,{configurable:!0,get:function(){try{return s.call(this).match(o)[1]}catch(e){return""}}})},b412:function(e,t,n){"use strict";var i=n("1aeb"),r=n.n(i);r.a},c66d:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("h1",{staticClass:"row display-5 text-info text-center"},[e._v(" Good to see you "+e._s(e.user.username)+" ")]),n("h1",{staticClass:"row display-5 text-info text-center"},[e._v(" Current time "+e._s(e.presentTime)+" ")]),n("hr"),n("button",{staticClass:"btn btn-info btn-lg",on:{click:e.createTimer}},[e._v("Create Daily Timer "),n("i",{staticClass:"fas fa-stopwatch"})]),e.timers?n("timer-grid",{attrs:{timers:e.timers}}):e._e()],1)},r=[],a=(n("99af"),n("fb6a"),n("96cf"),n("1da1")),s=n("5530"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("transition-group",{staticClass:"row",attrs:{tag:"div","enter-active-class":"animate__animated animate__jackInTheBox","leave-active-class":"animate__animated animate__bounceOut"}},e._l(e.timers,(function(e){return n("timer",{key:e._id,staticClass:"col-12 col-md-6 col-lg-4 p-0",attrs:{timer:e}})})),1)},c=[],u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"col-4"},[n("div",{staticClass:"mx-1 my-2 rounded py-2",class:[{"timer-on":e.timer.enabled},{"timer-off":!e.timer.enabled},{"timer-edit":e.editMode}]},[n("transition",{attrs:{"enter-active-class":"animate__animated animate__fadeIn","leave-active-class":"animate__animated animate__fadeOut",mode:"out-in"}},[e.editMode?n("timer-edit",{attrs:{timer:e.timer,updateTimer:e.updateTimer,removeTimer:e.removeTimer}}):n("timer-display",{attrs:{timer:e.timer,showTimer:e.showTimer,timeRemainingInSeconds:e.timeRemaining,updateTimer:e.updateTimer},on:{enable:e.activateTimer,disable:e.stopTimer,edit:e.edit}})],1)],1)])},l=[],m=(n("b0c0"),n("a9e3"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mx-4 py-0"},[n("h4",{staticClass:"row"},[e._v(" "+e._s(e.timer.name)+" ")]),n("div",{staticClass:"row "},[n("div",{staticClass:"col-9"},[n("div",{staticClass:"row justify-content-center"},[e._v(" From "),n("div",{staticClass:"settings"},[e._v(e._s(e.timer.start))]),e._v(" To "),n("div",{staticClass:"settings"},[e._v(e._s(e.timer.end))]),e._v(" Every "),n("div",{staticClass:"settings"},[e._v(e._s(e.timer.period))]),e._v(" min ")]),e.showTimer?n("h2",{staticClass:"row p-1 justify-content-center align-self-center"},[e._v(" "+e._s(e.displayTimeRemaining)+" ")]):e._e(),!e.showTimer&&e.timer.enabled?n("h4",{staticClass:"row p-2 justify-content-center align-self-center"},[e._v(" "+e._s(e.statusMessage)+" ")]):e._e(),e.timer.enabled?e._e():n("h2",{staticClass:"row p-2 justify-content-center align-self-center"},[n("i",{staticClass:"fas fa-ban"})])]),n("div",{staticClass:"col-3 pr-0"},[n("button",{staticClass:" row btn btn-sm btn-warning text-light m-0 mb-2 btn-block",on:{click:function(t){return e.$emit("edit")}}},[n("i",{staticClass:"fas fa-edit"})]),n("div",{staticClass:"onoffswitch"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.enabled,expression:"enabled"}],staticClass:"onoffswitch-checkbox",attrs:{type:"checkbox",name:"onoffswitch",id:"myonoffswitch"+e.timer._id,tabindex:"0"},domProps:{checked:Array.isArray(e.enabled)?e._i(e.enabled,null)>-1:e.enabled},on:{change:function(t){var n=e.enabled,i=t.target,r=!!i.checked;if(Array.isArray(n)){var a=null,s=e._i(n,a);i.checked?s<0&&(e.enabled=n.concat([a])):s>-1&&(e.enabled=n.slice(0,s).concat(n.slice(s+1)))}else e.enabled=r}}}),n("label",{staticClass:"onoffswitch-label",attrs:{for:"myonoffswitch"+e.timer._id}},[n("span",{staticClass:"onoffswitch-inner"})])])])])])}),d=[],f={props:["timer","showTimer","timeRemainingInSeconds","index","updateTimer"],data:function(){return{enabled:!0}},computed:{displayTimeRemaining:function(){var e=Math.floor(this.timeRemainingInSeconds/60),t=("0"+this.timeRemainingInSeconds%60).slice(-2);return"".concat(e," : ").concat(t)},statusMessage:function(){return this.timer.enabled?"I'll start at ".concat(this.timer.start):""}},watch:{enabled:function(e,t){console.log("New Value: "+e),console.log("Old Value: "+t),this.updateTimer({enabled:e},t,e)}},created:function(){console.log("Created TimerDisplay"),this.enabled=this.timer.enabled}},h=f,p=(n("177d"),n("2877")),v=Object(p["a"])(h,m,d,!1,null,"422c4668",null),g=v.exports,b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"px-2 mx-lg-2",staticStyle:{overflow:"hidden"}},[n("h3",{staticClass:"py-0",staticStyle:{display:"flex"}},[n("span",{staticClass:"mr-3",staticStyle:{flex:"2"}},[e._v("Name: ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newName,expression:"newName"}],staticClass:"timerNameInput",staticStyle:{overflow:"visible"},attrs:{placeholder:"timer name...",type:"text"},domProps:{value:e.newName},on:{input:function(t){t.target.composing||(e.newName=t.target.value)}}})]),n("div",{staticClass:"form-group my-0 row justify-content-start"},[n("div",{staticClass:"col-12 col-sm-6"},[n("label",[e._v("From: ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newStartTime,expression:"newStartTime"}],staticClass:"form-control",attrs:{type:"time",placeholder:"Select time"},domProps:{value:e.newStartTime},on:{input:function(t){t.target.composing||(e.newStartTime=t.target.value)}}})]),n("div",{staticClass:"col-12 col-sm-6"},[n("label",[e._v("To:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.newEndTime,expression:"newEndTime"}],staticClass:"form-control",attrs:{type:"time",placeholder:"Select time"},domProps:{value:e.newEndTime},on:{input:function(t){t.target.composing||(e.newEndTime=t.target.value)}}})]),n("div",{staticClass:"col-6 col-xl-4"},[n("label",[e._v("Every:")]),n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:e.newPeriod,expression:"newPeriod"}],staticClass:"form-control",attrs:{type:"number",min:"0",max:"59"},domProps:{value:e.newPeriod},on:{input:function(t){t.target.composing||(e.newPeriod=t.target.value)}}})]),n("div",[e._v(" min ")])])]),n("div",{staticClass:"float-right mt-0 mt-lg-2"},[n("button",{staticClass:"btn btn-success mr-1",on:{click:function(t){return e.updateTimer(e.editedTimer)}}},[n("i",{staticClass:"fas fa-save"})]),n("button",{staticClass:"btn btn-danger",on:{click:e.removeTimer}},[n("i",{staticClass:"fas fa-trash-alt"})])])])},w=[],T={props:["timer","updateTimer","removeTimer"],data:function(){return{newStartTime:"",newEndTime:"",newPeriod:1,newName:""}},computed:{editedTimer:function(){return{start:this.newStartTime,end:this.newEndTime,period:Number(this.newPeriod),name:this.newName,enabled:this.timer.enabled}}},methods:{},created:function(){console.log("Created TimerEdit"),this.newStartTime=this.timer.start,this.newEndTime=this.timer.end,this.newPeriod=this.timer.period,this.newName=this.timer.name}},_=T,y=(n("5e30"),Object(p["a"])(_,b,w,!1,null,"3168231b",null)),C=y.exports,x=n("2f62"),N={props:["timer"],components:{TimerDisplay:g,TimerEdit:C},data:function(){return{timeRemaining:1,editMode:!1,showTimer:!1,intervalID:"",timeoutID:"",alarm:new Audio(n("2eaf"))}},computed:{startBound:function(){return{hour:Number(this.timer.start.substring(0,2)),minutes:Number(this.timer.start.substring(3,5))}},endBound:function(){return{hour:Number(this.timer.end.substring(0,2)),minutes:Number(this.timer.end.substring(3,5))}}},methods:Object(s["a"])(Object(s["a"])(Object(s["a"])({},Object(x["c"])(["isNew"])),Object(x["b"])(["getTimers","update","remove"])),{},{updateTimer:function(e){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){var i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.update({id:t.timer._id,timer:e});case 2:if(i=n.sent,!i.data.success){n.next=8;break}return t.editMode=!1,n.next=7,t.getTimers();case 7:t.timer.enabled?t.activateTimer():t.stopTimer();case 8:case"end":return n.stop()}}),n)})))()},removeTimer:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.remove(e.timer._id);case 2:return t.next=4,e.getTimers();case 4:case"end":return t.stop()}}),t)})))()},beginTimer:function(){var e=this,t=new Date;this.showTimer=!0;var n=E(t,this.startBound,this.endBound,Number(this.timer.period));this.timeRemaining=S(t,n),console.log(this.timeRemaining),this.intervalID=setInterval((function(){e.timeRemaining--,0==e.timeRemaining&&(e.alarm.play(),e.alarm.onended=function(){var t=new SpeechSynthesisUtterance(e.timer.name);window.speechSynthesis.speak(t)},e.activateTimer())}),1e3)},stopTimer:function(){this.showTimer=!1,clearInterval(this.intervalID),clearTimeout(this.timeoutID),console.log("Stopped Timer")},edit:function(){this.editMode=!0,this.stopTimer()},activateTimer:function(){clearInterval(this.intervalID),clearTimeout(this.timeoutID),console.log("activateTimer - enabled: "+this.timer.enabled);var e=new Date;I(e,this.startBound,this.endBound)?(this.beginTimer(),console.log("automatic begin!")):(console.log("made a future timer call"),this.futureTimerCall())},futureTimerCall:function(){var e=this,t=new Date;this.showTimer=!1;var n=M(this.startBound.hour,this.startBound.minutes)-M(t.getHours(),t.getMinutes());(this.startBound.hour<t.getHours()||this.startBound.hour==t.getHours()&&this.startBound.minutes<=t.getMinutes())&&(n+=1440);var i=60*n-t.getSeconds();console.log("Waiting for: "+i),this.timeoutID=setTimeout((function(){e.beginTimer()}),1e3*i)}}),created:function(){this.timer.enabled&&this.activateTimer(),this.editMode=this.isNew()(this.timer._id),console.log("Created Timer"),console.log("New Timer: "+this.isNew()(this.timer._id))},beforeDestroy:function(){clearInterval(this.intervalID),clearTimeout(this.timeoutID)}};function I(e,t,n){return!(e.getHours()<t.hour||e.getHours()>n.hour)&&(!(e.getHours()==t.hour&&e.getMinutes()<t.minutes)&&!(e.getHours()==n.hour&&e.getMinutes()>=n.minutes))}function S(e,t){var n=t.startPoint,i=t.endPoint,r=I;if(r(e,n,i)){console.log("============================================="),console.log("found Interval"),console.log("endPoint.hour: "+i.hour),console.log("endPoint.minutes: "+i.minutes),console.log("date.getHours(): "+e.getHours()),console.log("date.minutes(): "+e.getMinutes());var a=60*i.hour+i.minutes-(60*e.getHours()+e.getMinutes());return console.log("remaining minutes:"),console.log(a),console.log("============================================="),60*a-e.getSeconds()}}function E(e,t,n,i){var r={},a={},s=60*e.getHours()+e.getMinutes(),o=60*t.hour+t.minutes,c=60*n.hour+n.minutes,u=s-o,l=Math.floor(u/i)*i+o;r.hour=Math.floor(l/60),r.minutes=l%60;var m=l+i;return m>c&&(m=c),a.hour=Math.floor(m/60),a.minutes=m%60,console.log("interval: "),console.log({startPoint:r,endPoint:a}),{startPoint:r,endPoint:a}}function M(e,t){return 60*e+t}var O=N,j=(n("b412"),Object(p["a"])(O,u,l,!1,null,"00d371dc",null)),R=j.exports,P={props:["timers"],components:{Timer:R}},k=P,A=Object(p["a"])(k,o,c,!1,null,null,null),D=A.exports,H={name:"App",components:{TimerGrid:D},data:function(){return{now:""}},methods:Object(s["a"])(Object(s["a"])({},Object(x["b"])(["getUser","getTimers","create"])),{},{setPresentTime:function(){var e=this;this.now=new Date,setInterval((function(){e.now=new Date}),1e3)},createTimer:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n="".concat(e.nowHours,":").concat(e.nowMinutes),t.next=3,e.create(n);case 3:return t.next=5,e.getTimers();case 5:case"end":return t.stop()}}),t)})))()}}),computed:Object(s["a"])(Object(s["a"])({},Object(x["c"])(["user","timers"])),{},{nowHours:function(){return("0"+this.now.getHours()%60).slice(-2)},nowMinutes:function(){return("0"+this.now.getMinutes()%60).slice(-2)},nowSeconds:function(){return("0"+this.now.getSeconds()%60).slice(-2)},presentTime:function(){return"".concat(this.nowHours," : ").concat(this.nowMinutes," : ").concat(this.nowSeconds)}}),created:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.setPresentTime(),t.next=3,e.getTimers();case 3:case"end":return t.stop()}}),t)})))()}},B=H,F=Object(p["a"])(B,i,r,!1,null,null,null);t["default"]=F.exports},cf61:function(e,t,n){},e637:function(e,t,n){},fb6a:function(e,t,n){"use strict";var i=n("23e7"),r=n("861d"),a=n("e8b5"),s=n("23cb"),o=n("50c4"),c=n("fc6a"),u=n("8418"),l=n("b622"),m=n("1dde"),d=n("ae40"),f=m("slice"),h=d("slice",{ACCESSORS:!0,0:0,1:2}),p=l("species"),v=[].slice,g=Math.max;i({target:"Array",proto:!0,forced:!f||!h},{slice:function(e,t){var n,i,l,m=c(this),d=o(m.length),f=s(e,d),h=s(void 0===t?d:t,d);if(a(m)&&(n=m.constructor,"function"!=typeof n||n!==Array&&!a(n.prototype)?r(n)&&(n=n[p],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return v.call(m,f,h);for(i=new(void 0===n?Array:n)(g(h-f,0)),l=0;f<h;f++,l++)f in m&&u(i,l,m[f]);return i.length=l,i}})}}]);
//# sourceMappingURL=chunk-6eb8b1f4.cd3b38c6.js.map