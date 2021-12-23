# ch 10. JSON 개념정리

**Client ↔ Server (By HTTP, Hyper Text Transfer Protocol)** 

: 클라이언트와 서버가 통신하기 위해서 만든 프로토콜(약속) → HTTP 

- **Client → Server : Request**
- **Client ← Server : Response**

여기서 HyperText 는 문서, 이미지 , 리소스 등을 통칭

HTTP를 서버에 요청해서 받아오는 방법 : AJAX(**A**synchronous **J**avaScript **A**nd **X**ML)

**AJAX : 웹페이지에서 동적으로 서버에게 데이터를 주고 받을 수 있는 기술** 

XHR : **X**ML**H**ttp**R**equest

- XML 은 HTML 처럼 데이터를 표현할 수 있는 마크업 언어
- XML 은 서버와 통신할 때 사용 가능하지만, 불필요한 태그들이 들어가서 용량이 커지고 가독성도 매우 떨어진다.

> **따라서, 최근에는 XML대신에 JSON을 사용한다.**

---

## JSON

: **J**ava**S**cript **O**bject **N**otation, 데이터 포맷의 종류 

→ Key 와 Value로 이루어져 있다. 

- 데이터를 주고 받을 때 가장 간단한 포맷
- 텍스트를 기반으로한 가벼운 구조
- 가독성 좋음
- key - Value로 이뤄져 있음
- 데이터를 전송할 때 직렬화(serialization)를 위해서 사용
- **Independent Programming Language and platform**

→ 프로그래밍 언어나 플랫폼에 독립적이다.  (C, C++, C#, Pythion, Java, Kotlin 모두 사용 가능) 

---

## JSON 공부 포인트

1. **[Client → Server] : Object를 어떻게 '직렬화' 하여 JSON으로 변환 할 지** 


**2. [Server → Client] : 직렬화된 JSON을 deserailize하여 어떻게 다시 Object로 변환 할 것 인지** 


---

**Tip : JSON(String, 문자열)으로 기억해두면 편하다** 

## JSON.stringify , 문자열화

**: Object → JSON(string)** 

```jsx
let json = JSON.stringify(true); // 객체를 문자열화(JSON 포맷으로 변경)한다. 
console.log(`json:${json}, type: ${typeof json}`);//json:true, type: string
```

```jsx
json = JSON.stringify(['apple','banana']); 
console.log(json); //["apple","banana"] 문자열화 
```

- 실제 객체를 대입해보자

```jsx
const rabbit =  {
    name : 'tori',
    color : 'white',
    size : null,
		// Window 함수 사용! (JSON에 적용X) 
    birthDate : new Date(), // Window API 로서, 그때의 시간을 담아준다.
    // 함수를 정의! (JSON에 적용X) 
		jump : ()=> {
        console.log(`${this.name} can jump!`);
    }
}

json = JSON.stringify(rabbit);
console.log(`rabbit JSON ${json}`);
```

- 출력결과

```json
rabbit JSON 
{"name":"tori","color":"white","size":null,"birthDate":"2021-02-08T07:24:10.266Z"}
```

→ JSON 자료형에 (jump) 함수는 제외되고 , symbol 자료형도 제외된다.

→ 또한, JSON 자료형에 birthDate는 출력된 결과로서 문자열로 전달되었다. 

(이는 나중에 다시 Object 화 할 때도 문자로써 들어오게 된다) 

- Stringify 의 세부 조정 (콜백)

```jsx
 callBack 함수를 활용
 json = JSON.stringify(rabbit,(key,value)=>{
     console.log(`key:${key}, value:${value}`);
     return value;
 })
 //key:, value:[object Object]
 //json.js:34 key:name, value:tori
 //json.js:34 key:color, value:white
 //json.js:34 key:size, value:null
 //json.js:34 key:birthDate, value:2021-02-08T07:30:37.360Z
```

→ return 에서 조건을 달아주면 유용하게 변환 가능하다. 

```jsx
json = JSON.stringify(rabbit,(key,value)=>{
    return key === 'name' ? 'ellie' : value; // (조건) 만약 key가 name인 것이 있다면 그 값은 ellie로 변경
})
console.log(json);
//{"name":"ellie","color":"white","size":null,"birthDate":"2021-02-08T07:32:55.394Z"}
```

---

## JSON.parse , 객체화

**: JSON(string) → Object**

```jsx
json = JSON.stringify(rabbit); // 객체를 문자열(JSON)화, 이전 장에서 했던 것들 
let obj = JSON.parse(json); // JSON(문자열)을 다시 객체(Object)화
console.log(obj);
// 다시 객체로 변경됨 {name: "tori", color: "white", size: null, birthDate: "2021-02-08T07:34:59.936Z"}
```

```jsx
//{name: "tori", color: "white", size: null, birthDate: "2021-02-08T07:34:59.936Z"}
```

여기서 알 수 있는 점 

- 함수는 돌아오지 않았다. (객체 → JSON 과정에서 사라짐)

```jsx
obj.jump(); // 객체를 JSON으로 변환 할 때는 함수, 심볼 자료형을 포함 X 따라서, JSON을 객체로 변경했을 때 함수는 존재하지 않는다.
// 에러
```

- birthDay , Window 함수는 문자열로 반환 받았다.

```jsx
obj = JSON.parse(json,(key,value)=>{
    return key === 'birthDate' ? new Date(): value; // new Date() 대체하기 (문자열 -> 다시 new Date)
})

console.log(obj.birthDate.getDate()); // 다시 윈도우 함수를 사용 가능해졌다. 
```