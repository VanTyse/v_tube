import React, {useRef, useEffect, useState} from 'react'
// import './VideoPlayer.css'

function VideoPlayer() {
  const [isPaused, setIsPaused] = useState(true)
  const [viewMode, setViewMode] = useState('normal')
  const [volume, setVolume] = useState(100)
  const [muted, setMuted] = useState(false)
  const [supportPiP, setSupportPiP] = useState(false)
  const videoRef = useRef();
  const videoContainerRef = useRef()

  useEffect(() => {
    if (videoRef.current.requestPictureInPicture){
        setSupportPiP(true)
    }
  }, [videoRef])

  useEffect(() => {
    if (volume > 0){

    }
    else if(volume > 50){

    }
    else{

    }
  }, [volume])


  useEffect(() => {
    if(viewMode === 'fullscreen'){
        if (document.fullscreenElement == null){
            videoContainerRef.current.requestFullscreen()
        }
    }

    if (viewMode === 'mini-screen'){
        console.log(videoRef.current);
        videoRef.current.requestPictureInPicture()
        videoRef.current.addEventListener('leavepictureinpicture', () => {
            setViewMode('normal')
        }, {once: true})
    }
    if (viewMode === 'normal'){
        if (document.fullscreenElement != null){
            document.exitFullscreen()
        }
        if (document.pictureInPictureElement != null){
            document.exitPictureInPicture()
        }
    }
  }, [viewMode])

  useEffect(() => {
    if (isPaused){
        
    }
    else{
        
    }
  }, [isPaused])  

  const svgStyle = {width: '24px', height: '24px'}
  
  const togglePlayPause = (e, video) => {
    e.stopPropagation()
    if (video.paused){
        video.play()
        setIsPaused(false)
    }else{
        video.pause()
        setIsPaused(true)
    }
  }

  const toggleMode = (e, modeParam) => {
    e.stopPropagation();
    switch (modeParam){
        case 'theatre-mode' :
            modeParam === viewMode ? setViewMode('normal') : setViewMode('theatre-mode')
            break;
        case 'fullscreen' :
            modeParam === viewMode ? setViewMode('normal') : setViewMode('fullscreen')
            break;
        case 'mini-screen' :
            modeParam === viewMode ? setViewMode('normal') : setViewMode('mini-screen')
            break;
    }
  }

  const toggleMute = (e, video) => {
    e.stopPropagation()
    if(muted){
        video.muted = true;
        setMuted(true)
    }
    else{
        video.muted = false
        setMuted(false)
    }
  }

  const playListener = (isPlaying) => {
    isPlaying ? setIsPaused(false) : setIsPaused(true)
  }

  const pauseListener = (paused) => {
    paused ? setIsPaused(true) : setIsPaused(false)
  }

  return (
    <div ref={videoContainerRef} 
        onClick={(e) => togglePlayPause(e, videoRef.current)} 
        className={`video-player-container ${isPaused ? 'paused' : null} 
        ${viewMode === 'theatre-mode' && 'theatre-mode'} 
        ${viewMode === 'mini-screen' && 'mini-screen'}
        ${viewMode === 'fullscreen' && 'fullscreen'}`}
    >
        <div className="video-controls-container">
            <div className="timeline-container">

            </div>
            <div className="controls">
                <button className='play-pause-btn' onClick={(e) => togglePlayPause(e, videoRef.current)}>
                    <svg style={svgStyle} viewBox="0 0 24 24" className='play-icon'>
                        <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                    </svg>
                    <svg style={svgStyle} viewBox="0 0 24 24" className='pause-icon'>
                        <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                    </svg>
                </button>
                <div className="volume-container">
                    <button className='volume-btn' onClick={(e) => toggleMute(e, videoRef.current)}>
                        <svg style={{...svgStyle, display: (volume == 0) && 'block'}} viewBox="0 0 24 24" className='volume-muted-btn'>
                            <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
                        </svg>
                        <svg style={{...svgStyle, display: (volume > 50) && 'block'}} viewBox="0 0 24 24" className='volume-high-btn'>
                            <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                        </svg>
                        <svg style={{...svgStyle, display: (volume > 0 && volume <= 50) && 'block'}} viewBox="0 0 24 24" className='volume-low-btn'>
                            <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
                        </svg>
                    </button>
                    <input type="range" min='0' max='100' value={volume} 
                    onClick={(e) => e.stopPropagation()} 
                    onChange={(e) => setVolume(e.target.value)} className='volume-input'/>
                </div>
                <button className='theatre-screen-btn' onClick={(e) => toggleMode(e, 'theatre-mode')}>
                    <svg style={svgStyle} viewBox="0 0 24 24" className='theatre-enter'>
                        <path fill="currentColor" d="M4,6V19H20V6H4M18,17H6V8H18V17Z" />
                    </svg>
                    <svg style={{height: '16px'}} viewBox="0 0 24 24" className='theatre-exit'>
                        <path fill="currentColor" d="M4,6V19H20V6H4M18,17H6V8H18V17Z" />
                    </svg>
                </button>
                {supportPiP && <button className='mini-screen-btn' onClick={(e) => toggleMode(e, 'mini-screen')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pip" viewBox="0 0 16 16">
                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5v-9zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
                        <path d="M8 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-3z"/>
                    </svg>
                </button>}
                <button className='fullscreen-btn' onClick={(e) => toggleMode(e, 'fullscreen')}>
                    <svg style={svgStyle} viewBox="0 0 24 24" className='fullscreen-exit'>
                        <path fill="currentColor" d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z" />
                    </svg>
                    <svg style={svgStyle} viewBox="0 0 24 24" className='fullscreen-enter'>
                        <path fill="currentColor" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" />
                    </svg>
                </button>
            </div>
        </div>
        <video onPlay={playListener} onPause={pauseListener} ref={videoRef} src="/assets/video.mp4" autoPlay></video>
    </div>
  )
}

export default VideoPlayer