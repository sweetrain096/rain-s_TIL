# Vue.js의 Lifecycle hooks

> 각 Vue의 인스턴스는 생성될 때 일련의 초기화 단계를 거치게 된다. 이 단계를 나타내는 vue.js의 라이프사이클과, 이 단계마다 실행될 수 있는 함수와 같은 라이프사이클 훅에 대해 알아본다.





## Lifecycle과 Lifecycle Hooks

우선, 라이프사이클은 무엇일까?<br>**라이프사이클(lifecycle)**은 인스턴스가 생성될 때 거치는 초기화 단계(데이터 관찰 설정, 템플릿을 컴파일, 인스턴스를 DOM에 마운트, 데이터 변경 시 DOM 업데이트) . 또는 호출 할 수 있는 속성들을 의미한다. <br>Vue.js 의 라이프사이클은 크게 Creation, Mounting, Updating, Destruction으로 나눌 수 있다.

그럼 라이프사이클 훅은 무엇일까?<br>**라이프사이클 훅(lifecycle hook)**은 사용자가 특정 단계(초기화 단계)에서 자신의 코드를 추가할 수 있는 함수처럼 생각할 수 있다. <del>(실제로 공식문서에서도 type이 function이다)</del> <br>라이프사이클 훅에는 beforeCreate, created, beforeMount, mounted, beforeUpdate, updated, beforeDestroy, destroyed 등이 존재한다. (공식문서를 보면 activated나 deactivated, erroCaptured도 사용 가능 한 것으로 보인다.)



[공식문서](https://kr.vuejs.org/v2/guide/instance.html#%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8)에서 제공하는 라이프사이클 다이어그램이 상당히 이해하기 쉽게 되어있어 참고하기 좋다.

![The Vue Instance Lifecycle](img/lifecycle.png)

Vue 인스턴스는 크게 생성(create), 

































ref

[Vue.js 공식문서 - Vue 인스턴스](https://kr.vuejs.org/v2/guide/instance.html#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%ED%9B%85)

[재그지그](<https://wormwlrm.github.io/2018/12/29/Understanding-Vue-Lifecycle-hooks.html>)