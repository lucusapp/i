import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EbayService {
  readonly UrlApi = 'http://localhost:3000/api/scrape'

  readonly UrlApi2 = 'http://localhost:3000/api/scrape/data'

  constructor(private http:HttpClient) { }

  getInventario (){
    return this.http.get(this.UrlApi2)
    .pipe(map(data=>{
      return data['producto']
    }))
  }

  postproducto(producto){
    return this.http.post(this.UrlApi,producto)     
    }

  putproducto(producto){
      return this.http.post(this.UrlApi,`/$(producto._id)`,producto)     
      }
  deleteproducto(_id){
      return this.http.post(this.UrlApi,`/$(_id)`,)     
        }
  }
  //  let  params = new HttpParams().append('limit','2');
  //  params = params.append('offser','0');

  //  const headers = new HttpHeaders ({
  //   'token-usuario':'JOSEMANU-deniuate-SBX-9668815a4-65a8117b',
  //   // 'DevID':'ecae9e7b-b052-43bc-befb-e3b26c980629',
  //   // 'CertID':'SBX-668815a466cc-eeb0-444f-9b3c-0163'
  //  })


  //  return this.http.get(`http://localhost:3000`,{
  //     params,
  //     headers
  //  });
  
// }
