import React from 'react'
import moment from 'moment'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { NavBar } from '../../components'
import { PremiumCard } from './Components'
import { ICardInfo } from '../../TS'
import { SimpleCard } from '../../styles/style'
import { ContainerWithBorder, AllCards, SingleCard } from './style'

export const Information: React.FC = () => {
  const cardsList: ICardInfo[] = [
    { id: 'ASD4serf-1', number: '************4192', type: 'visa' },
    { id: 'ASD4serf-2', number: '************9669', type: 'visa' }
  ]
  return (<>
    <NavBar />
    <Container>
      <Row>
        <Col xs={12} md={6} className="py-3 card-align-right">
          <PremiumCard link={false} />  
        </Col>
        <Col xs={12} md={6} className="py-3 card-align-left">
          <SimpleCard className="px-4 py-3 mb-3 scard-mw d-inline-block">
            <div className="d-flex justify-content-between align-items-center">
              <p className="tc-primary fz-15 m-0 w-100">
                Payment plan
                <span className="tc-white float-right">{moment().format('MMMM')}</span>
              </p>
            </div>
            <ContainerWithBorder className="mt-3">
              <p className="tc-primary fwb fz-40 my-3">$150.00</p>
            </ContainerWithBorder>
            <Button className="w-100 fwsb">Process my payment</Button>
          </SimpleCard>

          <SimpleCard className="px-4 py-3 scard-mw d-inline-block">
            <div className="d-flex justify-content-between align-items-center">
              <p className="tc-primary fz-15 m-0">Payment method</p>
            </div>
            <AllCards>
              {cardsList.map((el, idx) => (<SingleCard key={idx}>
                <span>{el.type}</span>
                <p className="m-0">{el.number}</p>
              </SingleCard>))}
            </AllCards>
            <Link to="/payment-method">
              <Button className="w-100 fwsb mt-2">Change payment method</Button>
            </Link>
          </SimpleCard>
        </Col>
      </Row>
    </Container>
  </>)
}
