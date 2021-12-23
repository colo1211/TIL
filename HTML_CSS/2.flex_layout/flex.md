# flex

---

* 참고 링크 
  * https://studiomeal.com/archives/197
  * https://www.youtube.com/watch?v=eprXmC_j9A4

---
  

### 1. flex 적용을 위한 기본 구조

부모요소(Container) - 자식요소(items)
```
<div class="container">
    <div class="item">
        <p>AAAAAAAAAAAAA</p>
        <p>AAAAAAAAAAAAA</p>
        <p>AAAAAAAAAAAAA</p>
    </div>
    <div class="item">
        <p>BBBBBBBBBBBBBBBBBB</p>
    </div>
    <div class="item">
        <p>CCC</p>
    </div>
</div>
```

---

### 2. display : flex 

* 부모요소에 적용한다. 

`flex 적용 이전`
![image](https://user-images.githubusercontent.com/63600953/146309139-198e1c10-57a2-42d8-bba0-591951581750.png)

```
.container{
    background-color: lightgray; 
    height : 100vh; 
    display : flex;
}
```

`flex 적용 이후`
![image](https://user-images.githubusercontent.com/63600953/146309263-0fd4da13-ba60-41f8-b64c-02f46ca6c331.png)

---

### 3. flex-direction 

* 부모 요소에 적용
* `flex-direction : row` 가 기본 값이다. 


* 부모 요소에 적용하여 자식 요소들의 배치 순서를 변경한다. 

1. `flex-direction : row` (👉)
   ![image](https://user-images.githubusercontent.com/63600953/146309799-04b48ab3-0365-4f85-8e4a-8e4adc864e8d.png)

2. `flex-direction : column` (👇)
   ![image](https://user-images.githubusercontent.com/63600953/146310047-21ce4b04-5b06-4f77-999f-e8b852031d8b.png)

3. `flex-direction : row-reverse` (👈)
   ![image](https://user-images.githubusercontent.com/63600953/146310126-1e2f507d-ebb1-4264-89f0-0cca08d7a01d.png)

4. `flex-direction : column-reverse` (👆)
   ![image](https://user-images.githubusercontent.com/63600953/146310199-d870c6a1-a923-49e4-928e-5d4f6692c8b9.png)
   
---

### 4. flex-wrap 

* 부모 요소에 적용.
* flex-wrap : nowrap 이 기본 값이다. 

* 컨테이너가 아이템들의 폭보다 줄어들었을 때 어떻게 할 것인지 결정하는 속성 값

1. `flex-wrap : nowrap` 
: 아이템들이 버티고 아래로 안떨어진다. 

![image](https://user-images.githubusercontent.com/63600953/146310621-ec73d6be-cbc6-48d5-be1f-9dbedc9efc5f.png)

   
2. `flex-wrap : wrap`
: 아이템들을 감싸달라는 의미, 보존을 해야하므로 아이템들이 아래로 떨어진다. 

![image](https://user-images.githubusercontent.com/63600953/146310669-a14353d8-4ea4-4b6f-8808-9e1c83d7cc8b.png)

3. `flex-wrap : wrap-reverse` 
: 떨어지긴 떨어지는데 순서가 바뀌면서 떨어지는 속성

---
   
### 5. justify-content

* 부모 요소에 적용
* 기본 값 : `justify-content : flex-start` 
* justify (현재 축) 을 기준으로 내용물들을 정렬 해 준다. 
* “justify”는 메인축(오뎅꼬치) 방향으로 정렬

#### 꼬치 내에서 오뎅들을 어떻게 배치할 것인지 결정하는 요소라고 생각

![image](https://user-images.githubusercontent.com/63600953/146311272-5021b0a2-bde8-4895-8e01-6b216d6e1cd3.png)

1. flex-start 
![image](https://user-images.githubusercontent.com/63600953/146311477-8623c0a8-04fd-4011-95ee-24e34ac4eec4.png)


2. flex-end
![image](https://user-images.githubusercontent.com/63600953/146311570-f5e12593-ba80-42b4-b4de-761a462746f3.png)

3. center
![image](https://user-images.githubusercontent.com/63600953/146311660-11905fd0-6144-4bf3-a112-ed95dac7f542.png)

4. space-between
* 요소가 양 끝쪽에 붙어서 알아서 여백을 동일하게 조정해준다. 

![image](https://user-images.githubusercontent.com/63600953/146312073-38fcd527-251d-47b9-9e9e-7562732d4f97.png)

5. space-around
* 요소가 완전히 양 끝에 딱 달라 붙지는 않고 여백을 둔다. 
![image](https://user-images.githubusercontent.com/63600953/146312216-f22a7871-01cc-4a17-9709-ba313f693bb1.png)

---

### 6. align-items 

* align 이라는 키워드는 메인 축의 수직 방향을 의미
* 수직 정렬
* `align-items : stretch` 가 기본 값

* 속성 요소들
![image](https://user-images.githubusercontent.com/63600953/146312504-c2e9a12b-20a3-4bd8-adc7-693ca4aeb794.png)

1. flex-start
![image](https://user-images.githubusercontent.com/63600953/146312591-552f50fa-befd-4d34-a893-a481d851cc4c.png)

2. flex-end
![image](https://user-images.githubusercontent.com/63600953/146312646-722924bc-9a97-4be4-ab35-6540418b70c2.png)

3. center
![image](https://user-images.githubusercontent.com/63600953/146312699-263bb44f-b252-4327-ab8e-a119a677d809.png)
---

```
수직, 수평 정렬 즉, 요소를 모니터의 한가운데 놓고 싶다면?
```

![image](https://user-images.githubusercontent.com/63600953/146312914-8a213b24-316e-461e-8315-976ccbca6628.png)

```
justify-content: center;
align-items: center;
```

---

### 7. align-content 

* 부모 요소에 적용
* flex-wrap : wrap 일 때 적용이 가능한 속성

* 창이 줄어들었을 때, 요소들을 수직적으로 어떻게 정렬할 것인지 결정하는 요소

1. stretch (기본)
![image](https://user-images.githubusercontent.com/63600953/146314119-62e36fa2-57c9-4d68-b938-ddf838c4af44.png)

2. flex-start
* 위로 착 달라붙어서 wrap 된다. 
![image](https://user-images.githubusercontent.com/63600953/146314176-a2fde5ae-9aaa-4b0b-ade6-e4881590e65c.png)

3. flex-end
* 아래로 착 달라붙어서 wrap 된다.
![image](https://user-images.githubusercontent.com/63600953/146314279-e1579854-b67b-41eb-94c6-e62868e2af6a.png)

4. center
* 가운데로 정렬된다.
![image](https://user-images.githubusercontent.com/63600953/146314325-d986fcbf-caa5-489a-8971-18ad968c35c7.png)

5. space-between

![image](https://user-images.githubusercontent.com/63600953/146314429-43ba254b-fde9-442c-9ea5-61570dc5f5ef.png)

---

### 8. flex-grow

* 자식 요소에 적용

* 컨테이너(부모) 요소에 맞게 신축성이 있게 공간을 차지하게 하는 속성

* 각각을 얼만큼의 비율로 늘어나게 할건지 결정하는 속성

[ 적용 이전 ]
![image](https://user-images.githubusercontent.com/63600953/146314696-bdc725b3-6cfb-4227-b445-459f633c9aac.png)

```
.item:nth-child(1){
    flex-grow: 1; 
}
.item:nth-child(2){
    flex-grow : 2;
}
.item:nth-child(3){
    flex-grow : 1; 
}
```

[ 적용 이후 ]
![image](https://user-images.githubusercontent.com/63600953/146315067-88b51274-3a32-4d9c-ad1a-e03926bce2d5.png)

```
(＃°Д°)
전혀 1:2:1의 비율이 아닌데 어떻게 된거지? 
> flex-grow는 item들의 width를 1:2:1로 나누는 것이 아닌, 
아까 적용 이전에 회색 box 의 여백을 1:2:1 씩 나눠 가지는 것을 의미한다. 
```

---

### 9. flex-basis

* 기본 값 : `flex-basis : auto` 
* item에 flex-basis를 0으로 하면 width가 1:2:1로 설정된다.

---

### 10. flex-shrink
* 자식 요소에 적용
* 고통 분담
* 창이 줄어들 때 어떤 비율로 줄어 들건지?

---

### 11. flex
* `flex-grow` + `flex-shrink`

* 자동으로 flex-basis가 auto에서 0으로 설정된다. 

---

### 12. align-self

* 자식 요소에서 아이템을 수직 정렬하는 방법

```
.item:nth-child(1){
    flex: 1; 
    align-self : flex-start; 
}
.item:nth-child(2){
    flex : 2;
    align-self : center; 
}
.item:nth-child(3){
    flex: 1; 
    align-self : flex-end; 
}
```

![image](https://user-images.githubusercontent.com/63600953/146318547-603b4531-fe9d-4391-a9e5-11e1e74346ee.png)

---

### 13. order 

* 자식 요소에서 적용
* order 에 적힌 순서대로 요소가 배치된다. 
