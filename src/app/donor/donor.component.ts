import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Donor } from './donor';
import { DonorService } from './donor.service';
// import { Donor } from 'src/app/MODELS/donar/donor';
// import { DonorService } from 'src/app/SERVICES/donar/donor.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})

export class DonorComponent implements OnInit {
  formValues!:FormGroup;
  modelObj:Donor=new Donor();
  allData:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private fB:FormBuilder,private api:DonorService) { }



  ngOnInit(): void {

    this.formValues=this.fB.group({
    ngo_id:['',Validators.required],   
    donar_name:['',Validators.required],
    username:['',Validators.required],
    password:['',Validators.required],
    address:['',Validators.required],
    phone_number:['',Validators.required],
    email_id:['',Validators.required],
   
    })
    this.getAllDonorData(); 
  }

  get ngo_id(){
    return this.formValues.get('ngo_id')
  }
  get donar_name(){
    return this.formValues.get('donar_name')  }
 
  get username(){
    return this.formValues.get('username')
  }
  get password(){
    return this.formValues.get('password')
  }
  get address(){
    return this.formValues.get('address')
  }
  get phone_number(){
    return this.formValues.get('phone_number')
  }
  get email_id(){
    return this.formValues.get('email_id')
  }


//calls when you click on Add  button
addDonor(){
  this.formValues.reset();//reset the form
  this.showAdd=true;
  this.showUpdate=false;
}

//Save Data

postDonorData(){
  this.modelObj.ngo_id=this.formValues.value.ngo_id;
  this.modelObj.donar_name=this.formValues.value.donar_name;
  this.modelObj.username=this.formValues.value.username;  
  this.modelObj.password=this.formValues.value.password;
  this.modelObj.address=this.formValues.value.address;
  this.modelObj.phone_number=this.formValues.value.phone_number;
  this.modelObj.email_id=this.formValues.value.email_id;
  this.api.postData(this.modelObj)
  .subscribe(res=>{  
    alert("Registered Successfully");
    let ref=document.getElementById('cancel');
    ref?.click();
    this.formValues.reset(); //reset the form     
    this.getAllDonorData();
  },
  err=>{
    alert("Something went wrong");
  })
}

//Get data
  getAllDonorData(){
    this.api.getData()
    .subscribe(res=>{
      this.allData=res;
    })
  }

  //Delete data
  deleteDonor(obj:any){    
    this.api.deleteData(obj.donar_id)
    .subscribe(res=>{
      alert("Deleted Successfully");
      this.getAllDonorData();
    })
  }

// set values of specfid one to html form fields to edit
donorEdit(obj:any){
    this.showAdd= false;
    this.showUpdate=true;
    this.modelObj.donar_id=obj.donar_id;
    this.formValues.controls['ngo_id'].setValue(obj.ngo_id);
    this.formValues.controls['donar_name'].setValue(obj.donar_name);
    this.formValues.controls['username'].setValue(obj.username);    
    this.formValues.controls['password'].setValue(obj.password);
    this.formValues.controls['address'].setValue(obj.address);
    this.formValues.controls['phone_number'].setValue(obj.phone_number);  
    this.formValues.controls['email_id'].setValue(obj.email_id); 
   } 

//Update data
  updateDonorData(){
    this.modelObj.ngo_id=this.formValues.value.ngo_id;
    this.modelObj.donar_name=this.formValues.value.donar_name;
    this.modelObj.username=this.formValues.value.username;    
    this.modelObj.password=this.formValues.value.password;
    this.modelObj.address=this.formValues.value.address;
    this.modelObj.phone_number=this.formValues.value.phone_number;
    this.modelObj.email_id=this.formValues.value.email_id;
    this.api.patchData(this.modelObj.donar_id,this.modelObj)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValues.reset(); //reset the form
      this.getAllDonorData();
      },
      err=>{
        alert("Something went wrong....");
        }
    )
  }

}

