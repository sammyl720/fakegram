import Moment from 'react-moment'
import PostBar from './PostBar'
const Post = ({ post, ...props }) => {
  // console.log(`Time: ${post.datetime}`)
  // console.log(post, props)
  return (
    <div className='row m-3 size bg-light text-dark shadow p-4'>
      {post.user && (
        <div className='col-sm-12 p-2'>
          <div className='row'>
            <div className='col-sm-1'>
              <div className='profile-img' />
            </div>
            <div className='col-sm-2'>
              <h3>{post.user.name}</h3>
            </div>
          </div>
        </div>
      )}
      {post.imageUrl && (
        <div className={`col-sm-${props.bigPic ? '5' : '3'} image`}> </div>
      )}
      <div className={`col-sm-${props.bigPic ? '7' : '9'}`}>
        <div className='row'>
          <div className='col-sm-3 offset-sm-9'>
            <small className='float-right'>
              <Moment fromNow unix>
                {post.datetime / 1000}
              </Moment>
            </small>
          </div>
        </div>
        <h1>{post.title}</h1>
        {post.description && <div>{post.description}</div>}
      </div>
      {!props.bigPic && (
        <div className='col-sm-12'>
          <PostBar likeCount={post.likeCount} id={post.id} likes={post.likes} />
        </div>
      )}
      <style jsx>{`

        .image{
          min-height:200px;
          background-image: url('${post.imageUrl}');
          background-size:cover;
          background-position:center;
        }
        .profile-img{
          background-image: url('${props.user.profileUrl ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'}');
          background-size:cover;
          width:50px;
          height:50px;
          float:left;
          background-position:center;
          clip-path: circle(50% at 50% 50%);
        }
      `}</style>
    </div>
  )
}

export default Post
