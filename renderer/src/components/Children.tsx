import * as React from 'react'
import * as FormElement from './FormElement'

/*function renderChild(elementDef: FormElement.FormElementDef) {
 let Child: any = FormElement.FormElements[elementDef.type]
 return <Child definition={elementDef}/>
 }*/

export const Children = (props: { children: FormElement.FormElementDef<any>[] }) =>
	<div>
		{props.children.map((elementDef: FormElement.FormElementDef<any>) => {
			let Child: any = FormElement.FormElements[elementDef.type]
			return <Child definition={elementDef}/>
		})}
	</div>


