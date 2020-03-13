<template>
  <div class="hmcell" @click="handlecellClick">

      <!-- <slot class="left" >{{text}}</div> -->
      <slot class="left" name="left" > {{text}}</slot>

      <div>{{title}}</div>
      <div class="right">{{type=== 'password' ? '******' : text2}}</div>
  </div>
</template>

<script>
export default {
  methods: {
    handlecellClick () {
      console.log(111)

      this.$emit('cellclick')
    }
  },
  props: ['text', 'text2', 'type', 'title']
}
</script>

<style lang='less' scoped>
.hmcell{
    padding: 20px 25px;
    display: flex;
    justify-content: space-between

}

</style>
