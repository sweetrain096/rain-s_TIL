python 특정 위치의 라이브러리 사용하기





```python
import sys

sys.path.insert(0, "해당 위치")
sys.path.insert(0, "/usr/bin/site-packages")

```

리눅스에서 대부분의 파일은 bin에서 관리하도록 한다.

이 폴더는 대부분 루트 관리자가 가지고 있다.



여기에서는

```shell
drwxr-xr-x   3 root root 69632 Aug  6 13:05 bin
```

내가 사용하는 사용자와 그룹이 다르기 때문에 모든 사용자 권한을 열어주었다가, 사용

pip로 설치 시 



```shell
$ pip3 install --target=/usr/bin/site-packages package이름
```

이렇게 명령하면 특정 위치에 맞게 설치가 된다.

이 때 설치가 되지 않으면 위에서 쓴 권한이 없기 때문.

모든 권한을 열어주기 위해서는 



```shell
$ chmod o+w bin
```

설치할 폴더의 상단 디렉토리에 들어가서 해당 디렉토리의 쓰기 권한을 열어준다.

기본적으로 열려있는것에 따라 다르나, 보통 읽고 실행은 가능할것이다.



사용자는 u, 그룹 소유자는 g, 기타 사용자는 o로 표시하며

추가할 권한은 +, 제거할 권한은 -로 표시한다. 유지할 경우는 = 로 표시한다.

각 권한은 r : 읽기, w : 쓰기, x : 실행 으로 구분된다.

때문에 위의 명령어는 기타 사용자가 bin 디렉토리에 대한 쓰기 권한을 부여받는다는 뜻이다.

만약 `Operation not permitted` 에러가 뜨게 되면 이것을 수정할 권한도 없다는 뜻이다.

이 경우에는 다음과 같이 관리자 권한으로 실행한다.

```shell
$ sudo chmod o+w bin
```

`sudo` 명령어는 리눅스에서 관리자 권한의 명령어이다. 이렇게 관리자 권한을 실행하게 되면 패스워드를 입력하라는 창이 뜬다.

이 부분을 수정하게 되면 확인이 가능하다.



확인은 아래 명령어로 진행한다.

```shell
$ ls -al
```

`ls` 명령어는 기본적으로 디렉토리 안의 폴더와 파일명을 출력해주는 명령어이다. 

이 뒤에 -al 명령어를 덧붙여 각 파일에 대한 권한과, 바로가기 연결수, 소유자, 그룹소유자, 파일크기, 마지막 변경 날짜와 시간, 파일명 순으로 출력이 된다.



변경을 해서 설치가 끝났다면 권한은 처음 설정대로 고쳐주는 것이 좋다.

다른 사용자가 들어와서 설치를 하거나 수정을 하는 경우를 최소화 하게 만들어준다.

