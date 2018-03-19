import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Action } from 'redux'

import { FormElementProps, appendFieldId } from '../FormElement'
import { getData, setData, SetDataPayload, State } from '../../state/store'
import { FieldChrome } from './FieldChrome'

interface TextInputStateProps {
    value: string
}

interface TextInputDispatchProps {
    setData: (payload: SetDataPayload) => void
}

interface TextInputAttributes {
    label: string
    description: string
}

interface TextInputOwnProps extends FormElementProps<TextInputAttributes> {
}

type TextInputProps = TextInputStateProps & TextInputDispatchProps & TextInputOwnProps

class TextInput extends React.Component<TextInputProps> {
    fieldPath = appendFieldId(this.props.parentFieldPath, this.props.definition.fieldId)

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.props.setData({path: this.fieldPath, data: event.currentTarget.value})
    }

    render() {
        return (
            <FieldChrome fieldPath={this.fieldPath} label={this.props.definition.attributes.label} description={this.props.definition.attributes.description}>
                <input
                    type="text"
                    className="form-control"
                    id={this.props.definition.fieldId}
                    aria-describedby={this.fieldPath + '_description'}
                    value={this.props.value}
                    onChange={e => this.handleChange(e)}
                />
            </FieldChrome>
        )
    }
}

function mapStateToProps(state: State, ownProps: TextInputOwnProps) {
    return {
        value: getData(state, appendFieldId(ownProps.parentFieldPath, ownProps.definition.fieldId)) || ''
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        setData: (payload: SetDataPayload) => dispatch(setData(payload))
    }
}

export const ConnectedTextInput = connect<TextInputStateProps, TextInputDispatchProps, TextInputOwnProps>(mapStateToProps, mapDispatchToProps)(TextInput)
