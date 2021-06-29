import styled from 'styled-components'

export const ContainerDL = styled.section`
  display: block;
  margin: 0 auto;
  max-width: 1300px;
  overflow: hidden;
  width: 96%;
`

export const InfusionsoftCard = styled.div`
  align-items: center;
  border-radius: 7px;
  display: flex;
  height: 100px;
  justify-content: center;
  width: 300px;
`

export const PrimaryCard = styled.div`
  background-color: #191C34;
  border-radius: 12px;
  box-shadow: 0px 11px 20px rgba(0,0,0, 0.3);
  width: 330px;
`
export const SimpleCard = styled.div`
  background-color: #212754;
  border-radius: 8px;
  box-shadow: 0px 11px 25px rgba(0,0,0, 0.2);
  width: 100%;
`

export const TopText = styled.p`
  font-size: 12px;
  max-width: 424px;
  padding-bottom: 15px;
  text-align: center;
  width: 98%;
`

export const ConnectionCard = styled.div`
  background-color: #212754;
  border-radius: 7px;
  height: 90px;
  width: 150px;
`

export const TitleSection = styled.section`
  margin: 0 auto;
  padding-left: 5px;
  padding-right: 5px;
  width: 100%;
  & > h2 {
    color: #404B9F;
    font-size: 15px;
    font-weight: 700;
    & svg {
      display: none;
      float: right;
      margin-top: -3px;
    }
  }
  @media (max-width: 950px) {
    & > h2 {
      & svg {
        display: inline-block;
      }
    }
  }
  @media (max-width: 600px) {
    & > h2 {
      padding: 0 0 0 10px;
    }
  }
`

export const ContentSection = styled.div`
  border-radius: 8px;
  padding: 5px 10px;
`

export const Actions = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-top: 4px;
  width: 100%;
  &.top {
    align-items: flex-start;
  }
  & button {
    font-size: 12px;
    padding: 0 5px;
  }
  & .pretty.p-default.p-round.p-smooth {
    margin: 0;
  }
`
