import styled from 'styled-components'

export const Plan = styled.div`
  border-radius: 10px;
  text-align: center;
  padding: 2rem;
  width: 330px;
  &.premium {
    background-color: #1C225A;
    background-image: linear-gradient(315deg, #1C225A 0%, #191C34 90%);
    & h2 {
      color: #007AFF;
    }
    & .btn.cursor {
      background-color: #007AFF !important;
    }
  }
  & .title {
    margin: 0 0 1rem 0;
    width: 100%;
    & div {
      align-items: center;
      display: flex;
      height: 70px;
      justify-content: center;
      width: 100%;
    }
    & h2 {
      font-size: 30px;
      font-weight: 700;
    }
  }
  & p {
    font-size: 15px;
    font-weight: 700;
    margin: 0 0 10px 0;
    padding: 5px;
    text-align: left;
    width: 100%;
    & img {
      margin: 0 10px 0 0;
    }
  }
  & .btn {
    background-color: #BE2E51;
    border-radius: 7px;
    font-size: 15px;
    font-weight: 700;
    margin: 1rem 0 0 0;
    padding: 0.5rem 0;
    width: 100%;
  }
`

export const ContainerWithBorder = styled.div`
  border-top: 0.5px solid #2A3587;
`

export const AllCards = styled.div`
  border-top: 0.5px solid #2A3587;
  margin-top: 20px;
  padding: 20px 0 0 0;
`

export const SingleCard = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  & span {
    background-color: #165193;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1;
    padding: 2px 8px 3px 8px;
  }
`
