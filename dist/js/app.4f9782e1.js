(function(t){function e(e){for(var a,i,c=e[0],s=e[1],l=e[2],u=0,v=[];u<c.length;u++)i=c[u],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&v.push(r[i][0]),r[i]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a]);d&&d(e);while(v.length)v.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,c=1;c<n.length;c++){var s=n[c];0!==r[s]&&(a=!1)}a&&(o.splice(e--,1),t=i(i.s=n[0]))}return t}var a={},r={app:0},o=[];function i(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=a,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var d=s;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e),n.d(e,"db",(function(){return mt}));n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=n("8c4f"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-content",[n("router-view")],1)],1)},i=[],c={name:"App",components:{},data:function(){return{}}},s=c,l=n("2877"),d=n("6544"),u=n.n(d),v=n("7496"),f=n("a75b"),p=Object(l["a"])(s,o,i,!1,null,null,null),m=p.exports;u()(p,{VApp:v["a"],VContent:f["a"]});var h=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",{staticClass:"fill-height"},[n("v-navigation-drawer",{staticClass:"white",attrs:{app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",{attrs:{nav:"",dense:""}},t._l(t.items,(function(e,a){return n("v-list-item",{key:a,attrs:{link:"",to:e.link}},[n("v-list-item-icon",[n("v-icon",{domProps:{textContent:t._s(e.icon)}})],1),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:t._s(e.text)}})],1)],1)})),1)],1),n("v-col",[n("v-sheet",{attrs:{height:"64"}},[n("v-toolbar",{attrs:{flat:"",color:"white"}},[n("v-app-bar-nav-icon",{staticClass:"grey--text mr-1",on:{click:function(e){t.drawer=!t.drawer}}}),n("v-btn",{staticClass:"mr-4",attrs:{outlined:""},on:{click:t.setToday}},[t._v("Сегодня")]),n("v-btn",{attrs:{fab:"",text:"",small:"",color:"grey darken-2"},on:{click:t.prev}},[n("v-icon",{attrs:{small:""}},[t._v("mdi-chevron-left")])],1),n("v-btn",{staticClass:"mr-4",attrs:{fab:"",text:"",small:"",color:"grey darken-2"},on:{click:t.next}},[n("v-icon",{attrs:{small:""}},[t._v("mdi-chevron-right")])],1),n("v-toolbar-title",[t._v(t._s(t.title))]),n("v-spacer"),n("v-menu",{attrs:{bottom:"",right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[n("v-btn",t._g({attrs:{outlined:"",color:"grey darken-2"}},a),[n("span",[t._v(t._s(t.typeToLabel[t.type]))]),n("v-icon",{attrs:{right:""}},[t._v("mdi-menu-down")])],1)]}}])},[n("v-list",[n("v-list-item",{on:{click:function(e){t.type="day"}}},[n("v-list-item-title",[t._v("День")])],1),n("v-list-item",{on:{click:function(e){t.type="week"}}},[n("v-list-item-title",[t._v("Неделя")])],1),n("v-list-item",{on:{click:function(e){t.type="month"}}},[n("v-list-item-title",[t._v("Месяц")])],1),n("v-list-item",{on:{click:function(e){t.type="4day"}}},[n("v-list-item-title",[t._v("4 дня")])],1)],1)],1)],1)],1),n("v-alert",{directives:[{name:"show",rawName:"v-show",value:t.errShow,expression:"errShow"}],attrs:{type:"error"}},[t._v(' Поля "Название", "Дата начала" и "Дата окончания" должны быть заполнены! ')]),n("v-dialog",{attrs:{"max-width":"500"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-card",[n("v-container",[n("v-form",{on:{submit:function(e){return e.preventDefault(),t.addEvent(e)}}},[n("v-text-field",{attrs:{type:"text",label:"Название (Обязательно)"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),n("v-text-field",{attrs:{type:"text",label:"Описание"},model:{value:t.details,callback:function(e){t.details=e},expression:"details"}}),n("v-text-field",{attrs:{type:"datetime-local",label:"Начало (Обязательно)"},model:{value:t.start,callback:function(e){t.start=e},expression:"start"}}),n("v-text-field",{attrs:{type:"datetime-local",label:"Окончание (Обязательно)"},model:{value:t.end,callback:function(e){t.end=e},expression:"end"}}),n("v-text-field",{attrs:{type:"color",label:"Цвет (Нажмите, чтобы открыть меню выбора цвета)"},model:{value:t.color,callback:function(e){t.color=e},expression:"color"}}),n("v-btn",{staticClass:"mr-4",attrs:{type:"submit",color:"primary"},on:{click:function(e){e.stopPropagation(),t.dialog=!1}}},[t._v("Создать событие")])],1)],1)],1)],1),n("v-sheet",[n("v-calendar",{ref:"calendar",attrs:{color:"primary",events:t.events,"event-color":t.getEventColor,now:t.today,type:t.type},on:{"click:event":t.showEvent,"click:more":t.viewDay,"click:date":t.viewDay,change:t.updateRange},model:{value:t.focus,callback:function(e){t.focus=e},expression:"focus"}}),n("v-menu",{attrs:{"close-on-content-click":!1,activator:t.selectedElement,"offset-x":""},model:{value:t.selectedOpen,callback:function(e){t.selectedOpen=e},expression:"selectedOpen"}},[n("v-card",{attrs:{color:"grey lighten-4","min-width":"350px",flat:""}},[n("v-toolbar",{attrs:{color:t.selectedEvent.color,dark:""}},[n("v-btn",{attrs:{icon:""},on:{click:function(e){return t.deleteEvent(t.selectedEvent.id)}}},[n("v-icon",[t._v("mdi-delete")])],1),n("v-toolbar-title",{domProps:{innerHTML:t._s(t.selectedEvent.name)}}),n("v-spacer")],1),n("v-card-text",[t.currentlyEditing!==t.selectedEvent.id?n("form",[t._v(" "+t._s(t.selectedEvent.details)+" ")]):n("form",[n("textarea-autosize",{staticStyle:{width:"100%"},attrs:{type:"text","min-height":100,placeholder:"Добавить заметку"},model:{value:t.selectedEvent.details,callback:function(e){t.$set(t.selectedEvent,"details",e)},expression:"selectedEvent.details"}})],1)]),n("v-card-actions",[n("v-btn",{attrs:{text:"",color:"secondary"},on:{click:function(e){t.selectedOpen=!1}}},[t._v("Закрыть")]),t.currentlyEditing!==t.selectedEvent.id?n("v-btn",{attrs:{text:""},on:{click:function(e){return e.preventDefault(),t.editEvent(t.selectedEvent)}}},[t._v("Изменить")]):n("v-btn",{attrs:{text:""},on:{click:function(e){return e.preventDefault(),t.updateEvent(t.selectedEvent)}}},[t._v("Сохранить")])],1)],1)],1)],1),n("v-btn",{staticClass:"ma-5",attrs:{fixed:"",bottom:"",right:"",fab:"",dark:"",color:"indigo"},on:{click:function(e){t.dialog=!0}}},[n("v-icon",{attrs:{dark:""}},[t._v("mdi-plus")])],1)],1)],1)},b=[],g=(n("99af"),n("4160"),n("b0c0"),n("159b"),n("96cf"),n("1da1")),k={data:function(){return{today:(new Date).toISOString().substr(0,10),focus:(new Date).toISOString().substr(0,10),type:"month",typeToLabel:{month:"Месяц",week:"Неделя",day:"День","4day":"4 дня"},name:null,details:null,start:null,end:null,color:"#1976D2",currentlyEditing:null,selectedEvent:{},selectedElement:null,selectedOpen:!1,events:[],dialog:!1,errShow:!1,drawer:!1,width:300,item:0,items:[{text:"Сегодня",icon:"mdi-home",link:"/"},{text:"Календарь",icon:"mdi-calendar",link:"/calendar"}]}},computed:{title:function(){var t=this.start,e=this.end;if(!t||!e)return"";var n=this.monthFormatter(t),a=this.monthFormatter(e),r=n===a?"":a,o=t.year,i=e.year,c=o===i?"":i,s=t.day+this.nth(t.day),l=e.day+this.nth(e.day);switch(this.type){case"month":return"".concat(n," ").concat(o);case"week":case"4day":return"".concat(n," ").concat(s," ").concat(o," - ").concat(r," ").concat(l," ").concat(c);case"day":return"".concat(n," ").concat(s," ").concat(o)}return""},monthFormatter:function(){return this.$refs.calendar.getFormatter({timeZone:"UTC",month:"long"})}},mounted:function(){this.getEvents()},methods:{alertErr:function(){var t=this;this.errShow=!0,setTimeout((function(){t.errShow=!1}),3e3)},getEvents:function(){var t=this;return Object(g["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,mt.collection("calEvent").get();case 2:n=e.sent,a=[],n.forEach((function(t){var e=t.data();e.id=t.id,a.push(e)})),t.events=a;case 6:case"end":return e.stop()}}),e)})))()},addEvent:function(){var t=this;return Object(g["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.name&&t.start&&t.end)){e.next=11;break}return e.next=3,mt.collection("calEvent").add({name:t.name,details:t.details,start:t.start,end:t.end,color:t.color});case 3:t.getEvents(),t.name="",t.details="",t.start="",t.end="",t.color="#1976D2",e.next=12;break;case 11:t.alertErr();case 12:case"end":return e.stop()}}),e)})))()},updateEvent:function(t){var e=this;return Object(g["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,mt.collection("calEvent").doc(e.currentlyEditing).update({details:t.details});case 2:e.selectedOpen=!1,e.currentlyEditing=null;case 4:case"end":return n.stop()}}),n)})))()},deleteEvent:function(t){var e=this;return Object(g["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,mt.collection("calEvent").doc(t).delete();case 2:e.selectedOpen=!1,e.getEvents();case 4:case"end":return n.stop()}}),n)})))()},viewDay:function(t){var e=t.date;this.focus=e,this.type="day"},getEventColor:function(t){return t.color},setToday:function(){this.focus=this.today},prev:function(){this.$refs.calendar.prev()},next:function(){this.$refs.calendar.next()},editEvent:function(t){this.currentlyEditing=t.id},showEvent:function(t){var e=this,n=t.nativeEvent,a=t.event,r=function(){e.selectedEvent=a,e.selectedElement=n.target,setTimeout((function(){return e.selectedOpen=!0}),10)};this.selectedOpen?(this.selectedOpen=!1,setTimeout(r,10)):r(),n.stopPropagation()},updateRange:function(t){var e=t.start,n=t.end;this.start=e,this.end=n},nth:function(t){return t>3&&t<21?"th":["th","st","nd","rd","th","th","th","th","th","th"][t%10]},rnd:function(t,e){return Math.floor((e-t+1)*Math.random())+t},formatDate:function(t,e){return e?"".concat(t.getFullYear(),"-").concat(t.getMonth()+1,"-").concat(t.getDate()," ").concat(t.getHours(),":").concat(t.getMinutes()):"".concat(t.getFullYear(),"-").concat(t.getMonth()+1,"-").concat(t.getDate())}}},y=k,x=(n("e90d"),n("0798")),w=n("5bc1"),_=n("8336"),E=n("a4f6"),V=n("b0af"),C=n("99d9"),T=n("62ad"),O=n("a523"),S=n("169a"),I=n("4bd4"),j=n("132d"),P=n("8860"),D=n("da13"),L=n("5d23"),R=n("34c3"),F=n("e449"),M=n("f774"),$=n("0fd9"),A=n("8dd9"),z=n("2fa4"),B=n("8654"),N=n("71d9"),J=n("2a7f"),Y=Object(l["a"])(y,h,b,!1,null,"77d06a24",null),H=Y.exports;u()(Y,{VAlert:x["a"],VAppBarNavIcon:w["a"],VBtn:_["a"],VCalendar:E["a"],VCard:V["a"],VCardActions:C["a"],VCardText:C["b"],VCol:T["a"],VContainer:O["a"],VDialog:S["a"],VForm:I["a"],VIcon:j["a"],VList:P["a"],VListItem:D["a"],VListItemContent:L["a"],VListItemIcon:R["a"],VListItemTitle:L["b"],VMenu:F["a"],VNavigationDrawer:M["a"],VRow:$["a"],VSheet:A["a"],VSpacer:z["a"],VTextField:B["a"],VToolbar:N["a"],VToolbarTitle:J["a"]});var U=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",{staticClass:"fill-height"},[n("v-navigation-drawer",{staticClass:"white",attrs:{app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",{attrs:{nav:"",dense:""}},t._l(t.items,(function(e,a){return n("v-list-item",{key:a,attrs:{link:"",to:e.link}},[n("v-list-item-icon",[n("v-icon",{domProps:{textContent:t._s(e.icon)}})],1),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:t._s(e.text)}})],1)],1)})),1)],1),n("v-col",[n("v-sheet",{attrs:{elevation:t.elevation,height:"64"}},[n("v-toolbar",{attrs:{flat:"",color:"white"}},[n("v-app-bar-nav-icon",{staticClass:"grey--text mr-1",on:{click:function(e){t.drawer=!t.drawer}}}),n("v-toolbar-title",[t._v("Список задач")]),n("v-spacer")],1)],1),n("v-container",{staticStyle:{"max-width":"500px"}},[n("v-text-field",{attrs:{label:"Над чем работаете?",solo:""},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.create(e)}},model:{value:t.task,callback:function(e){t.task=e},expression:"task"}},[n("v-fade-transition",{attrs:{slot:"append"},slot:"append"},[t.task?n("v-icon",{on:{click:t.create}},[t._v("add_circle")]):t._e()],1)],1),n("h2",{staticClass:"display-1 success--text pl-3"},[t._v(" Задач: "),n("v-fade-transition",{attrs:{"leave-absolute":""}},[n("span",{key:"tasks-"+t.tasks.length},[t._v(t._s(t.tasks.length))])])],1),n("v-divider",{staticClass:"mt-3"}),n("v-layout",{attrs:{"my-1":"","align-center":""}},[n("strong",{staticClass:"mx-3 info--text text--darken-3"},[t._v("Всего: "+t._s(t.remainingTasks))]),n("v-divider",{attrs:{vertical:""}}),n("strong",{staticClass:"mx-3 black--text"},[t._v("Завершено: "+t._s(t.completedTasks))]),n("v-spacer"),n("v-progress-circular",{staticClass:"mr-2",attrs:{value:t.progress}})],1),n("v-divider",{staticClass:"mb-3"}),t.tasks.length>0?n("v-card",[n("v-slide-y-transition",{staticClass:"py-0",attrs:{group:"",tag:"v-list"}},[t._l(t.tasks,(function(e,a){return[0!==a?n("v-divider",{key:a+"-divider"}):t._e(),n("v-list-tile",{key:a+"-"+e.text},[n("v-list-tile-action",[n("v-checkbox",{attrs:{color:"info darken-3"},model:{value:e.done,callback:function(n){t.$set(e,"done",n)},expression:"task.done"}},[n("div",{staticClass:"ml-3",class:e.done?"grey--text":"text--primary",attrs:{slot:"label"},domProps:{textContent:t._s(e.text)},slot:"label"})])],1),n("v-spacer"),n("v-scroll-x-transition",[e.done?n("v-icon",{attrs:{color:"success"}},[t._v("check")]):t._e()],1)],1)]}))],2)],1):t._e()],1)],1)],1)},G=[],K=(n("4de4"),{name:"Todo",data:function(){return{events:[],item:0,drawer:!1,items:[{text:"Сегодня",icon:"mdi-home",link:"/"},{text:"Календарь",icon:"mdi-calendar",link:"/calendar"}],tasks:[{done:!1,text:"Foobar"},{done:!1,text:"Fizzbuzz"}],task:null,elevation:1}},mounted:function(){this.getEvents()},computed:{completedTasks:function(){return this.tasks.filter((function(t){return t.done})).length},progress:function(){return this.completedTasks/this.tasks.length*100},remainingTasks:function(){return this.tasks.length-this.completedTasks}},methods:{getEvents:function(){var t=this;return Object(g["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,mt.collection("calEvent").get();case 2:n=e.sent,a=[],n.forEach((function(t){var e=t.data();e.id=t.id,a.push(e)})),t.events=a;case 6:case"end":return e.stop()}}),e)})))()},create:function(){this.tasks.push({done:!1,text:this.task}),this.task=null}}}),W=K,X=(n("b0c2"),n("ac7c")),Z=n("ce7e"),q=n("0789"),Q=n("a722"),tt=n("490a"),et=Object(l["a"])(W,U,G,!1,null,"155cffca",null),nt=et.exports;u()(et,{VAppBarNavIcon:w["a"],VCard:V["a"],VCheckbox:X["a"],VCol:T["a"],VContainer:O["a"],VDivider:Z["a"],VFadeTransition:q["b"],VIcon:j["a"],VLayout:Q["a"],VList:P["a"],VListItem:D["a"],VListItemContent:L["a"],VListItemIcon:R["a"],VListItemTitle:L["b"],VNavigationDrawer:M["a"],VProgressCircular:tt["a"],VRow:$["a"],VScrollXTransition:q["c"],VSheet:A["a"],VSlideYTransition:q["e"],VSpacer:z["a"],VTextField:B["a"],VToolbar:N["a"],VToolbarTitle:J["a"]});var at=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[t._v(" "+t._s(t.codeError)+" Page not found ")])},rt=[],ot={data:function(){return{codeError:"404"}}},it=ot,ct=Object(l["a"])(it,at,rt,!1,null,null,null),st=ct.exports;u()(ct,{VContainer:O["a"]});var lt=n("f309");a["a"].use(lt["a"]);var dt=new lt["a"]({}),ut=n("3f9d"),vt=n("59ca"),ft=n.n(vt);n("e71f"),n("d1e78");a["a"].use(r["a"]),a["a"].use(ut["a"]),a["a"].use(dt),a["a"].config.productionTip=!1;var pt=new r["a"]({mode:"history",routes:[{name:"Todo",path:"/",component:nt},{name:"Calendar",path:"/calendar",component:H},{path:"/*",component:st}]});ft.a.initializeApp({apiKey:"AIzaSyBme7fmvf_pPwVGI1PETWfJ7V09Bsxa8-4",authDomain:"vue-calendar-cfccc.firebaseapp.com",databaseURL:"https://vue-calendar-cfccc.firebaseio.com",projectId:"vue-calendar-cfccc",storageBucket:"vue-calendar-cfccc.appspot.com",messagingSenderId:"374543033831",appId:"1:374543033831:web:6a3ef0d20b834783800942"});var mt=ft.a.firestore();new a["a"]({router:pt,vuetify:dt,render:function(t){return t(m)}}).$mount("#app")},a64d:function(t,e,n){},b0c2:function(t,e,n){"use strict";var a=n("a64d"),r=n.n(a);r.a},e90d:function(t,e,n){"use strict";var a=n("ece2"),r=n.n(a);r.a},ece2:function(t,e,n){}});
//# sourceMappingURL=app.4f9782e1.js.map