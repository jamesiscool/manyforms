import * as React from 'react'

import { FormElementProps, appendFieldId } from '../FormElement'
import { Description } from '../output/Description'
import { Children } from '../Children'
import { createKey } from '../../util'

export interface IterationAttributes {
    label: string
    itemLabel: string
    description: string
}

export interface IterationProps extends FormElementProps<IterationAttributes> {
}

interface IterationState {
    items: Array<{ key: string }>
}

export class Iteration extends React.Component<IterationProps, IterationState> {
    fieldPath = appendFieldId(this.props.parentFieldPath, this.props.definition.fieldId)

    static ordinal(n: number): string {
        const s = ['th', 'st', 'nd', 'rd'],
            v = n % 100
        return n + (s[(v - 20) % 10] || s[v] || s[0])
    }

    constructor(props: IterationProps) {
        super(props)
        this.state = {items: []}
    }

    removeItem(index: number, key: string) {
        this.setState((prevState) => {
            return {items: prevState.items.filter(item => item.key !== key)}
        })
    }

    render() {
        return (
            <div className="form-group">
                <label className="h5 mr-2">{this.props.definition.attributes.label}</label>
                <Description id={this.fieldPath + '_description'} text={this.props.definition.attributes.description}/>
                {this.state.items.map((item, index: number) => {
                    const childDefs = this.props.definition.children ? this.props.definition.children : []
                    return <div className="card mb-2" key={item.key}>
                        <h6 className="card-header mb-2">{Iteration.ordinal(index + 1)} {this.props.definition.attributes.itemLabel}
                            <button className="close" onClick={() => this.removeItem(index, item.key)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </h6>
                        <div className="card-block m-3">
                            <Children children={childDefs} parentFieldPath={this.fieldPath + '[' + index + ']'}/>
                        </div>
                    </div>
                })}
                <button
                    className="btn btn-primary d-inline"
                    onClick={() => {
                        this.setState((prevState) => {
                            return {items: prevState.items.concat([{key: createKey()}])}

                        })
                    }}
                >Add
                </button>
            </div>)
    }
}