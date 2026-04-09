// 1. הגדרת המאפיינים של המקלדת (ההגדרות הנוכחיות)
export interface KeyboardConfig {
    color: string;
    fontSize: string;
    isBold: boolean;
    language: 'hebrew' | 'english';
    isUpper: boolean;
}

// 2. הגדרת המבנה של "אות שהוקלדה"
// שימי לב: עכשיו זה עושה extends ל-KeyboardConfig הנכון
export interface TypedChar extends KeyboardConfig {
    value: string;
    id: string;
}
