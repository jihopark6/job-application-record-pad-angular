import { Injectable, signal } from '@angular/core';
import { StorageService } from './storage.service';
import { JobApplication } from '../models/job-application-data.model';

const STORAGE_KEY = 'applicationData';

@Injectable({ providedIn: 'root' })
export class ApplicationService {


    private readonly _applications = signal<JobApplication[]>([]);

    constructor(private storage: StorageService) {
        const stored = this.storage.get<JobApplication[]>(STORAGE_KEY, []);
        this._applications.set(stored);
    }
    readonly applications = this._applications.asReadonly();

    getById(id: string): JobApplication | undefined {
        return this._applications().find((a) => a.id === id);
    }

    add(entry: Omit<JobApplication, 'id'>): JobApplication {
        const created: JobApplication = { ...entry, id: crypto.randomUUID() };
        this._applications.update((list) => [created, ...list]);
        this.persist();
        return created;
    }

    update(id: string, changes: Omit<JobApplication, 'id'>): void {
        this._applications.update((list) =>
            list.map((a) => (a.id === id ? { ...changes, id } : a))
        );
        this.persist();
    }

    delete(id: string): void {
        this._applications.update((list) => list.filter((a) => a.id !== id));
        this.persist();
    }

    private persist(): void {
        this.storage.set(STORAGE_KEY, this._applications());
    }
}
