# Web-Font

### 폰트 넣는 법 
* font-family는 `inherit(상속)` 된다. 
```
body{
    margin : 0px; 
    font-family : 'gulim', 'dotum', 'arial';
}
```

* 굴림체 적용해주고 만약, 굴림체에 문제가 생겼다면 돋움체를 적용해주고 돋움체도 안된다면 arial 체를 적용해달라. (안정성)

### 폰트 적용 방법 1. 웹폰트 다운
1. 웹폰트용으로 나온 woff 파일 을 다운 받아서 폴더내에 위치시킨다. </br>

2. url('') 내부에 파일의 위치를 입력시켜서 font-family : "작명" 
```
@font-face{
    font-family : '작명'
    src : url();
}

```

2. body에 적용시켜 준다. 
```
body{
    font-family : '작명'; 
}
```

### 폰트 적용 방법 2. Google Fonts

* 폰트 파일을 호스팅 해주는 Google Fonts

https://fonts.google.com/

* Link 를 가져와서 복붙 첨부

![image](https://user-images.githubusercontent.com/63600953/135706933-1980fecf-b353-4b73-9f7f-8abd160d303d.png)

### 폰트가 살짝 깨질때 대처법 (앨리어싱 현상 대처법)


* 굴림체 같은 경우에는 글씨체가 깨지는 경우가 종종 있다. 
  

* 이를 해결하기 위해서는 `transform : rotate()` 속성을 활용하면 안깨지는 것을 확인 할 수 있다.


* 아주 살짝만 각도를 틀어주면 글씨체가 부드러워 지는 것을 알 수 있다. 
```
p, span{
    transform : rotate(0.03deg); 
}
```