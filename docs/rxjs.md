### 1. 이벤트를 발행하는 Observable, Subject

Observable: new Observable() 나 Observable객체를 반환하는 메소드로 생성하여 내부에서 이벤트를 발행  
Subject: new Subject()를 사용하여 이벤트 발행하는 객체를 만들수 있다.  
Subject를 저장한 변수로 외부에서 .next()로 이벤트를 발행할 수 있다.  
fromEvent(domElement, "eventName"): 돔객체로부터 이벤트를 감지하는 Observable 객체 반환  
from(Array): 배열을 순회하는 Observable 객체 반환  
of(value1, value2, ...): of 안의 값에 대해 이벤트를 발산하는 Observable 객체

### 2. 이벤트를 받아 특정행위를 수행하는 pipe

Observable과 Subject는 pipe에서 여러 operator를 받아 수행할 수 있다.

#### 자주쓰는 연산자

tap: 순수함수에서 순수성을 제거 할 수 있다(값 변경가능), console.log를 확인할 수 있다.  
map: 자바스크립트 native map과 유사  
filter: 자바스크립트 native filter와 유사  
reduce: 자바스크립트 native reduce와 유사  
scan: reduce와 유사하지만 각각의 엘리먼트를 순회하면서 이벤트 발생  
switchMap: 이벤트를 반환하는 중에 새로운 이벤트 감지시 항목 방출을 중지하고 새로운 이벤트를 방출  
ajax: ajax 요청을 한다.  
max: 최대값 반환  
min: 최소값 반환  
pluck: 객체의 키로 값을 가져온다. 깊은 객체의 값을 가져올 경우 ","로 구분하여 작성한다.  
debounceTime: 마지막 이벤트로부터 설정한 시간만큼 지난 후 마지막 이벤트 리턴  
auditTime: 처음 이벤트로 부터 설정한 시간만큼 지난 후 마지막 이벤트 리턴  
sampleTime: 설정한 시간 간격으로 마지막 이벤트 리턴  
throttleTime: 처음 이벤트로부터 설정한 시간 만큼 지난 후 처음(leading) 또는 마지막(trailing) 이벤트 리턴  
그외 api, operators 참고: https://rxjs.dev/api

### 3. 이벤트가 발생되면 실행하는 subscribe(event, err, complete)

이벤트를 감지하면서 새로운 이벤트 발생시 실행한다.  
첫번째 인수는 이벤트 실행시, 두번째 인수는 에러 발생시, 세번째는 complete 이벤트가 발생되었을 때 실행하는 메소드를 넣는다.  
이벤트 구독이 더 이상 필요하지 않을 때 unsubscribe 하여 메모리를 해제해야 한다.\*  
예시)

```javascript
const observer = {
  next: (x) => console.log("Observer got a next value: " + x),
  error: (err) => console.error("Observer got an error: " + err),
  complete: () => console.log("Observer got a complete notification"),
};
```

### 4. 멀티쓰레드를 위한 Scheduler

#### 4-1. 스케쥴러 지정방식

SubscribeOn: 옵저버블 또는 이를 처리할 "연산자"를 실행할 스케쥴러 지정  
ObserverOn: "구독자"에게 알림을 보낼 때 사용할 스케쥴러 지정

#### 4-2. 스케쥴링 방식

null: 스케쥴러 없음, 동기, 재귀적으로 사용되는 연산자에 사용  
queueScheduler: 새 작업을 현재의 작업 대기줄 맨끝에 사용, 반복연산자에 사용  
asapScheduler: Promise에 사용되는 것과 동일 - 현재 작업이 끝나고 다음 소작업을 하기 전 실행, 비동기 작업에 사용  
asyncScheduler: setInterval과 함꼐 사용, 시간 연산자와 사용  
animationFrameSchedule: 브라우저가 새롭게 Paint 하기전 실행, 부드러운 애니메이션을 위해 사용
