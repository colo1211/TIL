# part1.


모든 웹 서비스의 뼈대, 프론트엔드 개발자가 알아야 할
핵심적인 백엔드 내용을 학습

1. Todo App 만들기 (CRUD)
    * 글 목록 읽기
    * 글 생성
    * 글 수정
    * 글 삭제
  
2. NoSQL (몽고디비) 을 활용한 DB에 데이터 저장 및 출력법

3. 서버 제작 (API) 

4. 서버 배포

# 서버란?

---
* server : 요청을 받으면 요청한 내용을 보내주는 프로그램
    * 서버 : 서빙하는 사람
    * 서버 개발자 : 알바생을 만드는 역할

ex) 네이버 웹툰 서버 개발    
```
    어떤 사람이 comic.naver.com으로 접속하면 / 요청 (Request) 
    네이버 웹툰 메인 html 파일을 전송해주세요 / 요청 처리
```

### 요청 (Request) 

* 4가지 방식이 존재
    1. 읽기 (GET 요청) 
    2. 쓰기 (POST 요청) 
    3. 수정 (PUT 요청) 
    4. 삭제 (DELETE 요청) 

ex) 요청의 유형에 따른 응답     
```
어떤 사람이 /list 하는 페이지를 GET요청하면
거기에 해당하는 list.html 파일을 보내줌
```

# Node.js란? 

---

* JavaScript는 HTML 파일에 종속된 언어 (HTML의 조작과 변경을 위한 언어)
    * HTML은 정적인 페이지를 만들어 내는 언어
    * JS를 이용하면 웹페이지를 동적으로 조작이 가능
    

* 자바스크립트 해석은 누가? `브라우저`
    * 브라우저마다 JS 해석 엔진이 내장
    * 크롬 V8 엔진을 사용 -> 특징 : JS 해석 속도와 성능이 Good
    

* Node.js 
: 크롬의 V8 엔진을 떼어와서 만든 자바스크립트 실행환경
  * 노드 덕분에 JS를 프로그래밍 언어로써 사용할 수 있게 되었음
    

###  Node.js 특징 및 장점

---
### Non-Bloking I/O <br/>
    
: 요청 순서에 상관 없이 우선 요청을 모두 받은 이후에 빨리 처리되는 요청들에 대한 응답을 진행한 이후,
       서버가 처리하기 버거운 일들을 최대한 나중에 처리하는 방식<br/>
* 장점 : 다른 가벼운 요청들은 들어온 순서에 상관없이 빨리 빨리 처리 될 수 있다. <br/>
      ex) SNS , 채팅 서비스 등 요청에 많은 서비스에 유용 
      <br/>
      <br/>
    cf) 다른 프레임워크로 개발한 서버 <br/>
    : 처리 속도와 무관하게 들어온 순서대로 요청에 대한 응답을 처리 <br/>
   * 다른 프레임워크로 개발한 서버도 `서버스케일링` 혹은 `멀티스레딩`을 하면 노드와 같이 처리 가능
   <br/><br/>
    
# Node.js & Express Install

--- 

express : Node.js의 라이브러리

express 설치

1. 터미널을 활용하여 해당 폴더로 이동


2. `npm init` 
   * package.json을 만들어줌 <br/>
    : 어떤 라이브러리를 설치했는지 기록해주는 파일
   *  계속 Enter
    

3. Enter 치다가, entry point 에만 내가 원하는 파일명을 입력한다.
   * entry point -> Package.json 내부
     * main : `entry point 이름`
    ![image](https://user-images.githubusercontent.com/63600953/167152379-7a600365-325d-4d7d-9619-eb982b74478f.png)

3. `npm install express`
   ![image](https://user-images.githubusercontent.com/63600953/167153031-69c0cc8c-6693-45bd-9f07-b825681f3533.png)

    *  node_modules 폴더 : 라이브러리에 필요한 자료들을 담는 공간
    
cf) npm 대신 yarn 설치
```
> yarn i --global yarn
> yarn -v
```

# Express 기본 환경 Setting

---
Node.js 환경 위에서 Express를 사용하기 위한 기본 셋팅
```
const express = require('express'); // 설치한 라이브러리 불러오기
const app = express();  // 라이브러리를 끌어와서 새로운 객체를 만듦

app.listen(8080, function(){
    
}); 
```

* listen(서버띄울 포트번호, 띄운 후 실행할 코드)
```
app.listen(8080, function(){});
```

* 8080 번호로 들어왔을 때, 이 서버를 띄워주세요

```
app.listen(8080, function(){
    console.log('8080 포트 가동중');
});
```
![image](https://user-images.githubusercontent.com/63600953/167154907-8888a0af-9c78-413c-ac84-2a44f8859fbf.png)


# GET 요청 처리하기

---

일반적인 웹사이트 요청

1. swindow.naver.com/`pet`/home : 뷰티 상품을 보여줌
2. swindow.naver.com/`beauty`/home : 펫 상품을 보여줌

* 서버는 각기 다른 GET요청에 따라 다른 HTML 파일을 보내주는 역할을 한다

```
클라이언트가 /pet 로 방문을 하면, 
pet 관련된 게시물을 띄워준다. 
```

* app.get('경로', 해당 경로로 접속하였을 때 기능을 실행할 콜백함수)
  * q,s 순으로 입력
    * re`q` : 요청
    * re`s` : 응답
```
app.get('/pet',function(req, res){
    res.send('Pet 쇼핑 가능한 페이지임'); 
})
```

< GET 요청 결과 > 
![image](https://user-images.githubusercontent.com/63600953/167156305-e4e868fa-053c-4e0b-a25e-8c5eb351852f.png)

# 서버에서 HTML 파일 전송 & Nodemon을 통한 실행 자동화

---


### Nodemon 및 설치

--- 

* Nodemon <br/> 
: 기존의 노드는 코드에 변경사항이 있으면 `node server.js` 를 계속 진행해야 했지만, 
  Nodemon을 사용하면 변경사항을 자동으로 반영하여 껐다켰다를 방지할 수 있다. (실행자동화가 가능)
  

* Nodemon 설치
```
> npm i -global nodemon
```
   
   
* -global(-g): 컴퓨터의 모든 폴더에서 이용할 수 있도록 하는 명령어


### 서버에서 HTML 파일 보내기

--- 

* 응답.sendFile(보낼 파일 경로)
```
app.get('/', function(res,req){
    res.sendFile(___dirname + ''); 
})
```
* sendFile() : 파일을 보낼 수 있음
* __dirname :  현재 파일의 경로를 뜻함 (언더바 두개)


# POST 요청 처리하기

--- 

### form 데이터 [ POST 요청 처리하기 ]
1. body-parser 사용하기
    : req에 담긴 body 데이터를 쉽게 처리하게 도와준다.
2. form 데이터 input 창에 name을 추가  
    : 서버에서 input을 구분하기 위해서 name을 사용 <br/>
    ex) `<input name='title'>` 
3. server.js에서 res.body를 활용
    : 요청했던 form에 적힌 데이터를 수신 가능
   
    ex)  
   ``` 
   app.post('/add', function (req, res) {
        console.log(req.body); 
    });
   ```

### body-parser <br/>
: 요청 데이터 (req의 body) 해석을 쉽게 도와줌 <br/>

주의! <br/>
: 원래는 `body-parser` 라이브러리를 설치 후 import 해와야 했으나,
현재는 express 상에 내장 되어 있기 때문에 server.js 파일에 아래의 코드만 추가해주면 된다.

```
app.use(bodyParser.urlencoded({ extended: true }));
```

### 폼 태그 기능 고려 해야 할 사안 (action, method)

1. form - `action 속성` <br/> 
: 전송 경로

2. form - `method 속성` <br/>
: 정보를 어떤 형태로 전달할 것인지? (GET/POST)

```
<form action="/add" method="post">
</form>
```
: 위의 경로를 통해서 `/add` 경로로 POST 요청

![image](https://user-images.githubusercontent.com/63600953/167170273-92aba41a-5aea-42af-860c-7a020a03ff94.png)

* form 데이터에서 작성한 정보는 어디에? <br/>
  : input에 적은 정보는 req(요청) 파라미터에 저장되어 있음 <br/>
  => 이를 사용하기 위해서는 `body-parser` 라이브러리가 필요! 


![image](https://user-images.githubusercontent.com/63600953/167174320-e0b9da11-a4bd-4a97-a40b-dcf476431a5d.png)

* 정보를 영구저장 하기 위해서 DB를 도입

# REST API

--- 

API란? <br/> 

`사전적 API 정의`
* `A`pplication `P`rogramming `I`nterface <br/>
* 프로그램 간에 어떻게 어떤 식으로 통신할 수 있는지 통신 규약 

`웹 개발 시 API 정의` 
* 웹 서버와 클라이언트 간의 요청 방식
* 어떻게 해야 서버랑 통신을 할 수 있는지 정리해 놓은 일종의 문서

![image](https://user-images.githubusercontent.com/63600953/167176536-06755e5b-7c0c-4ac2-8acb-ff8ab023a3da.png)

지금까지 개발한 위의 코드들이 모두 API <br/>
이런 API들을 어떤식으로 만들어야 좋은 API일지?<br/>  
: REST API

WHY REST API? <br/>
: 예전에는 API를(URL) 일관성도 없고 규약에 따라 만들지 못했기 때문에 통신에 어려움을 겪음


#### REST 원칙 6개 중 1개만 기억하자.

--- 

1. Uniform Interface (⭐⭐⭐⭐⭐⭐)

인터페이스는 일관성이 있어야한다는 소리가... 뭔소리냐면

- 하나의 URL로는 하나의 데이터를 가져와야함 (하나를 가져오기 위한 두개의 URL을 만들지 말자)

- 간결하고 예측가능하게 개발 (URL 하나를 알면 둘을 알게)

- URL 이름짓기 관습을 잘 따르자.

이름짓기 관습이란?

(참고)

다른 곳에서 URL 대신 URI 이런 용어를 많이 쓰기도 하는데

URI는 자료를 넘버링하고 분류하고 지칭하는 방법이라 보시면 됩니다. <br/> 
URL과 비슷하지만 조금 더 큰 의미입니다. <br/>
도서관에서 책 분류할 때 URI에 의해서 분류하기도 합니다. <br/>

예시)
```
instagram.com/explore/tags/kpop
instagram.com/explore/tags/food
facebook.com/natgeo/photos
facebook.com/bbc/photos
```


* 좋은 REST API 이름 짓기 원칙
    * URL을 `명사`로 작성
    * 하위문서를 나타낼 땐 `/`
    * 파일 확장자 (.html) 쓰지 말기
    * 띄어쓰기는 `대시(-)`를 이용
    * 자료 하나당 하나의 URL을 사용