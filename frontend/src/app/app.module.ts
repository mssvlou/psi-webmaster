import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SiteListComponent } from './site-list/site-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { WebsiteComponent } from './website/website.component';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { PageListComponent } from './page-list/page-list.component';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { WebsiteAnalysisComponent } from './website-analysis/website-analysis.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartInfoComponent } from './chart-info/chart-info.component';
import { DialogComponent } from './dialog/dialog.component';
import { PageEvaluationComponent } from './page-evaluation/page-evaluation.component';
import {MatCardModule} from '@angular/material/card'; 

@NgModule({
    declarations: [
        AppComponent,
        SiteListComponent,
        WebsiteComponent,
        PageListComponent,
        WebsiteAnalysisComponent,
        ChartInfoComponent,
        DialogComponent,
        PageEvaluationComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatChipsModule,
        MatListModule,
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        MatIconModule,
        MatDividerModule,
        MatToolbarModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatTabsModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatExpansionModule,
        NgApexchartsModule,
        ScrollingModule,
        MatCardModule,
    ]
})
export class AppModule { }
