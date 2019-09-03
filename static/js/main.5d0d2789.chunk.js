(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{120:function(e,t,n){},121:function(e,t,n){"use strict";n.r(t);var a=n(17),r=n.n(a),c=n(0),l=n.n(c),o=n(63),u=n.n(o),i=n(21),s=n(13),f=n.n(s),d=n(35),m=n.n(d),p=n(36),h=n.n(p),v=n(37),b=n.n(v),g=n(38),E=n.n(g),y=n(39),C=n.n(y),x=n(4),N=n(64),S=n(123),w=n(65),O=n(124),k=Object(c.createContext)(null),j=function(e){var t=D(e.initialState);return l.a.createElement(k.Provider,{value:t},e.children)},D=function(e){var t=Object(c.useReducer)(function(e,t){var n=Object(N.a)(e,function(e){switch(t.actionType){case"set":Object(S.a)(e,t.path,t.value);break;case"deleteFromCollection":var n=Object(w.a)(e,t.path);n.splice(t.index,1),Object(S.a)(e,t.path,n);break;case"unset":Object(O.a)(e,t.path);break;default:throw new Error}});return console.log("store:",n),n},e||{}),n=Object(x.a)(t,2),a=n[0],r=n[1];return{store:a,set:function(e,t){console.log("set:",e,t),r({actionType:"set",path:e,value:t})},get:function(e,t){return Object(w.a)(a,e,t)},getArrayLength:function(e){return Object(w.a)(a,e,[]).length},deleteFromCollection:function(e,t){r({actionType:"deleteFromCollection",path:e,index:t})}}},I=function(){var e=l.a.useContext(k);if(null===e)throw new Error("Component must be wrapped with <StoreProvider>");return e},F={showErrors:"onFocus",showErrorsDelay:500,disableNextWhenErrors:!1},P=function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];var e=I(),t=e.set;return{config:(0,e.get)("config")||{},setupConfig:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t("config",Object(i.a)({},F,e))}}},L=function(){var e=I(),t=e.set;return{formDef:(0,e.get)("formDef"),setupFormDef:function(e){t("formDef",e)}}},T=function(){var e=A().evaluate,t=I().set,n=L().formDef,a={setFieldValue:function(n,a,r){var c=n.path,l=n.expression,o=n.data;null!=c&&(null==o?l&&t(V+"."+c,e(l,c,a,r)):t(V+"."+c,o))},setStoreValue:function(n,a,r){var c=n.path,l=n.expression,o=n.data;null!=c&&(null==o?l&&t(c,e(l,c,a,r)):t(c,o))}};return{handleEvent:function(t,r,c,l){(n&&n.events||[]).filter(function(n){return n.triggers.some(function(n){var a=n.eventType.includes(t),o=null==n.path&&null==n.pathExpression||n.path===r||n.pathExpression&&e(n.pathExpression,r,c,l);return a&&o})}).forEach(function(e){return e.actions.forEach(function(e){var t=a[e.action];t&&t(e,c,l)})})}}},M=function(){var e=I(),t=e.set,n=e.get,a=T().handleEvent,r=function(e,r){a(r,e),function(e){return n("".concat("fieldStates",".").concat(e),{})}(e)[r]||t("".concat("fieldStates",".").concat(e,".").concat(r),Date.now())};return{getFieldState:function(e){return n("".concat("fieldStates",".").concat(e),{})},setSelectedSuggestionLabel:function(e,n){t("fieldStates."+e+".selectedSuggestionLabel",n)},setShowManualEntryForSuggestion:function(e,n){t("fieldStates."+e+".showManualEntryForSuggestion",n)},focus:function(e){return r(e,"focus")},valueChanged:function(e){return r(e,"valueChanged")},blur:function(e){return r(e,"blur")}}},V="values",R=function(){var e=I(),t=M().valueChanged,n=A().evaluate,a=function(n,a){e.set("".concat(V,".").concat(n),a),t(n)};return{values:e.get(V),setValue:a,getValue:function(t){return e.get("".concat(V,".").concat(t))},addToCollection:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};a("".concat(t,"[").concat(e.getArrayLength("".concat(V,".").concat(t)),"]"),n)},deleteFromCollection:function(t,n){e.deleteFromCollection("".concat(V,".").concat(t),n)},getCollectionSize:function(t){return e.getArrayLength("".concat(V,".").concat(t))},setValueExpression:function(e,t,r,c){a(e,n(r,e,t,c,!1))},setUp:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e.set(V,t)}}},_=n(66);f.a.addTransform("toUpperCase",function(e){return e.toUpperCase()}),f.a.addTransform("toLowerCase",function(e){return e.toLowerCase()}),f.a.addTransform("isAlpha",function(e){return e&&m()(e)}),f.a.addTransform("isAlphanumeric",function(e){return e&&h()(e)}),f.a.addTransform("isCurrency",function(e){return e&&b()(e)}),f.a.addTransform("isEmail",function(e){return e&&E()(e)}),f.a.addTransform("isNumeric",function(e){return e&&C()(e)}),f.a.addBinaryOp("_=",20,function(e,t){return e.toLowerCase()===t.toLowerCase()});var A=function(){var e=P().config,t=I(),n=t.store,a=t.get,r=Object(_.parse)(window.location.search);return{evaluate:function(t,c,l,o){var u=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],s=Object(i.a)({},n,{def:l,path:c,config:e,urlSearchParams:r},o);if(u){var d=a("".concat(V,".").concat(c));s.fieldValue=d,s.value=d}return f.a.evalSync(t,s)}}},B=function(){var e=A().evaluate;return{shouldShow:function(t,n){return!n.showIf||n.showIf.some(function(a){return e(a,t,n)})}}},K=function(e,t){return t?""!==e?e+"."+t:t:e},U=n(125),q=function(e){return l.a.createElement("div",{id:e.path+"_description",className:"pt-2 text-muted description"},e.text)},z=n(46);var G=n(29),J=n.n(G),W={required:{validate:function(e){return!(null==e||e.length<=0||""===e)},defaultMessage:"This field is required"},email:{validate:function(e){return J()(e)||E()(e)},defaultMessage:"This field must be an email address"},alpha:{validate:function(e){return J()(e)||m()(e)},defaultMessage:"This field must be only letters"},numeric:{validate:function(e){return J()(e)||C()(e)},defaultMessage:"This field must be only numbers"},alphanumeric:{validate:function(e){return J()(e)||h()(e)},defaultMessage:"This field must be only letters and numbers"},currency:{validate:function(e){return J()(e)||b()(e)},defaultMessage:"This field must be a currency amount"}},H=function(){var e=I(),t=e.set,n=e.get,a=function(e,n){t("".concat("formState",".").concat(e),n)};return{formState:n("formState",{}),setFormState:a,nextClicked:function(){n("formState.nextClicked")||a("nextClicked",Date.now())},clearNextClicked:function(){a("nextClicked",void 0)},submitClicked:function(){n("formState.submitClicked")||a("submitClicked",Date.now())},nextOrSubmit:function(){return n("formState.nextClicked")||n("formState.submitClicked")}}},Q=function(){var e=P().config,t=R(),n=t.getValue,a=t.getCollectionSize,r=M().getFieldState,l=H().nextOrSubmit,o=B().shouldShow,u=function(){var e=Object(c.useState)(0),t=Object(x.a)(e,2)[1],n=function(){return t(function(e){return e+1})},a=function(e){setTimeout(function(){n()},e)};return{update:n,updateIn:a,updateAt:function(e){a(e-Date.now())}}}().updateAt,i=function(){var e=A().evaluate,t=R().getValue;return{validIf:{validate:function(t,n,a){return e(a,t,n)},defaultMessage:"This field is invalid"},invalidIf:{validate:function(t,n,a){return!e(a,t,n)},defaultMessage:"This field is invalid"},requiredIf:{validate:function(n,a,r){return!e(r,n,a)||W.required.validate(t(n))},defaultMessage:W.required.defaultMessage}}}(),s=function(e,t){return!t.validation||t.validation.length<=0?null:t.validation.reduce(function(a,r){return null!=a?a:function(e,t,a){if("string"===typeof e){var r=n(t)||"",c=W[e];return c.validate(r)?null:c.defaultMessage}if(function(e){return void 0!==e.expression}(e)){var l=i[e.name];return l.validate(t,a,e.expression)?null:e.message||l.defaultMessage}var o=n(t)||"",u=W[e.name];return u.validate(o)?null:e.message||u.defaultMessage}(r,e,t)},null)};var f=function(t,n){if(l()||"immediately"===e.showErrors)return!0;var a=r(t)||{};return"onFocus"===e.showErrors&&a.focus?d(a.focus):"onValueChanged"===e.showErrors&&a.valueChanged?d(a.valueChanged):!("onBlur"!==e.showErrors||!a.blur)&&d(a.blur)},d=function(t){return!e.showErrorsDelay||0===e.showErrorsDelay||(t+e.showErrorsDelay<Date.now()||(u(t+e.showErrorsDelay),!1))};return{validate:s,shouldShowErrors:f,validateAndShouldShow:function(e,t){return f(e,t)?s(e,t):null},hasErrorsRecursively:function e(t,n){return!(!n||!o(t,n))&&(null!=s(t,n)||!!n.children&&n.children.some(function(n){var r,c=K(t,n.fieldId);if(!o(c,n))return!1;if(r=n.type,se.hasOwnProperty(r)){for(var l=a(c),u=0;u<l;u++)if(e(c+"["+u+"]",n))return!0;return!1}return e(c,n)}))}}},X=function(e){return l.a.createElement("label",{htmlFor:e.htmlFor,className:"mr-2 "+(e.error?"text-danger":"")},e.text)},Y=function(e){var t=Q().validateAndShouldShow(e.path,e.def);return l.a.createElement("div",{className:"form-group pt-1"},e.def.label&&l.a.createElement(X,{htmlFor:e.path,text:e.def.label,error:!!t}),e.children,t&&l.a.createElement("div",{className:"error-message text-danger pt-2"},t),e.def.description&&l.a.createElement(q,{path:e.path,text:e.def.description}))},Z=function(){var e=I(),t=e.set;return{referenceData:(0,e.get)("referenceData"),setReferenceData:function(e,n){t("".concat("referenceData",".name"),n)},setupReferenceData:function(){(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).http.forEach(function(e){r()(e).then(function(n){t("".concat("referenceData",".").concat(e.name),n.data)})})}}};function $(){return($=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function ee(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var te=l.a.createElement("path",{fillRule:"evenodd",d:"M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"}),ne=function(e){var t=e.svgRef,n=ee(e,["svgRef"]);return l.a.createElement("svg",$({width:16,height:16,viewBox:"0 0 16 16",ref:t},n),te)},ae=l.a.forwardRef(function(e,t){return l.a.createElement(ne,$({svgRef:t},e))}),re=(n.p,{options:[],multiple:!1,labelKey:"label",valueKey:"value",postfixSearchIcon:!0}),ce=n(44),le=n.n(ce),oe=n(122),ue=function(){var e=P().config,t=Q().hasErrorsRecursively,n=H(),a=n.nextClicked,l=n.clearNextClicked,o=n.submitClicked,u=B().shouldShow,i=function(){var e=L().formDef,t=R().values,n=H(),a=n.formState,c=n.setFormState;return{submitting:a.submitting,submit:function(){c("submitting",!0),r.a.post(e.submit.url,t).then(function(t){console.log(t),c("submitting",!1),c("submitResponse",t);var n=e.submit.outcomes.findIndex(function(e){return!!e.statusCodes.includes(t.status)});c("outcomeIndex",n)}).catch(function(e){c("submitError",e),console.error("error:",e)})}}}(),s=i.submitting,f=i.submit,d=Object(c.useState)(""),m=Object(x.a)(d,2),p=m[0],h=m[1],v=Object(c.useState)([]),b=Object(x.a)(v,2),g=b[0],E=b[1],y=Object(c.useState)(-1),C=Object(x.a)(y,2),N=C[0],S=C[1],w=g.findIndex(function(e){return u(p,e)}),O=Object(oe.a)(g,function(e){return u(p,e)}),k=N===w,j=N===O,D=function(){return t(p,g[N])},I=e.disableNextWhenErrors&&D();return{setUp:function(e,t){h(e),E(t),N<0&&S(t.findIndex(function(t){return u(e,t)}))},nextClicked:function(){if(D())a();else for(var e=N+1;e<g.length;e++){var t=g[e];if(t&&u(p,t)){l(),S(e);break}}},previousClicked:function(){for(var e=N-1;e>=0;e--){var t=g[e];if(t&&u(p,t)){l(),S(e);break}}},submitClicked:function(){D()?o():f()},currentPageIndex:N,setCurrentPageIndex:S,currentIsFirst:k,currentIsLast:j,currentPageHasErrors:D,disableNext:I,submitting:s}},ie={accordion:function(e){var t=B().shouldShow,n=ue(),a=Object(c.useRef)(null);if(Object(c.useEffect)(function(){e.def.children&&n.setUp(e.path,e.def.children)}),!e.def.children)return null;var r=function(){a&&a.current&&window.scroll({top:a.current.getBoundingClientRect().top-100})},o=function(e){n.setCurrentPageIndex(e),r()},u=function(){n.previousClicked(),r()},i=function(){n.nextClicked(),r()};return l.a.createElement("div",{className:"accordion",role:"tablist","aria-multiselectable":"true"},e.def.children.map(function(r,c){return t(e.path,r)&&l.a.createElement("div",{className:"card",key:e.path+"_PAGE_"+c},n.currentPageIndex===c&&l.a.createElement("div",{ref:a}),l.a.createElement("div",{className:"card-header cursor-pointer",onClick:function(){return o(c)}},l.a.createElement("h3",{className:"d-inline"},r.label),c<n.currentPageIndex&&l.a.createElement("button",{className:"link-button text-muted px-1",onClick:function(){return o(c)}},l.a.createElement("u",null,"edit"))),n.currentPageIndex===c&&l.a.createElement("div",{className:"card-body m-1"},r.children&&l.a.createElement(de,{childFormElements:r.children,parentPath:e.parentPath}),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col"},l.a.createElement("nav",{"aria-label":"Page navigation"},l.a.createElement("ul",{className:"pagination mb-0"},!n.currentIsFirst&&l.a.createElement("li",{className:"page-item"},l.a.createElement("button",{className:"page-link",onClick:u},"Previous")),!n.currentIsLast&&l.a.createElement("li",{className:le()("page-item",{disabled:n.disableNext})},l.a.createElement("button",{className:"page-link",onClick:i,disabled:n.disableNext},"Next"))))),n.currentIsLast&&l.a.createElement("div",{className:"col"},l.a.createElement("button",{className:"btn btn-primary float-right",onClick:n.submitClicked},"Submit")))))}))},dropdown:function(e){var t=Z().referenceData,n=R(),a=n.getValue,r=n.setValue,c=M(),o=c.blur,u=c.focus,i=e.def.options||[];return e.def.referenceDataOptions&&(i=i.concat(t[e.def.referenceDataOptions])),l.a.createElement(Y,{path:e.path,def:e.def},l.a.createElement("select",{className:"form-control custom-select",id:e.def.fieldId,value:a(e.path)||"",onChange:function(t){return r(e.path,t.currentTarget.value)},"aria-describedby":e.def.fieldId+"_description",onFocus:function(){return u(e.path)},onBlur:function(){return o(e.path)}},l.a.createElement("option",{value:""}),i.map(function(e){var t="object"===typeof e?e.label:e,n="object"===typeof e?e.value:e;return l.a.createElement("option",{value:n,key:n||(Math.random()+1).toString(36).substring(2)},t)})))},textInput:function(e){var t=R(),n=t.getValue,a=t.setValue,r=M(),c=r.blur,o=r.focus;return l.a.createElement(Y,{path:e.path,def:e.def},l.a.createElement("input",{type:"text",className:"form-control",id:e.path,"aria-describedby":e.path+"_description",value:n(e.path)||"",onChange:function(t){return a(e.path,t.currentTarget.value)},onFocus:function(){return o(e.path)},onBlur:function(){return c(e.path)}}))},heading:function(e){return l.a.createElement("h"+e.def.level,null,e.def.text)},paragraph:function(e){return l.a.createElement("p",null,e.def.text)},buttonGroup:function(e){var t=R(),n=t.setValue,a=t.getValue,r=M(),o=r.blur,u=r.focus,i=a(e.path),s=Object(c.useState)(null),f=Object(x.a)(s,2),d=f[0],m=f[1];return l.a.createElement(Y,{path:e.path,def:e.def},l.a.createElement("div",{className:"btn-group-wrapper",onFocus:function(){return u(e.path)},onBlur:function(){return o(e.path)}},l.a.createElement("div",{className:"btn-group btn-group-toggle"},e.def.options.map(function(t,a){return l.a.createElement("label",{className:"btn btn-outline-primary"+(i===t?" active":"")+(d===a?" focus":""),key:e.path+"_OPTION_"+t,onFocus:function(){return m(a)},onBlur:function(){return m(null)}},l.a.createElement("input",{type:"radio",value:t,checked:t===i,onChange:function(t){return n(e.path,t.currentTarget.value)}}),t)}))))},tabs:function(e){var t=B().shouldShow,n=ue(),a=Object(c.useRef)(null);return Object(c.useEffect)(function(){e.def.children&&n.setUp(e.path,e.def.children)},[e.def,e.path]),Object(c.useEffect)(function(){a&&a.current&&a.current.getBoundingClientRect().top<0&&a.current.scrollIntoView()},[n.currentPageIndex]),e.def.children?n.currentPageIndex<0?null:l.a.createElement("div",{className:"card rounded-0"},l.a.createElement("div",{className:"card-header",ref:a},l.a.createElement("ul",{className:"nav "+(e.def.pill?"nav-pills card-header-pills":"nav-tabs card-header-tabs")},e.def.children.map(function(a,r){if(!t(e.path,a))return null;var c=e.path+"_PAGE_"+r;return r<n.currentPageIndex?l.a.createElement("li",{className:"nav-item",key:c},l.a.createElement("a",{className:"nav-link",href:"javascript:void(0)",onClick:function(){return n.setCurrentPageIndex(r)}},a.label)):r===n.currentPageIndex?l.a.createElement("li",{className:"nav-item",key:c},l.a.createElement("button",{className:"nav-link active"},a.label)):r>n.currentPageIndex?l.a.createElement("li",{className:"nav-item",key:c},l.a.createElement("button",{className:"nav-link disabled",tabIndex:-1,"aria-disabled":"true"},a.label)):null}))),l.a.createElement("div",{className:"card-body"},l.a.createElement("div",{className:"container"},l.a.createElement(de,{childFormElements:e.def.children[n.currentPageIndex].children,parentPath:e.parentPath}),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col"},l.a.createElement("nav",{"aria-label":"Page navigation"},l.a.createElement("ul",{className:"pagination mb-0"},!n.currentIsFirst&&l.a.createElement("li",{className:"page-item"},l.a.createElement("button",{className:"page-link",onClick:n.previousClicked},"Previous")),!n.currentIsLast&&l.a.createElement("li",{className:le()("page-item",{disabled:n.disableNext})},l.a.createElement("button",{className:"page-link",onClick:n.nextClicked,disabled:n.disableNext},"Next"))))),n.currentIsLast&&l.a.createElement("div",{className:"col"},l.a.createElement("button",{className:"btn btn-primary float-right",onClick:n.submitClicked},"Submit")))))):null},autocomplete:function(e){var t=Object(i.a)({},re,e.def),n=M(),a=n.focus,o=n.blur,u=n.getFieldState,s=n.setShowManualEntryForSuggestion,f=function(e,t){var n=Z().referenceData,a=R(),l=a.setValue,o=a.setValueExpression,u=M(),i=u.getFieldState,s=u.setSelectedSuggestionLabel,f=i(e),d=Object(c.useState)([]),m=Object(x.a)(d,2),p=m[0],h=m[1],v=Object(c.useState)([]),b=Object(x.a)(v,2),g=b[0],E=b[1],y=Object(c.useState)([]),C=Object(x.a)(y,2),N=C[0],S=C[1],w=Object(c.useState)(f.selectedSuggestionLabel||""),O=Object(x.a)(w,2),k=O[0],j=O[1],D=Object(c.useState)(!1),I=Object(x.a)(D,2),F=I[0],P=I[1];return Object(c.useEffect)(function(){h(N.concat(g))},[N,g]),{inputValue:k,inputChanged:function(e){j(e),S([]),E([]),h([]);var a=e.trim().toLowerCase(),c=f.selectedSuggestionLabel&&f.selectedSuggestionLabel.toLowerCase();if(a!==c&&a.length>0){var l=t.referenceDataOptions&&n[t.referenceDataOptions]||[],o=t.options||[],u=l.concat(o).filter(function(e){return JSON.stringify(e).toLowerCase().includes(a)});S(u),t.http&&t.http.url&&r.a.get(t.http.url+e).then(function(e){E(e.data)}),P(!0)}},suggestions:p,showSuggestions:F,clear:function(){P(!1)},selectOption:function(n){"string"===typeof n?(l(e,n),s(e,n),j(n)):"object"===typeof n&&(t.valueIsWholeOption?l(e,n):t.valueExpression?o(e,t,t.valueExpression,{option:n}):t.valueKey&&l(e,n[t.valueKey]),s(e,n[t.labelKey||"label"]),j(n[t.labelKey||"label"])),P(!1)}}}(e.path,e.def),d=f.inputValue,m=f.inputChanged,p=f.suggestions,h=f.showSuggestions,v=f.clear,b=f.selectOption,g=Object(c.useState)(-1),E=Object(x.a)(g,2),y=E[0],C=E[1],N=Object(c.useRef)(null),S=Object(c.useRef)(null),w=u(e.path).showManualEntryForSuggestion;Object(c.useEffect)(function(){h&&p&&p.length>0&&N.current.scrollIntoView()},[h,p]),Object(c.useEffect)(function(){return document.body.addEventListener("touchend",O),document.body.addEventListener("click",O),function(){document.body.removeEventListener("touchend",O),document.body.removeEventListener("click",O)}});var O=function(e){w||!N||N.current.contains(e.target)||!S||S.current.contains(e.target)||v()},k=function(e){m(e),C(-1)},j=function(){o(e.path),setTimeout(function(){var e=document.activeElement;N.current.contains(e)||S.current.contains(e)||v()},1)},D=function(){a(e.path),d&&d.length>0&&k(d)},I=function(e){38===e.keyCode&&y>0?C(y-1):40===e.keyCode&&y<p.length-1?C(y+1):13===e.keyCode&&y>=0&&y<p.length?b(p[y]):27===e.keyCode&&v()};return w?l.a.createElement("div",{className:"form-group pt-2"},e.def.label&&l.a.createElement(X,{htmlFor:e.path,text:e.def.label}),e.def.children&&l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-body"},l.a.createElement("button",{className:"btn btn-link pt-0 pl-0 pb-1 mt-n1",onClick:function(){return s(e.path,!1)}},t.switchToSuggestLinkLabel),l.a.createElement(de,{parentPath:e.path,childFormElements:e.def.children}))),e.def.manualDescription&&l.a.createElement(q,{path:e.path,text:e.def.manualDescription})):l.a.createElement(l.a.Fragment,null,l.a.createElement(Y,{path:e.path,def:e.def},l.a.createElement(z.a,null,l.a.createElement(z.c,null,function(n){var a=n.ref;return l.a.createElement("div",{ref:N,className:"input-group"},l.a.createElement("input",{ref:a,type:"text",className:"form-control",id:e.path,"aria-describedby":e.path+"_description",value:d||"",onChange:function(e){return k(e.target.value)},onKeyDown:I,onFocus:D,onBlur:j}),t.postfixSearchIcon&&l.a.createElement("div",{className:"input-group-append",onClick:function(){return m(d)}},l.a.createElement("span",{className:"input-group-text"},l.a.createElement(ae,{className:"search-icon"}))))}),l.a.createElement(z.b,{placement:"bottom-start"},function(e){var n=e.ref,a=e.style,r=e.placement;return l.a.createElement("div",{ref:S},l.a.createElement("div",{ref:n,style:a,className:"popper","data-placement":r},h&&p&&p.length>0&&l.a.createElement("div",{className:"dropdown-menu show"},p.map(function(e,n){var a,r;return"string"===typeof e?(a=e,r=e):"object"===typeof e&&(a=t.valueKey&&e[t.valueKey],r=t.labelKey&&e[t.labelKey]),l.a.createElement("button",{className:"dropdown-item"+(y===n?" active":""),key:a+r,onClick:function(){return b(e),void C(-1)}},r)}))))}))),t.showSwitchToManualEntryLink&&l.a.createElement("button",{className:"btn btn-link pt-0 pl-0 manual-entry-link",onClick:function(){return s(e.path,!0)}},t.switchToManualEntryLinkLabel))},textOutput:function(e){var t=A().evaluate;return e.def.expression?l.a.createElement(l.a.Fragment,null,t(e.def.expression,e.path,e.def)):e.def.value?l.a.createElement(l.a.Fragment,null,e.def.value):void 0}},se={list:function(e){var t=R(),n=t.getCollectionSize,a=t.addToCollection,r=t.deleteFromCollection;return l.a.createElement("div",{className:"form-group"},l.a.createElement("span",{className:"h5 align-middle mr-2"},e.def.label),e.def.description&&l.a.createElement(q,{path:e.path,text:e.def.description}),Object(U.a)(n(e.path),function(t){return l.a.createElement("div",{className:"card border-bottom mb-3"+(0===t?" mt-2":""),key:e.path+"_COLLECTION_"+t},l.a.createElement("h6",{className:"card-header"},function(e){var t=["th","st","nd","rd"],n=e%100;return e+(t[(n-20)%10]||t[n]||t[0])}(t+1)," ",e.def.itemLabel,l.a.createElement("button",{className:"close text-dark",onClick:function(){return r(e.path,t)},"aria-label":"close"},l.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),l.a.createElement("div",{className:"card-body pb-0"},e.def.children&&l.a.createElement(de,{childFormElements:e.def.children,parentPath:e.path+"["+t+"]"})))}),l.a.createElement("button",{className:"btn btn-primary d-inline",onClick:function(){return a(e.path)}},"Add"))}},fe=Object(i.a)({},ie,se);var de=function(e){return l.a.createElement("div",null,e.childFormElements.map(function(t,n){var a=K(e.parentPath,t.fieldId);return l.a.createElement(me,{path:a,parentPath:e.parentPath,elementDef:t,key:a+"_"+n})}))},me=function(e){if(!(0,B().shouldShow)(e.path,e.elementDef))return null;var t=function(e){var t=fe[e];return t||(console.warn("Could not find form element type:"+e),function(){return l.a.createElement("div",null,"Could not find form element type ",l.a.createElement("code",null,e),".")})}(e.elementDef.type),n={def:e.elementDef,parentPath:e.parentPath,path:e.path};return l.a.createElement(t,n)},pe=function(e){var t=L().setupFormDef,n=P().setupConfig,a=Z().setupReferenceData,r=T().handleEvent;Object(c.useEffect)(function(){t(e.formDef),n(e.formDef.config),a(e.formDef.referenceData)},[e.formDef]),setTimeout(function(){r("formLoaded")},1);var o=H().formState.outcomeIndex;return null!=o?l.a.createElement("div",{className:"outcome container"},l.a.createElement(de,{childFormElements:e.formDef.submit.outcomes[o].elements,parentPath:""})):l.a.createElement("div",{className:"form"},l.a.createElement(de,{childFormElements:e.formDef.elements,parentPath:""}))};n(120);r.a.get("api/formDefinition/exampleFormDefinition.json").then(function(e){u.a.render(l.a.createElement(j,null,l.a.createElement(pe,{formDef:e.data})),document.getElementById("form"))})},71:function(e,t,n){e.exports=n(121)}},[[71,1,2]]]);
//# sourceMappingURL=main.5d0d2789.chunk.js.map