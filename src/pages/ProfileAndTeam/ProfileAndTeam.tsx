import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { NavBar } from '../../components'
import { ContainerDL } from '../../styles/style'
import { TeamManagement, Profile } from './'

export const ProfileAndTeam: React.FC = () => {
  return(<>
    <NavBar />
    <ContainerDL className="py-4">
      <Row>
        <Col xs={4}>
          <Profile className="mb-4" />
        </Col>
        <Col xs={8}>
          <TeamManagement />
        </Col>
      </Row>
    </ContainerDL>
  </>)
}
