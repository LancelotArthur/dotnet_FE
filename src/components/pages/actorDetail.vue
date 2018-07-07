<template>
  <div style="width: 80%;margin: 0 auto">
    <el-row id="global-wrap" :gutter="50">
      <el-col id="article" :span="18">
        <el-container id="detail">
          <el-header height="40px" style="text-align: left;padding: 0">
            <h1>{{actor_info.name}}</h1>
          </el-header>
          <el-container>
            <el-aside width="150px">
              <img :src="actor_info.head_img" class="image">
            </el-aside>
            <el-main style="padding-top: 10px;text-align: left">
              <h5 style="margin: 0" v-if="actor_info.gender">性别：{{actor_info.gender}}</h5>
              <h5 style="margin: 0" v-if="actor_info.birthday">生日：{{actor_info.birthday}}</h5>
              <h5 style="margin: 0" v-if="actor_info.nation">出生地：{{actor_info.nation}}</h5>
              <h5 style="margin: 0" v-if="actor_info.occupation">职业：{{actor_info.occupation}}</h5>
            </el-main>
          </el-container>
        </el-container>
        <p class="ul"/>
        <el-row id="intro">
          <h3>影人简介  · · · · · ·</h3>
          <h5 style="margin-top: 10px">{{actor_info.brief_introduction}}</h5>
        </el-row>
        <el-row id="intro">
          <h3>影人图片  · · · · · ·(<a href="#">上传照片</a>)</h3>
          <el-col :span="4" v-for="(o, index) in 5" :key="o" :offset="index == 0 ? 0 : 1">
          </el-col>
        </el-row>
        <el-row id="recent-works">
          <h3>{{actor_info.name.split(' ')[0]}}的作品（已上映）· · · · · ·  (<a href="#">全部</a>)</h3>
          <el-col :span="4" v-for="(item, index) in actor_info_movie" :key="item.id" :offset="index == 0 ? 0 : 1">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="item.cover_address" class="image">
              <div style="padding: 0;text-align: center">
                  <el-button type="text" class="button" @click="movieDetail(item.id)">{{item.movie_name}}</el-button>
                  <h5 style="color: #d9d9d9;margin: 0;font-size: 13px">{{item.release_time.slice(2,12)}}</h5>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col id="aside" :span="6">
        <el-row id="most-popular-works">
          <h5>{{actor_info.name.split(' ')[0]}}的影迷 · · · · · ·  (<a href="#">全部</a>)</h5>
          <el-row v-for="(o) in 2" :key="o">
            <el-col :span="5" v-for="(o, index) in 4" :key="o" :offset="index == 0 ? 0 : 1">
              <el-card :body-style="{ padding: '0px' }">
              </el-card>
            </el-col>
          </el-row>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      actor_info: {},
      actor_info_movie: []
    }
  },
  mounted: function () {
    axios.get('http://localhost:8888/celebrity/' + this.$route.params.id).then(response => {
      this.actor_info = response.data.result
      var occupation = ''
      if (this.actor_info.writer) {
        occupation += '编剧'
      } else if (this.actor_info.actor) {
        occupation += ' 演员'
      } else if (this.actor_info.director) {
        occupation += ' 导演'
      } else if (this.actor_info.producer) {
        occupation += ' 制片人'
      }
      if (occupation[0] === ',') {
        occupation = occupation.slice(1, occupation.length)
      }
      this.actor_info.occupation = occupation
    }, response => {
      this.$message({
        message: response.status,
        type: 'error'
      })
    })
    axios.get('http://localhost:8888/celebrity/' + this.$route.params.id + '/movie').then(response => {
      if (response.data.result.Writers) {
        this.actor_info_movie = response.data.result.Writers
      } else if (response.data.result.Producers) {
        this.actor_info_movie = response.data.result.Producers
      } else if (response.data.result.Actors) {
        this.actor_info_movie = response.data.result.Actors
      } else if (response.data.result.Directors) {
        this.actor_info_movie = response.data.result.Directors
      }
      console.log(this.actor_info_movie)
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

</style>
