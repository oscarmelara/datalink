import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { get, isEmpty } from 'lodash/fp'
import { Modal, Image, Button, Form, Row, Col } from 'react-bootstrap'
import { useInputChangeBT, getUserId, simpleAlert } from '../../utils'
import { IModal, IDetailModal, IinvitationModal, ICardModal } from '../../TS'
import Invite from '../../assets/images/icons/invite_user.svg'
import ReInvite from '../../assets/images/icons/reset_invite.svg'
import bkperson from '../../assets/images/bkperson.png'
import '../../styles/modals.sass'

export const UserDetail: React.FC<IDetailModal> = ({ show, handleClose, data }) => {
  return (<Modal centered show={show} onHide={() => handleClose(false)} className="modals-user-info detail-modal">
    <Modal.Header closeButton />
    <Modal.Body className="content-detail">
      <Image src={get('image', data)} alt={get('name', data)} roundedCircle className="user-photo" />
      <table>
        <tbody>
          <tr>
            <td className="tc-tpurple fwb">Full name: </td>
            <td className="fwsb">{get('firstName', data)} {get('lastName', data)}</td>
          </tr>
          <tr><td className="tc-tpurple fwb">Email Address: </td><td>{get('email', data)}</td></tr>
          <tr><td className="tc-tpurple fwb">Rol: </td><td>{get('type', data)}</td></tr>
        </tbody>
      </table>
    </Modal.Body>
  </Modal>)
}

export const RemoveUser: React.FC<IDetailModal> = ({ show, handleClose, data }) => {  
  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    try {
      await axios.delete(`companies/${getUserId()}/customers/${get('id', data)}`)
      handleClose(false)
    } catch (err) {
      simpleAlert({ html: 'it was not possible to delete user', icon: 'warning' })
    }
  }
  return (<Modal centered show={show} onHide={() => handleClose(false)} className="modals-user-info remove-modal">
    <Modal.Header closeButton />
    <Modal.Body className="content-detail">
      <form onSubmit={handleSubmit}>
        <p className="fwb fz-16 text-center">
          Are you sure you want to remove<br />this user from your team?
        </p>
        <div>
          <Image src={get('image', data)} alt={get('name', data)} roundedCircle className="user-photo" />
          <p className="fwb">
            {get('firstName', data)} {get('lastName', data)}
            <span className="fwn">{get('email', data)}</span>
          </p>
        </div>
        <Button type="submit" variant="danger">Remove of my team</Button>
      </form>
    </Modal.Body>
  </Modal>)
}

export const UserSendInvitation: React.FC<IinvitationModal> = ({ show, handleClose, email }) => {
  const [input, setInputValue] = useState('')
  useEffect(() => { setInputValue(email) }, [email])

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
  }
  return (<Modal centered show={show} onHide={() => handleClose(false)} className="modals-user-info send-invitation-modal">
    <Modal.Header closeButton />
    <Modal.Body className="content-detail">
      <form onSubmit={handleSubmit}>
        <div className="text-center">
          <img className="mb-3" src={isEmpty(email) ? Invite : ReInvite} alt="User"/>
          <p className="mb-1 fz-20 fwb">{isEmpty(email) ? 'Invite user' : 'Reset invite'}</p>
          <p className="tc-tpurple fwsb">
            {isEmpty(email) ?
              'Invite user receive an email explaining how to join your team':
              'Verify the email adress where we will send the invitation'}
          </p>
          <input
            type="email"
            name="email"
            required
            value={input}
            placeholder="Email address"
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => setInputValue(ev.currentTarget.value)} />
          <Button type="submit" className={`fwsb ${isEmpty(email) ? 'bg-purple' : 'bg-primary'}`}>
            {isEmpty(email) ? 'Sent an email' : 'Reset invite'}
          </Button>
        </div>
      </form>
    </Modal.Body>
  </Modal>)
}

export const RemoveCard: React.FC<ICardModal> = ({ show, handleClose, data }) => {
  return (<Modal centered show={show} onHide={() => handleClose(false)} className="modals-user-info remove-card-modal">
    <Modal.Header closeButton />
    <Modal.Body className="content-detail">
      <p className="fwb fz-16 text-center">
        Are you sure you want<br />to remove this card?
      </p>
      <div>
        <span className="type">{get('type', data)}</span>
        <span>{get('number', data)}</span>
      </div>
      <Button variant="danger">Remove this card</Button>
    </Modal.Body>
  </Modal>)
}

export const AddCard: React.FC<IModal> = ({ show, handleClose }) => {
  const [input, handleInputChange] = useInputChangeBT({ number: '', mm: '', yy: '', code: '', fname: '', lname: '' })
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
  }
  return (<Modal centered show={show} onHide={() => handleClose(false)} className="modals-user-info add-card-modal">
    <Modal.Header closeButton />
    <Modal.Body className="content-detail">
      <form onSubmit={handleSubmit} className="w-100">
        <Form.Group controlId="CardNumber">
          <Form.Label className="tc-tpurple fwsb fz-15">Card number</Form.Label>
          <Form.Control
            type="text"
            required
            name="number"
            value={input.number}
            onChange={handleInputChange}
            placeholder="000 000 000 000" />
        </Form.Group>
        <Row>
          <Col xs={5} className="pr-0">
            <Form.Group controlId="MM">
              <Form.Label className="tc-tpurple fwsb fz-15">MM</Form.Label>
              <Form.Control
                type="text"
                required
                name="mm"
                value={input.mm}
                onChange={handleInputChange}
                placeholder="00" />
            </Form.Group>
          </Col>
          <Col xs={2} className="p-0 text-center">
            <p className="fz-20 tc-tpurple" style={{ margin: '32px 0 0 0' }}>/</p>
          </Col>
          <Col xs={5} className="pl-0">
            <Form.Group controlId="YY">
              <Form.Label className="tc-tpurple fwsb fz-15">YY</Form.Label>
              <Form.Control
                type="text"
                required
                name="yy"
                value={input.yy}
                onChange={handleInputChange}
                placeholder="00" />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="SecurityCode">
          <Form.Label className="tc-tpurple fwsb fz-15">Security code</Form.Label>
          <Form.Control
            type="text"
            required
            name="code"
            value={input.code}
            onChange={handleInputChange}
            placeholder="000" />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group controlId="FirstName">
              <Form.Label className="tc-tpurple fwsb fz-15">First name</Form.Label>
              <Form.Control
                type="text"
                required
                name="fname"
                value={input.fname}
                placeholder="Owner first name"
                onChange={handleInputChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="LastName">
              <Form.Label className="tc-tpurple fwsb fz-15">Last name</Form.Label>
              <Form.Control
                type="text"
                required
                name="lname"
                value={input.lname}
                placeholder="Owner last name"
                onChange={handleInputChange} />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" className="fz-16 fwsb" variant="primary">Save</Button>
      </form>
    </Modal.Body>
  </Modal>)
}

export const NewUser: React.FC<IModal> = ({ show, handleClose }) => {
  const [input, handleInputChange] = useInputChangeBT({ password: '', email: '', firstName: '', lastName: '' })
  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const data = {
      ...input,
      type: 'viewer',
      image: bkperson,
      created: moment().toISOString(),
    }
    try {
      await axios.post(`companies/${getUserId()}/customers`, data)
      handleClose(false)
    } catch (err) {
      simpleAlert({ html: 'it was not possible to create user', icon: 'warning' })
    }
  }
  
  return (<Modal centered show={show} onHide={() => handleClose(false)} className="modals-user-info add-card-modal">
    <Modal.Header closeButton />
    <Modal.Body className="content-detail">
      <form onSubmit={handleSubmit} className="w-100">
        <Row>
          <Col>
            <Form.Group controlId="FirstName">
              <Form.Label className="tc-tpurple fwsb fz-15">First Name</Form.Label>
              <Form.Control
                type="text"
                required
                name="firstName"
                value={input.firstName}
                onChange={handleInputChange}
                placeholder="User first name" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="LastName">
              <Form.Label className="tc-tpurple fwsb fz-15">Last Name</Form.Label>
              <Form.Control
                type="text"
                required
                name="lastName"
                value={input.lastName}
                onChange={handleInputChange}
                placeholder="User last name" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="password">
              <Form.Label className="tc-tpurple fwsb fz-15">Password</Form.Label>
              <Form.Control
                type="password"
                required
                name="password"
                value={input.password}
                onChange={handleInputChange}
                placeholder="password" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="email">
              <Form.Label className="tc-tpurple fwsb fz-15">Email</Form.Label>
              <Form.Control
                type="email"
                required
                name="email"
                value={input.email}
                onChange={handleInputChange}
                placeholder="email" />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" className="fz-16 fwsb" variant="primary">Save</Button>
      </form>
    </Modal.Body>
  </Modal>)
}
