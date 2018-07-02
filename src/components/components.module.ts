import { NgModule } from '@angular/core';
import { HeaderMenuComponent } from './header-menu/header-menu';
import { IonicPageModule } from 'ionic-angular';
import { FooterTabsComponent } from './footer-tabs/footer-tabs';

@NgModule({
	declarations: [HeaderMenuComponent,
    FooterTabsComponent],
	imports: [
		IonicPageModule.forChild(HeaderMenuComponent),
	],
	exports: [HeaderMenuComponent,
    FooterTabsComponent]
})
export class ComponentsModule {}
