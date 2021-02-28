# 3. Module화 & 저자 기능 구현

![Untitled](https://user-images.githubusercontent.com/63600953/109406557-5c584280-79bd-11eb-8f59-c124fbf3e9b1.png)

→ 파일의 위치를 확실히 입력해야 한다. 

- 현재 폴더 : './'
- 조상(부모) 폴더 : '../'

> **하나만 export 하면 module.exports, 여러개 export 하면 exports**

## SQL 모듈 정리

- lib 폴더 내에 db.js 파일을 생성한다.

→ 기존 코드의 SQL 관련 코드들을 Module 화 시켜서 module. exports 한다.

- **db.js**

```jsx
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password : '***********',
    database : 'opentutorials'
});
db.connect();

module.exports = db;
```

- **main_mysql.js**

```jsx
var db = require('./lib/db');
```

require 를 통해서 위의 내용을 불러온다. 

---

## topic 모듈 정리

- **topic.js**

→ 메인 페이지의 코드를 `exports.home = function(){}`

여러 가지 모듈을 exports 하기 위해서는 `module.exports` 가 아닌 `exports.home=function(){}` 

```jsx
var db = require('./db');
var template = require('./template');

exports.home = function(request, response){
    db.query(`select * from topic`, function(error, topics){
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
```

위와 동일하게 다른 기능들도 모듈화 → main.js 파일이 간략해진다. 

- 기능에 따라서 볼 수 있게 간명하게 모듈 메소드를 호출, 처리

```jsx
var http = require('http');
var url = require('url');
var topic = require('./lib/topic');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/') {
        if (queryData.id === undefined) {
            topic.home(request, response);
        } else {
            topic.description(request,response,queryData);
        }
    }else if (pathname === '/create') {
            topic.create(request,response);
    }else if(pathname === '/process_create'){
        topic.process_create(request,response);
    }else if(pathname === '/update'){
        topic.update(request,response,queryData);
    }else if(pathname === '/update_process'){
        topic.process_update(request,response)
    } else if(pathname === '/delete_process'){
        topic.process_delete(request,response);
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);
```

---

## 저자 관련 기능 구현(author)

- main_mysql : 주요 컨트롤 파일
- author, topic : 해당 기능 구현 파일
- template : 필요한 함수 구현 파일

---

`author 를 클릭하면 author 리스트 등장`

![Untitled 1](https://user-images.githubusercontent.com/63600953/109406564-6c702200-79bd-11eb-83da-75dab38c6411.png)

![Untitled 2](https://user-images.githubusercontent.com/63600953/109406569-77c34d80-79bd-11eb-9f0e-a92b54f4cf4e.png)

## 1. 저자 목록 보기 기능 구현 (author 버튼 클릭)

**main_mysql.js** 

```jsx
else if (pathname === '/author'){
       author.home(request,response);
    }
```

**author.js** 

→ author 테이블에서 authors 배열에 객체로 담아옴 

```jsx
var template = require('./template');
var db = require('./db');

exports.home= function(request, response){
    db.query(`select * from topic`, function(error, topics){
        db.query (`select * from author`, function (error, authors){
            var title = 'Welcome';
            var description = 'Hello, Node.js';
            var list = template.list(topics);
            var HTML = template.HTML(title, list,
                `${template.authorTable(authors)}
                        <style>
                         table{
                            border-collapse: collapse;
                         }
                         td{
                            border: 1px solid black;
                         }
                         </style>
                        `,
                `<a href="/create">create</a>`
            );
            response.writeHead(200);
            response.end(HTML);
        })
    })
}
```

**template.js** 

```jsx
authorTable(authors){
    var tag = `<table>`;
    var i=0;
    while (i<authors.length){
      tag = tag+
          `<tr>
          <td>${authors[i].name}</td>
          <td>${authors[i].profile}</td>
          <td>update</td>
          <td>delete</td>
          </tr>`
      i++;
    }
    tag += `</table>`;
    return tag;
  }
```

---

## 2. 저자 생성 기능 구현

![Untitled 3](https://user-images.githubusercontent.com/63600953/109406576-83167900-79bd-11eb-9fa0-a626bb205dd9.png)

- author 를 눌렀을 때, 목록 바로 아래 author 테이블에 추가하는 form을 띄운다.

**main_sql.js**

- author에서 `저자 목록 생성` 을 눌렀을 때, /author/create로 넘어가게 한다.

```jsx
else if (pathname === '/author'){
       author.home(request,response);
    } else if (pathname === '/author/create'){
        author.create(request,response);
    }
```

**author.js** 

- author 부분 : 작성 form을 띄우게 한다. form의 속성 active를 `/author/create` 로 넘어가게 설정
- create 부분 : insert하여 author 테이블에 값을 추가해준다.

```jsx
exports.home= function(request, response){
    db.query(`select * from topic`, function(error, topics){
        db.query (`select * from author`, function (error, authors){
            var title = 'Welcome';
            var description = 'Hello, Node.js';
            var list = template.list(topics);
            var HTML = template.HTML(title, list,
                `${template.authorTable(authors)}
                        <style>
                         table{
                            border-collapse: collapse;
                         }
                         td{
                            border: 1px solid black;
                         }
                         </style>
                         <form action = '/author/create' method="post">
                         <p><input type="text" name="title" placeholder="title"></p>
                         <p><textarea name="description" placeholder="description"></textarea></p>
                         <p><input type="submit" value="저자 목록 생성"></p>
                         </form>
                        `,
                ``
            );
            response.writeHead(200);
            response.end(HTML);
        })
    })
}

exports.create = function(request, response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        db.query(`
          insert into author(name, profile) values(?,?)`,[post.title,post.description],
            function (error, result){
                if(error) throw error;
                response.writeHead(302,{Location :`/author`});
                response.end();
            });
    })
}
```

---

## 3. 저자 수정 기능 구현 (폼 띄우기)

![Untitled 4](https://user-images.githubusercontent.com/63600953/109406587-945f8580-79bd-11eb-9a77-918b3f3bf321.png)

→ update 버튼을 누르면 아래 form에 기존 name 과 profile 이 담겨서 수정을 할 수 있는 form이 생성되는 기능을 구현 하는 것이 목표 

**template.js**

```jsx
authorTable(authors){
    var tag = `<table>`;
    var i=0;
    while (i<authors.length){
      tag = tag+
          `<tr>
          <td>${authors[i].name}</td>
          <td>${authors[i].profile}</td>
          <td><a href="/author/update?id=${authors[i].id}">update</a></td>
          <td>
          <form action="/author/delete_process" method="post">
          <input type="hidden" name ='id' value="${authors[i].id}">
          <input type = 'submit' value="delete">
          </form> 
          </td>
          </tr>`
      i++;
    }
    tag += `</table>`;
    return tag;
  }
```

- update 부분⇒  `<a href="/author/update?id=${authors[i].id}">update</a>`
- delete 부분 ⇒ `<form action="/author/delete_process" method="post">
          <input type="hidden" name ='id' value="${authors[i].id}">
          <input type = 'submit' value="delete">
          </form>` 으로 form으로 처리 하게 끔 처리한다.

**main.js (조건문을 통해서 Routing)** 

```jsx
else if (pathname === '/author/update'){
        author.update(request,response,queryData);
    }else if (pathname ==='/author/update_process'){
        author.process_update(request,response);
    } 
```

**author.js**

- url 모듈을 호출해서 queryData를 알아낸다.
- authors 는 목록 , author은 현재 클릭한 배열 요소 1개
- 콜백 지옥

```jsx
exports.update = function (request, response){
    db.query(`select * from topic`, function(error, topics){
        db.query (`select * from author`, function (error, authors){
            var _url = request.url;
            var queryData = url.parse(_url, true).query;
            db.query(`select * from author where id = ?`,[queryData.id],function(error, author){
                var title = 'author';
                var list = template.list(topics);
                var HTML = template.HTML(title, list,
                    `${template.authorTable(authors)}
                        <style>
                         table{
                            border-collapse: collapse;
                         }
                         td{
                            border: 1px solid black;
                         }
                         </style>
                         <form action = '/author/update_process' method="post">
                         <input type ='hidden' name ='id' value="${queryData.id}">
                         <p><input type="text" name="title" placeholder="title" value="${author[0].name}"></p>
                         <p><textarea name="description" placeholder="description">${author[0].profile}</textarea></p>
                         <p><input type="submit" value="저자 목록 수정"></p>
                         </form>
                        `,
                    ``
                );
                response.writeHead(200);
                response.end(HTML);
            })
        })
    })
}
```

---

## 4. 저자 수정 기능 구현 (수정한 value 적용, 받아오기)

**author.js**

```jsx
exports.process_update = function(request,response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(error){
        if (error) throw error;
        var post = qs.parse(body);
        db.query('UPDATE author SET name=?, profile=? WHERE author.id=?',
            [post.title, post.description, post.id],
            function(error,result){
                response.writeHead(302, {Location: `/author`});
                response.end();
            })
    }
    );
}
```

---

## 5. 저자 삭제 기능 구현

`삭제는 무조건 form의 post 방식으로 처리해야 한다`

- author table에서 삭제를 하였을 때, author Table에서 삭제 되는 기능
- 또한, 해당 author 가 작성하였던 글도 topic List에서 삭제 되는 기능

**main.js**

```jsx
else if (pathname ==="/author/delete_process"){
        author.process_delete(request,response,queryData);
    }
```

**template.js**

```jsx
authorTable(authors){
    var tag = `<table>`;
    var i=0;
    while (i<authors.length){
      tag = tag+
          `<tr>
          <td>${authors[i].name}</td>
          <td>${authors[i].profile}</td>
          <td><a href="/author/update?id=${authors[i].id}">update</a></td>
          <td>
					<!-- 삭제 기능 구현--> 
          <form action="/author/delete_process" method="post">
          <input type="hidden" name ='id' value="${authors[i].id}">
          <input type = 'submit' value="delete"> 
          </form> 
          </td>
          </tr>`
      i++;
    }
    tag += `</table>`;
    return tag;
  }
```

**author.js**

```jsx
exports.process_delete = function(request, response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        db.query(`DELETE FROM topic WHERE author_id=?`, [post.id], function (error){
            db.query(`DELETE FROM author WHERE author.id=?`,[post.id],function(error, result){
                if (error) throw error;
                response.writeHead(302,{Location :'/author'});
                response.end();
            })
        })
    });
}
```