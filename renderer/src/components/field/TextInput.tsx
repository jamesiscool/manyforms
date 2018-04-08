import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Action } from 'redux'
import { setData, SetDataPayload, setState, SetStatePayload, } from '../../state/actions'
import { FieldState, State } from '../../state/reducer'
import { getData, getState, validate } from '../../state/selectors'
import { FormElementProps } from '../FormElement'
import { FieldChrome } from './FieldChrome'

interface StateProps {
    value: string
    error?: string
    state: FieldState
}

interface DispatchProps {
    setData: (payload: SetDataPayload) => void
    setState: (payload: SetStatePayload) => void
}

interface TextInputAttributes {
    label: string
    description: string
    info?: string
}

interface OwnProps extends FormElementProps<TextInputAttributes> {
}

type Props = StateProps & DispatchProps & OwnProps

const TextInput = (props: Props) => (
    <FieldChrome fieldPath={props.fieldPath} label={props.definition.attributes.label} description={props.definition.attributes.description} info={props.definition.attributes.info} error={props.state.touched ? props.error : undefined}>
        <input
            type="text"
            className="form-control"
            id={props.definition.fieldId}
            aria-describedby={props.fieldPath + '_description'}
            value={props.value}
            onChange={event => props.setData({path: props.fieldPath, data: event.currentTarget.value})}
            onBlur={() => props.setState({path: props.fieldPath, name: 'touched', value: true})}
        />
    </FieldChrome>
)

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
    return {
        value: getData(state, ownProps.fieldPath) || '',
        error: validate(state, ownProps.fieldPath, ownProps.definition),
        state: getState(state, ownProps.fieldPath) || {}
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>): DispatchProps {
    return {
        setData: (payload: SetDataPayload) => dispatch(setData(payload)),
        setState: (payload: SetStatePayload) => dispatch(setState(payload))
    }
}

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(TextInput)
