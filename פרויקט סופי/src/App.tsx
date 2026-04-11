import { useEffect, useState } from "react";
import KeyboardSetting from "./components/KeyboardSettings";
import TicTacToe from "./components/TicTacToe";
import "./App.css";

export default function App() {
    // 1. כאן כותבים את ה-State (ממש בתחילת הפונקציה)
    const [timeLeft, setTimeLeft] = useState(30);
    const [isGameActive, setIsGameActive] = useState(false);

    // 2. כאן יבוא ה-useEffect של הטיימר (כפי שהסברתי קודם)
    useEffect(() => {
        let timer: number;
        if (isGameActive && timeLeft > 0) {
            timer = window.setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 500);
        }
        return () => clearInterval(timer); // הניקוי החשוב!
    }, [isGameActive, timeLeft]);

    return (
        <div className="App">
            {/* 3. כאן בתצוגה נשתמש במשתנים האלו */}
            <div className="timer-display">זמן נותר: {timeLeft}</div>

            {!isGameActive ? (
                // אם המשחק לא פעיל - מראים מקלדת וכפתור התחלה
                <>
                    <button onClick={() => setIsGameActive(true)}>התחל משחק</button>
                    <KeyboardSetting />
                </>
            ) : (
                // אם המשחק פעיל - המקלדת נעלמת ומראים את אזור המשחק
                <div className="game-area">
                    {timeLeft > 0 ? (
                        <TicTacToe></TicTacToe>
                    ) : (
                        <h2 style={{ color: 'red' }}>GAME OVER</h2>
                    )}
                    <button onClick={() => { setIsGameActive(false); setTimeLeft(60); }}>
                        חזור למקלדת / איפוס
                    </button>
                </div>
            )}
        </div>
    );
}