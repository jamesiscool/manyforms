import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Action } from 'redux'
import { setData, SetDataPayload } from '../../state/actions'
import { State } from '../../state/reducer'
import { getData } from '../../state/selectors'
import { FormElementProps } from '../FormElement'
import { FieldChrome } from './FieldChrome'

interface TextInputStateProps {
    value: string
    error?: string
}

interface TextInputDispatchProps {
    setData: (payload: SetDataPayload) => void
}

interface TextInputAttributes {
    label: string
    description: string
    info?: string
}

interface TextInputOwnProps extends FormElementProps<TextInputAttributes> {
}

type TextInputProps = TextInputStateProps & TextInputDispatchProps & TextInputOwnProps

const TextInput = (props: TextInputProps) => (
    <FieldChrome fieldPath={props.fieldPath} label={props.definition.attributes.label} description={props.definition.attributes.description} info={props.definition.attributes.info} error={props.error}>
        <input
            type="text"
            className="form-control"
            id={props.definition.fieldId}
            aria-describedby={props.fieldPath + '_description'}
            value={props.value}
            onChange={event => props.setData({path: props.fieldPath, data: event.currentTarget.value})}
        />
    </FieldChrome>
)

function mapStateToProps(state: State, ownProps: TextInputOwnProps) {
    return {
        value: getData(state, ownProps.fieldPath) || '',
        // error: 'This field is required'
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        setData: (payload: SetDataPayload) => dispatch(setData(payload))
    }
}

export const ConnectedTextInput = connect<TextInputStateProps, TextInputDispatchProps, TextInputOwnProps>(mapStateToProps, mapDispatchToProps)(TextInput)
