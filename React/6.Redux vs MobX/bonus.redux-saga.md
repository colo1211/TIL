# redux-saga

---
## 5-1. 리덕스 사가의 필요성과 맛보기

이러한 action을 dispatch 했다고 가정해보자. redux는 모든 것이 동기로 일어난다. 
로그인 버튼 클릭하는 순간 redux-state가 바뀌어 버린다. 

```
{
    type : LOG_IN, 
    data : {
        id : 'zerocho', 
        password : '1234', 
    }
}
```



`로그인 프로세스`
* 서버쪽에 data가 전달되고, 
* 서버가 로그인 성공이라는 응답을 보내주고, 
* 그걸 받아서 로그인! 하는 것이 하나의 프로세스

=> 하지만, redux로는 이것이 불가능하다. 동기적으로 처리하는 것만 가능하다. </br>
따라서, 리덕스의 기능을 확장(미들웨어) 해야 한다. 

=> 리덕스 처리 사이에 비동기 처리를 할 수 있는 미들웨어를 사용한다. (redux-saga, redux-thunk)



만약, signUpAction을 하고 난 이후, 10초 뒤에 signUpSuccess를 구현하고 싶다면 어떻게 해야할까?
=> 우선 redux로는 되지 않는다. 

`설치`
```
npm i redux-saga
```

### saga 도 패턴이 있어서 패턴대로만 해보자. 

* reducer도 rootReducer 내에 userReducer과 postReducer이 존재한다. => saga도 마찬가지다. 
  rootSaga 내부에 user 사가, post 사가를 넣어준다. (하나로 합쳐준다.)
  

1. index.js 파일의 rootSaga에다 saga를 합쳐준다. (all , call => `모든것(all)을 불러라(call).`)   
`sagas/index.js`
```
import { all, call } from 'redux-saga/effects'; 
import user from './user'; 
import post from './post'; 

export default function* rootSaga(){
    yield all([
        call(user), 
        call(post), 
    ]); 
}
```

`sagas/user.js`
```
import { all } from 'redux-saga/effects'; 

export default function* userSaga(){
    yield all([
        
    ]); 
}
```

`sagas/post.js`

```
import { all } from 'redux-saga/effects'; 

export default function* postSaga(){
    yield all([
        
    ]); 
}
```

2. 제너레이터를 모르더라도, 패턴만 익혀서 saga를 사용해보자. 

`sagas/user.js`
```
import { all, fork } from 'redux-saga/effects'; 


function logInAPI(){

}

function* logIn(){

}

function* watchLogin(){
    
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
    ]); 
}
```

