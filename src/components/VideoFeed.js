import React, { useEffect, useRef } from 'react';

//composant d'affichage du flux caméra
export default function VideoFeed(props) {
    const videoEl = useRef(null)
    let setParentState = props.setParentState

    useEffect(() => {
      if (!videoEl) {
        return
      }
      navigator.mediaDevices.getUserMedia({video:true})
        .then(stream => {
            setParentState(videoEl)
            let video = videoEl.current
            video.srcObject = stream
            video.play()
        })
    }, [videoEl, setParentState])
    
    return <video ref={videoEl} />
}