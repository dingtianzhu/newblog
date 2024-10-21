<script setup lang="ts">
import { reactive } from 'vue';
import { useCounterStore } from '@/stores/modules/user';
import { useRouter } from 'vue-router';
interface UserParams {
  username: string;
  password: string;
}
const userStore = useCounterStore();
const router = useRouter();
const formModel: UserParams = reactive({
  username: '',
  password: '',
});
const login = async (param: UserParams) => {

  const res = await userStore.login(param);
  if (res) {
    router.push({ name: "Home" });
  }
};

</script>

<template>
  <div class="login">
    <div class="left-part">
      <span>Blog管理系统</span>
      <div class="div">
        <span>成长每一步。记录生活，记录你。</span>
        <img src="@/assets/img/blog-login.svg" alt="img" />
      </div>
      <p>2020@http://blog.taskweb.top</p>
    </div>
    <div class="right-part">
      <div class="login-window">
        <span>Login</span>
        <form>
          <input class="input" v-model="formModel.username" type="text" name="username" placeholder="请输入用户名" />
          <input class="input" v-model="formModel.password" type="password" name="password" placeholder="请输入密码" />
          <div class="button" @click="login(formModel)">Login</div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login {
  display: -webkit-flex;
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  justify-content: space-evenly;
  align-items: center;
}

.left-part {
  text-align: center;
  flex: 1.5;
  height: 100vh;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(135deg, #56c8ff, #6f99fc) no-repeat;
}

form {
  text-align: center;
  width: 60%;
}

.left-part span {
  line-height: 20vh;
  font-size: 40px;
  color: #ecf0f3;
}

.left-part .div {
  /*height: 10vh;*/
  flex: 3;
  color: #ecf0f3;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.left-part .div span {
  font-size: 20px;
  line-height: 10vh;
  clear: both;
}

.left-part .div img {
  /* flex:4; */
  width: 100%;
}

.left-part p {
  flex: 1;
  line-height: 20vh;
  justify-content: center;
  color: #ecf0f3;
  position: relative;
}

.right-part {
  height: 100vh;
  flex: 4;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-window {
  height: auto;
  padding: 40px;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 24px 24px 47px #d9d9d9, -24px -24px 47px #ffffff;
  border: 0px;
  border-radius: 20px;
  transition: 0.2s;
}

.login-window:hover {
  background: #ffffff;
  box-shadow: 24px 24px 47px #56c8ff, -24px -24px 47px #d9d9d9;
}

.login-window:hover span {
  color: #56c8ff;
}

.login-window span {
  font-weight: 900;
  font-size: 35px;
  color: #ecf0f3;
  transition: 0.2s;
}

.login-window input {
  border: 0;
  border-bottom: 2px solid #ecf0f3;
  background-color: inherit;
  margin: 18px;
  width: 80%;
  outline: medium;
  padding: 5px;
  font-size: 1.2em;
}

.button {
  width: 80%;
  border: 0;
  background: linear-gradient(135deg, #56c8ff, #6f99fc) no-repeat;
  /* box-shadow: 20px 20px 60px #49aad9, -20px -20px 60px #63e6ff; */
  height: 35px;
  margin: 20px;
  padding: 5px;
  line-height: 35px;
  font-weight: 600;
  border-radius: 10px;
  color: #ecf0f3;
  transition: 0.2s;

}

.button:hover {
  background: linear-gradient(145deg, #5cd6ff, #4db4e6);
  /* box-shadow: 24px 24px 47px #49aad9, -24px -24px 47px #63e6ff; */
}

.button:active {
  background: linear-gradient(145deg, #5cd6ff, #4db4e6);
  box-shadow: 24px 24px 47px #49aad9, -24px -24px 47px #63e6ff;
}
</style>