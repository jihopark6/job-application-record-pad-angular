# Job Application Record Pad — Angular

A single-page app for tracking job applications: log a new application, edit or delete it, attach dated memos/notes to it, and search the list by company or job title. All data is persisted client-side in `localStorage` — no backend required.

This is an Angular rewrite of an original [vanilla JS implementation](https://github.com/jihopark6/job-application-record-pad). The rewrite keeps the same feature set and page layout but restructures the app around Angular's component/service model instead of hand-rolled DOM manipulation.

## Tech merit

- **Angular 21** with standalone components (no `NgModule`) and the modern control-flow syntax (`@for`, `@if`, `@empty`) in templates.
- **Signals** for state (`signal`/`computed`) instead of manual change detection or RxJS subjects — services expose read-only signals (`.asReadonly()`) so components can only read state, not mutate it directly.
- **Reactive Forms** (`FormBuilder`, `ReactiveFormsModule`, validators) drive the application and memo forms, replacing manual form-field wiring from the vanilla version.
- **Hash-based routing** (`provideRouter(routes, withHashLocation())`) with three routes — `/` (home/list), `/new` and `/edit/:id` (shared form component), `/memo` — so the app can be hosted as static files without server-side rewrite rules.
- **Service-oriented persistence**: a generic `StorageService` wraps `localStorage`, and `ApplicationService`/`MemoService` layer typed CRUD operations and signal-based state on top of it, decoupling components from storage details.
- **Typed domain models** (`JobApplication`, `Memo`) with a constrained `ApplicationStatus` union type instead of loose strings.
- Build tooling via Angular CLI (`@angular/build`), with **Vitest** configured as the unit test runner.

## Project structure

```
src/app/
├── app.ts / app.html / app.config.ts / app.routes.ts   # Root component, routing, and app-wide providers
├── components/
│   ├── home/                 # Application list + search
│   ├── application-form/     # Add/edit form, reused for /new and /edit/:id, shows memos for an entry
│   └── memo/                 # Standalone form to attach a memo to an existing application
├── models/
│   ├── job-application-data.model.ts   # JobApplication + ApplicationStatus
│   └── memo.model.ts                   # Memo
└── services/
    ├── storage.service.ts       # Thin localStorage wrapper (get/set with JSON serialization)
    ├── application.service.ts   # Signal-backed CRUD for job applications
    └── memo.service.ts          # Signal-backed CRUD for memos, scoped by applicationId
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
