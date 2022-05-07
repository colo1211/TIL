# part2. 

# MongoDB 셋팅 및 사용

* 지난 시간에 유저가 input 폼을 활용하여 입력한 정보를 영구저장할 공간
* 엑셀 / 메모장도 가능은 하지만 정보의 양이 많아질 수록 느려지고 비효율적


### DB 종류
1. 관계형 DB <br/> 
   : 3차원 이상의 데이터를 잘 다루지 못함, SQL 언어를 따로 학습해야 하는 번거로움이 존재
    * 3차원 이상 데이터란? <br/>
        : 한 셀 내부에 여러 종류의 데이터를 넣지 못함.<br/>
      따라서, 다른 테이블을 만들어서 JOIN 등을 활용 
      
2. NoSQL <br/> 
    : Object 자료형으로 입출력 가능, 입출력에만 신경 쓸 수 있음
    * 자유롭긴 하지만, 자율성이 높아서 대규모 시스템에는 관계형 DB를 사용해야 함.
    
  
* cf) MongoDB Atlas <br/> 
: MongoDB를 무료로 호스팅 해주는 사이트 
  
### 생성한 MongoDB 연결 방법

1. MongoDB Connect 버튼 클릭

![image](https://user-images.githubusercontent.com/63600953/167187108-c903aab3-f7e3-474c-88a1-065fa595a11b.png)


2. Connect Your Application 버튼 클릭

![image](https://user-images.githubusercontent.com/63600953/167187235-407daf09-97e0-472c-b9df-7faedadf2ae1.png)


3. DB `접속 URL` 을 기억해두기 -> 이후, 복붙할 것임
![image](https://user-images.githubusercontent.com/63600953/167188745-75f20cc9-1271-4df2-a033-5a3fb10c6141.png)


4. Server.js에서 DB에 접속하려면
    1. 터미널
    ```
    > npm install mongodb
   ```
    2. server.js
   ```
   const MongoClient = require('mongodb').MongoClient;
   ```
    3. 
    ```
       MongoClient.connect('접속URL', function(에러, client){
        // 만약 접속 에러가 난다면, 
        if (에러) 
           return console.log(에러); 
  
        //서버띄우는 코드 여기로 옮기기 
        app.listen('8080', function(){
        console.log('listening on 8080')
        });
        })
   ```
   
# MongoDB 데이터 CRUD 명령문

* 생성 : insertOne
```
db.collection().insetOne()
```

* 수정 : updateOne
```
db.collection().updateOne({},{},function(err,result){})
```

* 읽기 
1.  하나만 읽기 : findOne
```
db.collection().findOne({}, function(err,result){})
```

2. 여러개 읽기 : find
```
db.collection().find().toArray(function(err,result){})
```

* 삭제 : deleteOne

```
db.collection('').deleteOne({}, function(err,result){})
```
    
   
# Database 자료 저장 방법 

`insertOne`
```
db.collection('폴더명').inserOne({ 저장할 index : '저장할 값' }, function(err,result){
    console.log(result); 
}); 
```

* DataBase : 폴더 <br/>
* Collection : 파일 <br/>


몽고디비에서 Collection (파일) 을 설정
![image](https://user-images.githubusercontent.com/63600953/167192108-abf01e9b-67cf-4902-b46a-f796bda832da.png)


```
var db;
MongoClient.connect('접속URL', function (err, client) {
	if (에러) return console.log(err)
	
	db = client.db('todoapp');
    db.collection('post').insertOne('저장할 데이터', function(에러, 결과){
    console.log('DB 저장완료'); 
	});
	
	app.listen(8080, function () {
		console.log('listening on 8080')
	});
});
```

* 폴더에 연결 ⭐⭐⭐⭐⭐
```
var db; 
db = client.db('todoapp');
```

* DB에 파일을 추가 ( insertOne ) ⭐⭐⭐⭐⭐
```
db.collection('파일명').insertOne(저장할 데이터, function(err,result){
    console.log('저장완료'); 
})
```

⚠ 주의 <br/>
: insertOne의 첫번째 파라미터 '저장할 데이터'는 아래와 같은 형식으로 저장한다. 

```
{ index1 : 'value1', index2 : 'value2' }
```

* 저장 결과물 <br/> 
: 각각의 데이터를 구분할 수 있는 `_id` 값이 존재 <br/> 
  이는 개발자가 직접 설정하지 않는다면, 자동으로 몽고디비에서 부여해준다. 

![image](https://user-images.githubusercontent.com/63600953/167195965-af61b253-dd30-49d9-a0b6-b0c0a5679427.png)



* _id 를 설정하는 방법
```
db.collection('파일명').insertOne({이름:'john', 나이:20, _id:1 }, function(err,result){
    console.log('저장완료'); 
})
```

![image](https://user-images.githubusercontent.com/63600953/167196245-4b89bd41-e5d0-4ec1-aac3-eeff414f4ab8.png)


) 

응용) 어떤 사람이 /add 경로로 post 요청을 하면, 
데이터 2개(제목, 날짜) 를 보내준다. 
이때, post 라는 이름을 가진 collection에 두개 데이터를 저장하기

```
app.post('/add', function (req, res) {
  console.log(req.body);
  db.collection('post').insertOne(
    { 제목: req.body.title, 날짜: req.body.date },
    (err, result) => {
      console.log('db 저장 완료');
    }
  );
});
```

# HTML 에 DB 데이터 바인딩 하는 방법 

`db.collection('폴더명').findOne()`

```
// findOne은 하나 찾기
// find는 전체 찾기 : but find()라고만 하면 이상한 메타데이터 나온다. 
// find().toArray(()=>{}) 
  
  db.collection('post').find().toArray(function (err, result) {
      console.log(result);
      res.render('list.ejs', { posts: result });
    }); 
```


바인딩 방법 
```
1. .EJS <- HTML 상에서 JS 문법을 사용 가능하게끔 해줌 
2. React / Vue / Angular 등 Front-End 프레임워크
```

### EJS 설치 및 사용방법

: HTML 상에서 JS 문법을 사용할 수 있게 해주는 템플릿 엔진


1. `npm i ejs`
2. `server.js` 파일에다가 ejs 를 사용하겠다고 선언
```
app.set('view engine', 'ejs'); 
```
3. `views/` 폴더를 생성한 이후, ejs 파일을 해당 폴더에 모두 몰아 넣는다.

4. ejs 문법을 이용하여 html 상에 서버 데이터를 삽입 가능.<br/>

* 변수를 삽입하는 방법 
```
<%= %> 
```

* JS 문법을 사용하는 방법
```
<% for(var i=0; i<10; i++) {%>
<% } %>
```

### list 바인딩 하기
`server.js`
1. db에서 데이터를 꺼낸다. 
2. list.ejs 파일을 `res.render('파일명', {ejs파일에서 사용할 객체명 : 바인딩할 데이터});`

```
app.get('/list', function (req, res) {
  db.collection('post').find().toArray(function (err, result) {
      console.log(result);
      res.render('list.ejs', { posts: result }); // list.ejs 파일에서는 posts 객체 내부에서 해당 리스트를 사용 가능. 
    }); // 모든 데이터들을 가져온다.
});
```

![image](https://user-images.githubusercontent.com/63600953/167238138-405a7712-d712-4839-81df-4e3bed514a1f.png)

`list.ejs`
3. EJS 문법을 활용하여 데이터를 list.ejs 파일에 뿌려주기

```
    <% for(let i=0; i<posts.length; i++) {%>
      <h4>할 일 제목 : <%= posts[i].제목 %> </h4>
      <p>할 일 날짜 : <%= posts[i].날짜 %> </p>
    <% } %>
```

# 게시물 id 순차 저장

⭐⭐⭐⭐⭐ 게시물을 수정/삭제하기 위해서는 `unique한 id 필수!`

: 몽고디비에서는 자료 저장할 시, _id 값이 강제로 부여

* 효과적인 자료 저장을 위해서는 _id 값을 직접 부여하면 된다. 

```
app.post('/add', function (req, res) {
  console.log(req.body);
  db.collection('post').insertOne(
    { _id : 내가 부여할 게시물의 Number, 제목: req.body.title, 날짜: req.body.date },
    (err, result) => {
      console.log('db 저장 완료');
    }
  );
});
```


### _id : 내가 부여할 게시물의 Number를 어떻게 설정하면 좋을까?

방법 1. autoIncrement <br/> 
: 게시물을 추가할 때마다, 게시물 길이 + 1 해서 번호를 저장 <br/>
* 몽고디비는 이러한 함수가 존재하지 않는다. 
* 단점 : 게시글이 삭제되면 저장되는 시점에 따라서 id의 중복 가능성이 존재


방법 2. 다른 collection을 만들어서 totalNumber의 정보를 관리하자 ⭐⭐⭐⭐⭐<br/>

![image](https://user-images.githubusercontent.com/63600953/167238647-343e86a2-560b-4341-8a98-6b6c8463cc03.png)

### 글을 생성할 때, _id를 저장

```
// 1. 게시글을 생성할 때, 
app.post('/add', function(요청, 응답){

  // 2. counter collection에 접근하여 name 이 게시글갯수인 값을 조회, totalPost 값을 가져옴.
  db.collection('counter').findOne({name : '게시물갯수'}, function(err, result){
    var 총게시물갯수 = result.totalPost;
    
    // 3. post collection에 접근하여 새로운 값을 totalPost + 1 값으로 _id 값을 +1 해준다. 
    db.collection('post').insertOne( { _id : (총게시물갯수 + 1), 제목 : 요청.body.title, 날짜 : 요청.body.date } , function(){
      console.log('저장완료')
      응답.send('전송완료');
      
      // 4. 다음 저장을 위해서, counter collection의 totalPost를 updateOne을 통해서 +1 해준다. 
      db.collection('counter').updateOne({name:'게시물갯수'},{$inc : {totalPost : 1}})
    });
  });
});
```

# 글을 수정하는 방법 및 DB update 함수 및 연산자

`db.collection('폴더명').updateOne({이런 데이터를},{이렇게 수정}, function(err, result){})`

```
db.collection('counter').updateOne({name:'게시물갯수'},{$inc : {totalPost : 1}}, function(err,result){
    // 해당 게시글이 업데이트 되었을 때 어떤 조치를 취할 지
})
```

updateOne({},{},function(err,result){}) 함수엔 파라미터 3개

첫번째,  { name : '게시물갯수' } 이렇게 자료를 찾을 수 있는 이름이라든지 쿼리문을 적어준다.

두번째, 수정할 값을 입력. 그런데 약간 특이.

{ $set : { totalPost : 100 } } 이렇게 넣어서 값을 아예 100으로 변경할 수도 있고

{ $inc : { totalPost : 5 } } 이렇게 넣어서 값을 5만큼 더해줄 수도 있다.

$ 표시 붙은게 바로 operator 라는 문법. 여러 종류가 있으니 나머지는 필요할 때 찾아쓰도록 하자. <br/>

```
참고)
$set : 고정된 값으로 업데이트 
$inc : 순차적으로 증가하여 업데이트 
```

세번째는 콜백함수.

# 게시글 Ajax 로 삭제 요청

: 서버에 해당 글 삭제 요청 (DELETE 요청)

* 삭제를 하기 위해서는 어떤 게시글을 클릭했는지에 대한 정확한 게시글에 대한 unique-id 가 존재해야 한다.
* onClick 을 통해서 data-id를 ajax를 통해서 Back-End 에 전달하고 Back-End 는 받은 정보를 기반으로 DB에 접근하여 해당 게시글을 삭제한다.


* 삭제를 위한 DB문

`db.collection('').deleteOne({}, function(err,result){})`

* HTML 만으로 DELETE 요청 불가능
    1. method-override 라이브러리 이용
    2. ajax 요청 활용

AJAX <br/>
: ' 새로고침 없이 ' 서버에 요청을 도와주는 JS 문법 

AJAX 기본 문법 (m.u.d)

``` 
$.ajax({
    method:
    url:
    data: 
}).done().fail()
```

`list.ejs`
```
<button type="button" class="delete" data-id="<%= posts[i]._id %>">삭제</button>

// 요청을 보내기 위해서 어떤 게시글을 삭제할 것인지 id 값을 요청 데이터에 넣어줌
$('.delete').click(function(e){ // delete 버튼을 클릭했을 때, ajax 요청을 실시
    var id = e.target.dataset.id; // data-id를 가져오는 ajax 문법
    $.ajax({
        method : 'DELETE', 
        url : '/delete',
        data : {_id : id}
      })
      .done((result)=>{
        // 요청에 성공했을 때, Front에서 어떤 행위를 할 지
        location.reload(); 
      })
      .fail((err)=>{
        // 요청에 실패했을 때, Front에서 어떤 행위를 할 지
      })
})

```

`server.js`
* Front 에서 온 정보 req.body._id 는 문자열
* parseInt 를 통해서 문자열에서 정수로 변환해서 삭제를 진행해야 한다. 
```
// 같이 보낸 id는 req.body에 저장되어 있음
app.delete('/delete', function(req,res){
  db.collection('posts').deleteOne({ _id : parseInt(req.body._id)}, function(err, result){
    console.log('삭제완료'); 
  })
}); 
```

# 요청에 대한 유형 및 응답 방법 response status

#### 요청에 대한 유형
```
app.get('/경로', function(요청, 응답){
  응답.send('<p>some html</p>')
  응답.status(404).send('Sorry, we cannot find that!')
  응답.sendFile('/uploads/logo.png')
  응답.render('list.ejs', { ejs에 보낼 데이터 })
  응답.json(제이슨데이터)
});
```
* send :  간단한 문자나 HTML을 보낼 수 있다.
* status : 응답코드를 보낼 수 있다.
* sendFile:  static 파일들을 보낼 수 있다.
* render : ejs등의 템플릿이 적용된 페이지들을 렌더링해줄 수 있다. 
* json : JSON 데이터를 담아보낼 수 있다.


응답 코드 <br/> 
: 요청이 성공했는지, 실패했는지 판정해줄 수 있다

```
 ✔ 2XX : 요청 성공
 ✔ 4XX : 프론트 문제, 요청 실패
 ✔ 5XX : 서버(백) 문제, 요청 실패
```

# 상세 페이지 개발, URL Parameter

* Parameter로 요청 가능한 URL 무한히 만들기

`/detail/:페이지번호` 로 접속하면 페이지 번호에 맞는 정보를 db에서 가져온다. 

`Back-End/server.js`
* FE에서 URL 상으로 전달된 id 값을 `req.params.id(⭐⭐⭐⭐⭐)`로 받을 수 있다. 
* BE에서 전달받는 id 값은 string 값이므로, 이를 parseInt() 를 통해서 정수로 변경하여 db에 보낼 _id 값의 자료형으로 변환한다.

DB 
* DB에 해당 id의 정보가 존재하지 않는다면 400 Error 
* 존재한다면 detail.ejs 파일에 result 정보를 뿌려준다. 

```
// 상세 페이지 : req.params.id
app.get('/detail/:id', function(req,res){
  req.params.id = parseInt(req.params.id); // 문자형 -> 정수형
  db.collection('post').findOne({ _id : req.params.id }, function(err, result){
    if(!result){
      res.status(400).send({message: '요청한 페이지가 존재하지 않습니다.' , err}); 
    }
    
    // 응답 result 를 detail.ejs 파일에서 data 객체로 사용할 수 있도록 render
    res.render('detail.ejs', {data : result});
  })   
})
```


`Front-End`
* 게시글 목록의 제목을 클릭했을 때 detail 페이지로 이동한다. 
* ajax 를 이용하여 `detail/:id` 페이지로 GET 요청을 보낸다.
* data-id를 e.target.dataset.id로 가져올 수 있다. 


`list.ejs`
```
<h4 class='detail' data-id="<%= posts[i]._id %>">할 일 제목 : <%= posts[i].제목 %> </h4>

$('.detail').click(function(e){
        var id = e.target.dataset.id; 
        $.ajax({
          method : 'GET', 
          url : `/detail/${id}`,
        }).done(function(result){
        
        // 성공했다면, 해당 페이지로 이동
          location.replace(`/detail/${id}`); 
        
        }).fail(function(err){
          
        })
      })
```

`detail.ejs`
* 데이터 바인딩을 하는 파일 
```
    <h4>상세페이지</h4>
    <h4>제목 : <%= data.제목 %></h4>
    <p>날짜 : <%= data.날짜 %></p>
```

