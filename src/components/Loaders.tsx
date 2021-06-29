import React from 'react'
import '../styles/loader.sass'

export const TextLoading: React.FC<{ text?: string }> = ({ text }) => {
  return (<div className="cont-loader bg-transparent-dl">
    {text && (<p className="mb-1">{text}</p>)}
    <div className="lds-grid">
      <div /><div /><div /><div /><div /><div /><div /><div /><div />
    </div>
  </div>)
}
