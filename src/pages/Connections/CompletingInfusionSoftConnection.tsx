import React, { useState } from 'react'
import axios from 'axios'
import queryString from 'query-string'
import { useLocation, useHistory, useParams } from 'react-router'

export const CompletingInfusionSoftConnection: React.FC = () => {
  const [error, setError] = useState(false)
  const location = useLocation()
  const history = useHistory()
  const { userId } = useParams()
  const params = queryString.parse(location.search)

  if (!params.code || !params.scope) {
    history.push('/dashboard')
  } else {
    axios
      .post('infusionSoftLinks', {
        access_token: params.code,
        scope: params.scope,
        clientId: userId,
      })
      .then(() => history.push('/dashboard'))
      .catch(() => {
        setError(true)
      })
  }
  if (error) {
    return (<h2 className="text-center">
      There was an error completing<br />the connection process
    </h2>)
  } else {
    return (<h2 className="text-center">
      Completing connection<br />please wait a moment
    </h2>)
  }
}
