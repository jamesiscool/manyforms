(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{29:function(e,t,n){e.exports=n(39)},38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(21),c=n.n(i),l=function(e,t){return t?""!==e?e+"."+t:t:e},o=n(41),u=n(1),s=function(e){return r.a.createElement("div",{id:e.path+"_description",className:"pt-2 text-muted description"},e.text)},d=n(16),f=n(2),m=n(4),b=n(10),h=n(15);var p=Object(u.a)(function(){var e=Object(a.useState)({}),t=Object(f.a)(e,2),n=t[0],r=t[1],i=function(e,t){var a=Object(m.a)(n,function(n){var a=n[e]||{};a[t]||(a[t]=Date.now()),n[e]=a});r(a)};return{fieldStates:n,get:function(e){return n[e]||{}},focus:function(e){return i(e,"focus")},valueChanged:function(e){return i(e,"valueChanged")},blur:function(e){return i(e,"blur")}}});var v=Object(u.a)(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object(u.b)(p),n=Object(a.useState)(e),r=Object(f.a)(n,2),i=r[0],c=r[1];return{formValues:i,setValue:function(e,n){var a=Object(m.a)(i,function(t){Object(h.a)(t,e,n)});c(a),t.valueChanged(e)},getValue:function(e){return Object(b.a)(i,e)},addToCollection:function(e){var t=Object(m.a)(i,function(t){var n=Object(b.a)(t,e,[]),a=[].concat(Object(d.a)(n),[{}]);Object(h.a)(t,e,a)});c(t)},deleteFromCollection:function(e,t){var n=Object(m.a)(i,function(n){var a=Object(b.a)(n,e),r=[].concat(Object(d.a)(a.slice(0,t)),Object(d.a)(a.slice(t+1)));Object(h.a)(n,e,r)});c(n)},getCollectionSize:function(e){var t=Object(b.a)(i,e);return t?t.length:0}}}),E=n(23),g=n.n(E),O=n(24),j=n.n(O),C=n(25),N=n.n(C),k=n(26),w=n.n(k),y=n(27),x=n.n(y),P={email:{validate:function(e){return w()(e)},defaultMessage:"Please enter a email address"},alpha:{validate:function(e){return g()(e)},defaultMessage:"Please enter only letters"},numeric:{validate:function(e){return x()(e)},defaultMessage:"Please enter only numbers"},alphanumeric:{validate:function(e){return j()(e)},defaultMessage:"Please enter only letters and numbers"},currency:{validate:function(e){return N()(e)},defaultMessage:"Please enter a currency amount"}},S={showErrors:"afterBlur",showErrorsDelay:0,disableNextWhenErrors:!1},D=Object(u.a)(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{config:Object.assign(S,e)}});var F=Object(u.a)(function(){var e=Object(a.useState)({}),t=Object(f.a)(e,2),n=t[0],r=t[1];return{formState:n,nextClicked:function(){var e=Object(m.a)(n,function(e){e.nextClicked||(e.nextClicked=Date.now())});r(e)},clearNextClicked:function(){var e=Object(m.a)(n,function(e){e.nextClicked=void 0});r(e)},submitClicked:function(){var e=Object(m.a)(n,function(e){e.submitClicked||(e.submitClicked=Date.now())});r(e)},nextOrSubmit:function(){return!!n.nextClicked||!!n.submitClicked}}});var V=Object(u.a)(function(){var e=Object(u.b)(D).config,t=Object(u.b)(v),n=Object(u.b)(p),r=Object(u.b)(F),i=Object(a.useState)(0),c=Object(f.a)(i,2),o=c[0],s=c[1];Object(a.useEffect)(function(){o>Date.now()&&setTimeout(function(){return s(0)},o-Date.now())},[o]);var d=function(e,n){if(!n.validation)return null;var a=t.getValue(e);if(n.validation.required&&(!a||a.length<=0))return"This field is required";if(n.validation.rules){var r=n.validation.rules.find(function(e){return!P[e.name].validate(a)});if(r)return r.message||P[r.name].defaultMessage}return null},m=function(t,a){if(r.nextOrSubmit()||"immediately"===e.showErrors)return!0;var i=n.get(t);return"afterFocus"===e.showErrors&&i.focus?b(i.focus):"afterValueChanged"===e.showErrors&&i.valueChanged?b(i.valueChanged):!("afterBlur"!==e.showErrors||!i.blur)&&b(i.valueChanged)},b=function(t){return!e.showErrorsDelay||0===e.showErrorsDelay||t+e.showErrorsDelay<Date.now()||(s(t+e.showErrorsDelay),!1)};return{validate:d,shouldShowErrors:m,validateAndShouldShow:function(e,t){return m(e,t)?d(e,t):null},validateRecursively:function e(n,a){return!!a&&(!!d(n,a)||!!a.children&&a.children.some(function(a){var r,i=l(n,a.fieldId);if(r=a.type,A.hasOwnProperty(r)){for(var c=t.getCollectionSize(i),o=0;o<c;o++)if(e(i+"["+o+"]",a))return!0;return!1}return e(i,a)}))}}}),T=function(e){return r.a.createElement("label",{htmlFor:e.htmlFor,className:"mr-2 h5 "+(e.error?"text-danger":"")},e.text)},_=function(e){var t=Object(u.b)(V).validateAndShouldShow(e.path,e.def);return r.a.createElement("div",{className:"form-group py-2"},e.def.attributes.label&&r.a.createElement(T,{htmlFor:e.path,text:e.def.attributes.label,error:!!t}),e.children,t&&r.a.createElement("div",{className:"error-message text-danger pt-2"},t),e.def.attributes.description&&r.a.createElement(s,{path:e.path,text:e.def.attributes.description}))},I=n(28),B=n.n(I),M={accordion:function(e){var t=Object(u.b)(D).config,n=Object(u.b)(V),i=Object(u.b)(F),c=Object(a.useRef)(null),l=Object(a.useState)(0),o=Object(f.a)(l,2),s=o[0],d=o[1];if(!e.definition.children)return null;var m=0===s,b=s===e.definition.children.length-1,h=n.validateRecursively(e.path,e.definition.children[s]),p=t.disableNextWhenErrors&&h,v=function(e){d(e),c&&c.current&&window.scroll({top:c.current.getBoundingClientRect().top-100})},E=function(){v(s-1),i.clearNextClicked()},g=function(){h?i.nextClicked():(i.clearNextClicked(),v(s+1))},O=function(){h?i.submitClicked():console.log("Submit")};return r.a.createElement("div",{className:"accordion",role:"tablist","aria-multiselectable":"true"},e.definition.children.map(function(t,n){return r.a.createElement("div",{className:"card",key:e.path+"_PAGE_"+n},s===n&&r.a.createElement("div",{ref:c}),r.a.createElement("div",{className:"card-header cursor-pointer",onClick:function(){return v(n)}},r.a.createElement("h3",{className:"d-inline"},t.attributes.label),n<s&&r.a.createElement("button",{className:"link-button text-muted px-1",onClick:function(){return v(n)}},r.a.createElement("u",null,"edit"))),s===n&&r.a.createElement("div",{className:"card-body m-1"},t.children&&r.a.createElement(q,{childFormElements:t.children,parentPath:e.parentPath}),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("nav",{"aria-label":"Page navigation"},r.a.createElement("ul",{className:"pagination mb-0"},!m&&r.a.createElement("li",{className:"page-item"},r.a.createElement("button",{className:"page-link",onClick:E},"Previous")),!b&&r.a.createElement("li",{className:B()("page-item",{disabled:p})},r.a.createElement("button",{className:"page-link",onClick:g,disabled:p},"Next"))))),b&&r.a.createElement("div",{className:"col"},r.a.createElement("button",{className:"btn btn-primary float-right",onClick:O},"Submit")))))}))},dropdown:function(e){var t=Object(u.b)(v),n=Object(u.b)(p);return r.a.createElement(_,{path:e.path,def:e.definition},r.a.createElement("select",{className:"form-control custom-select",id:e.definition.fieldId,value:t.getValue(e.path)||"",onChange:function(n){return t.setValue(e.path,n.currentTarget.value)},"aria-describedby":e.definition.fieldId+"_description",onFocus:function(){return n.focus(e.path)},onBlur:function(){return n.blur(e.path)}},r.a.createElement("option",{value:"",disabled:e.definition.validation&&e.definition.validation.required}),e.definition.attributes.options.map(function(e){return r.a.createElement("option",{value:e,key:e},e)})))},textInput:function(e){var t=Object(u.b)(v),n=Object(u.b)(p);return r.a.createElement(_,{path:e.path,def:e.definition},r.a.createElement("input",{type:"text",className:"form-control",id:e.definition.fieldId,"aria-describedby":e.path+"_description",value:t.getValue(e.path)||"",onChange:function(n){return t.setValue(e.path,n.currentTarget.value)},onFocus:function(){return n.focus(e.path)},onBlur:function(){return n.blur(e.path)}}))},heading:function(e){return r.a.createElement("h"+e.definition.attributes.level,null,e.definition.attributes.text)},paragraph:function(e){return r.a.createElement("p",null,e.definition.attributes.text)},buttonGroup:function(e){var t=Object(u.b)(v),n=Object(u.b)(p),i=t.getValue(e.path),c=Object(a.useState)(null),l=Object(f.a)(c,2),o=l[0],s=l[1];return r.a.createElement(_,{path:e.path,def:e.definition},r.a.createElement("div",{className:"btn-group-wrapper",onFocus:function(){return n.focus(e.path)},onBlur:function(){return n.blur(e.path)}},r.a.createElement("div",{className:"btn-group btn-group-toggle"},e.definition.attributes.options.map(function(n,a){return r.a.createElement("label",{className:"btn btn-outline-secondary"+(i===n?" active":"")+(o===a?" focus":""),key:e.path+"_OPTION_"+n,onFocus:function(){return s(a)},onBlur:function(){return s(null)}},r.a.createElement("input",{type:"radio",value:n,checked:n===i,onChange:function(n){return t.setValue(e.path,n.currentTarget.value)}}),n)}))))}},A={list:function(e){var t=Object(u.b)(v);return r.a.createElement("div",{className:"form-group"},r.a.createElement("span",{className:"h4 align-middle mr-2"},e.definition.attributes.label),e.definition.attributes.description&&r.a.createElement(s,{path:e.path,text:e.definition.attributes.description}),Object(o.a)(t.getCollectionSize(e.path),function(n){return r.a.createElement("div",{className:"card border-bottom mb-3"+(0===n?" mt-2":""),key:e.path+"_COLLECTION_"+n},r.a.createElement("h5",{className:"card-header"},function(e){var t=["th","st","nd","rd"],n=e%100;return e+(t[(n-20)%10]||t[n]||t[0])}(n+1)," ",e.definition.attributes.itemLabel,r.a.createElement("button",{className:"close text-dark",onClick:function(){return t.deleteFromCollection(e.path,n)}},r.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),r.a.createElement("div",{className:"card-body pb-0"},e.definition.children&&r.a.createElement(q,{childFormElements:e.definition.children,parentPath:e.path+"["+n+"]"})))}),r.a.createElement("button",{className:"btn btn-secondary d-inline",onClick:function(){return t.addToCollection(e.path)}},"Add"))}},R=Object.assign(M,A);var q=function(e){return r.a.createElement("div",null,e.childFormElements.map(function(t,n){var a=function(e){var t=R[e];return t||(console.warn("Could not find form element type:"+e),function(){return r.a.createElement("div",null,"Could not find form element type ",e,".")})}(t.type);return r.a.createElement(a,{definition:t,parentPath:e.parentPath,path:l(e.parentPath,t.fieldId),key:e.parentPath+"_"+n})}))},z=function(e){return r.a.createElement("div",{className:"p-2 container"},r.a.createElement(F.Provider,null,r.a.createElement(D.Provider,{initialState:e.formDef.config},r.a.createElement(p.Provider,null,r.a.createElement(v.Provider,null,r.a.createElement(V.Provider,null,r.a.createElement(q,{childFormElements:e.formDef.elements,parentPath:""})))))))};n(38);fetch("exampleFormDefinition.json").then(function(e){if(!e.ok)throw new Error(e.statusText);return e.json()}).then(function(e){c.a.render(r.a.createElement(z,{formDef:e}),document.getElementById("form"))})}},[[29,1,2]]]);
//# sourceMappingURL=main.eb86659d.chunk.js.map