<template>
  <div style="width: 60%;margin-left: 80px">
    <el-row id="global-wrap" :gutter="50">
      <el-col id="article" :span="25">
        <el-container id="onshow">
          <el-header height="40px">
            <el-row :gutter="20">
              <el-col :span="6"><div class="grid-content bg-purple"><h1>正在热映</h1></div></el-col>
            </el-row>
            <hr color="#d9d9d9"/>
          </el-header>
          <el-main>
            <el-row>
              <el-carousel :interval="4000" type="card" height="350px" style="text-align: center">
                <el-carousel-item v-for="(item) in movie_inTheaters" :key="item.id">
                  <img :src="item.cover_address" alt="" @click="movieDetail(item.id)">
                </el-carousel-item>
              </el-carousel>
            </el-row>
            <el-row>
              <el-carousel :interval="5000" arrow="always" height="250px" indicator-position="outside" style="margin-top: 20px">
                <el-carousel-item v-for="itemI in movie_inTheaters_more" :key="itemI">
                  <el-col :span="4" v-for="(item, index) in itemI" :key="item.id" :offset="index > 0 ? 1 : 0">
                    <el-card :body-style="{ padding: '0px' }">
                      <img :src="item.cover_address" alt="" style="width: 100%" @click="movieDetail(item.id)">
                      <div style="padding: 0;text-align: center">
                        <el-button type="text" class="button" @click="movieDetail(item.id)">{{item.movie_name}}</el-button>
                        <br>
                        <time class="time">{{ item.release_time.slice(2,12) }}</time>
                      </div>
                    </el-card>
                  </el-col>
                </el-carousel-item>
              </el-carousel>
            </el-row>
          </el-main>
        </el-container>
        <div id="recent" style="margin-top: 60px">
          <el-header style="padding: 0">
            <el-row :gutter="20">
              <el-col :span="4"><div class="grid-content bg-purple"><h3 style="margin-top: 10px">最近热门</h3></div></el-col>
              <el-col :span="16">
                <div class="grid-content bg-purple">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="汉语" name="first">
                    <span slot="label">华语</span>
                  </el-tab-pane>
                  <el-tab-pane label="英语" name="second">
                    <span slot="label">欧美</span>
                  </el-tab-pane>
                  <el-tab-pane label="韩语" name="third">
                    <span slot="label">韩国</span>
                  </el-tab-pane>
                  <el-tab-pane label="日语" name="fourth">
                    <span slot="label">日本</span>
                  </el-tab-pane>
                  <el-tab-pane label="more" name="fifth">
                    <span slot="label">更多>></span>
                  </el-tab-pane>
                </el-tabs>
                </div>
              </el-col>
            </el-row>
          </el-header>
          <el-main style="padding: 0">
            <el-row v-for="i in 2" :key="i" style="margin-top: 10px">
              <el-col :span="4" v-for="(item) in movie_recent.slice((i-1)*4,(i-1)*4+4)" :key="item.id" :offset="1">
                <el-card :body-style="{ padding: '0px' }">
                  <img :src="item.cover_address" class="image" style="width: 100%" @click="movieDetail(item.id)">
                  <div style="padding-top: 5px;text-align: center">
                    <el-button type="text" class="button" @click="movieDetail(item.id)">{{item.movie_name}}</el-button>
                    <br>
                    <time class="time">{{ item.release_time.slice(2,12) }}</time>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </div>
        <div id="review" style="margin-top: 60px">
          <el-row :gutter="20" style="text-align: left;margin-bottom: 10px">
            <el-col :span="8"><div class="grid-content bg-purple"><h3>最受欢迎的影评</h3></div></el-col>
            <el-col :span="15">
              <div class="grid-content bg-purple">
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple" style="margin-top: 20px">
                <router-link to='/review'>更多>></router-link>
              </div>
            </el-col>
          </el-row>
          <el-row :span="4" v-for="(item) in movie_review" :key="item.movie_id" :offset="0">
            <el-container style="text-align: left;margin-top: 10px">
              <el-aside width="100px">
                <img :src="item.movie.cover_address" class="image" @click="movieDetail(item.movie_id)">
              </el-aside>
              <el-container>
                <el-main style="padding-top: 0px">
                  <h5>{{item.user_name}} 评论 <a @click="movieDetail(item.movie_id)">{{item.movie.movie_name}}</a> </h5>
                  <h5 style="margin-top: 10px">{{item.review_text}} </h5>
                </el-main>
                <el-footer>{{item.helpfulness}}认为有用</el-footer>
              </el-container>
            </el-container>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
// import qs from 'qs'

export default {
  data () {
    return {
      currentDate: new Date(),
      activeName: 'first',
      movie_data: [],
      movie_inTheaters: [],
      movie_inTheaters_more: [],
      movie_recent: [],
      movie_review: []
    }
  },
  mounted: function () {
    axios.get('http://localhost:8888/explore?type=year&tag=2016-2017&sort=defualt').then(response => {
      this.movie_data = response.data.result
      for (let index = 0; index < 6; index++) {
        this.movie_inTheaters.push(this.movie_data[index])
      }
      for (let index = 0; index < 6; index++) {
        var temp = []
        for (let i = 0; i < 5; i++) {
          temp.push(this.movie_data[index * 5 + i])
        }
        this.movie_inTheaters_more.push(temp)
      }
    }, response => {
      this.$message({
        message: response.status,
        type: 'error'
      })
    })
    axios.get('http://localhost:8888/explore?tag=汉语&type=language&sort=ReleaseTime').then(response => {
      this.movie_recent = response.data.result
    }, response => {
      this.$message({
        message: response.status,
        type: 'error'
      })
    })
    axios.get('http://localhost:8888/review').then(response => {
      var temp = response.data.result.slice(0, 10)
      temp.forEach(element => {
        axios.get('http://localhost:8888/movie/' + element.movie_id).then(response => {
          if (response.data.status === '200') {
            element.movie = response.data.result
            this.movie_review.push(element)
          }
        }, response => {
          this.$message({
            message: response.status,
            type: 'error'
          })
        })
      })
    }, response => {
      this.$message({
        message: response.status,
        type: 'error'
      })
    })
  },
  methods: {
    handleClick: function (tab, event) {
      if (tab.label === 'more') {
        this.$router.push('/pickMovies')
      } else {
        axios.get('http://localhost:8888/explore?tag=' + tab.label + '&type=language&sort=ReleaseTime').then(response => {
          this.movie_recent = response.data.result
        }, response => {
          this.$message({
            message: response.status,
            type: 'error'
          })
        })
      }
    },
    movieDetail: function (id) {
      this.$router.push('/movieDetail/' + id)
    }
  }
}
</script>

<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }

</style>
