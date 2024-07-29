import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useConfig } from 'payload/components/utilities'

import './index.scss'

const baseClass = 'redeploy-button'

const RedeployButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    routes: { api },
  } = useConfig()

  const redeployCMS = async () => {
    setIsLoading(true)
    const res = await fetch(`${api}/redeploy/website`, {
      method: 'POST',
    })
    if (res.ok) {
      toast.success('Redeploy triggered successfully!', { autoClose: 3000 })
      setIsLoading(false)
    } else {
      const data = await res.json()
      toast.error(data.message, { autoClose: 3000 })
      setIsLoading(false)
    }
  }

  return (
    <button className={baseClass} onClick={redeployCMS} disabled={isLoading}>
      {isLoading ? 'Redeploy triggered...' : 'Redeploy Website'}
    </button>
  )
}

export default RedeployButton
