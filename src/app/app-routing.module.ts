import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CityComponent } from './pages/city/city.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { CurrencyComponent } from './pages/currency/currency.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DeclarationComponent } from './pages/declaration/declaration.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { OntheroadTableComponent } from './pages/ontheroad-table/ontheroad-table.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { ProductsComponent } from './pages/products/products.component';
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
    canActivate: [AuthGuard],
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'storage',
    component: StorageTableComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'ontheroad',
    component: OntheroadTableComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'partners',
    component: PartnersComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'currency',
    component: CurrencyComponent,
  },
  {
    path: 'cities',
    component: CityComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'declaration/:id',
    component: DeclarationComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'invoice/:id',
    component: InvoiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
