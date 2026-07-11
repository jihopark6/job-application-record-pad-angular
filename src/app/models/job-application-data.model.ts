export type ApplicationStatus = 'applied' | 'interviewing' | 'offer' | 'rejected';

export interface JobApplication {
    id: string;
    date: string;
    company: string;
    job_title: string;
    job_posting?: string;
    contact_info?: string;
    status: ApplicationStatus;
}