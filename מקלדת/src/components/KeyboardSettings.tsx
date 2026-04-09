import { useState } from "react";
import type { KeyboardConfig, TypedChar } from "../types";
import { HEBREW_LAYOUT, ENGLISH_LAYOUT } from '../constants'; 
import WhichLanguage from "./WhichLanguage";
import "./KeyboardSettings.css";

export default function KeyboardSetting() {
    
    const [currentConfig, setCurrentConfig] = useState<KeyboardConfig>({
        color: '#2d3436', 
        fontSize: '20px',
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
            id: Math.random().toString() 
        };
        setTypedChars([...typedChars, newCharObj]);
    };

    const activeLayout = currentConfig.language === 'hebrew' ? HEBREW_LAYOUT : ENGLISH_LAYOUT;

    return (
        <div className="kb-container">
            <h3>מקלדת מעוצבת</h3>
            
            <div className="kb-display">
                {typedChars.length === 0 && <span className="kb-display-placeholder">התחילי להקליד...</span>}
                {typedChars.map((charObj) => (
                    <span key={charObj.id} style={{ 
                        color: charObj.color, 
                        fontSize: charObj.fontSize, 
                        fontWeight: charObj.isBold ? 'bold' : 'normal',
                    }}>
                        {charObj.value === ' ' ? '\u00A0' : charObj.value}
                    </span>
                ))}
            </div>

            <div className="kb-controls">
                <div className="kb-label-group">
                    <label>צבע:</label>
                    <input 
                        type="color" 
                        value={currentConfig.color}
                        onChange={(e) => setCurrentConfig({...currentConfig, color: e.target.value})}
                    />
                </div>

                <div className="kb-label-group">
                    <label>גודל:</label>
                    <select 
                        value={currentConfig.fontSize}
                        onChange={(e) => setCurrentConfig({...currentConfig, fontSize: e.target.value})}
                    >
                        <option value="16px">קטן</option>
                        <option value="20px">בינוני</option>
                        <option value="30px">גדול</option>
                    </select>
                </div>

                <button className="kb-btn" onClick={changeLanguage}>
                    {currentConfig.language === 'hebrew' ? 'עברית ↔ English' : 'English ↔ עברית'}
                </button>

                <button 
                    className={`kb-btn kb-btn-bold ${currentConfig.isBold ? 'active' : 'inactive'}`}
                    onClick={() => setCurrentConfig({...currentConfig, isBold: !currentConfig.isBold})}
                >
                    B
                </button>
            </div>

            <div key={currentConfig.language} className="kb-grid">
                {activeLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className="kb-row">
                        {row.map((char) => (
                            <WhichLanguage
                                key={char} 
                                char={currentConfig.isUpper ? char.toUpperCase() : char} 
                                language={currentConfig.language}
                                onClick={addChar} 
                            />
                        ))}
                    </div>
                ))}
                
                <button className="kb-space" onClick={() => addChar(' ')}>
                    {currentConfig.language === 'hebrew' ? 'רווח' : 'Space'}
                </button>
            </div>
            
            <button className="kb-clear" onClick={() => setTypedChars([])}>
                נקה הכל
            </button>
        </div>
    );
}
