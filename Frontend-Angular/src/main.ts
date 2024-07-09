import { enableProdMode, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';


import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection(),
  ]
});

// Uopgraded starter project from angular 15 to 18 to use current best practises.

// Change to use  standalone design. Remove ngModule.

// Migrated to zoneless architecture for improved change detection and performance.