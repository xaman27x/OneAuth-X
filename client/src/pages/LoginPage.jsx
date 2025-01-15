import React from 'react'
import Header from '../components/Headers/Header'
import AuthForm from '../components/AuthForm'

const LoginPage = () => {
  return (
    <>
    <Header isRoot={true}/>
    <AuthForm />
    </>
  )
}

export default LoginPage;