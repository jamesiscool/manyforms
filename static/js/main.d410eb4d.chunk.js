(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(e,t,n){e.exports=n(26)},25:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(15),l=n.n(r),o=n(27),c=function(e){return i.a.createElement("div",{id:e.fieldPath+"_description",className:"pt-2 text-muted description"},e.text)},d=n(12),u=n(9),s=n(11),m=n(28),f=n(29),b=n(17);var p=Object(b.a)(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object(a.useState)(e),n=Object(u.a)(t,2),i=n[0],r=n[1];return{formValues:i,setValue:function(e,t){var n=Object(s.a)(i,function(n){Object(m.a)(n,e,t)});r(n)},getValue:function(e){return Object(f.a)(i,e)},addToCollection:function(e){var t=Object(s.a)(i,function(t){var n=Object(f.a)(t,e,[]),a=[].concat(Object(d.a)(n),[{}]);console.log("newCollection:",a),Object(m.a)(t,e,a)});r(t)},deleteFromCollection:function(e,t){var n=Object(s.a)(i,function(n){var a=Object(f.a)(n,e),i=[].concat(Object(d.a)(a.slice(0,t)),Object(d.a)(a.slice(t+1)));Object(m.a)(n,e,i)});r(n)},getCollectionSize:function(e){var t=Object(f.a)(i,e);return t?t.length:0}}}),h=function(e){return i.a.createElement("label",{htmlFor:e.htmlFor,className:"mr-2 h5 "+(e.error?"text-danger":"")},e.text)},E=function(e){return i.a.createElement("div",{className:"form-group py-2"},e.label&&i.a.createElement(h,{htmlFor:e.fieldPath,text:e.label,error:!!e.error}),e.children,e.description&&i.a.createElement(c,{fieldPath:e.fieldPath,text:e.description}),e.error&&i.a.createElement("div",{className:"text-danger pt-2"},e.error))},v={accordion:function(e){var t=Object(a.useRef)(null),n=Object(a.useState)(0),r=Object(u.a)(n,2),l=r[0],o=r[1],c=0===l,d=l===e.definition.children.length-1,s=function(e){console.log("goToPage:",e),o(e),t&&t.current&&window.scroll({top:t.current.getBoundingClientRect().top-100})};return i.a.createElement("div",{className:"accordion",role:"tablist","aria-multiselectable":"true"},e.definition.children.map(function(n,a){return i.a.createElement("div",{className:"card",key:e.fieldPath+"_PAGE_"+a},l===a&&i.a.createElement("div",{ref:t}),i.a.createElement("div",{className:"card-header cursor-pointer",onClick:function(){return s(a)}},i.a.createElement("h3",{className:"d-inline"},n.attributes.label),a<l&&i.a.createElement("button",{className:"link-button text-muted px-1",onClick:function(){return s(a)}},i.a.createElement("u",null,"edit"))),l===a&&i.a.createElement("div",{className:"card-body m-1"},n.children&&i.a.createElement(g,{childFormElements:n.children,parentFieldPath:e.parentFieldPath}),i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col"},i.a.createElement("nav",{"aria-label":"Page navigation example"},i.a.createElement("ul",{className:"pagination mb-0"},!c&&i.a.createElement("li",{className:"page-item"},i.a.createElement("button",{className:"page-link text-primary",onClick:function(){return s(l-1)}},"Previous")),!d&&i.a.createElement("li",{className:"page-item"},i.a.createElement("button",{className:"page-link text-primary",onClick:function(){return s(l+1)}},"Next"))))),d&&i.a.createElement("div",{className:"col"},i.a.createElement("button",{className:"btn btn-primary float-right",onClick:function(){return console.log("Submit")}},"Submit")))))}))},dropdown:function(e){var t=p.useContainer();return i.a.createElement(E,{fieldPath:e.fieldPath,label:e.definition.attributes.label,info:e.definition.attributes.info,description:e.definition.attributes.description},i.a.createElement("select",{className:"form-control custom-select",id:e.definition.fieldId,value:t.getValue(e.fieldPath)||"",onChange:function(n){return t.setValue(e.fieldPath,n.currentTarget.value)},"aria-describedby":e.definition.fieldId+"_description"},i.a.createElement("option",{value:"",disabled:e.definition.validation&&e.definition.validation.required}),e.definition.attributes.options.map(function(e){return i.a.createElement("option",{value:e,key:e},e)})))},textInput:function(e){var t=p.useContainer();return i.a.createElement(E,{fieldPath:e.fieldPath,label:e.definition.attributes.label,description:e.definition.attributes.description,info:e.definition.attributes.info},i.a.createElement("input",{type:"text",className:"form-control",id:e.definition.fieldId,"aria-describedby":e.fieldPath+"_description",value:t.getValue(e.fieldPath)||"",onChange:function(n){return t.setValue(e.fieldPath,n.currentTarget.value)}}))},heading:function(e){return i.a.createElement("h"+e.definition.attributes.level,null,e.definition.attributes.text)},paragraph:function(e){return i.a.createElement("p",null,e.definition.attributes.text)},buttonGroup:function(e){var t=p.useContainer(),n=t.getValue(e.fieldPath);return i.a.createElement(E,{fieldPath:e.fieldPath,label:e.definition.attributes.label,info:e.definition.attributes.info,description:e.definition.attributes.description},i.a.createElement("div",{className:"btn-group-wrapper"},i.a.createElement("div",{className:"btn-group btn-group-toggle"},e.definition.attributes.options.map(function(a){return i.a.createElement("label",{className:"btn btn-outline-secondary"+(n===a?" active":""),key:e.fieldPath+"_OPTION_"+a},i.a.createElement("input",{type:"radio",value:a,checked:a===n,onChange:function(n){return t.setValue(e.fieldPath,n.currentTarget.value)}}),a)}))))},list:function(e){var t=p.useContainer();return i.a.createElement("div",{className:"form-group"},i.a.createElement("span",{className:"h4 align-middle mr-2"},e.definition.attributes.label),e.definition.attributes.description&&i.a.createElement(c,{fieldPath:e.fieldPath,text:e.definition.attributes.description}),Object(o.a)(t.getCollectionSize(e.fieldPath),function(n){return i.a.createElement("div",{className:"card border-bottom mb-3"+(0===n?" mt-2":""),key:e.fieldPath+"_COLLECTION_"+n},i.a.createElement("h5",{className:"card-header"},function(e){var t=["th","st","nd","rd"],n=e%100;return e+(t[(n-20)%10]||t[n]||t[0])}(n+1)," ",e.definition.attributes.itemLabel,i.a.createElement("button",{className:"close text-dark",onClick:function(){return t.deleteFromCollection(e.fieldPath,n)}},i.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),i.a.createElement("div",{className:"card-body pb-0"},e.definition.children&&i.a.createElement(g,{childFormElements:e.definition.children,parentFieldPath:e.fieldPath+"["+n+"]"})))}),i.a.createElement("button",{className:"btn btn-secondary d-inline",onClick:function(){return t.addToCollection(e.fieldPath)}},"Add"))}},g=function(e){return i.a.createElement("div",null,e.childFormElements.map(function(t,n){var a,r,l,o=(a=t.type,v[a]?v[a]:(console.warn("Could not find form element type:"+a),function(){return i.a.createElement("div",null,"Could not find form element type ",a,".")}));return i.a.createElement(o,{definition:t,parentFieldPath:e.parentFieldPath,fieldPath:(r=e.parentFieldPath,l=t.fieldId,l?""!==r?r+"."+l:l:r),key:e.parentFieldPath+"_"+n})}))},P=function(e){return i.a.createElement("div",{className:"p-2 container"},i.a.createElement(p.Provider,null,i.a.createElement(g,{childFormElements:e.formDef.elements,parentFieldPath:""})))};n(25);fetch("exampleFormDefinition.json").then(function(e){if(!e.ok)throw new Error(e.statusText);return e.json()}).then(function(e){l.a.render(i.a.createElement(P,{formDef:e}),document.getElementById("form"))})}},[[19,1,2]]]);
//# sourceMappingURL=main.d410eb4d.chunk.js.map