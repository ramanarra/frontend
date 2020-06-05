import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { paths } from '../../config'

const AuthRouter = ({ component: Component, ...rest }) => {
  const isTokenGenerated = Boolean(localStorage.getItem('token'))
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isTokenGenerated) {
          return <Component {...props} />
        } else {
          return (
            <Redirect
              to={{
                pathname: paths.role,
                state: {
                    from: props.location
                }
              }}
            />
          )
        }
      }}
    />
  )
}

export default AuthRouter