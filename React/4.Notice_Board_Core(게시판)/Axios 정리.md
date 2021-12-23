# React & Axios | 서버와의 통신
- 로그인 / 로그아웃을 통한 서버와의 통신을 학습

![image](https://user-images.githubusercontent.com/63600953/133878826-91f40a82-464e-4076-b6c7-ac134634692c.png)

* Client 가 로그인 창에서 Email/Password 를 치고 Server에 Request(요청)를 보냄. 
* Server 는 DB에서 조회한 이후에 성공인지 실패인지 Response(응답)을 보냄. </br></br>

cf) 성공일시는 response 200, 실패일시는 response 400을 보내줌
  * 참고) http 상태 코드 
  https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C
  

⭐ `성공일때는 로그인을 유지하기 위해서 토큰을 보내줌.`
  
  
이 때, Client와 Server가 request/response를 보내기 위한 작업, 통신을 하기 위한 것이 Axios. 
```
> npm install axios --save
```

---

현재 서버가 구축되어 있지 않으므로 
`Fake Server`를 통해서 Client-Server 간 통신하는 방법을 배운다.

참고 사이트 : https://reqres.in/

![image](https://user-images.githubusercontent.com/63600953/133879113-685bb0e4-01e5-40f4-8c02-f7307d64cb9f.png)

`Client 요청(Request) 분류 코드` : GET/POST 등등..

* GET 방식 : body에 정보를 담아 보내는 것이 아닌 값을 가져오는 것, 주소창에 내가 원하는 정보를 넣어서 가져오기 가능
  ![image](https://user-images.githubusercontent.com/63600953/133879483-c3423e88-e5b2-467a-a6e2-4e2f32dc332b.png)
  `reqres.in/api.login/` : 여기 에서
  `?name=hoza&add=seoul` : 다음에 해당하는 정보들을 가져다 줘!
  

* POST 방식 : body에  정보를 담아서 보낸다. 주소창에 원하는 정보 넣어도 안나옴. 따라서 민감한 정보들을 다룰때 사용하는 방식 ex) 로그인,로그아웃
  ![image](https://user-images.githubusercontent.com/63600953/133879637-5ff59d84-38b3-440b-8789-954f476dd012.png)
  
* 이번에 사용할 것은 빨간색 Box 로 표시한 2개만 사용

---

# Axios 를 통해 GET 방식 통신하기

`Axios GET 방식`
* 첫번째 파라미터 : request를 보낼 서버 주소
```
import axios from 'axios'; 

axios.get('서버 주소')
.then((response) => {
    // response에는 서버로 부터 요청한 정보가 담긴다.  
  }
)
.catch((e) => console.log(e)); 
```

* `https://reqres.in/api/users?page=2` </br>
  : GET request를 보내고 response 받아오기
  아래 그림의 오른쪽에 있는 정보가 담길 것이다. 
  ![image](https://user-images.githubusercontent.com/63600953/133881139-a486ef36-4010-4993-9136-f1da18176530.png)  

```
  const onTest = () =>{
    axios.get('https://reqres.in/api/users?page=2')
    .then((response) => {
      console.log(response);
    })
    .catch((err)=>{
      console.log(err); 
    })
    .then(()=>{
      console.log('test'); 
    })
  
  }

```
> GET 요청을 통해서 받아온 response (콘솔창에 찍히는 결과)

![image](https://user-images.githubusercontent.com/63600953/133881000-0c7ccd47-04f6-4bf7-8a11-478b8c3fc782.png)


> response Schema : response 구조 파헤치기

![image](https://user-images.githubusercontent.com/63600953/133881476-4c780b87-ed73-4eb2-9164-9f25f1aa4787.png)

* `data` : 요청에 대한 서버로부터의 응답이 담기는 공간, axios로 부터 response를 받을 때 값을 넣어주는 속성 </br>
* `status` : 200은 성공, 400은 실패 </br>
* `headers` : 서버에 요청한 응답 데이터는 `data`에 담겨서 온다. 하지만 보안이 중요한 데이터는 headers에 담아서 보낸다. </br>
* `Config` : 어떤 request 를 보냈고 어던 response 를 반환해야 하는지 형태를 담아두는 공간 </br>

--- 
# Axios 를 통해 POST 방식 통신하기

`Axios POST 방식`
* 첫번째 파라미터 : request를 보낼 서버 주소
* 두번째 파라미터 : 서버로 전달할 data Object
```
import axios from 'axios'; 

axios.post('서버 주소', 데이터를 전달할 Object body)
.then((response) => {
    // response에는 서버로 부터 요청한 정보가 담긴다.  
  }
)
.catch((e) => console.log(e)); 
```

* `https://reqres.in/api/register` </br> 
  : POST request를 보내고 response 받아오기

![image](https://user-images.githubusercontent.com/63600953/133882062-04d78b3f-cff0-496d-9982-f1187fc0cf06.png)

```
  const onPostTest = () => {
    axios.post('https://reqres.in/api/register', {
      email: "eve.holt@reqres.in",
      password : "pistol"
    })
    .then((request)=>{
      console.log(request); 
    })
    .catch((e)=>console.log(e)); 
  }
```
![image](https://user-images.githubusercontent.com/63600953/133882139-eaef8a14-a640-4064-a1e2-fff501d822af.png)

---
# Token 을 활용한 Log In 프로세스

1. Client 에서 Email 과 Password 를 Server로 전달 (Request)
   

![image](https://user-images.githubusercontent.com/63600953/133884913-d0dad15c-4e71-4b4b-b041-29641a6ff5dd.png)
   


2. Client 에서 request에 대한 `성공/실패` 에 대한 값을 Client로 전달 (Response)

![image](https://user-images.githubusercontent.com/63600953/133884937-89825415-723e-43ce-8e86-0b3bc205c0c3.png)

* 성공   </br> 
: ⭐`Token`을 반환
  

* 실패   </br>
: Error를 반환, 실패시에는 alert로 Error를 띄우면 된다. 
  

## Token의 필요성
> 로그인을 했는지 안했는지 모르겠지만 어떤 유저가 페이지에 접속하여 서버에 요청을 한다고 가정

![image](https://user-images.githubusercontent.com/63600953/133885119-bebfbe79-8109-4e47-a333-a05b3609d7ec.png)

![image](https://user-images.githubusercontent.com/63600953/133885134-34460509-c51d-4c02-8f28-49819e1dca2b.png)

![image](https://user-images.githubusercontent.com/63600953/133885152-b6a4f222-5a73-4464-8709-d649653e8f05.png)

![image](https://user-images.githubusercontent.com/63600953/133885161-26032aab-86ef-4a34-a611-cc4943abb522.png)

> 그럼 User는 어떤 요청을 할때마다 로그인을 해야하는가? 

`예전 나의 생각` : 로그인한 정보를 Client의 기기에 저장하여 매 요청시 마다 Email과 PW를 전달해주면 되지 않을까? 

⚠ 보안에 매우 취약

> ⭐⭐⭐⭐⭐ 해결방안 : `Token` 을 사용

![image](https://user-images.githubusercontent.com/63600953/133885273-e2f85561-ac2c-4cde-b35a-14f6ae174e84.png)

![image](https://user-images.githubusercontent.com/63600953/133885280-da4bea09-f91e-4cba-b634-220ebb48608c.png)

* 로그인을 한 이후 유저는 Token을 가지고 있게 된다.
* `로컬스토리지 혹은 쿠키`에 Token을 저장한다. 

![image](https://user-images.githubusercontent.com/63600953/133885292-20f38fba-6893-4bf5-b103-8c8e81852a97.png)

* 다음에 요청을 보낼 때, Email과 Password가 아닌 `Token`을 서버에 보낸다.
  
![image](https://user-images.githubusercontent.com/63600953/133885355-6faa191d-7d3d-44b0-a097-d05b979e9559.png)

![image](https://user-images.githubusercontent.com/63600953/133885375-091aab9d-dfcc-4958-8e1e-f9bc670bf4a5.png)


```
Q. 이메일과 패스워드로 Request 하는 것과 Token을 담아서 Request를 하는 것과 무슨 차이가 있는가?
A. Token에는 만료시간이 존재한다. 만료시간이 지나게 되면 Token은 파기되고 request를 보내더라도 원하는 결과값을 얻을 수 없다. 
```
![image](https://user-images.githubusercontent.com/63600953/133885433-26affc77-a806-443d-b943-27a060cc64ab.png)

