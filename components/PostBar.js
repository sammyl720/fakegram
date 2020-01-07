import fetch from 'isomorphic-unfetch'
const likePost = async postId => {
  const query = JSON.stringify({
    query: `mutation{
      likePost(id: "${postId}"){
        title
      }
    }`
  })
  // console.log(query)
  const result = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${window.localStorage.getItem('token')}`
    },
    body: query
  })
  const data = await result.json()
  // console.log(data)
}
const PostBar = ({ likeCount, id, likes }) => {
  // console.log(id)
  return (
    <div className='row mt-2 text-primary'>
      <div className='col-sm-3 offset-sm-3'>
        <span className='text-secondary d-flex justify-content-stretch'>
          <i
            className='material-icons'
            onClick={() => {
              likePost(id)
            }}
          >
            thumb_up
          </i>{' '}
          {likeCount > 0 && (
            <span className='badge badge-light ml-2'>
              Liked by {likes[0].name}{' '}
              {likeCount > 1 && `&amp; ${likeCount - 1} others`}
            </span>
          )}
        </span>
      </div>
      <style jsx>{`
        .material-icons {
          color: #0f4c75;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

export default PostBar
