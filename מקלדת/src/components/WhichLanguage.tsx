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
      // כאן אנחנו מפעילים את הפונקציה שהאבא שלח לנו
      onClick={() => onClick(char)}
      className={`key ${language}`}
      style={{
        width: '40px',
        height: '40px',
        margin: '2px',
        cursor: 'pointer',
        fontSize: '18px',
        // עיצוב דינמי קל כדי לראות שהשפה משפיעה
        backgroundColor: isHebrew ? '#e3f2fd' : '#f1f8e9',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}
    > 
      {char}
    </button>
  );
}

export default WhichLanguage;