# React Bootstrap 

* React에 Bootstrap 적용하기
  

  https://react-bootstrap.github.io/ 에 접속하여 </br>
  `Getting Start` 클릭

 v4.6 기준
> 1. 설치

Terminal
```
> cd client
> npm install react-bootstrap bootstrap
```
</br></br>
[ public / index.html ] 에 CDN 방식으로 첨부 
```
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
  integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
  crossorigin="anonymous"
/>
```

</br></br>

> 2. 적용

예를 들어 버튼 컴포넌트를 가져오려면
해당 컴포넌트의 상단에 
```
import { Button } from 'react-bootstrap';
```

참고) React Bootstrap 에서 컴포넌트형식으로 가져와도 되고 그냥 일반 부트스트랩에서 복붙도 가능


