var app = new Vue({
  el: "#player",
  data: {
    //搜索内容
    search: "",
    //歌曲列表
    musicList: [],
    // 歌曲地址
    musicUrl: "",
    //歌曲封面url
    picUrl: "./images/album.jpg",
    //是否播放
    isPlay: false,
    //评论数组
    commentList: [],
    //mvUrl
    mvUrl: "",
    //遮罩层的显示状态
    isShow: false,
    //滚动
    myScroll: undefined,
    // 左边滚动
    leftScroll: undefined,
  },
  methods: {
    bar_leave() {
      document.querySelector("#player_bar").style.transform = "rotate(-25deg)";
    },
    bar_Enter() {
      document.querySelector("#player_bar").style.transform = "rotate(0deg)";
    },
    // 唱片开始旋转
    pic_spin() {
      document.querySelector(".disc").style.animation =
        "mymove 5s 0s linear infinite normal none running";
      document.querySelector(".songsPic").style.animation =
        "mymove 5s 0s linear infinite normal none running";
      console.log("开始旋转");
    },
    // 唱片停止旋转
    pic_stop() {
      document.querySelector(".disc").style.animation =
        "mymove 5s 0s linear infinite normal none paused";
      document.querySelector(".songsPic").style.animation =
        "mymove 5s linear infinite paused";
      console.log("停止旋转");
    },

    // 搜索歌曲
    searchMusic: function () {
      // 清空原来歌曲列表
      this.musicList = [];
      var that = this;
      axios.get("https://autumnfish.cn/search?keywords=" + this.search).then(
        function (response) {
          // console.log(response);
          // 赋值
          that.musicList = response.data.result.songs;
        },
        (err) => {}
      );
    },
    //放歌
    playMusic(items) {
      var that = this;
      // 获取歌曲url并且赋值
      axios.get("https://autumnfish.cn/song/url?id=" + items.id).then((res) => {
        console.log(res);
        that.musicUrl = res.data.data[0].url;
      });
      //获取歌曲封面url并且赋值
      axios
        .get("https://autumnfish.cn/song/detail?ids=" + items.id)
        .then((res) => {
          // console.log(res);
          that.picUrl = res.data.songs[0].al.picUrl;
        });
      // 指针移入
      this.bar_Enter();
      // 开始旋转
      this.pic_spin();
      // 获取歌曲热评
      axios
        .get("https://autumnfish.cn/comment/hot?type=0&id=" + items.id)
        .then((res) => {
          // console.log(res);
          that.commentList = res.data.hotComments;
        });
    },

    // 歌曲播放
    play() {
      console.log("play");
      this.isPlay = true;
      this.pic_spin();
      this.bar_Enter();
    },
    // 歌曲停止
    pause() {
      console.log("pause");
      this.isPlay = false;
      this.pic_stop();
      this.bar_leave();
    },
    //播放vm
    playMv(mvid) {
      var that = this;
      axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then((res) => {
        console.log(res);
        that.isShow = true;
        console.log("bofang ");
        that.mvUrl = res.data.data.url;
      });
    },
    // 隐藏mv
    hide: function () {
      this.isShow = false;
      console.log("hide");
    },
  },
});
