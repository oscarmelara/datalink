import styled from 'styled-components'

export const CardDL = styled.div`
  background-color: #212754;  
  border-radius: 12px;
`

export const CircleIcon = styled.span`
  align-items: center;
  background-color: #212754;
  border-radius: 50%;
  display: flex;
  height: 30px;
  justify-content: center;
  width: 30px;
  & svg {
    color: #1EDB83;
  }
  &:hover {
    cursor: pointer;
  }
`

export const CardsContainer = styled.section`
  align-items: flex-start;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  @media (max-width: 768px) {
    align-items: center;
    flex-direction: column-reverse;
    justify-content: center;
    & .v-line {
      height: 1px;
      margin: 0 0 1rem 0;
      max-width: 330px;
      width: 100%;
    }
  }
`
