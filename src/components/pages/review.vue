<template>
  <div style="width: 80%;margin: 0 auto">
    <el-row id="global-wrap" :gutter="50">
      <el-col id="article" :span="18">
        <el-container style="text-align: left;">
          <el-header style="padding: 0">
            <h1>最受欢迎的影评</h1>
            <a href="#">最受欢迎的</a> / <a href="#">新片评论</a>
          </el-header>
          <el-main style="padding: 0;margin-top: 20px">
            <el-row :span="4" v-for="(item) in movie_review" :key="item.movie_id" :offset="0">
              <el-container style="text-align: left;margin-top: 10px">
                <el-aside width="100px">
                  <img :src="item.movie.cover_address" class="image" @click="movieDetail(item.movie_id)">
                </el-aside>
                <el-container>
                  <el-main style="padding-top: 0px">
                    <h5>{{item.user_uame}} 评论 <a @click="movieDetail(item.movie_id)">{{item.movie.movie_name}}</a> </h5>
                    <h5 style="margin-top: 10px">{{item.review_text}} </h5>
                  </el-main>
                  <el-footer>{{item.helpfulness}}认为有用</el-footer>
                </el-container>
              </el-container>
            </el-row>
          </el-main>
          <el-footer style="padding: 0">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </el-footer>
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
      movie_review: []
    }
  },
  mounted: function () {
    axios.get('http://localhost:8888/review').then(response => {
      var temp = response.data.result.slice(0, 20)
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    movieDetail: function (id) {
      this.$router.push('/movieDetail/' + id)
    }
  }
}
</script>

<style>

</style>
