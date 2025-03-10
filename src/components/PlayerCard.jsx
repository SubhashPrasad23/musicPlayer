import Visualizer from "./Visualizer"
import { Disc } from "lucide-react"

const PlayerCard = ({ isPlay, audioData, currentTrack }) => {
    return (
        <div className="relative w-full max-w-xs aspect-square mb-6 rounded-xl overflow-hidden ">
            <div className="h-full w-full bg-black flex items-center justify-center">
                {isPlay ? (
                    <Visualizer audioData={audioData} />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <Disc size={64} className="mb-4 animate-spin-slow" />
                        <p>Press play to start</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PlayerCard

