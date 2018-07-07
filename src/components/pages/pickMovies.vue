<template>
  <div style="width: 80%;margin: 0 auto">
    <el-row id="global-wrap" :gutter="50">
      <el-col id="article" :span="18">
        <el-container>
          <el-header height="150px" style="padding: 0;text-align: left">
            <el-row>
              <h1>选电影</h1>
            </el-row>
            <el-row style="margin-top: 10px">
              <fish-tag index="最新" @click="handleRecentClick">最新</fish-tag>
              <fish-tag index="高分" @click="handleHighRateClick">高分</fish-tag>
              <fish-tag index="汉语" @click="handleLanguageClick">华语</fish-tag>
              <fish-tag index="英语" @click="handleLanguageClick">欧美</fish-tag>
              <fish-tag index="韩语" @click="handleLanguageClick">韩国</fish-tag>
              <fish-tag index="日语" @click="handleLanguageClick">日本</fish-tag>
              <fish-tag index="粤语" @click="handleLanguageClick">方言</fish-tag>
              <fish-tag index="剧情" @click="handleGenresClick">剧情</fish-tag>
              <fish-tag index="科幻" @click="handleGenresClick">科幻</fish-tag>
              <fish-tag index="惊悚" @click="handleGenresClick">惊悚</fish-tag>
              <fish-tag index="爱情" @click="handleGenresClick">爱情</fish-tag>
              <fish-tag index="悬疑" @click="handleGenresClick">悬疑</fish-tag>
              <fish-tag index="犯罪" @click="handleGenresClick">犯罪</fish-tag>
              <fish-tag index="战争" @click="handleGenresClick">战争</fish-tag>
              <fish-tag index="历史" @click="handleGenresClick">历史</fish-tag>
              <fish-tag index="家庭" @click="handleGenresClick">家庭</fish-tag>
              <fish-tag index="儿童" @click="handleGenresClick">儿童</fish-tag>
              <fish-tag index="灾难" @click="handleGenresClick">灾难</fish-tag>
              <fish-tag index="恐怖" @click="handleGenresClick">恐怖</fish-tag>
              <fish-tag index="奇幻" @click="handleGenresClick">奇幻</fish-tag>
              <fish-tag index="冒险" @click="handleGenresClick">冒险</fish-tag>
              <fish-tag index="喜剧" @click="handleGenresClick">喜剧</fish-tag>
              <fish-tag index="动画" @click="handleGenresClick">动画</fish-tag>
              <fish-tag index="音乐" @click="handleGenresClick">音乐</fish-tag>
              <fish-tag index="歌舞" @click="handleGenresClick">歌舞</fish-tag>
              <fish-tag index="武侠" @click="handleGenresClick">武侠</fish-tag>
              <fish-tag index="传记" @click="handleGenresClick">传记</fish-tag>
              <fish-tag index="同性" @click="handleGenresClick">同性</fish-tag>
            </el-row>
            <hr color="#d9d9d9"/>
          </el-header>
          <el-main>
            <el-row v-for="i in 4" :key="i" style="margin-top: 20px">
              <el-col :span="4" v-for="(item, index) in movie_data.slice((i-1)*4,(i-1)*4+4)" :key="item.id" :offset="index > 0 ? 2 : 0">
                <el-card :body-style="{ padding: '0px' }">
                  <img :src="item.cover_address" class="image" style="width: 100%">
                  <div style="padding: 10px 0 0 0;text-align: center">
                      <el-button type="text" class="button" @click="movieDetail(item.id)">{{item.movie_name}}</el-button>
                      <br>
                      <time class="time">{{ item.release_time.slice(2,12) }}</time>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
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
      movie_data: []
    }
  },
  mounted: function () {
    axios.get('http://111.231.141.52:8888/explore?type=year&tag=2016-2017&sort=ReleaseTime').then(response => {
      this.movie_data = response.data.result
    }, response => {
      this.$message({
        message: response.status,
        type: 'error'
      })
    })
  },
  methods: {
    load: function () { },
    movieDetail: function (id) {
      this.$router.push('/movieDetail/' + id)
    },
    handleRecentClick: function (index) {
      axios.get('http://111.231.141.52:8888/explore?type=year&tag=2016-2017&sort=ReleaseTime').then(response => {
        this.movie_data = response.data.result
      }, response => {
        this.$message({
          message: response.status,
          type: 'error'
        })
      })
    },
    handleHighRateClick: function (index) {
      axios.get('http://111.231.141.52:8888/explore?type=year&tag=2016-2017&sort=Rate').then(response => {
        this.movie_data = response.data.result
      }, response => {
        this.$message({
          message: response.status,
          type: 'error'
        })
      })
    },
    handleLanguageClick: function (index) {
      axios.get('http://111.231.141.52:8888/explore?tag=' + index + '&type=language&sort=ReleaseTime').then(response => {
        this.movie_data = response.data.result
      }, response => {
        this.$message({
          message: response.status,
          type: 'error'
        })
      })
    },
    handleGenresClick: function (index) {
      axios.get('http://111.231.141.52:8888/explore?tag=' + index + '&type=genres&sort=ReleaseTime').then(response => {
        this.movie_data = response.data.result
      }, response => {
        this.$message({
          message: response.status,
          type: 'error'
        })
      })
    }
  }
}
</script>

<style>

</style>
