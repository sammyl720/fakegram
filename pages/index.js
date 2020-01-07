import fetch from 'isomorphic-unfetch'
import Post from '../components/Post'
import Layout from '../components/Layout'
const Index = ({ data: { posts } }) => {
  return (
    <Layout>
      {posts.map(post => (
        <Post key={post.id} post={post} user={post.user} />
      ))}
    </Layout>
  )
}

Index.getInitialProps = async () => {
  const query = `
    {
      posts {
        id
        title
        description
        published
        imageUrl
        datetime
        likeCount
        user{
          name
          email
          profileUrl
        }
        likes{
          id
          profileUrl
          name
        }
      }
    }
  `
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  }
  const res = await fetch('http://127.0.0.1:3000/graphql', options)
  const { data } = await res.json()
  // console.log(data.posts)
  return { data }
}
export default Index
