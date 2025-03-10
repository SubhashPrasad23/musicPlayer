import { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Controls from "./Controls";
import PlayerCard from "./PlayerCard";
import TrackInfo from "./TrackInfo";
import ProgressBar from "./ProgressBar";
import Playlist from "./Playlist";
import VolumeControl from "./VolumeControl";
import audioTracks from "./MockData";

const MusicContainer = () => {
    const [isPlay, setIsPlay] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [userTracks, setUserTracks] = useState(audioTracks);
    const [audioData, setAudioData] = useState(Array(64).fill(0));
    const [volume, setVolume] = useState(0.7);
    const [isMuted, setIsMuted] = useState(false);
    const [previousVolume, setPreviousVolume] = useState(0.7);

    const audioRef = useRef(new Audio(userTracks[currentTrackIndex]?.src));

    useEffect(() => {
        const audio = audioRef.current;
        audio.volume = volume;
        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleEnded = () => skipForward();

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("ended", handleEnded);
        };
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        audio.src = userTracks[currentTrackIndex]?.src;
        audio.load();
        if (isPlay) {
            audio.play().catch((error) => console.error("Error playing audio:", error));
        } else {
            audio.play()
        }

        setCurrentTime(0);
    }, [currentTrackIndex]);

    const togglePlayPause = () => {
        const audio = audioRef.current;

        if (isPlay) {
            audio.pause();
        } else {
            audio.play().catch((error) => console.error("Error playing audio:", error));
        }

        setIsPlay(!isPlay);
    };

    const skipForward = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % userTracks.length);
    };

    const skipBackward = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + userTracks.length) % userTracks.length);
    };

    const handleSeek = (seekTime) => {
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
        audioRef.current.volume = isMuted ? 0 : newVolume;

        if (isMuted && newVolume > 0) {
            setIsMuted(false);
        }
    };

    const toggleMute = () => {
        if (isMuted) {
            audioRef.current.volume = previousVolume;
            setIsMuted(false);
        } else {
            setPreviousVolume(volume);
            audioRef.current.volume = 0;
            setIsMuted(true);
        }
    };

    const onDrop = (acceptedFiles) => {
        const newTracks = acceptedFiles.map((file, index) => ({
            id: userTracks.length + audioTracks.length + index + 1,
            title: file.name.replace(/\.[^/.]+$/, ""),
            src: URL.createObjectURL(file),
        }));
        setUserTracks([...userTracks, ...newTracks]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "audio/*": [] },
        onDrop,
    });

    return (
        <div className="mx-auto md:px-4 md:py-8 h-full flex items-center justify-center">
            <div className="w-full max-w-5xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 md:rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all duration-300">

                <div className="md:w-3/5 p-6 flex flex-col items-center">
                    <PlayerCard isPlay={isPlay} audioData={audioData} currentTrack={userTracks[currentTrackIndex]} />
                    <div className="w-full max-w-md">
                        <TrackInfo title={userTracks[currentTrackIndex]?.title || "No track selected"} />
                        <ProgressBar currentTime={currentTime} duration={duration} onSeek={handleSeek} />
                        <Controls togglePlayPause={togglePlayPause} isPlay={isPlay} skipForward={skipForward} skipBackward={skipBackward} />
                        <VolumeControl volume={volume} isMuted={isMuted} onVolumeChange={handleVolumeChange} onToggleMute={toggleMute} />
                    </div>
                </div>
                <Playlist setIsPlay={setIsPlay} tracks={userTracks} currentTrackIndex={currentTrackIndex} isPlay={isPlay} onTrackSelect={setCurrentTrackIndex} dropzoneProps={{ getRootProps, getInputProps, isDragActive }} />
            </div>
        </div>
    );
};

export default MusicContainer;
