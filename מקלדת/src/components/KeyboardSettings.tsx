import { useState } from "react";
import { KeyboardConfig, TypedChar } from "./types";

type KeyboardSettingProps = {
    // כאן תוכלי להוסיף Props אם תרצי שהאבא יעביר לה משהו
}

export default function KeyboardSetting(props: KeyboardSettingProps) {
    
    // 1. הסטייט המרכזי שכולל את כל המאפיינים (ההגדרות) של הטקסט העכשווי
    const [currentConfig, setCurrentConfig] = useState<KeyboardConfig>({
        color: 'black',        // צבע
        fontSize: '18px',      // גודל
        isBold: false,         // מודגש
        language: 'hebrew',    // שפה (עברית/אנגלית)
        isUpper: false         // LOWER-UPPER case
    });

    // 2. סטייט למערך התווים שהוקלדו (כדי לשמור כל אות עם העיצוב הייחודי שלה)
    const [typedChars, setTypedChars] = useState<TypedChar[]>([]);

    // --- פונקציות לשינוי המאפיינים (Setters) ---

    const toggleBold = () => {
        setCurrentConfig({ ...currentConfig, isBold: !currentConfig.isBold });
    };

    const changeColor = (newColor: string) => {
        setCurrentConfig({ ...currentConfig, color: newColor });
    };

    const changeSize = (newSize: string) => {
        setCurrentConfig({ ...currentConfig, fontSize: newSize });
    };

    const changeLanguage = () => {
        setCurrentConfig({ 
            ...currentConfig, 
            language: currentConfig.language === 'hebrew' ? 'english' : 'hebrew' 
        });
    };

    const toggleCase = () => {
        setCurrentConfig({ ...currentConfig, isUpper: !currentConfig.isUpper });
    };

    // --- פונקציה להוספת תו המשתמשת במאפיינים העכשוויים ---
    const addChar = (char: string) => {
        const newCharObj: TypedChar = {
            ...currentConfig, // "צילום" של כל ההגדרות מהסטייט ברגע הלחיצה
            value: char,
            id: Math.random().toString()
        };
        setTypedChars([...typedChars, newCharObj]);
    };

    return (
        <div className="keyboard-settings-wrapper">
            {/* כאן תבני את הממשק שישתמש בסטייט ובפונקציות האלו */}
        </div>
    );
}