import styled from 'styled-components'

export const Indicator = styled.p`
  color: ${props => props.theme.main};
  font-size: 15px;
  min-width: 160px;
  width: 30%;
  & span {
    color: white;
    display: block;
    font-size: 25px;
    font-weight: 700;
    left: -14px;
    line-height: 1;
    position: relative;
    &::before {
      background-color: ${props => props.theme.main};
      border-radius: 7px;
      content: "";
      display: inline-block;
      height: 18px;
      margin-right: 5px;
      width: 9px;
    }
  }
`

export const IndicatorsDetails = styled.div`
  margin: 0 auto;
  width: 94%;
  & div {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding-left: 3%;
  }
`

export const PieChartsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 2rem 0;
`

export const IndicatorsContainer = styled.div`
  width: 50%;
  @media (max-width: 1160px) {
    width: 100%;
  }
`

export const ChartContainerPie = styled.div`
  position: relative;
  width: 40%;
  & .pieTitle {
    font-size: 30px;
    font-weight: 700;
    left: 38%;
    position: absolute;
    text-align: center;
    top: 38%;
    width: 60px;
  }
  @media (max-width: 1160px) {
    width: 100%;
    & .pieTitle {
      left: 44%;
    }
  }
  @media (max-width: 991px) {
    & .pieTitle {
      left: 46.7%;
    }
  }
  @media (max-width: 750px) {
    & .pieTitle {
      left: 45.7%;
    }
  }
  @media (max-width: 650px) {
    & .pieTitle {
      left: 45%;
    }
  }
  @media (max-width: 500px) {
    & .pieTitle {
      left: 43.5%;
    }
  }
  @media (max-width: 400px) {
    & .pieTitle {
      left: 41%;
    }
  }
`

export const PieIndicator = styled.p`
  align-items: center;
  color: ${props => props.theme.main};
  display: flex;
  justify-content: flex-start;
  margin: 0 auto 4px auto;
  width: 100%;
  & span {
    margin-right: 10px;
  }
  & .value {
    display: inline-block;
    font-size: 18px;
    font-weight: 700;
    min-width: 38px;
    width: 38px;
  }
  & .label {
    color: white;
    font-size: 15px;
  }
  & .percentage {
    color: white;
    font-size: 18px;
    font-weight: 700;
    min-width: 71px;
    width: 120px;
   
    display: flex;
    &::before {
      background-color: ${props => props.theme.main};
      border-radius: 7px;
      content: "";
      display: inline-block;
      height: 16px;
      margin-right: 4px;
      position: relative;
      top: 1px;
      width: 9px;
    }
  }
  @media (max-width: 1160px) {
    max-width: 300px;
  }
`

// Report Modal
const filterGray = '#BBBBBB'
export const Form = styled.form`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 0.5rem 2rem 0 0;
  & div {
    display: inline-block;
    position: relative;
  }
  & .close-filtering {
    left: 7px;
    position: absolute;
    top: 8px;
  }
  & button {
    align-items: center;
    background-color: ${filterGray};
    border: none;
    border-radius: 50%;
    display: flex;
    height: 30px;
    justify-content: center;
    width: 30px;
    z-index: 20;
  }
  & input {
    background-color: #F2F2F2;
    border: none;
    border-radius: 20px;
    color: #505050;
    height: 30px;
    margin: 0 -25px 0 0;
    padding: 0 2rem 0 1.5rem;
    z-index: 10;
  }
  @media(max-width: 640px){
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-left: 1rem;
    position: relative;
    width: 100%;
    & > div {
      padding-left: 0 !important;
    }
    & .link-download {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
  @media(max-width: 440px){
    & .link-download {
      top: -28px;
    }
  }
`

export const CardContainer = styled.div`
  border-radius: 8px;
  color: ${props => props.theme.main};
  padding: 5px 10px;
  & button {
    background-color: ${props => props.theme.main};
    border-color: ${props => props.theme.main};
    &:active {
      background-color: darken(${props => props.theme.main}, 20) !important;
      border-color: darken(${props => props.theme.main}, 20) !important;
    }
    &:focus{
      box-shadow: unset !important;
    }
  }
`
