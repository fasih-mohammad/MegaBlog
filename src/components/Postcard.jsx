//in the home page of blog website , we see all the previews of blogs listed on the website in the form of short post cards, that is displayed for every blog on the website, so it needs to be made a component so that it can be reused every time a new blog needs to be previewed on the home page in form of a short post card.

import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function Postcard({ $id, title, featuredImage }) {
  const previewUrl = featuredImage
    ? appwriteService.getFileUrl(featuredImage)
    : null;

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          {previewUrl ? (
            <img src={previewUrl} alt={title} className='rounded-xl' />
          ) : (
            <div className='w-full h-40 bg-gray-300 rounded-xl flex items-center justify-center'>
              <span className='text-gray-600'>No Image</span>
            </div>
          )}
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  )
}

export default Postcard
