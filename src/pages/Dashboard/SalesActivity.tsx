import React, { useEffect } from 'react'
import Swiper from 'swiper'
import { useSelector } from 'react-redux'
import { Button, Image } from 'react-bootstrap'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { DashboardSection } from '../../components'
import { Actions } from '../../styles/style'
import { TimelineContainer, IcoTimeline } from './style'
import { timelineData } from '../../components/tmpData'
import { IgeneralState, ITimelineItem } from '../../TS'
import 'swiper/css/swiper.min.css'
import 'react-vertical-timeline-component/style.min.css'

const TimelineItem: React.FC<ITimelineItem> = ({ data }) => (<VerticalTimelineElement
  contentStyle={{ background: 'transparent' }}
  contentArrowStyle={{ display: 'none' }}
  className="vertical-timeline-item item-timeline-datalink"
  icon={<IcoTimeline className="custom-icon"><span /></IcoTimeline>}>
  <div className="content-timeline-item">
    <ul>
      {data.images.map((el, idx) => (<li key={idx}>
        <Image src={el} alt="Timeline image" />
      </li>))}
    </ul>
    <p>{data.text}</p>
    <span>{data.time}</span>
  </div>
</VerticalTimelineElement>)

export const SalesActivity: React.FC = () => {
  const { selectedUser } = useSelector(({ userControlReducer }: IgeneralState) => userControlReducer)
  useEffect(() => {
    new Swiper('.swiper-container', {
      direction: 'vertical',
      slidesPerView: 'auto',
      freeMode: true,
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      height: 400,
      mousewheel: true,
    })
  }, [])
  return (<DashboardSection title="Sales Rep Activities">
    <Actions className="actions top">
      <Button>Report</Button>
      <span className="fwsb tc-white">{selectedUser.label} data</span>
    </Actions>
    <TimelineContainer className="swiper-container">
      <div className="swiper-wrapper">
        <div className="swiper-slide" style={{ height: 'auto' }}>
          <VerticalTimeline layout="1-column" className="vertical-without-time datalink-timeline">
            {timelineData[selectedUser.value].map((el, idx) => (<TimelineItem data={el} key={idx} />))}
          </VerticalTimeline>
        </div>
      </div>
      <div className="swiper-scrollbar" />
    </TimelineContainer>
  </DashboardSection>)
}
