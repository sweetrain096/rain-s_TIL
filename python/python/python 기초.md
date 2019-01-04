# python  기초

## 함수

### **활용법**

```
def func(parameter1, parameter2):
    code line1
    code line2
    return value
```

* 함수 선언은 `def`로 시작하여 `:`으로 끝나고, 다음은 `4spaces 들여쓰기`로 코드 블록을 만든다

* 함수는 `매개변수(parameter)`를 넘겨줄 수도 있다.

* 함수는 동작후에 `return`을 통해 결과값을 전달 할 수도 있다. (`return` 값이 없으면, None을 반환.)

* 함수는 호출을 `func(val1, val2)`와 같이 한다.



![1546504042236](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1546504042236.png)



### 기본 값 (Default Argument Values)

함수가 호출 될 때, 인자를 지정하지 않아도 기본 값 설정 가능.

**활용법**

```python
def func(p1=v1):
    return p1
```



```python
def greeting2(name="익명") :
    print(f"안녕, {name}")
greeting2()
greeting2("rain")
```

실행 결과 

```
안녕, 익명
안녕, rain
```



**함수 변수의 순서가 중요!!**

```python
def greeting(name="rain", age) :
    print(f"{age}, rain")
greeting(3)
```

실행 결과 

```
  File "<ipython-input-2-c62a2a7eee37>", line 2
    def greeting(name="rain", age) :
                ^
SyntaxError: non-default argument follows default argument
```



```python
def greeting(age, name="rain") :
    print(f"{age}, {name}")
greeting(3)
greeting(1, "ssafy")
```

실행 결과

```
3, rain
1, ssafy
```



### 키워드 인자(Keyword Arguments)

키워드 인자는 직접적으로 변수의 이름으로 특정 인자를 전달

```python
def greeting(age, name='ssafy'):
    print(f'{name}은 {age}살입니다.')

# 다양하게 함수를 호출해봅시다.
greeting(name="승만", age=5)
greeting(24, name="동명")
greeting(age=5, name="민교")

greeting(age=24, "철수")
# 마지막줄 에러
```

```
승만은 5살입니다.
동명은 24살입니다.
민교은 5살입니다.

  File "<ipython-input-29-7f2388caa1be>", line 2
    greeting(age=24, "철수")
                    ^
SyntaxError: positional argument follows keyword argument
```



### 정의되지 않은 인자 처리

정의되지 않은 인자들은 `dict` 형태로 처리가 되며, `**`로 표현합니다.

주로 `kwagrs`라는 이름을 사용하며, `**kwargs`를 통해 인자를 받아 처리할 수 있습니다.

**활용법**

```
def func(**kwargs):
```



```python
def my_fake_dict(**kwarg) :
    for key, value in kwarg.items() :
        print(key, value, sep=" : ", end=", ")
my_fake_dict(한국어='안녕', 영어='hi', 독일어='Guten Tag')
```

실행결과

```
한국어 : 안녕, 영어 : hi, 독일어 : Guten Tag, 
```



```python
def sign_up(username, password, password_confirmation) :
    if password == password_confirmation :
        print(f"{username}님, 회원가입 되었습니다.")
    else :
        print("비밀번호가 일치하지 않습니다.")

my_account = {
    "username" : "hong",
    "password" : "1q2w3e4r",
    "password_confirmation" : "1q2w3e4r"
}
sign_up(**my_account)
```

```
hong님, 회원가입 되었습니다.
```





### 실습문제

```
url 패턴을 만들어 문자열을 반환하는 my_url 함수를 만들어봅시다.

영진위에서 제공하는 일별 박스오피스 API 서비스는 다음과 같은 방식으로 요청을 받습니다.

기본 요청 URL : http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?
key : 발급받은 키값(abc)
targetDt : yyyymmdd
itemPerPage : 1 ~ 10 기본 10
예시)
호출 1)
my_url(key='abc', targetDt='yyyymmdd')

호출 2)
api = {
    'key': 'abc',
    'tagetDt': 'yyyymmdd'
}
my_url(**api)

key, targetDt가 없으면, '필수 요청변수가 누락되었습니다.'

itemPerPage의 범위가 1~10을 넘어가면, '1~10까지의 값을 넣어주세요.'

예시 출력)
'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?itemPerPage=10&key=abc&tagetDt=yyyymmdd&'
```



```python
def my_url(itemPerPage=10, **args) :
    if "key" not in args.keys() or "targetDt" not in args.keys() :
        print("필수 요청변수가 누락되었습니다.")
    if (itemPerPage > 10) or (itemPerPage<1) :
        print("1~10까지의 값을 넣어주세요.")
    
    base_url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?"
    base_url += f"itemPerPage={itemPerPage}&"
    for key, value in args.items() :
        base_url += f"{key}={value}&"
    return base_url
my_url(5)
my_url(60, key='aa', targetDt='yyyymmdd')
```

실행결과

```
필수 요청변수가 누락되었습니다.
1~10까지의 값을 넣어주세요.
```





## Ture or False

### 각자 다른 타입을 비교하는 것을 주의하자!



False : [], "", {}, 0, .....



```python
print([] == False)
```

실행결과 : 

False



```python
print(bool([]) == False)
```

실행 결과 :

True



so, 

```python
if not input_[i] :
    break
```



## 재귀함수(recursive function)

재귀 함수는 함수 내부에서 자기 자신을 호출 하는 함수.

python에서 재귀함수는 1000 번이 넘어가면 자동 종료시킨다.



### 재귀함수를 이용한 팩토리얼

``` python
def factorial(n):
    if n <= 1 :
        return n
    else :
        return n * factorial(n-1)
factorial(5)
```



실행 결과 : 

120



### 재귀함수를 이용한 피보나치수열 vs 반복문을 이용한 피보나치 수열



#### 재귀함수

```python
def fib(n):
    n_now, n_pre = 1, 1
    
    if n <= 1:
        return 1
    else :
        return fib(n-1) + fib(n-2)
fib(10)
```

실행 결과 :

89



#### 반복문

```python
# 선생님 코드

def fib_loop_t(n) :
    old, new = 1, 1
    for i in range(1, n-1) :
        old, new = new, old + new
    return old + new
fib_loop_t(10)
```

실행 결과 :

89



### 하노이의 탑

```python
def hanoi (n, start, tmp, end) :
    if n > 0 :
        hanoi(n-1, start, end, tmp)
        print(f"{n}번째 원판을 {start} -> {end}")
        hanoi(n-1, tmp, start, end)
hanoi(3, "a", "b", "c")
```

실행결과 :

```
1번째 원판을 a -> c
2번째 원판을 a -> b
1번째 원판을 c -> b
3번째 원판을 a -> c
1번째 원판을 b -> a
2번째 원판을 b -> c
1번째 원판을 a -> c
```

