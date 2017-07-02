import {observable, action} from 'mobx'
import set = require('lodash/set')
import get = require('lodash/get')
import {FormElementDef} from '../components/FormElement'

export class FormState {

    @observable public fields: {} = {}

    @action
    lookupOrCreateField(fieldPath: string, fieldDef: FormElementDef<any>): Field {
        let field = get<Field>(this.fields, fieldPath)
        if (field == null) {
            field = new Field()
            set(this.fields, fieldPath, field)
        }
        return field
    }

    @action
    lookupOrCreateArray(fieldPath: string): any[] {
        let array: any[] = get<[any]>(this.fields, fieldPath)
        if (array == null) {
            array =  []
            set(this.fields, fieldPath, array)
        }
        return array
    }


    @action
    submit() {
        console.log(this.fields)
    }
}

export class Field {
    @observable
    value: string = ''

    @action
    setValue(value: string) {
        this.value = value
    }
}
