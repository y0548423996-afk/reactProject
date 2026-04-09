// 1. הגדרת המאפיינים של המקלדת (ההגדרות הנוכחיות)
export interface KeyboardConfig {
    color: string;
    fontSize: string;
    isBold: boolean;
    language: 'hebrew' | 'english';
    isUpper: boolean;
}

export interface TypedChar extends KeyboardConfig {
    value: string;
}
