# 3일차 (함수~POST 방식)

---

## Function

: 중복을 제거하기 위한 도구 

```jsx
f123();
console.log('A');
console.log('B');
console.log('Z');
f123();
console.log('WD');
console.log('dwq');
console.log('dqw');
f123();

//아래에 선언해도 Hoisting 되어 위로 올라간다.
function f123(){
    console.log(1);
    console.log(2);
    console.log(3);
    console.log(4);

}
```

### 함수의 입출력

: 입력에 따라서 다르게 동작 

```jsx
// Math.round(a) : a(입력값) 를 반올림 해주는 Math 객체 내의 메소드
console.log(Math.round(2.5));
// 출력하려면 console.log( )를 붙여야 한다.

function sum (a,b){ // a,b는 parameter
    return (a+b);
}
// sum =(a,b)=>a+b; // 위의 함수 선언식을 화살표 함수로 변형 가능
console.log(sum(1,4));// a,b는 argument
```

- 함수 내에 console.log를 하면 오로지 출력만 가능하다
- return 을 하게 되면 변수에 담을 수 있고 다양한 활용이 가능하다.

---

## 함수를 이용해서 App Refactoring

- **전체 코드를 살펴보면 완전히 중복되는 부분이 존재**
1. 파일의 리스트를 출력하는 부분이 완전히 동일하다. → listMaker 함수 생성  
2. template 를 만들어 내는 부분이 완전히 동일하다.  → templateMaker 함수 생성 

- **기존 코드 (수정 전)**

```jsx
var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryString = url.parse(_url,true).query;
    var pathname = url.parse(_url,true).pathname;

    // query는 객체 형식으로 어떤 queryString 이 입력 되었는지 파악하기 위한 API
    // pathname : /으로 들어온다.
    // path : /?id=HTML 형식으로 들어온다.

    if (pathname==='/'){
        if (queryString.id===undefined){ // main 페이지
            var title= 'Welcome';
            var description = 'Hello Node';
            fs.readdir('./data',function(error, fileName){
/* listMaker 함수 
                var list = `<ul>`;
                var i=0;
                while(i<fileName.length){
                    list = list + `<li><a href="/?id=${fileName[i]}">${fileName[i]}</a></li>`;
                    i++;
                }
                list = list+`</ul>`;
*/
/* templateMaker 함수 
                var template = `
               <!doctype html>
                <html>
                <head>
                  <title>${title}</title>
                  <meta charset="utf-8">
                </head>
                <body>
                  <h1><a href="/">WEB</a></h1>
                  ${list}  
                  <h2>${title}</h2>
                  <p>${description}</p>
                </body>
                </html>
            `;
*/
                response.writeHead(200);
                response.end(template);
            })
        }else { // main 페이지가 아닌 다른 페이지
            var title = queryString.id;

            // 실수한 부분 - readFile에서 파일위치만 명시하고 파일 명을 빼먹음
            fs.readFile(`./data/${queryString.id}`,'utf8',function (error, description){
                fs.readdir(`./data`,function (error,fileName){
                    if (!fileName.includes(queryString.id)) {
                        response.writeHead(404);
                        response.end(`Not Found`);
                    }
                    else {
/* listMaker 함수   
                      var list = `<ul>`;
                        var i = 0;
                        while (i < fileName.length) {
                            list = list + `<li><a href="/?id=${fileName[i]}">${fileName[i]}</a></li>`;
                            i++;
                        }
                        list = list + `</ul>`;
*/
/*templateMaker 함수 
                        var template =
                            `<!doctype html>
                        <html>
                        <head>
                            <title>${title}</title>
                            <meta charset="utf-8">
                        </head>
                        <body>
                        <h1><a href="/">WEB</a></h1>
                        ${list}
                        <h2>${title}</h2>
                        <p>${description}</p>
                        </body>
                        </html>`;
*/ 
                        response.writeHead(200);
                        response.end(template)
                    }
                })

            });

            }
    }else{ // 아예 이상한 URL
        response.writeHead(404);
        response.end('Not Found');
    }
});
app.listen(3000);
```

**개선** 

1. **listMaker 함수** 

```jsx
function listMaker(fileName){
    var list = `<ul>`;
    var i = 0;
    while (i < fileName.length) {
        list = list + `<li><a href="/?id=${fileName[i]}">${fileName[i]}</a></li>`;
        i++;
    }
    list = list + `</ul>`;
    return list;
}
```

**2. templateMaker 함수** 

: 3번째 매개변수로 template를 넣어주려 했으나 앞으로 새로 들어올 파일의 내용이 기존과 다를 점을 고려하여 body로 묶어서 전달

argument 형태 : 

```jsx
function templateMaker(title, list, body){
    return `
    <!doctype html>
    <html>
    <head>
        <title>${title}</title>
        <meta charset="utf-8">
    </head>
    <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
    </body>
    </html>
    `
}
```

---

## Node.js에서 동기와 비동기

- 기본적으로 JS는 동기적으로 일을 처리한다.
- Synchronous : 동기 (순차적)
- Asynchronous : 비동기 (비 순차적) → 효율적 But, 까다로움

### **readFile(비동기적) vs readFileSync(동기적)**

- 비동기 : readFile (경로, 옵션, CallBack 함수)

```jsx
// readFile 비동기적 'ACB'
console.log('A');
fs.readFile(`./sample`,'utf-8',function (error, result){
    console.log(result);
});
console.log('C');
```

결과 : A C B

- 동기 : readFileSync(경로, 옵션)

```jsx
// readFileSync 동기적 'ABC'
console.log('A');
var result = fs.readFileSync(`./sample`,'utf-8');
console.log(result);
console.log('C');
```

결과 : A B C

### callback(콜백 함수)

- 자바스크립트에서는 **함수가 객체**
- 따라서, Argument로 함수를 전달 가능

```jsx
// 익명 함수 (Anonymous Function)
var a= function (){
    console.log('A');
}

function showfunc(callBack){
    callBack();
}

showfunc(a); // a(함수-객체)를 argument로 전달 
// 전제 : JS 에서 함수는 객체
// 1. a(함수)를 argument로 showfunc에 전달
// 2. callBack 함수를 실행
```

---

## 패키지 매니저 & PM2

- **NPM : Node Package Manager**
- NPM의 일종 → PM2 : 실행 중인 프로그램을 보조해주는 역할
- 코드를 수정하면 수정할 때 마다 서버를 껐다가 다시 켜야 해서 불편함을 초래

→ PM2를 사용하면 자동으로 변경된 사항을 페이지에 보여줌 

### pm2 터미널 명령어

---

**#1. PM2 설치** 

```bash
npm install pm2 -g
```

- -g : 내가 설치하는 프로그램은 독립된 소프트웨어라서 위치에 구애 받지 않고 사용 가능해야 한다. (**global→ 기억 연상**하자!)

---

**#2. PM2를 활용하여 서버 실행** 

```bash
pm2 start main.js
```

실행시킬 파일을 입력한다. 


실행되고 있는 파일 명, Online/Offline 상태, 메모리 사용량 등을 체크 할 수 있다. 

---

**#3. 실시간 모니터링** 

```bash
pm2 monite 
```

- 서버를 강제로 종료 시킨다고 해도 다시 살리는 모습을 관찰 할 수 있다.

---

**#4. 현재 구동중인 Process 리스트 확인** 

```bash
pm2 list
```

: 현재 구동 중인 Process 의 목록을 확인 할 수 있다.  

---

**#5. PM2를 활용하여 서버 종료**

- 작업관리자를 통해 종료하더라도 다시 살아난다.
- 반드시 stop 명령어를 통해서 종료해야 종료된다.  ****

```bash
pm2 stop main.js 
```


---

**#6. 실행 + 실시간 수정 반영** 

```bash
pm2 start main.js --watch 
```


- npm start 와는 다르게 실시간으로 코드가 수정 된 것을 반영해서 서버에 적용 시킴
- 코드 수정 이후 Ctrl + C (서버 구동 취소) 한 후에 다시 실행 할 필요 없어졌음

**#7. 구동 중 에러가 발생 확인** 

```bash
pm2 log 
```

---

## HTML - Form

- '지금까지는 data 폴더에 위치한 파일의 추가 및 삭제를 통해서 관리자만 웹페이지에 추가 및 삭제를 할 수 있었다. ' → **한계**
- 컨텐츠를 관리자 뿐 아니라 사용자가 웹을 통해서 **추가, 수정, 조회, 삭제(CRUD)** 하는 방법을 알아본다.

⇒ 사용자가 서버 쪽으로 데이터를 전송하기 위한 HTML Form 을 살펴본다.

(사용자로부터 정보를 입력 받는 방법)  

```html
<form action="http://localhost:3000/process_create" method="post">
<p><input type="text" name="title" placeholder="title"></p>
<p><textarea name = "description" placeholder="contents"></textarea></p>
<p><input type="submit"></p>
</form>
```

**<form action = '전송 주소', method = '전송 방식(get, post)'>**

- 전송하고자 하는 데이터를 어디로 보낼 것인지? 입력한 정보를[http://localhost:3000/process_create에](http://localhost:3000/process_create%EC%97%90) 전송

**method** 

- method = 'get' (입력 안 했을 때, 기본 값)

: 제출 버튼 눌렀을 때, [http://localhost:3000/process_create?title=입력내용&description=입력내용](http://localhost:3000/process_create?title=%EC%9E%85%EB%A0%A5%EB%82%B4%EC%9A%A9&description=%EC%9E%85%EB%A0%A5%EB%82%B4%EC%9A%A9) 으로 form태그의 action 속성이 가르키는 곳으로 QueryString을 전송

⇒ But! 주소에 데이터가 포함되어 있다면 데이터를 생성, 삭제, 수정할 때 곤란해진다. 


- method = 'post'

: **생성, 수정, 삭제**를 하기 위해서는 form 태그에 method를 post로 설정한다. 

⇒ URL에 보이지 않도록 은밀하게 데이터를 전송해준다. 


> **get 방식: 서버로부터 데이터를 가져올 때, post 방식: 생성,수정,삭제 할 때**

---

## 글 생성 UI 만들기

**변경 사항** 

- templateTxt함수

: create 버튼을 눌렀을 때,  /create URL로 넘어가게 끔 만들어준다. 

```jsx
function templateTxt(title, list, body){ // 화면에 출력할 template을 만들어 주는 함수
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
        **<a href="/create">create</a> <!-- /create 로 넘어가게 해준다. -->** 
        ${body}
        </body>
        </html>
     `;
}
```

- /create 로 넘어갔을 때 아래에 form 태그가 뜨도록 설계한다.

→ 리스트는 그대로, 아래의 form 태그를 변경해준다. 


```jsx
else if(pathname === '/create'){ // create를 클릭 했을 때
        fs.readdir('./data',function(error,fileName){
            var title = 'Web - create';
            var list = listMaker(fileName);
            // 목록은 그대로 남겨두고 아래의 생성창만 생성한다.
            var template=templateTxt(title,list,`
                        <form action="http://localhost:3000/create_process" method="post">
                        <p><input type="text" name="title" placeholder="title"></p>
                         <p>
                         <textarea name = "description" placeholder="description"></textarea>
                        </p>
                        <p><input type="submit"></p>
                        </form>
            `);
            response.writeHead(200); // 성공적으로 로딩
            response.end(template); // 어떤 코드를 넣느냐에 따라서, 사용자에게 전송하는 데이터가 바뀐다.
        })
    }
```

→ 글을 입력하고 제출을 클릭하면 [localhost:3000/create_process](http://localhost:3000/create_progress)로 넘어간다. 


- 이제 else if (pathname === 'create_process') 일 때의 처리를 해주면 된다.

---

## POST 방식으로 전송된 데이터를 받기

- 사용자 → 전송 (Post 방식으로 create)

⇒ POST 방식으로 전송 된 데이터를 가져오기 위해서 Node.js 에서 어떻게 처리하는가?


```jsx
var qs = request('querystring'); // querystring 모듈 불러오기(최상단) 
// create에서 받아서 넘어온 URL에서의 처리
    else if (pathname === '/create_process'){
       var body = '';
       request.on('data',function (data){ // 사용자가 요청한 정보이기 때문에 request
           body = body + data; // 데이터 수신에 성공할 때마다 콜백 함수를 통해서 조각조각형태로 data 인자를 통해서 받아온다.
           console.log(`end 이전 body: ${body}`); // end 이전 body: title=hi&description=Node
       });

       // 데이터 전송이 모두 완료되면 end 콜백 함수 실행!
       request.on('end',function (){ //
           var post = qs.parse(body);
           var title = post.title;
           var description = post.description;
           console.log(post); //{ title: 'hi', description: 'Node' }
       });

        response.writeHead(200); // 로딩 실패
        response.end('Success'); // 어떤 코드를 넣느냐에 따라서, 사용자에게 전송하는 데이터가 바뀐다.
    }
```

- request.on ('data', function (data){}) : 성공할 때마다 데이터를 받아온다.
- request.on ('end', function () {}) : 데이터 수신이 끝나면 parse를 통해서 객체화 시킨다.

**정리** 

request.on('data') 메소드를 사용하여 POST 데이터가 들어오면 chunk를 사용하여 데이터를 body 변수에 저장.

더 이상 데이터가 들어오지 않는다면 end 이벤트가 실행, 그래서 request.on('end') 가 실행

그 후 데이터를 console에 뿌려주고, response에 보낸다. response에 보낸다는 것은 HTML화면을 보여준다는 의미