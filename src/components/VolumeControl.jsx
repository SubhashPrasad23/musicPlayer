import { Volume, Volume1, Volume2, VolumeX } from "lucide-react"

const VolumeControl = ({ volume, isMuted, onVolumeChange, onToggleMute }) => {
    const handleVolumeChange = (e) => {
        const newVolume = Number.parseFloat(e.target.value)
        onVolumeChange(newVolume)
    }

    const getVolumeIcon = () => {
        if (isMuted || volume === 0) {
            return <VolumeX size={18} />
        } else if (volume < 0.3) {
            return <Volume size={18} />
        } else if (volume < 0.7) {
            return <Volume1 size={18} />
        } else {
            return <Volume2 size={18} />
        }
    }

    return (
        <div className="w-full flex items-center justify-center mt-4">
            <div className="w-full max-w-xs flex items-center gap-2">
                <button
                    onClick={onToggleMute}
                    className="text-gray-300 hover:text-white transition-colors p-1"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                >
                    {getVolumeIcon()}
                </button>

                <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
                        style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                    ></div>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        aria-label="Volume"
                    />
                </div>

                <span className="text-xs text-gray-400 w-8 text-right">{Math.round((isMuted ? 0 : volume) * 100)}%</span>
            </div>
        </div>
    )
}

export default VolumeControl

