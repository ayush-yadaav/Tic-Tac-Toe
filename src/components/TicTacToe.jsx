import React, { useEffect, useState } from 'react'
import circle_icon from '../assets/circle.png'
import cross_png from '../assets/cross.png'
import play_png from '../assets/play.png'
import replay_png from '../assets/replay.png'

function TicTacToe() {

    const [data, setdata] = useState(Array(9).fill(''))
    const [count, setcount] = useState(0)
    const [lock, setlock] = useState(false)
    const [winner, setwinner] = useState(null)
    const [score, setscore] = useState({ X: 0, O: 0 })



    useEffect(() => {
        const savedScore = localStorage.getItem('ticTacToeScore');
        if (savedScore) {
            setscore(JSON.parse(savedScore));
        }
    }, []);



    // CLICK BUTTON FUNCTION WILL BE THIER

    const clickBtn = (index) => {

        if (lock || data[index] !== '') return;

        const newData = [...data];
        newData[index] = count % 2 == 0 ? 'X' : 'O';
        setdata(newData)
        setcount(count + 1)
        checkWinner(newData)



    }

    const renderIcon = (val) => {
        if (val == 'X') return <img src={cross_png} alt='0' className='w-2/3 h-2/3' />
        if (val == 'O') return <img src={circle_icon} alt='X' className='w-2/3 h-2/3' />
        return null;
    }
    const checkWinner = (board) => {

        const patterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]          // Diagonals
        ]

        for (let [a, b, c] of patterns) {
            if (board[a] && board[b] === board[b] && board[a] === board[c]) {
                const winner = board[a];
                setwinner(winner);
                setlock(true)
                const newScore = {
                    ...score,
                    [winner]: score[winner] + 1
                };
                setscore(newScore);
                // Save updated score to localStorage
                localStorage.setItem('ticTacToeScore', JSON.stringify(newScore));
                return;
            }
        }
    }

    const resetGame = () => {
        setdata(Array(9).fill(''));
        setcount(0);
        setlock(false);
        setwinner(null);
    };

    const newGame = () => {
        localStorage.removeItem('ticTacToeScore');
        setdata(Array(9).fill(''));
        setcount(0);
        setlock(false);
        setwinner(null);
        setscore({ X: 0, O: 0 });
    };



    return (
        <div className='main text-center flex flex-col items-center  justify-center py-3'>
            <div className="flex flex-col items-center justify-center md:mt-1 ">
                <div className="score py-2 flex items-center gap-10 md:py-5 mt-7">
                    {/* <p className='md:text-xl text-sm text-black font-semibold '>Score:- Player X :{score.X} || Player O: {score.O}</p> */}
                    <div>
                        <img src={cross_png} alt="cross" height={50} width={45} />
                        <p className='md:text-2xl font-medium text-xl'>{score.X} wins</p>
                    </div>
                    <div>
                        <img src={circle_icon} alt="cross" height={50} width={45} />
                        <p className='md:text-2xl font-medium text-xl'>{score.O} wins</p>
                    </div>
                </div>
                <div className="board flex flex-wrap w-[80vw] max-w-[400px] aspect-square md:py-3 py-5">
                    {data.map((val, index) => (
                        <div
                            key={index}
                            className={`board-box w-1/3 flex bg-white border-black cursor-pointer items-center justify-center aspect-square
                           ${index < 6 ? 'border-b-[3px]' : ''}
                           ${(index + 1) % 3 !== 0 ? 'border-r-[3px]' : ''}`}
                            onClick={() => {
                                clickBtn(index);
                            }}
                        >

                            {renderIcon(val)}
                        </div>
                    ))}

                </div>
            </div>


            {winner && (
                <div className="fixed top-0 left-0 w-full h-full bg-[#eaeaea] bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center max-w-[90%]">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                            {winner === 'draw' ? "It's a Draw!" : `Player ${winner.toUpperCase()} Wins!`}
                        </h2>
                        <button
                            onClick={resetGame}
                            className="bg-slate-800 text-white px-6 py-2 rounded-full font-semibold text-lg sm:text-xl"
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            )}


            <div className="game-choice flex gap-3 py-3 md:mt-6 mt-10">

<img src={replay_png} alt="replay" height={15} width={60}  onClick={resetGame} />
<img src={play_png} alt="play" height={15} width={60} onClick={newGame} />
            </div>
        </div>
    )
}

export default TicTacToe
