import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';

export const dashboardAuthGuard: CanActivateFn = (route, state) => {

  const appService = inject(UserService)
  if(appService.isLoggedIn()){
    return false;
  }
  return true;
};
