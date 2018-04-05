import { ConnectedIteration } from './container/Iteration'
import { ConnectedButtonGroup } from './field/ButtonGroup'
import { ConnectedDropdown } from './field/Dropdown'
import { ConnectedTextInput } from './field/TextInput'
import { Heading } from './output/Heading'
import { Paragraph } from './output/Paragraph'
import { Accordion } from './page/Accordion'
import { Page } from './page/Page'

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
    fieldPath: string
}

export const FormElements: { [name: string]: {} } = {
    Dropdown: ConnectedDropdown,
    TextInput: ConnectedTextInput,
    Paragraph: Paragraph,
    Heading: Heading,
    ButtonGroup: ConnectedButtonGroup,
    Iteration: ConnectedIteration,
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