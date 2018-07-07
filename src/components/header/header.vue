<template>
  <div class="">
    <el-header class="global-nav" height="130px" style="margin-top: 30px;">
      <el-row type="flex" justify="start" style="margin-left: 100px">
        <el-col class="nav-button"><el-button type="text" index="0" content="首页" @click="homePage"><h3>首页</h3></el-button></el-col>
        <el-col class="nav-button"><el-button type="text" index="1" content="选电影" @click="pickMovies"><h3>选电影</h3></el-button></el-col>
        <el-col class="nav-button"><el-button type="text" index="2" content="排行榜" @click="rankingList"><h3>排行榜</h3></el-button></el-col>
        <el-col class="nav-button"><el-button type="text" index="3" content="分类" @click="classification"><h3>分类</h3></el-button></el-col>
        <el-col class="nav-button"><el-button type="text" index="4" content="影评" @click="review"><h3>影评</h3></el-button></el-col>
        <el-col class="nav-button" v-show="!$store.state.token"><el-button type="text" index="5" content="登录" @click="login"><h3>登录</h3></el-button></el-col>
        <el-col class="nav-dropdown" v-show="$store.state.token">
          <el-dropdown>
            <h3>账号管理</h3>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item index="6-0" @click="profile">个人中心</el-dropdown-item>
              <el-dropdown-item index="6-1" @click="logout">登出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="search-icon">
          <h1 style="margin-top: 0; color: #8A8A8A">Hyper</h1>
        </el-col>
        <el-col id="searching" :span="10" style="text-align: center;margin-left: 30px">
          <div style="margin-top: 0px;">
            <el-input placeholder="搜索电影、影人" clearable v-model="input" class="input-with-select" @focus="whenFocus">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="餐厅名" value="1"></el-option>
                <el-option label="订单号" value="2"></el-option>
                <el-option label="用户电话" value="3"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="search(input)"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>>
    </el-header>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'

export default {
  name: 'Header',
  data () {
    return {
      input: ''
    }
  },
  methods: {
    login: function () {
      this.$router.push('/login')
    },
    homePage: function () {
      this.$router.push('/homePage')
    },
    pickMovies: function () {
      this.$router.push('/pickMovies')
    },
    rankingList: function () {
      this.$router.push('/rankingList')
    },
    classification: function () {
      this.$router.push('/classification')
    },
    review: function () {
      this.$router.push('/review')
    },
    profile: function () {
      this.$router.push('/profile')
    },
    logout: function () {
      axios.post('http://111.231.141.52:8888/logout', qs.stringify({userName: sessionStorage.getItem('userName')}), {
        headers: {
          'Authorization': sessionStorage.getItem('userName') + '_' + sessionStorage.getItem('token')
        }
      }).then(response => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('userName')
        this.$store.commit('logout')
        this.$router.push('/login')
        this.$message({
          message: '成功注销',
          type: 'success'
        })
      }, response => {
        this.$message({
          message: sessionStorage.getItem('userName') + ';' + sessionStorage.getItem('token'),
          type: 'error'
        })
      })
    },
    search: function (str) {
      this.$router.push('/searchResult/' + str)
    },
    whenFocus: function () {
      //this.$router.push('/homePage')
    }
  }
}
</script>


<style>
.global-nav {
  height: 100px;
  color: #F0F0F0;
  background-color: #F0F0F0;
  min-width: 950px;
}
.el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
.nav-button{
  float: left;
  width: 80px;
}
  .nav-dropdown{
    margin-top: 8px;
    width: 80px;
  }

  .search-icon{
    width: 80px;
    margin-left: 10%;
    text-align: center;
    height: auto;
  }
</style>
