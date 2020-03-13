<template>
  <div class="input">
     <!-- :text2="imginfo.gender === 1 ?'男' :'女'" -->
<input :type="type"
     class="input1"
     :placeholder="placeholder"
    @input="handleinput"
    :value="value"

    :class="status===true ? 'success' : 'faii'"
    @blur="handlefocus"
>
  </div>
</template>

<script>
export default {
  props: ['placeholder', 'value', 'type', 'rules', 'msg_err'],
  data () {
    return {
      status: false

    }
  },
  mounted () {
    this.status = !!this.value
  },
  methods: {

    handlefocus (event) {
      if (this.rules) {
        if (this.rules && this.rules.test(event.target.value)) {
          this.status = true
        } else {
          this.status = false
          this.$toast.fail(this.msg_err)
        }
      } else {
        this.status = true

        if (!event.target.value) {
          this.$toast.fail(this.msg_err)
        }
      }
    },
    handleinput (event) {
      let value = event.target.value
      this.$emit('input', value)
      if (this.rules) {
        if (this.rules && this.rules.test(value)) {
          this.status = true
        } else {
          this.status = false
        }
      } else {
        this.status = true
        // this.status = !!value
      }
    }
  }
}
</script>

<style lang='less' scoped>
.success{
  color: green;
    border-bottom: 2px solid green !important;
    //  border-bottom-color: green
}
.faii{
   color: red;
     border-bottom-color:red!important
}

.input{
    .input1{
            border: none;
            outline: none;
            width: 314*100vw/360;
            height:48*100vw/360 ;
            line-height:48*100vm/360;
            border-bottom: 2px solid red;
            font-size: 20px
    }
}
</style>
