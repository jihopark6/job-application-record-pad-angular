import { Component, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [],
    templateUrl: './home.component.html',
})


export class HomeComponent {
    private readonly query = signal('');

    
    readonly filtered = computed(() => {
        const q = this.query().toLowerCase();
        return this.applicationService.applications().filter(
            (entry) => entry.company.toLowerCase().includes(q) || entry.job_title.toLowerCase().includes(q)
        );
    });

    constructor(private applicationService: ApplicationService, private router: Router) {}

    onSearch(value: string): void {
        this.query.set(value);
    }

    openEntry(id: string): void {
        this.router.navigate(['/edit', id]);
    }
}