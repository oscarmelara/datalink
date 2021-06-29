import React from 'react'
import NumberFormat from 'react-number-format'

interface ICheckBox {
  emitChange: (name: string, value: boolean) => void
  name: string
  value?: boolean
}

export const CheckBox: React.FC<ICheckBox> = ({ emitChange, name, value = false }) => {
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    emitChange(ev.currentTarget.name, ev.currentTarget.checked)
  }
  return (<div className="pretty p-default p-round p-smooth">
    <input type="checkbox" onChange={handleChange} name={name} checked={value} />
    <div className="state p-primary"><label /></div>
  </div>)
}

export const FormatNumber: React.FC<{ n: number | string }> = ({ n }) => (<NumberFormat
  value={n}
  decimalScale={2}
  fixedDecimalScale={true}
  displayType={'text'}
  thousandSeparator={true}
  prefix={'$'}
  renderText={value => value} />)
