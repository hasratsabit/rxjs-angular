import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, interval, defer, timer, of, Observable } from 'rxjs';
import { buffer, bufferCount, take, bufferTime, tap, bufferToggle, bufferWhen, window, switchMap, toArray, windowCount, windowToggle, map, catchError, throwIfEmpty, onErrorResumeNext, retry, retryWhen, timeout, timeoutWith, skip, skipLast, skipUntil, takeWhile, skipWhile, takeLast, takeUntil, distinct, distinctUntilChanged, distinctUntilKeyChanged, filter } from 'rxjs/operators';
import { pipe } from '@angular/core/src/render3';

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
    /*
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

    */

    // windowCount => This is the same as bufferCount. We can pass the number of values that goes inside a buffer before it is emitted. It takes a second parameter too to specifies when the next buffer should start. Check example 2.
    /*
    let source = timer(0, 100).pipe(take(12))
    source
        .pipe(
          windowCount(2),
          switchMap(w => w.pipe(toArray()))
        )
        .subscribe(val => {
          console.log(val);
        })
    */
  /*
  timer(0, 100).pipe(take(12))
        .pipe(
          windowCount(2, 3),
          switchMap(w => w.pipe(toArray()))
        ).subscribe(val => {
          console.log(val);
        })

  */

  // catchError => Allows us to use the operator for error handling in a way that doesn't disrupts the stream of value coming from source data. Like in the example bellow we are transforming the emitted values toUpperCase while we have a numeric value that can't be uppercased. So we are returning undefined for the error to not disrupt the flow of data. In this case we are ignoring the error, but we can do whatever we want with error within that catch block.
  /*
  of('a', 1)
        .pipe(
          map(v => v.toUpperCase()),
          catchError(err => {
            return of(undefined);
          })
        )
        .subscribe(d => {
          if(d) console.log(d);
        }, err => console.log(err), 
        () => console.log('Completed'));

    */

    // throwIfEmpty => If the source is completed without emitting any value, this operator gives us the ability to force that as an error. As in the example bellow, the of observable gets completed without emitting value because it is empty. But we force to be an error with throwIfEmpty operator.
    /*
    of()
      .pipe(
        throwIfEmpty(),
      ).subscribe(val => console.log(val), err => console.log(err.message));

    */

    // onErrorResumeNext => The name of this operator could be really decieving. This operator should've name something switchOnError or something. As it is named, it means it will resume to get the next value if an error is occurred on the current value. In reality, it switches to a completely new observable sequense. And the other tricky part is that it swallows the error and does not throw it. This operator could be also used to switch to a new observable when the source obserable is completed.

    /*
    let source = of('feed1', 'feed2', 'feed3');
    let backup = of('Hey I am the backup');
    source
        .pipe(
          map(feed => {
            if(feed === 'feed2') {
              throw new Error('I will not be displayed.');
            }
            return feed;
          }),
          onErrorResumeNext(backup)
        ).subscribe(val => console.log(val));
    */

    // retry => Is simply retrying to call the source by whatever number we pass to it. It is usually useful during making http calls. In the example bellow a will print 3 times because 2 is a number and we are retrying 3 times to apply uppercase.
    /*
    of('a', 2)
          .pipe(
            map(v => v.toUpperCase()),
            retry(3)
          ).subscribe(val => console.log(val))
    */

    // retryWhen => Is an observable source based on a error based on give criteria.
    /*
    interval(500)
      .pipe(
        map(val => {
          // Generate error
          if(val > 5) throw val;
          return val;
        }),
        retryWhen(error => error.pipe(tap(val => console.log(`Value ${val} was too high`))))
      ).subscribe(val => console.log(val));
    */

    // timeout => Allows us to throw error if the source observable doesn't emit value until the specified time we pass to the timeout. 
    /*
    Observable.create(observer => {
      setTimeout(() => observer.next('A'), 300),
      setTimeout(() => observer.next('B'), 200),
      setTimeout(() => observer.next('C'), 250),
      setTimeout(() => observer.complete(), 400)
    })
    .pipe(timeout(500))
    .subscribe(val => {
      console.log(val);
    })
    */

    // timeoutWith => It allows us to switch to a backup if the given time is passed and source observable has not emitted any value. The fallback or backup is passed as the second parameter.
    /*
    let backup = of('A', 'B', 'C');
    let source = Observable.create(observer => {
      setTimeout(() => observer.next('D'), 300),
      setTimeout(() => observer.next('E'), 300),
      setTimeout(() => observer.next('F'), 300),
      setTimeout(() => observer.complete(), 300)
    })
    
    source
      .pipe(timeoutWith(100, backup))
      .subscribe(val => console.log(val));

    */

    // skip => Is used to drop the number of values that's passed to the skip.
    /*
    let source = of(1, 2, 3, 4, 5, 6);
    source
    .pipe(
      skip(3)
    ).subscribe(val => console.log(val)); // Output: 4,5,6
    */

    // skipLast => Is used to skip the numbers of emitted values starting from the end of the array.
    /*
    of(1,2,3,4,5,6)
      .pipe(
        skipLast(3)
      ).subscribe(val => console.log(val));
    */

  // skipUntil => It takes an inner observable and skips all the values emitted from source observable until the inner the observable is started.
  /*
  timer(0, 1000)
        .pipe(
          take(6),
          skipUntil(timer(3000))
        ).subscribe(val => console.log(val));
  */
    // skipWhile => Allows us to pass a condition to either emit values or not. Any value that's not emitted until the condition is met, will not be part of the final set, even if we create a new observable. 
    /*
    of(1,2,3,4,5,6,7,8,9,10)
          .pipe(
            skipWhile(val => val < 5)
          ).subscribe(val => console.log(val));
    */

    // take => Allows us to limit the number of values we are getting from source observable.
    /*
    timer(0, 100)
        .pipe(
          take(5)
        ).subscribe(val => console.log(val));
    */

    // takeLast => Allows to get the last values of source observable begining where we specify
    /*
    of(1,2,3,4,5,6,7,8,9,10)
    .pipe(
      takeLast(5)
    ).subscribe(val => console.log(val)); // Output 6 - 10;
    */

    // takeUntil => It takes an inner observable and collects all the values from the source observale until the inner observable starts.
    /*
    timer(0, 100)
      .pipe(
        takeUntil(timer(500))
      ).subscribe(val => console.log(val));
    */

    // takeWhile => Allows us to collect values from source observable until the condition evaluates to false.
    /*
    of(1,2,3,4,5,6,7,8,9,10)
    .pipe(
      takeWhile(val => val < 5)
    ).subscribe(v => console.log(v));
    */

    // distinct => 1 - Allows us to collect unique values from the source observable.
    /*
    of(1,2,3,3,2,1)
      .pipe(distinct())
      .subscribe(val => console.log(val));
    */

    // 2 - We can also pass a function to describe what a unique value is.
    /*
    of(1,2,3,3,-2,1)
    .pipe(
      distinct(x => Math.abs(x))
    ).subscribe(val => console.log(val));
  */
  // 3 - Example with object.
  /*
  of({name: 'John', isActive: true}, {name: 'Jane', isActive: false}, {name: 'John', isActive: true})
  .pipe(
    distinct(item => item.name)
  ).subscribe(val => console.log(val));
  */

  // distinctUntilChanged => It compare the currently emitted value with previous immediate value. If it is the same, it gets dropped and not passed to the user.
  /*
   of(1,1,2,3,3,4,5,5)
    .pipe(
      distinctUntilChanged()
    ).subscribe(val => console.log(val));
  */

  // Example 2: 
  /*
  of(1,-1,2,3,-3,4,5,-5)
    .pipe(
      distinctUntilChanged((x: number, y: number) => Math.abs(x) === Math.abs(y))
    ).subscribe(val => console.log(val));
  */

  // distinctUntilKeyChanged => It works the same as distinctUntilChanged except it works on object.
  const posts = [
    {postId: 1, likes: 3, user: {id: 1}},
    {postId: 2, likes: 4, user: {id: 2}},
    {postId: 3, likes: 4, user: {id: 3}},
    {postId: 4, likes: 5, user: {id: 3}},
    {postId: 5, likes: 6, user: {id: 4}},
  ]

  /*
  of(...posts)
   .pipe(
     distinctUntilKeyChanged('likes')
   ).subscribe(val => console.log(val));
  */
   // Example 2: In this example we pass the field name, and we also pass a callback to evaluate our condition on that field. And drop the values that evaulation results to false.
   /*
   of(...posts)
    .pipe(
      distinctUntilKeyChanged('user', (a1, a2) => a1.id === a2.id)
    ).subscribe(val => console.log(val));
  */

  // filter => Allows us to filter the emitted values from source observable based on the condition we apply. In the example bellow we only collect values that are even values. 
  /*
  of(1,2,3,4,5,6,7,8)
      .pipe(
        filter(x => x % 2 === 0)
      ).subscribe(val => console.log(val));
  */


  }





  ngOnInit() {
  }

}
