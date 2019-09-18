import { Component, OnInit} from '@angular/core';
import { CommonModule } from "@angular/common";
import { ScrapeService } from '../../service/scrape.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { interproductos } from '../../models/termino';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`.ng-invalid.ng-touched:not (form){
    border: 1px solid red
  }`]
})
export class HomeComponent implements OnInit{
  
  
 
  imagenes:any[]=[]
  forma:FormGroup;
  url:FormGroup;
  productos:any []=[];
 
  constructor(private scrape:ScrapeService) {
    
    // console.log(this.imagenes);
    
    this.url= new FormGroup({
      'valor': new FormControl('')
    })
    console.log(this.url.value);

    this.forma=new FormGroup({
      '_id': new FormControl(''),
      'accion': new FormControl('Add'),
      'titulo': new FormControl('',Validators.maxLength(80)),
      'marca': new FormControl(''),
      'precio': new FormControl(''),
      'categoria': new FormControl(''),
      'caracteristicas': new FormControl(''),
      'imagenes': new FormControl('')
    })     
    console.log(this.forma.value);

  }
 
  
  ngOnInit(){
    
  }
  
  cargar(){
    this.scrape.getSuducto()
    .subscribe((data)=>{
      this.productos=(data);
      this.imagenes=(data.imagenes).split(',');
    //console.log(this.productos);
    //console.log(this.imagenes);
    this.forma.patchValue(this.productos)
    this.forma.setValue(this.imagenes)
  });
  }
  
  enviarUrl(){
          this.scrape.postScrape(this.url.value).subscribe(res=>{
            console.log(res);
          })
          
        this.forma.reset()
          console.log(this.url.value); 
        }

   enviarForm(){
    console.log(this.forma.value);
    this.scrape.postCsv(this.forma.value).subscribe(res=>{
      console.log(res);
    })
  }
        
       
        
        // this.forma=new FormGroup({
          //  // 'id': new FormControl(this.productos._id),
          //   'titulo': new FormControl(this.productos.titulo),
          //   'precio': new FormControl(this.productos.precio),
          //   'caracteristicas': new FormControl(this.productos.caracteristicas)
          // })
          
          // console.log(this.forma.value);
          
          
          
          // this.scrape.getScrape()
          // .subscribe((data:any)=>{
            //     this.productos=(data);
            //     // this.imagenes=(data.imagenes).split(',')
            //     console.log(this.productos)
            //     // console.log(this.imagenes);
            //     console.log(data.titulo);
            
            //   })
            
        //   console.log(this.forma.value);
        // }
        
      }
        
      
      
      
   
