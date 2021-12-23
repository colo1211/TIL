# ch4. 코딩의 기본 operator, if, for loop 코드리뷰 팁

## 연산자

- **String Concatenation**

```jsx
// 1. 문자열 합치기
console.log('my'+' cat');
console.log('1'+2);
console.log(`string litaral: 1+2 = ${1+2}`);
```

→ 백틱(`)을 활용하게 되면 백틱 내에 '을 자유롭게 활용 가능하다. 

→ 줄바꿈 : /n    탭: /t 

- Numeric Operation

```jsx
// 2. 숫자연산자
console.log(5%2); // 나머지 값
console.log(5**2); //  제곱
```

- 증감연산자

```jsx
// 3. 증감연산자
let count = 2;
const preIncrement = ++count;
// counter = counter+1;
console.log(`count:${count}, preIncrement:${preIncrement}`);

const postIncrement = count++;
console.log(`count:${count}, postIncrement:${postIncrement}`);
```

- 할당연산자

```jsx
// 4. 할당연산자
let x=3;
let y=6;

x+=y;// x=x+y; 9
x-=y;// x=x-y; 3
x*=y; // x=x*y; 18
x/=y; // x=x/y; 3
console.log(x);
```

- 논리연산자

**→ ||(or) : 하나라도 true 이면 true**  

→ **&&(and) : 모두 true 이어야 true** 

**→ !(not) : 현재 가진 값의 반대** 

```jsx
// 5. 논리연산자 ||, &&, !

const value1= true;
const value2= 4<2 ;

**console.log(`or: ${value1||value2||check()}`);** // 하나라도 true면 true

// Heavy 한 연산을 가장 끝으로 보내야 한다. Check()

function check(){
    for(let i =0; i<10; i++){
     console.log('$'); // $ 10번 출력(의미X)
    }
    return true;  // 결국 true 출력
}

console.log(`and : ${value1&&value2&&check()}`); // false
```

- Equality (==, ===)

```jsx
// 6. Equality == , ===
const stringFive = '5';
const numberFive = 5;

console.log(stringFive==numberFive);
console.log(stringFive === numberFive);
```

1. == (loose equality) : 타입에 대한 것은 확인하지 않고 내용이 같으면 같다. ('5'=5) 
2. === (strict equality) : 타입이 다르면 내용이 같아도 다르다. ('5'≠5)

⇒ ===을 쓰는 것을 습관화 할 것! 

**연습**

```jsx
// Equality 연습

console.log(0==false); // true, 0은 false
console.log(0===false); // false, 0은 number 타입
console.log(''==false); // true, ''은 false
console.log(''===false); // false, '' 은 String 타입
console.log(null==false); // true, null은 false
console.log(null===false);//false
```

- **Object**

```jsx
// 객체

const ellie1 = {name : 'ellie'};
const ellie2 = {name : 'ellie'};
const ellie3 = ellie1; // ellie3에 ellie1을 선언

console.log(ellie1 === ellie2); //false , 속성이 동일해도 다르다. 
console.log(ellie1 === ellie3); // true
```

---

## 조건문, 반복문

**조건문** 

- ?연산자 (Ternary 연산자)

→ 조건? true:false 

→ true 면 왼쪽 false는 오른쪽

```jsx
// Ternary 연산자: ?
// 조건? true:false
const name = 'ellie';
console.log(name === 'ellie' ? 'yes':'no');
```

- Switch (if/else가 너무 반복된다면 사용)
1. Switch 내에 조건 변수 
2. Case 내에 맞힐 변수들 
3. default는 아무것도 없을 때, 출력 될 문장
4. break; 는 조건을 찾았다면 그만 두라는 명령어  

```jsx
//Switch
const browser = 'Chrome';
switch(browser){ 
    case 'IE':
        console.log('goaway');
        break;
    case 'Chrome':
    case 'firefox':
        console.log('love you!');
        break;
    default:
        console.log('hello');
        break;
}
```

**반복문** 

: while , do-while, for문

```jsx
// Loops
// While : 조건이 맞을 때만 실행한다.
let i =3;
while(i>0){
    console.log(i);
    i--;
}

// i는 현재 0
//do-while: 조건이 맞던 틀리던 일단 한번 실행한다.
do {
    console.log(i)
    i--;
}while(i>0);

//for문
for (let i =3; i>0;i--){
    console.log(i);
}
```

> **break는 끝내기 ,  continue는 조건의 것을 스킵 하고 다음 것으로 넘어감**