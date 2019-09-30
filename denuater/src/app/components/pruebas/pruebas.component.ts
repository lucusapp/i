import { Component, OnInit } from '@angular/core';
import{FormControl,FormArray,FormBuilder,FormGroup} from "@angular/forms";
import { InventarioService } from "src/app/service/inventario.service";


@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',

})
export class PruebasComponent implements OnInit {

 forma:FormGroup

  constructor(private fb:FormBuilder, private inv:InventarioService) { 

  }

  ngOnInit() {

   this.forma = this.fb.group({
      id: "merda",
      accion: "add",
      titulo: '',
      marca: '',
      precio: '',
      categoria: '',
      caracteristicas: '',
      imagenes: this.fb.array([new FormControl("")]),
      conta: this.fb.array([
        this.addconta()
      ]),
      // tallas: this.fb.array([
      //     this.crearTalla()
      //   ])
      }) 
    
    }
    
    addconta():FormGroup{
      return this.fb.group({
        fecha: [''],
        preCompra: [''],
        comiPay: [''],
        comiEbay: [''],
        portes: [''],
        margen: ['']
      })

  }
}