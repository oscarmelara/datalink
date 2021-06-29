import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import { PremiumCard } from './Components'
import { NavBar } from '../../components'
import { expireDate } from '../../utils'
import { IgeneralState } from '../../TS'
import { Plan } from './style'
import checkImg from '../../assets/images/icons/ic_check.svg'
import equisImg from '../../assets/images/icons/ic_equis.svg'
import startup from '../../assets/images/startup.svg'

export const SelectPlan: React.FC = () => {
  const { currentUser } = useSelector(({ userControlReducer }: IgeneralState) => userControlReducer)
  const [trial, setTrial] = useState({ msg: '', n: 0 })

  useEffect(() => {
    setTrial(expireDate())
  }, [currentUser])

  return (<>
    <NavBar />
    <Container className="d-flex justify-content-around flex-wrap py-5">
      <Plan>
        <div className="title">
          <div><img src={startup} alt="Trial" /></div>
          <h2>Trial</h2>
        </div>
        <p>
          <img src={checkImg} alt="check" />
          Acceso a Dashboard
        </p>
        <p>
          <img src={checkImg} alt="check" />
          Team
        </p>
        <p>
          <img src={equisImg} alt="check" />
          Edit Team
        </p>
        <p>
          <img src={equisImg} alt="check" />
          Connect more than two tools
        </p>
        <p>
          <img src={equisImg} alt="check" />
          Downloand reports
        </p>
        <span className="btn">{trial.msg}</span>
      </Plan>
      <PremiumCard />
    </Container>
  </>)
}

