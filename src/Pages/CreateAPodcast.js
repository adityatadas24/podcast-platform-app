import React from 'react'
import Header from '../components/Header/Header'
import CreatePodcastForm from '../components/createpodcastForm/CreatePodcastForm'

const CreateAPodcast = () => {
  return (
    <div>
      <Header/>
      <div className="input-wrapper">
        <div>
        <h1>create A podcast</h1>
            <CreatePodcastForm/>
        </div>
            
      </div>
    </div>
  )
}

export default CreateAPodcast
