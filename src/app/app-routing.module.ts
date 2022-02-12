import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProhibitedItemsComponent } from './pages/prohibited-items/prohibited-items.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { StorageTableComponent } from './pages/storage-table/storage-table.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'prohibiteditems',
    component: ProhibitedItemsComponent,
  },
  {
    path: 'shops',
    component: ShopsComponent,
  },
  {
    path: 'contacts',
    component: ContactsComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'storage',
    component: StorageTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
