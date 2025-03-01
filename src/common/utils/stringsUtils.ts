// pchips-v3/src/common/utils/stringUtils.ts

export class RegExHandler {
    // Validates if the input contains only alphanumeric characters
    static isAlphanumeric(input: string): boolean {
        const regex = /^[a-zA-Z0-9]*$/;
        return regex.test(input);
    };

    // Validates if the input contains mail format
    static isEmail(input: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(input);
    };

    // Validates if the input ocntains party name format
    static isPartyName(input: string): boolean {
        const regex = /^[A-Za-z0-9 _'-]$/;
        return regex.test(input);
    };
};