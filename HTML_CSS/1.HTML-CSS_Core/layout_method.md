# CSS Layout 방법

### 1. float : left

* 핵심 : `width % 조정` , `float : left` , `clear : both` 

1. 모든 요소를 감싸는 wrapper(container)를 만든다.
2. div는 display : block 의 속성을 가졌기 때문에 한 줄을 모두 차지하는 특성을 가짐
3. 따라서 wrapper를 기준으로 width 를 % 주는 것이 중요
4. 이후 `float : left` (왼쪽 정렬) , 붕 띄워서 왼쪽에 정렬해준다.  
5. 붕 띄웠기 때문에 아래에 footer는 header의 바로 아래에 배치된다. 따라서 left, right 아래에 배치되게 하기 위해서는 `clear : both` 를 사용한 이후에 해주어야 제대로 배치된다. 

---
### 2. display : inline-block 

* 우선 이 방법은 비추

`display : inline-block;` 
* 내 크기만큼 차지 (그림과 글이 어울림. 즉, 글자처럼 취급)
* 파란색과 coral색의 Box를 `inline-block` 속성을 넣게 되면 글자처럼 취급되기 때문에 다음과 같이 줄을 띄워서 코딩하면 다음 칸에 오게 된다. 


```
<div class='left'></div>
<div class='right'><p>안녕하세요</p></div>  
```

![image](https://user-images.githubusercontent.com/63600953/135571852-11f2982b-194c-45de-aa54-8002728bb647.png)

이를 해결하기 위해서는 글자처럼 취급하기 때문에 

```
<div class='left'>2</div><div class='right'><p>안녕하세요</p></div>   
```

![image](https://user-images.githubusercontent.com/63600953/135572186-b313945f-7f3a-4df1-b4dc-6b3541186341.png)

다음과 같이 코드를 붙여주면 바로 옆에 오게 된다. 

하지만, 코드를 옆에다가 붙이면 가독성이 매우 떨어지기 때문에 다음과 같이 주석으로 처리하는 방법도 존재한다.

```
            <div class='left'></div><--
         --><div class='right'><p>안녕하세요</p></div>   
```

하지만 coral 색으로 된 div 에 글씨를 넣어주게 되면 다음과 같이 div는 발작을 일으키게 된다. 
이는 현재 파란색과 coral 색을 inline-block으로 글자처럼 취급하였기 때문에 발생하는 현상으로 파란색을 글자로 인식하여 글의 Base-Line으로 인식하여 나타나게 되는 현상이다.
![image](https://user-images.githubusercontent.com/63600953/135572517-50844015-479a-415e-aa88-5deeede8e0ce.png)

* left-box에 `vertical-align : top` 을 해주면 된다. 
```
.left {
    width : 20%; 
    height : 400px; 
    background-color: cornflowerblue;
    display: inline-block; 
    vertical-align: top;
}
```

![image](https://user-images.githubusercontent.com/63600953/135572966-86fb85f2-85fc-4db5-ae5b-7ef18d48f05b.png)

---
### 3. display : flex

`display : flex` 를 쓰면 Box 가로 배치가 쉬워진다. 

* 기본 셋팅
```
<div class='flex-container'>
   <div class='flex-box'></div>
   <div class='flex-box'></div>
   <div class='flex-box'></div>
</div>
```

![image](https://user-images.githubusercontent.com/63600953/135708349-2c941781-79ff-4019-922f-c1be5f964594.png)

* 웹 상에서 보이는 구조 (세로로 정렬 되어 보인다)

![image](https://user-images.githubusercontent.com/63600953/135708390-cfa7f0be-968d-4ea8-b906-81a517f8591c.png)

이를 가로로 배치하기 위해서는? 
```
.flex-container {
    display: flex;
}
```

![image](https://user-images.githubusercontent.com/63600953/135708429-4fb7349d-ad43-45ad-b5e8-c3a1edcf345d.png)


> flex-container와 flex-box에 들어가는 CSS값이 각기 다르다. 


#### flex-container에 적용되는 속성
```
▶ display : flex;

: box의 형태를 flex형태로 설정한다. flex를 활용한 레이아웃을 하기 위해서 가장 먼저 사용되어야 합니다.

★ display : flex; = table 특성(best-effort, 노력형) + inline-block 특성



▶ justify-contents (왼쪽-오른쪽) 

* justify : 가로줄

: 수평 정렬(왼쪽, 중앙, 오른쪽) 을 나타냅니다.

속성 값으로는 flex-start (왼쪽 정렬), center (중앙 정렬), flex-end (오른쪽 정렬) 등이 있습니다.



▶ align-items (위-아래):

* align : 일직선

: 수직 정렬(위, 중앙, 아래) 를 나타냅니다.

속성 값으로는 flex-start (위 정렬), center (중앙 정렬), flex-end (아래 정렬) 등이 있습니다.



▶ flex-direction :

: flex-box들의 배치(정렬 배치 순서)를 설정합니다.

1. column(기본 값) : 세로

2. row : 가로

3. column-reverse : 세로 거꾸로

4. row-reverse : 가로 거꾸로



▶ flex-wrap 
: flex-box들을 브라우저 창이 늘어나고 줄어듦에 따라서 box의 반응을 어떻게 설정 할 것인지?

1.  nowrap (기본 값)
: 브라우저 창이 줄어들어도 box들이 사이즈를 줄이면서 칸을 유지

2. wrap
: box의 size를 살리고 box들을 줄을 바꿔서 배치

▶ flex-flow
: flex-direction 과 flex-wrap을 한번에 사용할 수 있게 해주는 값
```

#### flex-box에 적용되는 속성

▶ flex-grow
: flex-box들에 주어진 값들에게 상대적인 비율을 준다고 생각하면 이해가 빠릅니다.

```
 <div class='flex-wrap'>
           <div class='flex-box' style='flex-grow:1'></div>
           <div class='flex-box' style='flex-grow:2'></div>
           <div class='flex-box' style='flex-grow:3'></div>
       </div>
```

![image](https://user-images.githubusercontent.com/63600953/135708564-1af15146-beed-4a5b-a969-e9442df15a36.png)

* flex-grow 실전
`=> 박스와 박스 사이를 떨어뜨리고 싶을 때`
  
```
<div class='flex-wrap'>
       <div class='flex-box'></div>
       <div style='flex-grow:1'></div>
       <div class='flex-box'></div>
       <div class='flex-box'></div>
</div>
```

![image](https://user-images.githubusercontent.com/63600953/135708593-0350dcbf-3fb3-4e6a-9c4e-812588887449.png)

---

### 4. bootstrap grid Layout

![image](https://user-images.githubusercontent.com/63600953/136166435-865c7b6b-d739-49ab-a8e5-8bd54dc27b23.png)

* row : 내부를 12칸으로 쪼개주는 class 명  
* col : col-차지할 크기 (모두 합쳐서 12여야 한다.)
```
<div class='container'>
    <div class="row">
        <div class="col-4 text-center">안녕하세요</div>
        <div class="col-4 text-center">안녕하세요</div>
        <div class="col-4 text-center">안녕하세요</div>
    </div>
</div>
```

⭐ Bootstrap 에서 제공하는 반응형 레이아웃 (클래스에 조건을 달아주면 된다)
* md(768px) Size 이상에서는 md-6 (동등하게 2칸)
* md Size 이하에서는 세로 정렬
* md Size 이하에서는 없는셈 친다고 생각하면 편함
```
<div class='container'>
    <div class="row">
        <div class="col-md-6 text-center">안녕하세요</div>
        <div class="col-md-6 text-center">안녕하세요</div>
    </div>
</div>
```

#### Grid System
![image](https://user-images.githubusercontent.com/63600953/136167108-f2db5a46-cb8f-4cc5-bce4-44dbbc694606.png)

* sm : 576px
* md : 768px 
* lg : 992px
* xl : 1200px


#### 순서 재배치

* order-first

![image](https://user-images.githubusercontent.com/63600953/136167832-630a441f-6649-4031-8791-97eacb00e51c.png)

```
<div class='container'>
    <div class="row">
        <div class="col-md-6 text-center">안녕하세요1</div>
        <div class="col-md-6 text-center order-first">안녕하세요2</div>
    </div>
</div>
```

