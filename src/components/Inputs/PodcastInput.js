import React from 'react'

const PodcastInput = ({type,value ,setState,placeholder,name,required}) => {
  return (
    <div>
       <input
        type={type}
        value={value}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        name={name}
        className="inputs-fields"
        required={required}
      />
    </div>
  )
}

export default PodcastInput
