const Visualizer = () => {
    return (
        <div className="w-full h-full flex flex-col justify-end relative">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-black/90 z-0"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-black/70 border-2 border-yellow-500/30 z-10 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500/20 to-amber-600/20 animate-pulse"></div>
            </div>
            <div className="w-full h-full flex items-end justify-center gap-[2px] z-10">
            </div>
        </div>
    )
}

export default Visualizer

