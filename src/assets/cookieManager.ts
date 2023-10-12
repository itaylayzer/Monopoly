export class CookieManager {
    // Set a cookie with a given name, value, and optional expiration date.
    public static set(name: string, value: string, daysToExpire?: number): void {
        let cookieString = `${name}=${value}`;
        if (daysToExpire) {
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + daysToExpire);
            cookieString += `; expires=${expirationDate.toUTCString()}`;
        }
        document.cookie = cookieString;
    }

    // Get the value of a cookie by its name.
    public static get(name: string): string | null {
        const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split("=");
            if (cookieName === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    }

    // Check if a cookie with the given name exists.
    public static has(name: string): boolean {
        return this.get(name) !== null;
    }

    // Delete a cookie by setting its expiration date to the past.
    public static delete(name: string): void {
        this.set(name, "", -1);
    }

    // Get a typed value from a cookie (string, number, or boolean).
    public static getTyped<T extends string | number | boolean>(name: string): T | null {
        const value = this.get(name);
        if (value === null) {
            return null;
        }

        if (typeof value === "string") {
            if (value.toLowerCase() === "true") {
                return true as T;
            } else if (value.toLowerCase() === "false") {
                return false as T;
            } else if (/^-?\d+(\.\d+)?$/.test(value)) {
                return parseFloat(value) as T;
            } else {
                return value as T;
            }
        }

        return value as T;
    }
}
