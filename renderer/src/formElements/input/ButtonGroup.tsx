import React, {useState} from 'react'
import {useContainer} from 'unstated-next'
import {FieldChrome} from '../../display/FieldChrome'
import {ValuesContainer} from '../../state/ValuesContainer'
import {FormElementProps} from '../FormElementProps'

interface ButtonGroupAttributes {
    label: string
    description?: string
    info?: string
    options: string[]
}

export const ButtonGroup = (props: FormElementProps<ButtonGroupAttributes>) => {
    const formValuesContainer = useContainer(ValuesContainer)
    const value = formValuesContainer.getValue(props.fieldPath)
    const [focus, setFocus] = useState<number | null>(null)
    return (
        <FieldChrome fieldPath={props.fieldPath} def={props.definition}>
            <div className="btn-group-wrapper">
                <div className="btn-group btn-group-toggle">
                    {props.definition.attributes.options.map((option, index) => (
                        <label
                            className={'btn btn-outline-secondary' + (value === option ? ' active' : '') + (focus === index ? ' focus' : '')}
                            key={props.fieldPath + '_OPTION_' + option}
                            onFocus={() => setFocus(index)}
                            onBlur={() => setFocus(null)}
                        >
                            <input
                                type="radio"
                                value={option}
                                checked={option === value}
                                onChange={event => formValuesContainer.setValue(props.fieldPath, event.currentTarget.value)}
                            />{option}
                        </label>))
                    }
                </div>
            </div>
        </FieldChrome>)
}