<template>
  <div id="container">
    <link
      href="https://fonts.googleapis.com/earlyaccess/hannari.css"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Sawarabi+Mincho"
      rel="stylesheet"
    />
    <div id="main">
      <h1><img src="@/assets/images/main-image.png" alt="三茶カルタ" /></h1>
    </div>
    <div id="contents">
      <div class="discription">
        <p>三茶WORK2周年記念企画！三茶の日常をカルタにしよう！</p>
        <p>あまりにも面白くなったら本当のカルタになる！かも！</p>
      </div>
      <div class="week">
        <h2>今週のお題</h2>
        <div class="week-main">
          <div class="week-mainbox cenrer-flex">
            <span class="head">{{ kanaList[0] }}</span>
            <span class="headline">〜</span>
            <span class="head">{{ kanaList.slice(-1)[0] }}</span>
          </div>
          <button class="submit-btn" @click="inputFlg = true">入力する</button>
        </div>
      </div>
      <transition name="fade">
        <div v-show="inputFlg" class="action">
          <div class="select-kana center-flex">
            <button
              :class="['karuta-box', item === selectKana && 'active']"
              v-for="item in kanaList"
              :key="item"
              @click="changeSelectKana(item)"
            >
              <span class="head">{{ item }}</span>
            </button>
          </div>
          <div id="post-karuta">
            <div class="action-karuta-box">
              <span class="head">{{ selectKana }}</span>
              <p class="text">{{ inputText }}</p>
              <p class="user-name">{{ inputUserName }}</p>
            </div>
          </div>
          <textarea
            class="action-type"
            maxlength="21"
            v-model="inputText"
            placeholder="もう一杯と気づけばいつも朝だよね"
          />
          <h3>ニックネーム</h3>
          <input
            class="action-type nickname"
            type="text"
            maxlength="12"
            v-model="inputUserName"
            placeholder="三茶かるたん"
          />
          <button
            class="submit-btn"
            :disabled="inputText === '' && true"
            @click="submitMessage(inputText, inputUserName)"
          >
            送信する
          </button>
        </div>
      </transition>
      <div class="archive area-flex">
        <div
          class="karuta-box"
          v-for="item in weekKarutaList"
          :key="item"
          @click="showArchiveDetail(item)"
        >
          <span class="head">{{ item.kana }}</span>
          <p class="text">{{ item.body }}</p>
          <p class="user-name">{{ item.userName }}</p>
          <div class="like-badge">
            <v-icon>mdi-thumb-up</v-icon>
            <p>{{ item.like }}</p>
          </div>
        </div>
      </div>
      <!-- <div class="past">
        <h2>過去のお題</h2>
        <div class="archive area-flex">
          <div
            class="karuta-box"
            v-for="item in archiveKarutaList"
            :key="item"
            @click="showArchiveDetail(item)"
          >
            <span class="head">{{ item.kana }}</span>
            <p class="text">{{ item.body }}</p>
            <p class="user-name">{{ item.userName }}</p>
            <div class="like-badge">
              <v-icon>mdi-thumb-up</v-icon>
              <p>{{ item.like }}</p>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <transition name="fade-fast">
      <div class="dialog" v-if="inputValidateFlg">
        <v-card class="dialog-card">
          <div v-if="postCompleteFlg" class="action-karuta-box submit">
            <span class="head">{{ selectKana }}</span>
            <p class="text">{{ inputText }}</p>
            <p class="user-name">{{ inputUserName }}</p>
          </div>
          <div v-if="archiveDetailFlg" class="action-karuta-box submit">
            <span class="head">{{ selectArchiveKana }}</span>
            <p class="text">{{ selectArchiveBody }}</p>
            <p class="user-name">{{ selectArchiveUser }}</p>
          </div>
          <v-card-text class="dialog-text center-flex">{{
            inputValidateText
          }}</v-card-text>
          <v-card-actions class="center-flex">
            <div class="around-flex btn-group">
              <button
                v-if="likeButtonFlg"
                class="submit-btn"
                @click="pushLikeValue()"
              >
                {{ "いいね！" }}
              </button>
              <button
                v-if="postCompleteFlg || likeButtonFlg"
                class="submit-btn"
                @click="facebookShare()"
              >
                {{ likeButtonFlg ? "シェア！" : "facebookでシェア" }}
              </button>
            </div>
            <button
              class="submit-btn"
              @click="(inputValidateFlg = false), reloadFlg && reload()"
            >
              {{ buttonText }}
            </button>
          </v-card-actions>
        </v-card>
      </div>
    </transition>
    <footer></footer>
  </div>
</template>

<script>
import { allKana } from "@/types/allKana";
export default {
  async asyncData(context) {
    return {
      karutaList:
        (await context.app.$request.get("karuta", "desc", "createdAt")) || [],
      weekKarutaList: [],
      archiveKarutaList: [],
      // kanaList: (await context.app.$kana.getKanaList()) || [],
      kanaList: allKana,
      selectKana: "",
      inputText: "",
      inputUserName: "",
      inputFlg: false,
      inputValidateFlg: false,
      inputValidateText: "",
      buttonText: "わかったよ",
      postCompleteFlg: false,
      archiveDetailFlg: false,
      selectArchiveKana: "",
      selectArchiveBody: "",
      selectArchiveUser: "",
      likeButtonFlg: false,
      reloadFlg: false,
      postId: "",
      ogpImageURL: ""
    };
  },
  methods: {
    changeSelectKana(value) {
      this.selectKana = value;
    },
    getWeekKarutaList(karutaList) {
      this.weekKarutaList = karutaList.filter(
        karuta => this.kanaList.includes(karuta.kana) && karuta.kana !== "0"
      );
    },
    getArchiveKarutaList(karutaList) {
      this.archiveKarutaList = karutaList.filter(
        karuta => !this.kanaList.includes(karuta.kana) && karuta.kana !== "0"
      );
    },
    async submitMessage(inputText, inputUserName) {
      history.replaceState("", "", "");
      this.archiveDetailFlg = false;
      this.likeButtonFlg = false;
      this.buttonText = "わかったよ";
      if (!this.$kana.checkFirstKana(inputText.slice(0, 1), this.selectKana)) {
        this.inputValidateText = "はじめの文字はかるたと同じにしてね。";
        this.inputValidateFlg = true;
        this.reloadFlg = false;
        return;
      }
      this.karutaList = await this.$request.get("karuta", "desc", "createdAt");
      this.postId = `karuta_${this.karutaList.length + 1}`;
      const postSelector = document.querySelector("#post-karuta");
      const url = await this.$request.uploadImage(postSelector, this.postId);
      this.ogpImageURL = url;
      const setData = {
        id: this.postId,
        kana: this.selectKana,
        body: inputText,
        userName: inputUserName,
        like: 0,
        ogpImageURL: this.ogpImageURL,
        createdAt: ""
      };
      await this.$request.set(this.postId, setData);
      this.postCompleteFlg = true;
      this.inputValidateText = "このかるたが投稿されたよ。";
      this.inputValidateFlg = true;
      this.reloadFlg = true;
    },
    async showArchiveDetail(item) {
      this.postId = item.id;
      this.selectArchiveKana = item.kana;
      this.selectArchiveBody = item.body;
      this.selectArchiveUser = item.userName;
      this.archiveDetailFlg = true;
      this.inputValidateText = "このかるたが気に入ったら、いいね！しよう。";
      this.likeButtonFlg = true;
      this.buttonText = "やめとく";
      this.inputValidateFlg = true;
    },
    async pushLikeValue() {
      history.replaceState("", "", "");
      await this.$request.setLikeValue(this.postId);
      this.inputValidateText = "このカルタにいいね！しました。";
      this.buttonText = "わかったよ";
      this.likeButtonFlg = false;
      this.reloadFlg = true;
    },
    facebookShare() {
      const baseUrl = "https://www.facebook.com/sharer/sharer.php?";
      const url = ["u", `https://cha-karuta.web.app/posts/${this.postId}`];
      const parameter = new URLSearchParams([url]).toString();
      const shareUrl = `${baseUrl}${parameter}`;
      setTimeout(2000);
      window.open(
        shareUrl,
        "facebook",
        "top=200,left=300,width=600,height=600"
      );
      setTimeout(() => location.reload(), 2000);
    },
    reload() {
      location.search = "";
    }
  },
  watch: {
    inputValidateFlg: function(inputValidateFlg) {
      const el = document.querySelector("html");
      if (inputValidateFlg) {
        el.style = "overflow-y: hidden";
      } else {
        el.style = "overflow-y: scroll";
      }
    }
  },
  async mounted() {
    this.selectKana = this.kanaList[0];
    this.postId = `karuta_${this.karutaList.length + 1}`;
    this.getWeekKarutaList(this.karutaList);
    this.getArchiveKarutaList(this.karutaList);
    if (location.search.match("karuta_")) {
      let postId = "";
      if (location.search.match("&")) {
        postId = location.search.substring(1, location.search.indexOf("&"));
      } else {
        postId = location.search.slice(1);
      }
      console.log(postId);
      const karutaDetail = await this.$request.getDoc(postId);
      this.showArchiveDetail(karutaDetail);
    }
  },
  transition: "fade"
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.2s;
}
.fade-fast-enter-active,
.fade-fast-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-fast-enter,
.fade-leave-active,
.fade-fast-leave-active {
  opacity: 0;
}
</style>
