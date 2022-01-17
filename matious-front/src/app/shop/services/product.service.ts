import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Resolve } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Product,Rating } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService{
  private elementsPerPage = 5;
  constructor(private _http: HttpClient) {
  }
  //? pagination should be implemented in the backend
  getAllProducts():Observable<Product[]>{
    //fetch https://fakestoreapi.com/products
    return this._http.get<Product[]>("https://fakestoreapi.com/products");
    
  }

}
