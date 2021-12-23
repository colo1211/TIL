# 2. My SQL join & 게시판

## Join 을 활용하여 글 상세 보기 구현

![Untitled](https://user-images.githubusercontent.com/63600953/109377690-522c3a80-7910-11eb-862a-e9bed615041c.png)

- **내용 부분에 by '저자명'을 추가 할 것이다.**
- opentutorials DB 내의 author 테이블과 topic 테이블을 Join 하여 정보를 나타낸다.

### -topic 테이블

![Untitled 1](https://user-images.githubusercontent.com/63600953/109377698-5c4e3900-7910-11eb-94b8-0ab7424a2b19.png)

### -author 테이블

![Untitled 2](https://user-images.githubusercontent.com/63600953/109377702-640ddd80-7910-11eb-8a3f-c08f96095a40.png)

⇒ 두 개의 테이블을 Join 하여 author 명을 상세 페이지에 띄운다. 

- **JOIN 구문**

```sql
SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=queryData.id;
```
![Untitled 3](https://user-images.githubusercontent.com/63600953/109377723-70923600-7910-11eb-9e3f-6b73333cde8d.png)

이를 기존의 코드에 추가하면 topic에는 다음과 같은 정보가 담긴다. 

![Untitled 4](https://user-images.githubusercontent.com/63600953/109377728-7b4ccb00-7910-11eb-9071-63f1c55bd07b.png)

→ 이를 활용하여 name을 화면에 띄운다. 

```sql
else {
          db.query(`select * from topic`, function(error, topics){ // 리스트를 만들기 위해
              if (error) throw error;
              db.query(`select * from topic left join author on topic.author_id=author.id where topic.id=?`,[queryData.id],function(error2, topic){ // 사용자의 입력에 대비하기 위한 코드: ? 이후 제대로된 값을 준다.
                  if(error2) throw error2;
                  var title = topic[0].title; // topic[0]은 현재 배열 위치를 가르킨다.
                  var description = topic[0].description;
                  var list = template.list(topics); // 리스트 띄우기 위한 topics
                  var HTML = template.HTML(title, list,
                      `<h2>${title}</h2>
                                ${description}
                                <p>by ${topic[0].name}</p>    
                        `,
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
      }
```

---

## MySQL JOIN - 글 생성 구현 (Create)

select Box 참고 : [https://developer.mozilla.org/ko/docs/Web/HTML/Element/select](https://developer.mozilla.org/ko/docs/Web/HTML/Element/select)

![Untitled 5](https://user-images.githubusercontent.com/63600953/109377730-830c6f80-7910-11eb-8437-fe500c497874.png)

**Create 를 클릭 했을 때, 저자 명이 들어 가 있는 Select Box**

```jsx
else if(pathname === '/create'){
        db.query(`select * from topic`, function(error, topics){
            db.query(`SELECT * from author`, function(error, authors){
                // authors 에는 저자 목록이 저장된다.

                var title = 'Create';
                var list = template.list(topics);
                var HTML = template.HTML(title, list,
                    `<form action="process_create" method="post">
                       <p><input type="text" name="title" placeholder="title"></p>
                       <p><textarea name = "description" placeholder="contents"></textarea></p>    
                      
											// 아래의 부분을 프로그래밍 적으로 구현 할 것이다. 
											<!-- <p>
                       <select name = 'author'> 
                       <option value="1">egoing</option>
                       <option value="2">duru</option>
                       <option value="3">taeho</option>
                       </select>
                        </p> -->          
                      
											 <p><input type="submit"></p>
                        </form>`,
                    ``);
                response.writeHead(200);
                response.end(HTML);
            })
        })
    }
```

**변경 1 (template Module X)** 

```jsx
 else if(pathname === '/create'){
        db.query(`select * from topic`, function(error, topics){
            db.query(`SELECT * from author`, function(error, authors){
                // 변경 한 부분 1
                var tag = ``;
                var i =0;
                while(i< authors.length){
                    tag = tag + `<option value='${authors[i].id}'>${authors[i].name}</option>`
                    i++;
                }
								
                var title = 'Create';
                var list = template.list(topics);
                var HTML = template.HTML(title, list,
                    `<form action="process_create" method="post">
                       <p><input type="text" name="title" placeholder="title"></p>
                       <p><textarea name = "description" placeholder="contents"></textarea></p>    
                       <p>
                       <select name = 'author'> 
				                // 변경한 부분 2 
								       ${tag}
								       </select>
                        </p>                    
                       <p><input type="submit"></p>
                        </form>`,
                    ``);
                response.writeHead(200);
                response.end(HTML);
            })
        })
    }
```

> **select 에 붙은 name='a' 은 post에서 받을 때 객체 속성 a로 들어간다.**

**변경 2 (template Module O)** 

- **template.js**

```jsx
authorSelect(authors){
    var tag = ``;
    var i =0;
    while(i< authors.length){
      tag = tag + `<option value='${authors[i].id}'>${authors[i].name}</option>`
      i++;
    }
    return `<select name='author'>${tag}</select>`;
  }
```

**→ 함수 호출하면 끝**

- **전달 받는 부분 → 기존에 1로만 고정해놨던 author_id를 [post.author](http://post.author) 로 전달해준다.**

```jsx
db.query(`insert into topic(title, description, created, author_id) values(?,?, NOW(),?)`,
								[title,description,post.author], 
                function (error, result){});
```

  ****

---

## MySQL JOIN - 글 수정 구현 (Update)

![Untitled 6](https://user-images.githubusercontent.com/63600953/109377735-8d2e6e00-7910-11eb-8f08-86def104f3ab.png)

![Untitled 7](https://user-images.githubusercontent.com/63600953/109377739-9586a900-7910-11eb-9c74-dbfc192e74c3.png)


1. Update 버튼을 눌렀을 때, author 명이 이전에 저장되어 있던 저자 명에 있어야 한다. 
2. 변경을 누르고 제출 하였을 때, 업데이트 된 내용이 반영되어야 한다. 

**참고**

> **<option> 태그 내에는 속성으로 selected 를 지원해서 선택되었던 값을 알수 있게 해준다.**

- authorSelect 함수 : argument로 topic[0].author_id를 보내준다.

```jsx
else if(pathname === '/update'){
        db.query(`select * from topic`, function(error, topics){
            if(error) throw error;
            db.query(`select * from topic where id=?`,[queryData.id], function (error2, topic){
                if (error2) throw error2;
                db.query(`select * from author`, function(error, authors){
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
                    ${template.authorSelect(authors,topic[0].author_id)}
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
        })
    } else if(pathname === '/update_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(error){
            if (error) throw error;
            var post = qs.parse(body);
            db.query('UPDATE topic SET title=?, description=?, author_id=? WHERE id=?',[post.title,post.description,post.author,post.id],
                function(error,result){
                response.writeHead(302, {Location: `/?id=${post.id}`});
                response.end();
            })
        });
    }
```

- **authorSelect 함수**

→ 전달 받은 인자와 author배열에 같은 내용이 있다면 select 속성을 추가하여 화면 상에 출력

```jsx
authorSelect(authors,author_id){
    var tag = ``;
    var i =0;
    while(i< authors.length){
      var selected = ``;
      if (authors[i].id === author_id){
        selected='selected';
      }
      tag = tag + `<option value='${authors[i].id}' ${selected}>${authors[i].name}</option>`
      i++;
    }
    return `<select name='author'>${tag}</select>`;
  }
```