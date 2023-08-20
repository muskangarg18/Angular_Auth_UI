import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  loginForm!: FormGroup; // Declare a property to hold the form group

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
   
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      
      //send objct to db
      this.auth.login(this.loginForm.value).subscribe({
        next:(res)=>{
          alert(res.message);
          
          this.router.navigate(['/home']);
        },error:(err)=>{
          alert(err.error.message)
        }
      })

    }else{
      //throw some error

      this.validateAllFormFields(this.loginForm);
      alert("your form is invalid")

    }

  }
  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(feild=>{
      const control=formGroup.get(feild);
      if(control instanceof FormControl){
        control?.markAsDirty({onlySelf:true});
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control)

      }
    })

  }
}
