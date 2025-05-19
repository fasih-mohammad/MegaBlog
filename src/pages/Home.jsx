import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, Postcard } from '../components';
import { useLocation } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await appwriteService.getPosts();
        if (posts) setPosts(posts.documents);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);  // ✅ Just on mount


  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
  <div className='w-full py-8'>
    <Container>
      <div className='flex flex-wrap'>
        {posts.map((post) => {
          return (
            <div key={post.$id} className='p-2 w-1/4'>
              <Postcard
                key={post.$id}
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage} // ✅ double check this field exists
              />
            </div>
          );
        })}
      </div>
    </Container>
  </div>
  )}

  export default Home;
