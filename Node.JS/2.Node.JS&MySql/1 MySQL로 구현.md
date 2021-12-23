# 1. MySQL로 구현

### **시작 전!**

**CMD에서 MySQL 실행 하기!** 

```bash
mysql -u root -p
```

→ 입력하면 비밀번호를 입력하라고 떠야 하지만, 뜨지 않았다. 

문제점 : 환경 변수 path 에 Mysql이 설치 되어 있는 bin 경로를 path에 새로 만들기 해주면 된다. 

**환경 변수 설정:** [https://blog.naver.com/jin93hj/221118160512](https://blog.naver.com/jin93hj/221118160512) (참고 사이트)
![Untitled](https://user-images.githubusercontent.com/63600953/109131316-06ee1c80-7796-11eb-87bb-9219b10f09a6.png)

  **기억 Tip : mysql -u(user) root(host) -p(password) ⇒ 이제 password를 입력 하는 창이 나옴**

---

## Node.js MySQL 모듈 사용 방법

- NPM mysql 을 사용
- [https://www.npmjs.com/package/mysql](https://www.npmjs.com/package/mysql)

**설치** 

```bash
npm install -S mysql 
```

→ pakage.json의 defendencies에 추가된다. 

![Untitled 1](https://user-images.githubusercontent.com/63600953/109131876-8f6cbd00-7796-11eb-8773-ded620a809b8.png)

**사용법 (mysql.js)**

1. createConnection 
2. connect
3. query
4. end 

```jsx
// **모듈 require** 
var mysql      = require('mysql');

// 1. **접속하기 위한 정보를 createConnection 메소드를 호출**
var connection = mysql.createConnection({     
		host     : 'localhost',
    user     : 'nodejs',
    password : '*******',
    database : 'opentutorials'
});

// 2. **connect 메소드를 통해서 연결** 
connection.connect(); 

// 3. **query 메소드를 통해서 쿼리문 작성** 
connection.query('select * from topic', function (error, results, fields) {
    if (error) {
        console.log(error);
    } // 에러 있다면
    console.log(results);
}); // sql 문을 첫 번째 인자, 콜백 두 번째 인자

// 4. end 메소드를 통해서 **connect 끝!** 
connection.end();
```

---

## MySQL - 메인 페이지 구현

- **main.js 맨 위 → 모듈 호출, mysql.createConnection**

```jsx
var mysql = require('mysql') ; // mysql 모듈 호출 
var db = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'11111',
	database : 'opentutorials' // 사용할 데이터베이스를 선택
});
```

- **.query( query문, Call Back 함수)**

```jsx
if (pathname === '/') {
	if (queryData.id === undefined) {
	db.query(`SELECT * FROM topic`, function(error, topics){ // topics는 리스트를 출력하기 위한 용도
              var title = 'Welcome';
              var description = 'Hello, Node.js';
              var list = template.list(topics);
              var HTML = template.HTML(title, list,
              `<h2>${title}</h2>${description}`,
              `<a href="/create">create</a>`
              );
              response.writeHead(200);
              response.end(HTML);
          })
	}
}
```

- **list 함수 변경 (template.js 내에 있는 모듈)**

→ 본문의 제목을 클릭하면 id 로 연결되게 끔 설정  ****

```jsx
list(topics){
    var list = '<ul>';
    var i = 0;
    while(i < topics.length){
      list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }
```

**중요! topics에 담기는 데이터 구조 : 배열 [ 객체, 객체, 객체...]**

```
[
0|main   |   RowDataPacket { //0
0|main   |     id: 1,
0|main   |     title: 'MySQL',
0|main   |     description: 'MySQL is...',
0|main   |     created: 2018-01-01T03:10:11.000Z,
0|main   |     author_id: 1
0|main   |   },
0|main   |   RowDataPacket { //1 
0|main   |     id: 2,
0|main   |     title: 'Oracle',
0|main   |     description: 'Oracle is ...2',
0|main   |     created: 2018-01-03T04:01:10.000Z,
0|main   |     author_id: 1
0|main   |   },
0|main   |   RowDataPacket {//2 
0|main   |     id: 3,
0|main   |     title: 'SQL Server',
0|main   |     description: 'SQL Server is ...',
0|main   |     created: 2018-01-20T02:01:10.000Z,
0|main   |     author_id: 2
0|main   |   },
0|main   |   RowDataPacket {//3 
0|main   |     id: 4,
0|main   |     title: 'PostgreSQL',
0|main   |     description: 'PostgreSQL is ...2',
0|main   |     created: 2018-01-22T16:03:03.000Z,
0|main   |     author_id: 1
0|main   |   },
0|main   |   RowDataPacket {//4
0|main   |     id: 5,
0|main   |     title: 'MongoDB',
0|main   |     description: 'MongoDB is ...',
0|main   |     created: 2018-01-30T03:31:03.000Z,
0|main   |     author_id: 1
0|main   |   }
0|main   | ]
```

- topics 배열
  ![Untitled 2](https://user-images.githubusercontent.com/63600953/109131944-a3b0ba00-7796-11eb-8411-9398a7217de1.png)

> querystring을 기존의 [queryData.id](http://querydata.id)(제목명) 에서 [topic.id](http://topic.id)로 변경 (/?id=숫자)

---

## MySQL - 상세 보기 구현

- 메인 페이지에서 목록을 클릭했을 때 넘어가는 기능

![Untitled 3](https://user-images.githubusercontent.com/63600953/109131985-b0351280-7796-11eb-9195-6d83723b3ab4.png)

**메인 페이지** 

![Untitled 4](https://user-images.githubusercontent.com/63600953/109132018-bb883e00-7796-11eb-9da5-25425159df69.png)

**상세 페이지 (ps. url의 id가 숫자)** 

```jsx
// 리스트를 만들기 위한 코드
db.query(`select * from topic`, function(error, topics){  
              if (error) throw error;
							// 해당하는 내용을 가져오기 위한 코드 
              db.query(**`select * from topic where id=queryData.id`**/*,[queryData.id]*/,function(error2, topic){ // 사용자의 입력에 대비하기 위한 코드: ? 이후 제대로된 값을 준다.
                  if(error2) throw error2;
                  var title = topic[0].title; // topic[0]은 현재 배열 위치를 가르킨다.
                  var description = topic[0].description;
                  var list = template.list(topics); // 리스트 띄우기 위한 topics
                  var HTML = template.HTML(title, list,
                      `<h2>${title}</h2>${description}`,
                      `
                        <a href="/create">create</a>
                        <a href="/update?id=${queryData.id}">update</a> 
                        <form action="delete_process" method="post">
                        <input type="hidden" name="id" value="${queryData.id}">
                        <input type="submit" value="delete">
                        </form>`
                  );
                  response.writeHead(200);
                  response.end(HTML);
              })
          })
```

- **topic은 크기가 1인 배열에 담겨서 전달된다.**

  ![Untitled 5](https://user-images.githubusercontent.com/63600953/109132072-c7740000-7796-11eb-8419-7d01c9423be2.png)

 따라서, 해당하는 값을 사용하기 위해서는 topic[0].title, [topic](http://topic.id)[0].id 과 같은 형태로 처리한다. 

### 사용자가 입력한 값에 대한 공격을 대비

**db.query('쿼리문', '전달 인자', 'Call Back 함수')**  

#1. **대비 X** 

```jsx
db.query(`select * from topic where id=queryData.id`,,function(error2, topic){
```

#2. **대비 O : id=?`, [전달할 값],** 

**→ 전달 할 값을 두번째 인자로 전달**  

→ 물음표 여러 개 가능, 값을 배열에 순서대로 넣어주어야 한다.    ****

```jsx
 db.query(`select * from topic where id=?`,[queryData.id],function(error2, topic){
}
```

---

## MySQL - 글 생성 기능 구현

- `**create` 버튼을 눌렀을 때, 입력 양식이 뜨는 코드**

```jsx
else if(pathname === '/create'){
        db.query(`select * from topic`, function(error, topics){ // 리스트를 출력하기 위한 문
            var title = 'Create';
            var list = template.list(topics);
            var HTML = template.HTML(title, list,
                `<form action="process_create" method="post">
                 <p><input type="text" name="title" placeholder="title"></p>
                 <p><textarea name = "description" placeholder="contents"></textarea></p>                        <p><input type="submit"></p>
                 </form>`,
                ``);
            response.writeHead(200);
            response.end(HTML);
        })
    }
```

→ create_process로 입력 양식을 전달한다. 

- `**process_create` 에서 정보를 받는 방법**

```jsx
else if(pathname === '/process_create'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
        db.query(`
          insert into topic(title, description, created, author_id) values(?,?, NOW(),?)`,
					[post.title,post.description,1],
          function (error, result){
            if(error) throw error; // 에러 있다면 에러 출력 
            response.writeHead(302,{Location :`/?id=${result.insertId}`}); // 리다이렉션
            response.end();
          });
          })
    }
```

- **삽입한 행의 ID값을 알아내는 방법 ⇒ `result.insertId`**

```jsx
function (error, result){
            if(error) throw error; // 에러 있다면 에러 출력 
            response.writeHead(302,{Location :`/?id=**${result.insertId}**`}); // 리다이렉션
            response.end();
          });
```

**→ 알아낸 Id 값을 활용하여 바로 Redirection 한다.** 

---

## MySQL - 글 수정 기능 구현

- `update` 를 눌렀을 때, 수정 양식을 띄우는 코드

```jsx
else if(pathname === '/update'){
        db.query(`select * from topic`, function(error, topics){
            if(error) throw error;
            db.query(`select * from topic where id=?`,[queryData.id], function (error2, topic){
                if (error2) throw error2;
                var title = topic[0].title;
                var list = template.list(topics);
                var HTML = template.HTML(title, list, `
                <form action="/update_process" method="post">
                    <input type="hidden" name="id" value="${topic[0].id}">
                    <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
                    <p>
                    <textarea name="description" placeholder="description">${topic[0].description}</textarea>
                    </p>
                    <p>
                    <input type="submit">
                    </p>
                </form>
                `,` <a href="/create">create</a>
                           <a href="/update?id=${topic[0].id}">update</a>`);
                response.writeHead(200);
                response.end(HTML);
            })
        })
    }
```

→ <form> 태그에 의해서 `/update_process` 로 전달된다. 

- `/update_process` 에서 데이터를 전달 받아서 처리하는 방법

**→ `UPDATE SET WHERE` 을 통해서 수정**

```jsx
else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(error){
          if (error) throw error;
          var post = qs.parse(body);
          db.query('UPDATE topic SET title=?, description=?, author_id=1 WHERE id=?',[post.title,post.description,post.id],function(error,result){
                  response.writeHead(302, {Location: `/?id=${post.id}`}); // REDIRECTION 해당하는 수정된 페이지
                  response.end();
              })
      });
    }
```

> **Id를 두어서 관리하기 때문에 title이 변경되어도 파일 시스템 보다 수월하게 관리가 가능해졌다.**

---

## MySQL - 글 삭제 기능

- **상세 보기 페이지에서 다음과 같이 폼을 작성한다.**

```jsx
<form action="delete_process" method="post">
<input type="hidden" name="id" value="${queryData.id}">
<input type="submit" value="delete">
</form>
```

- `delete_process`
- where id=? 를 넣어주지 않으면 전체가 모두 삭제된다.

```jsx
else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          db.query(`DELETE FROM topic WHERE id=?`,[post.id],function(error, result){
              if (error) throw error;
              response.writeHead(302,{Location :'/'}); // REDIRECTION
              response.end();
          })
      });
    }
```