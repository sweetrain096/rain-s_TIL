<template>
  <div>
    <h1>Login</h1>
    <button @click="logout"> Logout </button>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import * as firebaseui from 'firebaseui'
import * as firebase from "firebase/app"

const config = {
  apiKey: "AIzaSyB_Om1o6-M5LwTn7ZXVuv0EuzF-Hz2fc8s",
  authDomain: "vue-firebaseui-login.firebaseapp.com",
  databaseURL: "https://vue-firebaseui-login.firebaseio.com",
  projectId: "vue-firebaseui-login",
  storageBucket: "vue-firebaseui-login.appspot.com",
  messagingSenderId: "sender-id",
};
firebase.initializeApp(config);
const auth = firebase.auth();
const ui = new firebaseui.auth.AuthUI(auth);

export default {
  methods: {
    initUI: function() {
      // template에 존재하는 div에 ui.start 명령어를 사용하면 firebaseui가 알아서 그려준다.
      ui.start("#firebaseui-auth-container", {
        // 현재 사용하는 옵션은 이메일 로그인만 사용한다.
        signInoptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
            {
              provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              authMethod: "https://accounts.google.com",
              clientId:
                "250668989429-2829n2j81ibo11f7dkhv3p2sqajhv4pr.apps.googleusercontent.com"
            },
          ],
        callbacks: {
          // 로그인이 성공하면,
          signInSuccessWithAuthResult: (authResult, redirectUrl) => {
            // 로그인 정보를 각각의 data에 저장한다.
            alert(`${authResult.user.displayName}login 성공!`);
            return false;
          }
        }
      });
      
    },
    logout: function(){
      auth.onAuthStateChanged((user) =>{
        if (user) {
          // alert("이미 로그인 한 사용자입니다!");
          auth.signOut();
          window.location.reload();
        }
      })
      
    }
    
  },
  mounted: function() {
    // 현재 로그인한 회원의 정보를 알 수 있는 함수이다. 존재하면 딕셔너리가, 아니면 null값이 나온다.
    auth.onAuthStateChanged((user) =>{
        if (user) {
          // alert("이미 로그인 한 사용자입니다!");
          console.log(user)
        }
        //현재 유저가 존재하지 않으면 로그인창을 보여준다.
        this.initUI()
    })
  }
}
</script>

<style>

</style>
