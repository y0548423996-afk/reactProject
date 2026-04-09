import { useState } from "react";
import { KeyboardConfig, TypedChar } from "../types";
import { HEBREW_KEYS, ENGLISH_KEYS } from '../constants';
import WhichLanguage from "./WhichLanguage";

export default function KeyboardSetting() {
    
    // 1. הסטייט המרכזי של ההגדרות
    const [currentConfig, setCurrentConfig] = useState<KeyboardConfig>({
        color: 'black',
        fontSize: '18px',
        isBold: false,
        language: 'hebrew', // או 'english'
        isUpper: false
    });

    // 2. סטייט למערך התווים שהוקלדו
    const [typedChars, setTypedChars] = useState<TypedChar[]>([]);

    // --- פונקציות עזר (כבר היו לך) ---
    const changeLanguage = () => {
        setCurrentConfig({ 
            ...currentConfig, 
            language: currentConfig.language === 'hebrew' ? 'english' : 'hebrew' 
        });
    };

    const addChar = (char: string) => {
        // כאן קורה הקסם: האות מקבלת את העיצוב שיש באותו רגע ב-currentConfig
        const newCharObj: TypedChar = {
            ...currentConfig,
            value: char,
            id: Math.random().toString()
        };
        setTypedChars([...typedChars, newCharObj]);
    };

    // בחירת האותיות להצגה לפי השפה בסטייט
    const activeLetters = currentConfig.language === 'hebrew' ? HEBREW_KEYS : ENGLISH_KEYS;

    return (
        <div className="keyboard-container" style={{ direction: 'ltr', padding: '20px' }}>
            
            {/* 1. אזור התצוגה (איפה שהטקסט מופיע) */}
            <div className="display-area" style={{ minHeight: '50px', border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
                {typedChars.map(charObj => (
                    <span key={charObj.id} style={{ 
                        color: charObj.color, 
                        fontSize: charObj.fontSize, 
                        fontWeight: charObj.isBold ? 'bold' : 'normal',
                        textTransform: charObj.isUpper ? 'uppercase' : 'lowercase'
                    }}>
                        {charObj.value}
                    </span>
                ))}
            </div>

            {/* 2. כפתורי שליטה (צבע, שפה וכו') */}
            <div className="controls" style={{ marginBottom: '10px' }}>
                <button onClick={changeLanguage}>שנה שפה ({currentConfig.language})</button>
                <button onClick={() => setCurrentConfig({...currentConfig, isBold: !currentConfig.isBold})}>
                    {currentConfig.isBold ? 'בטל הדגשה' : 'הדגש'}
                </button>
                {/* כאן תוכלי להוסיף כפתורי צבע וגודל */}
            </div>

            {/* 3. המקלדת הדינמית */}
            <div className="keys-grid" style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '600px' }}>
                {activeLetters.map((char) => (
                    <WhichLanguage
                        key={char} 
                        char={currentConfig.isUpper ? char.toUpperCase() : char} 
                        language={currentConfig.language}
                        onClick={addChar} // מעבירים את הפונקציה שמוסיפה למערך
                    />
                ))}
            </div>
            
            <button onClick={() => setTypedChars([])}>נקה הכל</button>
        </div>
    );
}
