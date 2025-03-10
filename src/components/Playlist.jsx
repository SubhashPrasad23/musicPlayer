import PlaylistItem from "./PlaylistItem"
import { Music, Upload } from "lucide-react"

const Playlist = ({ tracks, currentTrackIndex, isPlay, setIsPlay, onTrackSelect, dropzoneProps }) => {
    const { getRootProps, getInputProps, isDragActive } = dropzoneProps

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

            {/* Scrollable Playlist Container */}
            <div className=" h-[400px] overflow-y-auto hide-scrollbar">
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
                                    onTrackSelect(index);
                                    setIsPlay(index === currentTrackIndex ? !isPlay : true); // Toggle play state
                                }}
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
