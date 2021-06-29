import styled from 'styled-components'

const blue = '#212754'
const green = '#1EDB83'

export const TittleSettings = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  & div {
    // max-width: 320px;
    width: 100%;
    & h3 {
      margin: 0 30px 0 0;
    }
    & img {
      margin: 0 10px;
    }
  }
  & button {
    border: none;
    padding: 2px 10px;
    & svg {
      position: relative;
      top: -1px;
    }
  }
  @media (max-width: 440px) {
    & div {
      width: 60%;
      & h3 {
        margin: 0 10px 0 0;
      }
      & img {
        margin: 0 5px;
      }
    }
  }
  @media (max-width: 370px) {
    & div {
      & h3 {
        margin: 0;
      }
      & img {
        display: none;
      }
    }
  }
`

export const BodySettings = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 30px;
`

export const Options = styled.div`
  align-self: flex-start;
  border-right: 1px solid rgba(64,75,159,0.2);
  padding-bottom: 50px;
  padding-right: 5px;
  width: 18%;
  & p {
    font-size: 14px;
    font-weight: 700;
    margin: 15px 0 5px 0;
    padding-left: 13px;
  }
  & h5 {
    font-size: 14px;
    font-weight: 700;
  }
  & .badge {
    background-color: #212754;
  } 
  & span {
    border-radius: 23px;
    display: block;
    font-size: 14px;
    margin-bottom: 3px;
    max-width: 170px;
    padding: 3px 15px;
    & img {
      margin: 0 5px 2px 0;
    }
    &.active {
      background-color: ${blue};
    }
    &:hover {
      cursor: pointer;
    }
  }
  @media (max-width: 600px) {
    align-items: top;
    border-bottom: 1px solid rgba(64,75,159,0.2);
    border-right: none;
    display: flex;
    justify-content: space-evenly;
    padding-bottom: 10px;
    width: 100%;
  }
  @media (max-width: 440px) {
    flex-wrap: wrap;
    justify-content: flex-start;
    & .options-section {
      width: 50%;
    }
  }
`

export const Switches = styled.div`
  align-self: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 70%;
  & > div {
    align-items: center;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  & .custom-control.custom-switch {
    margin-bottom: 20px;
    width: 220px;
  }
  & .custom-switch .custom-control-label {
    font-size: 15px;
  }
  & .custom-switch .custom-control-label:hover {
    cursor: pointer;
  }
  & .custom-switch .custom-control-label::before {
    background-color: ${blue};
    border: none;
  }
  & .custom-control-input:checked ~ .custom-control-label::before {
    background-color: ${green};
    border: none;
  }
  @media (max-width: 600px) {
    justify-content: space-evenly;
    margin-top: 15px;
    width: 100%;
  }
`

export const SingleSwitch = styled.div`
  align-items: center;
  background-color: #212754;
  border-radius: 20px;
  display: flex;
  margin: 0 0 20px -15px;
  padding: 5px 15px;
  width: 100%;
  & .custom-control.custom-switch {
    margin: 0;
  }
`
