# ch3. 데이터타입, data types, let vs var, hoisting

## 변수 : let , const

**let (Mutable Type, Read/Write O)** 

**→ block Scope** 

: let name 으로 메모리 상에 변수가 할당 된 곳을 포인터를 통해서 가리킨다. 

변수를 선언한 이후에 수정이 가능하다. 

```jsx
let name = 'elle';
console.log(name);
name = 'hello';
console.log(name);
```

```jsx
'use strict';

let globalName = '전역변수';
{
    let name = 'elle';
    console.log(name);
    name = 'hello';
    console.log(name);
		console.log(globalName); 
}
console.log(name); // X
console.log(globalName);// 전역변수
```

블록 내에서 쓰지 않고 블록 밖에서 쓰는 변수들은 어디서나 접근이 가능하다. 

**But, 프로그램이 끝날 때 까지 메모리에 저장되어 있기 때문에 최소한으로 사용하는 것이 좋다.** 

---

**const (Immutable Type, Read O Write X)**  

: 메모리를 가리키는 포인터가 잠긴다. 따라서, 변경이 불가능하다.   ****

const를 사용하는 이유 

1. 보안상의 이유
2. Thread safety 
3. reduce human mistakes

```jsx
const daysInWeek = 8; 
const maxNumber = 5; 
```

---

## var 쓰면 안되는 이유

1. **Var Hoisting (호이스팅, 끌어올려주다)** 

```jsx
age = 3; 
var age; 
console.log(age); 
```

: 어디에 선언했냐에 상관없이 선언한 것을 프로그램의 가장 위로 끌어올려주는 역할, 호이스팅

**2. Block Scope를 무시한다.** 

```jsx
{
	age= 3; 
	var age; 
} 
console.log(age); // 3 
```

---

## 변수 타입

1. **Primitive**, Single Item (더 이상 작은 단위로 나누어 질 수 없는) 
- 숫자, 문자열, 부울린, null, undefined, symbol

  2. **object**, Box container (객체) 

- Primitive, Single Item을 묶어서 하나의 박스로 관리해 줄 수 있게 해줌

  3. **function**, **first-class function** (함수) 

- 함수도 다른 데이터 타입처럼 변수에 할당이 가능, 함수의 인자로 함수를 전달 가능, 리턴값으로 함수를 전달 가능

> int, double, float 등 모든 숫자를 Number로 type을 지정해준다.

### Number

```jsx
const count =18;
const size = 18.1;

console.log(`value: ${count} size: ${typeof count}`);
console.log(`value: ${size} size: ${typeof size}`); 
//value: 18 size: number
//value: 18.1 size: number
```

문자열 내에서 변수를 띄어쓰기 없이 편하게 사용하고 싶다면? **템플릿 리터럴**

- `  ~~~~~ ${변수명}  ` , `(백틱)

변수의 타입을 알아보고 싶다면? 

- typeof 변수명

infinity , negative infinity, **Not A Number (NaN)** 

```jsx
const infinity = 1/0;
const negative_infinity = -1/0;
const nAn = 'not a number'/2; // 문자열/숫자 -> NaN 숫자가 아니다. 

console.log(infinity);
console.log(negative_infinity);
console.log(nAn);
```

**참고!** 

숫자는 -2^53~2^53 까지만 지원 가능. 

최근에 숫자 끝에 n을 붙여 bigint 라는 자료형이 추가되었음 

```jsx
const a= 213421413132313213132133132131n;  
console.log(`a:${a} type:${typeof a}`); 
//a:213421413132313213132133132131222222222222222222222222222222222222 type:bigint
```

### String

: 문자, 문자열 구분 X 

```jsx
const char = 'c'; // 문자
const brendan = 'brendan';//문자열
const greeting = `hi ${brendan}`; // 변수를 선언할 때도 가능하다.
console.log(`value:${char}, type:${typeof char}`);
console.log(`value:${brendan}, type:${typeof brendan}`);
console.log(`value:${greeting}, type:${typeof greeting}`);
```

### Boolean

**false : 0, null, undefined, NaN, null, ' ' (6개) → 암기!** 

true : false 이외 모두 

```jsx
//Boolean
const canRead = true;
const test = 3< 1; //false

console.log(`value : ${canRead}, type:${typeof canRead}`);
console.log(`value : ${test}, type:${typeof test}`);
//value : true, type:boolean
//value : false, type:boolean
```

### null vs undefined

→ 둘 다 값이 없음은 동일하다. 

null : 사용자가 직접 정의한 값이 없음 

undefined : 선언만 하고 값을 대입하지 않았을 때 컴퓨터가 임의로 지정해주는 값 

```jsx
// null
let nothing = null;
console.log(`value:${nothing}, type:${typeof nothing}`);

//undefined
let x;
console.log(`value:${x}, type:${typeof x} `);

//value:null, type:object
//value:undefined, type:undefined
```

### Symbol

- 주어지는 식별자가 동일해도 각각의 고유한 식별자를 생성한다.

```jsx
const symbol1= Symbol('id'); 
const symbol2= Symbol('id'); 
console.log(symbol1 === symbol2); //false
```

- 식별자가 동일할 때 서로 같은 식별자를 가지길 원할때는 Symbol.for

```jsx
const symbol1= Symbol.for('id'); 
const symbol2= Symbol.for('id'); 
console.log(symbol1 === symbol2); //true
```

⇒ Symbol을 출력하고 싶을 땐 .description 

```jsx
console.log(symbol1.description);//id
```

---

## Dynamic typing : dynamically typed language

```jsx
//Dynamic
let text = 'hello';
console.log(text.charAt(0));//h
console.log(`value:${text}, type :${typeof text}`);

text=1;
console.log(`value:${text}, type :${typeof text}`);

// 문자와 숫자를 더할 때는 문자열에 숫자를 합침 
text = '7'+5;
console.log(`value:${text}, type :${typeof text}`);//75 (String) 

// 문자와 문자를 나눌 때 나눗셈은 문자를 못하므로 숫자로 자동변경 
text = '7'/'5';
console.log(`value:${text}, type :${typeof text}`); // 1.xxx (Number) 

console.log(text.charAt(0)); // String이 아니게 됨 -> Error
// JS는 Runtime 도중 타입이 변경되기 때문
```

## Object

```jsx
//Object
const kyungwon ={
    name : 'kyungwon',
    age :25,
};
console.log(kyungwon);
kyungwon.age = 26;
console.log(kyungwon);
```

: 객체를 변경할 수는 없지만 객체 내의 속성을 변경 가능하다.