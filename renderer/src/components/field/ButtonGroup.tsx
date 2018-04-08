import * as classNames from 'classnames'
import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Action } from 'redux'
import { setData, SetDataPayload, setState, SetStatePayload } from '../../state/actions'
import { FieldState, State } from '../../state/reducer'
import { getData, getState, validate } from '../../state/selectors'
import { createKey } from '../../util'
import { FormElementProps } from '../FormElement'
import { FieldChrome } from './FieldChrome'

interface StateProps {
    value: string,
    error?: string
    state: FieldState
}

interface DispatchProps {
    setData: (payload: SetDataPayload) => void
    setState: (payload: SetStatePayload) => void
}

interface ButtonGroupAttributes {
    label: string
    description?: string
    info?: string
    options: string[]
}

interface OwnProps extends FormElementProps<ButtonGroupAttributes> {
}

type Props = StateProps & DispatchProps & OwnProps

class ButtonGroup extends React.Component<Props> {
    render() {
        return (
            <FieldChrome fieldPath={this.props.fieldPath} label={this.props.definition.attributes.label} info={this.props.definition.attributes.info} description={this.props.definition.attributes.description} error={this.props.state.touched ? this.props.error : undefined}>
                <div className="btn-group-wrapper">
                    <div className="btn-group btn-group-toggle">
                        {this.props.definition.attributes.options.map((option) => (
                            <label className={classNames('btn btn-outline-secondary', {active: this.props.value === option})} key={createKey()}>
                                <input
                                    type="radio"
                                    value={option}
                                    id={this.props.fieldPath + '_' + option}
                                    onChange={event => this.props.setData({path: this.props.fieldPath, data: event.currentTarget.value})}
                                    onBlur={() => this.props.setState({path: this.props.fieldPath, name: 'touched', value: true})}
                                />{option}
                            </label>))
                        }
                    </div>
                </div>
            </FieldChrome>)
    }
}

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

export const ConnectedButtonGroup = connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(ButtonGroup)