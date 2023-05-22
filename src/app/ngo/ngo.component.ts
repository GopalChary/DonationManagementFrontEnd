
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { NgoService } from './ngo.service';
import { Ngo } from './ngo';
// import { NgoService } from 'src/app/SERVICES/ngo/ngo.service';
// import { Ngo } from 'src/app/MODELS/ngo/ngo';
@Component({
  selector: 'app-ngo',
  templateUrl: './ngo.component.html',
  styleUrls: ['./ngo.component.css']
})

export class NgoComponent implements OnInit {
  formValues!:FormGroup;
  modelObj:Ngo=new Ngo();
  allData:any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private fB:FormBuilder,private api:NgoService) { }

  ngOnInit(): void {

    this.formValues=this.fB.group({
    ngo_name:['',Validators.required],   
    username:['',Validators.required],
    password:['',Validators.required],
    address:['',Validators.required],
    phone_number:['',Validators.required],
    started_in:['',Validators.required],
    documents:['',Validators.required],
    })
    this.getAllNgoData(); 
  }

  get ngo_name(){
    return this.formValues.get('ngo_name')
  }
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
  get started_in(){
    return this.formValues.get('started_in')
  }
  get documents(){
    return this.formValues.get('documents')
  }

//calls when you click on Add  button
addNgo(){
  this.formValues.reset();//reset the form
  this.showAdd=true;
  this.showUpdate=false;
}

//Save Data

postNgoData(){
  this.modelObj.ngo_name=this.formValues.value.ngo_name;
  this.modelObj.username=this.formValues.value.username;
  this.modelObj.password=this.formValues.value.password;
  this.modelObj.address=this.formValues.value.address;
  this.modelObj.phone_number=this.formValues.value.phone_number;
  this.modelObj.started_in=this.formValues.value.started_in;
  this.modelObj.documents=this.formValues.value.documents;

  this.api.postData(this.modelObj)
  .subscribe(res=>{  
    alert("Registered Successfully");
    let ref=document.getElementById('cancel');
    ref?.click();
    this.formValues.reset(); //reset the form     
    this.getAllNgoData();
  },
  err=>{
    alert("Something went wrong");
  })
}

//Get data
  getAllNgoData(){
    this.api.getData()
    .subscribe(res=>{
      this.allData=res;
    })
  }


  //Delete data
  deleteNgo(obj:any){    
    this.api.deleteData(obj.ngo_id)
    .subscribe(res=>{
      alert("Deleted Successfully");
      this.getAllNgoData();
    })
  }

// set values of specfid one to html form fields to edit
ngoEdit(obj:any){
    this.showAdd= false;
    this.showUpdate=true;
    this.modelObj.ngo_id=obj.ngo_id;
    this.formValues.controls['ngo_name'].setValue(obj.ngo_name);
    this.formValues.controls['username'].setValue(obj.username);
    this.formValues.controls['password'].setValue(obj.password);
    this.formValues.controls['address'].setValue(obj.address);
    this.formValues.controls['phone_number'].setValue(obj.phone_number);  
    this.formValues.controls['started_in'].setValue(obj.started_in);
    this.formValues.controls['documents'].setValue(obj.documents);  
   } 

//Update  data
  updateNgoData(){
    this.modelObj.ngo_name=this.formValues.value.ngo_name;
    this.modelObj.username=this.formValues.value.username;
    this.modelObj.password=this.formValues.value.password;
    this.modelObj.address=this.formValues.value.address;
    this.modelObj.phone_number=this.formValues.value.phone_number;
    this.modelObj.started_in=this.formValues.value.started_in;
    this.modelObj.documents=this.formValues.value.documents;

    this.api.patchData(this.modelObj.ngo_id,this.modelObj)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValues.reset(); //reset the form
      this.getAllNgoData();

      },
      err=>{
        alert("Something went wrong....");
        }
    )
  }

}
