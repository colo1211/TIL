# SCSS ( SASS )

* CSS 전처리 언어(대용 언어)
* CSS와 동일하게 작성 가능
* 조건문, 반복문, 변수, 함수 등을 사용이 가능함
* 위의 것들을 활용하여 반복적인 부분을 쉽게 사용 가능
* 주의. 웹 브라우저는 .css만 읽을 수 있음

* SASS 
: SCSS와 동일하고 괄호 `{ }`의 유무 차이 

---

# 설치

1. `Visual Studio Code Extension` > `Live Sass Compiler(v 3.0)`

![image](https://user-images.githubusercontent.com/63600953/136312600-4bb9bbc1-55dc-42a1-bdcd-95cffad12457.png)


2. 아래에 watch sass 를 클릭하면 자동으로 SASS 파일에 해당하는 코드가 CSS 파일로 변환되어 나타난다. 

![image](https://user-images.githubusercontent.com/63600953/136312833-85a737cb-2885-49f7-8183-a4bfdc20f49c.png)

* 코드를 짤때는 SCSS에 짜고, html 에 link태그로 넣을 때는 자동으로 생성된 CSS 파일을 넣어준다. 

* `.map` 파일이 있으면 크롬에서 CSS가 아니라 scss 파일로 분석해준다. 


# SASS 문법 

#### 1. 변수문법

* 실은 CSS 기본 문법에도 변수 문법이 존재하기는 한다.(참고)</br> 

`--변수명 : 값`
```
:root{
    --main-color : red;
}

.background{
    background-color : var(--main-color);
}
```  
⚠ 그런데 너무 복잡하고 번거롭기 때문에 SASS를 사용하여 스타일링 진행한다. 


* SASS에서 변수 선언하려면
  `$변수명 : 값;`
  
* SASS에서는 `사칙연산`이 바로바로 가능 

```
$main-color : blue;
$sub-color : red;
$default-size : 16px;

.background{
    background-color: $main-color;
    font-size : $default-size - 2px; // 14px이 들어감
}

.box {
    background-color: $main-color;
    font-size : $default-size + 2px; // 18px이 들어감 
}
```

#### 2. Nesting

* Selector 를 조금 더 편하게 해줄 수 있는 문법
* 관련있는 Class 들을 묶을 때 좋은 문법

CSS
```
.main h4 {
  text-align: center;
}
.main button {
  color: red;
}
```

SCSS의 `Nesting 문법`
```
.main{
    h4{
        text-align: center;
    }

    button {
        color : $sub-color;
    }
}
```

#### 3. @extend 

* extend : 확장
* 중복된 스타일이 많을 때 사용, 임시 클래스(템플릿)

1. 선언 : 클래스로 묶어둔다. (`% 클래스명`)

2. 적용 : @extend `% 클래스명`

SCSS 
```
%btn{
    width : 100px;
    height : 100px;
    padding : 20px;
}

.btn-green{
    @extend %btn;
    background-color: green;    
}

.btn-red{
    @extend %btn;
    background-color: red;
}

.btn-blue{
    @extend %btn;
    background-color: blue;
}
```

CSS
```
.btn-blue, .btn-red, .btn-green {
  width: 100px;
  height: 100px;
  padding: 20px;
}

.btn-green {
  background-color: green;
}

.btn-red {
  background-color: red;
}

.btn-blue {
  background-color: blue;
}
```

⭐ Nesting 문법을 사용하여 Pseudo Code 적용하기 
* &을 붙이면 된다. 
```
.navbar {
  &:hover {
    color : blue;
  }
}
```

#### 4. @mixin - @include 

* 함수 문법 
* 파라미터를 넣어서 클래스별로 커스터마이징 할 수 있다. 


정의 
```
@mixin 폰트사이즈($폰트, $자간){
    font-size : $폰트;
    letter-spacing: $자간;
}

```

적용
```
h1{
    @include 폰트사이즈(40px, -1px); 
}
```

CSS 결과 
```
h1 {
  font-size: 40px;
  letter-spacing: -1px;
}
```

#### 5. @import 대신 @use

* 다른 파일에 있는 내용을 가져오고 싶을 때 사용

CSS reset(Nomalize) 파일을 가져오고 싶을 때, `@use`를 사용하면 된다. 

참고) reset.scss는 앞에다가 _를 붙여서 `_reset.scss` 로 작명한다. 
이렇게 하면 reset.scss 파일에는 css 파일이 생성되지 않는다. 

```
@use '_reset.scss'; 
```

* 다른 파일의 $변수 도 사용이 가능한데, 이를 사용하기 위해서는 `파일명.$변수`와 같이 사용한다.
  
![image](https://user-images.githubusercontent.com/63600953/136320149-e37c5c9d-8954-46ff-a7c3-b91aef02a8f4.png)
