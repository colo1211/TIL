# MongoDB Connect Error

![image](https://user-images.githubusercontent.com/63600953/132451703-74d24a5d-86f7-46dd-9c3f-1252d4efea6c.png)
- 다음과 같이 MongoDB Connect 에 대한 에러가 나오게 된다. 
위와 같은 문제가 생기는 이유는 MongoDB 클러스터에서 현재 사용하고 있는 PC의 IP 주소를 승인하지 않았기 때문에 발생하는 오류이다.
  
- 따라서, Mongodb Cloud에 방문하여 현재 사용 중인 IP 주소를 추가한다. 

1. 
![image](https://user-images.githubusercontent.com/63600953/132455656-326bb579-8976-46d9-a0ce-bc5e641efc33.png)
2. 현재의 IP주소를 Cluster에서 허용한다.   
![image](https://user-images.githubusercontent.com/63600953/132455872-dbb444a6-77de-40aa-800f-97e83613f8de.png)

참고 : https://velog.io/@kjy5947/mongoose%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-mongoDB%EC%97%B0%EA%B2%B0%EC%8B%9C-%EC%97%90%EB%9F%AC