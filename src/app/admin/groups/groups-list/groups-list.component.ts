import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message.service';
import { ModalWindowService } from 'src/app/shared/services/modal-window.service';
import { MessageType, ModalWindowType } from 'src/app/shared/shared.interfaces';
import { iGroups } from '../../groups.interfaces';
import { AuthService } from '../../services/auth.service';
import { GroupsService } from '../../services/groups.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss']
})
export class GroupsListComponent implements OnInit {
  groups: iGroups[]
  errorMessage = ''

  constructor(
    private groupsService: GroupsService,
    private authService: AuthService,
    private modalWindow: ModalWindowService,
    private message: MessageService
  ) { }

  ngOnInit(): void {
    this.loadGroups()
  }

  loadGroups() {
    this.groupsService.getAll(this.authService.token)
      .subscribe({
        next: groups => this.groups = groups,
        error: err => {
          console.log('load groups error: ', err)
          this.message.show(err.error.message, MessageType.danger)
          this.errorMessage = err.error.message
        }
      })    
  }

  removeGroups(id: number, name: string = '') {
    this.modalWindow.show('Do you sure to remove group?', ModalWindowType.danger)
      .subscribe(res => {
        if(res) {
          this.groupsService.remove(id, this.authService.token)
            .subscribe({
              next: () => {
                this.message.show(`Group "${name}" has been remove`, MessageType.danger)
                this.loadGroups()
              },
              error: err => console.log('Remove groups error: ', err)
            })
        }
      })
  }

}
