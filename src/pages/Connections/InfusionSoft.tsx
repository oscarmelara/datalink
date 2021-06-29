import React, { useState } from 'react'
import { random } from 'lodash/fp'
import { Button } from 'react-bootstrap'
import { MdAdd, MdRemove } from 'react-icons/md'
import Infusionsoft from '../../assets/images/Infusionsoft.png'
import Keap from '../../assets/images/Logo_of_Keap_Company.png'
import { getUserId } from '../../utils'
import { InfusionsoftCard, PrimaryCard } from '../../styles/style'
import { CircleIcon } from './style'
import ReactTooltip from 'react-tooltip'

export type Props = {
  showInfusionSoftTour: boolean
}
export const InfusionSoft = ({showInfusionSoftTour}: Props) => {
  const [showInfusionSoft, setShowInfusionSoft] = useState(false)
  const toggleInfusionSoft = (): void => { setShowInfusionSoft(!showInfusionSoft) }
  
  const handleInfusionSoft = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault()
    const n = random(1, 3)
    const InfusionsofOauthLink = process.env.REACT_APP_OAUTH_LINK
    let InfusionsofOauthID = ''

    if (n === 1) {
      InfusionsofOauthID = process.env.REACT_APP_INFUSIONSOFT_CLIENT_ID_1 || ''
    } else if (n === 2) {
      InfusionsofOauthID = process.env.REACT_APP_INFUSIONSOFT_CLIENT_ID_2 || ''
    } else {
      InfusionsofOauthID = process.env.REACT_APP_INFUSIONSOFT_CLIENT_ID_3 || ''
    }

    if (InfusionsofOauthLink) {
      const OauthLink = InfusionsofOauthLink.replace('[USER_ID]', getUserId()).replace('[INFUSIONSOFT_CLIENT_ID]', InfusionsofOauthID)
      window.open(OauthLink, '_self')
    }
  }

  return (<PrimaryCard className="p-2 mx-auto">
    <InfusionsoftCard className="bg-infusionsoft m-auto">
      <img src={Infusionsoft} alt="Infusionsoft" />
      </InfusionsoftCard>
    <div className="selection-expand">
      <p>
        Eliminate redundancy when contacting your clients, necer lose sight of your customers
            </p>
      <CircleIcon className="infu" onClick={toggleInfusionSoft} data-tip data-for='infusion'>
        {showInfusionSoft || showInfusionSoftTour ? <MdRemove size={16} /> : <MdAdd size={16} />}
      </CircleIcon>
      <ReactTooltip id='infusion' place="right" type="dark" effect="float">
          <div className=" p-1" style={{ maxWidth: '26rem' }}>
            <h5 className="tc-lgreen" style={{ fontWeight:'bold' }}>InfusionSoft </h5>
            <p>Login to Infusionsoft first on another tab before connecting your instance.</p>
          </div>
      </ReactTooltip>
    </div>
    <div
      style={{ height: showInfusionSoft || showInfusionSoftTour ? '190px' : '0px' }}
      className="content-center px-3 flex-column transition overflow-hidden">
      <img src={Keap} alt="Keap" className="my-4" />
      <Button
        onClick={handleInfusionSoft}
        className="fwb dl-button b-infu"
        style={{ width: '100%' }}>
        Connect
      </Button>
    </div>
  </PrimaryCard>)
}
