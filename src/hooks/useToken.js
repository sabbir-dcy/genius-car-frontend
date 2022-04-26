
import axios from 'axios'
import { useEffect, useState } from 'react'

const useToken = (user) => {
  const [token, setToken] = useState('')
  useEffect(() => {
    const getToken = async (arg) => {
      const email = user?.user?.email
      if (email) {
        const { data } = await axios.post(
          'https://limitless-fortress-61012.herokuapp.com/login',
          { email }
        )
        setToken(data.accessToken)
        localStorage.setItem('accessToken', data.accessToken)
      }
    }
    getToken()
  }, [user])
  return [token]
}

export default useToken
