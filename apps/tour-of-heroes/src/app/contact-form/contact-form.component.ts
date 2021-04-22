import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'nx-app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent {
  @ViewChild('f') contactForm!: NgForm;
  answer = '';
  default = 'pet';
  values: unknown;

  suggestUserName() {
    this.contactForm.form.patchValue({ userdata: { username: 'Mr. User' } });
  }

  // onSubmit(contactForm: NgForm) {
  //   console.log('contact-form.component.ts 10 submitted:', contactForm);
  //   const values = contactForm.form.value;
  //   console.log('contact-form.component.ts 13 values:', values);
  // }

  onSubmit() {
    this.values = this.contactForm.form.value;
  }
}
