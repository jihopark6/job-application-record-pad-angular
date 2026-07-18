import { Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { Memo } from '../models/memo.model';

const STORAGE_KEY = 'memoData';

@Injectable({ providedIn: 'root' })
export class MemoService {
    private readonly _memos = signal<Memo[]>([]);
    readonly memos = this._memos.asReadonly();

    constructor(private storage: StorageService) {
        const storedMemos = this.storage.get<Memo[]>(STORAGE_KEY, []);
        if (storedMemos) {
            this._memos.set(storedMemos);
        }
    }

    forApplication(applicationId: string): Memo[] {
        return this._memos().filter((m) => m.applicationId === applicationId);
    }

    add(applicationId: string, content: string): void {
        const memo: Memo = {
            id: crypto.randomUUID(),
            applicationId,
            date: new Date().toISOString(),
           content,
        };
        this._memos.update((list) => [...list, memo]);
        this.persist();
    }

    delete(id: string): void {
        this._memos.update((list) => list.filter((m) => m.id !== id));
        this.persist();
    }




    deleteForApplication(applicationId: string): void {
        this._memos.update((list) => list.filter((m) => m.applicationId !== applicationId));
        this.persist();
    }

    private persist(): void {
        this.storage.set(STORAGE_KEY, this._memos());
    }
}