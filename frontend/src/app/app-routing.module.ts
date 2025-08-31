import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WebsiteComponent } from './website/website.component';
import { SiteListComponent } from './site-list/site-list.component';
import { PageEvaluationComponent } from './page-evaluation/page-evaluation.component';

const routes: Routes = [
  { path: '', redirectTo: '/websites', pathMatch: 'full' },
  { path: 'website/:id', component: WebsiteComponent },
  { path: 'websites', component: SiteListComponent },
  { path: 'page/:id', component: PageEvaluationComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}