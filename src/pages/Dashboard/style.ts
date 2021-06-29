import styled from 'styled-components'

const whiteText = '#E8E3E6'
const lpurple = '#404B9F'

export const LeaderboardContainer = styled.div`
  border-bottom: 1px solid rgba(64,75,159,0.2);
  margin: 30px auto 20px auto;
  width: 90%;
`

export const UserInfoDetail = styled.div`
  align-items: center;
  color: ${whiteText};
  display: flex;
  justify-content: space-between;
  margin: 10px auto 15px auto;
  width: 80%;
  & img, & p, & span {
    margin-bottom: 0;
  }
  & img {
    height: 40px;
    margin-right: 15px;
    margin-left: 10px;
    width: 40px;
  }
  & p {
    font-size: 15px;
    font-weight: 700;
    width: 70%;
    & span {
      background-color: rgba(0,0,0,0.4);
      border-radius: 10px;
      display: block;
      font-size: 12px;
      padding: 1px 10px;
      width: fit-content;
    }
  }
  & .variation {
    float: right;
    &.less-ico {
      color: #D8A530;
    }
    &.more-ico {
      color: #1EDB83;
    }
  }
  @media (max-width: 500px) {
    width: 90%;
  }
  @media (max-width: 440px) {
    & p {
      width: 60%;
    }
  }
`

export const TimelineContainer = styled.div`
  height: 400px;
  margin: 30px auto 40px auto;
  width: 95%;
`

export const IcoTimeline = styled.span`
  align-items: center;
  border-radius: 50%;
  display: flex;
  height: 20px;
  justify-content: center;
  width: 20px;
  & span {
    background-color: #191C34;
    border-radius: 50%;
    display: inline-block;
    height: 10px;
    width: 10px;
  }
`
// Best values component
export const MainValue = styled.div`
  align-items: center;
  background-color: #191C34;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  margin: 20px auto 30px auto;
  padding: 12px 20px;
  width: 90%;
  & p {
    font-size: 15px;
    font-weight: 700;
    margin: 0;
    width: 70%;
    & span {
      background-color: #1EDB83;
      border-radius: 10px;
      color: #121212;
      display: block;
      font-size: 12px;
      margin-top: 5px;
      padding: 1px 10px;
      width: fit-content;
    }
  }
  & .react-sweet-progress-symbol, & .stage-title {
    font-size: 18px;
    font-weight: 400;
  }
  @media (max-width: 500px) {
    margin: 20px auto;
    width: 100%;
  }
`
export const BestValues = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 10px 0;
  width: 70%;
  & p {
    font-size: 13px;
    font-weight: 700;
    margin: 0;
    width: 65%;
    & span {
      background-color: rgba(0,0,0,0.4);
      border-radius: 10px;
      display: block;
      font-size: 12px;
      padding: 1px 10px;
      width: fit-content;
    }
  }
  & .react-sweet-progress-symbol, & .stage-title {
    font-size: 14px;
    font-weight: 400;
  }
  &:last-child {
    margin-bottom: 30px;
  }
  @media (max-width: 500px) {
    width: 90%;
  }
`

export const SeparatorH = styled.span`
  background-color: rgba(64,75,159,0.2);
  display: block;
  height: 1px;
  margin: 0 auto 20px auto;
  width: 90%;
  @media (max-width: 500px) {
    width: 100%;
  }
`

// OportunityStageReport
const trailColor = '#1C2248'

export const Tbody = styled.tbody`
  color: ${whiteText};
  & tr {
    & .pill {
      background-color: ${lpurple};
      border-radius: 13px;
      color: ${whiteText};
      font-weight: 700;
      padding: 3px 15px;
      text-shadow: 0px 0px 3px rgba(0,0,0,0.5);
    }
    & .react-sweet-progress-line {
      background-color: ${trailColor} !important;
    }
    & .react-sweet-progress-symbol, & .stage-title {
      font-weight: 700;
    }
  }
  & td {
    border-bottom: 1px solid rgba(64,75,159,0.3) !important;
    font-size: 13px;
  }
  @media (max-width: 950px) {
    & td {
      min-width: 150px;
    }
  }
`

export const TR = styled.tr`
  & td {
    & .react-sweet-progress-line-inner.react-sweet-progress-line-inner-status-active {
      background-color: ${props => props.theme.main} !important;
    }
    & .react-sweet-progress-symbol, & .stage-title {
      color: ${props => props.theme.main};
    }
  }
`

export const Thead = styled.thead`
  color: ${whiteText};
  & tr {
    font-size: 15px;
    font-weight: 700;
    & th {
      vertical-align: top !important;
      & span {
        display: block;
        font-size: 12px;
        font-weight: 400;
      }
    }
  }
  @media (max-width: 950px) {
    & th {
      min-width: 150px;
    }
  }
`

// Filters
export const SearchInputContainer = styled.div`
  align-items: center;
  background-color: #212754;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  margin: 0 0 0 100px;
  padding: 0 0 0 20px;
  & input, & button {
    height: 30px;
    border: none;
  }
  @media (max-width: 1250px) {
    margin: 0 0 0 0;
  }
`
export const SearchInput = styled.input`
  background-color: transparent;
  color: ${whiteText};
  padding: 0 5px 0 0;
  width: 85%;
  &::placeholder {
    color: ${lpurple};
  }
`
export const SearchButton = styled.button`
  align-items: center;
  background-color: ${lpurple};
  border-radius: 50%;
  display: flex;
  height: 30px;
  justify-content: center;
  width: 30px;
`
