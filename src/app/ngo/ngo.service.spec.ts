import { of } from 'rxjs';
import { NgoService } from './ngo.service';

describe('NgoService', () => {
  let service:NgoService
  let httpClientSpy:any;

  beforeEach(() => {  
    httpClientSpy={
      get:jest.fn(),
      post:jest.fn(),
      patch:jest.fn(),
      delete:jest.fn()
    }
  service=new NgoService(httpClientSpy); 
    
  });

  it('Ngo service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('testing getData', () => {
    const res="some message"
    const url='http://127.0.0.1:8000/ngo/';
    jest.spyOn(httpClientSpy,'get').mockReturnValue(of(res));//of represent returns Observable
    service.getData();
    expect(httpClientSpy.get).toBeCalledTimes(1);//Testing whether get method called
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);//Testing whether get passing with url or not
  });

  it('testing postData',()=>{
    const data={   
      ngo_id:1,
      ngo_name:'ngo1',
      username:'user1',
      password:'pwd',
      address:'Hyd',
      phone_number:968569856,
      started_in:'18-05-2023',
      documents:'sample docs'    
    }
    const res="some message";
    const url='http://127.0.0.1:8000/ngo/';
    jest.spyOn(httpClientSpy,'post').mockReturnValue(of(res));
    service.postData(data);
    expect(httpClientSpy.post).toBeCalledTimes(1);
    //expect(httpClientSpy.post).toHaveBeenCalledWith(url);
  })

  it('testing patchData',()=>{
    const command1=1;
    const data={   
      ngo_id:1,
      ngo_name:'ngo1',
      username:'user1',
      password:'pwd',
      address:'Hyd',
      phone_number:968569856,
      started_in:'18-05-2023',
      documents:'sample docs'    
    }
    const res="some message";
    const url='http://127.0.0.1:8000/ngo_pk/1/';
    jest.spyOn(httpClientSpy,'patch').mockReturnValue(of(res));
    service.patchData(command1,data);
    expect(httpClientSpy.patch).toBeCalledTimes(1);
    //expect(httpClientSpy.patch).toHaveBeenCalledWith(url);
  })
  
  it('testing deleteData',()=>{
    const command=1;
    const res="some message";
    const url='http://127.0.0.1:8000/ngo_pk/1/';
    jest.spyOn(httpClientSpy,'delete').mockReturnValue(of(res));
    service.deleteData(command);
    expect(httpClientSpy.delete).toBeCalledTimes(1);
    expect(httpClientSpy.delete).toHaveBeenCalledWith(url);
  })
  
});




// import { TestBed } from '@angular/core/testing';

// import { DonationService } from './donation.service';

// describe('DonationService', () => {
//   let service: DonationService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(DonationService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });



// import { TestBed } from '@angular/core/testing';

// import { NgoService } from './ngo.service';

// describe('NgoService', () => {
//   let service: NgoService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(NgoService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
