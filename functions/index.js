const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// const CONFIG = functions.config();
// const appDomain = CONFIG.app.domain;
// const firestore = admin.firestore();

exports.posts = functions.https.onRequest((req, res) => {
  if (req.params[0] !== undefined) {
    const [, , postId] = req.path.split("/");
    console.log(postId);
    // const snapShot = await firestore
    //     .collection("karuta")
    //     .doc()
    //     .get();
    // console.log(snapShot);
    // const SITEURL = `https://${appDomain}`;
    // const PAGEURL = `${SITEURL}/posts/${postId}`;
    // const TITLE = `view ${escapeHtml(uname)}'s colorsets on colorinco`;
    const DESCRIPTION =
      "カラーインコはTwitterでお気に入りしている画像のカラーパレットを表示・ストックできるサービスです。";
    res.set("Cache-Control", "public, max-age=600, s-maxage=600");

    res.status(200).send(`<!doctype html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>Christmas</title>
        <meta property="og:title" content="">
        <meta property="og:image" content="">
        <meta property="og:description" content="${DESCRIPTION}">
        <meta property="og:url" content="">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="">
        <meta name="twitter:site" content="クリスマスカード">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="">
        <meta name="twitter:image" content="">
        <meta name="twitter:description" content="${DESCRIPTION}">
      </head>
      <body>
      </body>
    </html>`);
  }
});
