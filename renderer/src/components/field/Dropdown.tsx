import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Action } from 'redux'

import { FormElementProps } from '../FormElement'
import { FieldChrome } from './FieldChrome'
import { getData, setData, SetDataPayload, State } from '../../state/store'

interface DropdownStateProps {
    value: string
}

interface DropdownDispatchProps {
    setData: (payload: SetDataPayload) => void
}

export interface DropdownAttributes {
    label: string
    description: string
    info?: string
    options: [string]
}

export interface DropdownOwnProps extends FormElementProps<DropdownAttributes> {
}

type DropdownProps = DropdownStateProps & DropdownDispatchProps & DropdownOwnProps

const Dropdown = (props: DropdownProps) => (
    <FieldChrome fieldPath={props.fieldPath} label={props.definition.attributes.label} info={props.definition.attributes.info} description={props.definition.attributes.description}>
        <select
            className="form-control custom-select"
            id={props.definition.fieldId}
            onChange={event => props.setData({path: props.fieldPath, data: event.currentTarget.value})}
            value={props.value}
            aria-describedby={props.definition.fieldId + '_description'}
        >
            <option value="" disabled={true}/>
            {props.definition.attributes.options.map((option) => <option value={option} key={option}>{option}</option>)}
        </select>
    </FieldChrome>)

function mapStateToProps(state: State, ownProps: DropdownOwnProps) {
    return {
        value: getData(state, ownProps.fieldPath) || ''
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        setData: (payload: SetDataPayload) => dispatch(setData(payload))
    }
}

export const ConnectedDropdown = connect<DropdownStateProps, DropdownDispatchProps, DropdownOwnProps>(mapStateToProps, mapDispatchToProps)(Dropdown)