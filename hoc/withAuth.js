import React from 'react'
import Router from 'next/router'

const withAuth = (WrappedComponent) => {
  return function (props) {
    const user = localStorage.getItem('user')
    if (!user) {
      Router.push('/login')
    }
    return <WrappedComponent {...props} />
  }
}

export default withAuth
