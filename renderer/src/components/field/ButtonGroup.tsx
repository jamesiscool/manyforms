import * as React from 'react'
import * as classNames from 'classnames'
import { connect, Dispatch } from 'react-redux'
import { Action } from 'redux'

import { appendFieldId, FormElementProps } from '../FormElement'
import { createKey } from '../../util'
import { getData, setData, SetDataPayload, State } from '../../state/store'
import { FieldChrome } from './FieldChrome'

interface ButtonGroupStateProps {
    value: string
}

interface ButtonGroupDispatchProps {
    setData: (payload: SetDataPayload) => void
}

interface ButtonGroupAttributes {
    label: string
    description: string,
    options: [string]
}

interface ButtonGroupOwnProps extends FormElementProps<ButtonGroupAttributes> {
}

type ButtonGroupProps = ButtonGroupStateProps & ButtonGroupDispatchProps & ButtonGroupOwnProps

class ButtonGroup extends React.Component<ButtonGroupProps> {
    fieldPath = appendFieldId(this.props.parentFieldPath, this.props.definition.fieldId)

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.props.setData({path: this.fieldPath, data: event.currentTarget.value})
    }

    render() {
        return (
            <FieldChrome fieldPath={this.fieldPath} label={this.props.definition.attributes.label} description={this.props.definition.attributes.description}>
                <div className="btn-group-wrapper">
                    <div className="btn-group btn-group-toggle">
                        {this.props.definition.attributes.options.map((option) => {
                            const labelClass = classNames({
                                btn: true,
                                'btn-outline-primary': true,
                                active: this.props.value === option
                            })
                            return <label className={labelClass} key={createKey()}>
                                <input type="radio" value={option} id={this.fieldPath + '_' + option} onChange={e => this.handleChange(e)}/>{option}
                            </label>
                        })}
                    </div>
                </div>
            </FieldChrome>)
    }
}

function mapStateToProps(state: State, ownProps: ButtonGroupOwnProps) {
    return {
        value: getData(state, appendFieldId(ownProps.parentFieldPath, ownProps.definition.fieldId)) || ''
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        setData: (payload: SetDataPayload) => dispatch(setData(payload))
    }
}

export const ConnectedButtonGroup = connect<ButtonGroupStateProps, ButtonGroupDispatchProps, ButtonGroupOwnProps>(mapStateToProps, mapDispatchToProps)(ButtonGroup)