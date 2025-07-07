import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Settings, Download, Link, DownloadIcon } from 'lucide-react';
import { Button } from './ui/button';

const VideoPlayer = ({ 
  src = "https://s3.roshanjoo.ir/razmara-razmara/info36.mp4?AWSAccessKeyId=c7PtzaFbeH5Zjn9WIkmU&Signature=ITlbuzV%2BAGdNSW20UUHektyI7LA%3D&Expires=2066828084",
  title = "ویدئو استریم",
  autoPlay = false,
  className = ""
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const container = videoRef.current.parentElement;
    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
    videoRef.current.playbackRate = rate;
    setShowSettings(false);
  };

  const restart = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl ${className}`}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-2">
        <h3 className="text-white text-sm font-semibold truncate">{title}</h3>
      </div>

      {/* Video Container */}
      <div 
        className="relative w-full h-full group"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          autoPlay={autoPlay}
          onClick={togglePlay}
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Play Button Overlay */}
        {!isPlaying && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <button
              onClick={togglePlay}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
            >
              <Play className="w-4 h-4 text-white ml-0.5" />
            </button>
          </div>
        )}

        {/* Controls */}
        <div dir='ltr' className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {/* Progress Bar */}
          <div 
            className="w-full bg-white/20 rounded-full h-1 mb-2 cursor-pointer hover:h-1.5 transition-all duration-200"
            onClick={handleSeek}
          >
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full relative"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={togglePlay}
                className="text-white hover:text-blue-400 transition-colors p-1 hover:bg-white/10 rounded-full"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={restart}
                className="text-white hover:text-blue-400 transition-colors p-1 hover:bg-white/10 rounded-full"
              >
                <RotateCcw className="w-3 h-3" />
              </button>

              <div className="flex items-center space-x-1">
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-blue-400 transition-colors p-1 hover:bg-white/10 rounded-full"
                >
                  {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-12 accent-blue-500"
                />
              </div>

              <span className="text-white text-xs font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <a
              href={src}
              download
              className='cursor-pointer text-white hover:text-blue-400 transition-colors p-1 hover:bg-white/10 rounded-full'
              >
                <DownloadIcon className='h-4 w-4' />
              </a>
            </div>

            <div className="flex items-center space-x-1">
              {/* Settings */}
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-blue-400 transition-colors p-1 hover:bg-white/10 rounded-full"
                >
                  <Settings className="w-3 h-3" />
                </button>
                
                {showSettings && (
                  <div className="absolute bottom-8 right-0 bg-black/90 backdrop-blur-sm rounded-lg p-2 min-w-24">
                    <div className="text-white text-xs mb-1">سرعت پخش</div>
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => handlePlaybackRateChange(rate)}
                        className={`block w-full text-left px-1 py-0.5 text-xs rounded hover:bg-white/10 transition-colors ${
                          playbackRate === rate ? 'text-blue-400' : 'text-white'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-blue-400 transition-colors p-1 hover:bg-white/10 rounded-full"
              >
                <Maximize className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      {/* <div dir='ltr' className="bg-gradient-to-r from-gray-900 to-gray-800 px-2 py-1">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="px-1.5 py-0.5 bg-green-500 text-white rounded-full text-xs">
              استریم آنلاین
            </span>
            <span className="text-gray-300">
              کیفیت: HD
            </span>
          </div>
          <div className="text-gray-400">
            {playbackRate !== 1 && `سرعت: ${playbackRate}x`}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default VideoPlayer;