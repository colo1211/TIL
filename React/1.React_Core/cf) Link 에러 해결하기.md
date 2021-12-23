# `<Link>`태그 Warning 해결하기 


![image](https://user-images.githubusercontent.com/63600953/129671163-d56caeec-6a70-4888-94d9-7a6cadb4f6df.png)

````
<Navbar.Brand><Link to="/">Adadis</Link></Navbar.Brand>
````

Navbar 는 내부적으로 `<a>`태그로 이루어져 있고
Link 태그 또한 내부적으로 `<a>`태그로 이뤄져 있다. 

위 이미지에서 나온 Warning 메세지는 a태그 내부에 a태그를 한번 더 사용한 것 같다는 경고 메세지이다. 

이를 해결하기 위해서 다음과 같이 작성하면 해결된다. 

````
<Navbar.Brand as={Link} to="/">Adadis</Navbar.Brand>
````

* Navbar 태그를 Link 태그로써 사용하겠다는 의미로 as = { Link } 라고 사용하면 된다. 
`as={ Link }`
