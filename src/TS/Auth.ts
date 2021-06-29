import React from 'react'

export interface ISignup {
  setShowTerms: React.Dispatch<React.SetStateAction<boolean>>
  handleInputChange: (event: React.FormEvent<HTMLInputElement>) => void
  input: { [x: string]: string; }
}
