import { NgModule } from '@angular/core';
import { WizardComponent } from '../crossCutting/wizard/WizardComponent';
import { LoginComponent } from './components/login/LoginComponent';
import { LoginRoutingModule } from './LoginRoutingModule';

@NgModule({
    declarations: [
        LoginComponent
      ],
      imports: [
        LoginRoutingModule
      ],
      providers: [],
      bootstrap: [LoginComponent]
})
export class LoginModule{}