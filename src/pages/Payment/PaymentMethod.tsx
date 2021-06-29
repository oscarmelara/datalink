import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { NavBar } from '../../components'
import { useInputChangeBT } from '../../utils'
import { ICardInfo } from '../../TS'
import { SimpleCard } from '../../styles/style'
import { AllCards, SingleCard } from './style'

export const PaymentMethod: React.FC = () => {
  const [input, handleInputChange] = useInputChangeBT({ number: '', mm: '', yy: '', code: '', fname: '', lname: '' })
  const cardsList: ICardInfo[] = [
    { id: 'ASD4serf-1', number: '************4192', type: 'visa' },
    { id: 'ASD4serf-2', number: '************9669', type: 'visa' }
  ]
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
  }
  return (<>
    <NavBar />
    <Container>
      <h2 className="tc-lgreen fz-20 fwb mb-4">Payment method</h2>
      <Row>
        <Col xs={12} lg={6}>
          <SimpleCard className="px-4 py-3 scard-mw">
            <div className="d-flex justify-content-between align-items-center">
              <p className="tc-green fz-15 mb-3 fwsb">New card</p>
            </div>
            <form onSubmit={handleSubmit} className="w-100">
              <Form.Group controlId="CardNumber">
                <Form.Label className="tc-tpurple fwsb fz-15">Card number</Form.Label>
                <Form.Control type="text" required name="number" value={input.number} onChange={handleInputChange} placeholder="000 000 000 000" />
              </Form.Group>
              <Row>
                <Col xs={5} className="pr-0">
                  <Form.Group controlId="MM">
                    <Form.Label className="tc-tpurple fwsb fz-15">MM</Form.Label>
                    <Form.Control type="text" required name="mm" value={input.mm} onChange={handleInputChange} placeholder="00" />
                  </Form.Group>
                </Col>
                <Col xs={2} className="p-0 text-center">
                  <p className="fz-20 tc-tpurple" style={{ margin: '32px 0 0 0' }}>/</p>
                </Col>
                <Col xs={5} className="pl-0">
                  <Form.Group controlId="YY">
                    <Form.Label className="tc-tpurple fwsb fz-15">YY</Form.Label>
                    <Form.Control type="text" required name="yy" value={input.yy} onChange={handleInputChange} placeholder="00" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="SecurityCode">
                <Form.Label className="tc-tpurple fwsb fz-15">Security code</Form.Label>
                <Form.Control type="text" required name="code" value={input.code} onChange={handleInputChange} placeholder="000" />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="FirstName">
                    <Form.Label className="tc-tpurple fwsb fz-15">First name</Form.Label>
                    <Form.Control type="text" required name="fname" value={input.fname} placeholder="Owner first name" onChange={handleInputChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="LastName">
                    <Form.Label className="tc-tpurple fwsb fz-15">Last name</Form.Label>
                    <Form.Control type="text" required name="lname" value={input.lname} placeholder="Owner last name" onChange={handleInputChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" className="fz-16 fwsb w-100" variant="primary">Save</Button>
            </form>
          </SimpleCard>
        </Col>
        <Col xs={12} lg={6}>
          <SimpleCard className="px-4 py-3 scard-mw">
            <div className="d-flex justify-content-between align-items-center">
              <p className="tc-green fz-15 m-0 fwsb">My Cards</p>
            </div>
            <AllCards>
              {cardsList.map((el, idx) => (<SingleCard key={idx}>
                <span>{el.type}</span>
                <p className="m-0">{el.number}</p>
              </SingleCard>))}
            </AllCards>
          </SimpleCard>
        </Col>
      </Row>
    </Container>
  </>)
}
