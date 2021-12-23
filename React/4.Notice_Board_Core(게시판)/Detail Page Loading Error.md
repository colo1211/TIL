# Detail Page Loading Error (비동기 처리)

![image](https://user-images.githubusercontent.com/63600953/134448029-486242ec-09e1-42a6-b3af-d0190d738120.png)

* 클릭하면 ReadPage Component -> DetailPage Component
```
ReadPage -> DetailPage 
```

`DetailPage.js`
* 처음에 다음과 같이 페이지 이동함과 동시 useEffect Hooks 를 사용하여 서버로 부터 데이터를 받아와서 
DetailPage 에 띄울 생각
  
* 서버로 부터 받아온 데이터를 ⭐⭐⭐⭐⭐ DetailContents 에 담아온다. 

```
import React, { useEffect, useState } from 'react'
import { useParams,useHistory } from 'react-router'
import axios from 'axios'; 
import {Button} from 'react-bootstrap';

const DetailPage = () => {

    const history = useHistory(); 
    const { id } = useParams(); 
    const [DetailContents, setDetailContents] = useState(null); 
    
    useEffect(()=>{
        let token = JSON.parse(localStorage.getItem('user')).accessToken;

        axios.get(`/api/board/${id}`, {
            headers : {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response)=>{
            setDetailContents(response.data);
            console.log(DetailContents); 
        })
        .catch((e)=>console.log(e))
        .finally(()=>{
            console.log('기다려')
        });
    },[]);

    return (
        <div className='container'>
             <div>
                    <h2>{DetailContents.title}</h2> 
                    <p>작성자 : {DetailContents.author}</p>
                    <p>실험 일자 : {DetailContents.doDate}</p>
                    <p>학교 : {DetailContents.schoolName}</p>
                    <p>연락처 : {DetailContents.contact}</p>
                    <p>실험 장소 : {DetailContents.place}</p>         
                </div>
            <Button className= 'btn btn-primary' onClick={()=>{history.goBack()}}>뒤로 가기</Button>
        </div>
    )
}

export default DetailPage
```

`⭐⭐⭐⭐⭐⭐문제점(에러)`
### DetailContents.title 을 찾을수 없습니다. 
![image](https://user-images.githubusercontent.com/63600953/134448542-a3f37b39-8db8-43b6-9a4a-f4d5f7656ceb.png)

`알게된 이유`
* DetailContents를 출력해보니 null이 출력되었음
```
.then((response)=>{
            setDetailContents(response.data);
            console.log(DetailContents); 
        })
```


`에러 이유`
```
useEffect를 사용하여 서버에서 Detail한 글의 게시물 정보를 받아오는 데는 대략 3초라고 가정한다면, 
Detail Component는 로딩되자마자 DetailContents에 담겨있는 정보를 바로 요구하여 에러를 뿜어낸다. 
```

`해결한 방법`
* 고민한 것에 비해 의외로 해결방법은 간단했다. 
* JSX 에서 조건문을 사용해주면 해결된다. 
* 만약 DetailContents가 비어있다면 null을 출력하고, 서버로 부터 정보를 받아와서 DetailContents가 차있다면 정보를 뽑아내서 
요구한 정보를 출력하면 된다. 
  
```
return (
        <div className='container'>
            {
                DetailContents && 
                <div>
                    <h2>{DetailContents.title}</h2> 
                    <p>작성자 : {DetailContents.author}</p>
                    <p>실험 일자 : {DetailContents.doDate}</p>
                    <p>학교 : {DetailContents.schoolName}</p>
                    <p>연락처 : {DetailContents.contact}</p>
                    <p>실험 장소 : {DetailContents.place}</p>         
                </div>
            }
            <Button className= 'btn btn-primary' onClick={()=>{history.goBack()}}>뒤로 가기</Button>
        </div>
    )
```

`고민했던 사항들`
```
비동기문제 + JSON 변환문제
고민 1. Redux 로 보내버려..? -> Detail Page에서만 사용될꺼기 때문에 비효율적....
고민 2. 일단 Params는 있어야 Detail Page 진행이 되긴함....
고민 3. 굳이 detail page 내부에서 axios 통신을 해야하나...? -> 시도해보자 props로
고민 4. 차라리 Detail 페이지를 띄우지말고 모달창을 만들어서 Detail한 정보를 보여줄까..? 
```