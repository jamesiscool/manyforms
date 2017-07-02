import * as React from 'react'
import {observer, inject} from 'mobx-react'
import * as classNames from 'classnames'

import {appendFieldId, FormElementProps} from '../FormElement'
import {Field, FormState} from '../../store/index'
import {Label} from '../output/Label'
import {Description} from '../output/Description'
import {createKey} from '../../util'

export interface ButtonGroupAttributes {
    label: string
    description: string,
    options: [string]
}

interface ButtonGroupProps extends FormElementProps<ButtonGroupAttributes> {
    formState: FormState
}

interface ButtonGroupState {
    selectedOption: string
}

@inject('formState')
@observer
export class ButtonGroup extends React.Component<ButtonGroupProps, ButtonGroupState> {
    fieldPath = appendFieldId(this.props.parentFieldPath, this.props.definition.fieldId)
    field: Field = this.props.formState.lookupOrCreateField(this.fieldPath, this.props.definition)

    constructor(props: ButtonGroupProps) {
        super(props)
        this.state = {selectedOption: this.field.value}
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({selectedOption: event.currentTarget.value})
        this.field.setValue(event.currentTarget.value)
        // this.props.formState.setFieldData(this.fieldPath, event.currentTarget.value)
    }

    render() {
        return (
            <div className="form-group">
                <div>
                    <Label htmlFor={this.fieldPath} text={this.props.definition.attributes.label}/>
                </div>
                <div className="btn-group" data-toggle="buttons">
                    {this.props.definition.attributes.options.map((option) => {
                        var labelClass = classNames({
                            btn: true,
                            'btn-secondary': true,
                            active: this.state.selectedOption === option
                        })
                        return <label className={labelClass} key={createKey()}>
                            <input type="radio" value={option} id={this.fieldPath + '_' + option} onChange={e => this.handleChange(e)}/>{option}
                        </label>
                    })}
                </div>
                <Description id={this.fieldPath + '_description'} text={this.props.definition.attributes.description}/>
            </div>)
    }
}