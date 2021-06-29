import styled from 'styled-components'

export const ProfilePhoto = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  & div.cont {
    margin-top: -60px;
    position: relative;
    width: 90px;
    & span {
      align-items: center;
      background-color: #007AFF;
      border: none;
      border-radius: 50%;
      bottom: 0;
      display: flex;
      height: 25px;
      justify-content: center;
      position: absolute;
      right: 0;
      width: 25px;
    }
  }
  & .photo {
    height: 90px;
    width: 90px;
  }
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

export const AllCards = styled.div`
  border-top: 0.5px solid #2A3587;
  margin-top: 20px;
  padding: 20px 0 0 0;
`

export const SelectPhoto = styled.div`
  height: 200px;
  margin: 0 auto 10px auto;
  width: 200px;
  & .pending {
    border: 2px dashed #505050;
    border-radius: 50%;
    height: 100%;
    width: 100%;
  }
  & .photo {
    height: 100%;
    width: 100%;
  }
`
