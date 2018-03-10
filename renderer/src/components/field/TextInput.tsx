import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Action } from 'redux'

import { FormElementProps, appendFieldId } from '../FormElement'
import { Label } from '../output/Label'
import { Description } from '../output/Description'
import { getData, setData, SetDataPayload, State } from '../../state/store'

interface TextInputStateProps {
    value: string
}

interface TextInputDispatchProps {
    setData: (payload: SetDataPayload) => void
}

export interface TextInputAttributes {
    label: string
    description: string
}

export interface TextInputOwnProps extends FormElementProps<TextInputAttributes> {
}

type TextInputProps = TextInputStateProps & TextInputDispatchProps & TextInputOwnProps

class TextInput extends React.Component<TextInputProps> {
    fieldPath = appendFieldId(this.props.parentFieldPath, this.props.definition.fieldId)

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.props.setData({path: this.fieldPath, data: event.currentTarget.value})
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
                    value={this.props.value}
                    onChange={e => this.handleChange(e)}
                />
                <Description id={this.fieldPath + '_description'} text={this.props.definition.attributes.description}/>
            </div>
        )
    }
}

export function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        setData: (payload: { path: string, data: string }) => dispatch(setData(payload))
    }
}

export function mapStateToProps(state: State, ownProps: TextInputOwnProps) {
    return {
        value: getData(state, appendFieldId(ownProps.parentFieldPath, ownProps.definition.fieldId)) || ''
    }
}

export const ConnectedTextInput = connect<TextInputStateProps, TextInputDispatchProps, TextInputOwnProps>(mapStateToProps, mapDispatchToProps)(TextInput)
