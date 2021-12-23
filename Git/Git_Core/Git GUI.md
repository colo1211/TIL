# Git GUI (Source Tree)

* 우선 GUI를 학습하기 전 명심할 것, GUI는 필수 사항이 아니다. 
근본인 CLI를 완벽하게 사용할 수 있다면 GUI는 사용하지 않아도 전혀 상관 없다. GUI를 익힐 시간에 CLI를 더욱 익숙하게 하여 Git의 근본을 익히자. 
  

> git init

.git 폴더는 git init 명령어를 통해서 폴더 내에 직접 만들어 주어야 한다. 

> git add .

![image](https://user-images.githubusercontent.com/63600953/135016031-b5a6b1eb-e465-4802-8a89-dc610955550d.png)

> git commit -m "커밋할 메세지" 

![image](https://user-images.githubusercontent.com/63600953/135016276-fb02e2bd-bbb1-4be1-81aa-9c9988f03780.png)

> git log

git commit -m "커밋할 메세지" 이후, 커밋한 내역들을 볼 수 있는 버튼 History

![image](https://user-images.githubusercontent.com/63600953/135016428-497dfb70-3ee7-47ae-94a0-fb8fcceab88a.png)

> git reset --hard 

![image](https://user-images.githubusercontent.com/63600953/135016604-5166bf8e-4b9a-4c41-9941-22f36be9d3a1.png)

![image](https://user-images.githubusercontent.com/63600953/135016663-04830f8e-930b-4319-b07c-cbbaacd71e29.png)


> git add remote (원격 설정)
* push 를 하기 이전에 Local 서버에서 Remote 서버로 요청을 보내기 위한 `git add remote`

![image](https://user-images.githubusercontent.com/63600953/135016903-8e0ec01a-65b1-4c62-b1ee-d3159aa72535.png)

github에 repository를 생성한 이후에 주소를 복사 붙여넣기 해준다. 

![image](https://user-images.githubusercontent.com/63600953/135017048-2cfd85da-ba75-455c-a7cd-235e2cd80bfa.png)

> git clone 

* 로컬 저장소가 삭제되었다고 가정한다면, 어떻게 클론 해 올 수 있을까

![image](https://user-images.githubusercontent.com/63600953/135017279-429b3da7-d91b-4a21-a7ec-4ca763fb6c3d.png)

![image](https://user-images.githubusercontent.com/63600953/135017750-64a00563-34d3-4b43-b13e-be5af5ca8831.png)


> git pull origin main

* github 서버에서 변동사항이 존재할 때 git pull origin main

![image](https://user-images.githubusercontent.com/63600953/135018050-2253e4c7-5c2a-4ad4-b7ee-a688994fd56c.png)

