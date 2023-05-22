
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Donation } from './donation';
import { DonationService } from './donation.service';
// import { DonationService } from 'src/app/SERVICES/donation/donation.service';
// import { Donation } from 'src/app/MODELS/donation/donation';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})

export class DonationComponent implements OnInit {
  formValues!:FormGroup;
  modelObj:Donation=new Donation();
  allData:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private fB:FormBuilder,private api:DonationService) { }

  ngOnInit(): void {
    this.formValues=this.fB.group({
    donar_id:['',Validators.required],   
    ngo_id:['',Validators.required],
    donation_type:['',Validators.required],
    amount:['',Validators.required],
    donation_date:['',Validators.required],

    })
    this.getAllDonationData(); 
  }

get donar_id(){
  return this.formValues.get('donar_id')
}
get ngo_id(){
  return this.formValues.get('ngo_id')
}
get donation_type(){
  return this.formValues.get('donation_type')
}
get amount(){
  return this.formValues.get('amount')
}
get donation_date(){
  return this.formValues.get('donation_date')
}

//calls when you click on Add  button
addDonation(){
  this.formValues.reset();//reset the form
  this.showAdd=true;
  this.showUpdate=false;
}

//Save Data
  postDonationData(){
    this.modelObj.donar_id=this.formValues.value.donar_id;
    this.modelObj.ngo_id=this.formValues.value.ngo_id;
    this.modelObj.donation_type=this.formValues.value.donation_type;
    this.modelObj.amount=this.formValues.value.amount;
    this.modelObj.donation_date=this.formValues.value.donation_date;
   
    this.api.postDonation(this.modelObj)
    .subscribe(res=>{  
      alert("Saved Successfully");
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValues.reset(); //reset the form
      this.getAllDonationData();
    },
    err=>{
      alert("Something went wrong");
    })
  }

//Get data

  getAllDonationData(){
    this.api.getDonation()
    .subscribe(res=>{
      this.allData=res;
    })
  }


  //Delete data
  deleteDonation(obj:any){    
    this.api.deleteDonation(obj.donation_id)
    .subscribe(res=>{
      alert("Deleted Successfully");
      this.getAllDonationData();
    })
  }

// set values of specfid one to html form fields to edit
donationEdit(obj:any){
    this.showAdd= false;
    this.showUpdate=true;
    this.modelObj.donation_id=obj.donation_id;
    this.formValues.controls['donar_id'].setValue(obj.donar_id);
    this.formValues.controls['ngo_id'].setValue(obj.ngo_id);
    this.formValues.controls['donation_type'].setValue(obj.donation_type);
    this.formValues.controls['amount'].setValue(obj.amount);
    this.formValues.controls['donation_date'].setValue(obj.donation_date);    
   } 

//Update  data
  updateDonationData(){
    this.modelObj.donar_id=this.formValues.value.donar_id;
    this.modelObj.ngo_id=this.formValues.value.ngo_id;
    this.modelObj.donation_type=this.formValues.value.donation_type;
    this.modelObj.amount=this.formValues.value.amount;
    this.modelObj.donation_date=this.formValues.value.donation_date;
    this.api.patchDonation(this.modelObj.donation_id,this.modelObj)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValues.reset(); //reset the form
      this.getAllDonationData();

      },
      err=>{
        alert("Something went wrong....");
        }
    )
  }

}
