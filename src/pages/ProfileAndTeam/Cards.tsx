import React, { HTMLAttributes, useState } from 'react'
import { Button } from 'react-bootstrap'
import { RemoveCard, AddCard } from './Modals'
import { SimpleCard } from '../../styles/style'
import { AllCards, SingleCard } from './style'

interface ItempCardInfo {
  id: string
  number: string
  type: string
}

export const Cards: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className = '' }) => {
  // Temporal removed
  const [showDetail, setShowDetail] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [currentDetail, setCurrentDetail] = useState<ItempCardInfo>()
  const cardsList: ItempCardInfo[] = [
    { id: 'ASD4serf-1', number: '************4192', type: 'visa' },
    { id: 'ASD4serf-2', number: '************9669', type: 'visa' },
  ]

  const openRemoveCardModal = (data: ItempCardInfo) => {
    setCurrentDetail(data)
    setShowDetail(true)
  }

  return (<>
    <AddCard show={showAddModal} handleClose={setShowAddModal} />
    <RemoveCard data={currentDetail} show={showDetail} handleClose={setShowDetail} />
    <SimpleCard className={`px-4 py-3 ${className}`}>
      <div className="d-flex justify-content-between align-items-center">
        <p className="tc-green fz-15 m-0">My Cards</p>
        <Button variant="success" className="btn-pill fz-12 bg-lgren" onClick={() => setShowAddModal(true)}>
          Add card
        </Button>
      </div>
      <AllCards>
        {cardsList.map((el, idx) => (<SingleCard key={idx}>
          <span>{el.type}</span>
          <p className="m-0">{el.number}</p>
          <Button onClick={() => openRemoveCardModal(el)} variant="danger" className="btn-pill fz-12">Delete</Button>
        </SingleCard>))}
      </AllCards>
    </SimpleCard>
  </>)
}
