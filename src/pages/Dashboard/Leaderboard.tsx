import React from 'react'
import { Button, Image } from 'react-bootstrap'
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis } from 'recharts'
import { DashboardSection } from '../../components'
import { Actions } from '../../styles/style'
import { LeaderboardContainer, UserInfoDetail } from './style'
import { dataLeaderboard, dataLeaderboardUsers } from '../../components/tmpData'

interface IUserInfo {
  info: {
    name: string
    value: string
    variation: string
    ico: string
    img: string
  }
}
const UserInfo: React.FC<IUserInfo> = ({ info }) => {
  const { name, value, variation, ico, img } = info
  return (<UserInfoDetail>
    <Image src={img} roundedCircle alt={name} />
    <p>
      {name}
      <span>{value}</span>
    </p>
    <span className={`variation ${ico}`}>{variation}</span>
  </UserInfoDetail>)
}

export const Leaderboard: React.FC = () => {
  return (<DashboardSection title="Leaderboard">
    <Actions className="actions">
      <Button>Report</Button>
    </Actions>
    <LeaderboardContainer>
      <ResponsiveContainer width="100%" height={170}>
        <AreaChart data={dataLeaderboard}>
          <defs>
            <linearGradient id="colorPv2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="20%" stopColor="#1EDB83" stopOpacity={0.3} />
              <stop offset="80%" stopColor="#1EDB83" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            separator=""
            formatter={(value) => [`$${value}`, '']}
            contentStyle={{ backgroundColor: '#191C34', opacity: 0.9, border: 'none' }} />
          <XAxis dataKey="name" hide={true} />
          <Area type='monotoneX' dataKey='uv'
            stroke="#1EDB83"
            strokeWidth='3'
            fillOpacity={1}
            fill="url(#colorPv2)" />
        </AreaChart>
      </ResponsiveContainer>
    </LeaderboardContainer>
    {dataLeaderboardUsers.map((el, idx) => (<UserInfo info={el} key={idx} />))}
  </DashboardSection>)
}
