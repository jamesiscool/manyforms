import {TextInput} from './field/TextInput'
import {Paragraph} from './output/Paragraph'
import {Heading} from './output/Heading'
import {Dropdown} from './field/Dropdown'
import {ButtonGroup} from './field/ButtonGroup'
import {Iteration} from './container/Iteration'
import {Accordion} from './page/Accordion'
import {Page} from './page/Page'

export interface FormElementDef<Attributes> {
    type: string,
    attributes: Attributes,
    fieldId?: string,
    // tslint:disable-next-line
    children?: Array<FormElementDef<any>>
}

export class FormElementProps<Attributes> {
    definition: FormElementDef<Attributes>
    parentFieldPath: string
}

export const FormElements: { [name: string]: {} } = {
    Dropdown: Dropdown,
    TextInput: TextInput,
    Paragraph: Paragraph,
    Heading: Heading,
    ButtonGroup: ButtonGroup,
    Iteration: Iteration,
    Accordion: Accordion,
    Page: Page
}

export function appendFieldId(parentFieldPath: string, fieldId?: string): string {
    if (parentFieldPath) {
        return parentFieldPath + '.' + fieldId
    } else {
        return fieldId ? fieldId : ''
    }
}