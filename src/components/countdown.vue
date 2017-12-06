<template>
  <div :endTime="endTime" :class="{act_soon:(this.state == 1),act_going:(this.state == 0),act_end:(this.state == -1)}" :startTime="startTime">
    <slot>
      {{content}}
    </slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      state: ''
    };
  },
  props: {
    startTime: {
      type: Number,
      default: ""
    },
    endTime: {
      type: Number,
      default: ""
    }
  },
  mounted() {
    this.countdown(this.startTime, this.endTime);
  },
  methods: {
    countdown(startTime, endTime) {
      let self = this;
      let timer = setInterval(function() {
        let nowTime = new Date();
        let time1 = startTime - nowTime.getTime(); // 活动是否开始时间戳
        let time2 = endTime - nowTime.getTime();   // 活动是否结束时间戳
        if (time1 > 0) {
          //let day = Math.floor(time1/86400000);
          let hour = Math.floor(time1 / 3600000);
          let min = Math.floor((time1 / 60000) % 24);
          let sec = Math.floor((time1 / 1000) % 60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          let format = "";
          if (hour > 0) { //
            format = `${hour}:${min}:${sec}`;
            self.state = 1;
          }
          if (hour <= 0 && min > 0) {
            format = `00:${min}:${sec}`;
            self.state = 1;
          }
          if (min <= 0 && sec <= 0) {
            format = `进行中`;
            self.state = 0;
          }
          self.content = format;
        } else if ( time2 < 0) {
          clearInterval(timer);
          self.content = '已结束';
          self.state = -1;
        } else {
          clearInterval(timer);
          self.state = 0;
          self.content = '进行中';
        }
      }, 1000);
    }
  }
};
</script>
<style lang="less" scoped>

</style>
