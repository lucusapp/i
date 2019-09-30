import { Component, OnInit,ViewChild } from '@angular/core';
import { InventarioService } from 'src/app/service/inventario.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog,MatDialogConfig,MatButtonModule,MatIconModule, throwMatDialogContentAlreadyAttachedError} from '@angular/material';
import { ProductoComponent } from '../../producto/producto.component';



@Component({
  selector: 'app-inv-material',
  templateUrl: './inv-material.component.html',
 
})
export class InvMaterialComponent implements OnInit {

  constructor(private invSer:InventarioService,
              private dialog: MatDialog,) { }

  listData: MatTableDataSource<any>;
  displayedColumns:string[]=['titulo','caracteristicas','precio','marca','categoria','imagenes','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  searchKey:string


  ngOnInit() {
    this.invSer.getProductos().subscribe(
      list=>{
       let array=list.map(producto=>{
          return producto
        })
        console.log(array)
        this.listData = new MatTableDataSource(array);
        this.listData.sort=this.sort;
        this.listData.paginator=this.paginator
        console.log(this.listData)
    })
  }
  onsearchClear(){
    this.searchKey="";
    this.applyfilter()
  }

  applyfilter(){
    this.listData.filter =this.searchKey.trim().toLowerCase()
  }

  onCreate(){

    
    const DialogConfig = new MatDialogConfig();
    DialogConfig.disableClose = false,
    DialogConfig.autoFocus = false,
    this.dialog.open(ProductoComponent, DialogConfig)

  }

  exportAsXLSX(){
    this.invSer.exportToExcel(this.listData.data,'my_export');
  }

}
