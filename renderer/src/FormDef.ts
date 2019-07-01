import {FormElementDef} from './formElements/FormElementDef'
import {Config} from './state/ConfigContainer'

export default interface FormDef {
    elements: FormElementDef<{}>[]
    config?: Config
}