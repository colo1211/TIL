# Arrow Function (화살표 함수)

> 함수를 사용하는 이유

1. 코드들을 기능별로 묶고 싶을 때 사용
2. `입출력 기능`을 만들고 싶을 때 사용

```
// 함수 만들기 - 1
  function 함수() {

  }

// 함수 만들기 - 2 
  var 함수 = function () {

  };

// 함수 만들기 - 3 : ES6 Arrow Function
  var 함수 = () => {

  }

```

> Arrow Function 장점
1. 입출력에 대해서 직관적으로 알아볼 수 있다.
```
var 함수 = (a) => {return a + 10}
```

2. 파라미터가 1개면 소괄호 생략 가능
```
var 함수 = a => {return a + 10}
```

3. 코드가 한줄이면 반환값 중괄호도 생략 가능
```
var 함수 = a => a + 10
```

> Arrow Function 사용 예시

1. Arrow Function은 함수 내의 this 값을 변경시키지 않는다.
2. 바깥에 있던 this값을 내부에서 그대로 사용한다. (window)


1. forEach 콜백 함수
```
[1,2,3,4].forEach(function(a){
    console.log(a)
})

[1,2,3,4].forEach((a) => console.log(a))
```

2. 이벤트 리스너

* Arrow Function은 함수 내의 this 값을 변경시키지 않는다.
* 바깥에 있던 this값을 내부에서 그대로 사용한다. (window)

```
// this는 e.currentTarget
  document.getElementById('버튼').addEventListener('click', function () {
    console.log(this); 
  });
  
// this는 window
    document.getElementById('버튼').addEventListener('click', () => {
    console.log(this);
  });
```

3. Object 내부의 함수

* window 객체가 출력된다. 
```
var obj = {
    함수 : () => {
        return this;
    }
}
obj.함수();
```


* this 키워드
```
1. this + arrowFunction => 상위 this 변경 X 
2. this + normalFunction => 상위 포함 객체  
```