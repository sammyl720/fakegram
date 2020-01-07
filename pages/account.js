import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'
import Post from '../components/Post'
const account = props => {
  const user = props.data.me
  const { posts } = props.data.me
  return (
    <Layout>
      {props.errors && (
        <div className='alert alert-danger' role='alert'>
          {props.errors[0].message}
        </div>
      )}
      {props.data && (
        <div className='row'>
          <div className='col-sm-3'>
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
            </ul>
          </div>
          <div className='col-sm-9 p-3'>
            <h3 className='title'>My posts</h3>
            {posts.map(post => {
              return <Post key={post.id} post={post} bigPic />
            })}
          </div>
        </div>
      )}
    </Layout>
  )
}

account.getInitialProps = async ctx => {
  let authorization
  if (!ctx.req) {
    const token = window.localStorage.getItem('token')
    authorization = `Bearer ${token}`
  } else {
    authorization = ctx.req.headers['authorization']
  }
  if (!authorization) {
    return {
      errors: [
        {
          message: 'unauthorized'
        }
      ]
    }
  }
  const query = `
  {
    me{
      name
      email
      age
      id
      profileUrl
      posts{
        title
        description
        id
        imageUrl
        datetime
      }
    }
  }
  `
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization
    },
    body: JSON.stringify({ query })
  }
  const res = await fetch('http://127.0.0.1:3000/graphql', options)
  const { data } = await res.json()
  // console.log(data.posts)
  return { data }
}

export default account
