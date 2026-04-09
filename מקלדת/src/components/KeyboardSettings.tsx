import { useState } from "react";
import type { KeyboardConfig, TypedChar } from "../types";
import { HEBREW_KEYS, ENGLISH_KEYS } from '../constants';
import WhichLanguage from "./WhichLanguage";

export default function KeyboardSetting() {
    
    const [currentConfig, setCurrentConfig] = useState<KeyboardConfig>({
        color: '#000000', // ברירת מחדל שחור
        fontSize: '18px',
        isBold: false,
        language: 'hebrew',
        isUpper: false
    });

    const [typedChars, setTypedChars] = useState<TypedChar[]>([]);

    const changeLanguage = () => {
        setCurrentConfig({ 
            ...currentConfig, 
            language: currentConfig.language === 'hebrew' ? 'english' : 'hebrew' 
        });
    };

    const addChar = (char: string) => {
        const newCharObj: TypedChar = {
            ...currentConfig,
            value: char,
            // אם החלטת לוותר על ה-ID, השתמשי בגרסה עם ה-index ב-map למטה
            id: Math.random().toString() 
        };
        setTypedChars([...typedChars, newCharObj]);
    };

    const activeLetters = currentConfig.language === 'hebrew' ? HEBREW_KEYS : ENGLISH_KEYS;

    return (
        <div className="keyboard-container" style={{ direction: 'rtl', padding: '20px' }}>
            
            {/* 1. אזור התצוגה */}
            <div className="display-area" style={{ minHeight: '50px', border: '1px solid #ccc', marginBottom: '20px', padding: '10px' }}>
                {typedChars.map((charObj) => (
                    <span key={charObj.id} style={{ 
                        color: charObj.color, 
                        fontSize: charObj.fontSize, 
                        fontWeight: charObj.isBold ? 'bold' : 'normal',
                    }}>
                        {charObj.value}
                    </span>
                ))}
            </div>

            {/* 2. כפתורי שליטה - כאן הוספתי את האפשרויות למשתמש */}
            <div className="controls" style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                
                {/* בחירת צבע חופשית */}
                <div>
                    <label>בחר צבע: </label>
                    <input 
                        type="color" 
                        value={currentConfig.color}
                        onChange={(e) => setCurrentConfig({...currentConfig, color: e.target.value})}
                    />
                </div>

                {/* בחירת גודל גופן */}
                <div>
                    <label>גודל: </label>
                    <select 
                        value={currentConfig.fontSize}
                        onChange={(e) => setCurrentConfig({...currentConfig, fontSize: e.target.value})}
                    >
                        <option value="14px">קטן</option>
                        <option value="18px">בינוני</option>
                        <option value="25px">גדול</option>
                        <option value="40px">ענק</option>
                    </select>
                </div>

                <button onClick={changeLanguage}>
                    שפה: {currentConfig.language === 'hebrew' ? 'עברית' : 'English'}
                </button>

                <button 
                    onClick={() => setCurrentConfig({...currentConfig, isBold: !currentConfig.isBold})}
                    style={{ fontWeight: currentConfig.isBold ? 'bold' : 'normal' }}
                >
                    {currentConfig.isBold ? 'B (מודגש)' : 'B (רגיל)'}
                </button>
            </div>

            {/* 3. המקלדת */}
            <div className="keys-grid" style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '600px', gap: '5px' }}>
                {activeLetters.map((char) => (
                    <WhichLanguage
                        key={char} 
                        char={currentConfig.isUpper ? char.toUpperCase() : char} 
                        language={currentConfig.language}
                        onClick={addChar} 
                    />
                ))}
            </div>
            
            <button style={{ marginTop: '20px', backgroundColor: '#ffcccc' }} onClick={() => setTypedChars([])}>
                נקה הכל
            </button>
        </div>
    );
}