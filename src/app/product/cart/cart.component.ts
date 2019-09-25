import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CookieService } from '../../lib/service/cookie.service';
import * as _ from "lodash";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
    public productsOrder = [];
    public subTotal: any;
    public promoValue: number = 0;
    public total: number;
    public promoInit: any = "";

    constructor(
        private cookie: CookieService,
        public snackBar: MatSnackBar,
    ){}

    ngOnInit() {
        var products = this.cookie['productsOrder'];

        _.map(products, (x)=>{
            if(x.quantity >= x.stock){
                return x.quantity = x.stock;
            }
            return x.slug = _.kebabCase(x.slug)
        });

        this.productsOrder = products;
        this.cookie.addCookie('subtotal', JSON.stringify(this.total));


        this.initTotal(this.productsOrder);
    }

    // InitSubtotal
    initTotal(products){
        var prices = [];
        _.map(products, (x)=>{
            return prices.push(x['price'] * x['quantity']);
        });

        // Subtotal
        this.subTotal = _.reduce(prices, function(sum, n) {
            return sum + n;
        }, 0);

        // Total
        this.total = this.subTotal - this.promoValue;
        this.cookie.addCookie('subtotal', JSON.stringify(this.subTotal));
    }

    // On Chage Quantity
    onChage(product){
        if(product.quantity == null || product.quantity == 0){
            product.quantity = 1;
        }

        if(product.quantity >= product.stock){
            product.quantity = product.stock;
        }
        this.initTotal(this.productsOrder);
        this.cookie.addCookie('products', JSON.stringify(this.productsOrder));
    }

    // Delete Product on cart
    deleteProduct(index){
        _.remove(this.productsOrder, (n) => {
            return n.id == index;
        });
        this.initTotal(this.productsOrder);
        this.cookie.addCookie('products', JSON.stringify(this.productsOrder));

        if(this.productsOrder.length == 0){
            this.promoValue = 0;
            this.promoInit = "";
            this.total = 0;
        }
    }





    // Snack Bar
    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
    }
}
