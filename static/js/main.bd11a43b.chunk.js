(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{107:function(e,t,n){},108:function(e,t,n){"use strict";n.r(t);var a=n(23),r=n.n(a),i=n(0),c=n.n(i),o=n(62),l=n.n(o),u=n(20),s=n(13),d=n.n(s),f=n(33),m=n.n(f),p=n(34),h=n.n(p),v=n(35),b=n.n(v),g=n(36),E=n.n(g),y=n(37),C=n.n(y),O=n(4),N=n(63),x=n(110),w=n(64),k=n(111),S=Object(i.createContext)(null),j=function(e){var t=I(e.initialState);return c.a.createElement(S.Provider,{value:t},e.children)},I=function(e){var t=Object(i.useReducer)(function(e,t){var n=Object(N.a)(e,function(e){switch(t.actionType){case"set":Object(x.a)(e,t.path,t.value);break;case"deleteFromCollection":var n=Object(w.a)(e,t.path);n.splice(t.index,1),Object(x.a)(e,t.path,n);break;case"unset":Object(k.a)(e,t.path);break;default:throw new Error}});return console.log("store:",n),n},e||{}),n=Object(O.a)(t,2),a=n[0],r=n[1];return{store:a,set:function(e,t){r({actionType:"set",path:e,value:t})},get:function(e,t){return Object(w.a)(a,e,t)},getArrayLength:function(e){return Object(w.a)(a,e,[]).length},deleteFromCollection:function(e,t){r({actionType:"deleteFromCollection",path:e,index:t})}}},D=function(){var e=c.a.useContext(S);if(null===e)throw new Error("Component must be wrapped with <StoreProvider>");return e},P={showErrors:"onFocus",showErrorsDelay:500,disableNextWhenErrors:!1},T=function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];var e=D(),t=e.set;return{config:(0,e.get)("config")||{},setup:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t("config",Object(u.a)({},P,e))}}},F=function(){var e=D(),t=e.set,n=e.get;return{getFieldState:function(e){return n("".concat("fieldStates",".").concat(e),{eventTimes:{}})},setSelectedSuggestionLabel:function(e,n){t("fieldStates."+e+".selectedSuggestionLabel",n)},focus:function(e){return t("".concat("fieldStates",".").concat(e,".focus"),Date.now())},valueChanged:function(e){return t("".concat("fieldStates",".").concat(e,".valueChanged"),Date.now())},blur:function(e){return t("".concat("fieldStates",".").concat(e,".blur"),Date.now())}}},L=function(){var e=D(),t=F().valueChanged,n=V().evaluate,a=function(n,a){console.log("path:",n),e.set("".concat("values",".").concat(n),a),t(n)};return{formValues:e.get("values"),setValue:a,getValue:function(t){return e.get("".concat("values",".").concat(t))},addToCollection:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};a("".concat(t,"[").concat(e.getArrayLength("".concat("values",".").concat(t)),"]"),n)},deleteFromCollection:function(t,n){e.deleteFromCollection("".concat("values",".").concat(t),n)},getCollectionSize:function(t){return e.getArrayLength("".concat("values",".").concat(t))},setValueExpression:function(e,t,r,i){a(e,n(e,t,r,!1,i))},setUp:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e.set("values",t)}}};d.a.addTransform("toUpperCase",function(e){return e.toUpperCase()}),d.a.addTransform("toLowerCase",function(e){return e.toLowerCase()}),d.a.addTransform("isAlpha",function(e){return e&&m()(e)}),d.a.addTransform("isAlphanumeric",function(e){return e&&h()(e)}),d.a.addTransform("isCurrency",function(e){return e&&b()(e)}),d.a.addTransform("isEmail",function(e){return e&&E()(e)}),d.a.addTransform("isNumeric",function(e){return e&&C()(e)}),d.a.addBinaryOp("_=",20,function(e,t){return e.toLowerCase()===t.toLowerCase()});var V=function(){var e=T().config,t=D(),n=t.store,a=t.get;return{evaluate:function(t,r,i){var c=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=arguments.length>4?arguments[4]:void 0,l=Object(u.a)({},n,{fieldDef:r,path:t,config:e},o);if(c){var s=a("".concat("values",".").concat(t));l.fieldValue=s,l.value=s}return d.a.evalSync(i,l)}}},M=function(){var e=V().evaluate;return{shouldShow:function(t,n){return!n.showIf||n.showIf.some(function(a){return e(t,n,a)})}}},R=function(e,t){return t?""!==e?e+"."+t:t:e},_=n(112),A=function(e){return c.a.createElement("div",{id:e.path+"_description",className:"pt-2 text-muted description"},e.text)},B=n(44);var K={required:{validate:function(e){return!(null==e||e.length<=0||""===e)},defaultMessage:"This field is required"},email:{validate:function(e){return E()(e)},defaultMessage:"This field must be an email address"},alpha:{validate:function(e){return m()(e)},defaultMessage:"This field must be only letters"},numeric:{validate:function(e){return C()(e)},defaultMessage:"This field must be only numbers"},alphanumeric:{validate:function(e){return h()(e)},defaultMessage:"This field must be only letters and numbers"},currency:{validate:function(e){return b()(e)},defaultMessage:"This field must be a currency amount"}},U=function(){var e=D(),t=e.set,n=e.get;return{fromState:n("formState"),nextClicked:function(){n("formState.nextClicked")||t("formState.nextClicked",Date.now())},clearNextClicked:function(){t("formState.nextClicked",void 0)},submitClicked:function(){n("formState.submitClicked")||t("formState.submitClicked",Date.now())},nextOrSubmit:function(){return n("formState.nextClicked")||n("formState.submitClicked")}}},q=function(){var e=T().config,t=L(),n=t.getValue,a=t.getCollectionSize,r=F().getFieldState,c=U().nextOrSubmit,o=M().shouldShow,l=function(){var e=V().evaluate,t=L().getValue;return{validIf:{validate:function(t,n,a){return e(t,n,a)},defaultMessage:"This field is invalid"},invalidIf:{validate:function(t,n,a){return!e(t,n,a)},defaultMessage:"This field is invalid"},requiredIf:{validate:function(n,a,r){return!e(n,a,r)||K.required.validate(t(n))},defaultMessage:K.required.defaultMessage}}}(),u=Object(i.useState)(0),s=Object(O.a)(u,2),d=s[0],f=s[1];Object(i.useEffect)(function(){d>Date.now()&&setTimeout(function(){return f(0)},d-Date.now())},[d]);var m=function(e,t){return!t.validation||t.validation.length<=0?null:t.validation.reduce(function(a,r){return null!=a?a:function(e,t,a){if("string"===typeof e){var r=n(t)||"",i=K[e];return i.validate(r)?null:i.defaultMessage}if(function(e){return void 0!==e.expression}(e)){var c=l[e.name];return c.validate(t,a,e.expression)?null:e.message||c.defaultMessage}var o=n(t)||"",u=K[e.name];return u.validate(o)?null:e.message||u.defaultMessage}(r,e,t)},null)};var p=function(t,n){if(c()||"immediately"===e.showErrors)return!0;var a=r(t).eventTimes||{};return"onFocus"===e.showErrors&&a.focus?h(a.focus):"onValueChanged"===e.showErrors&&a.valueChanged?h(a.valueChanged):!("onBlur"!==e.showErrors||!a.blur)&&h(a.blur)},h=function(t){return!e.showErrorsDelay||0===e.showErrorsDelay||(t+e.showErrorsDelay<Date.now()||(f(t+e.showErrorsDelay),!1))};return{validate:m,shouldShowErrors:p,validateAndShouldShow:function(e,t){return p(e,t)?m(e,t):null},hasErrorsRecursively:function e(t,n){return!(!n||!o(t,n))&&(null!=m(t,n)||!!n.children&&n.children.some(function(n){var r,i=R(t,n.fieldId);if(!o(i,n))return!1;if(r=n.type,re.hasOwnProperty(r)){for(var c=a(i),l=0;l<c;l++)if(e(i+"["+l+"]",n))return!0;return!1}return e(i,n)}))}}},z=function(e){return c.a.createElement("label",{htmlFor:e.htmlFor,className:"mr-2 h5 "+(e.error?"text-danger":"")},e.text)},G=function(e){var t=q().validateAndShouldShow(e.path,e.def);return c.a.createElement("div",{className:"form-group pt-2"},e.def.attributes.label&&c.a.createElement(z,{htmlFor:e.path,text:e.def.attributes.label,error:!!t}),e.children,t&&c.a.createElement("div",{className:"error-message text-danger pt-2"},t),e.def.attributes.description&&c.a.createElement(A,{path:e.path,text:e.def.attributes.description}))},J=function(){var e=D(),t=e.set;return{referenceData:(0,e.get)("referenceData"),setReferenceData:function(e,n){t("".concat("referenceData",".name"),n)},setup:function(){(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).http.forEach(function(e){r()(e).then(function(n){t("".concat("referenceData",".").concat(e.name),n.data)})})}}};function W(){return(W=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function H(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var Q=c.a.createElement("path",{fillRule:"evenodd",d:"M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"}),X=function(e){var t=e.svgRef,n=H(e,["svgRef"]);return c.a.createElement("svg",W({width:16,height:16,viewBox:"0 0 16 16",ref:t},n),Q)},Y=c.a.forwardRef(function(e,t){return c.a.createElement(X,W({svgRef:t},e))}),Z=(n.p,{options:[],multiple:!1,labelKey:"label",valueKey:"value",postfixSearchIcon:!0}),$=n(42),ee=n.n($),te=n(109),ne=function(){var e=T().config,t=q().hasErrorsRecursively,n=U(),a=n.nextClicked,r=n.clearNextClicked,c=n.submitClicked,o=M().shouldShow,l=Object(i.useState)(""),u=Object(O.a)(l,2),s=u[0],d=u[1],f=Object(i.useState)([]),m=Object(O.a)(f,2),p=m[0],h=m[1],v=Object(i.useState)(-1),b=Object(O.a)(v,2),g=b[0],E=b[1],y=p.findIndex(function(e){return o(s,e)}),C=Object(te.a)(p,function(e){return o(s,e)}),N=g===y,x=g===C,w=function(){return t(s,p[g])},k=e.disableNextWhenErrors&&w();return{setUp:function(e,t){d(e),h(t),g<0&&E(t.findIndex(function(t){return o(e,t)}))},nextClicked:function(){if(w())a();else for(var e=g+1;e<p.length;e++){var t=p[e];if(t&&o(s,t)){r(),E(e);break}}},previousClicked:function(){for(var e=g-1;e>=0;e--){var t=p[e];if(t&&o(s,t)){r(),E(e);break}}},submitClicked:function(){w()?c():console.log("Submit")},currentPageIndex:g,setCurrentPageIndex:E,currentIsFirst:N,currentIsLast:x,currentPageHasErrors:w,disableNext:k}},ae={accordion:function(e){var t=M().shouldShow,n=ne(),a=Object(i.useRef)(null);if(Object(i.useEffect)(function(){e.definition.children&&n.setUp(e.path,e.definition.children)}),!e.definition.children)return null;var r=function(){a&&a.current&&window.scroll({top:a.current.getBoundingClientRect().top-100})},o=function(e){n.setCurrentPageIndex(e),r()},l=function(){n.previousClicked(),r()},u=function(){n.nextClicked(),r()};return c.a.createElement("div",{className:"accordion",role:"tablist","aria-multiselectable":"true"},e.definition.children.map(function(r,i){return t(e.path,r)&&c.a.createElement("div",{className:"card",key:e.path+"_PAGE_"+i},n.currentPageIndex===i&&c.a.createElement("div",{ref:a}),c.a.createElement("div",{className:"card-header cursor-pointer",onClick:function(){return o(i)}},c.a.createElement("h3",{className:"d-inline"},r.attributes.label),i<n.currentPageIndex&&c.a.createElement("button",{className:"link-button text-muted px-1",onClick:function(){return o(i)}},c.a.createElement("u",null,"edit"))),n.currentPageIndex===i&&c.a.createElement("div",{className:"card-body m-1"},r.children&&c.a.createElement(ce,{childFormElements:r.children,parentPath:e.parentPath}),c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col"},c.a.createElement("nav",{"aria-label":"Page navigation"},c.a.createElement("ul",{className:"pagination mb-0"},!n.currentIsFirst&&c.a.createElement("li",{className:"page-item"},c.a.createElement("button",{className:"page-link",onClick:l},"Previous")),!n.currentIsLast&&c.a.createElement("li",{className:ee()("page-item",{disabled:n.disableNext})},c.a.createElement("button",{className:"page-link",onClick:u,disabled:n.disableNext},"Next"))))),n.currentIsLast&&c.a.createElement("div",{className:"col"},c.a.createElement("button",{className:"btn btn-primary float-right",onClick:n.submitClicked},"Submit")))))}))},dropdown:function(e){var t=J().referenceData,n=L(),a=n.getValue,r=n.setValue,i=F(),o=i.blur,l=i.focus,u=e.definition.attributes.options||[];return e.definition.attributes.referenceDataOptions&&(u=u.concat(t[e.definition.attributes.referenceDataOptions])),c.a.createElement(G,{path:e.path,def:e.definition},c.a.createElement("select",{className:"form-control custom-select",id:e.definition.fieldId,value:a(e.path)||"",onChange:function(t){return r(e.path,t.currentTarget.value)},"aria-describedby":e.definition.fieldId+"_description",onFocus:function(){return l(e.path)},onBlur:function(){return o(e.path)}},c.a.createElement("option",{value:""}),u.map(function(e){var t="object"===typeof e?e.label:e,n="object"===typeof e?e.value:e;return c.a.createElement("option",{value:n,key:n||(Math.random()+1).toString(36).substring(2)},t)})))},textInput:function(e){var t=L(),n=t.getValue,a=t.setValue,r=F(),i=r.blur,o=r.focus;return c.a.createElement(G,{path:e.path,def:e.definition},c.a.createElement("input",{type:"text",className:"form-control",id:e.path,"aria-describedby":e.path+"_description",value:n(e.path)||"",onChange:function(t){return a(e.path,t.currentTarget.value)},onFocus:function(){return o(e.path)},onBlur:function(){return i(e.path)}}))},heading:function(e){return c.a.createElement("h"+e.definition.attributes.level,null,e.definition.attributes.text)},paragraph:function(e){return c.a.createElement("p",null,e.definition.attributes.text)},buttonGroup:function(e){var t=L(),n=t.setValue,a=t.getValue,r=F(),o=r.blur,l=r.focus,u=a(e.path),s=Object(i.useState)(null),d=Object(O.a)(s,2),f=d[0],m=d[1];return c.a.createElement(G,{path:e.path,def:e.definition},c.a.createElement("div",{className:"btn-group-wrapper",onFocus:function(){return l(e.path)},onBlur:function(){return o(e.path)}},c.a.createElement("div",{className:"btn-group btn-group-toggle"},e.definition.attributes.options.map(function(t,a){return c.a.createElement("label",{className:"btn btn-outline-primary"+(u===t?" active":"")+(f===a?" focus":""),key:e.path+"_OPTION_"+t,onFocus:function(){return m(a)},onBlur:function(){return m(null)}},c.a.createElement("input",{type:"radio",value:t,checked:t===u,onChange:function(t){return n(e.path,t.currentTarget.value)}}),t)}))))},tabs:function(e){var t=M().shouldShow,n=ne(),a=Object(i.useRef)(null);return Object(i.useEffect)(function(){e.definition.children&&n.setUp(e.path,e.definition.children)},[e.definition.children,e.path]),Object(i.useEffect)(function(){a&&a.current&&a.current.getBoundingClientRect().top<0&&a.current.scrollIntoView()},[n.currentPageIndex]),e.definition.children?n.currentPageIndex<0?null:c.a.createElement("div",{className:"card rounded-0"},c.a.createElement("div",{className:"card-header",ref:a},c.a.createElement("ul",{className:"nav "+(e.definition.attributes.pill?"nav-pills card-header-pills":"nav-tabs card-header-tabs")},e.definition.children.map(function(a,r){if(!t(e.path,a))return null;var i=e.path+"_PAGE_"+r;return r<n.currentPageIndex?c.a.createElement("li",{className:"nav-item",key:i},c.a.createElement("a",{className:"nav-link",href:"javascript:void(0)",onClick:function(){return n.setCurrentPageIndex(r)}},a.attributes.label)):r===n.currentPageIndex?c.a.createElement("li",{className:"nav-item",key:i},c.a.createElement("button",{className:"nav-link active"},a.attributes.label)):r>n.currentPageIndex?c.a.createElement("li",{className:"nav-item",key:i},c.a.createElement("button",{className:"nav-link disabled",tabIndex:-1,"aria-disabled":"true"},a.attributes.label)):null}))),c.a.createElement("div",{className:"card-body"},c.a.createElement("div",{className:"container"},c.a.createElement(ce,{childFormElements:e.definition.children[n.currentPageIndex].children,parentPath:e.parentPath}),c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col"},c.a.createElement("nav",{"aria-label":"Page navigation"},c.a.createElement("ul",{className:"pagination mb-0"},!n.currentIsFirst&&c.a.createElement("li",{className:"page-item"},c.a.createElement("button",{className:"page-link",onClick:n.previousClicked},"Previous")),!n.currentIsLast&&c.a.createElement("li",{className:ee()("page-item",{disabled:n.disableNext})},c.a.createElement("button",{className:"page-link",onClick:n.nextClicked,disabled:n.disableNext},"Next"))))),n.currentIsLast&&c.a.createElement("div",{className:"col"},c.a.createElement("button",{className:"btn btn-primary float-right",onClick:n.submitClicked},"Submit")))))):null},autocomplete:function(e){var t=Object(u.a)({},Z,e.definition.attributes),n=F(),a=n.focus,o=n.blur,l=function(e,t,n){var a=J().referenceData,c=L(),o=c.setValue,l=c.setValueExpression,u=F(),s=u.getFieldState,d=u.setSelectedSuggestionLabel,f=s(e),m=Object(i.useState)([]),p=Object(O.a)(m,2),h=p[0],v=p[1],b=Object(i.useState)([]),g=Object(O.a)(b,2),E=g[0],y=g[1],C=Object(i.useState)([]),N=Object(O.a)(C,2),x=N[0],w=N[1],k=Object(i.useState)(f.selectedSuggestionLabel||""),S=Object(O.a)(k,2),j=S[0],I=S[1],D=Object(i.useState)(!1),P=Object(O.a)(D,2),T=P[0],V=P[1];return Object(i.useEffect)(function(){v(x.concat(E))},[x,E]),{inputValue:j,inputChanged:function(e){I(e),w([]),y([]),v([]);var n=e.trim().toLowerCase(),i=f.selectedSuggestionLabel&&f.selectedSuggestionLabel.toLowerCase();if(n!==i&&n.length>0){var c=t.referenceDataOptions&&a[t.referenceDataOptions]||[],o=t.options.concat(c).filter(function(e){return JSON.stringify(e).toLowerCase().includes(n)});w(o),t.http&&t.http.url&&r.a.get(t.http.url+e).then(function(e){y(e.data)}),V(!0)}},suggestions:h,showSuggestions:T,clear:function(){V(!1)},selectOption:function(a){"string"===typeof a?(o(e,a),d(e,a),I(a)):"object"===typeof a&&(t.valueIsWholeOption?o(e,a):t.valueExpression?l(e,n,t.valueExpression,{option:a}):t.valueKey&&o(e,a[t.valueKey]),d(e,a[t.labelKey||"label"]),I(a[t.labelKey||"label"])),V(!1)}}}(e.path,t,e.definition),s=l.inputValue,d=l.inputChanged,f=l.suggestions,m=l.showSuggestions,p=l.clear,h=l.selectOption,v=Object(i.useState)(-1),b=Object(O.a)(v,2),g=b[0],E=b[1],y=Object(i.useRef)(null),C=Object(i.useRef)(null);Object(i.useEffect)(function(){m&&f&&f.length>0&&y.current.scrollIntoView()},[m,f]),Object(i.useEffect)(function(){return document.body.addEventListener("touchend",N),document.body.addEventListener("click",N),function(){document.body.removeEventListener("touchend",N),document.body.removeEventListener("click",N)}});var N=function(e){y&&!y.current.contains(e.target)&&C&&!C.current.contains(e.target)&&p()},x=function(e){d(e),E(-1)},w=function(){o(e.path),setTimeout(function(){var e=document.activeElement;y.current.contains(e)||C.current.contains(e)||p()},1)},k=function(){a(e.path),s&&s.length>0&&x(s)},S=function(e){38===e.keyCode&&g>0?E(g-1):40===e.keyCode&&g<f.length-1?E(g+1):13===e.keyCode&&g>=0&&g<f.length?h(f[g]):27===e.keyCode&&p()};return c.a.createElement(G,{path:e.path,def:e.definition},c.a.createElement(B.a,null,c.a.createElement(B.c,null,function(n){var a=n.ref;return c.a.createElement("div",{ref:y,className:"input-group"},c.a.createElement("input",{ref:a,type:"text",className:"form-control",id:e.path,"aria-describedby":e.path+"_description",value:s||"",onChange:function(e){return x(e.target.value)},onKeyDown:S,onFocus:k,onBlur:w}),t.postfixSearchIcon&&c.a.createElement("div",{className:"input-group-append",onClick:function(){return d(s)}},c.a.createElement("span",{className:"input-group-text"},c.a.createElement(Y,{className:"search-icon"}))))}),c.a.createElement(B.b,{placement:"bottom-start"},function(e){var n=e.ref,a=e.style,r=e.placement;return c.a.createElement("div",{ref:C},c.a.createElement("div",{ref:n,style:a,className:"popper","data-placement":r},m&&f&&f.length>0&&c.a.createElement("div",{className:"dropdown-menu show"},f.map(function(e,n){var a=e[t.valueKey],r=e[t.labelKey];return c.a.createElement("button",{className:"dropdown-item"+(g===n?" active":""),key:a+r,onClick:function(){return h(e),void E(-1)}},r)}))))})))}},re={list:function(e){var t=L(),n=t.getCollectionSize,a=t.addToCollection,r=t.deleteFromCollection;return c.a.createElement("div",{className:"form-group"},c.a.createElement("span",{className:"h4 align-middle mr-2"},e.definition.attributes.label),e.definition.attributes.description&&c.a.createElement(A,{path:e.path,text:e.definition.attributes.description}),Object(_.a)(n(e.path),function(t){return c.a.createElement("div",{className:"card border-bottom mb-3"+(0===t?" mt-2":""),key:e.path+"_COLLECTION_"+t},c.a.createElement("h5",{className:"card-header"},function(e){var t=["th","st","nd","rd"],n=e%100;return e+(t[(n-20)%10]||t[n]||t[0])}(t+1)," ",e.definition.attributes.itemLabel,c.a.createElement("button",{className:"close text-dark",onClick:function(){return r(e.path,t)}},c.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),c.a.createElement("div",{className:"card-body pb-0"},e.definition.children&&c.a.createElement(ce,{childFormElements:e.definition.children,parentPath:e.path+"["+t+"]"})))}),c.a.createElement("button",{className:"btn btn-primary d-inline",onClick:function(){return a(e.path)}},"Add"))}},ie=Object(u.a)({},ae,re);var ce=function(e){return c.a.createElement("div",null,e.childFormElements.map(function(t,n){var a=R(e.parentPath,t.fieldId);return c.a.createElement(oe,{path:a,parentPath:e.parentPath,elementDef:t,key:a+"_"+n})}))},oe=function(e){if(!(0,M().shouldShow)(e.path,e.elementDef))return null;var t=function(e){var t=ie[e];return t||(console.warn("Could not find form element type:"+e),function(){return c.a.createElement("div",null,"Could not find form element type ",c.a.createElement("code",null,e),".")})}(e.elementDef.type);return c.a.createElement(t,{definition:e.elementDef,parentPath:e.parentPath,path:e.path})},le=function(e){var t=T(),n=J();return Object(i.useEffect)(function(){t.setup(e.formDef.config),n.setup(e.formDef.referenceData)},[e.formDef.config,e.formDef.referenceData]),c.a.createElement("div",{className:""},c.a.createElement(ce,{childFormElements:e.formDef.elements,parentPath:""}))};n(107);r.a.get("api/formDefinition/exampleFormDefinition.json").then(function(e){l.a.render(c.a.createElement(j,null,c.a.createElement(le,{formDef:e.data})),document.getElementById("form"))})},69:function(e,t,n){e.exports=n(108)}},[[69,1,2]]]);
//# sourceMappingURL=main.bd11a43b.chunk.js.map