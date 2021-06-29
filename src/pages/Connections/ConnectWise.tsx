import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { MdAdd, MdRemove } from 'react-icons/md'
import ConnectWiseLogo from '../../assets/images/Loog-ConnectWise.png'
import info from '../../assets/images/info.png'
import pdf from "../../assets/images/icons/pdf.png";

import { setCurrentUser } from '../../actions'
import { simpleAlert, useInputChange, loaderAlert, getUserId } from '../../utils'
import { InfusionsoftCard, PrimaryCard } from '../../styles/style'
import { IcurrentUser } from '../../TS'
import { CircleIcon } from './style'
import ReactTooltip from 'react-tooltip'

export type Props = {
  showConnectWiseTour: boolean
}
export const ConnectWise = ({showConnectWiseTour}:Props) => {
  const dispatch = useDispatch()
  const [input, handleInputChange] = useInputChange({ company: '', url: '', publicKey: '', privateKey: '' })
  const [showConnectWise, setShowConnectWise] = useState(false)
  const history = useHistory()

  const toggleConnectWise = (): void => { setShowConnectWise(!showConnectWise) }
  const handleConnectWise = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    loaderAlert({ html: 'wait a moment please...' })
    axios
      .post('connectWise', input)
      .then(() => {
        return axios.get(`companies/${getUserId()}`)
      })
      .then((response) => {
        const  data: IcurrentUser  = response.data
        dispatch(setCurrentUser(data))
        Swal.close()
        simpleAlert({
          title: 'Connection completed!',
          icon: 'success',
          html: 'The connection was successful, you can add more connections on the dashboard.',
        }).then(() => history.push('/dashboard'))
      })
      .catch((error) => {
        Swal.close()
        simpleAlert({
          icon: 'error',
          html: error.response.data.error.message,
        })
      })
  }

  return (<PrimaryCard className="p-2 mx-auto mb-4">
    <InfusionsoftCard className="bg-primary m-auto">
      <img src={ConnectWiseLogo} alt="ConnectWise" />
         </InfusionsoftCard>
    <div className="selection-expand">

      <p>
        Integrate your workflows with the industry leading PSA for IT industry professionals
            </p>
      <CircleIcon className="connect" onClick={toggleConnectWise}>
        {showConnectWise || showConnectWiseTour ? <MdRemove size={16} /> : <MdAdd size={16} />}
      </CircleIcon>
    </div>
    <form
      onSubmit={handleConnectWise}
      style={{ height: showConnectWise || showConnectWiseTour ? '300px' : '0px' }}
      className="px-3 transition overflow-hidden">
        
       


    
      <div className="input-container mb-3 d-flex align-items-center">
        <input type="text" onChange={handleInputChange} value={input.company} name="company" className="input one" placeholder="Company name" />
        <a className=" info-tooltip d-flex justify-content-center align-items-center" data-tip data-for='userName'><img className=" w-50" src={info} alt=""/> </a> 
        <ReactTooltip id='userName' place="right" type="dark" effect="float">
          <div className=" p-1" style={{ maxWidth: '20rem' }}>
            <h5 className="tc-lgreen" style={{ fontWeight:'bold' }}>Company Name</h5>
            <p>Company Name (this is your company name NO SPACES) from your Connectwise Login Page</p>
          </div>
        </ReactTooltip>

      </div>    
      


      <div className="input-container mb-3 d-flex align-items-center">
      <input type="text" onChange={handleInputChange} value={input.url} name="url" className="input two" placeholder="Connectwise url" />
      <a className=" info-tooltip d-flex justify-content-center align-items-center" data-tip data-for='url'><img className=" w-50" src={info} alt=""/> </a> 
      <ReactTooltip id='url' place="right" type="dark" effect="float">
          <div className=" p-1" style={{ maxWidth: '20rem' }}>
            <h5 className="tc-lgreen" style={{ fontWeight:'bold' }}>ConnectWise URL</h5>
            <p>Connectwise URL (this depends on your country zone or if you
                    are an on premise hosted) Please use appropiate URL on the
                    dropdown or manually type it EXACTLY as it appears on your
                    connectwise Login Page</p>
                    
          </div>
        </ReactTooltip>
      </div>

      <div className="input-container mb-3 d-flex align-items-center">
      <input type="text" onChange={handleInputChange} value={input.publicKey} name="publicKey" className="input three" placeholder="Public key" />
      <a className=" info-tooltip d-flex justify-content-center align-items-center" data-tip data-for="public"><img className=" w-50" src={info} alt=""/> </a> 
      <ReactTooltip id='public' place="right" type="dark" effect="float" delayHide={100} className="tooltip-pdf">
          <div className=" p-1" style={{ maxWidth: '20rem' }}>
            <h5 className="tc-lgreen" style={{ fontWeight:'bold' }}>Public Key</h5>
            <p>These keys are obtain from the PSA's interface,
                    please use these steps on this document to get new keys. If you have any issues with this please
                    contact your Connectwise Administrator and ask for the
                    proper API Keys access rights, Perhaps they can provide
                    these for you.</p>
                    <a
                  href="https://storage.googleapis.com/dl-usr-data/DataLink_CW_API_Keys.pdf"
                  target="_blank"
                  className="mx-auto block"
                   style={{ display: "block" }}
                >
                  <img
                    className=" block mr-1"
                   
                    src={pdf}
                    alt=""
                  />
                  ConnectWise Guide
                </a>
                    
          </div>
        </ReactTooltip>
      </div>

      <div className="input-container mb-3 d-flex align-items-center">
      <input type="text" onChange={handleInputChange} value={input.privateKey} name="privateKey" className="input four" placeholder="Private key" />
      <a className=" info-tooltip d-flex justify-content-center align-items-center" data-tip data-for="private"><img className=" w-50" src={info} alt=""/> </a> 
      <ReactTooltip id='private' place="right" type="dark" effect="float" delayHide={100} className="tooltip-pdf">
          <div className=" p-1" style={{ maxWidth: '20rem' }}>
            <h5 className="tc-lgreen" style={{ fontWeight:'bold' }}>Private Key</h5>
            <p>These keys are obtain from the PSA's interface,
                    please use these steps on this document to get new keys. If
                    you have any issues with this please contact your
                    Connectwise Administrator and ask for the proper API Keys
                    access rights, Perhaps they can provide these for you.</p>
                    <a
                  href="https://storage.googleapis.com/dl-usr-data/DataLink_CW_API_Keys.pdf"
                  target="_blank"
                  className="mx-auto block"
                   style={{ display: "block" }}
                >
                  <img
                    className=" block mr-1"
                   
                    src={pdf}
                    alt=""
                  />
                  ConnectWise Guide
                </a>
          </div>
        </ReactTooltip>
      </div>

      <Button
        type="submit"
        className="fwb dl-button"
        style={{ width: '100%' }}>
        Connect
      </Button>
    </form>
  </PrimaryCard>)
}
