import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { get } from 'lodash/fp'
import { useSelector } from 'react-redux'
import { MdPersonOutline } from 'react-icons/md'
import { Table, Button } from 'react-bootstrap'
import { UserDetail, RemoveUser, NewUser } from './Modals'
import { getUserType, getManagerName, getManagerImage } from '../../utils'
import { SimpleCard } from '../../styles/style'
import { ICustomerInfo, IgeneralState } from '../../TS'
import Team from '../../assets/images/icons/ic_team.svg'
import bkperson from '../../assets/images/bkperson.png'
import '../../styles/teamTable.sass'

export const TeamManagement: React.FC = () => {
  const [showDetail, setShowDetail] = useState(false)
  const [list, setList] = useState<ICustomerInfo[]>([])
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [showNewUserModal, setShowNewUserModal] = useState(false)
  const [currentDetail, setCurrentDetail] = useState<ICustomerInfo>()
  const { currentUser } = useSelector(({ userControlReducer }: IgeneralState) => userControlReducer)
  useEffect(() => {
    if (!showRemoveModal && !showNewUserModal && currentUser) {
      setList([])
      const compId = getUserType() === 'company' ? currentUser.id : currentUser.companyId
      axios
        .get(`companies/${compId}/customers`)
        .then(({ data }: { data: ICustomerInfo[] }) => setList(data))
        .catch(() => { })
    }
  }, [showRemoveModal, showNewUserModal, currentUser])
  
  const openDetailModal = (data: ICustomerInfo) => {
    setCurrentDetail(data)
    setShowDetail(true)
  }
  const openRemoveModal = (data: ICustomerInfo) => {
    setCurrentDetail(data)
    setShowRemoveModal(true)
  }

  return (<>
    {getUserType() === 'company' && (<NewUser show={showNewUserModal} handleClose={setShowNewUserModal} />)}
    <UserDetail data={currentDetail} show={showDetail} handleClose={setShowDetail} />
    <RemoveUser data={currentDetail} show={showRemoveModal} handleClose={setShowRemoveModal} />
    <section>
      <h2 className="fwb fz-20 tc-darkpurple mb-4">
        <img className="mr-2" src={Team} alt="My Team" /> My team
      </h2>
      <SimpleCard className="py-4 px-3">
        <div className="info-user-table px-2">
          <div className="info">
            <div className="photo">
              <span><MdPersonOutline size={18} color="white" /></span>
              {getUserType() !== 'company' && (<p
                className="manager-profile m-0 profile-photo"
                style={{ backgroundImage: `url('${getManagerImage() || bkperson} ')` }} />)}
            </div>
            {getUserType() === 'company'?
              (<p>{get('firstName', currentUser)} {get('lastName', currentUser)}<span>Team Admin</span></p>):
              (<p>{getManagerName() || ''}<span>Team Admin</span></p>)}
          </div>
          {getUserType() === 'company' && (<Button onClick={() => setShowNewUserModal(true)} className="bg-purple btn-pill fz-12">New user</Button>)}
        </div>
        <Table responsive className="m-0 team-table">
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Email adress</th>
              <th>Role</th>
              <th />
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((el, idx)=>(<tr key={idx}>
              <td>
                <p
                  className="photo profile-photo"
                  style={{ backgroundImage: `url('${el.image || bkperson } ')` }} />
              </td>
              <td>{el.firstName} {el.lastName}</td>
              <td>{el.email}</td>
              <td>{el.type}</td>
              <td className="fz-11 tc-tpurple">{el.pending ? 'Pending' : ''}</td>
              <td>
                <Button onClick={() => openDetailModal(el)} className="bg-purple btn-pill fz-12">Details</Button>
                {getUserType() === 'company' && (<Button
                  onClick={() => openRemoveModal(el)}
                  variant="danger"
                  className="ml-2 btn-pill fz-12">
                    Remove
                  </Button>)}
              </td>
            </tr>))}
          </tbody>
        </Table>
      </SimpleCard>
    </section>
  </>)
}
