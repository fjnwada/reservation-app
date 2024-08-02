import { NgModule } from '@angular/core';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-listings.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { AuthGuard } from '../auth/shared/auth.guard';

const routes: Routes = [

  {path: 'products', component: ProductComponent,
    children: [
      {path: '', component: ProductListComponent},
      {path: ':productId', component: ProductDetailComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailComponent,
    ProductListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  providers: [],
  bootstrap: []
})
export class ProductModule { }
