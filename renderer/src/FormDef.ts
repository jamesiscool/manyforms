import {FormElementDef} from './formElements/FormElementDef'

export default interface FormDef {
    elements: FormElementDef<{}>[]
    config: {}
}