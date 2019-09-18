import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ScrapeService {
  readonly UrlApi = "http://localhost:3000/api/scrape/";
  readonly UrlApi2 = "http://localhost:3000/api/scrape/data";

  constructor(private http: HttpClient) {}


getSuducto(){
  return this.http.get(this.UrlApi)
  .pipe(map(data=>{
    return data['suducto']
  }))
}
  
  
postScrape(url){
  return this.http.post(this.UrlApi,url) 
 
}
postCsv(forma){
  return this.http.post(this.UrlApi2,forma )
}
}
