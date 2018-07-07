<template>
  <div style="width: 80%;margin: 0 auto">
    <el-row id="global-wrap" :gutter="50">
      <el-col id="article" :span="18">
        <el-container id="detail">
          <el-header height="40px" style="text-align: left;padding: 0">
            <h1>{{movie_data.movie_name}}</h1>
          </el-header>
          <el-container>
            <el-aside width="150px">
              <img :src="movie_data.cover_address" class="image">
            </el-aside>
            <el-main style="padding-top: 0px;text-align: left">
              <h5 style="margin: 0" @click="actorDetail(movie_data_celebrity.Directors[0].id)">导演：<a>{{movie_data_celebrity.Directors[0].name}}</a> </h5>
              <h5 style="margin: 0" @click="actorDetail(movie_data_celebrity.Writers[0].id)">编剧：<a>{{movie_data_celebrity.Writers[0].name}}</a></h5>
              <h5 style="margin: 0" @click="actorDetail(movie_data_celebrity.Actors[0].id)">主演：<a>{{movie_data_celebrity.Actors[0].name}}</a> </h5>
              <h5 style="margin: 0">类型：{{movie_data.genres}}</h5>
              <h5 style="margin: 0">语言：{{movie_data.movie_language}}</h5>
              <h5 style="margin: 0">上映日期：{{movie_data.release_time}}</h5>
              <h5 style="margin: 0">片长：{{movie_data.last_time_minute}}分钟</h5>
              <h5 style="margin: 0">电影分级：{{movie_data.mpaa_rate}}</h5>
              <h5 style="margin: 0">豆瓣评分：{{movie_data.rate}}</h5>
            </el-main>
            <el-aside width="150px" style="border-left: 1px solid #d9d9d9">
              <el-button type="primary" :icon="isSeen" plain style="width: 134px;margin-left: 10px" @click="addToSeenList">
                看过
              </el-button>
              <el-button type="primary" :icon="isWish" plain style="margin-top: 20px" @click="addToWishList">
                加入心愿单
              </el-button>
              <el-button type="primary" icon="el-icon-edit" plain style="width: 134px;margin-top: 20px" @click="writeReview">
                写短评
              </el-button>
            </el-aside>
          </el-container>
        </el-container>
        <el-row id="summary">
          <h3>{{movie_data.movie_name}}的剧情简介 · · · · · ·</h3>
          <h5 style="margin-top: 10px">{{movie_data.brief_introduction}}</h5>
        </el-row>
        <el-row id="actors">
          <h3>{{movie_data.movie_name}}的影人 · · · · · ·（<a href="#" style="font-size: 15px">全部</a>）</h3>
          <el-col :span="3" v-for="(item, index) in movie_data_celebrity.Actors.slice(0,6)" :key="item.id" :offset="index == 0 ? 0 : 1">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="item.head_img" alt="不好意思图崩了" style="width: 100%">
              <div style="padding: 0;text-align: center">
                  <el-button type="text" class="button" @click="actorDetail(item.id)">{{item.name.split(' ')[0]}}</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row id="brief-review">
          <h3>{{movie_data.movie_name}}的短评 · · · · · ·（<a href="#" style="font-size: 15px">全部</a>）</h3>
          <a href="#">热门</a> / <a href="#">最新</a>
          <el-row v-for="(item, index) in movie_data_review" :key="item.user_id" style="margin-top: 0">
            <hr color="#d9d9d9" style="margin: 15px 0 15px 0"/>
            <el-container>
              <el-header height="20px" style="text-align: left;padding: 0">
                <el-col :span="3">
                  <h4><a href="#">{{item.user_name}}</a></h4>
                </el-col>
                <el-col :span="8">
                  <el-rate
                    v-model="item.score"
                    disabled
                    text-color="#ff9900"
                    disabled-void-color="#cccccc"
                    score-template="{value}">
                  </el-rate>
                </el-col>
                <el-col :span="8">
                  <span>{{item.helpfulness}}<el-button type="text" class="button" @click="clickHelp(index)">有用</el-button></span>
                </el-col>
              </el-header>
              <el-main style="padding: 0">
                <h5 style="text-align: left;margin-top: 10px">{{item.review_text}}</h5>
              </el-main>
            </el-container>
          </el-row>
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
      length: 2,
      isSeen: 'el-icon-circle-plus-outline',
      isWish: 'el-icon-circle-plus-outline',
      movie_data: {},
      movie_data_celebrity: {},
      movie_data_review: {}
    }
  },
  mounted: function () {
    axios.get('http://111.231.141.52:8888/movie/' + this.$route.params.id).then(response => {
      this.movie_data = response.data.result
      var genres = this.movie_data.genres.slice(2, this.movie_data.genres.length - 2).split('\', \'')
      this.movie_data.genres = genres.join(' / ')
      var releaseTime = this.movie_data.releaseTime.slice(2, this.movie_data.release_time.length - 2).split('\', \'')
      this.movie_data.release_time = releaseTime.join(' / ')
      this.movie_data.brief_introduction = this.movie_data.brief_introduction.slice(0, this.movie_data.brief_introduction.length - 6)
    }, response => {
      this.$message({
        message: response.status,
        type: 'error'
      })
    })
    axios.get('http://111.231.141.52:8888/movie/' + this.$route.params.id + '/celebrity').then(response => {
      this.movie_data_celebrity = response.data.result
    }, response => {
      this.$message({
        message: response.status,
        type: 'error'
      })
    })
    axios.get('http://111.231.141.52:8888/movie/' + this.$route.params.id + '/review').then(response => {
      this.movie_data_review = response.data.result
      this.movie_data_review.forEach(element => {
        element.isHelp = false
      })
    }, response => {
      this.$message({
        message: response.status,
        type: 'error'
      })
    })
  },
  methods: {
    actorDetail: function (id) {
      console.log(id)
      this.$router.push('/actorDetail/' + id)
    },
    addToSeenList: function () {
      if (this.isSeen === 'el-icon-circle-plus-outline') {
        this.isSeen = 'el-icon-circle-check'
      } else {
        this.isSeen = 'el-icon-circle-plus-outline'
      }
    },
    addToWishList: function () {
      if (this.isWish === 'el-icon-circle-plus-outline') {
        this.isWish = 'el-icon-circle-check'
      } else {
        this.isWish = 'el-icon-circle-plus-outline'
      }
    },
    writeReview: function () {

    },
    clickHelp: function (index) {
      if (this.$store.state.token) {
        if (this.movie_data_review[index].isHelp) {
          this.$message({
            type: 'info',
            duration: 2000,
            message: '这条短评你已经投过票了'
          })
        } else {
          this.movie_data_review[index].helpfulness++
          this.movie_data_review[index].isHelp = true
        }
      } else {
        this.$confirm('请先登录以发起投票', '提示', {
          confirmButtonText: '现在登录',
          cancelButtonText: '不，谢谢',
          type: 'info'
        }).then(() => {
          this.$router.push('/login')
        }).catch(() => {
        })
      }
    }
  }
}
</script>

<style>
  .el-row {
    text-align: left;
    margin-top: 30px;
  }
</style>
