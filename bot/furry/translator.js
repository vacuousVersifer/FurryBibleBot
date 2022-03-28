let { phraseSwap, intrawordSwap, wordSwap, prefixSwap, suffixSwap, removeDoneTokens, regexReplace, wordOrdering, applySentenceCase, capitalizeFirstLetter, handleDuplicates, evenUpSizes, doneToken } = require("./helpers");

let jsonData = {
  phrases1: "have sex with\nhad sex with\nhaving sex with\nhas sex with\nowd pewson\nowd man\nowd woman\newdewwy pewson\newdewwy man\newdewwy woman\nwhat's this\nyou awe\nawe you\nfowgive me\ni have sinnyed\npowice depawtment",
  phrases2: "yiff\nyiffed\nyiffing\nyiffs\ngreymuzzle\ngreymuzzle\ngreymuzzle\ngreymuzzle\ngreymuzzle\ngreymuzzle\nOwO what's this\nchu is\nis chu\nsowwy\ni've been naughty\nPAW Patrol",
  words1:
    "fuck\nfucked\nfucking\neat\nate\neating\neats\neaten\n:)\n:-)\n>:)\n>:-)\nXD\nxD\n:D\n:-D\n:O\n:0\n:-O\n:-0\n:o\n:-o\n>:D\n>:-D\n>:O\n>:-O\n>:0\n>:-0\n>:o\n>:-o\n( \u0361 \u00b0\u035c\u0296 \u0361 \u00b0)\n:(\n>:(\n:-(\n>:-(\npown\npownyogwaphy\npownyogwaphic\nstwaight\nhetewosexuaw\nhetewosexuawity\nyeww\nyewwed\nyewwing\nyewws\nshout\nshouted\nshouting\nshouts\nheww\nheck\nyou\nwove\n;)\n;-)\nthe\nwmao\ncheese\ncheeses\ndwagon\ndwagons\nthis\nthem\nthose\nthese\nthey\nthen\nthewe\nthewefowe\nsouwce\nsouwces\nchiwd\nchiwdren\nkid\nkids\nbite\nbit\nbiting\nbitten\nfow\nfoot\nfeet\nhand\nhands\nmouth\nmouths\npewsonya\nas\nknow\nout\nin\nhad\nto\nof\ndisease\ndiseases\npathogen\npathogens\ncewebwity\nnot\ncomputew\nwobot\ncybowg\ndog\ndogs\nswut\nswuts\nbuwge\ntawe\nfathew\ndad\npapa\nawesome\nwith\nfootpwint\nfootpwints\ncheesecake\ntoe\ntoes\nnyaughty\npewvewt\npewfect\nawfuw\nahh\nkiss\njizz\ncum\nsemen\nwittwe\nhyenya\nasshowe\nbutthowe\nyouw\nhi\nbye\nwhat\nwoaw\npowice",

  words2:
    "fluff\nfluffed\nfluffing\nvore\nvored\nvoring\nvores\nvored\n:3\n:3\n>:3\n>:3\nX3\nx3\nUwU\nUwU\nOwO\nOwO\nOwO\nOwO\nowo\nowo\n\u00d9w\u00da\n\u00d9w\u00da\n\u00d2w\u00d3\n\u00d2w\u00d3\n\u00d2w\u00d3\n\u00d2w\u00d3\n\u00f2w\u00f3\n\u00f2w\u00f3\nOwO\nono\n\u00f2n\u00f3\nono\n\u00f2n\u00f3\nyiff\nyiff\nyiffy\ngay\nhomosexual\nhomosexuality\nawoo\nawooed\nawooing\nawoos\nawoo\nawooed\nawooing\nawoos\nhecc\nhecc\nchu\nwuv\n;3\n;3\nteh\nhehe~\nsergal\nsergals\nderg\ndergs\ndis\ndem\ndose\ndese\ndey\nden\ndewe\ndewefowe\nsauce\nsauces\ncub\ncubs\ncub\ncubs\nnom\nnommed\nnomming\nnommed\nfur\nfootpaw\nfootpaws\npaw\npaws\nmaw\nmaws\nfursona\nas owo\nowo know\nout uwu\nowo in\nhad uwu\nuwu to\nof uwu\npathOwOgen\npathOwOgens\npathOwOgen\npathOwOgens\npopufur\nknot\nprotogen\nprotogen\nprotogen\ngood boy\ngood boys\nfox\nfoxes\nbulgy-wulgy\ntail\ndaddy\ndaddy\ndaddy\npawsome\nwif\npawpwint\npawpwints\nsergalcake\ntoe bean\ntoe beans\nknotty\nfurvert\npurrfect\npawful\n*murr*\nlick\ncummie wummy~\ncummie wummy~\ncummie wummy~\nwiddle\nyeen\ntailhole\ntailhole\nur\nhai\nbai\nwat\nrawr\npawlice",

  intraword1:
    "rawr\nwr\nl\nr\nL\nR\nna\nne\nni\nno\nnu\nNa\nNe\nNi\nNo\nNu\nNA\nNE\nNI\nNO\nNU\nnA\nnE\nnI\nnO\nnU\n\ud83d\ude02\n\ud83d\ude0f\n\ud83d\ude1a\n\ud83d\ude18\n\ud83d\ude17\n\ud83d\ude19\n\ud83d\ude31\n\ud83d\ude25\n\ud83d\ude09\n\ud83d\ude42\n\ud83d\ude01\n\ud83d\ude0d\n\ud83d\ude00\n\ud83e\udd23\n\ud83d\ude20\n\ud83d\ude21\n\ud83e\udd2c\n\ud83d\udc7f\n\ud83d\ude08\n  \n;\n!\n?\n\ud83c\udf46\n\ud83d\udc91\n\ud83d\udc8f\n\ud83d\udc6b\n\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffb\n\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffc\n\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffd\n\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffe\n\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\n\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffb\n\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffc\n\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffd\n\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffe\n\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\n\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffb\n\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffc\n\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffd\n\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffe\n\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\n\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffb\n\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffc\n\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffd\n\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffe\n\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\n\ud83d\udc69\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffb\n\ud83d\udc69\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffc\n\ud83d\udc69\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffd\n\ud83d\udc69\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c\udffe\n\ud83d\udc69\u200d\ud83e\udd1d\u200d\ud83e\uddd1\n\ud83d\udc6a\n\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\n\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\n\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66\n\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66\n\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc67\n\ud83d\udc63",

  intraword2:
    "rawr\nw\nw\nw\nW\nW\nnya\nnye\nnyi\nnyo\nnyu\nNya\nNye\nNyi\nNyo\nNyu\nNYA\nNYE\nNYI\nNYO\nNYU\nnyA\nnyE\nnyI\nnyO\nnyU\n\ud83d\ude39\n\ud83d\ude3c\n\ud83d\ude3d\n\ud83d\ude3d\n\ud83d\ude3d\n\ud83d\ude3d\n\ud83d\ude40\n\ud83d\ude3f\n;3\n:3\n\ud83d\ude38\n\ud83d\ude3b\n\ud83d\ude3a\n\ud83d\ude39\n\ud83d\ude3e\n\ud83d\ude3e\n\ud83d\ude3e\n\ud83d\ude3e\n\ud83d\ude3c\n uwu \n~\n owo!\n uwu?\n\ud83d\udc84\n\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68\n\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68\n\ud83d\udc6c\n\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffb\n\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffb\n\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffb\n\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffb\n\ud83d\udc68\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffb\n\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffb\n\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffc\n\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffc\n\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffc\n\ud83d\udc68\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffc\n\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffb\n\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffc\n\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffd\n\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffd\n\ud83d\udc68\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffd\n\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffb\n\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffc\n\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffd\n\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffe\n\ud83d\udc68\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffe\n\ud83d\udc68\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffb\n\ud83d\udc68\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffc\n\ud83d\udc68\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffd\n\ud83d\udc68\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c\udffe\n\ud83d\udc68\u200d\ud83e\udd1d\u200d\ud83d\udc68\n\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\n\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\n\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\n\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc66\n\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66\n\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc67\n\ud83d\udc3e",

  prefixes1: "",
  prefixes2: "",
  suffixes1: "nye\nnyes\nnyed",
  suffixes2: "ne\nnes\nned",
  regex1: "/,/gm",
  regex2: "~",
  rev_regex1: "",
  rev_regex2: "",
  ordering1: "",
  ordering2: "",
};

let phrases1 = jsonData.phrases1.split("\n");
let phrases2 = jsonData.phrases2.split("\n");
let words1 = jsonData.words1.split("\n");
let words2 = jsonData.words2.split("\n");
let intraword1 = jsonData.intraword1.split("\n");
let intraword2 = jsonData.intraword2.split("\n");
let prefixes1 = jsonData.prefixes1.split("\n");
let prefixes2 = jsonData.prefixes2.split("\n");
let suffixes1 = jsonData.suffixes1.split("\n");
let suffixes2 = jsonData.suffixes2.split("\n");
let regex1 = jsonData.regex1.split("\n");
let regex2 = jsonData.regex2.split("\n");
let rev_regex1 = jsonData.rev_regex1.split("\n");
let rev_regex2 = jsonData.rev_regex2.split("\n");
let ordering1 = jsonData.ordering1.split("\n");
let ordering2 = jsonData.ordering2.split("\n");

evenUpSizes(phrases1, phrases2);
evenUpSizes(words1, words2);
evenUpSizes(intraword1, intraword2);
evenUpSizes(prefixes1, prefixes2);
evenUpSizes(suffixes1, suffixes2);

handleDuplicates(words1, words2);

function translate(text) {
  if (text == "") return "";
  let translatedText = "";
  if (!([].concat(phrases1, phrases2, words1, words2, intraword1, intraword2, prefixes1, prefixes2, suffixes1, suffixes2, regex1, regex2, rev_regex1, rev_regex2, ordering1, ordering2).join("").length === 0)) {
    let sentenceArray = text.split(/(\.)/g);
    sentenceArray = sentenceArray.filter(function (s) {
      return s !== "";
    });
    for (let i = 0; i < sentenceArray.length; i++) {
      text = sentenceArray[i];
      if (text === ".") {
        translatedText += ".";
        continue;
      }
      if (text.trim() === "") {
        translatedText += text;
        continue;
      }
      let startsWithSpace = false;
      if (text[0] === " ") {
        startsWithSpace = true;
      }
      let firstLetterIsCapital = false;
      if (text.trim()[0] === text.trim()[0].toUpperCase()) {
        firstLetterIsCapital = true;
      }

      text = intrawordSwap(intraword1, intraword2, text);
      text = " " + text + " ";
      text = text.toLowerCase();
      text = text.split("\n").join(" 985865568NEWLINETOKEN98758659 ");
      text = phraseSwap(phrases1, phrases2, text);
      text = wordSwap(words1, words2, text);
      text = prefixSwap(prefixes1, prefixes2, text);
      text = suffixSwap(suffixes1, suffixes2, text);
      text = removeDoneTokens(text);
      text = text.split(doneToken).join("");
      text = text.trim();
      text = regexReplace(regex1, regex2, text);
      text = wordOrdering(ordering1, ordering2, text);

      text = text.split(" 985865568NEWLINETOKEN98758659 ").join("\n");
      text = text.split(" 985865568NEWLINETOKEN98758659").join("\n");
      text = text.split("985865568NEWLINETOKEN98758659").join("\n");
      text = text.replace(/(\b\S+\b)[ ]+\b\1\b/gi, "$1 $1");

      if (firstLetterIsCapital) {
        text = text[0].toUpperCase() + text.substr(1);
      }

      if (startsWithSpace) {
        text = " " + text;
      }

      translatedText += text;
    }

    translatedText = translatedText.split("{{*DUPLICATE MARKER*}}").join("");

    translatedText = applySentenceCase(translatedText);
    translatedText = capitalizeFirstLetter(translatedText);
  } else {
    translatedText = text;
  }

  return translatedText;
}

module.exports = translate;
