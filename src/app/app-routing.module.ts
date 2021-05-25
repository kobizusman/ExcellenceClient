import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { BusinessPartnersComponent } from './components/business-partners/business-partners.component';
import { CreateBusinessPartnersComponent } from './components/create-business-partners/create-business-partners.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent,  },
  { path: 'businessPartners/list', component: BusinessPartnersComponent },
  { path: 'businessPartner/new', component: CreateBusinessPartnersComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
