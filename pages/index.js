import Post from '../components/Post'
import Layout from '../components/Layout'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import withApollo from '../lib/apollo'
const Index = props => {
  // console.log(`PROPS`, props)
  const router = useRouter()
  const { loading, data, error } = useQuery(props.query)
  if (loading) {
    return (
      <Layout>
        <h3 style={{ textAlign: 'center' }}>Loading</h3>
      </Layout>
    )
  }
  if (error) {
    return (
      <Layout>
        <h3 style={{ textAlign: 'center' }}>Ther was a error</h3>
        <p>{JSON.stringify(error)}</p>
      </Layout>
    )
  }
  const { posts } = data
  return (
    <Layout>
      {posts.map(post => (
        <Post key={post.id} post={post} user={post.user} />
      ))}
    </Layout>
  )
}

Index.getInitialProps = async ctx => {
  const query = gql`
    {
      posts {
        id
        title
        description
        published
        imageUrl
        datetime
        likeCount
        user {
          name
          email
          profileUrl
        }
        likes {
          id
          profileUrl
          name
        }
      }
    }
  `

  return { query }
}
export default withApollo(Index)
