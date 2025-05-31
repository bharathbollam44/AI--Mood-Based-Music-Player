import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as faceapi from 'face-api.js';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import './style.css';

const songs = {

  happy: [
    { title: 'Godari Gattu Meedha', artist: 'Madhu Priya', album: 'Sankranthiki Vasthunnam', duration: '4:09', url: 'songs/happy/Godari.mp3', cover: 'songs/happy/Sankranthiki-album.jpg' },
    { title: 'Cheppave Chirugali', artist: 'Udit Narayan', album: 'Okkadu', duration: '5:32', url: 'songs/happy/Cheppave Chirugali.mp3', cover: 'songs/happy/okkadu-album.jpg' },
    { title: 'Ghal Ghal', artist: 'S.P Balasubramanyam', album: 'Nuvvosthanante Nenodhantana', duration: '5:21', url: 'songs/happy/Ghal Ghal.mp3', cover: 'songs/happy/nn-album.jpg' },
    { title: 'Cheliya Cheliya', artist: 'Harini', album: 'Kushi', duration: '5:41', url: 'songs/happy/Cheliya Cheliya.mp3', cover: 'songs/happy/kushi-album.jpg' },
    { title: 'Inka Edho', artist: 'G.V Prakash', album: 'Darling', duration: '5:16', url: 'songs/happy/Inka Edo.mp3', cover: 'songs/happy/darling-album.jpg' },
    { title: 'Inthandham', artist: 'S.P Charan', album: 'Seetharamam', duration: '3:36', url: 'songs/happy/Inthandham.mp3', cover: 'songs/happy/seetharamam-album.jpg' },
    { title: 'Nenu Nuvvantu', artist: 'Nadeesh', album: 'Orange', duration: '4:49', url: 'songs/happy/Nenu Nuvvantu.mp3', cover: 'songs/happy/orange-album.jpg' },
    { title: 'Pushpa Pushpa', artist: 'D.S.P', album: 'Pushpa', duration: '4:19', url: 'songs/happy/Pushpa Pushpa.mp3', cover: 'songs/happy/pushpa-album.jpg' },
  ],


  sad: [
    { title: 'Emai Poyave', artist: 'Sid Sriram', album: 'Padi Padi Leche Manasu', duration: '4:45', url: 'songs/sad/Emai Poyave.mp3', cover: 'songs/sad/padi padi-album.jpg' },
    { title: 'Evaro Evaro', artist: 'Karthik', album: 'Brothers', duration: '4:23', url: 'songs/sad/Evaro Evaro.mp3', cover: 'songs/sad/brothers-album.avif' },
    { title: 'Jabilli Kosam', artist: 'S.P Balasubramanyam', album: 'Manchi Manasulu', duration: '2:05', url: 'songs/sad/Jabilli kosam.mp3', cover: 'songs/sad/manchi manasulu-album.jpg' },
    { title: 'Kabira', artist: 'Harshdeep Kaur', album: 'Yeh Jawani Hai Diwani', duration: '4:23', url: 'songs/sad/Kabira.mp3', cover: 'songs/sad/do-patthi-album.jpg' },
    { title: 'Mari Anthaga', artist: 'Sreeram Chandra', album: 'Seethamma Vaakitlo Sirimalle Chettu', duration: '2:05', url: 'songs/sad/Mari Antaga.mp3', cover: 'songs/sad/seethamma-album.jpg' },
    { title: 'Neeti Mullai', artist: 'Sumangali', album: 'Varsham', duration: '4:23', url: 'songs/sad/Neeti Mullai.mp3', cover: 'songs/sad/varsham-album.jpg' },
    { title: 'Raanjhan', artist: 'Parampara Thakur', album: 'Do Patthi', duration: '2:05', url: 'songs/sad/Raanjhan.mp3', cover: 'songs/sad/yeh-jawani-album.jpg' },
    { title: 'Teliseney Na Nuvve', artist: 'Revanth', album: 'Arjun Reddy', duration: '4:23', url: 'songs/sad/Telisiney Na Nuvve.mp3', cover: 'songs/sad/arjun-reddy-album.jpg' },
    { title: 'The Life of Ram', artist: 'Pradeep Kumar', album: 'Jaanu', duration: '2:05', url: 'songs/sad/The Life of Ram.mp3', cover: 'songs/sad/jaanu-album.jpg' }
  ],


  angry: [
    { title: 'Fear', artist: 'Anirudh Ravinchandhar', album: 'Devara', duration: '2:46', url: 'songs/angry/Fear.mp3', cover: 'songs/angry/devara-album.jpg' },

    { title: 'Jagadame', artist: 'Kunal Ganjawala', album: 'Pokiri', duration: '3:09', url: 'songs/angry/Jagadame.mp3', cover:'songs/angry/pokiri-album.jpg' },

    { title: 'Bulls on Parade', artist: 'Rage Against the Machine', album: 'Evil Empire', duration: '3:51', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', cover: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
  ],


  neutral: [
    { title: 'Ee Raathale', artist: 'Yuvan Shankar Raja', album: 'Radhe Shyam', duration: '3:58', url: 'songs/neutral/Ee Raathale.mp3', cover: 'songs/neutral/radhe-shyam-album.jpg' },

    { title: 'Em Sandheham Ledhu', artist: 'Kalyani Malik', album: 'Oohalu Gusa Gusalade', duration: '3:52', url: 'songs/neutral/Em Sandheham Ledhu.mp3', cover: 'songs/neutral/oohalu.jpg' },

    { title: 'Inkem Inkem Inkem', artist: 'Sid Sriram', album: 'Geetha Govindam', duration: '4:26', url: 'songs/neutral/Inkem Inkem Inkem.mp3', cover: 'songs/neutral/geetha-govindham-album.jpg' },

    { title: 'Kammani Ee Prema', artist: 'S.P Balasubramanyam', album: 'Guna', duration: '4:26', url: 'songs/neutral/Kammani Ee Premalekhani.mp3', cover: 'songs/neutral/guna-album.jpg' },

    { title: 'Maate Vinadhuga', artist: 'Sid Sriram', album: 'Taxiwala', duration: '4:35', url: 'songs/neutral/Maate Vinadhuga.mp3', cover: 'songs/neutral/taxiwala-album.jpg' },

    { title: 'Samajavaragamana', artist: 'Sid Sriram', album: 'Ala VaikunraPuram Lo', duration: '4:35', url: 'songs/neutral/Samajavaragamana.mp3', cover: 'songs/neutral/ala vaikunta puram-album.jpg' },

    { title: 'Tharagathi Gadhi', artist: 'Kaala Bhairava', album: 'Color Photo', duration: '3:33', url: 'songs/neutral/Tharagathi Gadhi.mp3', cover: 'songs/neutral/color-photo-album.jpg' },
  ]
};


const MusicPlayer = () => {
  const videoRef = useRef(null);
  const moodDisplayRef = useRef(null);
  const detectionPhaseRef = useRef(null);
  const playerPhaseRef = useRef(null);
  const moodTagRef = useRef(null);
  const playlistRef = useRef(null);
  const togglePlayRef = useRef(null);
  const prevTrackRef = useRef(null);
  const nextTrackRef = useRef(null);
  const volumeSliderRef = useRef(null);
  const currentTimeRef = useRef(null);
  const durationRef = useRef(null);
  const progressFilledRef = useRef(null);
  const progressRef = useRef(null);
  const isDraggingRef = useRef(false);
  const muteButtonRef = useRef(null);

  // State variables for React to re-render UI elements
  const [currentMood, setCurrentMood] = useState('neutral');
  const [moodDetected, setMoodDetected] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [audio] = useState(new Audio());
  const [isMuted, setIsMuted] = useState(false);
  const [originalVolume, setOriginalVolume] = useState(1);

  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);

  // State for loading animations
  const [modelsLoading, setModelsLoading] = useState(true);
  const [transitioningToPlayer, setTransitioningToPlayer] = useState(false);

  // Refs for variables that don't need to trigger re-renders
  const moodDetectionCount = useRef(0);
  const lastDetectedMood = useRef(null);
  const detectionIntervalId = useRef(null);
  const requiredDetections = 5;

  // Utility function for formatting time
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Function to get mood from expressions
  const getMoodFromExpressions = (expressions) => {
    const maxExpression = Object.entries(expressions)
      .reduce((max, [expression, value]) =>
        value > max.value ? { expression, value } : max,
        { expression: 'neutral', value: 0 }
      );
    if (maxExpression.value > 0.4) {
        switch (maxExpression.expression) {
            case 'happy': return 'happy';
            case 'sad': return 'sad';
            case 'angry': return 'angry';
            case 'neutral': return 'neutral';
            default: return 'neutral';
        }
    }
    return 'neutral';
  };

  // Function to update player UI elements (memoized with useCallback)
  const updatePlayerUI = useCallback(() => {
    if (moodTagRef.current) {
      // Mood-specific class is now applied directly in JSX, no need to update text here
    }
  }, [currentMood]);

  // Function to filter songs based on search query
  const filterSongs = useCallback(() => {
    const currentMoodSongs = songs[currentMood] || [];
    if (!searchQuery) {
      setFilteredSongs(currentMoodSongs);
      return;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    const results = currentMoodSongs.filter(song =>
      song.title.toLowerCase().includes(lowerCaseQuery) ||
      song.artist.toLowerCase().includes(lowerCaseQuery) ||
      song.album.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredSongs(results);
  }, [currentMood, searchQuery]);


  // Function to render the playlist dynamically (memoized with useCallback)
  const renderPlaylist = useCallback(() => {
    if (!playlistRef.current) return;

    const songsToDisplay = filteredSongs.length > 0 || searchQuery ? filteredSongs : songs[currentMood];

    if (songsToDisplay.length === 0 && searchQuery) {
      playlistRef.current.innerHTML = `
        <div class="playlist-message">No songs found matching "${searchQuery}" in ${currentMood} mood.</div>
      `;
      return;
    } else if (songsToDisplay.length === 0 && !searchQuery && moodDetected) {
        playlistRef.current.innerHTML = `
            <div class="playlist-message">No songs available for ${currentMood} mood.</div>
        `;
        return;
    }

    playlistRef.current.innerHTML = songsToDisplay.map((song) => {
        const originalSongList = songs[currentMood] || [];
        const originalIndex = originalSongList.findIndex(s => s.title === song.title && s.artist === song.artist);
        const isActive = originalIndex === currentSongIndex ? 'active' : '';

        return `
            <div class="playlist-item ${isActive}" data-original-index="${originalIndex}">
                <img src="${song.cover}" alt="${song.title}" />
                <div class="song-details">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}, ${song.album}</div> 
                </div>
                <div class="song-duration">${song.duration}</div>
            </div>
        `;
    }).join('');

    playlistRef.current.querySelectorAll('.playlist-item').forEach(item => {
      item.onclick = () => {
        const clickedOriginalIndex = parseInt(item.dataset.originalIndex);
        if (!isNaN(clickedOriginalIndex) && clickedOriginalIndex !== -1) {
          setCurrentSongIndex(clickedOriginalIndex);
        }
      };
    });
  }, [currentMood, currentSongIndex, filteredSongs, searchQuery, moodDetected]);


  // Function to play a song (memoized with useCallback)
  const playSong = useCallback(() => {
    const song = songs[currentMood][currentSongIndex];
    if (song) {
      audio.src = song.url;
      audio.play().catch(e => console.error("Error playing audio:", e));
      setIsPlaying(true);
    }
  }, [currentMood, currentSongIndex, audio]);

  // Function to switch from detection to player phase (memoized with useCallback)
  const switchToPlayer = useCallback((detectedMoodParam) => {
    if (!moodDetected) {
      setTransitioningToPlayer(true); // Start transition animation
      setTimeout(() => { // Delay actual switch by 1.5s for animation
        setMoodDetected(true);
        if (videoRef.current && videoRef.current.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(track => track.stop());
          videoRef.current.srcObject = null;
        }
        if (detectionIntervalId.current) {
          clearInterval(detectionIntervalId.current);
          detectionIntervalId.current = null;
        }

        setCurrentMood(detectedMoodParam);
        setFilteredSongs(songs[detectedMoodParam] || []);
        playSong();
        setTransitioningToPlayer(false); // End transition animation
      }, 1500); // 1.5 seconds delay for transition animation
    }
  }, [moodDetected, playSong]);

  // NEW: Function to reset to detection phase (for re-detect mood)
  const resetToDetectionPhase = useCallback(() => { // NEW: onLogout dependency removed
    // Stop audio
    audio.pause();
    audio.currentTime = 0; // Reset song to beginning
    setIsPlaying(false);
    
    // Stop video stream (if active) and clear detection interval
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    if (detectionIntervalId.current) {
      clearInterval(detectionIntervalId.current);
      detectionIntervalId.current = null;
    }

    // Reset mood detection related states
    setMoodDetected(false);
    setCurrentMood('neutral'); // Reset displayed mood
    setSearchQuery(''); // Clear search query
    setFilteredSongs([]); // Clear filtered songs
    moodDetectionCount.current = 0; // Reset counter
    lastDetectedMood.current = null; // Reset last detected mood

    // Show detection phase, hide player phase
    if (detectionPhaseRef.current) detectionPhaseRef.current.classList.remove('hidden');
    if (playerPhaseRef.current) playerPhaseRef.current.classList.add('hidden');

    // Restart video for detection (models are already loaded)
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error('Error re-accessing webcam:', err);
        if(moodDisplayRef.current) moodDisplayRef.current.textContent = `Error accessing webcam: ${err.message}. Please allow camera access.`;
      });
  }, [audio]); // Only depends on audio now

  // handleLogout is removed as it's not needed by MusicPlayer anymore
  // const handleLogout = useCallback(() => { ... }, [onLogout, resetToDetectionPhase]);


  // --- useEffect for component lifecycle management ---

  // 1. Load Face-API models and start webcam on component mount
  useEffect(() => {
    const currentVideoRef = videoRef.current;
    const currentAudio = audio;

    const loadAndStartVideo = async () => {
      try {
        setModelsLoading(true);
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceExpressionNet.loadFromUri('/models');
        console.log('Face-API models loaded.');
        
        setTimeout(() => {
          setModelsLoading(false);
          if (currentVideoRef) {
            navigator.mediaDevices.getUserMedia({ video: true })
              .then(stream => {
                currentVideoRef.srcObject = stream;
                console.log('Webcam stream started.');
              })
              .catch(err => {
                console.error('Error accessing webcam:', err);
                if(moodDisplayRef.current) moodDisplayRef.current.textContent = `Error accessing webcam: ${err.message}. Please allow camera access.`;
              });
          }
        }, 1000);
        
      } catch (error) {
        setModelsLoading(false);
        console.error('Error loading models or accessing webcam:', error);
        if(moodDisplayRef.current) {
          moodDisplayRef.current.textContent = `Error: ${error.message}. Please check console and allow camera.`;
        }
      }
    };

    loadAndStartVideo();

    return () => {
      if (currentVideoRef && currentVideoRef.srcObject) {
        currentVideoRef.srcObject.getTracks().forEach(track => track.stop());
        console.log('Webcam stream stopped on unmount.');
      }
      if (detectionIntervalId.current) {
        clearInterval(detectionIntervalId.current);
        console.log('Mood detection interval cleared on unmount.');
      }
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = '';
      }
    };
  }, []);

  // 2. Set up mood detection when video element starts playing
  useEffect(() => {
    const videoElement = videoRef.current;

    const handleVideoPlay = () => {
      if (detectionIntervalId.current) clearInterval(detectionIntervalId.current);

      detectionIntervalId.current = setInterval(async () => {
        if (moodDetected || modelsLoading || transitioningToPlayer) {
          if (detectionIntervalId.current && (moodDetected || transitioningToPlayer)) {
            clearInterval(detectionIntervalId.current);
            detectionIntervalId.current = null;
          }
          return;
        }

        if (!videoElement) return;

        try {
          const detections = await faceapi.detectSingleFace(videoElement,
            new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();

          if (detections) {
            const detectedMood = getMoodFromExpressions(detections.expressions);
            if (moodDisplayRef.current) {
              moodDisplayRef.current.textContent = detectedMood;
            }

            if (detectedMood === lastDetectedMood.current) {
              moodDetectionCount.current++;
              if (moodDetectionCount.current >= requiredDetections) {
                switchToPlayer(detectedMood);
              }
            } else {
              moodDetectionCount.current = 0;
              lastDetectedMood.current = detectedMood;
            }
          } else {
            if (moodDisplayRef.current) {
              moodDisplayRef.current.textContent = "No face detected";
            }
            moodDetectionCount.current = 0;
            lastDetectedMood.current = null;
          }
        } catch (error) {
          console.error("Error during face detection:", error);
          if(moodDisplayRef.current) moodDisplayRef.current.textContent = "Detection error. Check console.";
        }
      }, 1000);
    };

    if (videoElement) {
      videoElement.addEventListener('play', handleVideoPlay);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('play', handleVideoPlay);
      }
    };
  }, [moodDetected, switchToPlayer, modelsLoading, transitioningToPlayer]);

  // 3. Setup audio controls and event listeners
  useEffect(() => {
    const handleTogglePlay = () => {
      if (audio.paused) {
        audio.play().catch(e => console.error("Error toggling play:", e));
      } else {
        audio.pause();
      }
      setIsPlaying(!isPlaying);
    };

    const handleNextTrack = () => {
      setCurrentSongIndex(prevIndex => (prevIndex + 1) % songs[currentMood].length);
    };

    const handlePrevTrack = () => {
      setCurrentSongIndex(prevIndex => (prevIndex - 1 + songs[currentMood].length) % songs[currentMood].length);
    };

    const handleVolumeChange = () => {
      if (volumeSliderRef.current) {
        audio.volume = parseFloat(volumeSliderRef.current.value);
      }
    };

    const handleTimeUpdate = () => {
      if (progressFilledRef.current && currentTimeRef.current && durationRef.current && !isNaN(audio.duration)) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFilledRef.current.style.width = `${progress}%`;
        currentTimeRef.current.textContent = formatTime(audio.currentTime);
        durationRef.current.textContent = formatTime(audio.duration);
      }
    };

    const handleSongEnded = () => {
        handleNextTrack();
    };

    const handleProgressClick = (e) => {
        if (isDraggingRef.current) return;

        const progressBar = progressRef.current;
        if (!progressBar) return;

        const clickX = e.clientX - progressBar.getBoundingClientRect().left;
        const width = progressBar.clientWidth;
        const duration = audio.duration;

        if (!isNaN(duration) && duration > 0) {
            const seekTime = (clickX / width) * duration;
            audio.currentTime = seekTime;
        }
    };

    const handleMouseDown = (e) => {
      const progressBar = progressRef.current;
      if (!progressBar) return;

      const rect = progressBar.getBoundingClientRect();
      const isClickOnThumbArea = (e.clientX >= rect.left + rect.width - 15 && e.clientX <= rect.left + rect.width);
      
      if (e.target === progressBar || e.target === progressFilledRef.current || isClickOnThumbArea) {
        isDraggingRef.current = true;
        handleProgressClick(e);
        e.preventDefault();
        document.body.style.userSelect = 'none';
      }
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;

      const progressBar = progressRef.current;
      if (!progressBar) return;

      const clickX = e.clientX - progressBar.getBoundingClientRect().left;
      const width = progressBar.clientWidth;
      const duration = audio.duration;

      const clampedX = Math.max(0, Math.min(clickX, width));

      if (!isNaN(duration) && duration > 0) {
        const seekTime = (clampedX / width) * duration;
        audio.currentTime = seekTime;
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.body.style.userSelect = '';
    };

    const handleMuteToggle = () => {
      if (audio.muted) {
        audio.muted = false;
        audio.volume = originalVolume;
        if (volumeSliderRef.current) {
          volumeSliderRef.current.value = originalVolume;
        }
      } else {
        setOriginalVolume(audio.volume);
        audio.muted = true;
        audio.volume = 0;
        if (volumeSliderRef.current) {
          volumeSliderRef.current.value = 0;
        }
      }
      setIsMuted(!audio.muted);
    };

    const handleAudioVolumeChange = () => {
      if (volumeSliderRef.current) {
        volumeSliderRef.current.value = audio.volume;
        setIsMuted(audio.muted);
      }
    };


    const togglePlayBtn = togglePlayRef.current;
    const prevTrackBtn = prevTrackRef.current;
    const nextTrackBtn = nextTrackRef.current;
    const volumeSlider = volumeSliderRef.current;
    const progressBar = progressRef.current;
    const muteBtn = muteButtonRef.current;

    if (togglePlayBtn) togglePlayBtn.addEventListener('click', handleTogglePlay);
    if (prevTrackBtn) prevTrackBtn.addEventListener('click', handlePrevTrack);
    if (nextTrackBtn) nextTrackBtn.addEventListener('click', handleNextTrack);
    if (volumeSlider) {
        volumeSlider.addEventListener('input', handleVolumeChange);
        volumeSlider.addEventListener('change', handleVolumeChange);
    }
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleSongEnded);
    audio.addEventListener('volumechange', handleAudioVolumeChange);

    if (progressBar) {
      progressBar.addEventListener('mousedown', handleMouseDown);
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    if (muteBtn) muteBtn.addEventListener('click', handleMuteToggle);


    return () => {
      if (togglePlayBtn) togglePlayBtn.removeEventListener('click', handleTogglePlay);
      if (prevTrackBtn) prevTrackBtn.removeEventListener('click', handlePrevTrack);
      if (nextTrackBtn) nextTrackRef.current.removeEventListener('click', handleNextTrack);
      if (volumeSlider) {
          volumeSlider.removeEventListener('input', handleVolumeChange);
          volumeSlider.removeEventListener('change', handleVolumeChange);
      }
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleSongEnded);
      audio.removeEventListener('volumechange', handleAudioVolumeChange);

      if (progressBar) {
        progressBar.removeEventListener('mousedown', handleMouseDown);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (muteBtn) muteBtn.removeEventListener('click', handleMuteToggle);
    };
  }, [audio, currentMood, isPlaying, originalVolume]);

  // useEffect to trigger filtering when search query or mood changes
  useEffect(() => {
    filterSongs();
  }, [searchQuery, currentMood, filterSongs]);

  // 4. Update UI and playlist when mood or current song changes
  useEffect(() => {
    updatePlayerUI();
    renderPlaylist();
  }, [currentMood, currentSongIndex, isPlaying, updatePlayerUI, renderPlaylist]);

  // 5. Play song whenever currentSongIndex or currentMood changes (if in player phase)
  useEffect(() => {
    if (moodDetected) {
      playSong();
    }
  }, [currentSongIndex, currentMood, moodDetected, playSong]);

  // Get current song details for display
  const currentSongDetails = songs[currentMood] ? songs[currentMood][currentSongIndex] : null;

  return (
    <div className="container">
      {/* Models Loading Overlay */}
      {modelsLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p className="loading-message">Loading AI models...</p>
        </div>
      )}

      {/* Transitioning to Player Overlay */}
      {transitioningToPlayer && (
        <div className="loading-overlay transition-overlay">
          <div className="loading-spinner"></div>
          <p className="loading-message">Entering Harmony...</p>
        </div>
      )}

      {/* Detection Phase */}
      <div className={`detection-phase ${moodDetected ? 'hidden' : ''} ${modelsLoading || transitioningToPlayer ? 'blurred-content' : ''}`} ref={detectionPhaseRef}>
        <h1>Mood Detection</h1>
        <video id="video" ref={videoRef} width="640" height="480" autoPlay muted></video>
        <div className="mood-display">Detecting your mood... <span id="mood" ref={moodDisplayRef}>analyzing</span></div>
      </div>

      {/* Player Phase */}
      <div className={`player-phase ${moodDetected ? '' : 'hidden'}`} ref={playerPhaseRef}>
        <div className="player-header">
          <h1>Harmony</h1>
          {/* Dynamically assign mood-specific class */}
          {/* Re-detect Mood button / Mood Tag */}
          <div className={`mood-tag mood-${currentMood}`} ref={moodTagRef} onClick={resetToDetectionPhase}>
            Mood: {currentMood}
          </div>
          {/* Logout button (Removed as per request to remove it from here) */}
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search songs, artists, or albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Playlist */}
        <div className="playlist" ref={playlistRef}></div>

        <div className="player-controls">
          {/* Current Song Name Display (above controls) */}
          {currentSongDetails && (
              <div className="current-song-title-on-controls">
                  {currentSongDetails.title}
              </div>
          )}

          <div className="controls">
            <button id="prevTrack" ref={prevTrackRef}><FaStepBackward /></button>
            <button id="togglePlay" ref={togglePlayRef}>
                {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button id="nextTrack" ref={nextTrackRef}><FaStepForward /></button>
          </div>

          <div className="progress-bar">
            <span id="currentTime" ref={currentTimeRef}>0:00</span>
            <div className="progress" ref={progressRef}>
              <div class="progress-filled" ref={progressFilledRef}></div>
            </div>
            <span id="duration" ref={durationRef}>0:00</span>
            <div class="volume-control">
              <span ref={muteButtonRef} style={{cursor: 'pointer'}}>
                {isMuted || audio.volume === 0 ? '🔇' : '🔊'}
              </span>
              <input type="range" className="volume-slider" ref={volumeSliderRef} min="0" max="1" step="0.1" defaultValue="1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;