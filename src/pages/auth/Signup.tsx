import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Swiper from 'swiper'
import Swal from 'sweetalert2'
import { Link, useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import Context from '../../Context'
import Logo from '../../assets/images/logo_datalink.svg'
import { Text, TermsAndConditions } from './Components'
import { ParticlesLayout } from '../Layout/ParticlesLayout'
import { setCurrentUser } from '../../actions'
import { token, simpleAlert, useInputChange, loaderAlert } from '../../utils'
import { ISignup, IloginData, IcurrentUser } from '../../TS'
import { Card, BigCard } from './style'
import 'swiper/css/swiper.min.css'

const Terms: React.FC<{ input: { [x: string]: string; } }> = ({ input }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    new Swiper('.swiper-container', {
      direction: 'vertical',
      slidesPerView: 'auto',
      freeMode: true,
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      height: 300,
      mousewheel: true,
    })
  }, [])
  const { activateAuth } = useContext(Context.Consumer)
  const history = useHistory()
  const [accept, setAccept] = useState(false)
  
  const completeSignUp = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault()
    const userData = input
    delete userData.password2

    if (accept) {
      loaderAlert({ html: 'wait a moment please...' })
      axios
        .post('companies', userData)
        .then(({ data }) => {
          return axios.post('logins', {
            email: data.email,
            password: userData.password,
          })
        })
        .then(({ data }: { data: IloginData }) => {
          sessionStorage.setItem('AT', data.id)
          sessionStorage.setItem('userId', data.userId)
          axios.defaults.params = { access_token: data.id }
          const { userId } = data
          return axios.get(`companies/${userId}`)
        })
        .then(({ data }: { data: IcurrentUser }) => {
          dispatch(setCurrentUser(data))
          activateAuth()
          Swal.close()
          history.push('/select-connections')
        })
        .catch(() => {
          Swal.close()
          simpleAlert({
            icon: 'warning',
            html: 'it was not possible to complete the process, please try again.',
          })
        })
    }
  }

  return (<BigCard className="py-4 px-3 text-center">
    <Link to="/">
      <img src={Logo} alt="DataLink" className="mb-3" />
    </Link>
    <h2 className="tc-gray fwb fz-20">Terms and Conditions</h2>
    <p className="fz-12 fwb m-auto pb-3">
      You may read and accept Terms and Conditions to be able continue and start the connection
    </p>
    <div
      className="rounded swiper-container text-left tc-dgray bg-white"
      style={{ height: '300px', width: '90%' }}>
      <div className="swiper-wrapper">
        <div className="swiper-slide fz-12 p-4" style={{ height: 'auto' }}>
          <TermsAndConditions />
        </div>
      </div>
      <div className="swiper-scrollbar" />
    </div>
    <div className="py-2 text-center tc-gray">
      <input 
        type="checkbox"
        name="accept-terms"
        id="accept-terms"
        className="help-checkbox"
        checked={accept}
        onChange={() => setAccept(!accept)} />
      <label htmlFor="accept-terms">I read and accept Terms and Conditions</label>
    </div>
    <Button
      onClick={completeSignUp}
      className="fwb dl-button"
      style={{ width: '250px' }}>
      Continue
    </Button>
  </BigCard>)
}

const Initial: React.FC<ISignup> = ({ setShowTerms, handleInputChange, input }) => {
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    if (input.password !== input.password2) {
      simpleAlert({
        html: 'Passwords do not match'
      })
    } else {
      setShowTerms(true)
    }
  }
  return (<>
    <Card className="py-5 px-4 ml-130">
      <form
        onSubmit={handleSubmit}
        className="d-flex align-items-center justify-content-center flex-column">
        <Link to="/">
          <img src={Logo} alt="DataLink" className="mb-4" />
        </Link>
        <input onChange={handleInputChange} name="firstName" value={input.firstName} required type="text" placeholder="First name" />
        <input onChange={handleInputChange} name="lastName" value={input.lastName} required type="text" placeholder="Last name" />
        <input onChange={handleInputChange} name="company" value={input.company} required type="text" placeholder="Company" />
        <input onChange={handleInputChange} name="email" value={input.email} required type="email" placeholder="Email address" />
        <input onChange={handleInputChange} name="password" value={input.password} required type="password" placeholder="Password" className="mb-0" />
        <p className='tc-purple container my-3 fz-15'>Confirm password</p>
        <input onChange={handleInputChange} name="password2" value={input.password2} required type="password" placeholder="Password" className="mb-4" />
        <Button type="submit" className="dl-button fwb bg-lgren">Sign up</Button>
      </form>
    </Card>
    <Text extra="Already have an account?">
      <Link to="/" className="fwb d-block d-sm-inline-block mx-2">
        Sign in
      </Link>
    </Text>
  </>)
}

const Signup: React.FC = () => {
  if (token()) {
    window.location.href = '/dashboard' // to force a token validation utils/auth.ts
  }
  
  const [showTerms, setShowTerms] = useState(false)
  const [input, handleInputChange] = useInputChange({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    password: '',
    password2: '',
  })

  return (<ParticlesLayout className={`${showTerms && 'justify-content-center'}`}>
    {showTerms ? <Terms input={input} /> : <Initial handleInputChange={handleInputChange} input={input} setShowTerms={setShowTerms} />}
  </ParticlesLayout>)
}

export default Signup
