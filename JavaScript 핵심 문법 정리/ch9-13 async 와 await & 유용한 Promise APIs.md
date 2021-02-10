# ch 13. async 와 await & 유용한 Promise APIs

*참고 링크: https://www.notion.so/12-async-await-bac523cb75da44ce8cfd3c55f9761dc5*

## Promise Chaining


- **async / await은 Promise 를 간편하게, 동기적으로 실행**
- Promise 위에 간편한 API들을 추가해준 것이 **async / await**

- 비동기 처리 X 코드

```jsx
function fetchUser(){
 // do network request in 10sec .... 
	return 'ellie';
}

const user = fetchUser(); 
console.log(user); // ellie 
```

→ 10초 이후에 아래의 코드들이 수행된다!

- **위의 코드를 Promise 처리**

```jsx
//1. async 비동기
function fetchUser(){
//     사용자의 데이터를 백엔드로부터 요청받아오는데 10초가 걸리는 코드 있다고 가정
//     Promise: 언제 데이터가 들어 올지 모르지만 유저의 데이터가 준비되는 대로 then을 붙여놓으면 그리로 전송해줄께!
    return new Promise((resolve, reject) => {
      resolve('ellie');
    })
}
const user = fetchUser(); 
user.then(console.log); // Promise를 then으로 받는다. 
```

**Promise를 하지 않고 함수 앞에 async를 쓰면 자동으로 함수가 Promise화 된다.** 

- **async (위와 완전히 동일한 코드)**

```jsx
async function fetchUser(){
      return 'ellie';  
}
const user = fetchUser(); 
user.then(console.log); // Promise를 then으로 받는다. 
```

→ Promise와 동일하므로 then으로 받는 것이 가능하다. 

- **await**

→ async 가 붙은 함수 내에서만 사용이 가능하다.

→ Promise를 리턴 받는다.  

```jsx
function delay(ms){
    return new Promise(resolve => setTimeout(resolve,ms)); // ms초가 지나면 resolve를 반환
}

async function getApple(){
    await delay(2000); // await을 쓰게 되면 delay가 끝날 때 까지 apple을 return 하지 않고 기다린다.
    // throw 'error'; // 에러 발생
    return 'apple'; // 2초 후 사과 리턴
}

async function getBanana(){
    await delay(1000);
    return 'banana'; // 1초 후 바나나 리턴
} 
```

여기서 getBanana() 함수를 Promise화 시킨다면? **Chaining** 

```jsx
//위의 코드와 동일 // 1초 후에 바나나를 리턴
function getBanana(){
    return delay(1000).then(()=>'banana');
}
```

- 사과와 바나나를 모두 따오는 함수 (Promise)

```jsx
// 과일들을 한번에 따오는 함수
function pickFruits(){
    return getApple().then(apple=>{
            return getBanana().then(banana => `${apple} + ${banana}`);
    });
}

pickFruits().then(console.log); // 3초 후에 출력 
// Promise 지옥...
```

- 위의 코드를 async로!

```jsx
// async를 활용하면 아래와 같이 개선 가능하다.
async function pickFruits(){ // try, catch 를 통해서 Error Handling도 가능
    const apple = await getApple();// 1초
    const banana = await getBanana(); // 2초
    return `${apple}, ${banana}`; // 합해서 3초 -> 병렬적으로 처리가 필요할 수 있다.
}
```

**Error Handling** 

: try(성공) catch(실패) 를 활용한다.  

```jsx
// async를 활용하면 아래와 같이 개선 가능하다.
async function pickFruits(){ // try, catch 를 통해서 Error Handling도 가능
    try{
		const apple = await getApple();// 1초
    const banana = await getBanana(); // 2초
    }catch(){
		}
		return `${apple}, ${banana}`; // 합해서 3초 -> 병렬적으로 처리가 필요할 수 있다.
}
```

## await 병렬처리

방법 1. 

```jsx
async function pickFruits(){ // try, catch 를 통해서 Error Handling도 가능
    const applePromise = getApple(); // 미리 받아두고
    const bananaPromise = getBanana();
    // 한번에 처리
    const apple = await applePromise;// 1초
    const banana = await bananaPromise; // 2초
    return `${apple}, ${banana}`; 
}
pickFruits().then(console.log); // 동시에 가능 
```

방법 2. API 활용

- **Promise.all()** : 배열로 모든 Promise가 모일 때 까지  병렬적으로 처리 가능

```jsx
// Promise.all : 병렬적으로 처리, 배열로 간주된다.
function pickAllFruits(){ // 3초
    return Promise.all([getApple(),getBanana()]) // 두개가 다 받아지면!
        .then(fruits=>fruits.join('+'));
}
pickAllFruits().then(console.log);
```

- **Promise.race**

: 처음으로 도달하는 Promise만 출력 

```jsx
// 첫번째 과일만
function pickOnlyOne(){
    return Promise.race([getApple(),getBanana()])
}
pickOnlyOne().then(console.log); // 바나나 출력(바나나 1초, 사과 2초)
```