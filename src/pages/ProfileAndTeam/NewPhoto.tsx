import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Files from 'react-butterfiles'
import moment from 'moment'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { isEmpty } from 'lodash/fp'
import { Modal, Button } from 'react-bootstrap'
import { simpleAlert, getUserId, loaderAlert, getUserType } from '../../utils'
import { uploadingImage } from '../../actions'
import { IModal } from '../../TS'
import { SelectPhoto } from './style'
import bkperson from '../../assets/images/bkperson.png'

interface SelectedFile {
  id: string
  name: string
  type: string
  size: number
  src: {
    file: File
    base64: string
  }
}
interface IModalNewPhoto extends IModal {
  time: React.Dispatch<React.SetStateAction<string>>
}

export const UpdateProfilePhoto: React.FC<IModalNewPhoto> = ({ show, handleClose, time }) => {
  const dispatch = useDispatch()
  const [files, setFiles] = useState<SelectedFile[]>([])
  useEffect(() => { 
    setFiles([])
  }, [show])

  const handleSuccess = (filesSelected: SelectedFile[]) => {
    setFiles(filesSelected) 
  }
  const handleSend = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault()
    loaderAlert({ html: 'sending image...' })
    dispatch(uploadingImage(true))
    try {
      const formData = new FormData()
      const image = files[0].src.file
      formData.append('image', image)
      const type = getUserType() === 'company' ? 'companies' : 'customers'
      
      await axios.post(`${type}/${getUserId()}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      Swal.close()
      time(moment().toISOString())
      simpleAlert({ html: 'Image uploaded', icon: 'success' }).then(() => handleClose(false))
    } catch (err) {
      Swal.close()
      simpleAlert({ html: 'It was not possible to upload your image, try again', icon: 'warning' })
    }
    dispatch(uploadingImage(false))
  }
  return (<Modal centered show={show} onHide={() => handleClose(false)} className="modals-user-info new-photo-modal">
    <Modal.Header closeButton />
    <Modal.Body className="content-detail pt-0">
      <Files
        accept={['image/jpg', 'image/jpeg', 'image/png']}
        convertToBase64
        maxSize="2mb"
        onSuccess={handleSuccess}
        onError={() => simpleAlert({ html: 'Invalid image, select another'})}>
        {({ browseFiles }: { browseFiles: Function }) => {
          return (<>
            <p className="fz-14 fwsb">Select picture:</p>
            <SelectPhoto className="cursor" onClick={() => browseFiles()}>
              {isEmpty(files) ?
                (<div className="pending" />):
                (<p
                  className="photo profile-photo"
                  style={{ backgroundImage: `url('${files[0].src.base64 || bkperson}')` }} />)}
            </SelectPhoto>
            <p className="fz-12 w-100 text-center fwn m-0">(click on the circle to select a new one)</p>
          </>)
        }}
      </Files>
      <div className="text-center pt-3">
        <Button disabled={isEmpty(files)} onClick={handleSend}>Upload</Button>
      </div>
    </Modal.Body>
  </Modal>)
}
