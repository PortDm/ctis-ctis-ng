import { NgModule } from "@angular/core";
import { SpWorkRouter } from "./spwork-routing.module";
import { DevicesListComponent } from './devices/devices-list/devices-list.component';
import { DevicesService } from "./devices/devices.service";
import { SharedModule } from "../shared/shared.module";
import { ConcsListComponent } from './conclusions/concs-list/concs-list.component';
import { ConcsCreateComponent } from './conclusions/concs-create/concs-create.component';
import { ConcsService } from "./conclusions/concs.service";
import { ConcDetailsComponent } from './conclusions/conc-details/conc-details.component';
import { DevicesCartComponent } from './devices/devices-cart/devices-cart.component';
// import { CasesComponent } from './cases/cases.component';
import { CasesService } from "./cases/cases.service";
import { CasesListComponent } from './cases/cases-list/cases-list.component';
import { CasesCreateComponent } from './cases/cases-create/cases-create.component';
import { CasesValidators } from "./cases/cases.validators";
import { ConcsUpdateComponent } from './conclusions/concs-update/concs-update.component';
import { ConcsSewIntoVolumeComponent } from './conclusions/concs-sew-into-volume/concs-sew-into-volume.component';
import { ConcsValidators } from "./conclusions/concs.validators";
import { ConcsFilterPipe, DateRomePipe } from "./conclusions/concs.pipe";
import { UsersModule } from "../admin/admin.module";
import { DevicesCreateComponent } from "./devices/devices-create/devices-create.component";
import { DevicesValidators } from "./devices/devices.validators";
import { DevicesUpdateComponent } from './devices/devices-update/devices-update.component';
import { PointsService } from "./devices/points.service";

@NgModule({
    declarations: [
      DevicesListComponent,
      DevicesCartComponent,
      DevicesCreateComponent,
      ConcsListComponent,
      ConcsCreateComponent,
      ConcsUpdateComponent,
      ConcDetailsComponent,
      // CasesComponent,
      CasesListComponent,
      CasesCreateComponent,
      ConcsSewIntoVolumeComponent,
      DateRomePipe,
      ConcsFilterPipe,
      DevicesUpdateComponent,
  ],
    providers: [
      DevicesService,
      DevicesValidators,
      PointsService,
      ConcsService,
      ConcsValidators,
      CasesService,
      CasesValidators
    ],
    imports: [
      SpWorkRouter,
      SharedModule,
      UsersModule
    ]
})
export class SpWorkModule { }