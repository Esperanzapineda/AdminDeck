import React from 'react'
import RegisterForm from './components/register-form';


export const metadata = {
    title: 'Registro',
    description: 'Crea tu cuenta',
};

const page: React.FC = () => {
  return (
    <RegisterForm/>
  )
}

export default page