import { useRef } from "react"

const ProgressBar = ({ currentTime, duration, onSeek }) => {
    const progressRef = useRef(null)

    const handleSeek = (event) => {
        if (!progressRef.current) return
        const rect = progressRef.current.getBoundingClientRect()
        const clickPosition = event.clientX - rect.left
        const percentage = clickPosition / rect.width
        const seekTime = percentage * duration
        const validSeekTime = Math.max(0, Math.min(seekTime, duration))
        onSeek(validSeekTime)
    }
    const formatTime = (time) => {
        if (isNaN(time)) return "0:00"
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    }

    return (
        <div className="w-full mb-4">
            <div
                className="w-full h-2 bg-gray-700 rounded-full cursor-pointer relative overflow-hidden"
                onClick={handleSeek}
                ref={progressRef}
            >
                <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full absolute top-0 left-0 transition-all"
                    style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                ></div>
            </div>
            <div className="w-full mt-2 text-xs text-gray-400 flex items-center justify-between">
                <p>{formatTime(currentTime)}</p>
                <p>{formatTime(duration)}</p>
            </div>
        </div>
    )
}

export default ProgressBar

