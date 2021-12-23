# Animation

## 1. One Way Animation
a에서 b로 이동하는 one way animation은 그냥 transition을 쓰면 된다. 

### 방법
1. 시작 스타일 제작
2. 최종 스타일 제작
3. 언제 최종 스타일로 변하는지 (Trigger 제작)
4. transition 으로 애니메이션을 준다. 

### opacity 
0 : 투명 ~ 1 : 완전 불투명  

### 예제1
* 그림 위에 마우스를 올리면 회색 박스가 서서히 나오게 되는 animation

1. 시작스타일 

![image](https://user-images.githubusercontent.com/63600953/136142159-a818ff27-fa61-439e-978f-83be4de7d292.png)

html 
```
<div class="shop-item">
  <div style='position: relative'>
   <div class='overlay'></div>
    <img src='../이미지파일/product1-1.jpg'>
    </div>
</div>
```

css

```
.overlay {
    position: absolute; 
    width : 100%;
    height : 100%; 
    background-color: rgba(0,0,0,0.5);
    opacity : 0;
    transition: all 1s; 
/*    위에 있는 스타일이 변하게 된다면, 1초에 걸쳐서 서서히 변하게 해주세요. */
}
```
2. 최종스타일
  
![image](https://user-images.githubusercontent.com/63600953/136142233-f90c94ab-22cd-4b57-9199-4c06bc1cb0c2.png)

```
.overlay:hover{
    opacity: 1; 
}

```

3. Trigger : hover


4. `transition : all 1s` 은 시작화면에서 써준다.  

### 예제2 

* 그림 위에 마우스를 올렸을 때, 아래서부터 천천히 네모박스가 올라오는 것

1. 시작스타일
   

![image](https://user-images.githubusercontent.com/63600953/136145127-64ba1de9-9061-4721-993d-00a8b5e47ba6.png)

* html 
```
<div class="shop-item">
  <div style='position: relative'>
  <div class='overlay-wrap'>
   <div class='overlay price'>3000$</div>
  </div>
    <img src='../이미지파일/product1-1.jpg'>
    </div>
</div>
```

* css

```
.overlay-wrap {
    position: absolute;
    width : 100%;
    height : 100%;
    overflow: hidden;
}

.overlay {
    position: absolute;
    width : 100%;
    height : 50%;
    background-color: rgba(0,0,0,0.3);
    top : 100%;
    transition : all 1s; 
}
```

2. 최종스타일

![image](https://user-images.githubusercontent.com/63600953/136145261-246a5a06-3ad3-4585-af52-2cf0cd2eede9.png)

```
/*wrap에 hover하면 overlay가 올라온다.*/
.overlay-wrap:hover .overlay{
    top : 50%;
}

```
3. 트리거 : hover

: CSS에서는 Selector 가 없기 때문에 html 을 overlay를 감싸는 wrap을 만든다. 

* overlay-wrap(부모) 을 hover 하면 overlay(자식)이 올라오는 것이 가능
* 하지만, 형제끼리는 이것이 불가능

```
부모와 자식간의 관계만 가능하다. 
```


4. transition 


---

## 2. @keyframes animation

* `a -> b -> c`
* `a -> b -> a`
* `a -> 1초 정지 -> b`

위와 같은 애니메이션은 `@keyframes`를 활용하여 애니메이션을 제작한다. 

애니메이션을 제작할 때 사용하는 속성들
1. 회전 </br>
   `transform : rotate(10deg)`


2. 이동 </br>
    `transform : translateX(100px);`
    * x축으로 100px만큼 이동시킨다.
    * 애니메이션 만들 때, margin 속성을 이용하는 것보다 훨씬 부드럽게 동작한다. 
    

3. 확대/축소(스케일링) </br>
    `transform : scale(0.5);`
   

4. 애니 동작 마지막에서 멈추고 싶다면 </br>
    `animation-fill-mode : forwards`

keyframe 예제) 

```
.ani-text {
    text-align: center;
}

.ani-text:hover{
    animation-name : 애니; /* 정의한 애니메이션 이름 */
    animation-duration: 1s; /* 1초동안 실행 */
    animation-iteration-count: 3; /* 3번 반복 */
}

@keyframes 애니 {
/*    초기상태*/
    0%{
        transform: translateX(0px);
    }
    
    25%{
        transform: translateX(-100px);
    }
    
    75%{
        transform: translateX(100px);
    }
    
/*    최종상태*/
    100%{
        transform: translateX(0px);
    }
}
```
Tip! 
만약에 하나의 %(진행 정도)에 여러가지 transform 을 주고 싶다면? 
아래와 같이 transform 을 두개로 나누지 말고 바로 옆에다가 속성을 작성해야 잘 동작한다. 
```
@keyframes plustoX{
    25%{
        transform: rotate(-10deg); 
    }
    
    100%{
        transform : rotate(45deg) scale(1.5);
        /*transform : scale(1.5); 이러면 작동 제대로 안됨*/
    }
}
```

</br></br>
#### 왜 transform 속성을 사용하여 ani를 구현해야 하는거지? 

: 브라우저의 렌더링 순서 때문, 애니메이션을 margin으로 처리하면 2번부터 다시 처리해야하지만, 
tranform 속성을 활용하면 4번, 마지막 단계를 1번만 거치면 된다. 


1. Render Tree 생성 
   

2. LayOut 잡기</br> 
   ex) width , height, margin, padding


3. Paint (색칠) 하기 


4. Composite 처리</br> 
   ex) transform, opacity 
   

