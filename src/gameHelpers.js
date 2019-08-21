export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

// Create array from an array made to STAGE_HEIGHT
export const createStage = () => 
    Array.from(Array(STAGE_HEIGHT), () =>
        new Array(STAGE_WIDTH).fill([0, 'clear'])
    )

// 'moveX' and 'moveY' created so that x and y can be used in loops   
export const checkCollision = (player, stage, { x: moveX, y: moveY}) => {
    for(let y = 0; y < player.tetromino.length; y += 1) {
        for(let x = 0; x < player.tetromino[y].length; x += 1) {

            // 1. Check that cell is occupied by tetromino
            if(player.tetromino[y][x] !== 0) {
                if(
                    // 2. Check that our move is within game area's height (y)
                    // Prevents going through bottom. If nothing is found in stage[y + player.pos.y + moveY]
                    // true is returned because collision is detected
                    !stage[y + player.pos.y + moveY] ||
                    // 3. Check that our move is within game area's width (x)
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                    // 4. Check that the cell we're moving to is empty
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ) {
                    return true
                }
            }
        }
    }
}
