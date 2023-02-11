import { Directive, HostListener, ElementRef, AfterViewInit, Input } from '@angular/core';

@Directive({
    selector: '[digitOnly]'
})
export class DigitOnlyDirective implements AfterViewInit {
    @Input() digitTurnOn = true;

    constructor(
        private el: ElementRef,
    ) {
    }

    ngAfterViewInit(): void {
        this.addInputModeAttr();
    }

    @HostListener('focusin', ['$event'])
    onFocus(): void {
        this.addInputModeAttr();
    }

    @HostListener('keypress', ['$event'])
    onKeyPress(e: KeyboardEvent): void {

        if (!this.digitTurnOn) {
            return;
        }

        const key = Number(e.which);
        if (
            // Allow: Delete, Backspace, Tab, Escape, Enter
            [46, 8, 9, 27, 13].indexOf(key) !== -1
            || (key === 65 && e.ctrlKey === true) // Allow: Ctrl+A
            || (key === 67 && e.ctrlKey === true) // Allow: Ctrl+C
            || (key === 86 && e.ctrlKey === true) // Allow: Ctrl+V
            || (key === 88 && e.ctrlKey === true) // Allow: Ctrl+X
            || (key === 65 && e.metaKey === true) // Cmd+A (Mac)
            || (key === 67 && e.metaKey === true) // Cmd+C (Mac)
            || (key === 86 && e.metaKey === true) // Cmd+V (Mac)
            || (key === 88 && e.metaKey === true) // Cmd+X (Mac)
            // || (key >= 35 && key <= 39) // home: 36, end: 35, left: 37, right: 39, up: 38, down: 40
        ) {
            return;  // let it happen, don't do anything
        }

        // prevent if keycode is out of range [48...57]
        if (key < 48 || key > 57) {
            e.preventDefault();
        }

        // Ensure that it is a number and stop the keypress
        if (
            (e.shiftKey || (key < 48 || key > 57)) &&
            (key < 96 || key > 105)
        ) {
            e.preventDefault();
        }
    }

    private addInputModeAttr(): void {
        if (this.el && this.el.nativeElement) {
            // apply for ctb-input component.
            const inputEl = this.el.nativeElement.getElementsByTagName('input');
            if (this.digitTurnOn) {
                if (inputEl && inputEl[0]) {
                    inputEl[0].setAttribute('inputmode', 'numeric');
                    return;
                }

                // apply for input element
                this.el.nativeElement.setAttribute('inputmode', 'numeric');
            } else {
                if (inputEl && inputEl[0]) {
                    inputEl[0].setAttribute('inputmode', 'text');
                    return;
                }

                // apply for input element
                this.el.nativeElement.setAttribute('inputmode', 'text');
            }
        }
    }
}
