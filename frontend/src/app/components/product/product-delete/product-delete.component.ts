import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  product: Product = {
    id: 0,
    name : '',
    price:  ''
  }

  constructor(private productService: ProductService
    , private router: Router
    , private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id') ;
    if (id == null){ id = '1'}
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    })
  }

  deleteProduct(): void{
    let id = this.route.snapshot.paramMap.get('id') ;
    if (id == null){ id = '1'}
    this.productService.delete(id).subscribe(()=>{
      this.productService.showMessage('Produto foi excluido');
      this.router.navigate(['/products']);
    })  
  }
  cancel(): void{
    this.router.navigate(['/products'])
  }

}
