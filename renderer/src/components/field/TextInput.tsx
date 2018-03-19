import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Action } from 'redux'

import { FormElementProps } from '../FormElement'
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

    render() {
        return (
            <FieldChrome fieldPath={this.props.fieldPath} label={this.props.definition.attributes.label} description={this.props.definition.attributes.description}>
                <input
                    type="text"
                    className="form-control"
                    id={this.props.definition.fieldId}
                    aria-describedby={this.props.fieldPath + '_description'}
                    value={this.props.value}
                    onChange={event => this.props.setData({path: this.props.fieldPath, data: event.currentTarget.value})}
                />
            </FieldChrome>
        )
    }
}

function mapStateToProps(state: State, ownProps: TextInputOwnProps) {
    return {
        value: getData(state, ownProps.fieldPath) || ''
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        setData: (payload: SetDataPayload) => dispatch(setData(payload))
    }
}

export const ConnectedTextInput = connect<TextInputStateProps, TextInputDispatchProps, TextInputOwnProps>(mapStateToProps, mapDispatchToProps)(TextInput)
