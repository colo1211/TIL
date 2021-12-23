# ch6. 클래스와 오브젝트의 차이점(class vs object), 객체지향 언어 클래스 정리

**ES6 에 Class 추가 → 이전엔 클래스 선언 안하고 객체를 만들었음**

- **프로토타입**에 기반한 클래스 문법

## Class (field - 변수, method - 함수)

- 붕어빵을 만드는 틀
- 실제 데이터가 들어 있지 않다
- 템플릿만 정의
- 한번만 선언
- 메모리에 올라가지 않음 (데이터 X)

## Object

- 실제 팥이 들어간 붕어빵
- 실제로 데이터가 들어감
- Class를 이용해서 만듦
- 메모리에 올라감 (데이터 O)

---

## Class 선언

```jsx
'use strict';

class Person{
    //constructor : 생성자
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
		// method : 클래스 내 함수 
    speak(){
        console.log(`${this.name}, hello!`);
    }
}
// 클래스를 활용하여 객체 생성
const ellie = new Person('ellie',20);
console.log(ellie.name,ellie.age);
ellie.speak();
```

---

## Getter and Setter

```jsx
//2. Getter , Setter
class User{
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age; // this.age는 getter를 호출 | age는 setter를 호출
    }

    get age(){ // = 왼쪽 (this.age) 
        return this.newAge;
    }

    set age(value){ // = 오른쪽(선언값), set은 값을 설정해야 하기 때문에 value를 받아와야 한다.
        // if (value<0){
        //     throw Error('0보다 작은 값은 나이가 될 수 없습니다.');
        // }
        this.newAge = value<0 ? 0: value; // 0보다 작으면 0을 출력하고 아니라면 value를 출력
    }
}

const user1 = new User('김','경원',-1);
console.log(user1);
```

Question : 클래스를 사용하는 사용자, 나이를 -1로 입력하였다.  

→ 방어적인 자세로 이를 보완해주는 방법 (Getter, Setter) 

```jsx
	  get age(){
        return this.newAge;
    }

    set age(value){ // set은 값을 설정해야 하기 때문에 value를 받아와야 한다.
        // if (value<0){
        //     throw Error('0보다 작은 값은 나이가 될 수 없습니다.');
        // }
        this.newAge = value<0 ? 0: value; // 0보다 작으면 0을 출력하고 아니라면 value를 출력
    }
```

- 주의 사항 : getter/setter에서 동일하게 age를 쓰면 스택이 넘친다.
- 따라서, **새로운 변수** newAge를 설정해준다.

---

## Public & Private (너무 최근에 추가된 문법)

- constructor를 쓰지 않고 바로 추가
- #을 붙이면 private 변수

```jsx
//3. public, private

class Experiment{
    publicField = 2;
    #privateField =0; // constructor을 쓰지 않고 #을 붙이면 private 변수로 설정된다. 외부에서 읽을수도, 변경할 수도 없다.
}

const experiment = new Experiment(); // 새로운 객체를 생성
console.log(`public, private: ${experiment.publicField}`);
// public, private: 2
console.log(`public, private: ${experiment.privateField}`);
//public, private: undefined, 외부에서 조회 불가능 
```

## Static (정적)

: object 에 할당 되는 것이 아닌 **클래스 자체에 할당**된다. 

- 들어오는 값에 상관없이 공통적으로 Class에서 쓸 수 있는 것
- 메모리의 사용을 줄여준다.

```jsx
// 4. static

class Article{
    static publisher = 'kyung won';
    constructor(articleNumber) {
        this.articleNumber = articleNumber;
    }
    static printPublisher(){
        console.log(this.publisher);
    }
}

const 기사1= new Article(1);
const 기사2= new Article(2);
// console.log(기사1.publisher); // undefined 
console.log(Article.publisher); // static은 객체에 할당 되는 것이 아닌 클래스 자체에 할당된다.
Article.printPublisher(); // kyung won
```

---

## 상속 & 다양성 (extends)

- 부모 클래스에서의 특징을 extends 로 자식 클래스에게 모든 클래스를 물려 줄 수 있다.
- extends 만 하게 될 경우 자식 클래스와 부모 클래스는 완전히 동일해진다.
- 각 자식 클래스의 특징에 맞게 끔 메소드를 재정의 하는 것이 가능하다. (오버라이딩)
- 자식 클래스에서 super로 부모 클래스의 특성을 가져 올 수 있다.

---
1. 도형이라는 클래스를 만들자!
2. 각 도형에 따라서 도형 클래스에서 상속시킨 클래스를 생성하자! 
---
```jsx
// 5. 상속

class Shape{
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(){
        console.log(` 그릴게요! ${this.color} 색의 도형을!`);
    }

    getArea(){
        return this.height * this.width;
    }
}

class Triangle extends Shape{ // 상속: Rectangle 클래스는 Shape의 상속을 받는다. (재사용 가능)
    draw() {
        super.draw(); // 부모 클래스를 호출한다. super.
    }
    getArea() { // overwriting :덮어쓰기 -> 필요한 함수만 새로 재정의
        return (this.width*this.height)/2;
    }
};

const 삼각형 = new Triangle(10,10,'red');
console.log(삼각형.getArea(), 삼각형.draw());
```

---

## A instanceof B

```jsx
//6. A instanceof B : A 객체는 B 클래스를 이용하여 생성되었다.  
console.log(삼각형 instanceof Shape); //True, 상속해주었으니 True 
console.log(삼각형 instanceof Triangle); //True
console.log(삼각형 instanceof Object); //True , 모든 Class는 Object에게 상속 받았다.** 
```