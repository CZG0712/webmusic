<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Web-music</title>
    <link rel="stylesheet" href="./webmusic.css" />
  </head>
  <body>
    <!--播放器主体区域-->
    <div class="wrap" @click="hide">
      <div class="play_wrap" id="player">
        <!-- 顶部搜索区域 -->
        <div class="search_bar">
          <!-- <img
            src="http://autumnfish.cn/yuemusic//images/player_title.png"
            alt="开心听音乐"
          /> -->
          <div id="titleName"><p>随便听一听</p></div>
          <input
            type="text"
            v-model="search"
            @keyup.enter="searchMusic"
            placeholder="听你想听的歌！"
          />
        </div>
        <!-- 中部主体部分 -->
        <div class="center_con">
          <!-- 左边歌曲列表 -->
          <div class="son_wrapper">
            <ul class="song_list" style="list-style: none">
              <li v-for="items in musicList" @dblclick="playMusic(items)">
                <span>{{items.name}}--{{items.artists[0].name}}</span>
                <span v-if="items.mvid!=0" @click="playMv(items.mvid)"
                  ><img
                    src="./images/MV.png"
                    style="
                      position: absolute;
                      width: 22px;
                      margin-top: 14px;
                      margin-left: 14px;
                    "
                /></span>
              </li>
            </ul>
          </div>
          <!-- 中间歌曲专辑图片部分 -->
          <div class="player_con">
            <img src="./images/player_bar.png" id="player_bar" />
            <img src="./images/disc.png" id="disc" class="disc" />
            <img :src="picUrl" id="songsPic" class="songsPic" />
          </div>
          <!-- 右侧热评部分 -->
          <div class="comment_list">
            <div>
              <dl v-for="item in commentList" class="comments_dl">
                <dt><img :src="item.user.avatarUrl" class="albumImg" /></dt>
                <dd class="name">{{item.user.nickname}}</dd>
                <dd class="detailCom">{{item.content}}</dd>
              </dl>
            </div>
            <!-- <div class="iScrollVerticalScrollbar"></div> -->
          </div>
        </div>
        <!-- 音乐播放部分 -->
        <div class="audio_con">
          <audio
            :src="musicUrl"
            controls="controls"
            autoplay="autoplay"
            loop="loop"
            class="myaudio"
            @play="play"
            @pause="pause"
          ></audio>
        </div>
        <!-- mv播放部分 -->
        <div class="video_con" v-if="isShow">
          <video
            :src="mvUrl"
            controls="controls"
            width="600px"
            class="vedio.dede"
          ></video>
        </div>
        <div class="mask" @click="hide" v-if="isShow">
          <span
            style="
              display: flex;
              justify-content: center;
              line-height: 50px;
              font-weight: bolder;
              font-size: 25px;
              color: rgb(0, 74, 74);
              font-family: 'Times New Roman', Times, serif;
              background-color: rgb(142, 160, 160);
            "
            >点击此处关闭视频</span
          >
        </div>
      </div>
    </div>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
    <!-- 官网提供的axios在线地址 -->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="./music.js"></script>

    <!-- 动态蜘蛛网背景 -->
    <script
      type="text/javascript"
      src="https://cdn.bootcss.com/canvas-nest.js/1.0.1/canvas-nest.min.js"
    ></script>
    <script src="./spiderwebbackground.js"></script>
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>
    <!-- <script src="http://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.6/p5.js"></script> -->
    <!-- <script src="./mouseclickeffect.js"></script> -->
  </body>
</html>