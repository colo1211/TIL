# Login Form

![image](https://user-images.githubusercontent.com/63600953/137614326-b1227d85-7dc0-40d7-ab0f-a6fa39544ac4.png)

* 왼쪽 메뉴에는 `로그인 창`
* 로그인 했을 때는 사용자 페이지로 넘어간다. 

* 아직까지는 서버가 없는데 어떻게 로그인을 구현할까? </br> 
  `=>` `더미데이터` 를 활용한다. 
  ex) 상태를 임시적으로 저장 할 수 있는 `state`를 활용한다. 


로그인이 되어 있다면, 사용자 프로필 | 로그인이 안되어 있다면, 로그인 Form

`AppLayout.js`
* UserProfile/LoginForm 은 `pages 폴더`가 아닌 `components 폴더`에 생성한다.


* 페이지가 아닌 다른 컴포넌트는 components 폴더에 저장한다.   

```
{
    isLoggedIn 
    ? <UserProfile />
    : <LoginForm />
}
```


```
Next.js 가 아닌 React에서는 화면 보여주는 것은 Components 폴더에 두고, 
데이터를 가져오는 것은 Container 폴더에 두는 관습이 있다. 
```

### 더미데이터로 로그인 구현

* 상위 컴포넌트 : `AppLayout.js`
* 하위 컴포넌트 : `LoginForm.js`
* 우선은 상위 컴포넌트에 `isLoggedIn, setIsLoggedIn` state를 생성한 후, 이 중 setIsLoggedIn 컴포넌트로 props를 넘겨준다.
* 사용자가 제출만 한다면 우선은 로그인을 허용 하는 것으로 구현한다. 

![image](https://user-images.githubusercontent.com/63600953/137665908-5303d4c4-639e-41c1-8d4e-ef7873fa6b1e.png)



