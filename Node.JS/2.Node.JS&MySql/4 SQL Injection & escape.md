# 4. SQL Injection & escaping

## Injection (입력에 관한 보안)

→ URL에 쿼리문을 끼워 맞춰서 공격하는 기법 

- database 와 Node.js 를 합성해서 사용했을 때 발생 할 수 있는 보안적 Issue
- 외부로부터 들어오는 데이터(오염)에 대해서 항상 대비를 해야 한다.
- 보안의 중요성에 대해서 공감하는 것이 목적

```sql
SELECT * FROM topic; DROP TABLE topic; 
```

**→ 한 줄에 topic 테이블을 출력하고 topic 테이블을 삭제하는 위험한 명령어** 

```jsx
exports.description= function(request, response,queryData){
    db.query(`select * from topic`, function(error, topics){ // 리스트를 만들기 위해
        if (error) throw error;
        var query = db.query(`select * from topic left join author on author.id = topic.author_id where topic.id=?`,[queryData.id],function(error2, topic){
            if(error2) throw error2;
            var title = topic[0].title; // topic[0]은 현재 배열 위치를 가르킨다.
            var description = topic[0].description;
            var list = template.list(topics); // 리스트 띄우기 위한 topics
            var HTML = template.HTML(title, list,
                `<h2>${title}</h2>
                               ${description}
                                <p>by ${topic[0].name}</p>`,
                `
                        <a href="/create">create</a>
                        <a href="/update?id=${queryData.id}">update</a> 
                        <form action="delete_process" method="post">
                        <input type="hidden" name="id" value="${queryData.id}">
                        <input type="submit" value="delete">
                        </form>`
            );
            console.log(query);
            response.writeHead(200);
            response.end(HTML);
        })
    })
}
```

→ query 변수 객체 형태로 엄청나게 많은 양의 데이터가 들어온다. 

그 중 query.sql 은 적용된 쿼리문의 정보를 가지고 있다. 

`sql: "select * from topic left join author on [author.id](http://author.id/) = topic.author_id where topic.id='5'"`

시스템을 공격하려는 해커들 : 파라미터에 관심이 많다. 

만약, URL의 파라미터 뒤에 [`http://localhost:3000/?id=3;DROP TABLE topic;`](http://localhost:3000/?id=3;DROP%20TABLE%20topic;) 이라고 입력하면 

![Untitled](https://user-images.githubusercontent.com/63600953/109412069-49f3fe00-79e9-11eb-8477-8d4a798b3a17.png)

별개의 DELETE문이 아닌 topic.id의 문자로 들어감 ⇒ 해커 의도대로 실행 X (공격 실패) 

**Why?** 

```jsx
db.query(`select * from topic left join author on author.id = topic.author_id where topic.id=?`,[queryData.id],function(error2, topic){}
```

: 우리는 query 문에 바로 queryData의 id를 입력하지 않고 ?로 입력 한 후, 두 번째 인자로 queryData를 입력하여 치환 하게 끔 설정하였다. 이는 Injection 공격에 대하여 자동으로 대비 할 수 있게 해준다.  

**두 번째 인자X (치환X) , 동일한 기능 : `escape`** 

```jsx
db.query(`select * from topic left join author on author.id = topic.author_id where topic.id=${db.escape(queryData.id)`,function(error2, topic){}
```

결과 : `select * from topic left join author on [author.id](http://author.id/) = topic.author_id where topic.id='5;DELETE FROM topic;'`

> **Injection 대비 방법 , 기능 동일**

- 1. ?, 두번째 인자 치환
- 2. db.escape()

**IF, 두 번째 인자로 [queryData.id](http://querydata.id)를 주지 않고 바로 입력 하게 되면?** 

```jsx
db.query(`select * from topic left join author on author.id = topic.author_id where topic.id=queryData.id`,function(error2, topic){}
```

결과: `'select * from topic left join author on [author.id](http://author.id/)= topic.author_id where topic.id=3;DELETE TABLE topic;'` 

⇒ 'ER_PARSE_ERROR' 가 발생하여, DROP TABLE topic 명령어가 먹히지 않는다. 

**WHY?**

**db.js**

```jsx
//DB 관련 모듈
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password : '*************',
    database : 'opentutorials',
    multipleStatements: true // 여러개의 쿼리문을 허용하는 명령어
});
db.connect();

module.exports = db;
```

- `multipleStatements` : true 로 설정되어 있지 않고 기본값은 false이기 때문에 자동적으로 쿼리문 하나만 허용해줬다.
- 하지만, `multipleStatements` 를 true로 설정 하는 순간 여러 개의 쿼리문을 허용함으로 SQL Injection 에 대비가 되지 못하고 DROP TABLE topic의 명령어도 먹히게 된다.

> 특별한 이유가 아니면 `multipleStatements` 를 설정하지 않으면 된다!

---

## escaping (출력에 관한 보안)

**문제점**

```jsx
<script> 
alert('속았지?');
</script> 
```

: 사용자가 입력 창에 위와 같은 내용을 입력 했을 때, 아래의 사진과 같이 출력에 대한 제약 없이 그대로 출력하게 된다.  

![Untitled 1](https://user-images.githubusercontent.com/63600953/109412091-5c6e3780-79e9-11eb-83a1-b6ee46e69c25.png)

 따라서, 이를 방지하기 위해서 `sanitize-html` 을 실시한다. 

**topic, author, template의 모든 데이터가 나오는 create, update에 대해서 모두 sanitize-html을 실행**