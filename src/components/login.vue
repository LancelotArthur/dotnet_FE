<template>
  <div style="margin: 100px">
    <div class="login-wrap" v-show="showLogin">
      <h3>登录</h3>
      <div>
        <el-input class="inputBox"
          placeholder="请输入用户名"
          v-model="info.userName"
          clearable="true">
        </el-input>
      </div>
      <div>
        <el-input class="inputBox"
          type="password"
          placeholder="请输入密码"
          v-model="info.userPassword"
          clearable="true">
        </el-input>
      </div>
      <el-button type="primary" @click="login">登录</el-button><br>
      <el-button type="text" @click="ToRegister">还没有账号？马上注册</el-button>
    </div>

    <div class="register-wrap" v-show="showRegister">
      <h3>注册</h3>
      <div>
        <el-input class="inputBox"
          placeholder="请输入用户名"
          v-model="newInfo.userName"
          clearable>
        </el-input>
      </div>
      <div>
        <el-input class="inputBox"
          type="password"
          placeholder="请输入密码"
          v-model="newInfo.userPassword"
          clearable>
        </el-input>
      </div>
      <div>
        <el-input class="inputBox"
          type="password"
          placeholder="请确认密码"
          v-model="newInfo.userPasswordCofirm"
          clearable>
        </el-input>
      </div>
      <div>
        <el-input class="inputBox"
          placeholder="请输入邮箱"
          v-model="newInfo.email"
          clearable>
        </el-input>
      </div>
      <div>
        <el-input class="inputBox"
          placeholder="请输入昵称"
          v-model="newInfo.nickName"
          clearable>
        </el-input>
      </div>
      <el-button type="primary" @click="register">注册</el-button><br>
      <el-button type="text" @click="ToLogin">已有账号？马上登录</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
  data () {
    return {
      showLogin: true,
      showRegister: false,
      showTishi: false,
      tishi: '',
      newInfo: {
        userName: '',
        userPassword: '',
        userPasswordCofirm: '',
        email: '',
        nickName: ''
      },
      info: {
        userName: '',
        userPassword: ''
      }
    }
  },
  methods: {
    login: function () {
      axios.post('http://localhost:8888/login', qs.stringify(this.info), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(response => {
        if (response.data.status === '200') {
          sessionStorage.setItem('token', response.data.result.token)
          sessionStorage.setItem('userName', this.info.userName)
          this.$confirm('是否要保存密码', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '不，谢谢',
            type: 'info'
          }).then(() => {
            this.$store.commit('login', sessionStorage)
            this.$router.push('/homePage')
            // localStorage.setItem('userName', this.info.userName)
            // localStorage.setItem('userPassword', this.info.userPassword)
            this.$message({
              type: 'success',
              duration: 2000,
              message: '保存成功!' + '欢迎' + this.info.userName
            })
          }).catch(() => {
            this.$store.commit('login', sessionStorage)
            this.$router.push('/homePage')
            this.$message({
              type: 'success',
              duration: 2000,
              message: '欢迎 ' + this.info.userName
            })
          })
        } else if (response.data.status === '401') {
          this.$message({
            type: 'info',
            duration: 2000,
            message: response.data.result
          })
        }
      }, response => {
        this.$message({
          message: '服务器错误',
          type: 'error'
        })
      })
    },
    register: function () {
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (this.newInfo.userName === '') {
        this.$message({
          type: 'info',
          duration: 2000,
          center: true,
          message: '用户名不能为空'
        })
      } else if (this.newInfo.userPassword === '') {
        this.$message({
          type: 'info',
          duration: 2000,
          center: true,
          message: '请输入密码'
        })
      } else if (this.newInfo.userPasswordCofirm === '') {
        this.$message({
          type: 'info',
          duration: 2000,
          center: true,
          message: '请确认密码'
        })
      } else if (this.newInfo.userPassword !== this.newInfo.userPasswordCofirm) {
        this.$message({
          type: 'info',
          duration: 2000,
          center: true,
          message: '两次输入密码不一致'
        })
        this.newInfo.userPasswordCofirm = ''
      } else if (this.newInfo.email === '') {
        this.$message({
          type: 'info',
          duration: 2000,
          center: true,
          message: '邮箱不能为空'
        })
      } else if (!reg.test(this.newInfo.email)) {
        this.$message({
          type: 'info',
          duration: 2000,
          center: true,
          message: '邮箱格式不正确'
        })
      } else if (this.newInfo.nickName === '') {
        this.$message({
          type: 'info',
          duration: 2000,
          center: true,
          message: '请输入昵称'
        })
      } else {
        axios.post('http://localhost:8888/register', qs.stringify(this.newInfo)).then(response => {
          if (response.data.status === '201') {
            this.ToLogin()
            this.$message({
              type: 'success',
              duration: 2000,
              center: true,
              message: '欢迎 ' + this.newInfo.nickName
            })
          } else if (response.data.status === '400') {
            this.$message({
              type: 'warning',
              duration: 2000,
              message: response.data.result
            })
          }
        }, response => {
          this.$message({
            message: '服务器错误',
            type: 'error'
          })
        })
      }
    },
    ToRegister: function () {
      this.showLogin = false
      this.showRegister = true
    },
    ToLogin: function () {
      this.showRegister = false
      this.showLogin = true
    }
  }
}
</script>

<style>
.inputBox {
  margin: 10px;
}
.login-wrap {
  text-align: center;
  width: 25%;
  margin: 0 auto;
}
.register-wrap {
  width: 25%;
  margin: 0 auto;
}
</style>
