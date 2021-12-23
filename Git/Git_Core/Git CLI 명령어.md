# Git 기초 명령어

> git config --global

git을 설치하고 제일 먼저 해야할 일은 유저명과 유저 이메일을 정해주는 것
- `git config` 명령어를 통해서 할 수 있다.  git config 뒤에 global 이라는 명령어가 붙는 것은 
앞으로 이 컴퓨터에서 Git으로 관리하는 모든 프로젝트는 Global하게 모두 다 해당 유저 네임으로 할 것이라는 의미

![image](https://user-images.githubusercontent.com/63600953/134843669-1a57fb9f-8808-4fb5-8b1e-222dad1973ee.png)

![image](https://user-images.githubusercontent.com/63600953/134843470-a950fdfb-818c-43f5-9d8b-d0162f489034.png)

---
# CMD(Terminal) 기본 명령어

* 왼쪽(GUI)과 오른쪽(CLI)의 위치는 현재 완전하게 동일

![image](https://user-images.githubusercontent.com/63600953/134843864-10dc9fb0-bfe1-4b74-97c7-9727e89fbd3f.png)

1. `dir` : `리스트 보기`, 오른쪽 CLI에서 현재 폴더 내에 어떤 파일이 존재하는지 확인하고 싶다면 `dir` 을 입력

![image](https://user-images.githubusercontent.com/63600953/134844061-4eb48dab-a892-4e5d-bfe3-257b8b9a06b9.png)

[ TIP ]
* 숨겨진 파일 보는 방법
* 보통 .git은 숨김 파일이기 때문에 dir 만 해서는 조회가 불가능하다. 따라서, `dir/ah` 를 통해서 조회한다. 

```
> dir/ah
```
![image](https://user-images.githubusercontent.com/63600953/134862516-c1a40e6f-dbbb-4321-93c1-99352d5fa443.png)



2. `cd` : `앞으로 이동`, `change directory` 의 약자로, 이동할 때 사용하는 명령어
  
3. `cd ..` : `뒤로 가기`

4. `mkdir` : `새폴더 만들기`, `mkdir 폴더명` 을 하게 되면 폴더가 생성된다.  

Cf ) GUI 환경의 주소창에서 `cmd` 를 입력하면 CLI 환경 (터미널)에서 해당 위치로 단번에 이동한다.
* 빨간색 네모 칸 영역을 클릭하고 cmd 라고 입력하면 바로 터미널에서 이동이 가능하다. 

![image](https://user-images.githubusercontent.com/63600953/134844877-19256a62-cfd0-4f0d-944e-b1a1e4730bae.png)




정리

![image](https://user-images.githubusercontent.com/63600953/134844507-0274f75a-c2fa-44ec-8ce8-47b305f7e16f.png)

---

# git init, git commit, git log의 이해

![image](https://user-images.githubusercontent.com/63600953/134849506-62341534-9f2d-43b9-99ce-807b3270f6fd.png)

> 다같이 모여 사진을 찍는다는 비유

* git init : 사진사 고용, 한 프로젝트를 관리 할 때 최초 1회만 하면 됨
* git add : 사진 찍을 사람들을 모집, 사진을 찍을때마다 사람이 달라질수 있기 때문에 매번 해주어야 함
* git commit : 사진 찍기 (찰칵), 매번 해주어야 함

* git log : 사진 찍은 결과물을 앨범처럼 볼 수 있는 명령어

![image](https://user-images.githubusercontent.com/63600953/134849749-3f8920ba-529b-4e62-b404-7fca29c8a49e.png)

---

# git 실습

![image](https://user-images.githubusercontent.com/63600953/134850938-5ff539ef-84d5-4e50-9e2a-252f28181e53.png)


![image](https://user-images.githubusercontent.com/63600953/134851263-69794e02-ac11-469c-b3e7-7a808740dfc1.png)


> git init

: 사진사 고용, git 관리를 받기 원하는 폴더로 이동 
</br> 
아래의 명령어를 입력하여 .git 폴더를 생성하면, 해당 폴더는 git의 관리가 가능해진다.  


> git status 

: 현재 사진을 찍기 위해서 사람들이 모여있는지 상태를 알려주는 명령어

* add 를 하기 이전의 status

![image](https://user-images.githubusercontent.com/63600953/134851437-d07e7ab9-1765-48f6-9c5a-fd7a696f6561.png)

* add 를 한 이후의 status

![image](https://user-images.githubusercontent.com/63600953/134851511-6f1a6535-024d-4a15-96a5-2f87be84e2e5.png)
</br></br>
> git add . 

: 사진을 찍기 위해서 사람들을 모으는 git 명령어, 해당 명령어를 입력하게 되면 사람들을 모으는 작업들을 하게 되며,
사진을 찍을수 있는 조건(git commit -m " 커밋 메세지") 을 만들어 둔다. 

![image](https://user-images.githubusercontent.com/63600953/134851880-a9e07271-d416-4a46-bb4f-5b16dd861abc.png)
</br></br>
> git commit -m " 커밋 메세지 "

: 사진 찍기 (찰칵!)
</br></br>
> git log

:  사진 찍은 결과물을 볼 수 있는 앨범

![image](https://user-images.githubusercontent.com/63600953/134852362-85d4230d-525f-4bf4-8979-930570171a99.png)
</br></br>

> git reset --hard

: 최종 커밋 바로 직전의 버전으로 돌려준다.
</br></br>
> git reset --hard [ 커밋 해시 코드 ]

: 특정 커밋 시점으로의 파일의 버전으로 돌려준다.

![image](https://user-images.githubusercontent.com/63600953/134852804-49bc18e1-5dcf-4a68-9961-9e1d17c155a3.png)

---

# GitHub에 연동하기

* `로컬 (Local)`: `클라이언트` , 지금 내가 가지고 있는 컴퓨터
* `리모트 (Remote, 원격)`: `서버` , 다른 사람 컴퓨터

![image](https://user-images.githubusercontent.com/63600953/134855812-364f1648-121d-4e4b-8d60-d250560959e9.png)

* 내가 보고있는 컴퓨터, 즉, 내가 앉아있는 곳에 있는 컴퓨터는 `로컬 컴퓨터`
* 내 컴퓨터가 아닌 다른 컴퓨터는 `리모트`

#### 깃과 깃허브의 Email과 UserName이 서로 같아야 잔디가 심어진다. 

* Git의 Email과 UserName 확인하는 방법
```
git config --list
```
![image](https://user-images.githubusercontent.com/63600953/134843669-1a57fb9f-8808-4fb5-8b1e-222dad1973ee.png)

## GitHub에 올리는 과정
[ gitProject / secondProject ]
> 1. git init

> 2. git add . 

> 3. git commit -m "commit message"

> 4. GitHub에 Repository 만들기
     
![image](https://user-images.githubusercontent.com/63600953/134859281-6d66a63f-95f4-4afe-96fe-f7543d6b31bc.png)
빨간색 네모 박스 안에 있는 명령어는 레포지토리를 로컬과 연동을 시키겠다는 명령어


> 5. git remote add origin https://github.com/colo1211/secondProject.git
* 최초 레포지토리를 만들때만 해주면 된다.
* Remote 서버와 연동 완료

> 6. git push origin main

정리
![image](https://user-images.githubusercontent.com/63600953/134859590-46a2f277-67c9-4bff-9688-860668c6c3ea.png)

---
## 로컬에서 폴더를 지웠을 때 대처법 (Clone)
* 최초 1회는 clone
```
git clone https://github.com/colo1211/secondProject.git
```

GitHub에 저장되어 있던 폴더들이 로컬에 다시 잘 들어옴을 확인 할 수 있다. 

## 서버(GitHub Repo)에서 파일이 추가되거나 변동이 생긴다면?

ex) README.md 파일을 추가했다면 나의 로컬 폴더에 어떻게 가져올까? pull (당겨오다)

* clone 이후에는 pull
```
git pull origin main
```
---
![image](https://user-images.githubusercontent.com/63600953/134861151-dcd03e26-bf8e-45ee-b729-9177b06a8664.png)


---
## .gitignore

* 올리고 싶지 않은 파일들을 선택해서 막는 방법 
  
⚠ 주의 사항
: .gitignore 을 할 때, 확장자를 .txt로 설정하는 것이 아닌 확장자가 없어야 한다. 
