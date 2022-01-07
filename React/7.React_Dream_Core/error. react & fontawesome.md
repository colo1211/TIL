# React & fontawesome

* 참고 레퍼런스
: https://velog.io/@winney_77/TIL-35-day-react%EC%97%90%EC%84%9C-font-awesome-%EC%93%B0%EA%B8%B0

* 그동안 `npm` 환경으로 라이브러리를 관리하였지만, `yarn` 으로 구축함에 따라 좀 버벅거리는 중 인것 같다. 

* HTML / CSS 환경에서 fontawesome을 사용하였을 때는 CDN 방식으로 HTML 파일에 script 태그로써 첨부해주면 끝나는 작입이지만, 
React 환경에서는 다른 방법으로 접근해야 한다. 
  

### React 에서 fontawesome 을 사용하는 방법

1. 터미널에서 아래의 라이브러리를 모두 다운로드 받아온다. 
```
npm i --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/free-brands-svg-icons
npm install --save @fortawesome/free-regular-svg-icons
npm install --save @fortawesome/react-fontawesome
npm install --save @fortawesome/fontawesome-free
```

2. `src/index.js` 파일에서 import 한다. 

```
import "@fortawesome/fontawesome-free/js/all.js"
```

3. 사용하고 싶은 아이콘을 fontawesome에서 복사해서 붙여넣는다. 

```
<i class="fas fa-coffee"></i>
```
