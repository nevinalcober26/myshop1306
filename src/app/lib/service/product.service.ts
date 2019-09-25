import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from "lodash";

@Injectable()
export class productService {
    private base: string = './assets/json/';

    constructor(private http:HttpClient){}

    // Get Products
    getProduct(){
        return this.http.get(this.base + 'product.json');
    }

    // Get Product By Id
    getIdProduct(id: number){
        const promiseObj = new Promise((resolve, reject)=>{
            this.getProduct().subscribe(products =>{
                resolve(_.find(products,{id: id}));
            });
        });
        return promiseObj;
    }

    // Get Product By Slug
    getSlugProduct(slug: string){
        const promiseObj = new Promise((resolve, reject)=>{
            this.getProduct().subscribe(products =>{
                resolve(_.find(products,{slug: slug}));
            });
        });
        return promiseObj;
    }

    // Get Logo
    getLogo(){
      return this.http.get(this.base + 'logo.json');
    }

    // Get Category
    getCategory(){
      return this.http.get(this.base + 'category.json');
    }


    // Get Color
    getColor(){
        return this.http.get(this.base + 'color.json');
    }
}
