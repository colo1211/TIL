# .env 파일을 통한 환경변수관리

* 실제로 서버를 배포할 때, 필수적인 파일

```
var db;
MongoClient.connect('mongodb+srv://admin:1234', function(err, client){
    if (err) return console.log(err)
    db = client.db('todoapp');
    app.listen(8080, function() {
        console.log('listening on 8080')
    })
}) 
```

.env 파일에서 환경변수로 관리해주어야 하는 것들
1. 포트번호
2. DB 접속 문자열 


`.env 파일` <br/> 
: 내가 만든 코드를 팀원과 share 해야하는데 내 아이디 비번이 적혀있으면 좀 이상하다.
이런 환경에 따라 가변적인 변수 데이터들을 보통 환경변수라고 부르는데 개발자들은 나중을 생각하는 코딩을 하기 위해 환경변수를 한곳에 모아서 관리

### .env 파일 사용하는 방법


1. env 라이브러리 설치
```
$ npm i dotenv
```

2. `server.js` 파일에서 라이브러리 등록
```
$ require('dotenv').config(); 
```

3. .env 파일
*  나중에 변경이 될 것 같은 환경변수들을 전부 다 적고 저장
* env 파일 내부에서 변수 이름들을 모두 대문자로 표기
```
PORT=8080
DB_URL="mongodb+srv://admin:1234"
```

4. 환경변수들을 server.js에 불러오기

* process.env.DB_URL
* process.env.PORT

```
var db;
  MongoClient.connect(process.env.DB_URL, function(err, client){
  if (err) return console.log(err)
  db = client.db('Example1');
  app.listen(process.env.PORT, function() {
    console.log('listening on 8080')
  })
}) 
```
