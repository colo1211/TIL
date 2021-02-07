# ch5. Arrow Function은 무엇인가? 함수의 선언과 표현

## 함수

- 프로그램 내에서 각각 저마다 기능을 수행하는 Sub-Program
- 함수 명을 보고 어떤 역할을 수행할 지 예측 가능하게 이름 지어야 함
- 여러 번 재 사용 가능

## 함수 선언

1. function name(매개변수1, 매개변수2) { function body..... return; } 
2. 하나의 함수는 하나의 기능만 수행하도록 설계 
3. 함수의 이름 : 동사형으로 짓는다. (변수 → 명사형) 
4. JS에서 함수는 객체이다. 객체(객체, 배열, 함수) 

→ 함수가 객체이기 때문에 변수에 할당할 수 있고, 매개변수에 줄 수 있고 함수를 리턴 할 수 있다. 

```jsx
'use strict';
function printHello(){
    console.log('hello');
}
printHello(); // 호출

function log(메세지){
    console.log(`value: ${메세지}, 타입: ${typeof 메세지}`);
}

log ('hello@');
log(3);
```

## 매개변수

1. Premitive 매개변수 : passed by Value
2. Object 매개변수 : passed by reference → **참조 (속성의 값만 바꿀 수 있다.)** 

```jsx
function changeName(obj){
    obj.name = 'coder';
}

const ellie = {
    name : 'ellie'
};
console.log(ellie);//{ name: 'ellie' }
changeName(ellie);
console.log(ellie);//{ name: 'coder' }
```

## Default Parameters

```jsx
// 이전 
function showMessage(message , from){
    if (from === undefined){
        from = 'unknown';
    }
    console.log(`${message}, by ${from}`)
}
showMessage('hi'); // hi, by unknown 

// 최신 
function showMessage(message , from = 'unknown'){
    console.log(`${message}, by ${from}`)
}

showMessage('hi'); // hi, by unknown

// 최신2 
function showMessage(message , from = 'unknown'){
    console.log(`${message}, by ${from}`)
}

showMessage('hi','where'); //hi, by where 
```

: 매개변수에 기본 값을 줄 수 있다. 

→ 매개변수에 값이 입력되면 기존에 있던 값을 없애고 새로운 값을 넣을 수 있다. 

> **전달되지 않을 때를 대비하여 작성**

## Rest Parameters (... 배열 이름)

→ 여러 인수를 배열로 받을 때 사용 

```jsx
function printAll(...args){
    console.log(args);
    //1. for 문
    // for (let x=0;x<args.length;x++){
    //     console.log(args[x]);
    // }
    //2. of 문
    // for(let x of args){
    //     console.log(x);
    // }
    //3. forEach문
    // args.forEach((v)=> console.log(v));
}
printAll('kim','kyung','won'); // 배열로 들어가게 된다.
```

## Local Scope (지역변수) ↔ Global Scope (전역변수)

> **JavaScript 스코프 :** **밖에서는 안이 보이지 않고, 안에서만 밖을 볼 수 있다.**

→ 이에 대해서 파생되는 문제점 : **클로저 (Closure)** 

→ 중첩된 함수에서 자식 함수가 부모 함수에 접근 가능한 것이 클로저  

```jsx
let 전역변수 = 'global'; // 전역변수
function printMessage(){
    let message = 'hello'; // 지역변수
    console.log(message);
    console.log(전역변수);
    function printAnother(){
        console.log(message);
        let anotherMessage = 'hello';
    }
    // console.log(anotherMessage); // Error : 밖에서는 안을 볼 수 없기 때문이다.
}
printMessage();
```

## Return a Value

```jsx
function sum(a,b){
    return a+b;
}

const result = sum(1,3);
console.log(result);
console.log(`sum : ${sum(1,2)}`);
```

- **return 타입이 없는 함수는 return undefined; 가 있는 것과 동일하다.**

## Early Return

```jsx
// 나쁜 예  
function upgradeUser(user){
    if (user.point>10){   
    }
}

// 좋은 예 
function upgradeUser2(user){
    if (user.point<=10) return; // 해당 되지 않는 것은 바로 함수를 종료한다. 
    
}
```

## Function Expression (함수 표현)

**First-class Function 특성 때문에 함수는 다른 변수들과 마찬가지로**  

1. 변수에 할당 가능 
2. 매개변수로 전달이 가능 
3. 함수 자체를 리턴 값으로 줄 수 있다. 

```jsx
const print = function(){ // Anonymous Function (익명함수)
    console.log('print');
};
const print_2 = function print(){ // Named Function (이름함수)
    console.log('print_2');
};

print();
const printAgain = print; // printAgain은 print함수를 가리킨다. 
printAgain();

const sumAgain = sum;
console.log(sumAgain(1,3));
```

---

### function declare(함수 선언) vs function expression(함수 표현)

- **declare → 정통적인 선언 방법 , Hoisting 가능**

```jsx
declare(2,3); // 가능 
function declare(param1, param2){
		console.log(param1+param2); 
} 

const a= declare; // 가능 
```

- **expression → 익명함수를 만들고 변수에 할당하는 방법 , Hoisting 불가능**

```jsx
expression(1,3); // 에러 
const expression = function (param1, param2){ // 익명함수 
		console.log(param1+param2); 
} 

const b= expression; // 가능 
```

> **Hoisting : 어디에 선언하던 선언한 것은 맨 위로 끌어올려 주는 행위**

## Call Back 함수

```jsx
 function randomQuiz(answer, printYes, printNo){ 
    if (answer === 'love you'){
        printYes();
    } else {
        printNo();
    }
}

const printYes = function(){// **익명함수**
    console.log('yes');
}
const printNo = function print(){ // **이름함수**
    console.log('No');
	  **// print(); // 재귀함수** 
}
randomQuiz('love you',printYes,printNo);
randomQuiz('1',printYes,printNo);
```

- 인자로 함수를 전달
- printYes (익명) vs printNo(이름)

: 이름 함수는 디버깅을 할 때 유용하며, 재귀호출을 할 때 사용 한다. 

## Arrow Function (화살표 함수)

```jsx
//1. 
const simplePrint = function(){
    console.log('simple print!');
}

const simplePrint_2 = () => console.log('simple print!');

//2. 
const add = function (a,b){
    return a+b;
}

const add_2 = (a,b) => a+b;
```

## 즉시 실행 함수

```jsx
(function hello(){
	console.log('hello'); 
})(); // hello
```