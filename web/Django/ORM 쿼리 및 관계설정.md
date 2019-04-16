# ORM 쿼리 및 관계설정

+ `pip install ipython`
  + 예쁘게 사용해용~~

1. bash (프로젝트 생성)

   ```bash
   $ django-admin startproject relationship
   $ cd relationship/
   $ python manage.py migrate
   ```

   + 프로젝트를 생성하던, git clone을 받던 무조건 migrate를 먼저 하고간다!!!

2. ```bash
   $ python manage.py startapp onetomany
   ```

   + 앱 생성

3. `settings.py`

   ```python
   INSTALLED_APPS = [
      ...
       'django_extensions',
       'onetomany',
   ]
   ```

   

4. `models.py`

   ```python
   from django.db import models
   
   # Create your models here.
   class User(models.Model):
       name = models.CharField(max_length=20)
       
   class Post(models.Model):
       title = models.CharField(max_length=20)
       user = models.ForeignKey(User, on_delete=models.CASCADE)
       
   class Comment(models.Model):
       content = models.CharField(max_length=20)
       user = models.ForeignKey(User, on_delete=models.CASCADE)
       post = models.ForeignKey(Post, on_delete=models.CASCADE)
   ```

   + `on_delete = models.CASCADE`
   + on_delete 속성을 다른것도 알아두기

5. bash

   ```bash
   $ python manage.py makemigrations
   $ python manage.py migrate
   ```

   

6. shell에서 놀기

   ```bash
   $ python manage.py shell_plus
   ```

   

   

7. shell에서 사용할 내용들을 query.py에 저장해놓기

8. 

9. 







## 1. 생성

1. 생성하기(두 가지 방법)

   ```python
   user1 = User.objects.create(name='Han')
   ```

   ```python
   user2 = User()
   user2.name = 'Han22'
   user2.save()
   ```

   + 지금은 위의 방법이 사용하기 용이하므로 위의 방법을 자주 사용할것.

   

   

2. bash

   ```bash
   $ python manage.py shell_plus
   ```

   ```bash
   user1 = User.objects.create(name='Han')
   
   user2 = User()
   user2.name = 'Han22'
   user2.save()
   
   post1 = Post.objects.create(title="1글", user=user1)
   post2 = Post.objects.create(title="2글", user=user2)
   post3 = Post.objects.create(title="3글", user=user1)
   
   c1 = Comment.objects.create(content='1글1댓글', user=user1, post=post1)
   c2 = Comment.objects.create(content='1글2댓글', user=user2, post=post1)
   c3 = Comment.objects.create(content='1글3댓글', user=user1, post=post1)
   c4 = Comment.objects.create(content='2글1댓글', user=user2, post=post2)
   c5 = Comment.objects.create(content='3글1댓글', user=user1, post=post3)
   c6 = Comment.objects.create(content='2글2댓글', user=user1, post=post2)
   ```

3. 

   ```shell
   In : user1
   Out: <User:User object (1)>
   ```

   이 때 user1은 User.objects.get(pk=1)과 같다



### User에 관한 정보 읽어보기!

```python
# 1. user1의 정보들
user1 = User.objects.get(pk=1)
user1.name

# 2. user1의 관계된 정보들
user1.post_set.all()
user1.comment_set.all()

# 3. post1(n)의 유저(1) 정보
post1 = Post.object.get(pk=1) # Post 오브젝트
post1.user      # User 오브젝트
post1.user.name # User 오브젝트의 이름
```





### user1이 쓴 댓글의 내용만 가져와보자!!!!!

1. ```shell
   In [26]: Comment.objects.filter(user_id=1)                                     
   Out[26]: <QuerySet [<Comment: Comment object (1)>, <Comment: Comment object (3)>, <Comment: Comment object (5)>, <Comment: Comment object (6)>]>
   ```

   + user1인 내용을 가져올 수 있다.

     

2. ```shell
   In [27]: user1.comment_set.all()                                               
   Out[27]: <QuerySet [<Comment: Comment object (1)>, <Comment: Comment object (3)>, <Comment: Comment object (5)>, <Comment: Comment object (6)>]>
   ```

   + 하지만 ForeignKey로 묶여있을 때, 이렇게 사용해 볼 수도 있다.

   + 외래키로 묶여있을 경우, 묶여진 모델에는 묶여진 내용을 가져오는 `comment_set`이나 `post_set`처럼 가져올 수 있다.

     

3. 추가) post1의 작성자 오브젝트와 이름을 가져와보자

   ```bash
   In [28]: post1    
   Out[28]: <Post: Post object (1)>
   
   In [29]: post1.user       
   Out[29]: <User: User object (1)>
   
   In [30]: post1.user.name 
   Out[30]: 'Han'
   ```

   1개를 가져올 때와 여러개를 가져올 때의 차이?

   => post1의 작성자는 한명. 이 때 사용할 것은 `post1.user`

   => post1에 달려있는 댓글은 여러개.  `post1.comment_set.all()`

   여러개를 사용할 때에는 `comment_set`으로 가져올 수 있다.

   

4. user1이 쓴 댓글의 내용 : for를 무조건 사용하기!

   ```bash
   In [38]: for comment in user1.comment_set.all(): 
       ...:         print(comment.content) 
       ...:                                                                              
   1글1댓글
   1글3댓글
   3글1댓글
   2글2댓글
   ```

5. 모든 사용자의 댓글 출력하기!

   ```bash
   In [44]: for user in User.objects.all(): 
       ...:         for comment in user.comment_set.all(): 
       ...:                     print(user.name, comment.content) 
       ...:                                                                              
   Han 1글1댓글
   Han 1글3댓글
   Han 3글1댓글
   Han 2글2댓글
   Han22 1글2댓글
   Han22 2글1댓글
   ```

   + `Post.objects.all()` : post의 오브젝트들이 모두 담겨있는 쿼리셋.

   + 이것을 django에서는?

     ```python
     # detail - 1
     context = {'post' : post }
         # dtl
     {{ post.id }}번 째 글
     {% for comment in post.comment_set.all %}
         {{ comment.content }}
     {% endfor %}
     
     # detail - 2
     context = {'post' : post, 'comments' : post.comment_set.all() }
     {% for comment in comments %}
         {{ comment.content }}
     {% endfor %}
     ```

     

6. 각각의 게시글마다 댓글을 출력하기!

   ```bash
   In [45]: for post in Post.objects.all(): 
       ...:         for comment in post.comment_set.all(): 
       ...:                     print(post.title, comment.content) 
       ...:                                                                              
   1글 1글1댓글
   1글 1글2댓글
   1글 1글3댓글
   2글 2글1댓글
   2글 2글2댓글
   3글 3글1댓글
   ```

   

7. 댓글의 id가 2인 것을 쓴 사람의 게시물들은?

   ```bash
   In [46]: Comment.objects.get(id=2).user.post_set.all()                                
   Out[46]: <QuerySet [<Post: Post object (2)>]>
   ```

   d

8. 1번 글의 첫번째 댓글을 쓴 사람의 이름은?

   ```bash
   Post.objects.get(pk=1).comment_set.all()[0].user.name
   # query set 조작. LIMIT 1 옵션이 들어가게 되는것. 첫번째것 하나만 가져와라.
   Post.objects.get(pk=1).comment_set.first().user.name
   ```

   

9. 1번글의 댓글 중 2, 3, 4번을 가져오기?

   ```bash
   Post.objects.get(pk=1).comment_set.all()[1:4] # OFFSET 1 LIMIT 3
   ```

10. 1번 글의 두번째 댓글을 쓴 사람의 첫번째 게시물의 작성자 이름은?

    ```bash
    In [51]: Post.objects.get(pk=1).comment_set.all()[1].user.post_set.first().user.name  
    Out[51]: 'Han22'
    ```

    + 사실 문제는 말도 안되지만, queryset 날리는 연습해보기 위해 사용하는 것들.

11. if, Nonetype Error ?

    `post.image_set.first.file.url`에서 image_set이 없다면 어디서 에러가 날까?

    => `file`에서 에러가 난다!!!!!

    =>why? 없다고 하더라도 찾아서 갈 수 있고, file이 존재하지 않기 때문에 file이 존재하지 않는다는 에러가 뜬다.

    `post.image_set.all()[0].file.url` 에서 image_set이 없다면

    => all[0]에서 에러가 난다!! 

    => outofrange 에러가 난다.





### 오브젝트가 아닌 특정 컬럼의 값을 가져오기

```bash
In [52]: Comment.objects.all().values('user')                                         
Out[52]: <QuerySet [{'user': 1}, {'user': 1}, {'user': 1}, {'user': 1}, {'user': 2}, {'user': 2}]>
```



```bash
In [54]: Comment.objects.all().values('user', 'content')                              
Out[54]: <QuerySet [{'user': 1, 'content': '1글1댓글'}, {'user': 2, 'content': '1글2댓글'}, {'user': 1, 'content': '1글3댓글'}, {'user': 2, 'content': '2글1댓글'}, {'user': 1, 'content': '3글1댓글'}, {'user': 1, 'content': '2글2댓글'}]>
```



```bash
Comment.objects.all().values('user')
Comment.objects.all().values('user', 'content')

# SELECT * FROM comment
# SELECT user FROM comment

```

+ 결과가 딕셔너리. 값을 '.'을 찍어서 가져올 수 있다. 



### 게시물을 pk값의 내림차순으로 가지고 오기

```bash
Post.objects.order_by('-pk')
```

+ 내림차순 : -, 오름차순은 그냥

```bash
In [55]: Post.objects.order_by('-pk')                                                 
Out[55]: <QuerySet [<Post: Post object (3)>, <Post: Post object (2)>, <Post: Post object (1)>]>
```





### filter : '1글'이라는 제목이 있는 게시글?

```bash
Post.objects.filter(title='1글')


In [56]: Post.objects.filter(title='1글')                                             
Out[56]: <QuerySet [<Post: Post object (1)>]>
```



### 제목에 1이 들어가 있는 게시글?

+  LIKE %%

```bash
In [57]: Post.objects.filter(title__contains='1')            
Out[57]: <QuerySet [<Post: Post object (1)>]>

In [58]: Post.objects.filter(title__icontains='1')
Out[58]: <QuerySet [<Post: Post object (1)>]>
```



+ `title__contains` : 대소문자 구분 O
+ `title__icontains` : 대소문자 구분 X





### 댓글들 중에서 해당하는 글의 제목에 글의 내용 (1)이 들어가있는 댓글?

```bash
In [60]: Comment.objects.filter(post__title__contains='1')                            
Out[60]: <QuerySet [<Comment: Comment object (1)>, <Comment: Comment object (2)>, <Comment: Comment object (3)>]>
```

+ 여기서 filter의 post는 Comment의 ForeignKey 모델.













