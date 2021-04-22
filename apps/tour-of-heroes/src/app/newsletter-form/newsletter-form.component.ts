import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

type FormValidationResponse = { [key: string]: boolean } | null;

@Component({
  selector: 'nx-app-newsletter-form',
  templateUrl: './newsletter-form.component.html',
  styleUrls: ['./newsletter-form.component.css'],
})
export class NewsletterFormComponent implements OnInit {
  newsletter!: FormGroup;
  values: unknown;
  submitted = false;
  forbiddenUsernames = ['Moritz'];
  forbiddenEmails = ['moritz@eck.ch'];
  today = new Date();

  ngOnInit(): void {
    this.newsletter = new FormGroup({
      firstname: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        this.getForbiddenUsernames.bind(this),
      ]),
      lastname: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        this.getForbiddenUsernames.bind(this),
      ]),
      email: new FormControl(
        null,
        [Validators.required, Validators.email, Validators.minLength(5)],
        this.getForbiddenEmails.bind(this)
      ),
    });
  }

  onSubmit() {
    console.log(
      'newsletter-form.component.ts 31 this.newsletter:',
      this.newsletter
    );
    this.values = this.newsletter.value;
    this.submitted = true;
  }

  getForbiddenUsernames(control: FormControl): FormValidationResponse {
    if (this.forbiddenUsernames.includes(control.value)) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  getForbiddenEmails(
    control: AbstractControl
  ): Promise<FormValidationResponse> | Observable<FormValidationResponse> {
    const promise = new Promise<FormValidationResponse>((resolve) => {
      setTimeout(() => {
        if (this.forbiddenEmails.includes(control.value)) {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
