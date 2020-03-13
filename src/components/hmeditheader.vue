<template>
  <div class="hm-editheader">
        <span class="slots">
            <slot name="left"></slot>
            <div class="title">{{title}}</div>
            <slot name="right"></slot>
        </span>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang='less' scoped>
.hm-editheader{
  border-bottom: 2px solid #ccc;
    .slots{
    display: flex;
justify-content: space-between;
padding: 20px 19px;

    }

}

</style>
