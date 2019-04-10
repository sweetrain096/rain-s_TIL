# HTTP 상태코드

| status code | message            | django            | 설명                            | site                                                         |
| ----------- | ------------------ | ----------------- | ------------------------------- | ------------------------------------------------------------ |
| 200         | OK                 | 기본              |                                 |                                                              |
|             |                    |                   |                                 |                                                              |
| 404         | Not Found          | get_object_or_404 | /boards/5 등이 존재하지 않을 때 |                                                              |
| 405         | Method Not Allowed | @require_POST     | GET / POST 등의 메서드 허용     | [click](<https://docs.djangoproject.com/en/2.2/topics/http/decorators/>) |
|             |                    |                   |                                 |                                                              |
|             |                    |                   |                                 |                                                              |
|             |                    |                   |                                 |                                                              |



+ http 요청 코드
  + GET
  + POST
  + HEAD : 아주 많은 정보들을 가져올 때 항상 체크하면 시간이 오래걸리기 때문에 일단 체크를 받아주고 이후에 처리하는 코드.
  + GET과 HEAD를 모두 요청하기 위해서 장고에서는 `require_safe()` 를 사용하기도 한다.