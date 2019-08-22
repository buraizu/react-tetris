import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from '../gameHelpers';

export const usePlayer = () => {
    // short version
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0].shape,
        collided: false
    })
    // long version
    // const playerState = useState();
    // const player = playerState[0];
    // const setPlayer = playerState[1];

    // matrix = tetromino
    const rotate = (matrix, dir) => {
        // Convert rows to columns
        const rotatedTetro = matrix.map((_, index) =>
            matrix.map((col) => col[index])
        )
        // Reverse each row to get a rotated matrix(tetromino)
        if(dir > 0) return rotatedTetro.map(row => row.reverse())
        return rotatedTetro.reverse()
    } 

    const playerRotate = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player))
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir)

        const pos = clonedPlayer.pos.x
        let offset = 1
        while(checkCollision(clonedPlayer, stage, { x: 0, y: 0})) {
            clonedPlayer.pos.x += offset
            offset = -(offset + (offset > 0 ? 1 : -1))
            // Back-and-forth detection has exceeded width of tetromino
            // therefore no rotation is valid. Rotate tetromino back,
            // reset position to original position
            if(offset > clonedPlayer.tetromino[0].length) {
                rotate(clonedPlayer.tetromino, -dir)
                clonedPlayer.pos.x = pos
                return
            }
        }

        setPlayer(clonedPlayer)
    }

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer((prev) => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
            collided
        }))
    }

    // useCallback prevents infinite loop
    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false
        })
    }, [])

   
    return [player, updatePlayerPos, resetPlayer, playerRotate];
}