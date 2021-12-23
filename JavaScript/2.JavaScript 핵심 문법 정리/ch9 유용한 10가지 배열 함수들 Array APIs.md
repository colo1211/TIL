# ch9. 유용한 10가지 배열 함수들. Array APIs 총정리

- 배열 API 문제 10개

```
// Q1. make a string out of an array : join 
{
  const fruits = ['apple', 'banana', 'orange'];
}

// Q2. make an array out of a string : split
{
  const fruits = '🍎, 🥝, 🍌, 🍒';
}

// Q3. make this array look like this: [5, 4, 3, 2, 1] : reverse
{
  const array = [1, 2, 3, 4, 5];
}

// Q4. make new array without the first two elements  : slice
{
  const array = [1, 2, 3, 4, 5];
}

class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}
const students = [
  new Student('A', 29, true, 45),
  new Student('B', 28, false, 80),
  new Student('C', 30, true, 90),
  new Student('D', 40, false, 66),
  new Student('E', 18, true, 88),
];

// Q5. find a student with the score 90 : find 
{
}

// Q6. make an array of enrolled students : map
{
}

// Q7. make an array containing only the students' scores
// result should be: [45, 80, 90, 66, 88]  : filter
{
}

// Q8. check if there is a student with the score lower than 50 : some or every
{
}

// Q9. compute students' average score   : reduce 
{
}

// Q10. make a string containing all the scores  
// result should be: '45, 80, 90, 66, 88'  
{
}

// Bonus! do Q10 sorted in ascending order : sort

// result should be: '45, 66, 80, 88, 90' 
{
}
```

**join ↔ split** 

- 문자열 → 배열 : join
- 배열 → 문자열 : split

### 1. join

join('(구분자)') : 배열 -> 문자열

```jsx
{
    const fruits = ['apple', 'banana', 'orange'];
    const stringFruits = fruits.join(',and ');
    console.log(`value: ${stringFruits} type: ${typeof stringFruits}`);
}
```

### 2. split

split('(구분자)',?return 받을 배열의 사이즈) : 문자열 -> 배열

```jsx
{
    const fruits = 'apple, kiwi, banana, cherry';
    const newFruits = fruits.split(',',3);
    console.log(newFruits);
}
```

### 3. reverse ↔ sort

- 배열의 순서를 거꾸로 정렬 (내림차순)
- 배열 자체의 순서를 변경해준다.

```jsx
{
    const array= [1,2,3,4,5];
    const newArray = array.reverse();
    console.log(newArray); //5,4,3,2,1
    console.log(array); // 5,4,3,2,1
}
```

### 4. slice

- slice(a,b) : **a이상 b미만** 의 요소를 가져와서 새로운 배열을 만들 수 있다.
- splice는 배열의 원본을 건드린다.
- slice는 배열의 원본을 건드리지 않고 리턴해준다.

```jsx
{
    const array = [1, 2, 3, 4, 5];
    const newArray= array.slice(2,5);
    console.log(array);
    console.log(newArray);
}
```

- **5~10 번 클래스를 활용**

```
class Student {
    constructor(name, age, enrolled, score) {
        this.name = name;
        this.age = age;
        this.enrolled = enrolled;
        this.score = score;
    }
}
const students = [
    new Student('A', 29, true, 45),
    new Student('B', 28, false, 80),
    new Student('C', 30, true, 90),
    new Student('D', 40, false, 66),
    new Student('E', 18, true, 88),
];
```

### 5. find

- callBack함수는 boolean 타입을 리턴(T/F) -> 조건에 맞는 것 하나만 리턴
- 첫번째로 찾아진 대상을 return해준다. 찾지 못하면 undefined

```jsx
{
       const result = students.find(function(student){
           return student.score === 90; // 90이면 True를 리턴 아니면 False를 리턴
        })
        console.log(result);
    }
```

### 6. filter

- find 와 다르게 조건에 맞는 것 여러 개 리턴

```jsx
{
       let enrollStudent = students.filter((student)=> student.enrolled===true);
        console.log('enrolled:',enrollStudent);
    }
//enrolled: [
  //Student { name: 'A', age: 29, enrolled: true, score: 45 },
  //Student { name: 'C', age: 30, enrolled: true, score: 90 },
  //Student { name: 'E', age: 18, enrolled: true, score: 88 }
//]
```

### 7. map

- callBack 함수를 호출하여 map 내에서 가공된 데이터들을 원하는 새로운 배열에 Mapping

```jsx
const studentScore = students.map(function (student) {
            return student.score;
        })
        console.log(`학생들의 점수 배열: ${studentScore}`);
```

### 8. some, every

- some : 조건에 부합하는 것이 하나라도 있다면 True를 반환
- every: 조건에 모두 부합해야 True를 반환한다.

```jsx
const result = students.some(function(student){
            return student.score<50;
        })
        console.log(result); // true
        // 배열명.every: 조건에 모두 부합해야 True를 반환한다.
        const result2 = students.every(function(student){
            return student.score>=50;
        })
        console.log(result2); // false, 모든 학생이 50점을 넘지는 않는다.
```

### 9. reduce

- reduce(callBack, 시작 값) : index를 줄여나간다는 의미 -> 누적된 합
- current는 순차적으로 순회
- previous는 시작값을 전달

```jsx
const result = students.reduce(function(previous , current ){
           return previous+current.score;
       },0)
        console.log(`result: ${result}`);
```

### 10. 응용

```jsx
// 10. 함수들의 모든 점수들을 문자열로 변환
        const result= students.map(function (student){
            return student.score;
        }).join(',');
       console.log(result);
```

### 11. sort (function(a,b){});

- return a-b; : 오름차순
- return b-a; : 내림차순 → reverse( );

```jsx
// 11. 10번의 result을 오름차순으로 정렬하라
        // sorted(a,b) {return a-b} : 오름차순 
				
        const result= students.map(function (student){
            return student.score;
        }).sort(function (a,b){return a-b;}).join();
        console.log(result);
```