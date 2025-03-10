import { Play, Pause, SkipBack, SkipForward } from "lucide-react"

const Controls = ({ togglePlayPause, isPlay, skipForward, skipBackward }) => {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="flex items-center justify-between w-full max-w-xs">
                <button
                    onClick={skipBackward}
                    className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white transition-colors rounded-full hover:bg-gray-700/50"
                    aria-label="Previous track"
                >
                    <SkipBack size={20} />
                </button>

                <button
                    onClick={togglePlayPause}
                    className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full shadow-lg hover:shadow-yellow-500/20 transition-all transform hover:scale-105 text-gray-900"
                    aria-label={isPlay ? "Pause" : "Play"}
                >
                    {isPlay ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                </button>

                <button
                    onClick={skipForward}
                    className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white transition-colors rounded-full hover:bg-gray-700/50"
                    aria-label="Next track"
                >
                    <SkipForward size={20} />
                </button>
            </div>
        </div>
    )
}

export default Controls

