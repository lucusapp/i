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
  tallas: FormArray;

  constructor(
    private inv: InventarioService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.forma = this.inv.forma;
    // this.forma = new FormGroup({
    //   id: new FormControl(""),
    //   //'accion': new FormControl('Add'),
    //   titulo: new FormControl(""),
    //   marca: new FormControl(""),
    //   precio: new FormControl(""),
    //   categoria: new FormControl(""),
    //   caracteristicas: new FormControl(""),
    //   fecha: new FormControl(""),
    //   imagenes: new FormArray([new FormControl("")]),
    //   preCompra: new FormControl(""),
    //   comiPay: new FormControl("0"),
    //   comiEbay: new FormControl("0"),
    //   portes: new FormControl(),
    //   margen: new FormControl(this.producto.margen),
    //   // tallas: this.fb.array([
    //   //   this.crearTalla()
    //   // ])
    // });

    const id = this.route.snapshot.paramMap.get("id");
    console.log(id)

    if (id !== "nuevo") {
      this.inv.getProducto(id).subscribe((resp: interproductos) => {
        this.producto = resp;
        this.productos.push(resp);
        // this.tallas=resp.tallas

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
      });
    } else {
      this.forma.reset()
      
      
      
      // setValue({
      //   id: "nuevo",
      //   //'accion': new FormControl('Add'),
      //   titulo: "",
      //   marca: "",
      //   precio: "",
      //   categoria: "",
      //   caracteristicas: "",
      //   // fecha: "",
      //   imagenes: [""],
      //   preCompra: "",
      //   comiPay: "0",
      //   comiEbay: "0",
      //   portes: "",
      //   margen: ""
      //   //   tallas: ([""
      //   // ])
      // });
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

  agregarImagen() {
    (<FormArray>this.forma.controls["imagenes"]).push(new FormControl(""));
  }
  borrarImagen(i: number) {
    (<FormArray>this.forma.controls["imagenes"]).removeAt(i);
  }

  crearTalla(): FormGroup {
    return this.fb.group({
      talla: [""],
      cantidad: [""]
    });
  }

  agregartalla(): void {
    this.tallas = this.forma.get("tallas") as FormArray;
    this.tallas.push(this.crearTalla());
  }

  inicializar(){
    this.forma.reset()

  // (<FormArray>this.forma.controls["tallas"]).push(new FormControl(""))

//this.forma.controls["precio"].value(new FormControl);

  }
}