# npm 설치 오류 

참고 : https://iancoding.tistory.com/154

* 에러 

![image](https://user-images.githubusercontent.com/63600953/137474026-4a9f06a5-bff7-4a79-bfb8-36cbd1bcd4cc.png)

* 해결 방안

npm install 뒤에 --save --legacy-peer-deps  를 추가해주면 된다.
  
```
> npm install react-paypal-express-checkout --save --legacy-peer-deps
```