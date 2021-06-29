import React, { useContext } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Context from '../../Context'
import { ParticlesLayout } from '../Layout/ParticlesLayout'
import { CardPassword } from './style'
import { loaderAlert, simpleAlert, useInputChange } from '../../utils'
import icPassword from '../../assets/images/icons/ic_password.svg'
import Logo from '../../assets/images/logo_datalink_white.svg'

const ResetPassword: React.FC = () => {
  const [input, handleInputChange] = useInputChange({ email: '' })
  const { isAuth } = useContext(Context.Consumer)
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    loaderAlert({ html: 'sending request...' })
    axios
      .post('logins/reset', input)
      .then(() => {
        Swal.close()
        simpleAlert({ html: 'We send you an email with instructions to reset your password', icon: 'success' })
      })
      .catch(() => {
        Swal.close()
        simpleAlert({ html: 'We could not send instructions for this email', icon: 'error' })
      })
  }

  return (<ParticlesLayout className="justify-content-center">
    <Link to={isAuth ? '/dashboard' : '/'}><img src={Logo} alt="DataLink" className="logo-white" /></Link>
    <CardPassword className="px-3 py-4 shadow-sm">
      <form
        onSubmit={handleSubmit}
        className="d-flex align-items-center justify-content-center flex-column">
        <img src={icPassword} alt="DataLink" className="mb-4" />
        <h2 className="fwb fz-20 tc-gray">Reset Password</h2>
        <p className="fwb fz-12">
          Enter your email to recieve an email explaining how to reset your password
        </p>
        <input
          value={input.email.toLowerCase()}
          name="email"
          onChange={handleInputChange}
          required
          type="email"
          placeholder="Email address" />
        <Button type="submit" className="py-2 fwb bg-purple">Sent a reset email</Button>
        {!isAuth && (<Link to="/" className="pt-4 pb-1">Return to Sign In page</Link>)}
      </form>
    </CardPassword>
  </ParticlesLayout>)
}

export default ResetPassword
