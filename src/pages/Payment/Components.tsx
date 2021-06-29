import React from 'react'
import { useHistory } from 'react-router-dom'
import { Plan } from './style'
import checkImg from '../../assets/images/icons/ic_check.svg'
import premium from '../../assets/images/premium.svg'

export const PremiumCard: React.FC<{ link?: boolean }> = ({ link = true }) => {
  const history = useHistory()

  return (<Plan className={`premium shadow d-inline-block ${link ? '' : 'py-5'}`}>
    <div className="title">
      <div><img src={premium} alt="Premium" /></div>
      <h2>Premiun</h2>
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
      <img src={checkImg} alt="check" />
      Edit Team
    </p>
    <p>
      <img src={checkImg} alt="check" />
      Connect more than two tools
    </p>
    <p>
      <img src={checkImg} alt="check" />
      Downloand reports
    </p>
    {link && (<span className="btn cursor" onClick={() => history.push('/payment-method')}>
      Start Premium plan
    </span>)}
  </Plan>)
}
