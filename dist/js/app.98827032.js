(function(t){function e(e){for(var a,c,i=e[0],l=e[1],s=e[2],d=0,v=[];d<i.length;d++)c=i[d],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&v.push(r[c][0]),r[c]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);u&&u(e);while(v.length)v.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,i=1;i<n.length;i++){var l=n[i];0!==r[l]&&(a=!1)}a&&(o.splice(e--,1),t=c(c.s=n[0]))}return t}var a={},r={app:0},o=[];function c(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=t,c.c=a,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)c.d(n,a,function(e){return t[e]}.bind(null,a));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var s=0;s<i.length;s++)e(i[s]);var u=l;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"04d4":function(t,e,n){"use strict";var a=n("ce24"),r=n.n(a);r.a},"56d7":function(t,e,n){"use strict";n.r(e),n.d(e,"db",(function(){return K}));n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-content",[n("Calendar")],1)],1)},o=[],c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",{staticClass:"fill-height"},[n("v-col",[n("v-sheet",{attrs:{height:"64"}},[n("v-toolbar",{attrs:{flat:"",color:"white"}},[n("v-btn",{staticClass:"mr-4",attrs:{color:"primary",dark:""},on:{click:function(e){t.dialog=!0}}},[t._v("Новое событие")]),n("v-btn",{staticClass:"mr-4",attrs:{outlined:""},on:{click:t.setToday}},[t._v("Сегодня")]),n("v-btn",{attrs:{fab:"",text:"",small:"",color:"grey darken-2"},on:{click:t.prev}},[n("v-icon",{attrs:{small:""}},[t._v("mdi-chevron-left")])],1),n("v-btn",{staticClass:"mr-4",attrs:{fab:"",text:"",small:"",color:"grey darken-2"},on:{click:t.next}},[n("v-icon",{attrs:{small:""}},[t._v("mdi-chevron-right")])],1),n("v-toolbar-title",[t._v(t._s(t.title))]),n("v-spacer"),n("v-menu",{attrs:{bottom:"",right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[n("v-btn",t._g({attrs:{outlined:"",color:"grey darken-2"}},a),[n("span",[t._v(t._s(t.typeToLabel[t.type]))]),n("v-icon",{attrs:{right:""}},[t._v("mdi-menu-down")])],1)]}}])},[n("v-list",[n("v-list-item",{on:{click:function(e){t.type="day"}}},[n("v-list-item-title",[t._v("День")])],1),n("v-list-item",{on:{click:function(e){t.type="week"}}},[n("v-list-item-title",[t._v("Неделя")])],1),n("v-list-item",{on:{click:function(e){t.type="month"}}},[n("v-list-item-title",[t._v("Месяц")])],1),n("v-list-item",{on:{click:function(e){t.type="4day"}}},[n("v-list-item-title",[t._v("4 дня")])],1)],1)],1)],1)],1),n("v-alert",{directives:[{name:"show",rawName:"v-show",value:t.errShow,expression:"errShow"}],attrs:{type:"error"}},[t._v(' Поля "Название", "Дата начала" и "Дата окончания" должны быть заполнены! ')]),n("v-dialog",{attrs:{"max-width":"500"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-card",[n("v-container",[n("v-form",{on:{submit:function(e){return e.preventDefault(),t.addEvent(e)}}},[n("v-text-field",{attrs:{type:"text",label:"Название (Обязательно)"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),n("v-text-field",{attrs:{type:"text",label:"Описание"},model:{value:t.details,callback:function(e){t.details=e},expression:"details"}}),n("v-text-field",{attrs:{type:"date",label:"Начало (Обязательно)"},model:{value:t.start,callback:function(e){t.start=e},expression:"start"}}),n("v-text-field",{attrs:{type:"date",label:"Окончание (Обязательно)"},model:{value:t.end,callback:function(e){t.end=e},expression:"end"}}),n("v-text-field",{attrs:{type:"color",label:"Цвет (Нажмите, чтобы открыть меню выбора цвета)"},model:{value:t.color,callback:function(e){t.color=e},expression:"color"}}),n("v-btn",{staticClass:"mr-4",attrs:{type:"submit",color:"primary"},on:{click:function(e){e.stopPropagation(),t.dialog=!1}}},[t._v("Создать событие")])],1)],1)],1)],1),n("v-sheet",{attrs:{height:"600"}},[n("v-calendar",{ref:"calendar",attrs:{color:"primary",events:t.events,"event-color":t.getEventColor,now:t.today,type:t.type},on:{"click:event":t.showEvent,"click:more":t.viewDay,"click:date":t.viewDay,change:t.updateRange},model:{value:t.focus,callback:function(e){t.focus=e},expression:"focus"}}),n("v-menu",{attrs:{"close-on-content-click":!1,activator:t.selectedElement,"full-width":"","offset-x":""},model:{value:t.selectedOpen,callback:function(e){t.selectedOpen=e},expression:"selectedOpen"}},[n("v-card",{attrs:{color:"grey lighten-4","min-width":"350px",flat:""}},[n("v-toolbar",{attrs:{color:t.selectedEvent.color,dark:""}},[n("v-btn",{attrs:{icon:""},on:{click:function(e){return t.deleteEvent(t.selectedEvent.id)}}},[n("v-icon",[t._v("mdi-delete")])],1),n("v-toolbar-title",{domProps:{innerHTML:t._s(t.selectedEvent.name)}}),n("v-spacer")],1),n("v-card-text",[t.currentlyEditing!==t.selectedEvent.id?n("form",[t._v(" "+t._s(t.selectedEvent.details)+" ")]):n("form",[n("textarea-autosize",{staticStyle:{width:"100%"},attrs:{type:"text","min-height":100,placeholder:"Добавить заметку"},model:{value:t.selectedEvent.details,callback:function(e){t.$set(t.selectedEvent,"details",e)},expression:"selectedEvent.details"}})],1)]),n("v-card-actions",[n("v-btn",{attrs:{text:"",color:"secondary"},on:{click:function(e){t.selectedOpen=!1}}},[t._v("Закрыть")]),t.currentlyEditing!==t.selectedEvent.id?n("v-btn",{attrs:{text:""},on:{click:function(e){return e.preventDefault(),t.editEvent(t.selectedEvent)}}},[t._v("Изменить")]):n("v-btn",{attrs:{text:""},on:{click:function(e){return e.preventDefault(),t.updateEvent(t.selectedEvent)}}},[t._v("Сохранить")])],1)],1)],1)],1)],1)],1)},i=[],l=(n("99af"),n("4160"),n("b0c0"),n("159b"),n("96cf"),n("1da1")),s={data:function(){return{today:(new Date).toISOString().substr(0,10),focus:(new Date).toISOString().substr(0,10),type:"month",typeToLabel:{month:"Месяц",week:"Неделя",day:"День","4day":"4 дня"},name:null,details:null,start:null,end:null,color:"#1976D2",currentlyEditing:null,selectedEvent:{},selectedElement:null,selectedOpen:!1,events:[],dialog:!1,errShow:!1}},computed:{title:function(){var t=this.start,e=this.end;if(!t||!e)return"";var n=this.monthFormatter(t),a=this.monthFormatter(e),r=n===a?"":a,o=t.year,c=e.year,i=o===c?"":c,l=t.day+this.nth(t.day),s=e.day+this.nth(e.day);switch(this.type){case"month":return"".concat(n," ").concat(o);case"week":case"4day":return"".concat(n," ").concat(l," ").concat(o," - ").concat(r," ").concat(s," ").concat(i);case"day":return"".concat(n," ").concat(l," ").concat(o)}return""},monthFormatter:function(){return this.$refs.calendar.getFormatter({timeZone:"UTC",month:"long"})}},mounted:function(){this.getEvents()},methods:{alertErr:function(){var t=this;this.errShow=!0,setTimeout((function(){t.errShow=!1}),3e3)},getEvents:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,K.collection("calEvent").get();case 2:n=e.sent,a=[],n.forEach((function(t){var e=t.data();e.id=t.id,a.push(e)})),t.events=a;case 6:case"end":return e.stop()}}),e)})))()},addEvent:function(){var t=this;return Object(l["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!(t.name&&t.start&&t.end)){e.next=11;break}return e.next=3,K.collection("calEvent").add({name:t.name,details:t.details,start:t.start,end:t.end,color:t.color});case 3:t.getEvents(),t.name="",t.details="",t.start="",t.end="",t.color="#1976D2",e.next=12;break;case 11:t.alertErr();case 12:case"end":return e.stop()}}),e)})))()},updateEvent:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,K.collection("calEvent").doc(e.currentlyEditing).update({details:t.details});case 2:e.selectedOpen=!1,e.currentlyEditing=null;case 4:case"end":return n.stop()}}),n)})))()},deleteEvent:function(t){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,K.collection("calEvent").doc(t).delete();case 2:e.selectedOpen=!1,e.getEvents();case 4:case"end":return n.stop()}}),n)})))()},viewDay:function(t){var e=t.date;this.focus=e,this.type="day"},getEventColor:function(t){return t.color},setToday:function(){this.focus=this.today},prev:function(){this.$refs.calendar.prev()},next:function(){this.$refs.calendar.next()},editEvent:function(t){this.currentlyEditing=t.id},showEvent:function(t){var e=this,n=t.nativeEvent,a=t.event,r=function(){e.selectedEvent=a,e.selectedElement=n.target,setTimeout((function(){return e.selectedOpen=!0}),10)};this.selectedOpen?(this.selectedOpen=!1,setTimeout(r,10)):r(),n.stopPropagation()},updateRange:function(t){var e=t.start,n=t.end;this.start=e,this.end=n},nth:function(t){return t>3&&t<21?"th":["th","st","nd","rd","th","th","th","th","th","th"][t%10]},rnd:function(t,e){return Math.floor((e-t+1)*Math.random())+t},formatDate:function(t,e){return e?"".concat(t.getFullYear(),"-").concat(t.getMonth()+1,"-").concat(t.getDate()," ").concat(t.getHours(),":").concat(t.getMinutes()):"".concat(t.getFullYear(),"-").concat(t.getMonth()+1,"-").concat(t.getDate())}}},u=s,d=(n("04d4"),n("2877")),v=n("6544"),f=n.n(v),p=n("0798"),h=n("8336"),m=n("a4f6"),b=n("b0af"),y=n("99d9"),g=n("62ad"),w=n("a523"),x=n("169a"),E=n("4bd4"),k=n("132d"),_=n("8860"),O=n("da13"),V=n("5d23"),S=n("e449"),T=n("0fd9"),C=n("8dd9"),j=n("2fa4"),D=n("8654"),P=n("71d9"),R=n("2a7f"),M=Object(d["a"])(u,c,i,!1,null,null,null),I=M.exports;f()(M,{VAlert:p["a"],VBtn:h["a"],VCalendar:m["a"],VCard:b["a"],VCardActions:y["a"],VCardText:y["b"],VCol:g["a"],VContainer:w["a"],VDialog:x["a"],VForm:E["a"],VIcon:k["a"],VList:_["a"],VListItem:O["a"],VListItemTitle:V["a"],VMenu:S["a"],VRow:T["a"],VSheet:C["a"],VSpacer:j["a"],VTextField:D["a"],VToolbar:P["a"],VToolbarTitle:R["a"]});var F={name:"App",components:{Calendar:I},data:function(){return{}}},L=F,$=n("7496"),A=n("a75b"),B=Object(d["a"])(L,r,o,!1,null,null,null),z=B.exports;f()(B,{VApp:$["a"],VContent:A["a"]});var J=n("f309");a["a"].use(J["a"]);var H=new J["a"]({}),U=n("3f9d"),Y=n("59ca"),G=n.n(Y);n("e71f");a["a"].use(U["a"]),a["a"].config.productionTip=!1,G.a.initializeApp({apiKey:"AIzaSyBme7fmvf_pPwVGI1PETWfJ7V09Bsxa8-4",authDomain:"vue-calendar-cfccc.firebaseapp.com",databaseURL:"https://vue-calendar-cfccc.firebaseio.com",projectId:"vue-calendar-cfccc",storageBucket:"vue-calendar-cfccc.appspot.com",messagingSenderId:"374543033831",appId:"1:374543033831:web:6a3ef0d20b834783800942"});var K=G.a.firestore();new a["a"]({vuetify:H,render:function(t){return t(z)}}).$mount("#app")},ce24:function(t,e,n){}});
//# sourceMappingURL=app.98827032.js.map