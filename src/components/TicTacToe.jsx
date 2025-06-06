import React, { useEffect, useState } from 'react'
import circle_icon from '../assets/circle.png'
import cross_png from '../assets/cross.png'

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
           <div className="flex flex-col items-center justify-center md:mt-1 mt-[20%]">
             <h1 className='md:text-4xl text-3xl text-white font-semibold'>Tic Tac Toe</h1>
            <div className="score py-2">
                <p className='md:text-xl text-sm text-white font-semibold '>Score:- Player X :{score.X} || Player O: {score.O}</p>
            </div>
            <div className="board flex flex-wrap w-[90vw] max-w-[500px] aspect-square md:py-3 py-5">
                {data.map((val, index) => (
                    <div key={index} className="board-box w-1/3 flex bg-slate-800 border-[3px] border-[#0f1b21]  cursor-pointer items-center justify-center aspect-square"
                        onClick={() => {
                            clickBtn(index)
                        }}
                    >
                        {renderIcon(val)}
                    </div>
                ))}

            </div>
           </div>


            {winner && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-slate-600 text-white p-6 rounded-lg shadow-lg text-center max-w-[90%]">
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


            <div className="game-choice flex gap-3 py-3 md:mt-2 ">
                <button className='bg-slate-700 py-4  px-6
     rounded-xl text-white text-xl' onClick={resetGame}>Reset</button>
                <button className='bg-slate-700 py-4 px-6
     rounded-xl text-white text-xl' onClick={newGame}>New Game</button>
            </div>
        </div>
    )
}

export default TicTacToe