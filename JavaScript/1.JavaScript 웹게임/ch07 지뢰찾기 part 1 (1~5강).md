# 지뢰찾기 part 1 (1~5강)

## placeholder (in HTML)

- 입력창 내에 회색 글씨로 어떤 것을 입력해야 할지 알려주는 것을 띄우고 싶을 때,

input 태그 내에 placeholder의 속성을 지정해주면 된다. 

```html
<input id = 'hor' type="number" placeholder="가로">
<input id = 'ver' type="number" placeholder="세로">
<input id = 'mine' type="number" placeholder="지뢰">
<button id="btn">실행</button>
```

- 유저가 값을 입력하고 실행을 눌렀을 때, 값이 나오게 하기 위해서 **이벤트 리스너**를 추가

```jsx
document.querySelector('#btn').addEventListener('click',function (){
    var 가로 = **parseInt**(document.querySelector('#hor').value);
    var 세로 = **parseInt**(document.querySelector('#ver').value);
    var 지뢰 = **parseInt**(document.querySelector('#mine').value);
    console.log(가로,세로,지뢰);
})
```

1. 버튼을 눌렀을 때, 값이 제출 되기 위해서 이벤트 리스너를 추가 
2. input창에 입력된 값은 .textContent가 아닌, .value 
3. 사용자가 숫자로 입력하였다 해도 들어오는 값은 문자(열)로 들어오기 때문에 parseInt( ) 을 통해서 (문자열 → 숫자) 로 변환해준다. 

> 참고 : 크롬 브라우저에서는 숫자일 때 파란색, 문자열 일 때 " 빨강색 " 출력


## 화면과 데이터를 일치시키는 작업(중요)

```jsx
var dataset = []; // 데이터 셋
    var tbody = document.querySelector('#table tbody');

   for (var i = 0; i< 세로 ; i++){
       var tr = document.createElement('tr');
       var arr = [];
       dataset.push(arr);
       for (var j =0; j<가로;j++){
           arr.push(1);
           var td = document.createElement('td');
           tr.appendChild(td);
       }
       tbody.appendChild(tr);
   }
   console.log(dataset);
```

dataset은 데이터를 관리하기 위한 2차원 배열, 

tbody에 담을 테이블은 화면 상에 띄울 테이블

```html
<style>
        td {
            **border :1px solid black; <!-- 경계선 생성-->** 
            width: 20px;
            height: 20px;
        }
    </style>
```

---

**(CSS 부연 설명)** 

[Tryit Editor v3.6](https://www.w3schools.com/css/tryit.asp?filename=trycss_table_border)

### 표 테두리 생성

 border : 1px solid black; 

→ border (경계선) 

```html
<style>
table, th, td {
  border: 1px solid black;
}
</style>
```

### 표 경계선 설정

 border-collapse : collapse 

collapse (경계선 합침) , seperate (경계선 분리) 

```html
table {
            border-collapse: collapse;
        }
```

border-collapse: seperate

테이블 간 경계선 

분리(seperate)

border-collapse: collapse

합침(collapse) 

---

## 지뢰 심기

→ 입력 받은 지뢰의 개수만큼 테이블에 지뢰를 표시해준다. 

- 랜덤한 규칙으로 '입력 받은 지뢰의 개수' 만큼 배열을 생성한다.
- 이 때, 배열 내에는 무작위 숫자로 가득 찬다 (지뢰를 표시할 위치)

→ 지뢰가 20개라고 가정하고 작성

```jsx
var 후보군 = Array(가로*세로).fill().map(function (element,index){
        return index;
    }) // 0부터 99까지

    var 지뢰위치= []; // 지뢰의 위치 랜덤 추출
    while(후보군.length>80){
        지뢰위치.push(후보군.splice(Math.floor(Math.random()*후보군.length),1)[0]);
    }
    console.log('지뢰위치',지뢰위치);
```

 

```jsx
for (var x=0;x<지뢰위치.length;x++){ // 0부터 20까지 ex) 60
       var 지뢰_세로 = Math.floor(지뢰위치[x]/10) ; // ex) 세로:6
       var 지뢰_가로 = (지뢰위치[x]%10); // ex) 가로:0
       console.log('지뢰세로:',지뢰_세로,' 지뢰가로:',지뢰_가로);
       tbody.children[지뢰_세로].children[지뢰_가로].textContent='X'; // 화면
       dataset[지뢰_세로][지뢰_가로]='X'; // 데이터
   }
```

- 지뢰_세로 , 지뢰_가로 는 배열의 숫자를 계산해서 위치를 지정한다.
- ex ) 68 → (6,8) 위치에 지뢰를 심는다.
- 계산법 : 10의 자리 수 추출, 1의 자리 수 추출
- children으로 자식 태그들에게 접근 (childNode와 다름)


화면

dataset

→ **둘(화면, 데이터 셋)을 일치 시키는 작업이 매우 중요**하다. 

---

## 우클릭으로 깃발 꼽기

참고! call 함수에 대한 설명 : [https://velog.io/@johnque/Function.prototype.call](https://velog.io/@johnque/Function.prototype.call)

- **우클릭 (contextmenu)**
1. 깃발 → 지뢰가 있다고 확신 
2. 물음표 → 지뢰가 50% 있다고 생각할 때

- **유사배열(NodeList) → 배열화 : Array.prototype(유사배열)**

**이벤트 리스너 내부에 위치 (우클릭을 했을 때, 깃발을 생성하는 방법, 현재는 물음표로 대체)** 

```jsx
for (var i = 0; i< 세로 ; i++){
       var tr = document.createElement('tr');
       var arr = [];
       dataset.push(arr);
       for (var j =0; j<가로;j++){
           arr.push(1);
           var td = document.createElement('td');
           **td.addEventListener('contextmenu',function (이벤트){ // 모든 td에 우클릭을 했을 때, contextmenu**
               console.log (이벤트.currentTarget); // 우클릭을 한 좌표
               var 부모tr = 이벤트.currentTarget.parentNode; // tr, 클릭된 td가 속한 tr
               var 부모tbody = 이벤트.currentTarget.parentNode.parentNode; // table, 클릭된 td가 속한 table
               var 줄 = Array.prototype.indexOf.call(부모tbody.children, 이벤트.currentTarget.parentNode); // 화면상 클릭한 곳의 인덱스를 야매로 인덱스로 알아내는 방법
               console.log('객체:',부모tbody.children,'인수:', 이벤트.currentTarget.parentNode);
               var 칸 = Array.prototype.indexOf.call(부모tr.children, 이벤트.currentTarget);
               console.log (이벤트.currentTarget,부모tr,부모tbody);
               console.log('줄:',줄,'칸:',칸);
               이벤트.currentTarget.textContent= '!';
               dataset[줄][칸]='!';
           })
           tr.appendChild(td);
       }
       tbody.appendChild(tr);
   }
```

- target와 currentTarget의 역할은 비슷하지만 currentTarget을 쓰는 것을 추천
- 눌렀을 때 → 몇 번째 줄? 몇 번째 칸?을 확인하는 것이 목표

- 현재 클릭된 줄과 칸을 알아내는 것이 목적인데,

```jsx
// #1. 
var 줄 = Array.prototype.indexOf.call(부모tbody.children, 이벤트.currentTarget.parentNode); // 화면상 클릭한 곳의 인덱스를 야매로 인덱스로 알아내는 방
      console.log('객체:',부모tbody.children,'인수:', 이벤트.currentTarget.parentNode);
// #2.  
var 칸 = Array.prototype.indexOf.call(부모tr.children, 이벤트.currentTarget);
```

→ 화면 상, NodeList는 배열이 아니기 때문에 **Array.prototype( 유사배열 )** 로 배열화 시켜준다. 


1. 줄(세로) : 테이블에서 줄의 index를 알아내는 것

**table (객체)에서 클릭된 타겟의 줄(인자)**을 알아 내기 위해서는 .call( ) 함수를 활용한다. 

→ .indexOf.call (객체, 인자) 는 '객체' 내에서 '인자'가 몇 번째에 해당하는 지 Index를 반환해준다. 

2. 칸(가로) :  줄에서 칸의 index를 알아내는 것

tr 태그 내의 수 많은 td 중, 본인이 클릭한 타겟의 Index를 반환해주는 역할

→ .indexOf.call(객체, 인자) 는 '해당 칸이 속한 줄' (객체, td 여러개)에서 몇 번째에 td가 속하는지 Index를 반환해준다. 

---

### currentTarget vs target

- currentTarget은 이벤트 리스너가 달린 태그 전체를 가리킴 (tbody)
- target은 실제 클릭된 곳의 좌표를 가리킨다 (td)

**→ 현재로써는 둘의 차이점은 그다지 크지 않다고 생각하고 currentTarget을 사용한다.** 

---

## 물음표 기능과 중간정리

```jsx
if (이벤트.currentTarget.textContent === ''){
       이벤트.currentTarget.textContent= '!';
       dataset[줄][칸]='!';
}else if (이벤트.currentTarget.textContent === '!'){
       이벤트.currentTarget.textContent= '?';
       dataset[줄][칸]='?'; 
}else if (이벤트.currentTarget.textContent === '?'){
       이벤트.currentTarget.textContent= '';
       dataset[줄][칸]=1; // 현재 dataset의 기본 값이 1이기 때문
}
```

원래 지뢰였던 칸도 세 번 우 클릭을 시도하면 지뢰가 사라진다. 어차피 ? ! 는 사용자에게 편의를 제공하기 위한 기능이므로 실제 dataset과 반드시 일치 시킬 필요는 없다.

 

→ 우클릭을 3번 할 때, 원래 dataset을 검사하여 빈칸으로 채울지, 빈칸으로 채울지 검사 추가 

```jsx
if (이벤트.currentTarget.textContent === '' || 이벤트.currentTarget.textContent ==='X'){
                   이벤트.currentTarget.textContent= '!';
               }else if (이벤트.currentTarget.textContent === '!'){
                   이벤트.currentTarget.textContent= '?';
               }else if (이벤트.currentTarget.textContent === '?'){ // ?에서 우클릭을 할 때 검사 시도
                   이벤트.currentTarget.textContent= '';
                   if (dataset[줄][칸]===''){
                       이벤트.currentTarget.textContent='';
                   }else if (dataset[줄][칸]==='X'){
                       이벤트.currentTarget.textContent='X';
                   }
               }
```

### 실행 버튼을 누를 때 초기화 하는 방법

실행 버튼을 누르면 아래로 더 많은 테이블들이 생성된다. 

→ 이벤트 리스너 내에 tbody.innerHTML=' '; 로 초기화 진행한다. 

```jsx
tbody.innerHTML=''; // 클릭 할 때, tbody태그 내의 모든 태그의 text를 모두 삭제하는 구문
```
