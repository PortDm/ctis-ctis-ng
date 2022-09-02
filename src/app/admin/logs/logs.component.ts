import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { switchMap } from "rxjs";
import { MessageService } from "src/app/shared/services/message.service";
import { MessageType } from "src/app/shared/shared.interfaces";
import { iFilters, iLogs } from "../logs.interfaces";
import { AuthService } from "../services/auth.service";
import { LogsService } from "../services/logs.service";

const FILTERS_PERIOD_ON_INIT = 3

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
    logs: iLogs[]
    messageError = ''
    form: FormGroup
    countLogs = 0

    constructor(
        private logsService: LogsService,
        private auth: AuthService,
        private message: MessageService
    ) { }

    ngOnInit(): void {
        let startDate = new Date(); startDate.setDate(startDate.getDate()-FILTERS_PERIOD_ON_INIT)
        let endDate = new Date(); endDate.setDate(endDate.getDate()+1)

        this.form = new FormGroup({
            startDate: new FormControl(startDate.toJSON().split('T')[0]),
            endDate: new FormControl(endDate.toJSON().split('T')[0]),
            master: new FormControl(''),
            action: new FormControl(''),
            type: new FormControl('all'),
            datas: new FormControl('')
        })

        this.logsService.count()
            .subscribe({
                next: countLogs => {
                    this.countLogs = countLogs
                    this.filtrations()
                },
                error: err => {
                    console.log(`count logs error: ${err}`)
                    this.messageError = err.message
                    this.message.show(err.message, MessageType.danger)
                }
            })
    }

    filtrations() {
        const filters: iFilters = {
            master: this.form.value.master,
            type: this.form.value.type,
            startDate: this.form.value.startDate,
            endDate: this.form.value.endDate,
            action: this.form.value.action
        }

        this.logsService.filters(this.auth.token, filters)
            .subscribe({
                next: logs => this.logs = logs,
                error: err => {
                    console.log(`logs filters errors: ${err}`)
                    this.message = err.message
                    this.message.show(err.message, MessageType.danger)
                }
            })
    }
}