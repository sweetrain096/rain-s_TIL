# Jupyter notebook

Jupyter notebook : 웹브라우저에서 파이썬 코드를 작성하고 실행할 수 있는 플랫폼(?) 

python 코드를 직접 실행하고 결과를 확인할 수 있으며, 마크다운 형식으로 필요한 내용을 정리 가능.



[Jupyter notebook 공식 홈페이지](https://jupyter.org/)



## 1. Jupyter notebook 설치

바탕화면에서 Git Bash를 열고 코드 실행

```powershell
$ pip install jupyter
```



사용할 extensions [**jupyter_contrib_nbextensions**](https://github.com/ipython-contrib/jupyter_contrib_nbextensions)

주피터 노트북 활용을 편하게 해주는 확장 프로그램.



```powershell
$ pip install jupyter_contrib_nbextensions

$ jupyter contrib nbextension install --user
```



사용할 폰트 [naver d2코딩폰트](https://github.com/naver/d2codingfont/releases/tag/VER1.3.2)



D2CodingAll 들어가서 폰트 설치 후 user/.jupyter/custom

```
#custom.css

.CodeMirror {font-family : D2Coding;}
```



+ 편하게 줄여쓰기

```bash
vi ~/.bash_profile
alias jn="jupyter notebook"
```

