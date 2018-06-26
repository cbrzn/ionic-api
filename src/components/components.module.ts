import { NgModule } from '@angular/core';
import { HeaderMenuComponent } from './header-menu/header-menu';
import { IonicPageModule } from 'ionic-angular';
import { AccountComponent } from './account/account';

@NgModule({
	declarations: [HeaderMenuComponent,
    AccountComponent],
	imports: [
		IonicPageModule.forChild(HeaderMenuComponent),
	],
	exports: [HeaderMenuComponent,
    AccountComponent]
})
export class ComponentsModule {}
