# 5일차 (객체~API, Create Server)

---

## 데이터와 처리방법을 담는 그릇으로서 객체

 

객체(Object) : 지저분하게 널려있는 **값을 체계화** 시키는 도구

→ 코드의 복잡성 제거 및 가독성, 유지 보수 쉬워짐 

→ 자바스크립트에서 함수도 값이기 때문에 객체에 담을 수 있다. 

```jsx
  var o ={
    v1:'v1',
    v2:'v2',
		//구버전 
    f1: function(){
        console.log(this.v1); // 함수가 객체 안에서 시행될때, 자신이 속한 객체를 참조할 수 있는 this를 약속된 키워드로 생성했다.
        // console.log(o.v1);
    },
		//신버전 
    f2(){
        console.log(this.v2);
        // console.log(o.v2);
    }
};
o.f1();
o.f2();
```

만약 다른 협업자가 객체의 이름을 o에서 v로 변경한다고 하면, 아래의 함수들은 정상적으로 작동되지 않는다 ⇒ this의 탄생 배경  

**this**

: 함수가 객체 안에서 시행될 때, 자신이 속한 객체를 참조할 수 있는 **this** 약속된 키워드 생성

---

## 템플릿 기능 정리정돈 (Refactoring)

→ 지금까지 만든 코드를 객체를 활용해서 **'리팩토링'**

- **리팩토링** : 기능은 똑같지만 배열, 객체, 함수를 통해서 코드를 더욱 가독성있고 효율적으로 작성하는 작업

- **기존 함수**

```jsx
function templateTxt(title, list, body,control){ // 화면에 출력할 template을 만들어 주는 함수
    return `
        <!doctype html>
        <html>
        <head>
        <title>WEB - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">Hello WEB World</a></h1>
        ${list}    
<!--        <a href="/create">create</a> <a href = '/update'>update</a>-->
        ${control}
        ${body}
        </body>
        </html>
     `;
}
function listMaker(fileName){ // 파일 리스트를 만들어 주는 함수
    var list= `<ul>`;
    var i =0;
    while(i<fileName.length){
        list = list+`<li><a href="/?id=${fileName[i]}">${fileName[i]}</a></li>`;
        i=i+1;
    }
    list = list+'</ul>';
    return list;
}
```

- **리팩토링 (Using By 객체)**

→ 객체로 함수를 가독성 있게 작성 

```jsx
var o= {
    templateTxt (title, list, body,control){ // 화면에 출력할 template을 만들어 주는 함수
    return `
        <!doctype html>
        <html>
        <head>
        <title>WEB - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">Hello WEB World</a></h1>
        ${list}    
<!--        <a href="/create">create</a> <a href = '/update'>update</a>-->
        ${control}
        ${body}
        </body>
        </html>
     `;
},
    listMaker(fileName){ // 파일 리스트를 만들어 주는 함수
    var list= `<ul>`;
    var i =0;
    while(i<fileName.length){
        list = list+`<li><a href="/?id=${fileName[i]}">${fileName[i]}</a></li>`;
        i=i+1;
    }
    list = list+'</ul>';
    return list;
    }
}
```

---

## 모듈 형식

- 객체로 여러가지 값을 담아서 Refactoring을 진행하면, 객체도 많아지기 때문에 이 자체로 복잡해 질 수 있다.
- **이러한 문제를 해결하는 도구로 Module 이 존재**

**모듈 던지기 (module.exports)       파일명: mpart.js**  

```jsx
var M = {
    v:'v',
    f: function (){
        console.log(this.v);
    }
}

module.exports=M; // Module 바깥에서 사용 가능하도록 export하겠다. module.exports
```

**모듈 받기 require(export 한 파일의 경로)     파일명: muse.js**

```jsx
var part = require(`./mpart.js`); // 사용할 모듈의 경로 저장
part.f(); 
```

---

## 모듈 활용 (lib.js → main.js)

- **lib.js 에서 export**

```jsx
module.exports= {
    templateTxt(title, list, body, control) { // 화면에 출력할 template을 만들어 주는 함수
        return `
        <!doctype html>
        <html>
        <head>
        <title>WEB - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">Hello WEB World</a></h1>
        ${list}    
<!--        <a href="/create">create</a> <a href = '/update'>update</a>-->
        ${control}
        ${body}
        </body>
        </html>
     `;
    },
    listMaker(fileName) { // 파일 리스트를 만들어 주는 함수
        var list = `<ul>`;
        var i = 0;
        while (i < fileName.length) {
            list = list + `<li><a href="/?id=${fileName[i]}">${fileName[i]}</a></li>`;
            i = i + 1;
        }
        list = list + '</ul>';
        return list;
    }
};
```

- **main.js 에서 받기**

```jsx
var o= require('./lib');
```

---

## 입력 정보에 대한 보안 (path)

동일한 디렉토리에 저장한 **security.js**

```jsx
var myid={
    id:'egoing',
    password: '12345'
};
// 보안을 강화하기 위한 연습
```

→ 서버를 구동하고 [**http://localhost:3000/?id=../security.js**](http://localhost:3000/?id=../security.js)를 입력하면 

상위 디렉토리의 파일의 내용을 조회가 가능하다. 

악용 가능성 높음



### path 모듈 활용

```jsx
var path = require('path');
path.parse('../security.js');
//{
//  root: '',
//  dir: '..',
//  base: 'security.js',
//  ext: '.js',
//  name: 'security'
//}
```

→ **path.parse(경로) 입력하면 객체 형식으로 반환** 

→ 상위 디렉토리의 접근 형식인 ..을 커트 가능 

→ name 활용하면 상위 디렉토리의 접근을 방지 가능  ****

fs.readFile() 를 수정

```jsx
var filterId = path.parse(queryData.id).base; // security.js로 들어 간다. 
fs.readFile(`./data/${filterId}`,'utf8',function(error,description){};
```

따라서, 상위 폴더로의 이동을 막아준다. 

---

## 출력 정보에 대한 보안 (sanitize-살균)

- 상황

: 사용자가 게시판의 제목 혹은 내용을 악성 코드를 심는다. 


→ 내용 상에 <script> 태그를 심어서 JS를 조작

→ 악성 URL 로 이동하게 끔 하는 내용을 등록

- 대처

**: HTML 태그를 살균(sanitize)해준다. → 태그들만 삭제해주는 역할** 

---

**sanitize-html 설치(**[https://www.npmjs.com/package/sanitize-html](https://www.npmjs.com/package/sanitize-html)**)**

```bash
npm init 
```

→ package.json이 딸려온다. 

```bash
npm install -S sanitize-html 
```

→ -S (현재 시스템에만 적용) -g(global, 전체 시스템에 적용)  

---

**sanitize-html 적용**

출력 되는 곳 → create,update의 title과 description을 sanitize 한다. 

 

```jsx
var sanitizeHTML = require('sanitize-html');
// 여러 코드

// 생성 create
request.on('end',function (){ //
           var post = qs.parse(body);
           var sanitizeTitle = sanitizeHTML(post.title);
           var sanitizeDescription = sanitizeHTML(post.description);

           fs.writeFile(`data/${sanitizeTitle}`,sanitizeDescription,'utf8',function (error){
               response.writeHead(302,{Location: `/?id=${sanitizeTitle}`});
               response.end();
           })
       });

// 수정 update 
request.on('end',function (){ //
            var post = qs.parse(body);
            var id = post.id;
            var sanitizeTitle = sanitizeHTML(post.title);
            var sanitizeDescription = sanitizeHTML(post.description);
            //제목을 바꾸는 코드
            fs.rename(`data/${id}`,`data/${sanitizeTitle}`,function (error){
                // 내용을 바꾸는 코드
                fs.writeFile(`data/${sanitizeTitle}`,sanitizeDescription,'utf8',function (error){
                    response.writeHead(302,{Location: `/?id=${sanitizeTitle}`});
                    response.end();
                })
            })
        });
```

---