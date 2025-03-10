import { Music, Upload } from "lucide-react"
import { useState } from "react"
import PlaylistItem from "./PlaylistItem"

const Playlist = ({ setUserTracks, tracks, currentTrackIndex, isPlay, setIsPlay, onTrackSelect, dropzoneProps }) => {
    const { getRootProps, getInputProps, isDragActive } = dropzoneProps
    const [draggedIndex, setDraggedIndex] = useState(null)
    const [dragOverIndex, setDragOverIndex] = useState(null)

    const handleDragStart = (index) => {

        setDraggedIndex(index)
    }

    const handleDragOver = (e, index) => {
        e.preventDefault()
        if (draggedIndex !== index) {
            setDragOverIndex(index)
        }
    }

    const handleDragEnd = () => {
        setDraggedIndex(null)
        setDragOverIndex(null)
    }

    const handleDrop = (e, dropIndex) => {
        e.preventDefault()

        if (draggedIndex !== null && draggedIndex !== dropIndex) {
            const newTracks = [...tracks]
            const draggedTrack = newTracks[draggedIndex]

            newTracks.splice(draggedIndex, 1)

            newTracks.splice(dropIndex, 0, draggedTrack)

            setUserTracks(newTracks)

            if (currentTrackIndex === draggedIndex) {
                onTrackSelect(dropIndex)
            } else if (
                (currentTrackIndex > draggedIndex && currentTrackIndex <= dropIndex) ||
                (currentTrackIndex < draggedIndex && currentTrackIndex >= dropIndex)
            ) {
                const newIndex = currentTrackIndex > draggedIndex ? currentTrackIndex - 1 : currentTrackIndex + 1
                onTrackSelect(newIndex)
            }
        }

        setDraggedIndex(null)
        setDragOverIndex(null)
    }

    return (
        <div className="md:w-2/5 border-t md:border-t-0 md:border-l border-gray-700 flex flex-col">
            <div className="w-full p-4 bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-700">
                <h3 className="text-lg font-medium text-white flex items-center">
                    <Music className="mr-2" size={18} />
                    Your Music Library
                </h3>
                <div className="mx-auto w-1/2">
                    <div
                        {...getRootProps()}
                        className="mt-3 p-4 border-2 border-dashed border-gray-600 rounded-lg text-center cursor-pointer transition-colors hover:border-yellow-500 hover:bg-gray-700/30"
                    >
                        <input {...getInputProps()} />
                        <Upload className="mx-auto mb-2 text-gray-400" size={20} />
                        {isDragActive ? (
                            <p className="text-yellow-400 text-sm">Drop your audio files here...</p>
                        ) : (
                            <p className="text-gray-400 text-sm">Drag & drop audio files here, or click to upload</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="h-[400px] overflow-y-auto hide-scrollbar">
                <div className="p-2">
                    {tracks.length > 0 ? (
                        tracks.map((track, index) => (
                            <PlaylistItem
                                key={track.id}
                                track={track}
                                index={index}
                                isActive={index === currentTrackIndex}
                                isPlaying={index === currentTrackIndex && isPlay}
                                onClick={() => {
                                    onTrackSelect(index)
                                    setIsPlay(index === currentTrackIndex ? !isPlay : true)
                                }}
                                onDragStart={() => handleDragStart(index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragEnd={handleDragEnd}
                                isDragging={index === draggedIndex}
                                isDragOver={index === dragOverIndex}
                            />
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p>No tracks available</p>
                            <p className="text-sm mt-2">Upload some music to get started</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Playlist

