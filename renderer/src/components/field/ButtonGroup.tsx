import * as classNames from 'classnames'
import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Action } from 'redux'
import { setData, SetDataPayload } from '../../state/actions'
import { State } from '../../state/reducer'
import { getData } from '../../state/selectors'
import { createKey } from '../../util'
import { FormElementProps } from '../FormElement'
import { FieldChrome } from './FieldChrome'

interface ButtonGroupStateProps {
    value: string,
    error?: string
}

interface ButtonGroupDispatchProps {
    setData: (payload: SetDataPayload) => void
}

interface ButtonGroupAttributes {
    label: string
    description?: string
    info?: string
    options: string[]
}

interface ButtonGroupOwnProps extends FormElementProps<ButtonGroupAttributes> {
}

type ButtonGroupProps = ButtonGroupStateProps & ButtonGroupDispatchProps & ButtonGroupOwnProps

class ButtonGroup extends React.Component<ButtonGroupProps> {

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.props.setData({path: this.props.fieldPath, data: event.currentTarget.value})
    }

    render() {
        return (
            <FieldChrome
                fieldPath={this.props.fieldPath}
                label={this.props.definition.attributes.label}
                info={this.props.definition.attributes.info}
                description={this.props.definition.attributes.description}
                error={this.props.error}
            >
                <div className="btn-group-wrapper">
                    <div className="btn-group btn-group-toggle">
                        {this.props.definition.attributes.options.map((option) => {
                            const labelClasses = classNames('btn btn-outline-dark', {
                                active: this.props.value === option
                            })
                            return <label className={labelClasses} key={createKey()}>
                                <input type="radio" value={option} id={this.props.fieldPath + '_' + option} onChange={e => this.handleChange(e)}/>{option}
                            </label>
                        })}
                    </div>
                </div>
            </FieldChrome>)
    }
}

function mapStateToProps(state: State, ownProps: ButtonGroupOwnProps): ButtonGroupStateProps {
    return {
        value: getData(state, ownProps.fieldPath) || '',
        // error: '',
    }
}

function mapDispatchToProps(dispatch: Dispatch<Action>) {
    return {
        setData: (payload: SetDataPayload) => dispatch(setData(payload))
    }
}

export const ConnectedButtonGroup = connect<ButtonGroupStateProps, ButtonGroupDispatchProps, ButtonGroupOwnProps>(mapStateToProps, mapDispatchToProps)(ButtonGroup)