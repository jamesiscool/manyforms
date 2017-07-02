import * as React from 'react'
import {observer, inject} from 'mobx-react'

import {FormElementProps, appendFieldId} from '../FormElement'
import {Field, FormState} from '../../store/index'
import {Label} from '../output/Label'
import {Description} from '../output/Description'

export interface TextInputAttributes {
    label: string
    description: string
}

export interface TextInputProps extends FormElementProps<TextInputAttributes> {
    formState: FormState
    value: string
}

interface TextInputState {
    value: string
}

@inject('formState')
@observer
export class TextInput extends React.Component<TextInputProps, TextInputState> {
    fieldPath = appendFieldId(this.props.parentFieldPath, this.props.definition.fieldId)
    field: Field = this.props.formState.lookupOrCreateField(this.fieldPath, this.props.definition)

    constructor(props: TextInputProps) {
        super(props)
        this.state = {value: this.field.value}
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({value: event.currentTarget.value})
        this.field.setValue(event.currentTarget.value)
    }

    render() {
        return (
            <div className="form-group">
                <Label htmlFor={this.fieldPath} text={this.props.definition.attributes.label}/>
                <input
                    type="text"
                    className="form-control"
                    id={this.props.definition.fieldId}
                    aria-describedby={this.fieldPath + '_description'}
                    value={this.state.value}
                    onChange={e => this.handleChange(e)}
                />
                <Description id={this.fieldPath + '_description'} text={this.props.definition.attributes.description}/>
            </div>
        )
    }
}