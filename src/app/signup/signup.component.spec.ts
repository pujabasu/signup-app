/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('Success scenario with valid email.', () => {
    component.userName="basupuja2007@gmail.com";
    component.checkIfUsernameIsValid();
    //result returned will be valid for a valid username.
    expect(component.valid).toBeTruthy();
  });
  
  it('Success scenario with invalid email and user-friendly message.', () => {
    component.userName="basupuja2007hmail.com";
    component.checkIfUsernameIsValid();
    //result returned will be invalid for an invalid username.
    expect(component.validEmail).toEqual("UserName is incorrect");
  });
  it('Failure scenario with invalid email.', () => {
    component.userName="basupuja2007hmail.com";
    component.checkIfUsernameIsValid();
    //result returned will be invalid for an invalid username.
    expect(component.valid).toBeTruthy();
  });
  it('Success scenario with invalid email and a suggestion for a valid domain name.', () => {
    component.userName="basupuja2007@nhoo.com";
    fixture.detectChanges();
    component.checkIfUsernameIsValid();
    fixture.detectChanges();
    const de=fixture.debugElement.query(By.css('div.error-text'));
    const el=de.nativeElement;
    //result returned will be valid for a valid username.
    expect(el.textContent).toContain("Do you mean basupuja2007@yahoo.com");
  });
  it('Failure scenario with invalid email.', () => {
    component.userName="basupuja2007@nhoo.com";
    component.checkIfUsernameIsValid();
    //result returned will be invalid for an invalid username with a suggestion to auto-correct.
    expect(component.valid).toBeTruthy();
  });
});
