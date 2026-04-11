import { useState } from "react";
import "./TicTacToe.css";

// כל השילובים האפשריים לניצחון בלוח 3x3
// כל מערך פנימי מייצג 3 אינדקסים שאם הם זהים - יש מנצח
const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // שורות
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // עמודות
  [0, 4, 8], [2, 4, 6],             // אלכסונים
];

// פונקציה שבודקת אם יש מנצח בלוח הנוכחי
// מקבלת את מצב הלוח (מערך של 9 תאים) ומחזירה "X" / "O" או null אם אין מנצח
function checkWinner(board: string[]): string | null {
  for (const [a, b, c] of WINNING_LINES) {
    // אם שלושת התאים מלאים ושווים - יש מנצח
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a];
  }
  return null;
}

export default function TicTacToe() {
  // מצב הלוח - מערך של 9 תאים, כל תא הוא "" / "X" / "O"
  const [board, setBoard] = useState(Array(9).fill(""));

  // האם זה תור X (true) או O (false)
  const [isX, setIsX] = useState(true);

  // ניקוד מצטבר לאורך כל הסיבובים
  const [scores, setScores] = useState({ X: 0, O: 0 });

  // מספר הסיבוב הנוכחי (1 עד 3)
  const [round, setRound] = useState(1);

  // האם הסיבוב הנוכחי הסתיים (ניצחון או תיקו)
  const [roundOver, setRoundOver] = useState(false);

  // האם המשחק כולו הסתיים (אחרי 3 סיבובים)
  const [gameOver, setGameOver] = useState(false);

  // בדיקת מצב הלוח הנוכחי
  const winner = checkWinner(board);
  const isDraw = !winner && board.every(Boolean); // תיקו = אין מנצח וכל התאים מלאים

  // פונקציה שמופעלת כשלוחצים על תא בלוח
  const handleClick = (i: number) => {
    // אם התא כבר תפוס או שהסיבוב נגמר - לא עושים כלום
    if (board[i] || roundOver) return;

    // יוצרים עותק של הלוח ומעדכנים את התא שנלחץ
    const newBoard = [...board];
    newBoard[i] = isX ? "X" : "O";
    setBoard(newBoard);

    // בודקים אם יש מנצח או תיקו אחרי המהלך החדש
    const newWinner = checkWinner(newBoard);
    const newDraw = !newWinner && newBoard.every(Boolean);

    if (newWinner || newDraw) {
      // מעדכנים ניקוד אם יש מנצח
      const newScores = { ...scores };
      if (newWinner) newScores[newWinner as "X" | "O"]++;
      setScores(newScores);
      setRoundOver(true);

      // אם זה היה הסיבוב השלישי - המשחק כולו נגמר
      if (round === 3) setGameOver(true);
    } else {
      // אין מנצח עדיין - מעבירים תור לשחקן הבא
      setIsX(!isX);
    }
  };

  // מאפס את הלוח ועובר לסיבוב הבא
  const nextRound = () => {
    setBoard(Array(9).fill(""));
    setIsX(true);
    setRound(round + 1);
    setRoundOver(false);
  };

  // מאפס הכל ומתחיל משחק חדש מהתחלה
  const restart = () => {
    setBoard(Array(9).fill(""));
    setIsX(true);
    setScores({ X: 0, O: 0 });
    setRound(1);
    setRoundOver(false);
    setGameOver(false);
  };

  // קובע מי ניצח בסך הכל אחרי 3 סיבובים (לפי הניקוד)
  const finalWinner =
    gameOver
      ? scores.X > scores.O
        ? "X"
        : scores.O > scores.X
        ? "O"
        : null // תיקו כולל
      : null;

  return (
    <div className="game">
      <h2>איקס עיגול</h2>

      {/* כשהמשחק נגמר - מציגים רק את המנצח הכולל וכפתור משחק חדש */}
      {gameOver ? (
        <>
          <div className="status">
            {finalWinner ? `🏆 המנצח הכולל: ${finalWinner}` : "🤝 תיקו כולל!"}
          </div>
          <button className="btn" onClick={restart}>משחק חדש 🔄</button>
        </>
      ) : (
        <>
          {/* לוח ניקוד - מציג את הניקוד של כל שחקן ומספר הסיבוב */}
          <div className="scoreboard">
            <span>X: {scores.X}</span>
            <span>סיבוב {round}/3</span>
            <span>O: {scores.O}</span>
          </div>

          {/* הודעת סטטוס - מציגים מנצח סיבוב / תיקו / תור נוכחי */}
          <div className="status">
            {winner
              ? `🎉 ${winner} ניצח בסיבוב!`
              : isDraw
              ? "🤝 תיקו!"
              : `תור: ${isX ? "X" : "O"}`}
          </div>

          {/* לוח המשחק - 9 כפתורים שמייצגים את התאים */}
          <div className="board">
            {board.map((cell, i) => (
              <button key={i} className={`cell ${cell}`} onClick={() => handleClick(i)}>
                {cell}
              </button>
            ))}
          </div>

          {/* כפתור "סיבוב הבא" - מופיע רק כשהסיבוב נגמר */}
          {roundOver && (
            <button className="btn" onClick={nextRound}>סיבוב הבא ▶</button>
          )}
        </>
      )}
    </div>
  );
}
