# Redux
: 중앙 데이터 저장소

### 역할
* 중앙 저장소는 서버에서 데이터를 많이 받아온다. `->` 데이터를 받아온 다는 것은 `비동기`로 처리된다. 

cf) 비동기는 3단계로 나뉜다. 요청 / 성공 / 실패

* Context API는 비동기를 지원하지 않는다. </br>
: 보통 이 방식으로 하게 되면 컴포넌트 상단에 `useEffect`를 사용하여 데이터를 받아오게 된다. 
하지만, 컴포넌트는 화면을 그리는 데에만 집중 하게 하는 것이 좋다. 

* 하지만 redux는 비동기에 대한 지원한다. 따라서, 컴포넌트와 서버에서 받아오는 데이터를 구분하는 것이 명확히 가능해진다. 

```
요약하자면, 화면(컴포넌트)을 비즈니스 로직(Redux, 서버로 부터 데이터 요청)과 분리
Redux는 서버와의 통신을 위해서 사용하며 받아온 정보를 담기 위해서 사용한다. 
```

* 서비스의 규모가 커지면 중앙 데이터 저장소(Redux)도 규모가 커진다. 이럴때는 `Reducer`를 활용하여 
Redux를 적절하게 기능에 맞게 쪼개주면 된다. 

* redux를 사용하게 되면 useState의 사용 빈도가 줄어든다. 

---
* next에서 redux를 붙히는 과정은 `create-react-app` 과는 차이가 있다. 
* 실제로 next에서 redux 를 붙히는 것은 더 어렵고 이를 간편하게 해주는 npm 이 바로 ` next-redux-wrapper`이다. 


### 설치

1.`prepare/front/store/configureStore.js` 파일을 만든다. 

![image](https://user-images.githubusercontent.com/63600953/137838567-7ff80456-4c75-426a-81a1-b90cbbbe3670.png)

2. configureStore.js 컴포넌트를 제작한다. 
```
const configureStore = () => {

};

const wrapper = createWrapper(configureStore);

export default wrapper;
```

3. npm install next-redux-wrapper
* next-redux-wrapper 를 설치하면 createWrapper()를 가져올 수 있다. 
```
> npm install next-redux-wrapper
```

4. configureStore.js를 `createWrapper()`로 감싼다.

```
import {createWrapper} from "next-redux-wrapper";

const configureStore = () => {

};

const wrapper = createWrapper(configureStore,
    {
        debug : process.env.NODE_ENV === 'development'
    });

export default wrapper;
```

5. `_app.js`에 와서 High Order Component로 감싸준다. 

* _app.js 파일은 모든 컴포넌트들의 부모 컴포넌트이다. `_app.js 컴포넌트`를 감싸게 되면 모든 컴포넌트에 Redux를 적용이 가능하게 되는 것이다. 
  
* `wrapper.withRedux()` 

![image](https://user-images.githubusercontent.com/63600953/137839803-491b221b-8132-47c3-b6b2-80e98fb90f28.png)

6. 
```
> npm install redux
```

주의 사항 </br>
: `create-react-app` 했을 때 처럼 `Provider`로 감싸면 안된다.
* 우선 Provider는 `react-redux` 에 있는 라이브러리 이다. 
* 또한 next에서는 Provider를 설정하지 않아도 자동으로 감싸준다. 
* 따라서, 한번 더 감싸게 되면 중복이 발생하여 에러가 발생한다. 

```
<Provider store={store}>
    <App/>
</Provider>
```
---

### Redux 원리

* Redux는 reduce에서 이름을 따왔음

* 각 컴포넌트에서 Redux에 있는 데이터를 필요로 할 때 꺼내서 사용 가능하다. 
* 조회, 삭제, 수정이 가능

#### Redux에 있는 데이터를 수정하는 원리
* `type` 은 action 의 이름
  

* action을 `dispatch` 하면 중앙 저장소에 있는 데이터를 변경


* reducer는 `action` 을 보내면 중앙 저장소에 있는 데이터를 어떻게 변경할 지 결정 (`switch문` 수작업으로 구현, 코드양 많아짐)</br>
    * ( 이전 상태, 액션 ) => 다음 상태
    

* 중앙 저장소에 있는 데이터를 변경하고 싶다면 `action` 과 `reducer`를 매번 작성해야 한다. 

장점
1. action 하나 하나가 redux에 기록이 된다. 내역들이 추적이 가능 `=>` 버그 해결 용이
2. Redux DevTool 을 활용하여 타임머신처럼 데이터를 뒤로 돌렸다가 앞으로 감을 수 있음 `=>` 테스트 용이

![image](https://user-images.githubusercontent.com/63600953/137846662-0162f761-ffb4-4e77-a724-93cae39036e0.png)

#### Switch - Case 문 내에서 왜 { } 형태로 return 해주는 것인지? 
* `Immutability` : 불변성

JS 문법
* 객체와 객체를 비교하면 다르다(false). 
```
{} === {} // false
```

* 참조관계가 있으면 true이다. 
```
const a = {}; 
const b = a; 
a === b /// true
```


* switch-case 문 의 return문은 객체를 새로 만들어 준 것
    * 나머지는 그대로 하되 변경된 부분만 change한다. 
    * 대신에 객체 자체는 새로 만들어서 보내준다.
    * 객체를 새로 만들어야 변경된 내용들이 추적이 된다. ( 이전 기록과 변경된 기록을 모두 기록하기 위해서 )
    * 참조 관계를 하게 되면 이전 기록이 사라진다. 
    
![image](https://user-images.githubusercontent.com/63600953/137850321-edf0e151-827d-4c02-bc25-f19a631c0839.png)

#### Spread Operator 기본 문법
```
...state // state를 풀어준다. 
```
```
// Array
var arr1 = [1, 2, 3, 4, 5];
var arr2 = [...arr1, 6, 7, 8, 9];

console.log(arr2); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

// String
var str1 = 'paper block';
var str2 = [...str1];
console.log(str2); // [ "p", "a", "p", "e", "r", " ", "b", "l", "o", "c", "k" ]

```
---

### Redux 실제 구현
* Store = `state` + `reducer` 를 포함하고 있는 것

1. `reducers/index.js`
* reducer는 `switch-case 문`을 이용하여 수정에 대한 정의를 내리는 역할
* (이전 상태, 액션) `=>` 다음 상태 
* reduce 의 의미 : 축소
```
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_NICKNAME' :
            return {
                ...state,
                name : action.data
            }
        default :
            return state;
    }
}

export default rootReducer;
```

2. `store/configureStore.js`

* store는 Redux state와 Reducer를 통칭하는 말

```
import {createWrapper} from "next-redux-wrapper";
import {createStore} from "redux";
import reducer from '../reducers/index'

const configureStore = () => {
    const store = createStore(reducer);
    return store;
};

const wrapper = createWrapper(configureStore,
    {
        debug : process.env.NODE_ENV === 'development'
    });

export default wrapper;
```

3. 데이터를 변경하려면 `action`을 생성해야 한다. 

* 초기 state 
```
const initialState = {
    name : 'kyung',
    age : 24,
    password : '1234'
};
```

* action (초기 state에서 name을 변경 원할 때)
  * name을 kyung 에서 won 으로 변경하는 action
```
const changeNickname = {
    type : 'CHANGE_NICKNAME',
    data : 'won',
}
```

> 그럼 만약에 이름을 won이 아니라 다른 이름으로 변경하고 싶을 때는 다른 aciton 을 노가다로 생성 해야 하는 것인가? 
`아니다.`

#### 액션을 만들어 주는 함수 (액션 생성기, action creator)
* 사용자의 입력에 따라서 값을 변경해줄 수 있는 함수를 제작하면 된다. 

`정의`
```
const changeNickname = (data) => {
    return {
        type : 'CHANGE_NICKNAME',
        data,
    }
}
```

`호출`
```
changeNickname('won');
```

#### 비동기 action creator : redux-saga


---

### 미들웨어 & Redux DevTools

* action 을 기록하기 위해서는 Redux DevTools 를 사용하면 된다. 
* redux middle-ware를 붙여야 Redux DevTool 을 사용 가능 

설치 
```
> npm install redux-devtools-extension
```

적용 </br> 
* redux-devtools-extension을 설치한 이후에 개발모드일때만 `composeWithDevTools(applyMiddleware(...middleWare))` 를 사용하여 붙힌다.


`configureStore.js`

```
import {composeWithDevTools} from "redux-devtools-extension";


const configureStore = () => {
    const middleWare = []; // 나중에 saga 혹은 thunk 를 넣을 때 사용
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middleWare)) // 배포용일 때는 devTool 연결 X
    : composeWithDevTools(applyMiddleware(...middleWare)) // 개발용 일때는 devTools 연결 O

    const store = createStore(reducer, enhancer);
    return store;
};
```

* redux-devTool을 사용하여 state의 변화 상태를 띄운 모습

![image](https://user-images.githubusercontent.com/63600953/137872002-673868ce-afbc-4343-ba67-0a8f9a4c4b66.png)

history 가 보이는 이유
: 불변성 (immutable) 을 지켜서 return 하였기 때문에 history 의 기록이 그대로 남는다. 


---

## combineReducers()

![image](https://user-images.githubusercontent.com/63600953/137902726-5f892aed-e285-4fe5-aa97-506b898eff48.png)


* 현재 rootReducer의 initialstate 구조
  * `user` 정보 + `post` 정보

가면 갈수록 Reducer의 코드량은 증가할 것이기 때문에 Reducer를 나누어야 폴더별로 제대로 관리가 가능하다. 


![image](https://user-images.githubusercontent.com/63600953/137907188-874d5985-19c0-4fb4-9ea6-2042b856d375.png)


* 따라서 다음과 같이 폴더를 구성

![image](https://user-images.githubusercontent.com/63600953/137907267-4e51291e-1aef-4049-b361-0f0f600e8f88.png)


* `post.js`

```
export const initailState = {
    isLoggedIn : false,
    user : null ,
    signUpData : {},
    loginData : {},
}

//Login Action function
export const loginAction = (data) => {
    return {
        type : 'LOGIN_ACTION',
        data,
    }
}

//Logout Action function
export const logoutAction = () => {
    return {
        type : 'LOGOUT_ACTION',
    }
}

const reducer = (state = initailState, action) => {
    switch (action.type) {
        case 'LOGIN_ACTION' :
            return {
                ...state,
                isLoggedIn: true,
                user : action.data,
            }
        case 'LOGOUT_ACTION':
            return{
                ...state,
                isLoggedIn: false,
                user : null,
            }
        default :
            return state;
    }
}

export default reducer;
```

* `post.js`

```
export const initailState = {
    mainPosts : [],
}

const reducer = (state = initailState, action) => {
    switch (action.type) {
        default :
            return state;
    }
}

export default reducer;
```

* `index.js (root Reducer)`

  * HYDRATE는 next.js 에서 SSR을 위해서 사용하는 것(CRA에서는 사용 X)
  * combineReducers가 알아서 합쳐서 Reducer를 생성해준다.

![image](https://user-images.githubusercontent.com/63600953/137907709-79271727-83bd-4e2f-85af-11b24ea663a6.png)

---

## 더미데이터와 Post Form 만들기

* `post.js` 내부의 post Reducer를 제작

* 실제로 서버에서 넘어오는 데이터 구조와 동일하게 하면 유리하다. 

```
export const initailState = {
    mainPosts : [{
        //id 혹은 content 는 게시글 자체의 속성이기 때문에 소문자,  나머지는 다른 정보와 합쳐서 주는 것이기 때문에 대문자로 시작
        id : 1,
        User : {
            id : 1 ,
            nickname : 'kyung',
        },
        content : '첫번째 게시글 # 해시태그 #익스프레스',
        Images : [{
            src: 'https://user-images.githubusercontent.com/63600953/137907709-79271727-83bd-4e2f-85af-11b24ea663a6.png',
        }, {
            src: 'https://user-images.githubusercontent.com/63600953/137907267-4e51291e-1aef-4049-b361-0f0f600e8f88.png',
        }, {
            src : 'https://user-images.githubusercontent.com/63600953/137907188-874d5985-19c0-4fb4-9ea6-2042b856d375.png'
        }],
        Comments : [
            {
                User : {
                    nickname: 'nero',
                },
                content : '우와 댓글1',
            },
            {
                User : {
                    nickname: 'zero',
                },
                content: '우와 댓글2',
            }
        ]
    }],
    imagePaths : [], // 이미지 업로드 할 때 이미지 경로들이 저장
    postAdded : false, // 게시글 추가가 완료되었을 때 true
}
```

* initial State를 더미데이터로 채운다. (테스트를 위해)
  * 이는 개발 도중에 Back-End 개발자에게 먼저 물어보면 도움이 된다. 
  * 혹은 미리 프론트 측에서 다음과 같이 달라고 요청해도 괜찮다. 
