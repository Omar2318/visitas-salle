export class Helpers {

    public static capitalizeWords(text: string): string {
        if (!text) return '';

        return text
            .trim()
            .split(/\s+/)
            .map(word =>
                word.charAt(0).toLocaleUpperCase('es') + word.slice(1).toLocaleLowerCase('es')
            )
            .join(' ');
    }
    
}