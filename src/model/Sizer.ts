import { Observable } from './Observable';

export class Sizer extends Observable<string> {
    private touched = false;

    constructor() {
        super('big');
    }

    public isTouched(): boolean {
        return this.touched;
    }

    public touch(): void {
        this.touched = true;
    }

    public reset() {
        this.touched = false;
        this.notify('big', false);
    }
}
