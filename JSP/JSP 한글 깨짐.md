# JSP 한글 깨짐 현상

1. GET 방식에서 한글이 깨질 경우

톰캣 서버의 server.xml 파일
```
<Connector connectionTimeout="20000" port="8090" protocol="HTTP/1.1" redirectPort="8443" URIEncoding="EUC-KR" />
```
![image](https://user-images.githubusercontent.com/63600953/205489401-ada67dab-2e4e-4c57-84c0-0037ea9f1537.png)


2. POST 방식에서 한글이 깨질 경우
jsp 문장의 제일 처음 아래의 문장을 추가
   
```
<% request.setCharacterEncoding("EUC-KR"); %>
```

