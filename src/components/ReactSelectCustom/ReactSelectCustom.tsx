import React from 'react'
import { Image } from 'react-bootstrap'

interface ICustomSelectComponents {
  data: {
    [s: string]: string
  }
  innerProps: {}
}

export const Option = ({ data, innerProps }: ICustomSelectComponents) => (<div className="select-option" {...innerProps}>
  <Image className="user-photo" src={data.image} roundedCircle width={40} height={40} />
  <span className="user-name">{data.label}</span>
</div>)

export const SingleValue = ({ data, innerProps }: ICustomSelectComponents) => (<div className="select-option" {...innerProps}>
  <Image className="user-photo" src={data.image} roundedCircle width={40} height={40} />
  <span className="user-name">{data.label}</span>
</div>)
