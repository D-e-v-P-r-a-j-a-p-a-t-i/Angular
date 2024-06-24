import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {

  const appService = inject(UserService);
  const router = inject(Router);

  if(appService.isLoggedIn()){
    return true
  }
  else{
    router.navigateByUrl("/login")
    return false
  }
};
