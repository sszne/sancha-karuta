<template>
  <div id="container">
    <div id="main">
      <h1><img src="images/logo.svg" alt="三茶カルタ" /></h1>
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
      inputFlg: false
    };
  },
  methods: {
    changeSelectKana(value) {
      this.selectKana = value;
    },
    async submitMessage(inputText) {
      if (inputText.slice(0, 1) !== this.selectKana) {
        alert("先頭文字は選択したカルタと同じにする必要があります");
        return;
      }
      const setData = {
        id: "",
        kana: this.selectKana,
        body: inputText
      };
      await this.$request.set("karuta", setData);
      location.reload();
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
    }
  },
  mounted() {
    this.selectKana = this.kanaList[0];
    this.getWeekKarutaList(this.karutaList);
    this.getArchiveKarutaList(this.karutaList);
  }
};
</script>
