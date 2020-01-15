import Layout from '../components/Layout'
import Post from '../components/Post'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import withApollo from '../lib/apollo'

const query = gql`
  {
    me {
      name
      email
      age
      id
      profileUrl
      posts {
        title
        description
        id
        imageUrl
        datetime
      }
    }
  }
`

const account = () => {
  const router = useRouter()

  const { loading, data, error } = useQuery(query, {
    onError: () => {
      router.push('/login')
    }
  })
  if (loading) {
    return (
      <Layout>
        <h3 style={{ textAlign: 'center' }}>Loading...</h3>
      </Layout>
    )
  }
  if (error) {
    return (
      <Layout>
        <h3 style={{ textAlign: 'center' }}>There was a error</h3>
        <p>{JSON.stringify(error)}</p>
        <div className='alert alert-danger' role='alert'>
          {error.message}
        </div>
      </Layout>
    )
  }

  const logout = () => {
    window.document.cookie = `token=`
    window.localStorage.removeItem('token')
    // router.push('/')
    router.reload()
  }
  const { posts } = data.me
  const user = data.me
  // console.log(data)
  return (
    <Layout>
      {data && (
        <div className='row'>
          <div className='col-sm-12 col-md-3'>
            <h1 className='mb-3'>Account Info</h1>
            <ul className='list-group'>
              <li className='list-group-item'>
                <h4 className='mb-3'>Name: {user.name}</h4>
              </li>
              <li className='list-group-item'>
                E-mail: <strong>{user.email}</strong>
              </li>
              {user.age && (
                <li className='list-group-item'>
                  Age: <strong>{user.age}</strong>
                </li>
              )}
              <li className='list-group-item'>
                <button
                  className='btn btn-dark'
                  style={{ float: 'right' }}
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
          <div className='col-sm-12 col-md-9 p-3'>
            <h3 className='title'>My posts</h3>
            {posts.map(post => {
              return <Post key={post.id} post={post} user={user} bigPic />
            })}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default withApollo(account)
