# PWA란? 

* PWA = 웹과 네이티브 앱의 장점을 결합한 웹 기술
    
1. 웹앱 
* 웹은 URL을 통해 접근이 가능, 별도의 설치가 필요 없다.
* 앱처럼 홈화면에 바로가기 아이콘을 추가하여 네이티브 앱처럼 사용이 가능하다. 
    
But, 네트워크가 연결되어 있지 않는 오프라인 상태에서는 사용이 어렵고, 하드웨어에 접근할 수 없다. 

2. 네이티브 앱
* 실행속도가 빠름, 플랫폼에서 제공하는 다양한 API를 사용할 수 있다. 
* 하드웨어에 접근이 용이하다. 

But, 플랫폼에 한정적이라는 단점이 존재한다. 많은 시간과 비용을 투자해야 한다. 

3. PWA = 웹앱 + 네이티브앱
* PWA 대표 기능 
1. 푸쉬 알림 
2. 오프라인 환경 지원
3. 홈화면에 추가

* 사용자가 다시 앱으로 돌아올 수 있도록, Push 알림기능을 제공한다.

```
이러한 기능들은 HTTPS를 요구한다. PWA를 만들기 위한 요건 중 하나  
```

![image](https://user-images.githubusercontent.com/63600953/175566870-0a61c76b-ac92-47ac-8757-8b175ad0bdc7.png)

# PWA 의 요건

PWA를 만들기 위한 필수 요건 3가지
```
1. HTTPS
2. Service Worker
3. Manifest
```

### 1. HTTPS
보안이 연결된, 신뢰할 수 있는 사이트에서만 동작하기 때문에 웹페이지는 HTTPS 도메인에서 제공되어야 한다. 

* HTTP `=>` 80번 포트 작동 (로그인 하는 서비스 X, 정적 페이지만 보여준다)
  * ex) http://naver.com:80과 http://naver.com과 동일
    

* HTTP(S) `=>` 443번 포트 작동 (로그인 하는 서비스 O, )
    * https://naver.com:443과 https://naver.com:443 과 동일


### 2. Service Worker (서비스 워커)
* 백그라운드 환경에서도 실행되는 JS 파일 형태의 스크립트. 오프라인 환경에서도 웹이 작동할 수 있도록 네트워크 요청을 가로채서 네트워크 불량상태등 
접속 불량인 상태를 커버한다. 
  
* 서비스 워커는 네트워크 요청을 중간에 가로챌 수 있기 때문에 https 기반에서만 동작한다. 

`중간자 공격` <br/>
: Client에서 Server로 요청을 보낼 때, 중간에 아이디와 패스워드를 가로채고 응답을 그대로 보내줘서, 유저가 
아무것도 인지하지 못한채 신상 털리는 상황

### 3. Manifest (매니페스트)
* PWA가 설치되면 어떻게 작동해야 할 지 알려주는 JSON 파일이다. manifest 파일에는 URL과 앱이름, 화면 표시 방식등이 포함된다. 


# 웹페이지의 점수를 매기는 방법

1. Chrome LightHouse <br/> 
: Lighthouse(라이트 하우스)는 웹 페이지의 품질을 개선하기 위한 자동 오픈 소스 도구로, 성능, 접근성, PWA, SEO 등에 대한 검사를 진행할 수 있다. 


2. PWA Builder <br/>
: PWA Builder에서는 PWA의 3가지 요건을 만족하는지에 대한 점수를 매기고, Manifest와 Service Worker를 쉽게 작성할 수 있도록 도와줍니다.
   
# HTTPS 연결

1. GitHub Pages 활용 

2. ngrok 활용 <br/>
: 외부에서 로컬에 접속할 수 있도록 해주는 터널 프로그램. 보통 로컬 환경에서 SSL을 사용할 때나, localHost를 외부에서 호출할 때 사용한다. 
   

# Manifest에 들어가야 할 내용

1. `short_name` 또는 `name`
2. `icons` : 192px과 512px의 아이콘
3. `start_url`
4. `display` : fullscreen, standalone, minial-ui 중 하나이어야 함.
5. `prefer_related_aplications` : 존재하지 않거나 false이어야 함.