import * as React from 'react'
import * as classNames from 'classnames'

import { appendFieldId, FormElementProps } from '../FormElement'
import { Label } from '../output/Label'
import { Description } from '../output/Description'
import { createKey } from '../../util'

export interface ButtonGroupAttributes {
    label: string
    description: string,
    options: [string]
}

interface ButtonGroupProps extends FormElementProps<ButtonGroupAttributes> {
}

interface ButtonGroupState {
    selectedOption: string
}

export class ButtonGroup extends React.Component<ButtonGroupProps, ButtonGroupState> {
    fieldPath = appendFieldId(this.props.parentFieldPath, this.props.definition.fieldId)

    constructor(props: ButtonGroupProps) {
        super(props)
        this.state = {selectedOption: ''}
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({selectedOption: event.currentTarget.value})
        // this.field.setValue(event.currentTarget.value)
        // this.props.formState.setFieldData(this.fieldPath, event.currentTarget.value)
    }

    render() {
        return (
            <div className="form-group">
                <Label htmlFor={this.fieldPath} text={this.props.definition.attributes.label}/>
                <div className="btn-group-wrapper">
                    <div className="btn-group btn-group-toggle">
                        {this.props.definition.attributes.options.map((option) => {
                            const labelClass = classNames({
                                btn: true,
                                'btn-outline-primary': true,
                                active: this.state.selectedOption === option
                            })
                            return <label className={labelClass} key={createKey()}>
                                <input type="radio" value={option} id={this.fieldPath + '_' + option} onChange={e => this.handleChange(e)}/>{option}
                            </label>
                        })}
                    </div>
                </div>
                <Description id={this.fieldPath + '_description'} text={this.props.definition.attributes.description}/>
            </div>)
    }
}