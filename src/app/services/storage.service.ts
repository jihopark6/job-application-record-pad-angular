import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' 
}) // Registers the service globally
export class StorageService {
    get<T>(key: string, defaultValue: T): T {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : defaultValue;
    }

    
    set<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}