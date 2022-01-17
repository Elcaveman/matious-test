import { Component, OnInit,Input,ViewEncapsulation } from '@angular/core';
import {Product,Rating} from '../models/product.model'
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product:Product;
  constructor() { }

  ngOnInit(): void {
  }

}
