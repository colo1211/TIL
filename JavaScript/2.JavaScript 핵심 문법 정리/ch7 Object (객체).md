# ch7. Object (객체)

## Object 생성 방법

1. '**Object literal'** (객체 초기화):  const obj1 ={}; 
2. '**Object constructor' (**클래스 생성자): const obj2 = new Object( );

### Object

→ {key : value}; 의 집합체 구성되어 있다. 

**JS는 동적 타입 결정 언어 (Dynamic Type Lang) : RunTime에 Type 이 결정** 

```jsx
// 객체일때
const ellie = {name : 'ellie', age : 35};
function printf(person){
    console.log(person.name);
    console.log(person.age);
}
printf(ellie);
ellie.hasJob = true; // 동적 타입 언어이기 때문에 선언 이후에 추가가 가능 But 유지보수 힘듦**
console.log(ellie); //{ name: 'ellie', age: 35, hasJob: true }
delete ellie.hasJob; // 동적 타입이기 때문에 나중에 삭제도 가능**
console.log(ellie); //{ name: 'ellie', age: 35 }
```

 Obejct 를 생성한 이후

- Object의 속성을 추가/삭제(delete) 가 가능

  

---

## Computed Properties

1. **Object명.key : 보통의 경우 사용, 값을 사용 할 때**  
2. **Object명['key'] : RunTime에서 결정 될 때, 실시간 성**  

```jsx
//2. Computed Properties
console.log(ellie.name);
ellie['hasJob']=true; //
console.log(ellie['name']); // 배열에서 데이터를 받아오는 것처럼 가능 (단, String Type으로!)
console.log(ellie);
```

**2번 사용 경우 (동적으로 Key의 Value를 받아 올 때)** 

```jsx
//1번 
function printValue(obj, key){
    console.log(obj.key);
}
printValue(ellie,'name'); // undefined

//2번 
function printValue(obj, key){
    console.log(obj[key]);
}
printValue(ellie,'name'); // ellie
```

---

## 팩토리 패턴 (클래스와 기능 동일)

→ 클래스 사용 이전 객체 생성 방법

- 새로운 객체 생성 시 new 를 안붙인다.

```jsx
const person1 = {name: 'bob',age:2};
const person2 = {name: 'steve',age:3};
const person3 = {name: 'jobs',age:4};

// 함수로 팩토리패턴 생성 
function Person(name,age){
    return {
        name, // name : name 
        age, // age : age , **Property Value Shorthand** (Key와 Value 이름 동일하면 생략가능) 
    };
}
const person4 = makePerson('kim',10);
console.log(person4);
```

## Constructor Function (생성자 함수)

- Factory pattern에서 this를 붙인다.
- 객체를 만들 때 new 붙인다.

```jsx
// Constructor Function(생성자 함수) 
function Person(name, age){
    // this ={};
    this.name = name;
    this.age = age;
    // return this;
}
const person4 = new Person('kim',10); // 새로운 객체를 생성할 때 new를 붙여준다. 
console.log(person4);
```

> **Tip : this를 쓰면 새로운 객체를 생성할 때 new 를 쓰고, 아니면 new를 안쓴다.**

---

## (key) in (Obejct)

- 해당 Object 내에 Key의 존재 유무를 확인

```jsx
console.log('name' in ellie); //T
console.log('age' in ellie);  //T
console.log('random' in ellie); //F
```

---

## for .. in vs for .. of

- for in : 반복문을 통해 index를 리턴 → 따라서, 객체의 key 값을 알아내기 유용
- forEach, for of : 반복문을 통해 해당하는 값 자체를 리턴

```jsx
// for in(객체) vs for of(배열)
for (let key in person1){ // 객체 내의 key 값을 사용하고 싶을 때
    console.log(key); // name, age
}

const arr = [1,2,3,4,5];
for (let i of arr){
    console.log(i);
}
```

> 암기 Tip : **in**은 **in**dex를 리턴, of는 값 자체를 리턴

**따라서, in은 객체에서 사용하면 key 값을 뽑아내는 데 유용하다.** 

 **of는 배열에서 배열의 값 자체를 뽑아내는데 유용하다.** 

---

## 참조 vs 복사

### 기본적으로 JS에서 객체를 선언할 때 객체를 넣으면 참조 관계!

- 객체는 선언할 때 user에 user3을 선언하면 참조가 이루어 지게 된다.
- 따라서, user2를 변경하면 user의 값도 변경된다.

```jsx
// 참조 vs 복사
const user = {name : 'ellie', age : 20};
const user2 = user; // 객체는 참조관계를 가진다.
user2.name = 'coder'; //user2를 변경하면 user value 도 변경된다.
console.log(user.name);
```

참조가 아닌 **복사를 하는 방법 1** 

```jsx
// 복사방법 1.
const user3 ={};
for (let x in user){
    user3[x] = user[x];
}

user3.name = 'kim';
console.log(` user3의 이름을 Kim 으로 변경하였습니다. ${user3}`);
console.log(`그런데도 user는 user3과 참조관계가 아닌 복사 관계이기 때문에 이름이 그대로 ${user.name} 입니다.`);
//user3의 이름을 Kim 으로 변경하였습니다. [object Object]
//그런데도 user는 user3과 참조관계가 아닌 복사 관계이기 때문에 이름이 그대로 coder 입니다.
```

참조가 아닌 **복사를 하는 방법 2** 

: Object.assign(복사 당할 객체, 복사 될 객체 ) 

```jsx
// // 복사방법 2.
// const user4 ={};
// Object.assign(user4, user3);
// console.log(user4);

const user4 = Object.assign({},user3);
console.log(user4);
```

- 예제

```jsx
onst fruit1 = {color:'red'};
const fruit2 = {color:'yellow',size: 'big'};
const mixed = Object.assign({},fruit1,fruit2);
console.log(mixed); // yellow, big
```

fruit1 → fruit2 순으로 

계속 덮어 씌여 지기 때문에 최종적으로 마지막 yellow, big 의 값으로 복사된다.