
import React, {useState} from 'react'
import { motion } from "framer-motion/dist/framer-motion";
import { UseMeasurePosition } from "./UseMeasurePosition/UseMeasurePosition";
import { UsePositionReorder } from "./UsePositionReorder/UsePositionReorder";


const EditPlaylist = ({editPlaylist}) => {

    const [updatedList, updatedPosition, updateOrder] = UsePositionReorder(editPlaylist.songs);

    return updatedList.map((song, index) => (

            <Song
                drag="y"
                key={song.id.videoId}
                index={index}
                updateOrder={updateOrder}
                updatePosition={updatedPosition}
                song={song}

            />

    ))
}

const Song = ({song, updateOrder, updatePosition, index}) => {

    const [isDragged, setIsDragged] = useState(false)

    const itemRef = UseMeasurePosition(pos => updatePosition(index, pos));

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
            {song.snippet.title}

        </motion.div>
    )
}


export default EditPlaylist