import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { interproductos } from "../models/termino";
import { map, buffer } from "rxjs/operators";
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
  NgForm
} from "@angular/forms";

import * as Filesaver from "file-saver";
import * as XLSX from "xlsx";

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXT = ".xlsx";

@Injectable({
  providedIn: "root"
})
export class InventarioService {
  private url = "https://deniuater.firebaseio.com/";
  id: any;

  constructor(private http: HttpClient) {}

  forma = new FormGroup({
    id: new FormControl(""),
    //'accion': new FormControl('Add'),
    titulo: new FormControl(""),
    marca: new FormControl(""),
    precio: new FormControl("0"),
    categoria: new FormControl(""),
    caracteristicas: new FormControl(""),
    //fecha: new FormControl(""),
    imagenes: new FormArray([new FormControl("")]),
    preCompra: new FormControl(""),
    comiPay: new FormControl("0"),
    comiEbay: new FormControl("0"),
    portes: new FormControl(""),
    margen: new FormControl("")
    // tallas: this.fb.array([
    //   this.crearTalla()
    // ])
  });

  inicializar() {

    return this.forma.reset()
    this.forma.patchValue({
      id: "nuevo",
      //'accion': new FormControl('Add'),
      titulo: "",
      marca: "",
      precio: "0",
      categoria: "",
      caracteristicas: "",
      //fecha: "",
      imagenes: [""],
      preCompra: "",
      comiPay: "",
      comiEbay: "",
      portes: "",
      margen: ""
      //tallas: [""]
    });
  }

  crearProducto(producto: interproductos) {
    return this.http.post(`${this.url}/inventario.json`, producto).pipe(
      map((resp: any) => {
        producto.id = resp.name;
        return producto;
      })
    );
  }
  actualizarProducto(producto: interproductos) {
    return this.http.put(
      `${this.url}/inventario/${producto.id}.json`,
      producto
    );
  }

  getProducto(id: string) {
    return this.http.get(`${this.url}/inventario/${id}.json`);
  }

  getProductos() {
    return this.http
      .get(`${this.url}/inventario.json`)
      .pipe(map(this.crearArreglo));
  }

  borrarProducto(id: string) {
    return this.http.delete(`${this.url}/inventario/${id}.json`);
  }

  private crearArreglo(producObj: object) {
    const productos: interproductos[] = [];

    console.log(producObj);

    if (producObj === null) {
      return [];
    }

    Object.keys(producObj).forEach(key => {
      const producto: interproductos = producObj[key];
      producto.id = key;
      productos.push(producto);
    });
    return productos;
  }
  // FILE SAVER EXCEL

  exportToExcel(json: any[], excelFileName: string) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"]
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });
    //llamar al método buffer y filename
    this.saveAsExcel(excelBuffer, excelFileName);
  }

  private saveAsExcel(buffer: any, filename: string) {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    Filesaver.saveAs(data, filename) +
      "_export" +
      new Date().getTime() +
      EXCEL_EXT;
  }
}
