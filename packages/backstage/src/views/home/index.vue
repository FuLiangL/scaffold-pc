<template>
  <el-row>
    <div :class="$style.welcome">
      <div :class="$style['welcome-left']">
        <div :class="$style['hello-nav']">欢迎回来，<span>{{userInfo.userName | name}}</span></div>
        <div :class="[$style['time-nav'], $style['el-icon-time']]">
          {{time}}<span>{{week}}</span>
        </div>
      </div>
      <div :class="$style.clock" v-show="isBegin">
        <div :class="$style.h" id="hour"></div>
        <div :class="$style.m" id="minute"></div>
        <div :class="$style.s" id="second"></div>
      </div>
    </div>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import store from '@/store'
import { UserInfo } from '@/common/interfaces'

@Component({
  name: 'hello',
  filters: {
    name: (name: string) => {
      if (name === 'admin') {
        return '超级管理员'
      }
      return `管理员${name}`
    },
  },
})
export default class Hello extends Vue {
  private time = ''

  private week = ''

  private isBegin = false

  get userInfo (): UserInfo {
    return store.getters.userInfo || {}
  }

  // 输出当前的时间地点
  private newTime () {
    const weekall = [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ]
    const time = new Date()
    const month = time.getMonth() + 1
    const year = time.getFullYear()
    const week = time.getDay()
    const day = time.getDate()
    this.time = `${year}-${month}-${day}`
    this.week = weekall[week]
  }

  private beginSetInterval () {
    const hour: any = document.getElementById('hour')
    const minute: any = document.getElementById('minute')
    const second: any = document.getElementById('second')
    let s = 0
    let m = 0
    let h = 0
    let ms = 0
    setInterval(() => {
      const date = new Date()
      ms = date.getMilliseconds()
      s = date.getSeconds() + ms / 1000
      m = date.getMinutes() + s / 60
      h = (date.getHours() % 12) + m / 60
      second.style.WebkitTransform = `rotate(${s * 6}deg)`
      minute.style.WebkitTransform = `rotate(${m * 6}deg)`
      hour.style.WebkitTransform = `rotate(${h * 30}deg)`
      second.style.MozTransform = `rotate(${s * 6}deg)`
      minute.style.MozTransform = `rotate(${m * 6}deg)`
      hour.style.MozTransform = `rotate(${h * 30}deg)`
      this.isBegin = true
    }, 100)
  }

  private mounted () {
    this.$nextTick(() => {
      this.newTime()
      this.beginSetInterval()
    })
  }
}
</script>

<style lang="scss" module>
.hello-nav {
  color: #8492a6;
  font-size: 40px;
}
.time-nav{
  font-size: 40px;
  margin: 20px auto 0;
  display: block !important;
  color: #8492a6;
}
.welcome {
  margin: -20px;
  height: calc(100vh - 105px);
  background-image: url('~@/assets/images/bg1.jpg');
}
.welcome-left {
  padding: 100px 0 0 100px;
  width: 500px;
}
.clock {
  width: 300px;
  height: 300px;
  background: url('~@/assets/images/time/clock.png') no-repeat;
  background-size: 300px 300px;
  position: absolute;
  right: 50px;
  top: 50px;
  div {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .h {
    background: url('~@/assets/images/time/hour.png') no-repeat center center;
    background-size: 15px 300px;
  }
  .m {
    background: url('~@/assets/images/time/minute.png') no-repeat center center;
    background-size: 15px 300px;
  }
  .s {
    background: url('~@/assets/images/time/second.png') no-repeat center center;
    background-size: 15px 300px;
  }
}

</style>
