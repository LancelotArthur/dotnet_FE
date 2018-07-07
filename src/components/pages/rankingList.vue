<template>
  <div style="width: 80%;margin: 0 auto">
    <el-row id="global-wrap" :gutter="50">
      <el-col id="article" :span="18">
        <el-row style="text-align: left">
          <h1>排行榜</h1>
        </el-row>
        <el-row style="text-align: left;margin-top: 15px;margin-bottom: 15px">
          <h3>新片榜</h3>
        </el-row>
        <el-row :span="4" v-for="(item) in movie_data.slice(0, 15)" :key="item.id" :offset="0">
          <p class="ul"/>
          <el-container style="margin-top: 30px">
            <el-aside width="150px">
              <img :src="item.cover_address" class="image" @click="movieDetail(item.id)">
            </el-aside>
            <el-container>
              <el-header height="20px" style="text-align: left">
                <h4><a @click="movieDetail(item.id)">{{item.movie_name}}</a></h4></el-header>
              <el-main style="padding-top: 0px">
                <h5 style="text-align: left;margin-top: 10px">
                  {{item.release_time.slice(2, item.release_time.length-2).split('\', \'').join(' / ')}}
                  / {{item.last_time_minute}}分钟
                  / {{item.genres.slice(2, item.genres.length-2).split('\', \'').join(' / ')}}
                  / {{item.movie_language}}
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
        <el-row style="text-align: left">
          <h3>分类排行榜</h3>
        </el-row>
        <el-row style="margin-top: 10px">
          <fish-tag index="剧情">剧情</fish-tag>
          <fish-tag index="喜剧">喜剧</fish-tag>
          <fish-tag index="动作">动作</fish-tag>
          <fish-tag index="爱情">爱情</fish-tag>
          <fish-tag index="科幻">科幻</fish-tag>
          <fish-tag index="动画">动画</fish-tag>
          <fish-tag index="悬疑">悬疑</fish-tag>
          <fish-tag index="惊悚">惊悚</fish-tag>
          <fish-tag index="恐怖">恐怖</fish-tag>
          <fish-tag index="纪录片">纪录片</fish-tag>
          <fish-tag index="短片">短片</fish-tag>
          <fish-tag index="情色">情色</fish-tag>
          <fish-tag index="同性">同性</fish-tag>
          <fish-tag index="音乐">音乐</fish-tag>
          <fish-tag index="歌舞">歌舞</fish-tag>
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
      movie_data: []
    }
  },
  mounted: function () {
    axios.get('http://111.231.141.52:8888/explore?type=year&tag=2016-2017&sort=ReleaseTime').then(response => {
      this.movie_data = response.data.result
      this.movie_data.forEach(element => {
        element.rate = element.rate / 2
      })
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
