# Git

`Git`은 분산형 버전 관리 시스템(DVCS - Distributed Version Control System)이다.

소스코드의 버전 관리를 할 수 있고, 이력이 관리된다.

### Git 사용 이유?

`git init` : 폴더 하나를 git 으로 관리하겠다

![Untitled Diagram](C:\Users\student\Downloads\Untitled Diagram.png)





윈도우에서 사용하기 위해 [git for windows (Git bash)](https://gitforwindows.org/)  설치.

사용하고자 하는 폴더에서 우클릭 -> Git Bash Here



## 기초 명령어 정리

### 0. git 초기 설정

```
$ git config --global user.name "유저 이름"
$ git config --global user.email "유저 이메일"
$ git config --global --list
```

설정 되면

```
user.name=sweetrain096
user.email=gpfhddl09@gmail.com
```

이렇게 출력됨.

github에서 사용하고자 하는 폴더에서 우클릭 -> Git Bash Here



### 1.  git 저장소 설정

```
$ git init
```

출력결과 : 
```
Initialized empty Git repository in C:/Users/student/Desktop/TIL/.git/
student@DESKTOP MINGW64 ~/Desktop/TIL (master)
#마스터로 변한다!!
```

**초기 init은 한번만 한다!!**

**주의! 반드시 현재 디렉토리에 git을 사용하고 있는지, (master)가 있는 지 확인할 것.



### 1. git add

`git add`는 현재 `working tree`에서 `commit`할 목록에 담아놓는 것이다.

그리고 그 목록은 `staging area`라고 한다.

```
$ touch a.txt
$ git add .
```

* git add a.txt를 해도 되지만, 우선 git add . 를 하자! -> 폴더에 있는 모든 파일을 업데이트한다.
* `.`은 리눅스 상에서 현재 디렉토리를 뜻한다.

```
$ git add kospi.py
```



### 2. git commit

`git commit`은 현재코드  `status` 를 스냅샷 찍는 것과 동일.

`staging area`에 담겨 있는 내용을 이력으로 기록한다.

```
$ git status
$ git commit -m "커밋 메시지"
```



### git status

git의 현재 상태를 확인한다. 자주자주 입력해보기

```
$ git status
```

****



## 원격 저장소로 보내기(push)

사전에 github에 저장소(repository)를 만들어 놓는다.

1. github 원격 저장소 : 이름을 `origin`으로 만들어준다(생성/설정). (1회만 하기)

```
$ git remote add origin 
https://github.com/sweetrain096/rain-s_TIL.git
```

2. 원격 저장소로 보낸다.(push)

```
git push -u origin master
```



## 원격 저장소에서 받기

디렉토리 하나를 생성 한 후 디렉토리에서 Git Bash Here

```powershell
$ git clone "주소"
```

![1545121319328](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1545121319328.png)









## 원격 저장소에서 가져오기(pull)

github 원격 저장소(repository)에서 변경된 커밋 내용(파일)을 가져오기 위해서는 `pull`명령어를 사용한다. 

```
$ git pull origin master
```



## 원격 저장소 복제하기(clone)

원격 저장소를 복제하기 위해서는 `clone` 명령어를 사용한다. 

clone은 한번만 진행. 이후 업데이트 사항은 pull로 가져온다.

```
$ git clone url(https://github.com/~~~.git)
```



