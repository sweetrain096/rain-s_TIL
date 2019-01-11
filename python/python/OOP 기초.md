# OOP 기본 (클래스와 인스턴스)

## 클래스와 인스턴스는 왜 사용할까?

- 클래스 안의 함수(메소드)들에 접근할 때 인스턴스의 이름별로 접근하면 가독성 및 함수 자체의 재사용성이 올라간다.





## 용어 정리

```python
class Person:                      #=> 클래스 정의(선언) : 클래스 객체 생성
    name = '홍길동'                  #=> 멤버 변수(데이터 어트리뷰트)
    def greeting(self):            #=> 멤버 메서드(메서드)
        print(f'{self.name}')
iu = Person()       # 인스턴스 객체 생성
daniel = Person()   # 인스턴스 객체 생성
iu.name             # 데이터 어트리뷰트 호출
iu.greeting()       # 메서드 호출
```







## 인스턴스의 self

인스턴스에서 클래스를 호출하려면 self를 사용해야한다.



```python
# 아래와 같이 greeting에 self를 넣지 않으면 lee.greeting()으로 호출이 불가능하다.
# TypeError 발생
# 이유 : lee.greeting()은 Person.greeting(lee)와 같다. 
# 우리가 함수에서 인자가 선언되지 않았을 때 넘겨줄 수 없었던 것 처럼 에러가 발생하는것.
# ex) random.choice([1, 2, 3, 6], 6)
class Person :
    name = "홍길동"
    def greeting() :
        print(f"안녕하세요?")
        
lee = Person()
lee.greeting()
```

```
# out
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
<ipython-input-10-dae2c7aa4ee7> in <module>
      1 lee = Person()
----> 2 lee.greeting()

TypeError: greeting() takes 0 positional arguments but 1 was given

```



```python
class Person :
    name = "홍길동"
    def greeting(self) :
        print(f"안녕하세요?")
lee = Person()
lee.greeting()
```

out

```
안녕하세요?

```





- 클래스 선언부 내부에서도 반드시 self를 통해 데이터 어트리뷰트에 접근.

```python
# 예시를 봅시다.
name = "??????"
class Person :
    name = "홍길동"
    def greeting(self) :
        print(f"안녕하세요? {name}")
```



In [49]:

```python
hong = Person()
hong.greeting()
print(hong.name)
```

out

```
안녕하세요? ??????
홍길동

```



In [50]:

```python
name = "??????"
class Person :
    name = "홍길동"
    def greeting(self) :
        print(f"안녕하세요? {self.name}")
```



In [51]:

```python
hong = Person()
hong.greeting()
print(hong.name)
```

```
안녕하세요? 홍길동
홍길동
```



In [51]:

```python
hong.name = "반짝반짝"
print(hong.name)
hong.greeting()
```

```
반짝반짝
안녕하세요? 반짝반짝
```







## 클래스-인스턴스간의 이름공간

- 클래스를 정의하면, 클래스 객체가 생성되고 해당되는 이름 공간이 생성된다.
- 인스턴스를 만들게 되면, 인스턴스 객체가 생성되고 해당되는 이름 공간이 생성된다.
- 인스턴스의 어트리뷰트가 변경되면, 변경된 데이터를 인스턴스 객체 이름 공간에 저장한다.
- 즉, 인스턴스에서 특정한 어트리뷰트에 접근하게 되면 인스턴스 -> 클래스 순으로 탐색을 한다.

![1547098340924](C:\Users\student\AppData\Roaming\Typora\typora-user-images\1547098340924.png)



- 서로 다른 변수에 클래스를 각각 상속받으면 각각의 인스턴스로 활성화 된다.
- 그러나 인스턴스를 다른 이름으로 복사할 경우 복제된 하나의 인스턴스 주소로 연결되게 된다.







## 생성자 / 소멸자

- 생성자는 인스턴스 객체가 생성될 때 호출되는 함수이며, 소멸자는 객체가 소멸되는 과정에서 호출되는 함수입니다.

```python
def __init__(self):
    print('생성될 때 자동으로 호출되는 메서드입니다.')

def __del__(self):
    print('소멸될 때 자동으로 호출되는 메서드입니다.')
__someting__
```

위의 형식처럼 양쪽에 언더스코어가 있는 메서드를 스페셜 메서드 혹은 매직 메서드라고 불립니다.





- 생성자와 소멸자 사용 시 생성자가 먼저 사용된다.
- 생성자가 먼저 생기고 다시 한 번 Person 클래스가 같은 이름에 생성이 되면,
- 클래스 생성 시 인스턴스가 다른 주소에 새로 생성되고 이름이 달라붙는다.
- 그렇게 되면 이전 인스턴스가 삭제된다.

```python
# 생성자와 소멸자를 만들어봅시다.
class Person :
    name = "홍길동"
    def __init__(self) :
        print("응애")
        
    def greeting(self) :
        print(f"안녕하세요? {self.name}")
        
    def __del__(self) :
        print("으악")
```



```python
#  생성시켜봅시다.
p1 = Person()
```

out

```
응애
```



```python
p1 = Person()
```

out

```
응애
으악
```



![photo_2019-01-10_14-10-00](C:\Users\student\Downloads\photo_2019-01-10_14-10-00.jpg)





##  클래스 변수 / 인스턴스 변수 : self, class명, global

- self : 인스턴스의 내용을 접근할 때 사용
- class명. : 클래스 안의 변수에 접근할 때 사용
- global : 인스턴스와 클래스 안의 내용이 없을 때 찾아가게 되는 값이다.



```python
# 위의 생성자와 인사하는 메소드를 만들어봅시다. 
class Person:
    population = 0
    
    def __init__(self, name, age) :
        self.name = name
        self.age = age
        self.location = "dj"
        Person.population += 1
        
    def greeting(self) :
        print(f"{self.name}입니다. 안녕하세요. {self.age}살이에요")
        
    
```



```python
# 본인의 이름을 가진 인스턴스를 만들어봅시다.
p1 = Person("단비", 24)
```

```python
# 이름을 출력해봅시다.
p1.name
```

out :

'단비'



```python
# 옆자리 친구의 이름을 가진 인스턴스를 만들어봅시다.
p2 = Person("태현", 27)
```

```python
# 이름을 출력해봅시다.
p2.name
```

out :

'태현'



```python
# population을 출력해봅시다.
Person.population
```

out:

2



- 위의 상황에서 새로 인스턴스를 계속 생성하면 population이 증가한다.







## staticmethod와 classmethod

- staticmethod는 안에서 인스턴스 메소드를 사용하지 않을 때 사용한다.

- staticmethod는 다음과 같이 정의.

```python
@staticmethod
def methodname():
    codeblock
```





```python
# 단순한 static method
class Dog:
    
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    @staticmethod
    def bark():
        print("멍멍")
```



```python
# 3마리를 만들어보고,
puppy = Dog("puppy", 5)

```

```python
# 함수를 호출해봅시다.
puppy.bark()
```

out :

멍멍





- classmethod는 무조건 클래스가 넘어가게 된다.

- classmethod는 다음과 같이 정의됩니다.

```python
@classmethod
def methodname(cls):
    codeblock
```



```python
# 개의 숫자를 출력하는 classmethod를 만들어보겠습니다.
class Dog:
    cnt = 0
    def __init__(self, name, age):
        self.name = name
        self.age = age
        Dog.cnt += 1
    
    # 인스턴스 메소드 dog1.bark() == Dog.bark(dog1)
    def bark(self):
        print("멍멍")
    
    # 클래스 메소드 Dog.count()
    @classmethod
    def count(cls):
        print(f"{cls.cnt}")
```



```python
# 3마리를 만들어보고,
dog1 = Dog("멍멍이", 3)
```

```python
# 함수를 호출해봅시다.
Dog.count()
```

out

```
2
```





### 인스턴스 메소드와 클래스 메소드

- 인스턴스 메소드

```python
def greeting(self) :
    self.name
```

1. iu.greeting() == Person.greeting(iu)
2. 첫 번째 인자로 iu object가 넘어간다.
3. self.name 형식으로 메소드 내부로 인스턴스 변수를 가져올 수 있다.



- 클래스 메소드

```python
@classmethod
def greeting(cls) :
    cls.cnt
```

1. Person.greeting()
2. 첫 번째 인자로 Person이 넘어간다.



### 비교하기

- classmethod 사용시

In [149]:

```python
class Person:
    name = "홍길동"
    
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def greeting(self):
        print(f"안녕, {self.name}")
```



In [150]:

```python
iu = Person("iu", 26)
iu.greeting()
```

out

```
안녕, 홍길동
```



=> 클래스 메소드로 설정 시 iu라는 인스턴스를 불러와도 클래스의 이름이 출력된다.



- 인스턴스 메소드 사용시

In [151]:

```python
class Person:
    name = "홍길동"
    
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greeting(self):
        print(f"안녕, {self.name}")
```

In [152]:

```python
iu = Person("iu", 26)
iu.greeting()
```

out

```
안녕, iu
```



### 클래스메소드 사용해보기

```python
class Dj1 :
    students = []
    
    def __init__(self, name):
        self.name = name
        Dj1.students.append(self)
        
    def greeting(self) :
        print(f"{self.name}입니다.")
        
    @classmethod
    def get_students(cls):
        for student in cls.students :
            print(student.name)
```



```python
p1 = Dj1("이재찬")
p2 = Dj1("강신욱")
p3 = Dj1("박성민")
```



```python
Dj1.get_students()
```



out :

```
이재찬
강신욱
박성민
```



=> if,

Dj1.students.append(self) 대신에

Dj1.students.append(self.name)을 쓰고

def get_students(cls):
​        for student in cls.students :
​            print(student.name)

대신에



def get_students(cls):
​        for student in cls.students :
​            print(student)



을 쓰면 값 출력이 가능하다.





## 연산자 오버라이딩(중복 정의)

- 파이썬에 기본적으로 정의된 연산자를 직접적으로 정의하여 활용할 수 있습니다.
- 몇가지만 소개하고 활용해봅시다.

```
+  __add__   
-  __sub__
*  __mul__
<  __lt__
<= __le__
== __eq__
!= __ne__
>= __ge__
>  __gt__
```



```python
class Person:
    def __init__(self, name, age) :
        self.name = name
        self.age = age
    def __eq__(self, other) :
        if self.age == other.age :
            return "친구에요"
        else :
            return "친구 아니에요"
        
    def greeting(self) :
        print(f"{self.name}입니다. 안녕하세요. {self.age}살이에요")
```



```python
# 연산자를 호출해봅시다.
p1 = Person("a", 100)
p2 = Person("b", 50)
p3 = Person("c", 50)
```



```python
# 원하는 연산자를 사람과 사람을 비교해보세요.
p1 == p2
```



out :

```
'친구 아니에요'
```



```python
p2 == p3
```



out :

```
'친구에요'
```







## 메소드와 인스턴스 변수의 차이

클래스의 메소드를 가져오려면 

```
join(), replace(), isalpha(), .items(), pop()
```

위와 같이 ()로 끝나는 것들이 메소드.



인스턴스 변수는 

```
num.imag
```

위와 같이 인스턴스 이름.인스턴스 변수 로 가져오게 된다.









## 인스턴스, 클래스, 정적 메서드 정리

1. 인스턴트 메서드 : 첫번째 인자로 인스턴스 객체를 전달한다. (self)
2. 클래스 메서드 : 첫번째 친자로 클래스 객체를 전달한다. (cls)
   // 인스턴스 메서드와 클래스 메서드는 p1.메서드이름() or class이름().메서드이름
     // 위가 자동적으로 넘어간다.
     // 쉽게 말해 인스턴스이름.메서드() 괄호 안에 넘겨주지 않아도 메서드(인스턴스이름)
     // 같이 자동으로 넘어가게된다.
3. 정적 메서드 : 인자로 어떠한 객체를 전달하지 않는다.

  // 그러나 정적메서드는 무조건 괄호 안에 넘겨주는 값이 필요하다.
  // 인스턴스 or 클래스 이름.static_method(_**넘겨주는값**_)이 필요하다.



```python
class Person:
    title = "사람입니다."
    
    def __init__(self, name, age):
        self.name = name
        self.age = age
        
    def instance_method(self) :
        print(self)
        return f"{self.name}"
    
    def greeting(self):
        print(self)
        return "안녕?"
    
    # 인스턴스나 클래스에서 받아온 각각의 이름. 객체의 이름을 사용할 수 없다.
    # self나, cls 등 사용이 되지 않는다.
    # (def 안으로 들어오지 않는다. 이것을 넘기지 않는다고 한다.)
    @staticmethod
    def static_method(nothing):
        print(nothing)
        return nothing
    
    @classmethod
    def class_method(cls):
        print(cls)
        return f"{cls.title}"
```





```python
p1 = Person("이재찬", 25)
```



```python
Person.__dict__
```

out

```
mappingproxy({'__module__': '__main__',
              'title': '사람입니다.',
              '__init__': <function __main__.Person.__init__(self, name, age)>,
              'instance_method': <function __main__.Person.instance_method(self)>,
              'greeting': <function __main__.Person.greeting(self)>,
              'static_method': <staticmethod at 0x23e141832b0>,
              'class_method': <classmethod at 0x23e14183320>,
              '__dict__': <attribute '__dict__' of 'Person' objects>,
              '__weakref__': <attribute '__weakref__' of 'Person' objects>,
              '__doc__': None})
```





```python
p1.__dict__
```

Out

```
{'name': '이재찬', 'age': 25}
```





```python
# p1 안에 title이 없기 때문에 클래스까지 나가서 가져오게 된다.
p1.title
```

Out[10]:

```
'사람입니다.'
```





```python
# 인스턴스 메소드는 인스턴스 객체를 인자로 넘겨준다. (자동으로)
p1.instance_method()
print(p1)
```

out

```
<__main__.Person object at 0x0000023E141729B0>
<__main__.Person object at 0x0000023E141729B0>
```





In [15]:

```
# 클래스 메서드는 클래스 객체를 인자로 넘겨준다.
Person.class_method()
print(Person)
```

out

```
<class '__main__.Person'>
<class '__main__.Person'>
```





```python
Person.static_method()
```

out

```
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
<ipython-input-16-4e5dea2b151d> in <module>
      1 #
----> 2 Person.static_method()

TypeError: static_method() missing 1 required positional argument: 'nothing'
```



in

```
Person.static_method("hi")
```
print

```
hi
```

Out[17]:

```
'hi'
```



in

```
p1.static_method()
```

out

```
---------------------------------------------------------------------------
TypeError                                 Traceback (most recent call last)
<ipython-input-18-e51caa84cc20> in <module>
----> 1 p1.static_method()

TypeError: static_method() missing 1 required positional argument: 'nothing'
```



in

```
p1.static_method("안녕하세요")
```

print

```
안녕하세요
```

Out[19]:

```
'안녕하세요'
```





## 클래스 상속



```python
class Student(Person):
    title = "학생입니다."
```





In [21]:

```python
s1 = Student("박성민", 1)
```



In [22]:

```
s1.greeting()
```

```
<__main__.Student object at 0x0000023E140D3438>
```

Out[22]:

```
'안녕?'
```



In [23]:

```
Person.class_method()
```

print

```
<class '__main__.Person'>
```

Out[23]:

```
'사람입니다.'
```







In [24]:

```
Student.class_method()
```

print

```
<class '__main__.Student'>
```

Out[24]:

```
'학생입니다.'
```





