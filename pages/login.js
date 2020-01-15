import Layout from '../components/Layout'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import { useState } from 'react'
import withApollo from '../lib/apollo'

const query = gql`
  mutation LOGIN($creds: LoginUserInput!) {
    loginUser(data: $creds) {
      token
      user {
        id
      }
    }
  }
`

const Login = ({ authorization }) => {
  const router = useRouter()
  const [creds, setCreds] = useState({
    email: '',
    password: ''
  })

  const [login] = useMutation(query, {
    variables: {
      creds
    },
    onCompleted: data => {
      // console.log('TOKEN from server', data)
      window.localStorage.setItem('token', data.loginUser.token)
      router.push('/account')
    }
  })
  // console.log(authorization)
  const handleChange = e => {
    // console.log(e.target.name, e.target.value)
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    login()
  }
  return (
    <Layout>
      <h1>LOGIN</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div className='form-group'>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            name='email'
            value={creds.email}
            className='form-control'
            id='email'
            aria-describedby='emailHelp'
            onChange={e => handleChange(e)}
            required
          />
          <small id='emailHelp' className='form-text text-muted'>
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            autoComplete='current-password'
            className='form-control'
            value={creds.password}
            id='exampleInputPassword1'
            name='password'
            onChange={e => handleChange(e)}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </Layout>
  )
}

const Authorize = creds => {
  useMutation(query, {
    variables: {
      creds
    },
    onCompleted: data => {
      console.log('TOKEN from server', data)
    }
  })
  return (
    <Layout>
      <h1>LOGIN</h1>
      <h3>Loading ...</h3>
    </Layout>
  )
}

Login.getInitialProps = async ctx => {
  let authorization
  if (!ctx.req) {
    const token = window.localStorage.getItem('token')
    if (token) {
      authorization = `Bearer ${token}`
    }
  } else {
    if (ctx.req.headers['authorization']) {
      authorization = ctx.req.headers['authorization']
    }
  }
  if (!authorization) {
    return {
      authorization: null
    }
  }
  return { authorization }
}

export default withApollo(Login)
