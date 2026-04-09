import { HEBREW_KEYS, ENGLISH_KEYS } from './constants';
// 1. הגדרת ה"חוזה" (Props)
interface LetterProps {
  char: string;     // האות עצמה (למשל 'א' או 'A')
  language: string; // השפה (למשל 'he' או 'en')
  // בהמשך תוסיפי כאן גם onClick כדי שהלחיצה תעבוד
}

// 2. הקומפוננטה
function WhichLanguage({ char, language }: LetterProps) {

  // כאן את יכולה להוסיף עיצוב שונה לפי השפה אם תרצי
const isHebrew = language === 'he';
const isEnglish = language === 'en';

  return (
  function LetterComponent({ char, language }: LetterProps) {
  return (
    <button className={`key ${language}`}> 
      {/* כאן האות מוצגת. אם ב-char יש 'א', יופיע 'א' */}
      {char}
    </button>
  );
}
  );
}

export default WhichLanguage;