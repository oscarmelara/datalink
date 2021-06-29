import { CSSProperties } from 'react'
import { StylesConfig } from 'react-select'

export const customStylesReactSelect: StylesConfig = {
  container: (provided: CSSProperties) => ({
    ...provided,
    zIndex: 500,
  }),
  input: (provided: CSSProperties) => ({
    ...provided,
    color: '#E8E3E6',
    paddingLeft: '10px',
  }),
  menu: (provided: CSSProperties) => ({
    ...provided,
    backgroundColor: 'transparent',
  }),
  menuList: (provided: CSSProperties) => ({
    ...provided,
    backgroundColor: '#191C34',
    opacity: 0.95,
    '.select-option': {
      margin: '5px 0',
      '.user-photo': {
        marginLeft: '10px',
      },
      '.user-name': {
        color: '#E8E3E6',
        padding: '0 0 0 10px',
      },
      ':hover': {
        cursor: 'pointer',
      },
    }
  }),
  singleValue: (provided: CSSProperties) => ({
    ...provided,
    color: '#E8E3E6',
  }),
  control: (provided: CSSProperties) => ({
    ...provided,
    backgroundColor: '#262C60',
    border: 'none !important',
    borderRadius: '28px',
    boxShadow: 'none',
    height: '56px',
    width: '240px',
    '.user-name': {
      padding: '0 0 0 10px',
    },
    ':hover': {
      cursor: 'pointer',
    }
  }),
  dropdownIndicator: (provided: CSSProperties) => ({
    ...provided,
    'svg path': {
      fill: '#007AFF',
    },
  }),
}
