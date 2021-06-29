import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { isEmpty, get } from 'lodash/fp'
import { useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import autotask from '../../assets/images/autotask-white.png'
import kaseya from '../../assets/images/kaseya-bms-white.png'
import Logo from '../../assets/images/logo_datalink.svg'
import ConnectWiseLogo from '../../assets/images/Loog-ConnectWise.png'
import Infusionsoft from '../../assets/images/Infusionsoft.png'
import { TopText, ConnectionCard, InfusionsoftCard } from '../../styles/style'
import { ConnectWise } from './ConnectWise'
import { InfusionSoft } from './InfusionSoft'
import { Datto } from "./Datto";
import { TextLoading } from '../../components'
import { getUserId, getInfusionsoftId, getUserConnectWise  } from '../../utils'
import { CardsContainer } from './style'
import '../../styles/Connections.sass'
import { useSelector } from 'react-redux'
import { IgeneralState } from '../../TS'

interface IState {
    isTourOpen?: boolean
}

export const Connections: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const [showConnectWise, setShowConnectWise] = useState(false)
  const [showInfusionSoft, setShowInfusionSoft] = useState(false)

  const { currentUser } = useSelector(
    ({ userControlReducer }: IgeneralState) => ({  ...userControlReducer})
  );

 
  const infu = get('CRM', currentUser)
  const connect = get('PSA', currentUser)
  const setDatto = get('dattoAutotask', currentUser)
  const setConnect = get('connectWise', currentUser)


  // const componentDefault = () => {  return  <TourStep onSubmit = {(value) => {setShowConnectWise(value)}} onSubmitInfu = {(value) => {setShowInfusionSoft(value)}}  />}
  // const component0 = () => { return <TourInfusion onSubmitInfu = {(value) => {setShowInfusionSoft(value)}} /> }
  // const component1 = () => { return <TourConnect onSubmit = {(value => {setShowConnectWise(value)})} /> }
  
  // const _stateValidate = () => {
  //   var component = null;
  //   if(infu === undefined || infu === null ) {
  //     component = component0()
  //   } 
    
  //   if(connect === undefined || connect === null) {
  //     component = component1()
  //   }

  //   if ((infu === undefined || infu === null) && (connect === undefined || connect === null) ) {
      
  //     component = componentDefault()
      
  //   } 
  //   return component
  // }
 



  useEffect(() => {
    const checkConnections = async () => {
      let redirect = false
      try {
        const infusionSoft = await axios.get(`companies/${getUserId()}/infusionsoft`)
        const dataInfusionSoft = infusionSoft.data
        //guardar infusiontfost el el store
        if (!isEmpty(dataInfusionSoft) || getUserConnectWise() === null) {
          redirect = false
        }else {
          redirect = true
        }
      } catch (error) {}
      
      try {
        const connectWise = await axios.get(`companies/${getUserId()}/connectwise`)
        const dataConnectWise = connectWise.data
        //guardar esto en el store
        if (!isEmpty(dataConnectWise) || getInfusionsoftId() === null) {
          redirect = false
        }else {
          redirect = true
        }
      } catch (error) {}

      if (redirect) {
        
      } else {
        setLoading(false)
      }
    }
  
    checkConnections()
  }, [history])
  return (<Container className="py-4 content-center flex-column min-vh-100" as="section">
    {loading && (<TextLoading text="Checking data..." />)}
          <img className="image-datalink" src={Logo} alt="DataLink" />
  
    <div className="d-flex justify-content-start align-items-center"><h1 className="fwb fz-30 my-3 text-center mr-2">Connect and automate workflows </h1>
     
     </div>
     
     
     
     
     

    <TopText>
      We know ConnectWise. We know Infusionsoft. <br />
      With our included onboarding process, we'll get your integration running quickly and easily.
    </TopText>
    <CardsContainer>
      <div className="connectwise" style={{ width: '330px' }}>
        { (setConnect === null || setConnect === undefined) && (
          <ConnectWise showConnectWiseTour = {showConnectWise} />
        ) }
        
        { !(setConnect === null || setConnect === undefined)  && (
          <InfusionsoftCard className="bg-primary m-auto d-flex flex-column">
            <img src={ConnectWiseLogo} alt="ConnectWise" />
            <p className="text-white">You are connected</p>
             </InfusionsoftCard>
        ) }
        { (setDatto === null || setDatto === undefined) && (
              <Datto />
        ) }
        { !(setDatto === null || setDatto === undefined) && (
             <InfusionsoftCard className="bg-datto m-auto d-flex flex-column">
             <img src={autotask} alt="ConnectWise" />
             <p className="text-white">You are connected</p>
           </InfusionsoftCard>
        ) }
        
        <p className="ml-1 tc-blue fwb fz-20">Coming soon</p>
        <div className="d-flex justify-content-start w-100">
          <ConnectionCard className="content-center">
            <img src={kaseya} alt="Kaseya bms" />
          </ConnectionCard>
        </div>
      </div>
      <span className="v-line mt-4" />
      <div className="infusionsoft" style={{ width: '330px' }}>
      { (infu === null || infu === undefined) && (
        <InfusionSoft showInfusionSoftTour = {showInfusionSoft} />
      )}

      { !(infu === null || infu === undefined) && (
        <InfusionsoftCard className="bg-infusionsoft m-auto d-flex flex-column">
        <img src={Infusionsoft} alt="Infusionsoft" />
        <p className="text-white">You are connected</p>
        </InfusionsoftCard>
        )}
  
      </div>
    </CardsContainer>
  </Container>)
}
