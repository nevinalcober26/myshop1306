import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CookieService } from '../../lib/service/cookie.service';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
    selector: 'app-shipping',
    templateUrl: './shipping.component.html',
    styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
    public productsOrder = [];
    public total: number; 
    public subTotal: number; 
    public promo: string;
    public promoValue: number = 0;    
    public nottouched = true;
    public touched = false;
    
    public country;
    public state;
    public city;
    public zipcode;
    public address;
    public phone;
    public lastname;
    public firstname;
    public email;

    public payPalConfig?: IPayPalConfig;
    
    constructor(
        private router: Router,
        private cookie: CookieService,
        public snackBar: MatSnackBar, 
    ) {}

    ngOnInit() {
        var products = this.cookie['productsOrder'];
        _.map(products, (x)=>{
            return x.slug = _.kebabCase(x.slug)
        });
        this.productsOrder = products;
        this.promo = JSON.stringify(this.cookie['promo']);
        this.promoValue = this.cookie['promoValue'];
        this.subTotal = this.cookie['subtotal'];                
        this.total = this.cookie['subtotal'] - this.promoValue;  
        if(this.total < 0){
            this.total = 0;
        }
        if(this.productsOrder.length == 0){
            this.router.navigate(['/shop/cart']);
        }   
        
        this.initConfig();
    }

    // ================================== //
    // Open Popup Checkout Strip JS
    // ================================== //
    submitStripJS(form) {
        console.log(form.value); // Object Shipping Object
        console.log(this.cookie['productsOrder']); // Array Obect Products order
        console.log(this.cookie['promo']); // Object Promo
        console.log(this.cookie['promoValue']); // Object Promo Value From calculation
        console.log(this.cookie['subtotal']); // Object Sub Total     
        
        this.nottouched = false;
        this.touched = true;

        var handler = (<any>window).StripeCheckout.configure({
            key: 'pk_test_RdW4DTIQXiTLULbUy1vnQUsV',
            locale: 'auto',
            token: (token: any) => {
                // You can access the token ID with `token.id`.
                // Get the token ID to your server-side code for use.
                // Documentation charge https://stripe.com/docs/charges
                console.log(token.id);
                this.cookie.addCookie('payed', 'payed');
                this.cookie.removeCookie('products');                           
                this.cookie.removeCookie('promo');                           
                this.cookie.removeCookie('promoValue');                           
                this.cookie.removeCookie('subtotal');    
                setTimeout(()=>{
                    this.router.navigate(['/shop/receipt']);
                }, 1000);                      
            },
            closed : () =>{
                this.nottouched = true;
                this.touched = false;
            }
        });
        
        console.log(this.total);
        // handler Open
        handler.open({
            image: '/assets/images/brand/logo-stripe.jpg',
            name: 'Angushop',
            description: 'Complete payment',
            amount: this.total
        });
    }

    // ================================== //
    // Init Config Paypal
    // ================================== //
    private initConfig(): void {
        let items = [];
        this.productsOrder.map((x)=>{
            let obj ={
                name: x.productName,
                quantity: x.quantity,
                unit_amount: {
                    currency_code: 'USD',
                    value: x.price,
                },
            };
            items.push(obj);
        });


        this.payPalConfig = {
            currency: 'USD',
            clientId: 'sb',
            createOrderOnClient: (data) => <ICreateOrderRequest>{
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: this.total.toString(),
                            breakdown: {
                                item_total: {
                                    currency_code: 'USD',
                                    value: this.total.toString()
                                }
                            }
                        },
                        items: items
                    }
                ]
            },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'vertical'
            },
            onApprove: (data, actions) => {
                console.log('onApprove - transaction was approved, but not authorized', data, actions);
                actions.order.get().then(details => {
                    console.log(data,actions);
                    this.cookie.addCookie('payed', 'payed');
                    this.cookie.removeCookie('products');                           
                    this.cookie.removeCookie('promo');                           
                    this.cookie.removeCookie('promoValue');                           
                    this.cookie.removeCookie('subtotal');  
                    
                    this.snackBar.open('Success paypal payment', '', {
                        duration: 2000,
                    }); 
                    setTimeout(()=>{
                        this.router.navigate(['/shop/receipt']);
                    }, 1000);  
                    console.log('onApprove - you can get full order details inside onApprove: ', details);
                });
            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
            },
            onError: err => {
                console.log('OnError', err);
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
            },
        };
    }
}
