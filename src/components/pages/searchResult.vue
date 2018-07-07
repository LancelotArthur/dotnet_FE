<template>
  <div style="width: 80%;margin: 0 auto">
    <el-row id="global-wrap" :gutter="50">
      <el-col id="article" :span="18">
        <el-row style="text-align: left">
          <h1>搜索 {{this.$route.params.str}}</h1>
        </el-row>
        <el-row>{{message}}</el-row>
        <el-row :span="4" v-for="(item) in movie_data.slice(0, 15)" :key="item.id" :offset="0">
          <p class="ul"/>
          <el-container style="margin-top: 30px">
            <el-aside width="150px">
              <img :src="item.coverAddress" class="image" @click="movieDetail(item.id)">
            </el-aside>
            <el-container>
              <el-header height="20px" style="text-align: left">
                <h4><a @click="movieDetail(item.id)">{{item.movieName}}</a></h4></el-header>
              <el-main style="padding-top: 0px">
                <h5 style="text-align: left;margin-top: 10px">
                  {{item.releaseTime.slice(2, item.releaseTime.length-2).split('\', \'').join(' / ')}}
                  / {{item.lastTimeMinute}}分钟
                  / {{item.genres.slice(2, item.genres.length-2).split('\', \'').join(' / ')}}
                  / {{item.movieLanguage}}
                </h5>
              </el-main>
              <el-footer style="text-align: left">
                <el-rate
                  v-model="item.rate"
                  disabled
                  text-color="#ff9900"
                  disabled-void-color="#cccccc"
                  score-template="{value}">
                </el-rate>
              </el-footer>
            </el-container>
          </el-container>
        </el-row>
      </el-col>
      <el-col id="aside" :span="6">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      movie_data: [],
      message: ''
    }
  },
  mounted: function () {
    axios.get('http://localhost:8888/explore?type=keyword&tag=' + this.$route.params.str + '&sort=ReleaseTime').then(response => {
      if (response.data.result[0]) {
        this.movie_data = response.data.result
        this.movie_data.forEach(element => {
          element.rate = element.rate / 2
        })
      } else {
        this.message = '没有找到关于 “' + this.$route.params.str + '” 的电影，换个搜索词试试吧。'
      }
    }, response => {
      this.$message({
        message: response.status,
        type: 'error'
      })
    })
  },
  methods: {
    movieDetail: function (id) {
      this.$router.push('/movieDetail/' + id)
    }
  }
}
</script>

<style>
  .ul {
    border-bottom: 1px dashed #DDDDDD;
    line-height: 100%;
    clear: both;
  }
  p {
    display: block;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
  }
</style>
