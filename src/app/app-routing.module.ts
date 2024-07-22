import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-listings.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductModule } from './product/product.module';

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
//  {path: '', component: ProductListComponent},
//  {path: 'detail', component: ProductDetailComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ProductModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
