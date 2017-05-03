import {TextInput} from './TextInput'
import {Paragraph} from './Paragraph'
import {Heading} from './Heading'

export interface FormElementDef<Attributes> {
    type: string,
    attributes: Attributes
    fieldId?: string,
    children?: Array<FormElementDef<{}>>
}

export class FormElementProps<Attributes> {
    definition: FormElementDef<Attributes>
}

export const FormElements: { [name: string]: {} } = {
    TextInput: TextInput,
    Paragraph: Paragraph,
    Heading: Heading
}
