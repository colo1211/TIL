# ch8. 배열 개념과 APIs 총정리

## 배열

: 자료구조의 종류 중 하나, 동일한 타입의 데이터들 끼리 묶어 놓는 자료구조. 

 **But, 자바스크립트는 동적 타입 언어이기 때문에 서로 다른 자료들을 묶을 수 있다.** 

→ 권장하지 않음

**검색, 삽입, 정렬 ,삭제에 대한 API들을 모두 알아 둘 것**

 **→ 배열 내의 모든 요소들은 Index로 접근한다.** 

---

## 배열 선언

```jsx
const arr1= new Array(); // 방법 1   
const arr2 = [1,2]; // 방법 2 
```

---

## Index 위치

```jsx
//2. Index 위치
const fruits = ['apple','banana'];
console.log(fruits); // apple, banana
console.log(fruits.length); // 2 
console.log(fruits[0]); // apple 
console.log(fruits[1]); // banana
console.log(fruits[fruits.length-1]); // 가장 마지막 인덱스 요소를 추출한다. 
```

- 배열의 첫 요소 arr[0]
- 배열의 마지막 요소 arr[arr.length-1];

---

## Looping

```jsx
// 3. Loop
//1.
console.log('for of');
for (let x of fruits){
    console.log(x);
}
//2.
console.log('for 문');
for (let x=0;x<fruits.length;x++){
    console.log(fruits[x]);
}
//3.
console.log('forEach문');
fruits.forEach((value)=> console.log(value));
```

1. for ~ of 는 대상의 요소에 Value에 직접적으로 접근한다. (for ~ of 는 Index에 접근) 
2. for문 
3. **forEach문 (콜백함수(value, index, array 자체))** 

→ Call Back함수를 받아온다. 

```jsx
fruits.forEach(function(){
	console.log('he'); //he*2 (apple, banana)의 길이만큼 he를 출력 
});
```

---

## 삽입, 삭제, 복사

### '뒤에서'

- **push**

: 제일 뒤에서 부터 요소를 넣는다. 

- **pop**

: 제일 뒤에서 부터 하나를 뺀다. pop은 하나를 뽑은 값을 리턴 해준다.  

```jsx
//4. 삽입, 삭제, 복사
// 맨 뒤에서 아이템 넣기 : push(' ')
fruits.push('melon');
fruits.push('peach');
console.log('넣은 후',fruits);
//넣은 후 [ 'apple', 'banana', 'melon', 'peach' ]
// 맨 뒤에서 아이템 하나를 빼기 : pop();
const a= fruits.pop(); // a= peach 
const b= fruits.pop(); // b= melon
console.log('뺀 후',fruits);
//뺀 후 [ 'apple', 'banana' ]
```

### '앞에서'

- **unshift**

: 앞에서 부터 원하는 데이터를 넣는다.  

- **shift**

: 앞에서 부터 원하는 데이터를 뺀다. 

```jsx
// 앞에서 부터 원하는 데이터를 넣기 : unshift(' ', ' ');
fruits.unshift('mango');
console.log(fruits);
// 앞에서 부터 하나씩 데이터를 빼기 : shift();
fruits.shift();
console.log(fruits);
// shift, unshift는 매우 느리다. 안쓰는 것을 추천!
```

> **pop, push는 빠르다. (마지막 요소들만 빼고 추가하기 때문) unshift, shift는 느리다. (처음 요소들을 건들려면 전체의 요소들을 움직여야 하기 때문)**

### '지정된 위치에서' (삭제/삽입)

- **splice (1: 지정된 Index, 2: Index로 부터 삭제할 갯수)**

```jsx
// splice: 시작 인덱스, 몇개 지울 건지 갯수
// fruits.splice(1); // 갯수를 입력하지 않으면 시작 인덱스로부터 모든 것을 삭제한다.
fruits.splice(1,2);
console.log(fruits);

// splice를 통해서 추가도 가능
fruits.splice(1,1,'watermelon','melon'); // 인덱스 1에 위치한 peach를 삭제하고 수박과 멜론을 삽입
console.log(fruits);
```

### 배열 합치기

- **concat**

```jsx
// 2개의 배열 합치기, concat
const fruits= ['apple', 'watermelon', 'melon', 'lemon'];
const fruits2 = ['mogwa','cocoa'];
const newFruits= fruits.concat(fruits2);
console.log(newFruits); //'apple', 'watermelon', 'melon', 'lemon', 'mogwa','cocoa'
```

### 검사

- 배열명.indexOf(요소) → Index 숫자 (없으면 -1 리턴)
- 배열명.includes(요소) → True (없으면 False 리턴)
- 배열명.lastIndexOf(요소) → 중복된 데이터의 마지막 Index 숫자

```jsx
// Searching -> 배열.indexOf
// 만약 해당하는 값이 없다면 -1이 출력된다.
// find index
console.log(fruits);
console.log(fruits.indexOf('apple')); // 0번째 Index 에 위치함을 확인 할 수 있다.

// lastIndexOf 만약 apple이 2개라면 마지막에 있는 apple의 Index를 반환해준다.
fruits.push('apple');
console.log('마지막 사과',fruits.lastIndexOf('apple'));

// 배열명.includes(요소) -> 배열 내 존재하면 true, 없으면 false로 반환해준다.
console.log(fruits.includes('apple'));
```