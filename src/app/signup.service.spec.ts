/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SignupService } from './signup.service';

describe('SignupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignupService]
    });
  });

  it('Success scenario with valid username', inject([SignupService], (service: SignupService) => {
    const rtnObj = service.checkIfUsernameIsValid('basupuja2007@gmail.com');
    // valid scenario
    expect(rtnObj.result).toBe('Valid');
  }));

  it('Failue scenario with invalid username', inject([SignupService], (service: SignupService) => {
    const rtnObj= service.checkIfUsernameIsValid('basupuja2007gmail.com');
    // result will be "Invalid" which is not equal to "Valid". Hence invalid scenario.
    expect(rtnObj.result).toBe('Valid');
  }));

   it('Failue scenario with invalid username', inject([SignupService], (service: SignupService) => {
    const rtnObj= service.checkIfUsernameIsValid('abc@hmail.com');
    // result will be "Suggestion" which is not equal to "Valid". Hence failure scenario.
    expect(rtnObj.result).toEqual('Valid');
  }));

  it('Success scenario with invalid username and suggestion for auto-correction.', inject([SignupService], (service: SignupService) => {
    const rtnObj= service.checkIfUsernameIsValid('basupuja2007@gail.com');
    // invalid scenario but a suggestion will be returned for auto-correction.
    expect(rtnObj.result).toEqual('Suggestion');
  }));

   it('Failure scenario with invalid username and suggestion for auto-correction.', inject([SignupService], (service: SignupService) => {
    const rtnObj= service.checkIfUsernameIsValid('user@gmail.co.in');
    // invalid scenario but a suggestion will be returned for auto-correction.
    expect(rtnObj.result).toEqual('Valid');
  }));

  it('Failure scenario with invalid username.', inject([SignupService], (service: SignupService) => {
    const rtnObj= service.checkIfUsernameIsValid('user@swedn.gov.se');
    // invalid scenario but a suggestion will be returned for auto-correction.
    expect(rtnObj.result).toEqual('Valid');
  }));
});
