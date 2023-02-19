import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  createUser() {
    if (this.formRegister.invalid) {
      return;
    }
    Swal.fire({
      title: 'Wait please!',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const { nombre, correo, password } = this.formRegister.value;
    this.authService
      .createUser(nombre, correo, password)
      .then((credenciales) => {
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
    this.formRegister.reset();
  }
}
