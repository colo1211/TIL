# Detail Page 만드는 방법


## 1. 라우팅 작업, `App.js`

![image](https://user-images.githubusercontent.com/63600953/134341154-7f7d7dd2-dec9-4941-96a9-1d909cd7b91d.png)

</br></br>


## 2. useParams Hook `DetailPage.js`
* params를 통해서 사용자가 detail/2라고 적었다면 2를 id 값으로 받아와서 데이터 바인딩 할수 있게끔 사용해주는 변수

* detail/2 접속시 => props.shies[id].price 

* 하드코딩을 통한 데이터 바인딩이 아니라 유동적으로 user가 입력한 값을 받아와서 사용이 가능하다. 

* {id, id2} 를 통해서 사용자가 입력한 값을 가져 올 수 있다. 



![image](https://user-images.githubusercontent.com/63600953/134341586-7f9ef606-cd4e-47c2-a0b1-2890d6c49a8b.png)


* 띄워진 화면
![image](https://user-images.githubusercontent.com/63600953/134341911-eb323f5e-6085-411a-84f7-8014490308a4.png)


</br></br>

##  3. 이동하는 방법 (이동 Trigger)
* History Hook을 활용하면 쉽게 이동 가능
* `history.push(`detail/${id}`)`
![image](https://user-images.githubusercontent.com/63600953/134342113-3df6434e-aec3-4942-925a-3f78d9740950.png)
