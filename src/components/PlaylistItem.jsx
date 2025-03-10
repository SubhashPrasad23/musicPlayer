const PlaylistItem = ({
    track,
    index,
    isActive,
    isPlaying,
    onClick,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
    isDragging,
    isDragOver,
}) => {
    return (
        <div
            draggable
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragEnd={onDragEnd}
            className={`py-3 px-4 my-1 rounded-lg cursor-move transition-all duration-200 flex items-center ${isActive
                    ? "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-l-4 border-yellow-500"
                    : isDragOver
                        ? "bg-gray-600 border-l-4 border-gray-500"
                        : isDragging
                            ? "bg-amber-700/70 border-l-4 border-amber-500" 
                            : "hover:bg-gray-700/50"
                } ${isDragging ? "opacity-100 shadow-lg" : "opacity-100"}`}
            onClick={onClick}
        >
            <div className="mr-3 w-8 h-8 flex items-center justify-center">
                {isPlaying ? (
                    <div className="playing-animation">
                        <span> </span>
                        <span></span>
                        <span></span>
                    </div>
                ) : (
                    <span className="text-gray-400">{index + 1}</span>
                )}
            </div>
            <div className="flex-1 truncate">
                <p
                    className={`truncate ${isActive ? "text-yellow-400 font-medium" : isDragging ? "text-white font-medium" : "text-white"}`}
                >
                    {track?.title}
                </p>
            </div>
        </div>
    )
}

export default PlaylistItem

