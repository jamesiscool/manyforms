import * as React from 'react'

import { appendFieldId, FormElementProps } from '../FormElement'
import { Label } from '../output/Label'
import { Description } from '../output/Description'

export interface DropdownAttributes {
    label: string
    description: string
    options: [string]
}

export interface DropdownProps extends FormElementProps<DropdownAttributes> {
}

interface DropdownState {
    selectedOption: string
}

export class Dropdown extends React.Component<DropdownProps, DropdownState> {
    fieldPath = appendFieldId(this.props.parentFieldPath, this.props.definition.fieldId)

    constructor(props: DropdownProps) {
        super(props)
        this.state = {selectedOption: ''}
    }

    handleChange(event: React.FormEvent<HTMLSelectElement>) {
        this.setState({selectedOption: event.currentTarget.value})
    }

    render() {
        return (
            <div className="form-group">
                <Label htmlFor={this.props.definition.fieldId || ''} text={this.props.definition.attributes.label}/>
                <select
                    className="form-control custom-select"
                    id={this.props.definition.fieldId}
                    onChange={e => this.handleChange(e)}
                    value={this.state.selectedOption}
                    aria-describedby={this.props.definition.fieldId + '_description'}
                >
                    <option value="" disabled={true}/>
                    {this.props.definition.attributes.options.map((option) => <option value={option} key={option}>{option}</option>)}
                </select>
                <Description id={this.fieldPath + '_description'} text={this.props.definition.attributes.description}/>
            </div>)
    }
}