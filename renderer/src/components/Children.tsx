import * as React from 'react'
import * as FormElement from './FormElement'

export const Children = (props: { children: FormElement.FormElementDef<{}>[] }) =>
    <div>
        {props.children.map((elementDef: FormElement.FormElementDef<{}>) => {
            // tslint:disable-next-line
            let Child: any = FormElement.FormElements[elementDef.type]
            return <Child definition={elementDef}/>
        })}
    </div>
