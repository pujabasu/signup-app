/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {SignupService} from './../signup.service';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [FormsModule],
      providers: [SignupService],
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
   it('Success scenario for empty username.', () => {
    component.password='abc';
    fixture.detectChanges();
    component.enableButton();
    fixture.detectChanges();
    const de=fixture.debugElement.query(By.css('div.warning-text'));
    const el=de.nativeElement;
    //Username is empty but user is trying to enter password, so empty username
    //warning message will be shown.
    expect(el.textContent).toContain('UserName cannot be empty');
  });

  it('Success scenario with valid email.', inject([SignupService], (service:SignupService) => {
    component.userName='basupuja2007@gmail.com';
    component.checkIfUsernameIsValid();
    //result returned will be valid for a valid username.
    expect(component.valid).toBeTruthy();
  }));
  
  it('Success scenario with invalid email and user-friendly message.', inject([SignupService], (service:SignupService) => {
    component.userName='basupuja2007hmail.com';
    component.checkIfUsernameIsValid();
    //result returned will be invalid for an invalid username.
    expect(component.message).toEqual('UserName is incorrect');
  }));
  it('Failure scenario with invalid email.', inject([SignupService], (service:SignupService) => {
    component.userName='basupuja2007hmail.com';
    component.checkIfUsernameIsValid();
    //result returned will be invalid for an invalid username.
    expect(component.valid).toBeTruthy();
  }));
  it('Failure scenario with invalid email.', inject([SignupService], (service:SignupService) => {
    component.userName='user@gmycahoiol.com';
    component.checkIfUsernameIsValid();
    //result returned will be invalid for a wrong username.
    expect(component.valid).toBeTruthy();
  }));
  it('Success scenario of the above invalid email with suggestions for auto-correction', inject([SignupService], (service:SignupService) => {
    component.userName='user@gmycahoiol.com';
    component.checkIfUsernameIsValid();
    fixture.detectChanges();
    const de=fixture.debugElement.query(By.css('div.error-text'));
    const el=de.nativeElement;
    //result returned will be invalid for an invalid username with a suggestion to auto-correct.
    expect(el.innerText.trim()).toEqual("Do you mean user@gmail.com? user@yahoo.com?");
  }));
  it('Success scenario of invalid email with suggestion for auto-correction.', inject([SignupService], (service:SignupService) => {
    component.ngOnInit();
    component.userName='basupuja2007@nhoo.com';
    component.checkIfUsernameIsValid();
    fixture.detectChanges();
    const de=fixture.debugElement.query(By.css('div.error-text'));
    const el=de.nativeElement;
    //result returned will be invalid for an invalid username with a suggestion to auto-correct.
    expect(el.innerText.trim()).toEqual("Do you mean basupuja2007@yahoo.com?");
  }));
});
