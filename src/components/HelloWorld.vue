<template>
  <div>
    <div class="carousel" id="">
      <a class="carousel-item" href="#one!"><img src="../photos/dnf1.jpg"/></a>
      <a class="carousel-item" href="#two!"><img src="../photos/dnf2.jpg"/></a>
      <a class="carousel-item" href="#three!"><img src="../photos/dnf3.jpg"/></a>
      <a class="carousel-item" href="#four!"><img src="../photos/dnf4.jpg"/></a>
      <a class="carousel-item" href="#five!"><img src="../photos/dnf5.jpg"/></a>
    </div>
    <div class="btn-group" role="group" aria-label="...">
      <button type="button" class="btn btn-default">Left</button>
      <button type="button" class="btn btn-default">Middle</button>
      <button type="button" class="btn btn-default">Right</button>
      <a class="waves-effect waves-light btn">button</a>
      <a class="waves-effect waves-light btn"><i class="material-icons left">cloud</i>button</a>
      <a class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>button</a>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}

$(document).ready(function(){
  $('.carousel').carousel();
});



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app{
  height: 300px;
}
</style>
