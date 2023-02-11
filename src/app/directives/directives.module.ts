import { NgModule } from '@angular/core';
import { DigitOnlyDirective } from './digit.only';
import { MaxLengthDirective } from './maxlength';

const COMPONENTS = [
	DigitOnlyDirective,
	MaxLengthDirective
];

@NgModule({
	declarations: COMPONENTS,
	imports: [],

	exports: [COMPONENTS],
	providers: [],
})
export class DirectivesModule { }
