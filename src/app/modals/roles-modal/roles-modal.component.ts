import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.scss']
})
export class RolesModalComponent implements OnInit {
  @Input() updateSelectedRoles = new EventEmitter();
  user: User;
  roles: any[];

  constructor(public bsModalRef: BsModalRef, public toastr: ToastrService) { }

  ngOnInit(): void {
  }

  updateRoles() {
    if(this.roles.some(r  => r.checked == true)){
      this.updateSelectedRoles.emit(this.roles);
    }else{
      this.toastr.error('User Must have atleast one role!')
    }
    this.bsModalRef.hide();
  }

}
