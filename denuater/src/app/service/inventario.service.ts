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
  fb: FormBuilder;



  
  constructor(private http: HttpClient, fb:FormBuilder) {

    
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
