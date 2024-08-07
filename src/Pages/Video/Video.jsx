import React from 'react'
import './Video.css'
import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import Recomender from '../../Components/Recomended/Recomender'
import { useParams } from 'react-router-dom'

const Video = () => {
    const {videoId,categoryId} = useParams()
  return (
    <div className='play-container'>
        <PlayVideo videoId={videoId}></PlayVideo>
        <Recomender categoryId={categoryId}></Recomender>

    </div>
  )
}

export default Video