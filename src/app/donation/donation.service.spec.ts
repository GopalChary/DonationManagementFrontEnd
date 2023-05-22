import { of } from 'rxjs';
import { DonationService } from './donation.service';

describe('DonationService', () => {
  let service:DonationService
  let httpClientSpy:any;

  beforeEach(() => {  
    httpClientSpy={
      get:jest.fn(),
      post:jest.fn(),
      patch:jest.fn(),
      delete:jest.fn()
    }
  service=new DonationService(httpClientSpy); 
    
  });

  it('Donation service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('testing getDonation', () => {
    const res="some message"
    const url='http://127.0.0.1:8000/donation/';
    jest.spyOn(httpClientSpy,'get').mockReturnValue(of(res));//of represent returns Observable
    service.getDonation();
    expect(httpClientSpy.get).toBeCalledTimes(1);//Testing whether get method called
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);//Testing whether get passing with url or not
  });

  it('testing postDonation',()=>{
    const data={   
      donation_id:1,
      donar_id:1,
      ngo_id:1,
      donation_type:'Type1',
      amount:5000,
      donation_date:'18-05-2023'      
    }
    const res="some message";
    const url='http://127.0.0.1:8000/donation/';
    jest.spyOn(httpClientSpy,'post').mockReturnValue(of(res));
    service.postDonation(data);
    expect(httpClientSpy.post).toBeCalledTimes(1);
    //expect(httpClientSpy.post).toHaveBeenCalledWith(url);
  })

  it('testing patchDonation',()=>{
    const command1=1;
    const data={   
      donation_id:1,
      donar_id:1,
      ngo_id:1,
      donation_type:'Type1',
      amount:5000,
      donation_date:'18-05-2023'      
    }
    const res="some message";
    const url='http://127.0.0.1:8000/donation_pk/1/';
    jest.spyOn(httpClientSpy,'patch').mockReturnValue(of(res));
    service.patchDonation(command1,data);
    expect(httpClientSpy.patch).toBeCalledTimes(1);
    //expect(httpClientSpy.patch).toHaveBeenCalledWith(url);
  })
  
  it('testing deleteDonation',()=>{
    const command=1;
    const res="some message";
    const url='http://127.0.0.1:8000/donation_pk/1/';
    jest.spyOn(httpClientSpy,'delete').mockReturnValue(of(res));
    service.deleteDonation(command);
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
