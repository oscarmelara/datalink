import React, { useState } from 'react'
import { FormControlProps } from 'react-bootstrap'
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers'

interface InputChangeType {
  [x: string]: string
}

export const useInputChange = (initial: InputChangeType): [{ [x: string]: string }, (event: React.FormEvent<HTMLInputElement>) => void] => {
  const [input, setInput] = useState(initial)

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  })

  return [input, handleInputChange]
}


// onChange -> bootstrap control
export const useInputChangeBT = (initial: InputChangeType): [
  { [x: string]: string },
  (event: React.FormEvent<ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>>) => void,
  (data: InputChangeType) => void,
] => {
  const [input, setInput] = useState(initial)

  const forceUpdate = (data: InputChangeType) => setInput(data)

  const handleInputChange = (e: React.FormEvent<ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>>) => {
    const name: string = e.currentTarget.name || 'input'
    const value: string = e.currentTarget.value || ''
    return setInput({ ...input, [name]: value })
  }

  return [input, handleInputChange, forceUpdate]
}
