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
      <!-- <h1><img src="@/assets/images/main-image.png" alt="三茶カルタ" /></h1> -->
    </div>
    <div id="contents">
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
        <div v-if="inputFlg" class="action">
          <div class="select-kana center-flex">
            <div
              :class="['karuta-box', item === selectKana && 'active']"
              v-for="item in kanaList"
              :key="item"
              @click="changeSelectKana(item)"
            >
              <span class="head">{{ item }}</span>
            </div>
          </div>
          <div class="action-karuta-box">
            <span class="head">{{ selectKana }}</span>
            <p class="text">{{ inputText }}</p>
          </div>
          <textarea
            class="action-type"
            maxlength="21"
            v-model="inputText"
            placeholder="もう一杯と気づけばいつも朝だよね"
          />
          <button
            class="submit-btn"
            :disabled="inputText === '' && true"
            @click="submitMessage(inputText)"
          >
            送信する
          </button>
        </div>
      </transition>
      <div class="archive area-flex">
        <div class="karuta-box" v-for="item in weekKarutaList" :key="item">
          <span class="head">{{ item.kana }}</span>
          <p class="text">{{ item.body }}</p>
        </div>
      </div>
      <div class="past">
        <h2>過去のお題</h2>
        <div class="archive area-flex">
          <div class="karuta-box" v-for="item in archiveKarutaList" :key="item">
            <span class="head">{{ item.kana }}</span>
            <p class="text">{{ item.body }}</p>
          </div>
        </div>
      </div>
    </div>
    <v-btn @click.stop="inputValidateFlg = true" />
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
          </div>
          <v-card-text class="dialog-text center-flex">{{
            inputValidateText
          }}</v-card-text>
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
  async asyncData(context) {
    return {
      karutaList: (await context.app.$request.get("karuta")) || [],
      weekKarutaList: [],
      archiveKarutaList: [],
      kanaList: (await context.app.$kana.getKanaList()) || [],
      selectKana: "",
      inputText: "",
      inputFlg: false,
      inputValidateFlg: false,
      inputValidateText: "",
      postCompleteFlg: false
    };
  },
  methods: {
    changeSelectKana(value) {
      this.selectKana = value;
    },
    async submitMessage(inputText) {
      if (inputText.slice(0, 1) !== this.selectKana) {
        this.inputValidateText = "はじめの文字はカルタと同じにしてね。";
        this.inputValidateFlg = true;
        return;
      }
      const setData = {
        id: "",
        kana: this.selectKana,
        body: inputText
      };
      await this.$request.set("karuta", setData);
      this.postCompleteFlg = true;
      this.inputValidateText = "このかるたが投稿されたよ。";
      this.inputValidateFlg = true;
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
    reload() {
      location.reload();
    }
  },
  mounted() {
    this.selectKana = this.kanaList[0];
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
