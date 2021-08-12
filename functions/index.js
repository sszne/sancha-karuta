const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// const CONFIG = functions.config();
// const appDomain = CONFIG.app.domain;
const firestore = admin.firestore();

exports.posts = functions.https.onRequest(async (req, res) => {
  if (req.params[0] !== undefined) {
    const [, , postId] = req.path.split("/");
    console.log("postId", postId);
    const snapShot = await firestore
        .collection("karuta")
        .doc(postId)
        .get();
    const postData = snapShot.data();
    console.log("postData", postData);
    const SITEURL = "https://3chawork.tokyo/sancha-karuta";
    const PAGEURL = `${SITEURL}/posts/${postId}`;
    const TITLE = `${postData.userName}のかるた by さんちゃかるた`;
    const IMAGE = `${postData.ogpImageURL}`;
    const DESCRIPTION = `三茶WORK2周年記念企画！三茶の日常をカルタにしよう！
      あまりにも面白くなったら本当のカルタになる！かも！`;
    res.set("Cache-Control", "public, max-age=600, s-maxage=600");

    res.status(200).send(`<!doctype html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>さんちゃかるた</title>
        <meta property="fb:app_id" content="561144731039445">
        <meta property="og:title" content="${TITLE}">
        <meta property="og:image" content="${IMAGE}">
        <meta property="og:image:width" content="900" />
        <meta property="og:image:height" content="480" />
        <meta property="og:description" content="${DESCRIPTION}">
        <meta property="og:url" content="${PAGEURL}">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="さんちゃかるた">
        <meta name="twitter:site" content="${SITEURL}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${TITLE}">
        <meta name="twitter:image" content="${IMAGE}">
        <meta name="twitter:description" content="${DESCRIPTION}">
      </head>
      <body>
        <script>location.href = "https://3chawork.tokyo/sancha-karuta"; </script>
      </body>
    </html>`);
  }
});
