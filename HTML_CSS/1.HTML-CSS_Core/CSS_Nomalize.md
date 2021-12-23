# CSS Nomalize
* 호환성 이슈를 해결할 수 있는 코드
* 불편한 것을 미리 잡는 코드 

### box-sizing : border-box
* width 가 `padding / border` 를 포함된다.    

![image](https://user-images.githubusercontent.com/63600953/135613910-23cb200f-c1f7-46d5-aaa9-387271306b71.png)


* width 는 content 영역(내용물 부분)의 너비를 의미한다.

![image](https://user-images.githubusercontent.com/63600953/135614235-d449e33a-5d81-45c6-a454-1990868f5b8b.png)

```
⭐ Box Size를 정확히 재단하고 싶다면 content 부분만 width 로 설정하지 말고 padding, border 부분도 포함하라고 시키면 됨. 
```

```
div {
    box-sizing : border-box; 
}

body {
    margin : 0px; /* 기본적으로 body에 적용되어 있는 margin을 없앤다. */
}
```
