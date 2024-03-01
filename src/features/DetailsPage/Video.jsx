import React from 'react'

function Video({small,id}) {
  return (
    <iframe
      width="100%"
      height={small ? "150" : "500"}
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      allowFullScreen></iframe>
  );
}

export default Video