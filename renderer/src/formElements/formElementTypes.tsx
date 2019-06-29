import React from "react"
import {List} from "./collection/List"
import {ButtonGroup} from "./input/ButtonGroup"
import {Dropdown} from "./input/Dropdown"
import {TextInput} from "./input/TextInput"
import {Heading} from "./output/Heading"
import {Paragraph} from "./output/Paragraph"
import {Accordion} from "./pagination/Accordion"

export const formElementTypes: { [type: string]: React.ReactNode } = {
    'accordion': Accordion,
    'dropdown': Dropdown,
    'textInput': TextInput,
    'heading': Heading,
    'paragraph': Paragraph,
    'buttonGroup': ButtonGroup,
    'list': List
}

export const lookupElement = (type: string): React.ReactNode => {
    const foundType = formElementTypes[type]
    if (!foundType) {
        console.warn('Could not find form element type:' + type)
        return () => <div>Could not find form element type {type}.</div>
    }
    return foundType
}