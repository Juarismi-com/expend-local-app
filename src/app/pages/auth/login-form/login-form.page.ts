import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
   selector: "app-login-form",
   templateUrl: "./login-form.page.html",
   styleUrls: ["./login-form.page.scss"],
})
export class LoginFormPage {
   loginForm: FormGroup;
   email: string = "";
   password: string = "";
   isLoading: boolean = false;

   constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService,
      private loadingCtrl: LoadingController,
      private alertController: AlertController,
   ) {
      this.loginForm = this.formBuilder.group({
         email: ["", Validators.required],
         password: ["", Validators.required],
      });
   }

   async loginFormSubmit() {
      const loading = await this.loadingCtrl.create({
         message: "Cargando...",
      });

      const errorLogin = await this.alertController.create({
         header: "Error",
         message: "Usuario inválido o inexistente",
         buttons: ["OK"],
      });

      try {
         loading.present();
         await this.authService.login(
            this.loginForm.value.email,
            this.loginForm.value.password,
         );
         this.router.navigate(["/dashboard/dashboard-vendedor"]);
      } catch (error) {
         console.log(error);
         errorLogin.present();
      } finally {
         loading.dismiss();
      }
   }
}
