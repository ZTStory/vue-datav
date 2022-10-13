type BBStorageResult = string | null;

abstract class BBStorage {
    abstract getItem(key: string): Promise<BBStorageResult>;
    abstract setItem(key: string, value: string): Promise<void>;
}

class BBSessionStorage extends BBStorage {
    constructor() {
        super();
    }

    getItem(key: string): Promise<BBStorageResult> {
        return new Promise((resolve, reject) => {
            resolve(sessionStorage.getItem(key));
        });
    }

    setItem(key: string, value: string): Promise<void> {
        return new Promise((resolve, reject) => {
            sessionStorage.setItem(key, value);
            resolve();
        });
    }
}

class BBLocalStorage extends BBStorage {
    constructor() {
        super();
    }

    getItem(key: string): Promise<BBStorageResult> {
        return new Promise((resolve, reject) => {
            resolve(localStorage.getItem(key));
        });
    }

    setItem(key: string, value: string): Promise<void> {
        return new Promise((resolve, reject) => {
            localStorage.setItem(key, value);
            resolve();
        });
    }
}

export const StorageUtils = {
    sessionStorage: new BBSessionStorage(),
    localStorage: new BBLocalStorage(),
};
