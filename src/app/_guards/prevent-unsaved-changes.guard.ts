import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { ConfirmLeaveComponent } from '../modals/confirm-leave/confirm-leave.component';
import { ConfirmService } from '../_services/confirm.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  constructor(private modalService: BsModalService,private confirmService: ConfirmService) {}
  canDeactivate(component: MemberEditComponent) {
    if (component.editForm.dirty) {
     // return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
    // return this.confirmService.confirm();
     const subject = new Subject<boolean>();
     const modal = this.modalService.show(ConfirmLeaveComponent, {'class': 'modal-dialog-primary'});
      modal.content.subject = subject;

      return subject.asObservable();
    }
    return true;
  }

}
