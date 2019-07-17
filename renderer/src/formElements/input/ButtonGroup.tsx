import React, {useState} from 'react'
import {FieldChrome} from '../../display/FieldChrome'
import {FieldStateContainer} from '../../state/FieldStateContainer'
import {useContainer} from '../../state/useContainer'
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
	const fieldStateContainer = useContainer(FieldStateContainer)
	const value = formValuesContainer.getValue(props.path)
	const [focus, setFocus] = useState<number | null>(null)

	return (
		<FieldChrome path={props.path} def={props.definition}>
			<div className="btn-group-wrapper"
				 onFocus={() => fieldStateContainer.focus(props.path)}
				 onBlur={() => fieldStateContainer.blur(props.path)}
			>
				<div className="btn-group btn-group-toggle">
					{props.definition.attributes.options.map((option, index) => (
						<label
							className={'btn btn-outline-primary' + (value === option ? ' active' : '') + (focus === index ? ' focus' : '')}
							key={props.path + '_OPTION_' + option}
							onFocus={() => setFocus(index)}
							onBlur={() => setFocus(null)}
						>
							<input
								type="radio"
								value={option}
								checked={option === value}
								onChange={event => formValuesContainer.setValue(props.path, event.currentTarget.value)}
							/>{option}
						</label>))
					}
				</div>
			</div>
		</FieldChrome>)
}