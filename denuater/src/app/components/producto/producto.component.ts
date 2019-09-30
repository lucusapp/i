import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
  NgForm
} from "@angular/forms";
import { interproductos,tallas } from "src/app/models/termino";
import { InventarioService } from "src/app/service/inventario.service";
import Swal from "sweetalert2";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-producto",
  templateUrl: "./producto.component.html"
})
export class ProductoComponent implements OnInit {
  forma: FormGroup;
  producto = new interproductos();
  productos = [];
  imagenes = [];
  tallas= [];

  

  constructor(
    private inv: InventarioService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
  this.forma = this.fb.group({
      id: 'salchicha',
      accion: 'add',
      titulo: '',
      marca: '',
      precio: '',
      categoria: '',
      caracteristicas: '',
      imagenes: this.fb.array([new FormControl("")]),
      conta: this.fb.array([
        this.addconta()
      ]),
      tallas: this.fb.array([
          this.crearTalla()
        ])  
      })
      
      

    const id = this.route.snapshot.paramMap.get("id");
    console.log(id)

    if (id !== "nuevo") {
      this.inv.getProducto(id).subscribe((resp: interproductos) => {
        this.producto = resp;
        this.productos.push(resp);
        this.tallas=resp.tallas

        console.log(this.producto);
        this.imagenes = resp.imagenes;
        console.log(this.imagenes);

        this.producto.id = id;
        this.forma.patchValue(this.producto);

        const pictures = this.forma.get("imagenes") as FormArray;
        console.log(pictures.value);
        while (pictures.length) {
          pictures.removeAt(0);
        }
        console.log(pictures.value);
        resp.imagenes.forEach(picture =>
          pictures.push(new FormControl(picture))
        );
        console.log(pictures.value);

        const tamanos = this.forma.get ("tallas") as FormArray;
        while (tamanos.length){
          tamanos.removeAt(0)
        }

         resp.tallas.forEach(tamano=>
          tamanos.push(new FormControl(tamano)))
            
      });
    } else {
      this.forma.reset()
    }
  }
  enviar(forma: NgForm) {
    if (this.forma.invalid) {
      return;
    }
    console.log("formulario no valido", this.forma);

    Swal.fire({
      title: "Espere por favor",
      text: "La información está siendo actualizada",
      type: "info",
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;
    if (this.producto.id) {
      peticion = this.inv.actualizarProducto(this.forma.value);
    } else {
      peticion = this.inv.crearProducto(this.forma.value);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.producto.titulo,
        text: "Se actualizó correctamente",
        type: "success"
      });
    });
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


  agregarImagen() {
    (<FormArray>this.forma.controls["imagenes"]).push(new FormControl(""));
  }
  borrarImagen(i: number) {
    (<FormArray>this.forma.controls["imagenes"]).removeAt(i);
  }

  agregarConta(){

    const conta = <FormArray>(this.forma.controls["conta"]);
    conta.push(this.addconta())
  }

  crearTalla(): FormGroup {
    return this.fb.group({
      talla: [""],
      cantidad: [""]
    });
  }

  agregartalla(): void {
    (<FormArray>this.forma.controls["tallas"]).push(this.crearTalla())
  }

  borrarTalla(i:number){
    (<FormArray>this.forma.controls["tallas"]).removeAt(i);
  }
  

  inicializar(){
    this.forma.reset()

  // (<FormArray>this.forma.controls["tallas"]).push(new FormControl(""))
  //this.forma.controls["precio"].value(new FormControl);

  }
}
