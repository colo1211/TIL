# Auth

### 구현 할 기능
```
1. 로그인 
2. 로그아웃
3. 회원가입
4. HOC (Higher Order Component)
```

### 쓰이는 개념 
```
1. Redux (Token을 저장해놓음)
2. LocalStorage (새로고침 해도 정보 안 사라지게끔 하는 스킬)
3. accessToken 
4. ⭐ LogOut post 요청 시, token을 Header(3번째 인자)에 담아서 요청 
```

---

### 1. 로그인 기능 구현

> Step 1 : onSubmitHandler 함수 실행
* User가 입력시킨 Email/Password state를 저장
* Sign In 버튼을 클릭하면 loginAction 함수(_actions 폴더 내의)에 전달

![image](https://user-images.githubusercontent.com/63600953/133925064-b1a37d6c-2b8b-49cf-a048-88f1c546c37c.png)
</br></br>
> Step 2 : Axios 를 통해 Server 로 부터 Response 받기
* loginAction 함수 내에서 `로그인을 담당 서버`에게 Axios Post `request`를 보낸다. 
* loginAction 함수 내에서 `response` 받은 정보를 reducer에 dispatch 를 사용하여 보낸다. 

`API 문서`

![image](https://user-images.githubusercontent.com/63600953/133925387-9fe08cd5-332f-4a2d-b339-74cd107d8840.png)

</br></br>
`_actions/user_action.js` 내의 loginAction 함수
* Axios 라이브러리를 통해서 서버에게 request 를 보낸 이후 response 를 받아온다. 
* 서버로부터 받아온 response를 request 변수에 담아서 payload 에 넣어서 type과 함께 리턴한다.
* response를 dispatch를 활용하여 redux에 전달하여 redux store에 저장

```
type : 'LOGIN_ACTION', 
payload : 
{
    id: 1,
    name : '테스터',
    accessToken : 'ewqewqeqweqeeewqeeee'
}
```

![image](https://user-images.githubusercontent.com/63600953/133925672-09533bd8-4fbe-416a-bb4a-3d02e65de457.png)
</br></br>

> step 3. 서버로 부터 받은 Response를 Redux Store에 등록 

![image](https://user-images.githubusercontent.com/63600953/133926040-ffbbc649-91d2-4c6b-a340-9a76dcf9ee9c.png)
</br></br>

> step 4. localStoage에 Email/Password 등록
* Redux는 새로고침하면 재렌더링 됨과 동시에 값이 초기화 된다. 
* 로그인 한 이후에 새로고침을 하면 로그아웃 되기 때문에 `localStorage`에 정보를 등록

![image](https://user-images.githubusercontent.com/63600953/133926191-24427403-f975-4438-8b33-7c43c6abc7c2.png)

</br></br>

`localStorage`
* localStorage에 로그인한 유저의 Email과 Password를 등록시켜 둔다. 
* 이후 새로고침을 하더라도 localStorage에 등록시켜둔 정보를 활용하여 자동으로 로그인해서 로그아웃 현상을 막아준다.

![image](https://user-images.githubusercontent.com/63600953/133926322-fcbc0cf2-525d-4b47-90ed-21bb4c24d5c8.png)
</br></br>

> step 5. 새로고침 로그인 상태 유지
* localStorage에 저장되어 있는 Email과 Password 정보를 활용하여 다시 자동으로 로그인 시켜준다. 

![image](https://user-images.githubusercontent.com/63600953/133926519-5c23059c-8ff5-48fb-8b39-6a7c24c0ac32.png)

---
### 2. 로그아웃 기능 구현

![image](https://user-images.githubusercontent.com/63600953/133926600-61a5461b-c168-4c6f-9385-b3ad09fd97d6.png)

`Sign Out` 버튼을 누르면 기능이 구현되도록 한다. 

```
1. Redux Store 에서 정보를 지워준다. 
2. Axios 를 활용하여 /api/user/logout 주소로 POST request를 보낸다.
3. localStorage에 있는 정보들을 지워준다. 
```
</br></br>
> step 1. logoutAction 함수를 호출하여 Server와 통신

![image](https://user-images.githubusercontent.com/63600953/133926821-a5ec68bd-e077-428d-bd77-22e35fbbb4b8.png)

> step 2. Axios를 통해 Server로 부터 response 받기

`API 문서`
* API 문서에 request를 위한 URL은 `/api/user/logout` 이라고 나와있다. 
  

* POST 요청이지만 어떤 정보를 넘겨야 하는지 나와있지 않다.

![image](https://user-images.githubusercontent.com/63600953/133926870-3e2ff5a2-ffbe-43bd-94b1-ffe9b5a6edf6.png)

#### ⭐⭐⭐⭐⭐ Header에 토큰을 담아서 요청을 보낸다.

![image](https://user-images.githubusercontent.com/63600953/133927052-7c712c2e-4db4-4664-8241-1496488168d2.png)

Post request를 보낼 때, header에 토큰을 실어서 보내는 방법 (Axios) </br>


`인자 순서`
1. Server로 부터 요청을 보낼 URL 
2. Body
3. Header : 비밀스러운 정보 (Token) 는 Header를 통해서 전달한다. 

headers에 실어서 보내는 방법 
: 세번째 파라미터 위치에서 `headers : { Authorization : 'Bearer ' + (Token) } `

![image](https://user-images.githubusercontent.com/63600953/133927814-a93fecd9-18bd-442b-b27a-6396f18004ce.png)

```
{
    headers: {
        Authorization : 'Bearer ' +  localStorage.getItem('accessToken')
    }
}
```

> step 3. redux Store 업로드 

* 이제 Redux 에는 모든 정보가 비었다. 

![image](https://user-images.githubusercontent.com/63600953/133927246-06a334ea-7db5-4cd8-87ef-790517a79551.png)

> step 4. localStorage 에 있는 정보 지워주기

![image](https://user-images.githubusercontent.com/63600953/133927285-2177dab7-0a56-4f04-a1a5-31e6fcaab2f3.png)

---

### 3. 회원가입 기능 
: 로그인 기능과 동일하여 생략

---
### 4. HOC (Higher Order Component)

* User가 로그인을 했을 때 들어 갈 수 있는 페이지 / 들어 갈 수 없는 페이지
* User가 로그인을 안했을 때 들어 갈 수 있는 페이지 / 들어 갈 수 없는 페이지

`App.js`

![image](https://user-images.githubusercontent.com/63600953/133927435-2fe0d5c9-e303-43c5-8a47-f72b3d8241d5.png)

`HOC/Auth.js`
* isLogin 은 Redux Store 에 있는 User의 정보를 가져와서 현재 로그인을 했는지 안했는지 `true/false` 로 알려줌

`첫번째 인자인 SpecificComponent`
* Auth.js의 모든 조건에 걸리지 않는다면 해당 SpecificComponent를 리턴하여 입장이 가능하다.

`두번째 인자인 option` 
* `option / isLogin` 을 비교하여 다르다면 history.push를 활용하여 `redirecting` 한다. 
* true : 로그인한 유저만 출입이 가능한 페이지
* false : 로그인한 유저 출입 불가 페이지

![image](https://user-images.githubusercontent.com/63600953/133927536-7d531645-2119-44e4-8165-a61b13311900.png)
