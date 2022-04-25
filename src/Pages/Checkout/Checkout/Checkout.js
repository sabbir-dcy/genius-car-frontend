import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSericeDetail } from '../../../hooks/useServiceDetail'
import { useAuthState } from 'react-firebase-hooks/auth'
import auth from '../../../firebase.init'
import axios from 'axios'
import { toast } from 'react-toastify'

const Checkout = () => {
  const { serviceId } = useParams()
  const [service] = useSericeDetail(serviceId)
  const [user] = useAuthState(auth)

  /* const [user, setUser] = useState({
    name: 'jack sparrow',
    email: 'jack@pirates.net',
    address: 'open ocean',
    phone: '0171111111',
  }) */

  /* const handleAddressChange = (e) => {
    setUser({ ...user, address: e.target.value })
  } */

  //   console.log(user)

  const handlePlaceOrder = (event) => {
    event.preventDefault()
    const order = {
      email: user.email,
      service: service.name,
      serviceId: serviceId,
      address: event.target.address.value,
      phone: event.target.phone.value,
    }

    axios.post('http://localhost:5000/orders', order).then((res) => {
      const {data} = res
      if (data.insertedId) {
          toast('your order is booked!')
          event.target.reset()
      }
    })
  }

  return (
    <div className='w-50 mx-auto text-center'>
      <h2>Please Order: {service.name}</h2>
      <form
        onSubmit={handlePlaceOrder}
        className='w-100 d-flex flex-column mt-5 mx-auto border p-3'
      >
        <input
          type='text'
          name='name'
          value={user?.displayName}
          placeholder='enter name'
          required
          className='border p-2 rounded'
          readOnly
          disabled
        />
        <br />
        <input
          type='email'
          name='email'
          value={user?.email}
          placeholder='enter email'
          required
          className='border p-2 rounded'
          readOnly
          disabled
        />
        <br />
        <input
          type='text'
          name='service'
          value={service.name}
          placeholder='enter service'
          required
          className='border p-2 rounded'
        />
        <br />
        <input
          type='text'
          name='address'
          value={user.address}
          placeholder='enter address'
          required
          className='border p-2 rounded'
          autoComplete='off'
        />
        <br />
        <input
          type='text'
          name='phone'
          value={user.phone}
          placeholder='enter phone'
          required
          className='border p-2 rounded'
          autoComplete='off'
        />
        <br />
        <input type='submit' value='order' className='btn btn-primary' />
      </form>
    </div>
  )
}

export default Checkout
