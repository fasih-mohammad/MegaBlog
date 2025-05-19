import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Postcard, Container } from '../components'
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'  // ✅ Correct import

function AllPosts() {
  const [posts, setPosts] = useState([])
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    if (userData) {
      appwriteService
        .getPosts([Query.equal('userId', userData.$id)]) // ✅ Use Query here
        .then((userPosts) => {
          if (userPosts) {
            setPosts(userPosts.documents)
          }
        })
    }
  }, [userData])

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <Postcard
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
              />
            </div>
          ))}
        </div>
        {posts.length === 0 && (
          <p className='text-center text-gray-500 mt-6'>No posts found.</p>
        )}
      </Container>
    </div>
  )
}

export default AllPosts
