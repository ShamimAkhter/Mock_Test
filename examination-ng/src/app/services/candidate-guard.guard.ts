import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CandidateExamState } from './candidate-exam-state';
import { CandidateExamStore } from './candidate-exam-store';

@Injectable({
  providedIn: 'root',
})
export class CandidateGuardGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: CandidateExamStore
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.store.state.candidate === null) {
      this.router.navigate(['shared/access-denied']);
    }
    return true;
  }
}
