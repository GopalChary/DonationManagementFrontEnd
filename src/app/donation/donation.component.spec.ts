import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormBuilder,  FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
import{HttpTestingController} from '@angular/common/http/testing';
import { DonationComponent } from './donation.component';
import { DonationService } from './donation.service';
import { By } from '@angular/platform-browser';
// import { DonationService } from 'src/app/SERVICES/donation/donation.service';


describe('Donation Component',()=>{
  let serviceMock:any;
  let formBuilderMock:FormBuilder;
  let component: DonationComponent;
  let fixture: ComponentFixture<DonationComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [DonationComponent],
      providers: [FormBuilder,DonationService,HttpTestingController],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ],
     
    })
      .compileComponents();
  }));

  beforeEach(() => {
    serviceMock={
      getDonation:jest.fn(),
      postDonation:jest.fn(),
      patchDonation:jest.fn(),
      deleteDonation:jest.fn(),
      };

    fixture = TestBed.createComponent(DonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create Donation Component", () => {
    expect(component).toBeTruthy();
    expect(component).toBeDefined();
  });

  describe("Testing create component and declarations", ()=>{
    it("should create the Donation Component", () => {
      const fixt = new DonationComponent(formBuilderMock,serviceMock);
      expect(fixt).toBeTruthy();
    });

    it('should declare obj refereces',()=>{
      expect(component.modelObj).toBeDefined();
      expect(component.formValues).toBeDefined();
      // expect(component.showAdd).toBeDefined();
    })

  });

  describe('Test:ngOnInit',()=>{
    
    it('Initialize the form',()=>{
      const formValues={
        donar_id:'',
        ngo_id:'',
        donation_type:'',
        amount:'',
        donation_date:'',
      };
      expect(component.formValues.value).toEqual(formValues);
    });

  });

  describe('Test:Form',()=>{
  
        it('should invalidate the form when empty',()=>{
          component.formValues.controls['donar_id'].setValue('');
          component.formValues.controls['ngo_id'].setValue('');
          component.formValues.controls['donation_type'].setValue('');
          component.formValues.controls['amount'].setValue('');
          component.formValues.controls['donation_date'].setValue('');
          expect(component.formValues.valid).toBeFalsy();
        });

        it('should validate the form ',()=>{
          component.formValues.controls['donar_id'].setValue('1');
          component.formValues.controls['ngo_id'].setValue('1');
          component.formValues.controls['donation_type'].setValue('Type1');
          component.formValues.controls['amount'].setValue('5000');
          component.formValues.controls['donation_date'].setValue('19-05-2023');
          expect(component.formValues.valid).toBeTruthy();

        });

        it('donar_id field validity', () => {
          const c = component.formValues.controls['donar_id']
          expect(c.valid).toBeFalsy();      
          c.setValue('');
          expect(c.hasError('required')).toBeTruthy();      
        });

        
        it('ngo_id field validity', () => {
          const c = component.formValues.controls['ngo_id']
          expect(c.valid).toBeFalsy();      
          c.setValue('');
          expect(c.hasError('required')).toBeTruthy();      
        });

        
        it('donation_typefield validity', () => {
          const c = component.formValues.controls['donation_type']
          expect(c.valid).toBeFalsy();      
          c.setValue('');
          expect(c.hasError('required')).toBeTruthy();      
        });

        
        it('amount field validity', () => {
          const c = component.formValues.controls['amount']
          expect(c.valid).toBeFalsy();      
          c.setValue('');
          expect(c.hasError('required')).toBeTruthy();      
        });

        it('donation_date field validity', () => {
          const c = component.formValues.controls['donation_date']
          expect(c.valid).toBeFalsy();      
          c.setValue('');
          expect(c.hasError('required')).toBeTruthy();      
        });
   });


  describe('Test:methods declarations of Donation component',()=>{

    it('addDonation method to be defined',()=>{
     component.addDonation=jest.fn();
     expect(component.addDonation).toBeDefined();
    });

    it('postDonationData method to be defined',()=>{
      component.postDonationData=jest.fn();
      expect(component.postDonationData).toBeDefined();
     });

     it('getAllDonationData method to be defined',()=>{
      component.getAllDonationData=jest.fn();
      expect(component.getAllDonationData).toBeDefined();
     });

     it('deleteDonation method to be defined',()=>{
      component.deleteDonation=jest.fn();
      expect(component.deleteDonation).toBeDefined();
     });
    
     it('donationEdit method to be defined',()=>{
      component.donationEdit=jest.fn();
      expect(component.donationEdit).toBeDefined();
     });
     it('updateDonationData method to be defined',()=>{
      component.updateDonationData=jest.fn();
      expect(component.updateDonationData).toBeDefined();
     });
    
});



describe('Testing invoking methods of Donation component',()=>{
       
  it('should call postDonationData', () => {
    jest.spyOn(component, 'postDonationData');
    component.postDonationData();  
    expect(component.postDonationData).toHaveBeenCalled();
  });

  it('should call updateDonationData', () => {
    jest.spyOn(component, 'updateDonationData');
    component.updateDonationData();  
    expect(component.updateDonationData).toHaveBeenCalled();

  });
  

  it('should call addDonation', () => {
    jest.spyOn(component, 'addDonation');
    component.addDonation();  
    expect(component.addDonation).toHaveBeenCalled();
  });

 
  it('should call deleteNote', () => {
    jest.spyOn(component, 'deleteDonation');
    component.deleteDonation(1);    
    expect(component.deleteDonation).toHaveBeenCalled();
  });

  it('should not call addDonation', () => {
    const can = jest.spyOn(component, 'addDonation');
    expect(can).not.toHaveBeenCalled();
  });

  it('should not call getAllDonationData', () => {
    const gan = jest.spyOn(component, 'getAllDonationData');
    expect(gan).not.toHaveBeenCalled();
  });

  it('should not call postDonationData', () => {
    const pnd = jest.spyOn(component, 'postDonationData');
    expect(pnd).not.toHaveBeenCalled();
  });

  it('should not call deleteDonation', () => {
    const dnd = jest.spyOn(component, 'deleteDonation');
    expect(dnd).not.toHaveBeenCalled();
  });

  it('should not call donationEdit', () => {
    const ne = jest.spyOn(component, 'donationEdit');
    expect(ne).not.toHaveBeenCalled();
  });

  it('should not call updateDonationData', () => {
    const und = jest.spyOn(component, 'updateDonationData');
    expect(und).not.toHaveBeenCalled();
  });

});


//Need to imporve test cases with return value
  describe('Test : service methods',()=>{

    it('should get the Donation data',()=>{
      const response={
        success:true,
        message:'Donation Data fetched successfully',
        
      };
      const result={};
      const gd=jest.spyOn(serviceMock,'getDonation').mockReturnValue(response);
      expect(serviceMock.getDonation()).toBe(response);
      expect(gd).toHaveBeenCalled();// returned value need to check
      })

      it('should post the Donation data',()=>{
        // const data={ } //empty also works
        const data={ 
          donar_id:'1',
          ngo_id:'1',
          donation_type:'Type1',
          amount:'7000',
          donation_date:'19-05-2023',
        }
          const response={
            success:true,
            message:'Donation Created successfully'
          };
          const pd=jest.spyOn(serviceMock,'postDonation').mockReturnValue(response);
          expect(serviceMock.postDonation(data)).toBe(response);
          expect(pd).toHaveBeenCalledWith(data);
          })

          it("post Donation data with subscription", inject([HttpTestingController, DonationService], (httpMock: HttpTestingController, dataService: DonationService) => {
            const data={ 
              donar_id:'1',
              ngo_id:'1',
              donation_type:'Type1',
              amount:'7000',
              donation_date:'19-05-2023',
        };      
          dataService.postDonation(data).subscribe(data => {
            expect(data).toEqual(data);
            expect(data).toBe(data);
            expect(data).not.toBe(null);
            expect(null).toBeNull();
            expect(data).toBeTruthy();
          });
      }));      


      it('should edit the donation data of specified id',()=>{
      const data={ }
        const response={
          success:true,
          message:'Donation updated successfully'
        };
        const pd=jest.spyOn(serviceMock,'patchDonation').mockReturnValue(response);
        expect(serviceMock.patchDonation(1,data)).toBe(response);
        expect(pd).toHaveBeenCalledWith(1,data);
        })

        it('should delete the Donation of specified id',()=>{
          // const note={ 
          //   id:101,}
            const response={
              success:true,
              message:'Donation deleted successfully'
            };
            const dd=jest.spyOn(serviceMock,'deleteDonation').mockReturnValue(response);
            expect(serviceMock.deleteDonation(1)).toBe(response);
            expect(dd).toHaveBeenCalledWith(1);
            })

  });

  describe('Testing :Form Validations',()=>{

    it("Test initial form fields",()=>{
      const form=component.formValues;
      const values={
        donar_id:'',
        ngo_id:'',
        donation_type:'',
        amount:'',
        donation_date:'',
      }
      expect(form.value).toEqual(values);
    })

    // it("donar_id should invalid when it has no value",()=>{
    //   //Arrange
    //   const t=component.formValues.get('donar_id');
    //   //Act
    //   t?.setValue(null);
    //   //Assert
    //   expect(t?.invalid).toBeTruthy();
    // })

    // it("donar_id should valid when it has value",()=>{
    //   const t=component.formValues.get('donar_id');
    //   t?.setValue('1');  
    //   expect(t?.valid).toBeTruthy();
    // })


    // it("ngo_id should invalid when it has no value",()=>{
    //   //Arrange
    //   const t=component.formValues.get('ngo_id');
    //   //Act
    //   t?.setValue(null);
    //   //Assert
    //   expect(t?.invalid).toBeTruthy();
    // })

    // it("ngo_id should valid when it has value",()=>{
    //   //Arrange
    //   const t=component.formValues.get('ngo_id');
    //   //Act
    //   t?.setValue('1');
    //   //Assert
    //   expect(t?.valid).toBeTruthy();
    // })


    // it("donation_type should invalid when it has no value",()=>{
    //   //Arrange
    //   const t=component.formValues.get('donation_type');
    //   //Act
    //   t?.setValue(null);
    //   //Assert
    //   expect(t?.invalid).toBeTruthy();
    // })

    // it("donation_type should valid when it has value",()=>{
    //   //Arrange
    //   const t=component.formValues.get('donation_type');
    //   //Act
    //   t?.setValue('Type1');
    //   //Assert
    //   expect(t?.valid).toBeTruthy();
    // })

    // it("amount should invalid when it has no value",()=>{
    //   //Arrange
    //   const t=component.formValues.get('amount');
    //   //Act
    //   t?.setValue(null); 
    //   //Assert
    //   expect(t?.invalid).toBeTruthy();
    // })

    // it("amount should valid when it has value",()=>{
    //   //Arrange
    //   const t=component.formValues.get('amount');
    //   //Act
    //   t?.setValue(5000);
    //   //Assert
    //   expect(t?.valid).toBeTruthy();
    // })

    // it("donation_date should invalid when it has no value",()=>{
    //   //Arrange
    //   const t=component.formValues.get('donation_date');
    //   //Act
    //   t?.setValue(null); 
    //   //Assert
    //   expect(t?.invalid).toBeTruthy();
    // })

    // it("donation_date should valid when it has value",()=>{
    //   //Arrange
    //   const t=component.formValues.get('donation_date');
    //   //Act
    //   t?.setValue('19-05-2023');
    //   //Assert
    //   expect(t?.valid).toBeTruthy();
    // })
 
  })

 
  describe('Testing: validating HTML elements',()=>{ 

    it('testing formgroup and elemet count',()=>{
      const formElement=fixture.debugElement.nativeElement.querySelector('#formValues');
      const inputElements=formElement.querySelectorAll('input');
      expect(inputElements.length).toEqual(5);
    });

    // it('donar_id field validity', () => {
    //   const c = component.formValues.controls['donar_id'];
    //   expect(c.valid).toBeFalsy();  
    //   c.setValue('');
    //   expect(c.hasError('required')).toBeTruthy();  
    // });

    // it('ngo_id field validity', () => {
    //   const c = component.formValues.controls['ngo_id'];
    //   expect(c.valid).toBeFalsy();  
    //   c.setValue('');
    //   expect(c.hasError('required')).toBeTruthy();  
    // });

  
    // it('donation_type field validity', () => {
    //   const c = component.formValues.controls['donation_type'];
    //   expect(c.valid).toBeFalsy();  
    //   c.setValue('');
    //   expect(c.hasError('required')).toBeTruthy();  
    // });

    // it('amount field validity', () => {
    //   const c = component.formValues.controls['amount'];
    //   expect(c.valid).toBeFalsy();  
    //   c.setValue('');
    //   expect(c.hasError('required')).toBeTruthy();  
    // });

    // it('donation_date field validity', () => {
    //   const c = component.formValues.controls['donation_date'];
    //   expect(c.valid).toBeFalsy();  
    //   c.setValue('');
    //   expect(c.hasError('required')).toBeTruthy();  
    // });

    //updated in db or not need to check
    // it('Testing whole form to be valid',()=>{
    //   const e1:HTMLInputElement=fixture.debugElement.nativeElement.querySelector('#formValues').querySelectorAll('input')[0];
    //   const e2:HTMLInputElement=fixture.debugElement.nativeElement.querySelector('#formValues').querySelectorAll('input')[1];
    //   const e3:HTMLInputElement=fixture.debugElement.nativeElement.querySelector('#formValues').querySelectorAll('input')[2];
    //   const e4:HTMLInputElement=fixture.debugElement.nativeElement.querySelector('#formValues').querySelectorAll('input')[3];
    //   const e5:HTMLInputElement=fixture.debugElement.nativeElement.querySelector('#formValues').querySelectorAll('input')[4];
      
    //   e1.value='1';
    //   e2.value='1';
    //   e3.value='Type1';
    //   e4.value='5000'; 
    //   e5.value='19-05-2023'; 
      
    //   e1.dispatchEvent(new Event('input'));
    //   e2.dispatchEvent(new Event('input'));
    //   e3.dispatchEvent(new Event('input'));
    //   e4.dispatchEvent(new Event('input'));
    //   e5.dispatchEvent(new Event('input'));

    //   const isFormValid=component.formValues.valid;
    //   fixture.whenStable().then(()=>{
    //     expect(isFormValid).toBeTruthy();
    //   });  
    // });
  });


  // describe('Testing headings of the html table',()=>{

  //   it("should have heading-Donation Details", () => {
  //     const de = fixture.debugElement.query(By.css("h1"));
  //     const el = de.nativeElement;
  //     expect(el.textContent).toEqual("Donation Details");
  //   });
    
  //   it("should have table header ID ", () => {  
  //     const de = fixture.debugElement.query(By.css(".c1"));
  //     const el = de.nativeElement;
  //     expect(el.textContent).toEqual("ID");
  //   });

  //   it("should have table header Donar Id ", () => {
  //     const de = fixture.debugElement.query(By.css(".c2"));
  //     const el = de.nativeElement;
  //     expect(el.textContent).toEqual("Donar Id");
  //   });

  //   it("should have table header NGO Id ", () => {  
  //     const de = fixture.debugElement.query(By.css(".c3"));
  //     const el = de.nativeElement;
  //     expect(el.textContent).toEqual("NGO Id");
  //   });

  //   it("should have table header Donation Type", () => { 
  //     const de = fixture.debugElement.query(By.css(".c4"));
  //     const el = de.nativeElement;
  //     expect(el.textContent).toEqual("Donation Type");
  //   });

  //   it("should have table header Amount", () => {
  //     const de = fixture.debugElement.query(By.css(".c5"));
  //     const el = de.nativeElement;
  //     expect(el.textContent).toEqual("Amount");
  //   });

  //   it("should have table header Donation Date ", () => {
  //     //fixture.detectChanges();
  //     const de = fixture.debugElement.query(By.css(".c6"));
  //     const el = de.nativeElement;
  //     expect(el.textContent).toEqual("Donation Date");
  //   });

  //   it("should test number of headings of the table ", () => {
  //     const table=['donation_id','donar_id','ngo_id','donation_type','amount','donation_date']
  //     expect(table.length).toEqual(6);
  //   });  

  // });

  // describe('Testing html buttons',()=>{
  //   it('save button testing', () => {
  //     const btn = fixture.debugElement.queryAll(By.css('#save'));
  //     expect(btn).toBeTruthy();
  //   });

  //   it('cancel button testing', () => {
  //     const btn = fixture.debugElement.queryAll(By.css('#cancel'));
  //     expect(btn).toBeTruthy();
  //   });

  //   it('update button testing', () => {
  //     const btn = fixture.debugElement.queryAll(By.css('#update'));
  //     expect(btn).toBeTruthy();
  //   });
    
  //   it('delete button testing', () => {
  //     const btn = fixture.debugElement.queryAll(By.css('#delete'));
  //     expect(btn).toBeTruthy();
  //   });

  //   it('edit button testing', () => {
  //     const btn = fixture.debugElement.queryAll(By.css('#edit'));
  //     expect(btn).toBeTruthy();
  //   });

  // })

});





//Default -jasmin code

// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { DonationComponent } from './donation.component';

// describe('DonationComponent', () => {
//   let component: DonationComponent;
//   let fixture: ComponentFixture<DonationComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ DonationComponent ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(DonationComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
