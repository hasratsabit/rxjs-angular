import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, interval, defer, timer } from 'rxjs';
import { buffer, bufferCount, take, bufferTime, tap, bufferToggle, bufferWhen, window, switchMap, toArray, windowCount, windowToggle } from 'rxjs/operators';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, AfterViewInit {


  @ViewChild('click') clickButton: ElementRef

  constructor() { }


  ngAfterViewInit() {

    // buffer => It collect all the values emitted from the source and stores in an array and it can be released by an event, interval or any source of events passed to the buffer.

    /*
    let bufferBy = fromEvent(this.clickButton.nativeElement, 'click');
    interval(1000)
      .pipe(
        buffer(bufferBy)
      ).subscribe(val => {
        console.log(val);
      })
    */

    // bufferCount => The same as buffer but it takes a number as parameter to specify the number of value in each buffer. It also takes an optional parameter to specify the start of a new a buffer.

    /*
    let bufferBy = fromEvent(this.clickButton.nativeElement, 'click');
    interval(1000)
      .pipe(
        bufferCount(3),
        buffer(bufferBy)
      ).subscribe(val => {
        console.log(val);
      });
    */

    // bufferTime => collect emitted value after the given time is passed. It also takes a second argument the as the time of second buffer to start.

    /*
    interval(1000)
      .pipe(
        take(6),
        bufferTime(2000, 1000)
      ).subscribe(val => {
        console.log(val);
      })


    */
   
    // bufferToggle => When the source emits a value, it starts to collect those values, and it closes the badge when it is asked to close. It is useful, when we want to collect certain types of data while not some

    /*
    let opening = interval(400).pipe(tap(() => console.log('Opening'))); // Triggers to print the collected value.
    let closing = () => interval(300).pipe(tap(() => console.log('Closing'))); // Callback that triggers to close the badge.

    interval(100)
      .pipe(
        tap(x => console.log(x)),
        bufferToggle(opening, closing),
        take(5)
      ).subscribe(val => {
        console.log(val);
      })

    */

   const a = timer(1000);
   const source = interval(200);
   
   /*
   source
     .pipe(buffer(defer(() => a)))
     .subscribe(
       value => console.log("using buffer with defer:", value),
       error => console.error("using buffer with defer:", error)
     );
   */
   // using buffer with defer: [0, 1, 2, 3]
   // using buffer with defer: complete
   /*
   source // bufferWhen(() => a)
     .pipe(bufferWhen(() => a))
     .subscribe(
       value => console.log("using buffer when:", value),
       error => console.error("using buffer when:", error)
     );
  */

  // Window => It works the same as buffer, but it emits observables instead of actual value. To see the value, we can use switchMap() to get the value.
    /*
      interval(100)
        .pipe(
          window(interval(1000)),
          take(5),
          switchMap(w => w.pipe(toArray()))
        ).subscribe(val => {
          console.log(val);
        })

    */

    // windowCount => Works the same as window except it emits until the badge is filled with number of values we specify as a number parameter.
    /*
    interval(100)
        .pipe(
          windowCount(5),
          take(5),
          switchMap(w => w.pipe(toArray()))
        ).subscribe(val => {
          console.log(val);
        })
    */

    let opening = interval(300).pipe(tap(() => console.log('Opening')));
    let closing = () => interval(200).pipe(tap(() => console.log('Closing')));
    interval(100)
        .pipe(
          windowToggle(opening, closing),
          take(5),
          switchMap(w => w.pipe(toArray()))
        ).subscribe(val => {
          console.log(val);
        })
  }




  ngOnInit() {
  }

}
