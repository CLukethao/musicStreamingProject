
import React, {useEffect, useState} from 'react'
import { motion } from "framer-motion/dist/framer-motion";
import { UseMeasurePosition } from "./UseMeasurePosition/UseMeasurePosition";
import { UsePositionReorder } from "./UsePositionReorder/UsePositionReorder";

const EditPlaylist = ({ playlistToEdit, editPlaylistSongs, playSong}) => {

    const [updatedPlaylist, updatedSongPosition, updateOrder] = UsePositionReorder(playlistToEdit.songs);

    useEffect(() => {

       editPlaylistSongs(updatedPlaylist)

    }, [updatedPlaylist])

    const removeSong = (index) => {
        let newPlaylist = updatedPlaylist
        newPlaylist.splice(index, 1)
        editPlaylistSongs(newPlaylist)
    }

    const songSelected = (song, playlist) => {
        playSong(song, playlist)
    }

    return updatedPlaylist.map((song, index) => (

            <Song
                drag="y"
                key={song.id.videoId}
                index={index}
                updateOrder={updateOrder}
                updatedSongPosition={updatedSongPosition}
                song={song}
                updatedPlaylist={updatedPlaylist}
                removeSong={removeSong}
                songSelected={songSelected}
                playlist={playlistToEdit.playlistName}
            />

    ))
}

const Song = ({song, updateOrder, updatedSongPosition, index, removeSong, songSelected, playlist}) => {

    const [isDragged, setIsDragged] = useState(false)

    const itemRef = UseMeasurePosition(pos => updatedSongPosition(index, pos));

    const dateRegex = /([0-9]+)-([0-9]+)-([0-9]+).*/

    return (
        <motion.div className='col-12 playlist-songs mt-2'
            style={{
                zIndex: isDragged ? 2 : 1,
            }}

            dragConstraints={{
                top: 0,
                bottom: 0
            }}

            dragElastic={1}
            layout
            ref={itemRef}
            onDragStart={() => setIsDragged(true)}
            onDragEnd={() => setIsDragged(false)}
            animate={{ scale: isDragged ? 1.05 : 1, pathLength: 1 }}
            transition={{ type: "tween" }}
            onViewportBoxUpdate={(_, delta) => {
                isDragged && updateOrder(index, delta.y.translate);
            }}
            drag="y"
        >
            <div className='row d-flex align-items-center' onClick={event => songSelected(song, playlist)}>

                <div className='col-1 text-center'>
                    <button className='btn text-white move-song-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-chevron-expand" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                  d="M3.646 9.146a.5.5 0 0 1 .708 0L8 12.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-2.292a.5.5 0 0 0 .708 0L8 3.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708z"/>
                        </svg>
                    </button>
                </div>


                <div className='col-3 col-md-2'>
                    <img className='result-img' src={song.snippet.thumbnails.medium.url} alt=''></img>
                </div>

                <div className='col-4 col-md-3'>
                    {song.snippet.title}
                </div>

                <div className='col-2 col-md-3'>
                    <a href={`https://www.youtube.com/channel/${song.snippet.channelId}`} target="_blank">{song.snippet.channelTitle}</a>
                </div>

                <div className='col-2 col-md-2'>
                    {song.snippet.publishedAt.replace(dateRegex, "$2-$3-$1")}
                </div>

                <div className='col-1'>
                    <button className='btn remove-btn' onClick={event => {removeSong(index) ; event.currentTarget.blur()}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                        </svg>
                    </button>
                </div>
            </div>

        </motion.div>
    )
}


export default EditPlaylist