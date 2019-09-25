import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Home
import { Home1Component } from './home/home1/home1.component';

// Products
import { DashboardProdut } from './product/dashboard/dashboard.component';
import { DetailProductComponent } from './product/detail-product/detail-product.component';
import { Product3Component } from './product/product3/product3.component';
import { CartComponent } from './product/cart/cart.component';
import { ShippingComponent } from './product/shipping/shipping.component';
import { ReceiptComponent } from './product/receipt/receipt.component';
import { WishlistComponent } from './product/wishlist/wishlist.component';
import { CompareComponent } from './product/compare/compare.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';

// ELements
import { DashboardELementComponent } from './element/dashboard-element/dashboard-element.component';
import { ProductElement } from './element/product/product.component';
import { FormControlComponent } from './element/form-control/form-control.component';
import { LayoutComponent } from './element/layout/layout.component';
import { ButtonComponent } from './element/button/button.component';
import { GridComponent } from './element/grid/grid.component';
import { TyphographyComponent } from './element/typhography/typhography.component';
import { HelperComponent } from './element/helper/helper.component';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home',  component: Home1Component },
    { path: 'shop',  component: DashboardProdut,
      children : [
        { path: '', redirectTo: '/shop/product3', pathMatch: 'full'  },
        { path: 'product3', component: Product3Component },
        { path: 'cart', component: CartComponent },
        { path: 'shipping', component: ShippingComponent },
        { path: 'receipt', component: ReceiptComponent },
        { path: 'wishlist',  component: WishlistComponent },
        { path: 'compare',  component: CompareComponent },
        { path: 'p/:detail', component: DetailProductComponent }
      ]
    },
    { path: 'element',  component: DashboardELementComponent,
      children : [
        { path: '', redirectTo: '/element/product', pathMatch: 'full'  },
        { path: 'product', component: ProductElement },
        { path: 'form', component: FormControlComponent },
        { path: 'layout', component: LayoutComponent },
        { path: 'button', component: ButtonComponent },
        { path: 'grid', component: GridComponent },
        { path: 'typography', component: TyphographyComponent },
        { path: 'helper', component: HelperComponent },
      ]
    },
    { path: 'contact',  component: ContactComponent },
    { path: '404',  component: NotFoundComponent },
    { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
