# EventHandler

* Event Handler 함수에 파라미터를 넣는 방법 </br>
```
핵심 
1. Arrow Function 
2. 첫번째 인자 : param
3. 두번째 인자 : event
```

* 참고 문헌 : https://velog.io/@albaneo0724/React-onClick%EC%97%90-%ED%8C%8C%EB%9D%BC%EB%AF%B8%ED%84%B0-%EC%A0%84%EB%8B%AC%ED%95%98%EA%B8%B0
</br></br>


## 구현된 정도
![image](https://user-images.githubusercontent.com/63600953/134336482-c8be562b-87d9-409f-ba67-cd583b9d59d3.png)



> 여기서 게시물 리스트의 제목을 클릭하면 세부적인 페이지로 넘어가도록 구현

서버에게 조건에 부합하는 리스트를 요청하고 응답 받은 결과를 `NoticeList` state에 담아둔다. 

```
    // 글 목록을 담는 배열
    const [NoticeList, setNoticeList] = useState([]);


    // 조회버튼을 클릭할 때
        const onSubmitHandler = (e) => {
        e.preventDefault(); 
        let token = JSON.parse(localStorage.getItem('user')).accessToken;
             
        axios.get(`/api/board/school/${School}/list?date=${Date}&page=1&size=5`,
        {
            headers : {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response)=> setNoticeList(response.data.content))
        .catch((e)=> console.log(e));
    }

```
</br></br>

![image](https://user-images.githubusercontent.com/63600953/134337205-6d1c6311-1be6-4a23-8659-299657d87909.png)


## 막힌 곳 
* 현재 state에 서버로 부터 받은 정보를 담아두었고 이를 map함수를 활용하여 리스트를 출력하였다. 

* ⭐⭐⭐⭐⭐ 유저가 글의 제목을 클릭하면 세부 페이지로 이동하기 위해서는 `글의 id` 가 필요한데, 이를 onClick 함수 로 구현하기 위해서는 파라미터로 id를 전달해야한다. 



`onClick 함수`
* Arrow Function을 활용
* 첫번째 인자로 전달할 Param을 넣어주고
* 두번째 인자로 event 를 전달한다. 
![image](https://user-images.githubusercontent.com/63600953/134338168-1c5c86cc-0cd4-4359-ae65-84a9356f62b6.png)


`DetailPage 함수`
* 동일하게 받아온다. 
![image](https://user-images.githubusercontent.com/63600953/134338078-0c02d703-4c20-4780-a855-20c47432a4bc.png)
