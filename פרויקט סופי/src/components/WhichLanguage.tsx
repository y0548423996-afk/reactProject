// 1. הגדרת ה"חוזה" (Props) - הוספנו את onClick
interface LetterProps {
  char: string;     // האות עצמה
  language: string; // השפה ('hebrew' או 'english')
  onClick: (char: string) => void; // פונקציה שמקבלת טקסט ולא מחזירה כלום
}

// 2. הקומפוננטה
function WhichLanguage({ char, language, onClick }: LetterProps) {
  
  // בדיקה פשוטה לצורך עיצוב
  const isHebrew = language === 'hebrew';

  return (
    <button 
      onClick={() => onClick(char)}
      className={`key ${language}`}
    > 
      {char}
    </button>
  );
}

export default WhichLanguage;