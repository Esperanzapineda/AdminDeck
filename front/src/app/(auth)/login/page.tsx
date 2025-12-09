import React from 'react'
import LoginForm from './components/login-form'

export const metadata = {
  title: 'Login',
  description: 'Inicia sesión en tu cuenta',
};

const page = () => {
  return (
      <LoginForm/>
  )
}

export default page