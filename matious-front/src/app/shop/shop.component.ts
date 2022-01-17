import { Component, OnInit } from '@angular/core';

import {Product,Rating} from '../models/product.model';
import { ProductService } from './services/product.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(private _productService:ProductService) { }
  elementsPerPage = 5;
  products : Product[];
  productsFiltered : Product[];
  categories:string[];
  currentPageContent:Product[];
  currentPage = 1;
  totalPages:number;
  priceSortDirection = "asc";
  rateSortDirection = "asc";
  pages:number[];
  sortByPrice(){
    function ascCompare(product1:Product,product2:Product){
      if (product1.price>product2.price) return 1;
      else return -1;
    }
    function descCompare(product1:Product,product2:Product){
      if (product1.price<product2.price) return 1;
      else return -1;
    }
    if (this.priceSortDirection == "asc"){
      this.productsFiltered.sort(ascCompare);
      this.priceSortDirection = "desc";
    }
    else{
      this.productsFiltered.sort(descCompare);
      this.priceSortDirection = "asc";
    }
    //refresh page
    this.getPage(this.currentPage);
  }
  sortByRate(){
    function ascCompare(product1:Product,product2:Product){
      if (product1.rating.rate>product2.rating.rate) return 1;
      else return -1;
    }
    function descCompare(product1:Product,product2:Product){
      if (product1.rating.rate<product2.rating.rate) return 1;
      else return -1;
    }
    if (this.rateSortDirection == "asc"){
      this.productsFiltered.sort(ascCompare);
      this.rateSortDirection = "desc";
    }
    else{
      this.productsFiltered.sort(descCompare);
      this.rateSortDirection = "asc";
    }
    //refresh page
    this.getPage(this.currentPage);
  }
  updatePageCount(newTotal:number){
    const trun = Math.floor(this.productsFiltered.length / 5);
    if (trun < this.productsFiltered.length / 5){
      this.totalPages = trun + 1;
    }
    else{
        // égalité c'est à dire le cas où on a des produit multiple de 5
      this.totalPages = trun; 
    }
    this.pages = [...Array(this.totalPages).keys()];
    //if current page has been set to a page > to our total we gotta min it
    this.currentPage = Math.min(this.currentPage,this.totalPages);
  }
  filterByCategory(e:any){
    if (e!=null){
      if (e.value == "all"){
        this.productsFiltered = this.products;
      }
      else{
        this.productsFiltered = this.products.filter((product:Product)=>{return product.category == e.value});
        console.log(this.productsFiltered.length);
      }
    }
    this.updatePageCount(this.productsFiltered.length);
    this.getPage(this.currentPage);
  }
  getPage(page:number){
    // slice doesn't mutate the original array
    this.currentPageContent = this.productsFiltered.slice(this.elementsPerPage*(page-1) , this.elementsPerPage*page);
    this.currentPage = page;
  }
  changePage(target:any){
    if (target!=null){
      this.getPage(target.value);
    }
  }
  ngOnInit(){
    this._productService.getAllProducts()
    .subscribe( (data:Product[])=>{
      this.products = data;
      this.productsFiltered = data; 
      this.categories = [];
      for (let i=0 ; i<data.length;i++){
        if (this.categories.indexOf(data[i].category) <0){
          this.categories.push(data[i].category);
        }
      }
      const trun = Math.floor(this.productsFiltered.length / 5);
      if (trun<this.productsFiltered.length / 5){
        this.totalPages = trun+1;
      }
      else{
        // égalité c'est à dire le cas où on a des produit multiple de 5
        this.totalPages = trun; 
      }
      this.pages = [...Array(this.totalPages).keys()];
      this.getPage(this.currentPage);
    } )
    
  }

}
