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

export default (context: any, inject: any) => {
  inject("kana", { getKanaList });
};
