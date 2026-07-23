import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationService } from '../../services/application.service';
import { MemoService } from '../../services/memo.service';

@Component({
    selector: 'app-memo',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './memo.component.html',
})
export class MemoComponent {
    get applications() {
      return this.applicationService.applications;
    }
    form!: FormGroup<{ job_application: FormControl<string>; memo_content: FormControl<string> }>;

    constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationService,
    private memoService: MemoService,
    private router: Router,
    ) {
        this.form = this.fb.nonNullable.group({
            job_application: ['', Validators.required],
            memo_content: ['', Validators.required],
        });
    }

    submit(): void {
        if (this.form.invalid) return;
        const { job_application, memo_content } = this.form.getRawValue();
        this.memoService.add(job_application, memo_content);
        alert('Memo added successfully!');
        this.router.navigate(['/']);
    }

    cancel(): void {
        this.router.navigate(['/']);
    }
}