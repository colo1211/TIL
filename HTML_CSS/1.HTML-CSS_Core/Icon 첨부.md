# Font-Awesome

### 설치 방법

####1. CDN

* 장점 : 간편
* 단점 : 서버가 불안하면 깨진다. 

구글에 `fontawesome cdnjs 5` 를 검색

https://cdnjs.com/libraries/font-awesome 에 들어가서 

`all.min.js` 를 찾아서 HTML 코드에 복붙

```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
```

####2. 직접 파일을 다운로드 받는다. 

https://fontawesome.com/ 에 들어가서 다운로드 받아서 폴더내에 위치시킨 이후, link 태그로 끌어온다. 


---
### 사용 방법

* 스타일링은 글자처럼 가능하다. 
* 따라서 `style = "font-size : 10px"` 과 같이 디자인 한다. 
* class 내부에 `fa-3x`(크기 조정) 라고 하면 초기 크기의 3배

![image](https://user-images.githubusercontent.com/63600953/136138820-76bb28f5-9ffb-4a15-b447-238ca61b901c.png)

```
.intro-item i {
    background-color: burlywood;
    width : 100px;
    height : 100px;
    border-radius: 100px; 
    padding-top : 25px;
    box-sizing: border-box;
    color : white;
}
```