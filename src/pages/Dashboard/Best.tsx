import React from 'react'
import { Button } from 'react-bootstrap'
import { Progress } from 'react-sweet-progress'
import { FaArrowUp } from 'react-icons/fa'
import { DashboardSection } from '../../components'
import { IBestDataStructure } from '../../TS'
import { Actions } from '../../styles/style'
import { MainValue, BestValues, SeparatorH } from './style'
import 'react-sweet-progress/lib/style.css'

export const Best: React.FC<{ title: string, data: IBestDataStructure[] }> = ({ data, title }) => {
  const main = data.shift() as IBestDataStructure
  return (<DashboardSection title={title}>
    <Actions className="actions">
      <Button>Report</Button>
    </Actions>
    <MainValue className="shadow">
      <Progress
        type="circle"
        percent={main.value}
        strokeWidth={5}
        style={{ height: '70px', width: '70px' }}
        theme={{
          active: {
            trailColor: 'rgba(0,0,0,0.3)',
            color: '#1EDB83',
          }
        }}
      />
      <p>
        {main.title}
        <span>{main.amount}</span>
      </p>
      <FaArrowUp color="#21B46F" size={20} />
    </MainValue>
    <SeparatorH />
    {data.map((el, idx) => (<BestValues key={idx}>
      <Progress
        type="circle"
        percent={el.value}
        strokeWidth={5}
        style={{ height: '45px', width: '45px' }}
        theme={{
          active: {
            trailColor: 'rgba(0,0,0,0.3)',
            color: el.value < 40 ? '#D8A530' : '#007AFF',
          }
        }}
      />
      <p>
        {el.title}
        <span>{el.amount}</span>
      </p>
      <span
        style={{ color: el.ico === 'more-ico' ? '#1EDB83' : '#D8A530' }} 
        className={el.ico}>
        {el.variation}
      </span>
    </BestValues>))}
  </DashboardSection>)
}
