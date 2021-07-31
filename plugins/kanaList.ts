import moment from "moment";

const getKanaList = () => {
  const KANA_LIST = [
    {
      id: 0,
      kana: ["あ", "い", "う", "え", "お"],
      startDate: "2021-07-02 00:00",
      endDate: "2021-08-07 23:59"
    },
    {
      id: 1,
      kana: ["か", "き", "く", "け", "こ"],
      startDate: "2021-08-8 00:00",
      endDate: "2021-08-14 23:59"
    },
    {
      id: 2,
      kana: ["さ", "し", "す", "せ", "そ"],
      startDate: "2021-08-15 00:00",
      endDate: "2021-08-20 23:59"
    },
    {
      id: 3,
      kana: ["た", "ち", "つ", "て", "と"],
      startDate: "2021-08-21 00:00",
      endDate: "2021-08-28 23:59"
    },
    {
      id: 4,
      kana: ["な", "に", "ぬ", "ね", "の"],
      startDate: "2021-08-29 00:00",
      endDate: "2021-09-03 23:59"
    },
    {
      id: 5,
      kana: ["は", "ひ", "ふ", "へ", "ほ"],
      startDate: "2021-09-04 00:00",
      endDate: "2021-09-10 23:59"
    },
    {
      id: 6,
      kana: ["ま", "み", "む", "め", "も"],
      startDate: "2021-09-11 00:00",
      endDate: "2021-09-18 23:59"
    },
    {
      id: 7,
      kana: ["や", "ゆ", "よ"],
      startDate: "2021-09-17 00:00",
      endDate: "2021-09-25 23:59"
    },
    {
      id: 8,
      kana: ["ら", "り", "る", "れ", "ろ"],
      startDate: "2021-09-24 00:00",
      endDate: "2021-10-02 23:59"
    },
    {
      id: 9,
      kana: ["わ", "を", "ん"],
      startDate: "2021-09-11 00:00",
      endDate: "2021-10-07 23:59"
    }
  ];
  const result = KANA_LIST.filter((e: any) => {
    return (
      moment().isAfter(e.startDate, "minute") &&
      moment().isBefore(e.endDate, "minute")
    );
  });
  return result[0].kana;
};

const checkFirstKana = (inputFirstText: string, selectKana: string) => {
  const allowKanaList = [
    { kana: "あ", allowKana: ["あ", "ア"] },
    { kana: "い", allowKana: ["い", "イ"] },
    { kana: "う", allowKana: ["う", "ウ"] },
    { kana: "え", allowKana: ["え", "エ"] },
    { kana: "お", allowKana: ["お", "オ"] },
    { kana: "か", allowKana: ["か", "カ"] },
    { kana: "き", allowKana: ["き", "キ"] },
    { kana: "く", allowKana: ["く", "ク"] },
    { kana: "け", allowKana: ["け", "ケ"] },
    { kana: "こ", allowKana: ["こ", "コ"] },
    { kana: "さ", allowKana: ["さ", "サ"] },
    { kana: "し", allowKana: ["し", "シ"] },
    { kana: "す", allowKana: ["す", "ス"] },
    { kana: "せ", allowKana: ["せ", "セ"] },
    { kana: "そ", allowKana: ["そ", "ソ"] },
    { kana: "た", allowKana: ["た", "タ"] },
    { kana: "ち", allowKana: ["ち", "チ"] },
    { kana: "つ", allowKana: ["つ", "ツ"] },
    { kana: "て", allowKana: ["て", "テ"] },
    { kana: "と", allowKana: ["と", "ト"] },
    { kana: "な", allowKana: ["な", "ナ"] },
    { kana: "に", allowKana: ["に", "ニ"] },
    { kana: "ぬ", allowKana: ["ぬ", "ヌ"] },
    { kana: "ね", allowKana: ["ね", "ネ"] },
    { kana: "の", allowKana: ["の", "ノ"] },
    { kana: "は", allowKana: ["は", "ハ"] },
    { kana: "ひ", allowKana: ["ひ", "ヒ"] },
    { kana: "ふ", allowKana: ["ふ", "フ"] },
    { kana: "へ", allowKana: ["へ", "ヘ"] },
    { kana: "ほ", allowKana: ["ほ", "ホ"] },
    { kana: "ま", allowKana: ["ま", "マ"] },
    { kana: "み", allowKana: ["み", "ミ"] },
    { kana: "む", allowKana: ["む", "ム"] },
    { kana: "め", allowKana: ["め", "メ"] },
    { kana: "も", allowKana: ["も", "モ"] },
    { kana: "や", allowKana: ["や", "ヤ"] },
    { kana: "ゆ", allowKana: ["ゆ", "ユ"] },
    { kana: "よ", allowKana: ["よ", "ヨ"] },
    { kana: "ら", allowKana: ["ら", "ラ"] },
    { kana: "り", allowKana: ["り", "リ"] },
    { kana: "る", allowKana: ["る", "ル"] },
    { kana: "れ", allowKana: ["れ", "レ"] },
    { kana: "ろ", allowKana: ["ろ", "ロ"] },
    { kana: "わ", allowKana: ["わ", "ワ"] },
    { kana: "を", allowKana: ["を", "ヲ"] },
    { kana: "ん", allowKana: ["ん", "ン"] }
  ];
  let result = false;
  allowKanaList.map((e: any) => {
    if (e.kana === selectKana && e.allowKana.includes(inputFirstText)) {
      result = true;
    }
  });
  console.log(result);
  return result;
};

export default (context: any, inject: any) => {
  inject("kana", { getKanaList, checkFirstKana });
};
