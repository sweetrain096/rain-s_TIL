# 백준 알고리즘 문제 풀이(Python3.6)



## 2557번 [Hello World](https://www.acmicpc.net/problem/2557)

```
문제
Hello World!를 출력하시오.

입력
없음

출력
Hello World!를 출력하시오.

예제 입력 1 
예제 출력 1 
Hello World!
```



```python
print("Hello World!")
```





## 1000번 [A+B](https://www.acmicpc.net/problem/1000)

```
문제
두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.

입력
첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)

출력
첫째 줄에 A+B를 출력한다.

예제 입력 1 
1 2

예제 출력 1 
3
```



```python
a, b = input().split()
a = int(a)
b = int(b)
print(a+b)
```





## 1001번 [A-B](https://www.acmicpc.net/problem/1001)

```
문제
두 정수 A와 B를 입력받은 다음, A-B를 출력하는 프로그램을 작성하시오.

입력
첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)

출력
첫째 줄에 A-B를 출력한다.

예제 입력 1 
3 2
예제 출력 1 
1
```



```python
A, B = input().split()
print(int(A)-int(B))
```





## 10172번 [개](https://www.acmicpc.net/problem/10172)

```
문제
아래 예제와 같이 개를 출력하시오.

입력
없음.

출력
개를 출력한다.

예제 입력 1 
예제 출력 1 
|\_/|
|q p|   /}
( 0 )"""\
|"^"`    |
||_/=\\__|
```



```python
print('|\_/|\n|q p|   /}\n( 0 )\"\"\"\\')
print('|\"^\"`    |\n||_/=\\\__|')
```





## 10718번 [We love kriii](https://www.acmicpc.net/problem/10718)

```
문제
ACM-ICPC 인터넷 예선, Regional, 그리고 World Finals까지 이미 2회씩 진출해버린 kriii는 미련을 버리지 못하고 왠지 모르게 올 해에도 파주 World Finals 준비 캠프에 참여했다.

대회를 뜰 줄 모르는 지박령 kriii를 위해서 격려의 문구를 출력해주자.

입력
본 문제는 입력이 없다.

출력
두 줄에 걸쳐 "강한친구 대한육군"을 한 줄에 한 번씩 출력한다.

예제 입력 1 
예제 출력 1 
강한친구 대한육군
강한친구 대한육군
```



```python
#-*- coding: utf-8 -*-
print("강한친구 대한육군\n강한친구 대한육군")
```





## 11718번 [그대로 출력하기](https://www.acmicpc.net/problem/11718)

```
문제
입력 받은 대로 출력하는 프로그램을 작성하시오.

입력
입력이 주어진다. 입력은 최대 100줄로 이루어져 있고, 알파벳 소문자, 대문자, 공백, 숫자로만 이루어져 있다. 각 줄은 100글자를 넘지 않으며, 빈 줄은 주어지지 않는다. 또, 각 줄은 공백으로 시작하지 않고, 공백으로 끝나지 않는다.

출력
입력받은 그대로 출력한다.

예제 입력 1 
Hello
Baekjoon
Online Judge
예제 출력 1 
Hello
Baekjoon
Online Judge
```



```python
try :
    for i in range(100):
        a = input()
        print(a)

except EOFError :
    pass
```







## 11719번 [그대로 출력하기 2](https://www.acmicpc.net/problem/11719)

```
문제
입력 받은 대로 출력하는 프로그램을 작성하시오.

입력
입력이 주어진다. 입력은 최대 100줄로 이루어져 있고, 알파벳 소문자, 대문자, 공백, 숫자로만 이루어져 있다. 각 줄은 100글자를 넘지 않으며, 빈 줄이 주어질 수도 있고, 각 줄의 앞 뒤에 공백이 있을 수도 있다.

출력
입력받은 그대로 출력한다.

예제 입력 1 
    Hello

Baekjoon     
   Online Judge    
예제 출력 1 
    Hello

Baekjoon     
   Online Judge    
```



```python
try :
    for i in range(100):
        a = input()
        print(a)

except EOFError :
    pass
```





## 10998번 A/B

```
문제
두 정수 A와 B를 입력받은 다음, A/B를 출력하는 프로그램을 작성하시오.

입력
첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)

출력
첫째 줄에 A/B를 출력한다. 절대/상대 오차는 10-9 까지 허용한다.

예제 입력 1 
1 3
예제 출력 1 
0.33333333333333333333333333333333
예제 입력 2 
4 5
예제 출력 2 
0.8
```



```python
N = input().split(" ")
a = int(N[0])/int(N[1])
print(round(a,9))
```





## 1008번 A/B

```
문제
두 정수 A와 B를 입력받은 다음, A/B를 출력하는 프로그램을 작성하시오.

입력
첫째 줄에 A와 B가 주어진다. (0 < A, B < 10)

출력
첫째 줄에 A/B를 출력한다. 절대/상대 오차는 10-9 까지 허용한다.

예제 입력 1 
1 3
예제 출력 1 
0.33333333333333333333333333333333
예제 입력 2 
4 5
예제 출력 2 
0.8
```



```python
N = input().split(" ")
a = int(N[0])/int(N[1])
print(round(a,9))
```

