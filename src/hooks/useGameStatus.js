import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = (rowsCleared) => {
    const [score, setScore] = useState(0)
    const [rows, setRows] = useState(0)
    const [level, setLevel] = useState(0)

    // point values for number of rows cleared
    const linePoints = [40, 100, 300, 1200]

    // useCallback needs dependency array as last argument
    const calcScore = useCallback(() => {
        // Rows have been cleared
        if(rowsCleared > 0) {
            setScore((prev) => prev + linePoints[rowsCleared - 1] * (level + 1))
            setRows((prev) => prev + rowsCleared)
        }
    }, [level, linePoints, rowsCleared])

    useEffect(() => {
        calcScore()
    }, [calcScore, rowsCleared, score])

    return [score, setScore, rows, setRows, level, setLevel]
}