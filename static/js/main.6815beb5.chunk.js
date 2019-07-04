(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{61:function(e,t,n){e.exports=n(93)},92:function(e,t,n){},93:function(e,t,n){"use strict";n.r(t);var a=n(56),r=n.n(a),i=n(0),o=n.n(i),l=n(57),u=n.n(l),c=n(12),s=n.n(c),d=n(27),f=n.n(d),m=n(28),h=n.n(m),v=n(29),p=n.n(v),b=n(30),E=n.n(b),g=n(31),C=n.n(g),w={required:{validate:function(e){return!(null==e||e.length<=0||""===e)},defaultMessage:"This field is required"},email:{validate:function(e){return E()(e)},defaultMessage:"This field must be an email address"},alpha:{validate:function(e){return f()(e)},defaultMessage:"This field must be only letters"},numeric:{validate:function(e){return C()(e)},defaultMessage:"This field must be only numbers"},alphanumeric:{validate:function(e){return h()(e)},defaultMessage:"This field must be only letters and numbers"},currency:{validate:function(e){return p()(e)},defaultMessage:"This field must be a currency amount"}};function O(e){var t=o.a.createContext(null);return{Provider:function(n){var a=e(n.initialState);return o.a.createElement(t.Provider,{value:a},n.children)},useContainer:function(){var e=o.a.useContext(t);if(null===e)throw new Error("Component must be wrapped with <Container.Provider>");return e}}}function N(e){return e.useContainer()}var x={showErrors:"onFocus",showErrorsDelay:500,disableNextWhenErrors:!1},y=O(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{config:Object.assign(x,e)}}),j=n(39),k=n(5),S=n(11),P=n(19),T=n(38),V=O(function(){var e=Object(i.useState)({}),t=Object(k.a)(e,2),n=t[0],a=t[1],r=function(e,t){var r=Object(S.a)(n,function(n){var a=n[e]||{};a[t]||(a[t]=Date.now()),n[e]=a});a(r)};return{fieldStates:n,get:function(e){return n[e]||{}},focus:function(e){return r(e,"focus")},valueChanged:function(e){return r(e,"valueChanged")},blur:function(e){return r(e,"blur")}}}),D=O(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=N(V),n=Object(i.useState)(e),a=Object(k.a)(n,2),r=a[0],o=a[1];return{formValues:r,setValue:function(e,n){var a=Object(S.a)(r,function(t){Object(T.a)(t,e,n)});o(a),t.valueChanged(e)},getValue:function(e){return Object(P.a)(r,e)},addToCollection:function(e){var t=Object(S.a)(r,function(t){var n=Object(P.a)(t,e,[]),a=[].concat(Object(j.a)(n),[{}]);Object(T.a)(t,e,a)});o(t)},deleteFromCollection:function(e,t){var n=Object(S.a)(r,function(n){var a=Object(P.a)(n,e),r=[].concat(Object(j.a)(a.slice(0,t)),Object(j.a)(a.slice(t+1)));Object(T.a)(n,e,r)});o(n)},getCollectionSize:function(e){var t=Object(P.a)(r,e);return t?t.length:0}}});s.a.addTransform("toUpperCase",function(e){return e.toUpperCase()}),s.a.addTransform("toLowerCase",function(e){return e.toLowerCase()}),s.a.addTransform("isAlpha",function(e){return e&&f()(e)}),s.a.addTransform("isAlphanumeric",function(e){return e&&h()(e)}),s.a.addTransform("isCurrency",function(e){return e&&p()(e)}),s.a.addTransform("isEmail",function(e){return e&&E()(e)}),s.a.addTransform("isNumeric",function(e){return e&&C()(e)}),s.a.addBinaryOp("_=",20,function(e,t){return e.toLowerCase()===t.toLowerCase()});var F=O(function(){var e=N(y),t=N(D),n=function(n,a,r){var i=t.getValue(n),o={formValues:t.formValues,fieldValue:i,value:i,config:e.config,fieldDef:a};return s.a.evalSync(r,o)},a={validIf:{validate:function(e,t,a){return n(e,t,a)},defaultMessage:"This field is invalid"},invalidIf:{validate:function(e,t,a){return!n(e,t,a)},defaultMessage:"This field is invalid"},requiredIf:{validate:function(e,a,r){return!n(e,a,r)||w.required.validate(t.getValue(e))},defaultMessage:w.required.defaultMessage}};return{evaluate:n,expressionValidations:a}}),I=O(function(){var e=N(F);return{shouldShow:function(t,n){return!n.showIf||n.showIf.some(function(a){return e.evaluate(t,n,a)})}}}),M=function(e,t){return t?""!==e?e+"."+t:t:e},_=n(95),B=function(e){return o.a.createElement("div",{id:e.path+"_description",className:"pt-2 text-muted description"},e.text)};var L=O(function(){var e=Object(i.useState)({}),t=Object(k.a)(e,2),n=t[0],a=t[1];return{formState:n,nextClicked:function(){var e=Object(S.a)(n,function(e){e.nextClicked||(e.nextClicked=Date.now())});a(e)},clearNextClicked:function(){var e=Object(S.a)(n,function(e){e.nextClicked=void 0});a(e)},submitClicked:function(){var e=Object(S.a)(n,function(e){e.submitClicked||(e.submitClicked=Date.now())});a(e)},nextOrSubmit:function(){return!!n.nextClicked||!!n.submitClicked}}}),A=O(function(){var e=N(y),t=N(D),n=N(V),a=N(L),r=N(F),o=N(I),l=Object(i.useState)(0),u=Object(k.a)(l,2),c=u[0],s=u[1];Object(i.useEffect)(function(){c>Date.now()&&setTimeout(function(){return s(0)},c-Date.now())},[c]);var d=e.config,f=function(e,n){return!n.validation||n.validation.length<=0?null:n.validation.reduce(function(a,i){return null!=a?a:function(e,n,a){if("string"===typeof e){var i=t.getValue(n)||"",o=w[e];return o.validate(i)?null:o.defaultMessage}if(function(e){return void 0!==e.expression}(e)){var l=r.expressionValidations[e.name];return l.validate(n,a,e.expression)?null:e.message||l.defaultMessage}var u=t.getValue(n)||"",c=w[e.name];return c.validate(u)?null:e.message||c.defaultMessage}(i,e,n)},null)};var m=function(e,t){if(a.nextOrSubmit()||"immediately"===d.showErrors)return!0;var r=n.get(e);return"onFocus"===d.showErrors&&r.focus?h(r.focus):"onValueChanged"===d.showErrors&&r.valueChanged?h(r.valueChanged):!("onBlur"!==d.showErrors||!r.blur)&&h(r.blur)},h=function(e){return!d.showErrorsDelay||0===d.showErrorsDelay||(e+d.showErrorsDelay<Date.now()||(s(e+d.showErrorsDelay),!1))};return{validate:f,shouldShowErrors:m,validateAndShouldShow:function(e,t){return m(e,t)?f(e,t):null},hasErrorsRecursively:function e(n,a){return!(!a||!o.shouldShow(n,a))&&(null!=f(n,a)||!!a.children&&a.children.some(function(a){var r,i=M(n,a.fieldId);if(!o.shouldShow(i,a))return!1;if(r=a.type,W.hasOwnProperty(r)){for(var l=t.getCollectionSize(i),u=0;u<l;u++)if(e(i+"["+u+"]",a))return!0;return!1}return e(i,a)}))}}}),q=function(e){return o.a.createElement("label",{htmlFor:e.htmlFor,className:"mr-2 h5 "+(e.error?"text-danger":"")},e.text)},R=function(e){var t=N(A).validateAndShouldShow(e.path,e.def);return o.a.createElement("div",{className:"form-group pt-2"},e.def.attributes.label&&o.a.createElement(q,{htmlFor:e.path,text:e.def.attributes.label,error:!!t}),e.children,t&&o.a.createElement("div",{className:"error-message text-danger pt-2"},t),e.def.attributes.description&&o.a.createElement(B,{path:e.path,text:e.def.attributes.description}))},z=n(58),G=n.n(z),J=n(94),U={accordion:function(e){var t=N(y),n=N(A),a=N(L),r=N(I),l=Object(i.useRef)(null),u=e.definition.children.findIndex(function(t){return r.shouldShow(e.path,t)}),c=Object(J.a)(e.definition.children,function(t){return r.shouldShow(e.path,t)}),s=Object(i.useState)(u),d=Object(k.a)(s,2),f=d[0],m=d[1];if(!e.definition.children)return null;var h=f===u,v=f===c,p=function(){return n.hasErrorsRecursively(e.path,e.definition.children[f])},b=t.config.disableNextWhenErrors&&p(),E=function(e){m(e),l&&l.current&&window.scroll({top:l.current.getBoundingClientRect().top-100})},g=function(){for(var t=f-1;t>=0;t--){var n=e.definition.children&&e.definition.children[t];if(n&&r.shouldShow(e.path,n)){E(t),a.clearNextClicked();break}}},C=function(){if(p())a.nextClicked();else for(var t=f+1;t<e.definition.children.length;t++){var n=e.definition.children&&e.definition.children[t];if(n&&r.shouldShow(e.path,n)){E(t),a.clearNextClicked();break}}},w=function(){p()?a.submitClicked():console.log("Submit")};return o.a.createElement("div",{className:"accordion",role:"tablist","aria-multiselectable":"true"},e.definition.children.map(function(t,n){return r.shouldShow(e.path,t)&&o.a.createElement("div",{className:"card",key:e.path+"_PAGE_"+n},f===n&&o.a.createElement("div",{ref:l}),o.a.createElement("div",{className:"card-header cursor-pointer",onClick:function(){return E(n)}},o.a.createElement("h3",{className:"d-inline"},t.attributes.label),n<f&&o.a.createElement("button",{className:"link-button text-muted px-1",onClick:function(){return E(n)}},o.a.createElement("u",null,"edit"))),f===n&&o.a.createElement("div",{className:"card-body m-1"},t.children&&o.a.createElement(K,{childFormElements:t.children,parentPath:e.parentPath}),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col"},o.a.createElement("nav",{"aria-label":"Page navigation"},o.a.createElement("ul",{className:"pagination mb-0"},!h&&o.a.createElement("li",{className:"page-item"},o.a.createElement("button",{className:"page-link",onClick:g},"Previous")),!v&&o.a.createElement("li",{className:G()("page-item",{disabled:b})},o.a.createElement("button",{className:"page-link",onClick:C,disabled:b},"Next"))))),v&&o.a.createElement("div",{className:"col"},o.a.createElement("button",{className:"btn btn-primary float-right",onClick:w},"Submit")))))}))},dropdown:function(e){var t=N(D),n=N(V);return o.a.createElement(R,{path:e.path,def:e.definition},o.a.createElement("select",{className:"form-control custom-select",id:e.definition.fieldId,value:t.getValue(e.path)||"",onChange:function(n){return t.setValue(e.path,n.currentTarget.value)},"aria-describedby":e.definition.fieldId+"_description",onFocus:function(){return n.focus(e.path)},onBlur:function(){return n.blur(e.path)}},o.a.createElement("option",{value:""}),e.definition.attributes.options.map(function(e){return o.a.createElement("option",{value:e,key:e},e)})))},textInput:function(e){var t=N(D),n=N(V);return o.a.createElement(R,{path:e.path,def:e.definition},o.a.createElement("input",{type:"text",className:"form-control",id:e.definition.fieldId,"aria-describedby":e.path+"_description",value:t.getValue(e.path)||"",onChange:function(n){return t.setValue(e.path,n.currentTarget.value)},onFocus:function(){return n.focus(e.path)},onBlur:function(){return n.blur(e.path)}}))},heading:function(e){return o.a.createElement("h"+e.definition.attributes.level,null,e.definition.attributes.text)},paragraph:function(e){return o.a.createElement("p",null,e.definition.attributes.text)},buttonGroup:function(e){var t=N(D),n=N(V),a=t.getValue(e.path),r=Object(i.useState)(null),l=Object(k.a)(r,2),u=l[0],c=l[1];return o.a.createElement(R,{path:e.path,def:e.definition},o.a.createElement("div",{className:"btn-group-wrapper",onFocus:function(){return n.focus(e.path)},onBlur:function(){return n.blur(e.path)}},o.a.createElement("div",{className:"btn-group btn-group-toggle"},e.definition.attributes.options.map(function(n,r){return o.a.createElement("label",{className:"btn btn-outline-secondary"+(a===n?" active":"")+(u===r?" focus":""),key:e.path+"_OPTION_"+n,onFocus:function(){return c(r)},onBlur:function(){return c(null)}},o.a.createElement("input",{type:"radio",value:n,checked:n===a,onChange:function(n){return t.setValue(e.path,n.currentTarget.value)}}),n)}))))}},W={list:function(e){var t=N(D);return o.a.createElement("div",{className:"form-group"},o.a.createElement("span",{className:"h4 align-middle mr-2"},e.definition.attributes.label),e.definition.attributes.description&&o.a.createElement(B,{path:e.path,text:e.definition.attributes.description}),Object(_.a)(t.getCollectionSize(e.path),function(n){return o.a.createElement("div",{className:"card border-bottom mb-3"+(0===n?" mt-2":""),key:e.path+"_COLLECTION_"+n},o.a.createElement("h5",{className:"card-header"},function(e){var t=["th","st","nd","rd"],n=e%100;return e+(t[(n-20)%10]||t[n]||t[0])}(n+1)," ",e.definition.attributes.itemLabel,o.a.createElement("button",{className:"close text-dark",onClick:function(){return t.deleteFromCollection(e.path,n)}},o.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),o.a.createElement("div",{className:"card-body pb-0"},e.definition.children&&o.a.createElement(K,{childFormElements:e.definition.children,parentPath:e.path+"["+n+"]"})))}),o.a.createElement("button",{className:"btn btn-secondary d-inline",onClick:function(){return t.addToCollection(e.path)}},"Add"))}},H=Object.assign(U,W);var K=function(e){var t=N(I);return o.a.createElement("div",null,e.childFormElements.map(function(n,a){var r=M(e.parentPath,n.fieldId);if(!t.shouldShow(r,n))return null;var i=function(e){var t=H[e];return t||(console.warn("Could not find form element type:"+e),function(){return o.a.createElement("div",null,"Could not find form element type ",e,".")})}(n.type);return o.a.createElement(i,{definition:n,parentPath:e.parentPath,path:r,key:e.parentPath+"_"+a})}))},Q=function(e){return o.a.createElement("div",{className:"p-2 container"},o.a.createElement(y.Provider,{initialState:e.formDef.config},o.a.createElement(L.Provider,null,o.a.createElement(V.Provider,null,o.a.createElement(D.Provider,null,o.a.createElement(F.Provider,null,o.a.createElement(I.Provider,null,o.a.createElement(A.Provider,null,o.a.createElement(K,{childFormElements:e.formDef.elements,parentPath:""})))))))))};n(92);r.a.get("exampleFormDefinition.json").then(function(e){u.a.render(o.a.createElement(Q,{formDef:e.data}),document.getElementById("form"))}).catch(function(e){throw console.error(e),new Error(e)})}},[[61,1,2]]]);
//# sourceMappingURL=main.6815beb5.chunk.js.map