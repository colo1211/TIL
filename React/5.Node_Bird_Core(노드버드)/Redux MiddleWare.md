# Redux MiddleWare

* 참고 레퍼런스 
  *  https://www.youtube.com/watch?v=wcXTCG8zMhY
  * https://www.youtube.com/watch?v=1K26DIKt3w8

* Redux MiddleWare </br> 
: Redux의 기능을 향상시켜주는 역할 (Redux에 없던 기능을 추가해주는 역할)
  
* middleWare는 항상 화살표 3개 함수를 가진다. (3단 고차함수)

## Redux Thunk 

* thunk : `지연`의 의미를 가짐
* action을 객체가 아닌 function으로 둘 수 있다. 
* Redux 가 `비동기` action 을 dispatch 할 수 있도록 도와주는 역할
* Action Creator를 비동기로 쓸 수 있게 만들어준다.


### 동기 Action Creator 함수
```
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

// 동기 Action Creator
function increment() {
  return {
    type: INCREMENT_COUNTER
  }
}
```

### 비동기 Action Creator 함수
* incrementAsync는 함수를 리턴하는 함수 
* incrementAsync 내부에 있는 함수도 나중에 `dispatch` 된다.
* 장점 : 하나의 action에서 dispatch를 여러번 할 수 있다.
  즉, 하나의 비동기 action에 여러 개의 동기 action을 넣을 수 있다는 말 (dispatch를 나중에 한번에 묶어서 해주는 기능)

```
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

// 비동기 Action Creator (비동기로 쓸 수 있게 만들어준다) 
function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment())
    }, 1000)
  }
}
```

### Redux-Thunk 사용법 
`redux-thunk 설치` 혹은 `custom 하게 redux-thunk를 만들기`


#### 1. redux-thunk 설치
1. 
```
> npm install redux-thunk   
```

2. `configureStore.js`
```
import thunkMiddleware from 'redux-thunk';

const configureStore = () => {

// middleWare 부분에 thunkMiddleWare 를 추가하면 된다. 
    const middleWare = [thunkMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middleWare)) // 배포용일 때는 devTool 연결 X
    : composeWithDevTools(applyMiddleware(...middleWare)) // 개발용 일때는 devTools 연결 O

    const store = createStore(reducer, enhancer);
    return store;
};

const wrapper = createWrapper(configureStore,
    {
        debug : process.env.NODE_ENV === 'development'
    });

export default wrapper;
```


* redux-thunk 삭제 방법

`rm` : remove (삭제)
```
npm rm redux-thunk
```


## redux-saga 사용방법

### redux-saga 
: redux-thunk 는 비동기 액션 creator를 직접 제작하고 실행해야 한다면, 
redux-saga 는 비동기 액션은 `Effects(이벤트 리스너처럼)` 를 사용이 가능하다. 

* 주의! Effects 앞에는 항상 yield 를 붙여준다. 


1. `설치`
```
npm install redux-saga
```

2. `redux-saga 환경 설정`
```
//1. createSagaMiddleWare import 해오기 
import createSagaMiddleWare from 'redux-saga';
import rootSaga from '../sagas';

const configureStore = () => {
   
    //2. createSagaMiddleWare(); 
    const sagaMiddleware = createSagaMiddleWare();
   
    //3. sagaMiddleWare 를 middleWare 에 넣어주기
    const middleWare = [sagaMiddleWare, loggerMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middleWare)) // 배포용일 때는 devTool 연결 X
    : composeWithDevTools(applyMiddleware(...middleWare)) // 개발용 일때는 devTools 연결 O

    const store = createStore(reducer, enhancer);
    
    //4. store.sagaTask 에 rootSaga를 넣어준다. 
    // rootSaga는 rootReducer처럼 작성하는 것
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};


```

3. `../sagas/index.js` (rootSata)

### 제너레이터 (generator)
* 제너레이터를 100% 이해하지 않아도 사용 가능하다. 겁먹지 말자! 
* 함수를 실행할 때, 중간에 멈추고 싶을 때 사용하는 방법


![image](https://user-images.githubusercontent.com/63600953/140703763-1d4fc8fd-e153-4417-beb6-d894fbfe0352.png)

* generator : 중단점이 있는 함수
  * 자바스크립트 함수 특성 : 위에서 부터 아래로 쭉 한번에 실행된다. 
  * generator는 내부에 yield를 넣어주게 되면 그 부분에서 멈춰버린다. yield 뒤에 숫자 혹은 값을 넣어주게 되면 값이 value로 리턴된다. 
    ( done이 true가 될 때 까지 ) 

  `이 성질을 활용한 것이 redux-saga`

![image](https://user-images.githubusercontent.com/63600953/140705080-357d8f04-19cb-455e-aded-0e27872a2217.png)


Q. 함수를 실행했는데 실행중에 중간에 멈추고 싶을 때 어떻게 할까? </br> 
: generator를 많이 넣어주면 next() 호출하면서 가능하다. 

cf ) saga에서는 절대 멈추지 않는 (done이 true가 되지 않는) `generator 함수가 존재`한다. </br>
`=>` 즉, gen().next() 무한리필 가능

![image](https://user-images.githubusercontent.com/63600953/140706040-74d0403c-61b6-426b-a652-1e9214f07033.png)

* 이 성질을 활용하여 `무한 이벤트 리스너` 역할을 할 수 있다. 
  * ex) 클릭을 했을 때 `gen().next()` 를 호출하면 된다. 


* rootSaga 를 하나 만들어두고 거기에 만들고 싶은 `비동기 action`(약간 이벤트 리스너 역할들)들을 모조리 넣어준 이후 `all` Effects 를 사용하여
  진행한다. 

```
export default function* rootSaga(){
  yield all ([
   
  ])
}
```


### rootSaga Pattern
* 만약 로그아웃에 해당하는 영역을 만들고 싶다면 노란색 Box 를 복사해서 그대로 이름만 바꾸면 된다.

![image](https://user-images.githubusercontent.com/63600953/140732738-597aa9bf-92d4-43d1-b7e4-8a7ea2af982d.png)


## Saga Effects

* `import`
```
import { all } from 'redux-saga/effects'; 
```

* `all ([])` </br> 
  * all은 배열을 받는다. 배열을 받으면 안에 있는 것들을 한번에 다 실행을 해준다.
  * 배열 인자 내부에 `fork, call (함수 실행 Effect)` 등을 가지고 있다. 이것들을 한번에 실행시켜준다.
  
```
export default function* rootSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchAddPost)
    ]);
}
```

* `fork(함수, 함수에 넣어줄 파라미터)` </br> 
: 제너레이터 함수를 실행시키는 이펙트 (`비동기`)
  * fork 하면 logInAPI 가 서버와 통신을 하던 말던 그냥 다음 코드 실행
  * 결과를 기다리지 않고 그냥 바로 내려간다. 

* `call(함수, 함수에 넣어줄 파라미터)` </br> 
: 제너레이터 함수를 실행시키는 이펙트 (`동기`)
  * call을 하면 logInAPI 가 서버와 통신하고 리턴할때까지 대기 
  * 결과를 기다린다. 결과가 올 때까지 아래의 코드로 넘어가지 않는다.  
  

####fork, call 에 매개변수 넣는 방법

* 보통 함수에 매개변수를 넣기 위해서는 `logInAPI(action.data);` 와 같은 형식으로 넣는다. 
하지만, fork 와 call 은 매개변수를 인자에다가 넣어준다. 
  
```
yield call (logInAPI, action.data, 'a','b','c');  
```
all 은 fork, call generator 함수를 동시에 실행시켜주는 Saga Effects
  
* `take( )` </br>
  * 'LOG_IN' 액션이 실행될 때 까지 기다린다. 그 이후에 LOG_IN 액션이 실행되면 `logIn` 함수를 실행한다.</br>
  * 첫번째 인자 : ACTION </br>
  * 두번째 인자 : Action이 실행되면 실행할 함수 </br>

⭐ 하지만 `yield take`는 일회용이다. 한번 쓰면 끝난다. 
문제는 딱 한번 로그인 하게 되면 그 다음은 이벤트 리스너가 사라지는 어이없는 일이 발생한다. 


```
function* watchLogin() {
    yield take('LOG_IN', logIn);
}
```

* `put( )` </br> 
: put은 dispatch() 와 역할이 동일하다.
  

### Saga 는 테스트할 때 매우 용이하다. 

```
const l = logIn({type : 'LOG_IN_REQUEST', data : {id : 'aerocho@gmail.com'}})
l.next(); // 한줄, 
l.next(); // 한줄, 
```

---

⭐ 하지만 `yield take`는 일회용이다. 한번 쓰면 끝난다.
문제는 딱 한번 로그인 하게 되면 그 다음은 이벤트 리스너가 사라지는 어이없는 일이 발생한다. 


### 해결방법

* 기존 일회용 짜리
```
function* watchLogIn() {
  yield take('LOG_IN_REQUEST', logIn)
}
```

#### 해결방법 1. while 로 감싼다.
* while 로 감싸면 진정한 이벤트 리스너 처럼 동작하게 된다. (일회용 탈피)
* while take 는 `동기적`
```
function* watchLogIn() {
  while(true){
    yield take('LOG_IN_REQUEST', logIn)
  }
}
```

#### 해결방법 2. `takeEvery` 라는 새로운 Effect 를 사용
* takeEvery는 비동기적으로 동작한다는 차이가 존재한다.
```
function* watchLogIn() {
  yield takeEvery('LOG_IN_REQUEST', logIn)
}
```

#### 참고사항.

#### takeLatest()
* 마우스 클릭을 실수로 두번했을 때, takeEvery로 해놨었으면 2번 요청을 보내게 된다. 
* 하지만, takeLatest()는 100번을 동시에 눌러도 앞의 99개를 무시하고 1개만 응답을 받게된다. 
* 보통은 takeLeading보다 takeLatest()를 많이 해놓는다. 

#### takeLeading()
* 마우스 클릭을 실수로 두번했을 때, takeLeading 으로 해놨었으면 앞의 1개만 응답을 받게된다. 

##### 주의사항! 
takeLatest(), takeLeading() 은응답을 취소하는 것이지 요청을 취소하는 것이 아니다. 백엔드 서버에서는 모두 영향을 받게된다. 

⭐⭐⭐⭐⭐ 최종 결론 </br> 
throttle을 사용하게 되면 정의된 시간 동안에는 해당 action을 딱 한번만 사용이 가능하도록 설정



```
function* watchLogin(){
  yield throttle('ADD_POST_REQUEST', addPost, 2000); 
}
```

---

##saga 분리하기

* 기존 </br> 
: sagas 폴더 내부에 index.js 파일 내부에 모든 것을 작성
  
  
#### 분리할 방법

![image](https://user-images.githubusercontent.com/63600953/142750819-644dda16-344d-465a-a9e3-f6d601c49689.png)

* sagas 폴더 내부에 `기능별`로 파일을 생성한다. 
  * index.js : 여러가지의 파일들을 하나로 합치는 역할
  * post.js : 게시물 관련 
  * user.js : 로그인 / 로그아웃 관련
  

`sagas / index.js`

```
import {
  all,
  fork
} from 'redux-saga/effects'

import postSaga from './post'; 
import userSaga from './user'; 


export default function* rootSaga() {

// 여기서 합쳐준다. 
  yield all([
    fork(postSaga), 
    fork(userSaga),
  ])
}

```

`sagas / post.js`
```
import {
  all,
  fork,
  put,
  takeLatest,
  delay
} from 'redux-saga/effects'
import axios from 'axios'


// axios 하는 부분은 generator X
function addPostAPI(data) {
  return axios.post('/api/post', data)
}

function* addPost(action) {
  try {

    yield delay(1000); 
    // const result = yield call(addPostAPI, action.data) // 요청의 결과를 받는다. (result.data)
    // 서버 요청에 실패하면 바로 catch 로 넘어간다.

    // put : dispatch
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: result.data,
    })
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    })
  }
}

function* watchAddPost() {
  yield takeLatest('ADD_POST_REQUEST', addPost)
}



export default function* addPosts(){
    yield all([
        fork(watchAddPost),
    ])
}
```

`sagas / user.js`

```
import {
    all,
    fork,
    put,
    takeLatest,
    delay
  } from 'redux-saga/effects'

// axios 하는 부분은 generator X
// 실제로 서버에 요청을 보내는 코드
function logInAPI(data) {
    return axios.post('/api/login', data)
  }
  
  function* logIn(action) {
    try {
        yield delay(1000); 
      // const result = yield call(logInAPI, action.data) // 요청의 결과를 받는다. (result.data)
      // 서버 요청에 실패하면 바로 catch 로 넘어간다.
  
      // put : dispatch
      yield put({
        type: 'LOG_IN_SUCCESS',
        data: result.data,
      })
    } catch (err) {
      yield put({
        type: 'LOG_IN_FAILURE',
        data: err.response.data,
      })
    }
  }
  
  // axios 하는 부분은 generator X
  function logOutAPI() {
    return axios.post('/api/logout')
  }
  
  function* logOut() {
    try {
      yield delay(1000); 
      // const result = yield call(logOutAPI) // 요청의 결과를 받는다. (result.data)
      // 서버 요청에 실패하면 바로 catch 로 넘어간다.
  
      // put : dispatch
      yield put({
        type: 'LOG_OUT_SUCCESS',
        data: result.data,
      })
    } catch (err) {
      yield put({
        type: 'LOG_OUT_FAILURE',
        data: err.response.data,
      })
    }
  }
  // 아래 3개 : 비동기 action creator (이벤트 리스너 같은 느낌을 준다)
  // 이때는 take effect 를 사용한다.
  function* watchLogIn() {
    yield takeLatest('LOG_IN_REQUEST', logIn)
    // 'LOG_IN' 이라는 액션이 실행되면 logIn 함수를 실행, login action이 실행될 때 까지 기다린다.
  }
  
  function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST', logOut)
  }
  
export default function* userSaga(){
    yield all([
        fork(watchLogIn), 
        fork(watchLogOut),
    ])
}
```