import { NgModule } from '@angular/core';
import { HeaderMenuComponent } from './header-menu/header-menu';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
	declarations: [HeaderMenuComponent],
	imports: [
		IonicPageModule.forChild(HeaderMenuComponent),
	],
	exports: [HeaderMenuComponent]
})
export class ComponentsModule {}
