
const messagesValidation = (key: string) => {
    if (key === 'id') {
        return `${key} in valid format`
    }
    if (key === 'take' || key === 'skip') {
        return `${key} must be a valid number`
    }
}

export class Validation {
    private rules: Map<string, (value: string) => boolean>;

    constructor(rules: Map<string, (value: string) => boolean>) {
        this.rules = rules;
    }

    validate(searchParams: URLSearchParams): { error: Record<string, string> | null } {
        const result = Array.from(this.rules.entries()).reduce((acc, [key, validator]) => {
            const value = searchParams.get(key);

            if (value && !validator(value)) {
                acc.error['message'] = `${messagesValidation(key)}`;
            }
            return acc;
        }, { error: {} } as { error: Record<string, string> });

        return Object.keys(result.error).length > 0 ? result : { error: null };
    }

    addRule(key: string, validator: (value: unknown) => boolean): void {
        this.rules.set(key, validator);
    }
};