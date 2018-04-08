import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Action } from 'redux'
import { setData, SetDataPayload, setState, SetStatePayload } from '../../state/actions'
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

export interface DropdownAttributes {
    label: string
    description: string
    info?: string
    options: string[]
}

export interface OwnProps extends FormElementProps<DropdownAttributes> {
}

type Props = StateProps & DispatchProps & OwnProps

const Dropdown = (props: Props) => (
    <FieldChrome fieldPath={props.fieldPath} label={props.definition.attributes.label} info={props.definition.attributes.info} description={props.definition.attributes.description} error={props.state.touched ? props.error : undefined}>
        <select
            className="form-control custom-select"
            id={props.definition.fieldId}
            onChange={event => props.setData({path: props.fieldPath, data: event.currentTarget.value})}
            value={props.value}
            aria-describedby={props.definition.fieldId + '_description'}
            onBlur={() => props.setState({path: props.fieldPath, name: 'touched', value: true})}
        >
            <option value="" disabled={true}/>
            {props.definition.attributes.options.map((option) => <option value={option} key={option}>{option}</option>)}
        </select>
    </FieldChrome>)

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

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Dropdown)