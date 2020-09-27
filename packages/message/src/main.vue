<template>
  <transition name="el-message-fade" @after-leave="handleAfterLeave">
    <div :class="[
			'bu-message',
			'bu-message-radius'
		]"
		:style="positionStyle">message</div>
  </transition>
</template>

<script>
  export default {
		name: "Message",
		data () {
			return {
				verticalOffset: 20,
				duration: 3000,
				closed: false,
				timer: null,
				onClose: null,
			}
		},
		computed: {
			positionStyle() {
        return {
          'top': `${ this.verticalOffset }px`
        };
      }
		},
		methods: {
			handleAfterLeave() {
				console.log(this);
			},
			startTimer() {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            if (!this.closed) {
              this.close();
            }
          }, this.duration);
        }
			},
			clearTimer() {
        clearTimeout(this.timer);
			},
			close() {
        this.closed = true;
        if (typeof this.onClose === 'function') {
          this.onClose(this);
        }
      },
		},
		mounted () {
			this.startTimer()
		}
  };
</script>

<style lang="scss">
	.bu-message {
		min-width: 380px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: #EBEEF5;
    position: fixed;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    background-color: #edf2fc;
    transition: opacity .3s,transform .4s,top .4s;
    padding: 15px 15px 15px 20px;
    display: flex;
    align-items: center;
	}

	.bu-message-radius {
		border-radius: 4px;
    overflow: hidden;
	}
</style>