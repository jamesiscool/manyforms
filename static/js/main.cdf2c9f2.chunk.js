(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{109:function(e,t,n){},110:function(e,t,n){"use strict";n.r(t);var a=n(32),r=n.n(a),i=n(0),l=n.n(i),c=n(65),o=n.n(c),u=n(14),s=n.n(u),d=n(33),f=n.n(d),m=n(34),b=n.n(m),h=n(35),v=n.n(h),p=n(36),E=n.n(p),g=n(37),C=n.n(g),N={required:{validate:function(e){return!(null==e||e.length<=0||""===e)},defaultMessage:"This field is required"},email:{validate:function(e){return E()(e)},defaultMessage:"This field must be an email address"},alpha:{validate:function(e){return f()(e)},defaultMessage:"This field must be only letters"},numeric:{validate:function(e){return C()(e)},defaultMessage:"This field must be only numbers"},alphanumeric:{validate:function(e){return b()(e)},defaultMessage:"This field must be only letters and numbers"},currency:{validate:function(e){return v()(e)},defaultMessage:"This field must be a currency amount"}},O=n(45);function w(e){var t=l.a.createContext(null);return{Provider:function(n){var a=e(n.initialState);return l.a.createElement(t.Provider,{value:a},n.children)},useContainer:function(){var e=l.a.useContext(t);if(null===e)throw new Error("Component must be wrapped with <Container.Provider>");return e}}}function x(e){return e.useContainer()}var k={showErrors:"onFocus",showErrorsDelay:500,disableNextWhenErrors:!1},j=w(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{config:Object(O.a)({},k,e)}}),y=n(48),S=n(3),P=n(9),I=n(22),D=n(46),T=w(function(){var e=Object(i.useState)({}),t=Object(S.a)(e,2),n=t[0],a=t[1],r=function(e,t){var r=Object(P.a)(n,function(n){var a=n[e]||{};a[t]||(a[t]=Date.now()),n[e]=a});a(r)};return{fieldStates:n,get:function(e){return n[e]||{}},focus:function(e){return r(e,"focus")},valueChanged:function(e){return r(e,"valueChanged")},blur:function(e){return r(e,"blur")}}}),V=w(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=x(T),n=Object(i.useState)(e),a=Object(S.a)(n,2),r=a[0],l=a[1];return{formValues:r,setValue:function(e,n){var a=Object(P.a)(r,function(t){Object(D.a)(t,e,n)});l(a),t.valueChanged(e),console.log("formValues:",JSON.stringify(a,null,2))},getValue:function(e){return Object(I.a)(r,e)},addToCollection:function(e){var t=Object(P.a)(r,function(t){var n=Object(I.a)(t,e,[]),a=[].concat(Object(y.a)(n),[{}]);Object(D.a)(t,e,a)});l(t)},deleteFromCollection:function(e,t){var n=Object(P.a)(r,function(n){var a=Object(I.a)(n,e),r=[].concat(Object(y.a)(a.slice(0,t)),Object(y.a)(a.slice(t+1)));Object(D.a)(n,e,r)});l(n)},getCollectionSize:function(e){var t=Object(I.a)(r,e);return t?t.length:0}}});s.a.addTransform("toUpperCase",function(e){return e.toUpperCase()}),s.a.addTransform("toLowerCase",function(e){return e.toLowerCase()}),s.a.addTransform("isAlpha",function(e){return e&&f()(e)}),s.a.addTransform("isAlphanumeric",function(e){return e&&b()(e)}),s.a.addTransform("isCurrency",function(e){return e&&v()(e)}),s.a.addTransform("isEmail",function(e){return e&&E()(e)}),s.a.addTransform("isNumeric",function(e){return e&&C()(e)}),s.a.addBinaryOp("_=",20,function(e,t){return e.toLowerCase()===t.toLowerCase()});var F=w(function(){var e=x(j),t=x(V),n=function(n,a,r){var i=t.getValue(n),l={formValues:t.formValues,fieldValue:i,value:i,config:e.config,fieldDef:a};return s.a.evalSync(r,l)},a={validIf:{validate:function(e,t,a){return n(e,t,a)},defaultMessage:"This field is invalid"},invalidIf:{validate:function(e,t,a){return!n(e,t,a)},defaultMessage:"This field is invalid"},requiredIf:{validate:function(e,a,r){return!n(e,a,r)||N.required.validate(t.getValue(e))},defaultMessage:N.required.defaultMessage}};return{evaluate:n,expressionValidations:a}}),L=w(function(){var e=x(F);return{shouldShow:function(t,n){return!n.showIf||n.showIf.some(function(a){return e.evaluate(t,n,a)})}}}),M=function(e,t){return t?""!==e?e+"."+t:t:e},_=n(112),B=function(e){return l.a.createElement("div",{id:e.path+"_description",className:"pt-2 text-muted description"},e.text)},A=n(47);var q=w(function(){var e=Object(i.useState)({}),t=Object(S.a)(e,2),n=t[0],a=t[1];return{formState:n,nextClicked:function(){var e=Object(P.a)(n,function(e){e.nextClicked||(e.nextClicked=Date.now())});a(e)},clearNextClicked:function(){var e=Object(P.a)(n,function(e){e.nextClicked=void 0});a(e)},submitClicked:function(){var e=Object(P.a)(n,function(e){e.submitClicked||(e.submitClicked=Date.now())});a(e)},nextOrSubmit:function(){return!!n.nextClicked||!!n.submitClicked}}}),R=w(function(){var e=x(j),t=x(V),n=x(T),a=x(q),r=x(F),l=x(L),c=Object(i.useState)(0),o=Object(S.a)(c,2),u=o[0],s=o[1];Object(i.useEffect)(function(){u>Date.now()&&setTimeout(function(){return s(0)},u-Date.now())},[u]);var d=e.config,f=function(e,n){return!n.validation||n.validation.length<=0?null:n.validation.reduce(function(a,i){return null!=a?a:function(e,n,a){if("string"===typeof e){var i=t.getValue(n)||"",l=N[e];return l.validate(i)?null:l.defaultMessage}if(function(e){return void 0!==e.expression}(e)){var c=r.expressionValidations[e.name];return c.validate(n,a,e.expression)?null:e.message||c.defaultMessage}var o=t.getValue(n)||"",u=N[e.name];return u.validate(o)?null:e.message||u.defaultMessage}(i,e,n)},null)};var m=function(e,t){if(a.nextOrSubmit()||"immediately"===d.showErrors)return!0;var r=n.get(e);return"onFocus"===d.showErrors&&r.focus?b(r.focus):"onValueChanged"===d.showErrors&&r.valueChanged?b(r.valueChanged):!("onBlur"!==d.showErrors||!r.blur)&&b(r.blur)},b=function(e){return!d.showErrorsDelay||0===d.showErrorsDelay||(e+d.showErrorsDelay<Date.now()||(s(e+d.showErrorsDelay),!1))};return{validate:f,shouldShowErrors:m,validateAndShouldShow:function(e,t){return m(e,t)?f(e,t):null},hasErrorsRecursively:function e(n,a){return!(!a||!l.shouldShow(n,a))&&(null!=f(n,a)||!!a.children&&a.children.some(function(a){var r,i=M(n,a.fieldId);if(!l.shouldShow(i,a))return!1;if(r=a.type,X.hasOwnProperty(r)){for(var c=t.getCollectionSize(i),o=0;o<c;o++)if(e(i+"["+o+"]",a))return!0;return!1}return e(i,a)}))}}}),U=function(e){return l.a.createElement("label",{htmlFor:e.htmlFor,className:"mr-2 h5 "+(e.error?"text-danger":"")},e.text)},K=function(e){var t=x(R).validateAndShouldShow(e.path,e.def);return l.a.createElement("div",{className:"form-group pt-2"},e.def.attributes.label&&l.a.createElement(U,{htmlFor:e.path,text:e.def.attributes.label,error:!!t}),e.children,t&&l.a.createElement("div",{className:"error-message text-danger pt-2"},t),e.def.attributes.description&&l.a.createElement(B,{path:e.path,text:e.def.attributes.description}))},z=w(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object(i.useState)(e.inline||{}),n=Object(S.a)(t,2),a=n[0],l=n[1];Object(i.useEffect)(function(){e.http.forEach(function(e){r()(e).then(function(t){c(e.name,t.data)})})},[]);var c=function(e,t){l(Object(P.a)(a,function(n){n[e]=t}))};return{referenceData:a,set:c}}),G=n(43),J=n.n(G),W=n(111),H=w(function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];var e=x(j),t=x(R),n=x(q),a=x(L),r=Object(i.useState)(""),l=Object(S.a)(r,2),c=l[0],o=l[1],u=Object(i.useState)([]),s=Object(S.a)(u,2),d=s[0],f=s[1],m=Object(i.useState)(-1),b=Object(S.a)(m,2),h=b[0],v=b[1],p=d.findIndex(function(e){return a.shouldShow(c,e)}),E=Object(W.a)(d,function(e){return a.shouldShow(c,e)}),g=h===p,C=h===E,N=function(){return t.hasErrorsRecursively(c,d[h])},O=e.config.disableNextWhenErrors&&N();return{setUp:function(e,t){o(e),f(t),h<0&&v(t.findIndex(function(t){return a.shouldShow(e,t)}))},currentPageIndex:h,setCurrentPageIndex:v,currentIsFirst:g,currentIsLast:C,currentPageHasErrors:N,disableNext:O,previousClicked:function(){for(var e=h-1;e>=0;e--){var t=d[e];if(t&&a.shouldShow(c,t)){n.clearNextClicked(),v(e);break}}},nextClicked:function(){if(N())n.nextClicked();else for(var e=h+1;e<d.length;e++){var t=d[e];if(t&&a.shouldShow(c,t)){n.clearNextClicked(),v(e);break}}},submitClicked:function(){N()?n.submitClicked():console.log("Submit")}}}),Q={accordion:function(e){var t=x(L),n=x(H),a=Object(i.useRef)(null);if(Object(i.useEffect)(function(){e.definition.children&&n.setUp(e.path,e.definition.children)},[e.definition.children,e.path,n]),!e.definition.children)return null;var r=function(){a&&a.current&&window.scroll({top:a.current.getBoundingClientRect().top-100})},c=function(e){n.setCurrentPageIndex(e),r()},o=function(){n.previousClicked(),r()},u=function(){n.nextClicked(),r()};return l.a.createElement("div",{className:"accordion",role:"tablist","aria-multiselectable":"true"},e.definition.children.map(function(r,i){return t.shouldShow(e.path,r)&&l.a.createElement("div",{className:"card",key:e.path+"_PAGE_"+i},n.currentPageIndex===i&&l.a.createElement("div",{ref:a}),l.a.createElement("div",{className:"card-header cursor-pointer",onClick:function(){return c(i)}},l.a.createElement("h3",{className:"d-inline"},r.attributes.label),i<n.currentPageIndex&&l.a.createElement("button",{className:"link-button text-muted px-1",onClick:function(){return c(i)}},l.a.createElement("u",null,"edit"))),n.currentPageIndex===i&&l.a.createElement("div",{className:"card-body m-1"},r.children&&l.a.createElement(Z,{childFormElements:r.children,parentPath:e.parentPath}),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col"},l.a.createElement("nav",{"aria-label":"Page navigation"},l.a.createElement("ul",{className:"pagination mb-0"},!n.currentIsFirst&&l.a.createElement("li",{className:"page-item"},l.a.createElement("button",{className:"page-link",onClick:o},"Previous")),!n.currentIsLast&&l.a.createElement("li",{className:J()("page-item",{disabled:n.disableNext})},l.a.createElement("button",{className:"page-link",onClick:u,disabled:n.disableNext},"Next"))))),n.currentIsLast&&l.a.createElement("div",{className:"col"},l.a.createElement("button",{className:"btn btn-primary float-right",onClick:n.submitClicked},"Submit")))))}))},dropdown:function(e){var t=x(z),n=x(V),a=x(T),r=e.definition.attributes.options||[];return e.definition.attributes.referenceDataOptions&&(r=r.concat(t.referenceData[e.definition.attributes.referenceDataOptions])),l.a.createElement(K,{path:e.path,def:e.definition},l.a.createElement("select",{className:"form-control custom-select",id:e.definition.fieldId,value:n.getValue(e.path)||"",onChange:function(t){return n.setValue(e.path,t.currentTarget.value)},"aria-describedby":e.definition.fieldId+"_description",onFocus:function(){return a.focus(e.path)},onBlur:function(){return a.blur(e.path)}},l.a.createElement("option",{value:""}),r.map(function(e){var t="object"===typeof e?e.label:e,n="object"===typeof e?e.value:e;return l.a.createElement("option",{value:n,key:n||(Math.random()+1).toString(36).substring(2)},t)})))},textInput:function(e){var t=x(V),n=x(T);return l.a.createElement(K,{path:e.path,def:e.definition},l.a.createElement("input",{type:"text",className:"form-control",id:e.path,"aria-describedby":e.path+"_description",value:t.getValue(e.path)||"",onChange:function(n){return t.setValue(e.path,n.currentTarget.value)},onFocus:function(){return n.focus(e.path)},onBlur:function(){return n.blur(e.path)}}))},heading:function(e){return l.a.createElement("h"+e.definition.attributes.level,null,e.definition.attributes.text)},paragraph:function(e){return l.a.createElement("p",null,e.definition.attributes.text)},buttonGroup:function(e){var t=x(V),n=x(T),a=t.getValue(e.path),r=Object(i.useState)(null),c=Object(S.a)(r,2),o=c[0],u=c[1];return l.a.createElement(K,{path:e.path,def:e.definition},l.a.createElement("div",{className:"btn-group-wrapper",onFocus:function(){return n.focus(e.path)},onBlur:function(){return n.blur(e.path)}},l.a.createElement("div",{className:"btn-group btn-group-toggle"},e.definition.attributes.options.map(function(n,r){return l.a.createElement("label",{className:"btn btn-outline-primary"+(a===n?" active":"")+(o===r?" focus":""),key:e.path+"_OPTION_"+n,onFocus:function(){return u(r)},onBlur:function(){return u(null)}},l.a.createElement("input",{type:"radio",value:n,checked:n===a,onChange:function(n){return t.setValue(e.path,n.currentTarget.value)}}),n)}))))},tabs:function(e){var t=x(L),n=x(H);return Object(i.useEffect)(function(){e.definition.children&&n.setUp(e.path,e.definition.children)},[]),e.definition.children?n.currentPageIndex<0?null:l.a.createElement("div",{className:"card rounded-0"},l.a.createElement("div",{className:"card-header"},l.a.createElement("ul",{className:"nav "+(e.definition.attributes.pill?"nav-pills card-header-pills":"nav-tabs card-header-tabs")},e.definition.children.map(function(a,r){if(!t.shouldShow(e.path,a))return null;var i=e.path+"_PAGE_"+r;return r<n.currentPageIndex?l.a.createElement("li",{className:"nav-item",key:i},l.a.createElement("a",{className:"nav-link",href:"javascript:void(0)",onClick:function(){return n.setCurrentPageIndex(r)}},a.attributes.label)):r===n.currentPageIndex?l.a.createElement("li",{className:"nav-item",key:i},l.a.createElement("button",{className:"nav-link active"},a.attributes.label)):r>n.currentPageIndex?l.a.createElement("li",{className:"nav-item",key:i},l.a.createElement("button",{className:"nav-link disabled",tabIndex:-1,"aria-disabled":"true"},a.attributes.label)):null}))),l.a.createElement("div",{className:"card-body h-100"},l.a.createElement("div",{className:"container"},l.a.createElement(Z,{childFormElements:e.definition.children[n.currentPageIndex].children,parentPath:e.parentPath}),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col"},l.a.createElement("nav",{"aria-label":"Page navigation"},l.a.createElement("ul",{className:"pagination mb-0"},!n.currentIsFirst&&l.a.createElement("li",{className:"page-item"},l.a.createElement("button",{className:"page-link",onClick:n.previousClicked},"Previous")),!n.currentIsLast&&l.a.createElement("li",{className:J()("page-item",{disabled:n.disableNext})},l.a.createElement("button",{className:"page-link",onClick:n.nextClicked,disabled:n.disableNext},"Next"))))),n.currentIsLast&&l.a.createElement("div",{className:"col"},l.a.createElement("button",{className:"btn btn-primary float-right",onClick:n.submitClicked},"Submit")))))):null},autocomplete:function(e){var t=x(z),n=x(V),a=x(T),r=Object(i.useState)([]),c=Object(S.a)(r,2),o=c[0],u=c[1],s=Object(i.useState)(n.getValue(e.path)),d=Object(S.a)(s,2),f=d[0],m=(d[1],Object(i.useState)(n.getValue(e.path))),b=Object(S.a)(m,2),h=(b[0],b[1],Object(i.useRef)(),e.definition.attributes.options||[]);console.log("inlineOptions:",h),e.definition.attributes.referenceDataOptions&&t.referenceData[e.definition.attributes.referenceDataOptions]&&(h=o.concat(t.referenceData[e.definition.attributes.referenceDataOptions])),console.log("inlineOptionsAfter:",h);return console.log("suggestions:",o),l.a.createElement(K,{path:e.path,def:e.definition},l.a.createElement(A.a,null,l.a.createElement(A.c,null,function(t){var n=t.ref;return l.a.createElement("input",{ref:n,type:"text",className:"form-control",id:e.path,"aria-describedby":e.path+"_description",value:f,onChange:function(t){return function(t){var n=t.trim().toLowerCase(),a=h.filter(function(t){var a=t[e.definition.attributes.valueKey||"value"],r=t[e.definition.attributes.labelKey||"label"];return a.toLowerCase().includes(n)||r.toLowerCase().includes(n)});u(a)}(t.target.value)},onFocus:function(){return a.focus(e.path)},onBlur:function(){return a.blur(e.path)}})}),l.a.createElement(A.b,{placement:"bottom-start"},function(t){var n=t.ref,a=t.style,r=t.placement;return l.a.createElement("div",{ref:n,style:a,"data-placement":r},o&&o.length>0&&l.a.createElement("div",{className:"dropdown-menu show"},o.map(function(t){return l.a.createElement("span",{className:"dropdown-item",key:t[e.definition.attributes.valueKey||"value"]},t[e.definition.attributes.labelKey||"label"])})))})))}},X={list:function(e){var t=x(V);return l.a.createElement("div",{className:"form-group"},l.a.createElement("span",{className:"h4 align-middle mr-2"},e.definition.attributes.label),e.definition.attributes.description&&l.a.createElement(B,{path:e.path,text:e.definition.attributes.description}),Object(_.a)(t.getCollectionSize(e.path),function(n){return l.a.createElement("div",{className:"card border-bottom mb-3"+(0===n?" mt-2":""),key:e.path+"_COLLECTION_"+n},l.a.createElement("h5",{className:"card-header"},function(e){var t=["th","st","nd","rd"],n=e%100;return e+(t[(n-20)%10]||t[n]||t[0])}(n+1)," ",e.definition.attributes.itemLabel,l.a.createElement("button",{className:"close text-dark",onClick:function(){return t.deleteFromCollection(e.path,n)}},l.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),l.a.createElement("div",{className:"card-body pb-0"},e.definition.children&&l.a.createElement(Z,{childFormElements:e.definition.children,parentPath:e.path+"["+n+"]"})))}),l.a.createElement("button",{className:"btn btn-primary d-inline",onClick:function(){return t.addToCollection(e.path)}},"Add"))}},Y=Object(O.a)({},Q,X);var Z=function(e){var t=x(L);return l.a.createElement("div",null,e.childFormElements.map(function(n,a){var r=M(e.parentPath,n.fieldId);if(n.hidden||!t.shouldShow(r,n))return null;var i=function(e){var t=Y[e];return t||(console.warn("Could not find form element type:"+e),function(){return l.a.createElement("div",null,"Could not find form element type ",l.a.createElement("code",null,e),".")})}(n.type);return l.a.createElement(i,{definition:n,parentPath:e.parentPath,path:r,key:e.parentPath+"_"+a})}))},$=function(e){return l.a.createElement("div",{className:""},l.a.createElement(j.Provider,{initialState:e.formDef.config},l.a.createElement(z.Provider,{initialState:e.formDef.referenceData},l.a.createElement(q.Provider,null,l.a.createElement(T.Provider,null,l.a.createElement(V.Provider,null,l.a.createElement(F.Provider,null,l.a.createElement(L.Provider,null,l.a.createElement(R.Provider,null,l.a.createElement(H.Provider,null,l.a.createElement(Z,{childFormElements:e.formDef.elements,parentPath:""})))))))))))};n(109);r.a.get("api/formDefinition/exampleFormDefinition.json").then(function(e){o.a.render(l.a.createElement($,{formDef:e.data}),document.getElementById("form"))}).catch(function(e){throw console.error(e),new Error(e)})},71:function(e,t,n){e.exports=n(110)}},[[71,1,2]]]);
//# sourceMappingURL=main.cdf2c9f2.chunk.js.map