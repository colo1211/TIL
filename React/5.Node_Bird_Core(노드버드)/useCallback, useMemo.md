# useCallback 및 useMemo
* React 에서 성능 최적화에 사용되는 React Hook

참고 자료 <br/>
* https://www.youtube.com/watch?v=uBmnf_k7_r0
* https://leehwarang.github.io/2020/05/02/useMemo&useCallback.html
* https://react.vlpt.us/basic/18-useCallback.html (벨로퍼트)

예제코드
* https://codesandbox.io/s/upbeat-margulis-v8k51?file=/src/Info.js

## 사전 지식
1. `함수형 컴포넌트`는 단순히 `JSX 를 반환해주는 함수`이다. 


2.  `컴포넌트가 렌더링` 된다는 것은 누군가가 그 `함수(컴포넌트)를 호출하여 실행`되는 것을 의미한다. <br/>
    함수가 `실행(렌더링) 될 때 마다` 함수 내부에 선언되었던 `변수 및 함수(컴포넌트 내부 함수)도 매번 다시 선언`되어서 사용된다. 
    

3. 컴포넌트는 자신의 state가 변경되거나 부모에게서 받는 props가 변경될때 마다 `리렌더링` 된다.


4. ⭐ 하위 컴포넌트에게 최적화 설정을 해주지 않는다면 `props가 변경되지 않더라도 리렌더링` 된다.




---

> 메모이제이션이란? ( Memoization )

: 동일한 계산을 반복해야 할 경우 한 번 계산한 결과를 메모리에 저장해 두었다가 꺼내 씀으로써 중복 계산을 방지할 수 있게 하는 기법

* 주의! 메모리제이션 X, 메모에 초점을 맞춘 용어
---

# 예제

* 상위 컴포넌트 : App.js
* 하위 컴포넌트 : Info.js
* Info.js는 App.js에게 `color`, `movie` props 를 전달받는다.

* App.js 에 있는 onChangeHandler는 `useCallback(이벤트 핸들러 함수)`을 사용
* Info.js 에 있는 getColorKor, getMovieGenerKor 는 `useMemo` 를 사용


* `App.js` (상위 컴포넌트)
```
import React, { useState, useCallback } from "react";
import Info from "./Info";
import "./styles.css";

const App = () => {
  const [color, setColor] = useState("");
  const [movie, setMovie] = useState("");

  const onChangeHandler = useCallback(e => {
    if (e.target.id === "color") setColor(e.target.value);
    else setMovie(e.target.value);
  }, []);

  return (
    <div className="App">
      <div>
        <label>
          What is your favorite color of rainbow ?
          <input id="color" value={color} onChange={onChangeHandler} />
        </label>
      </div>
      <div>
        What is your favorite movie among these ?
        <label>
          <input
            type="radio"
            name="movie"
            value="Marriage Story"
            onChange={onChangeHandler}
          />
          Marriage Story
        </label>
        <label>
          <input
            type="radio"
            name="movie"
            value="The Fast And The Furious"
            onChange={onChangeHandler}
          />
          The Fast And The Furious
        </label>
        <label>
          <input
            type="radio"
            name="movie"
            value="Avengers"
            onChange={onChangeHandler}
          />
          Avengers
        </label>
      </div>
      <Info color={color} movie={movie} /> {/* 여기서 화면에 띄우기 위해서 props 를 전달한다.  */} 
    </div>
  );
};

export default App;

```



* `Info.js` (하위 Component)
```
import React, { useMemo } from "react";
import "./styles.css";

const getColorKor = color => {
  console.log("getColorKor");
  switch (color) {
    case "red":
      return "빨강";
    case "orange":
      return "주황";
    case "yellow":
      return "노랑";
    case "green":
      return "초록";
    case "blue":
      return "파랑";
    case "navy":
      return "남";
    case "purple":
      return "보라";
    default:
      return "레인보우";
  }
};

const getMovieGenreKor = movie => {
  console.log("getMovieGenreKor");
  switch (movie) {
    case "Marriage Story":
      return "드라마";
    case "The Fast And The Furious":
      return "액션";
    case "Avengers":
      return "슈퍼히어로";
    default:
      return "아직 잘 모름";
  }
};

const Info = ({ color, movie }) => {
  const colorKor = useMemo(() => getColorKor(color), [color]);
  const movieGenreKor = useMemo(() => getMovieGenreKor(movie), [movie]);

  return (
    <div className="info-wrapper">
      제가 가장 좋아하는 색은 {colorKor} 이고, <br />
      즐겨보는 영화 장르는 {movieGenreKor} 입니다.
    </div>
  );
};

export default Info;

```


## useMemo

### 특정 결과값을 재사용 할 때 사용
* 메모이제이션 된 값을 반환한다.
 
보통, 하위 props에서 props 값이 변경되었을 때만 사용하게 하는 것이 useMemo의 역할이다. 
```
const memoized = useMemo(함수, 배열);
```

```
const colorKor = useMemo(() => getColorKor(color), [color]);
const movieGenreKor = useMemo(() => getMovieGenreKor(movie), [movie]);
```

* color값이 바뀔 때는 getColorKor함수만, movie값이 바뀔 때는 getMovieGenreKor함수만 호출되는 것을 확인할 수 있다.

---
## useCallback 

### 특정 함수를 새로 만들지 않고 재사용 하고 싶을 때 사용
* 메모이제이션 된 함수를 반환한다. 

보통, 이벤트 핸들러에서 사용

"컴포넌트가 렌더링 될 때마다 내부에 선언되어 있던 표현식(변수, 또다른 함수 등)도 매번 다시 선언되어 사용된다" <br/>
: onChangeHandler 함수는 파라미터로 전달받은 이벤트 객체(e)의 target.id 값에 따라 setState를 실행해주기만 하면 되기 때문에, 
첫 마운트 될 때 한 번만 선언하고 재사용하면 되지 않을까?

```
const memoizedCallback = useCallback(함수, 배열);
```

useCallback()은 함수를 메모이제이션(memoization)하기 위해서 사용되는 hook 함수. <br/> 

첫번째 인자로 넘어온 함수를, <br/> 

두번째 인자로 넘어온 배열 내의 값이 변경될 때까지 저장해놓고 재사용할 수 있게 해준다.

```
const onChangeHandler = useCallback(e => {
    if (e.target.id === "color") setColor(e.target.value);
    else setMovie(e.target.value);
  }, []);
```

* 처음 마운팅 될 때 혹은 새로고침 할 때 아니면 해당 함수는 기존에 있던 값을 재활용하여 성능을 최적화