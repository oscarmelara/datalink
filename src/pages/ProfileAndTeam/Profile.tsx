import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { get, isEmpty } from 'lodash/fp'
import { useSelector, useDispatch } from 'react-redux'
import { TiPencil } from 'react-icons/ti'
import { Form, Button } from 'react-bootstrap'
import { setCurrentUser } from '../../actions'
import { UpdateProfilePhoto } from './NewPhoto'
import { useInputChangeBT, getUserId, simpleAlert, getUserType, loaderAlert } from '../../utils'
import { IgeneralState } from '../../TS'
import { SimpleCard } from '../../styles/style'
import { ProfilePhoto } from './style'
import bkperson from '../../assets/images/bkperson.png'

export const Profile: React.FC<{ className?: string }> = ({ className = '' }) => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(({ userControlReducer }: IgeneralState) => userControlReducer)
  const [loaded, setLoaded] = useState(false)
  const [sending, setSending] = useState(false)
  const [newPhoto, setnewPhoto] = useState(false)
  const [time, setTime] = useState('')
  const [input, handleInputChange, forceUpdate] = useInputChangeBT({ firstName: '', lastName: '', email: '' })
  useEffect(() => {
    if (!isEmpty(currentUser) && !loaded) {
      const prevData = {
        firstName: get('firstName', currentUser) || '',
        lastName: get('lastName', currentUser) || '',
        email: get('email', currentUser) || '',
      }
      setLoaded(true)
      forceUpdate(prevData)
    }
  }, [currentUser, forceUpdate, loaded])

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    setSending(true)
    const data = { ...input }
    try {
      const type = getUserType() === 'company' ? 'companies' : 'customers'
      const response = await axios.patch(`${type}/${getUserId()}`, data)
      dispatch(setCurrentUser(response.data))
      simpleAlert({ html: 'Information updated', icon: 'success' })
    } catch (err) {
      simpleAlert({ html: 'it was not possible to update your information', icon: 'warning' })
    }
    setSending(false)
  }

  const sendEmail = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault()
    loaderAlert({ html: 'sending request...' })
    axios
      .post('logins/reset', { email: currentUser.email })
      .then(() => {
        Swal.close()
        simpleAlert({ html: 'We send you an email with instructions to reset your password', icon: 'success' })
      })
      .catch(() => {
        Swal.close()
        simpleAlert({ html: 'We could not send instructions, try again', icon: 'error' })
      })
  }

  return (<>
    <UpdateProfilePhoto time={setTime} show={newPhoto} handleClose={setnewPhoto} />
    <SimpleCard className={`mt-5 ${className}`}>
      <ProfilePhoto>
        <div className="cont">
          <p
            id={`profile-image-${time || 'init'}`}
            className="photo profile-photo"
            style={{ backgroundImage: `url('${get('image', currentUser) || bkperson}')` }} />
          <span className="cursor" onClick={() => setnewPhoto(true)}>
            <TiPencil color="white" size={16} />
          </span>
        </div>
      </ProfilePhoto>
      <p className="m-0 pl-4 fz-16 tc-primary">My account</p>
      <form onSubmit={handleSubmit} className="px-4 py-3">
        <Form.Group controlId="firstName">
          <Form.Label className="tc-tpurple">First name</Form.Label>
          <Form.Control
            name="firstName"
            required
            value={input.firstName}
            onChange={handleInputChange}
            placeholder="Write your first name" />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label className="tc-tpurple">Last name</Form.Label>
          <Form.Control
            name="lastName"
            required
            value={input.lastName}
            onChange={handleInputChange}
            placeholder="Write your last name" />
        </Form.Group>
        <Form.Group controlId="EmailAddress">
          <Form.Label className="tc-tpurple">Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            required
            value={input.email}
            onChange={handleInputChange}
            placeholder="Write your email address" />
        </Form.Group>
        <Button onClick={sendEmail} className="my-3 w-100 bg-purple fwb fz-13">Reset Password</Button>
        <Button disabled={sending} type="submit" className="mb-2 w-100 fwb fz-14" variant="primary">Save</Button>
      </form>
    </SimpleCard>
  </>)
}
