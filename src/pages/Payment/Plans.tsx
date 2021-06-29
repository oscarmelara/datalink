import React from 'react'
import { get, isEmpty } from 'lodash/fp'
import { useSelector } from 'react-redux'
import { IgeneralState } from '../../TS'
import { SelectPlan, Information } from './'

export const Plans: React.FC = () => {
  const { currentUser } = useSelector(({ userControlReducer }: IgeneralState) => userControlReducer)
  
  if (isEmpty(get('status.payment', currentUser))) {
    return (<SelectPlan />)
  }

  return (<Information />)
}
