# Git Branch

![image](https://user-images.githubusercontent.com/63600953/135201036-7e08db0d-365f-4666-bd61-8a5f1b7970fb.png)

* Branch 가 없는 기존의 환경에서는 매번 Pull을 해주면서 업데이트에 대한 내역들을 미리 받은 후, commit을 진행한다. 

* 하지만 이러한 과정들은 매우 복잡하고 귀찮은 일이다. 따라서 나오게 된 것이 `git Branch` 이다.

> git branch 

`어차피 따로 개발하는 거, 작업 공간을 나누어 놓고 나중에 한번에 합치자!`

![image](https://user-images.githubusercontent.com/63600953/135201546-c603b0a5-7e3e-45f5-bb8e-dcac5b386617.png)

* a와 c까지 커밋을 한 이후에, main branch 에 a와 c 커밋이 존재, 
* 이제부터 따로 개발을 하고 싶어서 1번사람은 그대로 main branch에 d커밋을 함
* 2번 사람은 새로운 branch gitrini를 파서 q커밋을 한다. 
  

* Branch를 합치고 싶을 때, `Merge`를 하고 이를 `Pull Request(PR)`이라고 부른다. 


* PR을 할 때, 역시 같은 파일의 같은 라인이 수정되어 Conflict 가 발생한다면 이를 하나만 선택해서 해결해야 한다. 

# Branch 명령어

![image](https://user-images.githubusercontent.com/63600953/135203012-e64a42ce-55c2-41fc-b287-4ced267916dd.png)

* `git branch` : 현재 생성되어 있는 branch 의 list를 띄워준다. 
  

* `git branch newfeature` : 새로운 branch 를 만들때 사용한다. 


* `git checkout newfeature` : newfeature 라는 branch 로 이동한다. 


* `git branch -D newfeature` : newfeature 라는 branch 를 삭제한다. 


* `git push origin 브랜치 이름` : 특정 branch 를 깃헙에 푸쉬  


* `git pull origin 브랜치 이름` : 특정 브랜치를 깃헙에서 가져와서 최신 업데이트 

### Pull Request(PR) 은 GitHub 상에서 버튼으로 조작

![image](https://user-images.githubusercontent.com/63600953/135203517-35c1c708-cd79-41c0-8183-ef7ee977c25f.png)

* `gitrini branch` 를 `main branch` 에 넣어준다.

![image](https://user-images.githubusercontent.com/63600953/135203654-e8cab70a-03fe-4403-a4bb-c7ee54e387df.png)

# 협업하는 방식 - Branch로 협업하는 방식(PR, Approve, Comment)

* branch를 사용하게 하기 위한 접근 권한을 주기 

* 권한이 있는 사람은 누구나 Merge를 할 수 있다. 

* But 팀끼리 규칙을 정한다. 몇 명 이상이 Approve(승인)을 했을 때 Merge를 한다. 

![image](https://user-images.githubusercontent.com/63600953/135203911-0c978712-586f-4d42-9fc1-808e73b2715d.png)



