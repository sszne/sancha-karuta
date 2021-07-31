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
          <div class="action-karuta-box" id="post-karuta">
            <span class="head">{{ selectKana }}</span>
            <p class="text">{{ inputText }}</p>
            <p class="user-name">{{ inputUserName }}</p>
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
            maxlength="6"
            v-model="inputUserName"
            placeholder="三茶かるたん"
          />
          <!-- <button 　class="submit-btn" @click="shareKaruta()">テスト</button> -->
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
        <div class="karuta-box" v-for="item in weekKarutaList" :key="item">
          <span class="head">{{ item.kana }}</span>
          <p class="text">{{ item.body }}</p>
          <p class="user-name">{{ item.userName }}</p>
        </div>
      </div>
      <div class="past">
        <h2>過去のお題</h2>
        <div class="archive area-flex">
          <div class="karuta-box" v-for="item in archiveKarutaList" :key="item">
            <span class="head">{{ item.kana }}</span>
            <p class="text">{{ item.body }}</p>
            <p class="user-name">{{ item.userName }}</p>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade-fast">
      <div
        class="dialog"
        v-if="inputValidateFlg"
        @click="inputValidateFlg = false"
      >
        <v-card class="dialog-card">
          <div v-if="postCompleteFlg" class="action-karuta-box">
            <span class="head">{{ selectKana }}</span>
            <p class="text">{{ inputText }}</p>
            <p class="user-name">{{ inputUserName }}</p>
          </div>
          <v-card-text class="dialog-text center-flex">{{
            inputValidateText
          }}</v-card-text>
          <!-- <a
            class="submit-btn center-flex"
            :href="facebookURL"
            target="_blank"
            rel="nofollow"
            >シェアする</a
          > -->
          <v-card-actions class="center-flex">
            <button
              class="submit-btn"
              @click="(inputValidateFlg = false), postCompleteFlg && reload()"
            >
              わかったよ
            </button>
          </v-card-actions>
        </v-card>
      </div>
    </transition>
    <footer></footer>
  </div>
</template>

<script>
export default {
  // head() {
  //   return {
  //     meta: [
  //       {
  //         hid: "og:description",
  //         property: "og:description",
  //         content: `${this.inputUserName} の三茶カルタ`
  //       },
  //       { hid: "og:url", property: "og:url", content: "" },
  //       { hid: "og:image", property: "og:image", content: this.ogpImageURL }
  //     ]
  //   };
  // },
  async asyncData(context) {
    return {
      karutaList:
        (await context.app.$request.get("karuta", "desc", "createdAt")) || [],
      weekKarutaList: [],
      archiveKarutaList: [],
      kanaList: (await context.app.$kana.getKanaList()) || [],
      selectKana: "",
      inputText: "",
      inputUserName: "",
      inputFlg: false,
      inputValidateFlg: false,
      inputValidateText: "",
      postCompleteFlg: false,
      postId: "",
      ogpImageURL: ""
    };
  },
  methods: {
    changeSelectKana(value) {
      this.selectKana = value;
    },
    getWeekKarutaList(karutaList) {
      this.weekKarutaList = karutaList.filter(karuta =>
        this.kanaList.includes(karuta.kana)
      );
    },
    getArchiveKarutaList(karutaList) {
      this.archiveKarutaList = karutaList.filter(
        karuta => !this.kanaList.includes(karuta.kana)
      );
    },
    async submitMessage(inputText, inputUserName) {
      if (!this.$kana.checkFirstKana(inputText.slice(0, 1), this.selectKana)) {
        this.inputValidateText = "はじめの文字はカルタと同じにしてね。";
        this.inputValidateFlg = true;
        return;
      }
      this.karutaList = await this.$request.get("karuta", "desc", "createdAt");
      this.postId = `karuta_${this.karutaList.length + 1}`;
      // const postSelector = document.querySelector("#post-karuta");
      // const url = await this.$request.uploadImage(postSelector, this.postId);
      this.ogpImageURL = url;
      const setData = {
        id: this.postId,
        kana: this.selectKana,
        body: inputText,
        userName: inputUserName,
        ogpImageURL: this.ogpImageURL,
        createdAt: ""
      };
      await this.$request.set(this.postId, setData);
      this.postCompleteFlg = true;
      this.inputValidateText = "このカルタが投稿されたよ。";
      this.inputValidateFlg = true;
    },
    reload() {
      location.reload();
    }
  },
  computed: {
    url() {
      return `https://cha-karuta.web.app`;
    },
    facebookURL() {
      return `https://www.facebook.com/sharer/sharer.php?u=${this.url}&t=test`;
    }
  },
  mounted() {
    this.selectKana = this.kanaList[0];
    this.postId = `karuta_${this.karutaList.length + 1}`;
    this.getWeekKarutaList(this.karutaList);
    this.getArchiveKarutaList(this.karutaList);
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
