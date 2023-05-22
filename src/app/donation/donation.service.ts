
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DonationService {
 API_URL='http://127.0.0.1:8000/donation/';
 API_URL2='http://127.0.0.1:8000/donation_pk/';
 
  constructor(private http:HttpClient) { }
  getDonation(){
    return this.http.get<any>(this.API_URL);
  }

  postDonation(data:any){
    return this.http.post<any>(this.API_URL,data);
  }

  patchDonation(id:number,data:any){
    // alert(id)
    // alert(data)
    return this.http.patch<any>(this.API_URL2+id+'/',data);   
  }

  deleteDonation(id:number){
    return this.http.delete<any>(this.API_URL2+id+'/');
  }

}

