// Reactive Extensions for JavaScript
import { interval } from "rxjs";
import { bufferTime } from "rxjs/operators";

const source$ = interval(100); // Emits every 100ms
const buffered$ = source$.pipe(bufferTime(500)); // Collects values every 500ms

buffered$.subscribe((data) => console.log("Processed:", data));
