import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ApplicationService } from '../../services/application.service';
import { MemoService } from '../../services/memo.service';

@Component({
    selector: 'app-application-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './application-form.component.html',
})
export class ApplicationFormComponent implements OnInit {
    editId: string | null = null;
    companySuggestions = signal<string[]>([]);

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private applicationService: ApplicationService,
        private memoService: MemoService,
    ) {
        this.form = this.fb.nonNullable.group({
            application_date: ['', Validators.required],
            company: ['', Validators.required],
            job_title: ['', Validators.required],
            job_posting: [''],
            contact_info: [''],
            status: ['applied' as const],
        });
    }

    ngOnInit(): void {
        this.editId = this.route.snapshot.paramMap.get('id');
        if (this.editId) {
        const entry = this.applicationService.getById(this.editId);
        if (entry) this.form.patchValue(entry);
        }
    }

    get memos() {
        return this.editId ? this.memoService.forApplication(this.editId) : [];
    }

    submit(): void {
        if (this.form.invalid) return;
        const value = this.form.getRawValue();

        if (this.editId) {
        this.applicationService.update(this.editId, value);
        } else {
        this.applicationService.add(value);
        }
        this.router.navigate(['/']);
    }

    cancel(): void {
        this.router.navigate(['/']);
    }

    delete(): void {
        if (!this.editId || !confirm('Are you sure you want to delete this application?')) return;
        this.memoService.deleteForApplication(this.editId);
        this.applicationService.delete(this.editId);
        this.router.navigate(['/']);
    }

    deleteMemo(memoId: string): void {
        if (confirm('Are you sure you want to delete this memo?')) this.memoService.delete(memoId);
    }
}