import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DonorService {
 API_URL='http://127.0.0.1:8000/donar/';
 API_URL2='http://127.0.0.1:8000/donar_pk/';
 
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

