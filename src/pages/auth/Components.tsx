import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import icApple from '../../assets/images/icons/ic_apple.svg'
import icGoogle from '../../assets/images/icons/ic_google.svg'
import icOutlook from '../../assets/images/icons/ic_outlook.svg'
import { WelcomeText } from './style'

interface IText {
  extra: string
}

export const Text: React.FC<IText> = ({ extra, children }) => {
  return (<WelcomeText className="text-center text-lg-left pl-0 pl-lg-5 ml-0 ml-lg-5 px-2">
    <h1 className="fwb tc-white mb-4">Connect and automate workflows</h1>
    <h2 className="tc-white mb-4">
      We know ConnectWise. We know Infusionsoft. With our included onboarding process,
      we'll get your integration running quickly and easily.
      </h2>
    <p className="fwb tc-white">
      {extra} {children}
    </p>
  </WelcomeText>)
}

export const Social: React.FC = () => {
  return (<Container className="mt-4 text-center">
    <Link to="/"><img src={icOutlook} className="mx-2" alt="Outlook" /></Link>
    <Link to="/"><img src={icGoogle} className="mx-2" alt="Google" /></Link>
    <Link to="/"><img src={icApple} className="mx-2" alt="Apple" /></Link>
  </Container>)
}

export const TermsAndConditions: React.FC = () => {
  return (<>
    <p className="fwb">
      The Intellectual Property disclosure will inform users that the contents, logo and other
      visual media you created is your property and is protected by copyright laws.
    </p>
    <ol className="pl-3">
      <li>
        A Termination clause will inform that users’ accounts on your website and mobile app
        or users’ access to your website and mobile (if users can’t have an account with you) can
        be terminated in case of abuses or at your sole discretion.
      </li>
      <li>
        A Governing Law will inform users which laws govern the agreement. This should the
        country in which your company is headquartered or the country from which you operate your
        website and mobile app.
      </li>
      <li>
        A Links To Other Web Sites clause will inform users that you are not responsible for
        any third party websites that you link to. This kind of clause will generally inform
        users that they are responsible for reading and agreeing (or disagreeing) with the Terms
        and Conditions or Privacy Policies of these third parties. If your website or mobile
        app allows users to create content and make that content public to other users, a Content
        section will inform users that they own the rights to the content they have created.
        The “Content” clause usually mentions that users must give you (the website or mobile app
        developer) a license so that you can share this content on your website/mobile app and to
        make it available to other users. Because the content created by users is public to other
        users, a DMCA notice clause (or Copyright Infringement ) section is helpful to inform
        users and copyright authors that, if any content is found to be a copyright infringement,
        you will respond to any DMCA takedown notices received and you will take down the content.
        A Limit What Users Can Do clause can inform users that by agreeing to use your service,
        they’re also agreeing to not do certain things. This can be part of a very long and
        thorough list in your Terms and Conditions agreements so as to encompass the most
        amount of negative uses.
      </li>
    </ol>
  </>)
}
