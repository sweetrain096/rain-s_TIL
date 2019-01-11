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





## 10998번 [A/B](https://www.acmicpc.net/problem/10998)

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





## 1008번 [A/B](https://www.acmicpc.net/problem/1008)

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



## 10869번 [사칙연산](https://www.acmicpc.net/problem/10869)



```
문제
두 자연수 A와 B가 주어진다. 이때, A+B, A-B, A*B, A/B(몫), A%B(나머지)를 출력하는 프로그램을 작성하시오. 

입력
두 자연수 A와 B가 주어진다. (1 ≤ A, B ≤ 10,000)

출력
첫째 줄에 A+B, 둘째 줄에 A-B, 셋째 줄에 A*B, 넷째 줄에 A/B, 다섯째 줄에 A%B를 출력한다.

예제 입력 1 
7 3
예제 출력 1 
10
4
21
2
1
```



```python
a, b = input().split(' ')
A = int(a)
B = int(b)

print(A+B)
print(A-B)
print(A*B)
print(int(A/B))
print(A%B)
```





## 10430번 [나머지](https://www.acmicpc.net/problem/10430)

```
문제
(A+B)%C는 (A%C + B%C)%C 와 같을까?

(A×B)%C는 (A%C × B%C)%C 와 같을까?

세 수 A, B, C가 주어졌을 때, 위의 네 가지 값을 구하는 프로그램을 작성하시오.

입력
첫째 줄에 A, B, C가 순서대로 주어진다. (2 ≤ A, B, C ≤ 10000)

출력
첫째 줄에 (A+B)%C, 둘째 줄에 (A%C + B%C)%C, 셋째 줄에 (A×B)%C, 넷째 줄에 (A%C × B%C)%C를 출력한다.

예제 입력 1 
5 8 4
예제 출력 1 
1
1
0
0
```



```python
a, b, c = input().split(' ')
A = int(a)
B = int(b)
C = int(c)

print((A+B)%C)
print((A%C + B%C)%C)
print((A*B)%C)
print((A%C * B%C)%C)

```



## 2558번 [A+B - 2](https://www.acmicpc.net/problem/2558)



```
A+B - 2 성공
시간 제한	메모리 제한	제출	정답	맞은 사람	정답 비율
1 초	128 MB	30019	21850	20156	75.661%
문제
두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.

입력
첫째 줄에 A, 둘째 줄에 B가 주어진다. (0 < A, B < 10)

출력
첫째 줄에 A+B를 출력한다.

예제 입력 1 
1
2
예제 출력 1 
3
```



```python
a = int(input())
b = int(input())
print(a+b)
```





## 2839번 [설탕 배달](https://www.acmicpc.net/problem/2839)

```
문제
상근이는 요즘 설탕공장에서 설탕을 배달하고 있다. 상근이는 지금 사탕가게에 설탕을 정확하게 N킬로그램을 배달해야 한다. 설탕공장에서 만드는 설탕은 봉지에 담겨져 있다. 봉지는 3킬로그램 봉지와 5킬로그램 봉지가 있다.

상근이는 귀찮기 때문에, 최대한 적은 봉지를 들고 가려고 한다. 예를 들어, 18킬로그램 설탕을 배달해야 할 때, 3킬로그램 봉지 6개를 가져가도 되지만, 5킬로그램 3개와 3킬로그램 1개를 배달하면, 더 적은 개수의 봉지를 배달할 수 있다.

상근이가 설탕을 정확하게 N킬로그램 배달해야 할 때, 봉지 몇 개를 가져가면 되는지 그 수를 구하는 프로그램을 작성하시오.

입력
첫째 줄에 N이 주어진다. (3 ≤ N ≤ 5000)

출력
상근이가 배달하는 봉지의 최소 개수를 출력한다. 만약, 정확하게 N킬로그램을 만들 수 없다면 -1을 출력한다.

예제 입력 1 
18
예제 출력 1 
4
예제 입력 2 
4
예제 출력 2 
-1
예제 입력 3 
6
예제 출력 3 
2
예제 입력 4 
9
예제 출력 4 
3
예제 입력 5 
11
예제 출력 5 
3
```







```python
N = int(input())
k = 0
if (N/5)==int(N/5) :
    k = N/5
    print(int(k))
else :
    while(1) :
        if N>5 :
            if (N<15) and (N/3==int(N/3)):
                k = k+int(N/3)
                print(k)
                break
            else :
                N=N-5
                k=k+1
        else :
            if int(N)==int(3) :
                k=k+1
                print(k)
                break
            else :
                print("-1")
                break

```





# 2741번[N 찍기](https://www.acmicpc.net/problem/2741)

```
문제
자연수 N이 주어졌을 때, 1부터 N까지 한 줄에 하나씩 출력하는 프로그램을 작성하시오.

입력
첫째 줄에 100,000보다 작거나 같은 자연수 N이 주어진다.

출력
첫째 줄부터 N번째 줄 까지 차례대로 출력한다.

예제 입력 1 
5
예제 출력 1 
1
2
3
4
5
```



```python
n = int(input())
for i in range (n) :
    print(i+1)
```









