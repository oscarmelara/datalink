import React, { useEffect, useState } from 'react'
import { toString, isEmpty, get } from 'lodash/fp'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {  OportunityStageReport, Filters } from './'
import { NavBar, Settings, Metrics } from '../../components'
import { setGlobalColors, setStageData, setStageDataByUser, getSwitches, setPreviousData } from '../../actions'
import { IgeneralState } from '../../TS'
import { ContainerDL } from '../../styles/style'
import { init } from '../../utils/InitDatabase'
import { getUserType, getInfusionsoftId, getUserId, getCompanyId  } from '../../utils'
import '../../styles/dashboard.sass'
import search from '../../assets/images/search.png'
import axios from 'axios'

export const Dashboard: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { startDate, endDate, currentUser, filters, lastUpdate } = useSelector(({ filtersReducer, userControlReducer, stagesReducer }: IgeneralState) => ({
    ...filtersReducer,
    ...userControlReducer,
    ...stagesReducer,
  }))

  const [currentDates, setCurrentDates] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [Type] = useState(getUserType())
  const [errorMessage, setError] = useState(false)

  const getData = async () => {
      const { data } = await axios.get(`companies/${getCompanyId()}/crm/report`)
      return data
  
  }

  const validationError = () => {
    getData().then((response) => {
      setError(false)
      
    }).catch((error) => {
      setError(true)
    })
  }



  useEffect(() => {
    if ((get('infusionSoft', currentUser) || getInfusionsoftId()!=='undefined') && !loaded && !lastUpdate) {
      setLoaded(true)

        init()
        validationError()
    }

    const checkDates = toString([startDate, endDate])
    if (checkDates !== currentDates && lastUpdate) {
      dispatch(setGlobalColors())

      if (get('infusionSoft', currentUser) || getInfusionsoftId()!=='undefined') {
        dispatch(setStageData(startDate, endDate))
        dispatch(setStageDataByUser(startDate, endDate))
        dispatch(setPreviousData(startDate, endDate))
      }

      setCurrentDates(checkDates)
    }
    
    if (get('connectWise', currentUser) && isEmpty(filters) && Type === 'company') {
      dispatch(getSwitches())
    }
    if (get('dattoAutotask', currentUser) && isEmpty(filters) && Type === 'company') {
      dispatch(getSwitches())
    }
    if (!isEmpty(currentUser) && getUserType() === 'company') {
      if ((!get('connectWise', currentUser) || !get('infusionSoft', currentUser)) && (!get('dattoAutotask', currentUser) || !get('infusionSoft', currentUser)) ) {
        history.push('/select-connections')
      }
    }
  }, [dispatch, startDate, endDate, currentDates, currentUser, filters, loaded, lastUpdate, Type, history, validationError])
  
  return (<>
    <NavBar />
    {getUserType() === 'company' && (errorMessage === true || errorMessage === false) && (<Settings />)}
    
    {(get('infusionSoft', currentUser) || getInfusionsoftId()!== undefined) && errorMessage === false && (<>
      <Filters />
      <ContainerDL className="mt-3">
        <Metrics />
        <OportunityStageReport />
      </ContainerDL>
    </>)}
    { errorMessage === true && (<>
      <div className="container d-flex flex-wrap justify-content-center align-items-center flex-column">
            <img className=" w-75 mx-auto block" src={search} alt=""/>
            <h1 className="text-white font-weight-bold text-center">Opportunities Module not found</h1>
            <p className="text-white font-weight-normal text-center">Dashboard require infusionSoft's opportunities module in order to display</p>
  
        </div>
    </>)}
  </>)
}
