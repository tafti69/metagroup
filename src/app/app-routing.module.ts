import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { EditUserComponent } from './auth/edit-user/edit-user.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ChamosuliComponent } from './pages/chamosuli/chamosuli.component';
import { CityComponent } from './pages/city/city.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { CurrencyComponent } from './pages/currency/currency.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DeclarationComponent } from './pages/declaration/declaration.component';
import { FlightsViewComponent } from './pages/flights-view/flights-view.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { HowToComponent } from './pages/how-to/how-to.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { IssuedComponent } from './pages/issued/issued.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { OntheroadTableComponent } from './pages/ontheroad-table/ontheroad-table.component';
import { PartnersComponent } from './pages/partners/partners.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProhibitedItemsComponent } from './pages/prohibited-items/prohibited-items.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { StorageTableComponent } from './pages/storage-table/storage-table.component';
import { TarifsComponent } from './pages/tarifs/tarifs.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
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
    path: 'howto',
    component: HowToComponent,
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
    path: 'edituser',
    component: EditUserComponent,
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
    path: 'arrived',
    component: ChamosuliComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'issued',
    component: IssuedComponent,
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
    path: 'users',
    component: UsersComponent,
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
    path: 'tarifs',
    component: TarifsComponent,
  },
  {
    path: 'flights',
    component: FlightsComponent,
  },
  {
    path: 'flights-view',
    component: FlightsViewComponent,
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
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
