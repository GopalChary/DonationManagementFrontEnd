import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NgoService {

  API_URL='http://127.0.0.1:8000/ngo/';
  API_URL2='http://127.0.0.1:8000/ngo_pk/';

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get<any>(this.API_URL);
  }

  postData(data:any){
    return this.http.post<any>(this.API_URL,data);
  }

  patchData(id:number,data:any){
    return this.http.patch<any>(this.API_URL2+id+'/',data);   
  }

  deleteData(id:number){
    return this.http.delete<any>(this.API_URL2+id+'/');
  }
}



