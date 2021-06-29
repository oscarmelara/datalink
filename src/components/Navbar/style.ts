import styled from 'styled-components'

export const UserInfo = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  & img {
    height: 40px;
    width: 40px;
  }
  & .photo {
    height: 40px;
    width: 40px;
  }
  & p.info {
    & span {
      display: block;
    }
  }
`
export const NavContainer = styled.div`
  display: block;
  padding-bottom: 100px;
  width: 100%;
  & nav {
    padding: 0.5rem;
  }
  @media (max-width: 400px) {
    & nav {
      margin: 0 auto;
      max-width: 350px;
    }
  }
`

const red = '#BE2E51'
export const Trial = styled.span`
  background-color: ${red};
  border: none;
  border-radius: 8px;
  color: white !important;
  font-size: 11px !important;
  margin: 0 0 0 5px;
  padding: 0px 5px;
  position: absolute;
  right: 0;
  top: 5px;
`

export const End = styled.div`
  background-color: ${red};
  color: white !important;
  font-size: 13px !important;
  font-weight: 600;
  margin: -30px 0 0 0;
  padding: 7px 0;
  text-align: center;
  width: 100%;
`

