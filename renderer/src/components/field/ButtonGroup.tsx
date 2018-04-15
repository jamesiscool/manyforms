import * as classNames from 'classnames'
import * as React from 'react'
import { setData, setState } from '../../state/actions'
import { getData, getState, validate } from '../../state/selectors'
import { createKey } from '../../util'
import { FormElementProps } from '../FormElement'
import { FieldChrome } from './FieldChrome'

interface ButtonGroupAttributes {
    label: string
    description?: string
    info?: string
    options: string[]
}

interface Props extends FormElementProps<ButtonGroupAttributes> {
}

const ButtonGroup = (props: Props) => (
    <FieldChrome
        fieldPath={props.fieldPath}
        label={props.definition.attributes.label}
        description={props.definition.attributes.description}
        info={props.definition.attributes.info}
        error={getState(props.fieldPath).touched ? validate(props.fieldPath, props.definition) : undefined}
    >
        <div className="btn-group-wrapper">
            <div className="btn-group btn-group-toggle">
                {props.definition.attributes.options.map((option) => (
                    <label className={classNames('btn btn-outline-secondary', {active: getData(props.fieldPath) === option})} key={createKey()}>
                        <input
                            type="radio"
                            value={option}
                            id={props.fieldPath + '_' + option}
                            onChange={event => setData(props.fieldPath, event.currentTarget.value)}
                            onBlur={() => setState(props.fieldPath, 'touched', true)}
                        />{option}
                    </label>))
                }
            </div>
        </div>
    </FieldChrome>
)
export default ButtonGroup