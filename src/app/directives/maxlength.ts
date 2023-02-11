import { Directive, HostListener, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
    selector: '[maxlength]'
})
export class MaxLengthDirective implements AfterViewInit {
    @Input() maxlength: number | undefined | null;

    constructor(
        private el: ElementRef,
    ) {
    }

    ngAfterViewInit(): void {
    }

    @HostListener('focusin', ['$event'])
    onFocus(): void {
    }

    @HostListener('keypress', ['$event'])
    onKeyPress(e: KeyboardEvent): void {
        if (this.maxlength &&  this.maxlength < this.el.nativeElement.value.length) {
            e.preventDefault();
        }
    }
}
