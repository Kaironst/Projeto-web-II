import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErroSubmitForm } from './erro-submit-form';

@Injectable({
  providedIn: 'root'
})

export class ControlaForm {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
  necessarioFormControl = new FormControl('', [Validators.required]);

  constructor(
    private router: Router,
    public matcher: ErroSubmitForm
  ) {}

}
