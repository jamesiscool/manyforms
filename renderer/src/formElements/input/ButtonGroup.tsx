import React, {useState} from 'react'
import {FieldChrome} from '../../display/FieldChrome'
import {FieldDef} from '../../FormDef'
import {useFieldState} from '../../hooks/useFieldState'

import {useValues} from '../../hooks/useValues'
import {FormElementProps} from '../FormElementProps'

interface ButtonGroupDef extends FieldDef {
	label: string
	description?: string
	info?: string
	options: string[]
}

export const ButtonGroup = (props: FormElementProps<ButtonGroupDef>) => {
	const {setValue, getValue} = useValues()
	const {blur, focus} = useFieldState()
	const value = getValue(props.path)
	const [buttonFocus, setButtonFocus] = useState<number | null>(null)

	return (
		<FieldChrome path={props.path} def={props.def}>
			<div className="btn-group-wrapper"
				 onFocus={() => focus(props.path)}
				 onBlur={() => blur(props.path)}
			>
				<div className="btn-group btn-group-toggle">
					{props.def.options.map((option, index) => (
						<label
							className={'btn btn-outline-primary' + (value === option ? ' active' : '') + (buttonFocus === index ? ' focus' : '')}
							key={props.path + '_OPTION_' + option}
							onFocus={() => setButtonFocus(index)}
							onBlur={() => setButtonFocus(null)}
						>
							<input
								type="radio"
								value={option}
								checked={option === value}
								onChange={event => setValue(props.path, event.currentTarget.value)}
							/>{option}
						</label>))
					}
				</div>
			</div>
		</FieldChrome>)
}