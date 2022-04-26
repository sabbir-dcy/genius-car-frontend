import { useEffect, useState } from 'react'

const useServices = () => {
  const [services, setServices] = useState([])

  useEffect(() => {
    fetch('https://limitless-fortress-61012.herokuapp.com/service')
      .then((res) => res.json())
      .then((data) => setServices(data))
  }, [])
  return [services, setServices]
}

export default useServices
