import styled from 'styled-components'

const gray = '#C2C2C2'

export const SectionBlue = styled.section`
  align-items: center;
  background-color: #0D0F23;
  background-image: linear-gradient(140deg, #0D0F23 50%, #1A205A 98%);
  display: flex;
  min-height: 100vh;
  justify-content: flex-start;
  overflow: hidden;
  position: relative;
`

export const CardPassword = styled.div`
  background-color: #212754;
  border-radius: 12px;
  min-width: 320px;
  width: 320px;
  z-index: 100;
  & p, & input, & button {
    width: 85%;
  }
  & p {
    color: #404B9F;
    text-align: center;
  }
  & input {
    border: none;
    border-radius: 8px;
    margin-bottom: 20px;
    padding: 10px;
    &::placeholder {
      color: ${gray};
    }
  }
`

export const Card = styled.div`
  background-color: #212754;  
  border-radius: 12px;
  margin-bottom: 15px !important;
  min-width: 320px;
  width: 320px;
  z-index: 100;
  & form {
    & label {
      font-size: 12px;
    }
    & a {
      font-size: 15px;
    }
    & > input, & button {
      width: 96%;
    }
    & > input {
      border: none;
      border-radius: 8px;
      margin-bottom: 20px;
      padding: 10px;
      &::placeholder {
        color: ${gray};
      }
    }
  }
`

export const WelcomeText = styled.div`
  position: relative;
  max-width: 600px;
  width: 96%;
  z-index: 100;
  & h1 {
    font-size: 30px;
  }
  & h2, & p {
    font-size: 20px;
  }
  & p a {
    
  }
`

export const BigCard = styled(Card)`
  min-width: 320px;
  width: 425px;
  & > p {
    color: #404B9F;
    text-align: center;
    width: 90%;
  }
`
