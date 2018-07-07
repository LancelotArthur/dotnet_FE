<template>
  <div style="width: 80%;margin: 0 auto">
    <el-row id="global-wrap" :gutter="50">
      <el-col id="article" :span="18">
        <el-row style="text-align: left">
          <h1>选影视</h1>
        </el-row>
        <el-row style="text-align: left;margin-top: 10px">
          <fish-tag index="全部形式" color="primary">全部形式</fish-tag>
          <fish-tag index="剧情">电影</fish-tag>
          <fish-tag index="喜剧">电视剧</fish-tag>
          <fish-tag index="动作">综艺</fish-tag>
          <fish-tag index="爱情">动画</fish-tag>
          <fish-tag index="科幻">纪录片</fish-tag>
          <fish-tag index="动画">短片</fish-tag>
        </el-row>
        <el-row style="text-align: left;margin-top: 10px">
          <fish-tag index="全部类型" color="primary">全部类型</fish-tag>
          <fish-tag index="剧情" @click="handleGenresClick">剧情</fish-tag>
          <fish-tag index="爱情" @click="handleGenresClick">爱情</fish-tag>
          <fish-tag index="喜剧" @click="handleGenresClick">喜剧</fish-tag>
          <fish-tag index="科幻" @click="handleGenresClick">科幻</fish-tag>
          <fish-tag index="动作" @click="handleGenresClick">动作</fish-tag>
          <fish-tag index="悬疑" @click="handleGenresClick">悬疑</fish-tag>
          <fish-tag index="犯罪" @click="handleGenresClick">犯罪</fish-tag>
          <fish-tag index="恐怖" @click="handleGenresClick">恐怖</fish-tag>
          <fish-tag index="青春" @click="handleGenresClick">青春</fish-tag>
          <fish-tag index="励志" @click="handleGenresClick">励志</fish-tag>
          <fish-tag index="战争" @click="handleGenresClick">战争</fish-tag>
          <fish-tag index="文艺" @click="handleGenresClick">文艺</fish-tag>
          <fish-tag index="黑色幽默" @click="handleGenresClick">黑色幽默</fish-tag>
          <fish-tag index="传记" @click="handleGenresClick">传记</fish-tag>
          <fish-tag index="情色" @click="handleGenresClick">情色</fish-tag>
          <fish-tag index="音乐" @click="handleGenresClick">音乐</fish-tag>
          <fish-tag index="暴力" @click="handleGenresClick">暴力</fish-tag>
          <fish-tag index="家庭" @click="handleGenresClick">家庭</fish-tag>
        </el-row>
        <el-row style="text-align: left;margin-top: 10px">
          <fish-tag index="全部地区" color="primary">全部地区</fish-tag>
          <fish-tag index="汉语" @click="handleLanguageClick">大陆</fish-tag>
          <fish-tag index="英语" @click="handleLanguageClick">美国</fish-tag>
          <fish-tag index="粤语" @click="handleLanguageClick">香港</fish-tag>
          <fish-tag index="台湾" @click="handleLanguageClick">台湾</fish-tag>
          <fish-tag index="日语" @click="handleLanguageClick">日本</fish-tag>
          <fish-tag index="韩语" @click="handleLanguageClick">韩国</fish-tag>
          <fish-tag index="英语" @click="handleLanguageClick">英国</fish-tag>
          <fish-tag index="法语" @click="handleLanguageClick">法国</fish-tag>
          <fish-tag index="德语" @click="handleLanguageClick">德国</fish-tag>
          <fish-tag index="意大利语" @click="handleLanguageClick">意大利</fish-tag>
          <fish-tag index="西班牙语" @click="handleLanguageClick">西班牙</fish-tag>
          <fish-tag index="印地语" @click="handleLanguageClick">印度</fish-tag>
          <fish-tag index="泰语" @click="handleLanguageClick">泰国</fish-tag>
          <fish-tag index="俄语" @click="handleLanguageClick">俄罗斯</fish-tag>
          <fish-tag index="挪威语" @click="handleLanguageClick">挪威</fish-tag>
          <fish-tag index="英语" @click="handleLanguageClick">加拿大</fish-tag>
          <fish-tag index="英语" @click="handleLanguageClick">澳大利亚</fish-tag>
          <fish-tag index="芬兰语" @click="handleLanguageClick">芬兰</fish-tag>
          <fish-tag index="匈牙利语" @click="handleLanguageClick">匈牙利</fish-tag>
        </el-row>
        <el-row style="text-align: left;margin-top: 10px">
          <fish-tag index="全部特色" color="primary">全部特色</fish-tag>
          <fish-tag index="经典">经典</fish-tag>
          <fish-tag index="冷门佳片">冷门佳片</fish-tag>
          <fish-tag index="魔幻">魔幻</fish-tag>
          <fish-tag index="黑帮">黑帮</fish-tag>
          <fish-tag index="女性">女性</fish-tag>
          <!-- <el-button v-else class="button-new-tag" size="small" @click="showInput">+自定义标签</el-button> -->
        </el-row>
        <el-row style="text-align: left;margin-top: 10px">
          <el-radio-group v-model="radio5" size="small">
            <el-radio-button label="按热度排序"></el-radio-button>
            <el-radio-button label="按时间排序" @click="sortByTime"></el-radio-button>
            <el-radio-button label="按评价排序" @click="sortByRate"></el-radio-button>
          </el-radio-group>
        </el-row>
        <el-row v-for="i in 10" :key="i" style="margin-top: 20px">
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
    axios.get('http://localhost:8888/explore?type=year&tag=2016-2017&sort=ReleaseTime').then(response => {
      this.movie_data = response.data.result
    }, response => {
      this.$message({
        message: response.status,
        type: 'error'
      })
    })
  },
  methods: {
    sortByTime: function () {

    },
    sortByRate: function () {

    },
    movieDetail: function (id) {
      this.$router.push('/movieDetail/' + id)
    },
    handleLanguageClick: function (index) {
      axios.get('http://localhost:8888/explore?tag=' + index + '&type=language&sort=ReleaseTime').then(response => {
        this.movie_data = response.data.result
      }, response => {
        this.$message({
          message: response.status,
          type: 'error'
        })
      })
    },
    handleGenresClick: function (index) {
      axios.get('http://localhost:8888/explore?tag=' + index + '&type=genres&sort=ReleaseTime').then(response => {
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
