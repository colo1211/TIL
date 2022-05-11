# part3.

# 세션, JWT, OAuth 등 회원인증 방법론

* 흐름을 파악하는데 집중! 

### 1. Session Based Auth

![image](https://user-images.githubusercontent.com/63600953/167545645-eb45bf70-9e23-4679-a850-e71f4ebf438f.png)
* 세션 : 사용자가 로그인을 했다는 정보
* 서버 메모리에 세션을 모두 저장 해 놓는다.
* 요청을 보낼 때, 쿠키가 자동으로 포함되어 요청을 보내게 된다. 

2. Token Based Auth (JWT)

### 2. JWT : JSON Web Token 방식

![image](https://user-images.githubusercontent.com/63600953/167546459-d0ad569a-8f1c-43f3-95ec-9406eefefb8c.png)

* 서버가 유저들의 로그인 상태를 저장해 놓지 않는다.
* 토큰 : 유통기한이 있는 열쇠

* 장점 : 조금 더, RestFul 한 서버를 만들 수 있다. 


### 3. Open Auth (OAuth)

![image](https://user-images.githubusercontent.com/63600953/167547026-c12e2711-e0fc-4ff5-a966-acb01c78daaa.png)


* 다른 사이트의 프로필 정보를 가져온다. 
* Google 의 프로필 정보를 가져옴

```
회원 기능이 있다면, 
1. 로그인 했을 때만 글쓰기가 가능
2. 누가 글을 발행했는지 글쓴이를 저장 가능
3. 내 글만 모아서 보기 가능
```

# ID / PW 검사 (By. Session 방식) & passport.js

* 회원가입 : DB에 값을 저장해 넣는 방식으로 진행 <br/> 
    ✔ 로그인 구현에 더욱 집중 할 것!
  ![image](https://user-images.githubusercontent.com/63600953/167555937-14e24b0e-844a-4408-bcd9-ccf60c24038b.png)



* 우리는 Session 방식으로 로그인 기능을 구현해 볼 것이다. 


### Session 방식으로 로그인 기능 구현하기

1. 라이브러리 설치
    ```
    $ npm i passport passport-local express-session 
    ```
    
2. `server.js`에 라이브러리를 첨부
   * 로컬Strategy : 인증하는 방법 `stategy` 라고한다. 
    ```
    const passport = require('passport'); 
    const LocalStrategy = require('passport-local').Strategy; 
    const session = require('express-session');
  
    // 미들웨어 (외우는 거 아님)
    // * 1. 
    app.use(session({secret:'비밀코드', resave : true, saveUninitialized : false}));
    app.use(passport.initialize());
    app.use(passport.session());
    ```
  
    * 미들웨어란?<br/>
    : 웹 서버는 요청-응답 해주는 기계다. `요청과 응답 사이에서 뭔가 실행`시켜 주고 싶을 때 사용하는 코드
      
      
`secret : '비밀코드'` <br/>
: 세션을 만들 때, 비밀번호 같은 것
    
✔✔✔✔✔ Session 방식으로 로그인 기능 구현하기 위한 준비 완료

3. 로그인 페이지 제작 & 라우팅

    3-1. 어떤 사람이 로그인페이지에 들어가면, 로그인 폼을 가져다가 줘라
    ```
    app.get('/login', function(req,res){
      res.render('login.ejs'); 
    })
    ```
   
4. 사용자가 로그인을 하면, 아이디와 비밀번호를 검사하세요. 통과가 되면 응답을 한다. 

* 아이디와 비밀번호를 검사하는 역할이 미들웨어 : `Passport` 미들웨어
```
app.post('/login', 검사를 위한 미들웨어, function(req,res){
  // 아이디와 비번이 맞다면(미들웨어로 처리), 로그인 성공 페이지로 이동시켜준다.
})
```


* `passport.authenticate('local', 처리 방법)`
    * 로컬 방식으로 회원인지 인증해주세요
    * 2번째 인자, 로그인을 했을 때 실패하면 어떤 제스처를 취할 것인지? 
        ex) `redirectFailure : '/fail'`
```
app.post('/login', passpost.authenticate('local',{
  failureRedirect : '/fail'
}), function(req,res){
  // 아이디와 비번을 검증 후(미들웨어로 처리), 로그인 성공 페이지로 이동시켜준다.
  res.redirect('/');  
})
```

5. 아이디 비밀번호를 검사하는 세부 코드

* 인증하는 방법을 strategy 라고 한다.
* 아이디와 비번이 맞는지 검증하는 부분, DB와 비교


done(파라미터1, 파라미터2, 파라미터3)
```
1. 서버 에러를 넣는 곳
2. 성공할 시, 사용자의 db 데이터
   -> 아이디/비번이 맞지 않다면 false 를 넣어주어야 한다. 
3. 에러메세지 넣는 곳
```

```
passport.use(new LocalStrategy({
  usernameField: 'id', // 유저가 입력한 폼에 name = 'id'인 값
  passwordField: 'pw', // 유저가 입력한 폼에 name = 'pw'인 값
  session: true, // 이 사람의 세션 정보를 저장할 것인지? 
  passReqToCallback: false, // 아이디 비번 말고도 다른 것도 검증 할 것인지? true라면, req.body 에 담겨서 정보가 온다.
}, function (입력한아이디, 입력한비번, done) {
  //console.log(입력한아이디, 입력한비번);
  db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
    if (에러) return done(에러)

    if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
    if (입력한비번 == 결과.pw) {
      return done(null, 결과)
    } else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));
```

⭐ 검사가 끝난다면, 로그인 했다는 정보를 세션으로 만들어서 저장해 놓아야 한다. <br/>  
(로그인 성공 => 세션 정보를 만든다)
```
로그인 성공 -> 세션정보를 만듦 -> 마이페이지 방문시 세션검사
```

6. 세션 만들고 세션아이디 발급해서 쿠키로 보내주기 

* 세션 데이터에 포함된 세션 아이디를 발급해서 유저에게 보내주면 된다.

* 세션 데이터를 만들고 세션 아이디를 만들어주는 코드


`serializeUser();`

```
// 유저의 id 데이터를 바탕으로 세션데이터를 만들어주고
// 그 세션데이터의 아이디를 쿠키로 만들어서 사용자의 브라우저로 보내줌. 
passport.serializeUser(function (user, done) {
  done(null, user.id)
});
```

![image](https://user-images.githubusercontent.com/63600953/167572107-9d977221-fae3-47ee-b23d-f2be454e71d4.png)


* 아래와 같이 쿠키에 세션을 저장한다.
![image](https://user-images.githubusercontent.com/63600953/167572707-035efbff-bb44-4413-b62e-92b96a573e4f.png)


# 로그인 유저만 접속할 수 있는 페이지 만들기

=> 세션이 있는 사람만 접속할 수 있는 페이지

* `/mypage` 접속시 mypage로 get요청 및 라우팅

```
app.get('/mypage', function (req, res) {
  req.render('mypage.ejs', {})
}) 
```


=> 평범한 라우팅역할을 하는 함수이다. 접속하기 이전에, 로그인 여부를 파악하기 위해서는
`미들웨어` 가 필요!

`로그인 미들웨어`
```
// 마이페이지로 요청을 하게 되면, checkLogin 미들웨어를 실행. 
app.get('/mypage', checkLogin, function (req, res) {
  res.render('mypage.ejs', {})
}) 

function checkLogin(req, res, next){
    // 유저가 로그인을 했다면,
    if(req.user){ // 로그인 후 세션이 있으면, req.user가 항상 존재한다. 
        next(); // 통과
    }else{
        res.redirect('/login'); // 안했다면 로그인 페이지로 넘어간다. 
    }
}
```

### 미들웨어에서 사용하는 req.user란? 

* `deserializeUser();`
    * 로그인이 필요한 페이지를 접근할 때 마다, 실행
    * 이 사람이 세션이 있는지 없는지 찾아주는 역할
    * 로그인한 유저의 개인 정보를 DB에서 찾는 역할
    => 세션에는 유저의 id 정보만 저장되어 있음
      
```
// 로그인한 유저가 로그인된 페이지를 요청할 때(접속할 때) 실행되는 함수
passport.deserializeUser(function (아이디, done) {
    console.log('deserializeUser 들어옴',아이디);
    db.collection('login').findOne({ id : 아이디}, function(err,result){
      console.log(result); 
      
      // db에서 user.id 로 유저를 찾은 후에, 유저정보를 result에 넣어주는 역할
      // 마이페이지 같은 곳에 데이터 바인딩을 위해
      done(null, result);
    })
}); 
```