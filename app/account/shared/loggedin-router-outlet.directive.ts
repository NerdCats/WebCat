import { ElementRef, DynamicComponentLoader, AttributeMetadata, Directive, Attribute } from '@angular/core';
import { Router, RouterOutlet, ComponentInstruction } from '@angular/router-deprecated';
import { LoginService } from '../login/login.service';


@Directive({
  selector: 'router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: Array<any>;
  private router: Router;


  constructor(
    _elementRef: ElementRef, _loader: DynamicComponentLoader,
    _parentRouter: Router, @Attribute('name') nameAttr: string,
    private loginService: LoginService
  ) {
    super(_elementRef, _loader, _parentRouter, nameAttr);

    this.router = _parentRouter;
    this.publicRoutes = [
      'ConfirmEmail'
    ];
  }

  activate(instruction: ComponentInstruction) {
    if (this._canActivate(instruction.urlPath)) {
      return super.activate(instruction);
    }

    this.router.navigate(['Login']);
  }

  _canActivate(url) {
    return this.publicRoutes.indexOf(url) !== -1
      || this.loginService.isLoggedIn();
  }
}