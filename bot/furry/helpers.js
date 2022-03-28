let doneToken = "����}�";

function phraseSwap(phrases1, phrases2, text) {
  let wordSeps = new Array(" ", ",", ".", "'", "!", ":", "?", "\"", ";", "/", "<", ">", ")", "(", "%", "$");
  phrases2 = makeArrayClone(phrases2);
  for (let i = 0; i < phrases2.length; i++) {
    phrases2[i] = tokenate(phrases2[i]);
  }
  for (let i = 0; i < phrases1.length; i++) {
    for (let j = 0; j < wordSeps.length; j++) {
      if (phrases2[i] !== "") text = text.split(" " + phrases1[i].toLowerCase() + wordSeps[j]).join(" " + phrases2[i] + wordSeps[j]);
      else text = text.split(" " + phrases1[i].toLowerCase() + wordSeps[j]).join(" ");
    }
  }
  return text;
}

function intrawordSwap(intraword1, intraword2, text) {
  let start = 0;
  let end;

  let str = "";
  let finalText = "";
  for (end = 0; end < text.length + 1; end++) {
    str = text.substring(start, end);
    for (let i = 0; i < intraword1.length; i++) {
      if (str.indexOf(intraword1[i]) !== -1) {
        finalText += str.replace(intraword1[i], intraword2[i]);
        start = end;
        break;
      }
    }
  }
  finalText += text.substring(start, end);
  text = finalText;
  return text;
}

function wordSwap(words1, words2, text) {
  let wordSeps = new Array(" ", ",", ".", "'", "!", ":", "?", "\"", ";", "/", "<", ">", ")", "(", "%", "$");
  text = text.replace(/(\b\S+\b)\s+\b\1\b/i, "$1  $1");
  words2 = makeArrayClone(words2);
  for (let i = 0; i < words2.length; i++) {
    words2[i] = tokenate(words2[i]);
  }
  let words1_notags = [];
  for (let i = 0; i < words1.length; i++) {
    if (words1[i] instanceof Array) {
      words1_notags[i] = [];
      for (let j = 0; j < words1[i].length; j++) {
        words1_notags[i][j] = words1[i][j].replace(/\{\{.*\}\}/g, "");
      }
    } else {
      words1_notags[i] = words1[i].replace(/\{\{.*\}\}/g, "");
    }
  }

  let swapWithThis;
  for (let i = 0; i < words1_notags.length; i++) {
    if (words2[i] instanceof Array) {
      swapWithThis = words2[i][Math.floor(Math.random() * words2[i].length)];
    } else {
      swapWithThis = words2[i];
    }
    for (let j = 0; j < wordSeps.length; j++) {
      if (words1_notags[i] instanceof Array) {
        for (let k = 0; k < words1_notags[i].length; k++) {
          if (swapWithThis.length > 0) text = text.split(" " + words1_notags[i][k].toLowerCase() + wordSeps[j]).join(" " + swapWithThis + wordSeps[j]);
          else text = text.split(" " + words1_notags[i][k].toLowerCase() + wordSeps[j]).join(" ");
        }
      } else {
        if (words1_notags[i][0] + words1_notags[i].slice(-1) == "''" || words1_notags[i][0] + words1_notags[i].slice(-1) == "\"\"") {
          text = text.split(words1_notags[i].toLowerCase() + wordSeps[j]).join(swapWithThis + wordSeps[j]);
        } else if (swapWithThis.length > 0) text = text.split(" " + words1_notags[i].toLowerCase() + wordSeps[j]).join(" " + swapWithThis + wordSeps[j]);
        else text = text.split(" " + words1[i].toLowerCase() + wordSeps[j]).join(" ");
      }
    }
  }
  return text;
}

function prefixSwap(prefixes1, prefixes2, text) {
  prefixes2 = makeArrayClone(prefixes2);
  for (let i = 0; i < prefixes2.length; i++) {
    prefixes2[i] = tokenate(prefixes2[i]);
  }
  for (let i = 0; i < prefixes1.length; i++) {
    text = text.replace(new RegExp("\\s" + escapeRegex(prefixes1[i]) + "([^\\s])", "g"), " " + prefixes2[i] + "$1");
  }
  return text;
}

function suffixSwap(suffixes1, suffixes2, text) {
  suffixes2 = makeArrayClone(suffixes2);
  for (let i = 0; i < suffixes2.length; i++) {
    suffixes2[i] = tokenate(suffixes2[i]);
  }
  for (let i = 0; i < suffixes1.length; i++) {
    text = text.replace(new RegExp("([^\\s])" + escapeRegex(suffixes1[i]) + "\\s", "g"), "$1" + suffixes2[i] + " ");
  }
  return text;
}

function removeDoneTokens(text) {
  text = text.split(doneToken).join("");
  return text;
}

function regexReplace(regex1, regex2, text) {
  for (let i = 0; i < regex1.length; i++) {
    if (typeof regex2[0] == "string" || regex2[0] instanceof String) {
      let match = regex1[i].match(new RegExp("^/(.*?)/([gimy]*)$"));
      if (match) {
        let properRegEx = new RegExp(match[1], match[2]);
        text = text.replace(properRegEx, regex2[i]);
      }
    }
  }
  return text;
}

function wordOrdering(ordering1, ordering2, text) {
  for (let i = 0; i < ordering1.length; i++) {
    let regex = new RegExp("([^\\s]+){{" + ordering1[i].trim().replace(/[\s]+/g, " ").split(" ").join("}}[\\s]+([^\\s]+){{") + "}}", "g");
    let orderString = getRelativeOrder(ordering1[i].replace(/[\s]+/g, " ").split(" "), ordering2[i].replace(/[\s]+/g, " ").split(" "));
    text = text.replace(regex, "$" + orderString.split(",").join(" $"));
  }
  let alreadyRemovedTags = [];
  for (let i = 0; i < ordering1.length; i++) {
    let tags = ordering1[i].trim().replace(/[\s]+/g, " ").split(" ");
    for (let j = 0; j < tags.length; j++) {
      if (alreadyRemovedTags.indexOf(tags[j]) === -1) {
        text = text.replace("{{" + tags[j] + "}}", "");
        alreadyRemovedTags.push(tags[j]);
      }
    }
  }
  return text;
}

function applySentenceCase(str) {
  return str.replace(/.+?(\s|$)/g, function (txt) {
    if (txt.charAt(0).match(/[a-z]/g) !== null) return txt.charAt(0).toUpperCase() + txt.substr(1);
    else return txt;
  });
}

function capitalizeFirstLetter(string) {
  if (string.charAt(0).match(/[a-z]/g) !== null) return string.charAt(0).toUpperCase() + string.slice(1);
  else return string;
}

function makeArrayClone(existingArray) {
  let newObj = existingArray instanceof Array ? [] : {};
  for (let i in existingArray) {
    if (i == "clone") continue;
    if (existingArray[i] && typeof existingArray[i] == "object") {
      newObj[i] = makeArrayClone(existingArray[i]);
    } else {
      newObj[i] = existingArray[i];
    }
  }
  return newObj;
}

function tokenate(s) {
  if (Object.prototype.toString.call(s) === "[object Array]") {
    for (let i = 0; i < s.length; i++) {
      s[i] = doneToken + s[i].toString().split("").join(doneToken) + doneToken;
    }
    return s;
  } else {
    return doneToken + s.toString().split("").join(doneToken) + doneToken;
  }
}

function escapeRegex(regex) {
  return regex.replace(/([()[{*+.$^\\|?])/g, "\\$1");
}

function getRelativeOrder(truth, jumbled) {
  let order = [];
  for (let i = 0; i < jumbled.length; i++) {
    if (truth.indexOf(jumbled[i]) !== -1) {
      order.push(truth.indexOf(jumbled[i]) + 1);
    }
  }
  return order.join(",");
}

function handleDuplicates(words1, words2) {
  let words1InitialLength = words1.length;
  for (let i = 0; i < words1InitialLength; i++) {
    let findDupsOf = words1[i];
    let dupArray = new Array();
    let foundDups = false;
    if (!(findDupsOf.substring(0, "{{*DUPLICATE MARKER*}}".length) == "{{*DUPLICATE MARKER*}}")) {
      for (let j = 0; j < words1InitialLength; j++) {
        if (findDupsOf == words1[j] && i != j) {
          dupArray.push(words2[j]);
          words1[i] = "{{*DUPLICATE MARKER*}}" + words1[i];
          words1[j] = "{{*DUPLICATE MARKER*}}" + words1[j];
          foundDups = true;
        }
      }
    }
    if (foundDups) {
      dupArray.push(words2[i]);
      words1.push(findDupsOf);
      words2.push(dupArray);
    }
  }
  for (let i = 0; i < words1.length; i++) {
    if (words1[i].substring(0, "{{*DUPLICATE MARKER*}}".length) === "{{*DUPLICATE MARKER*}}") {
      if (i == 0) {
        words1.shift();
        words2.shift();
        i--;
      } else {
        words1.splice(i, 1);
        words2.splice(i, 1);
      }
    }
  }
  let result = new Array(words1, words2);
  return result;
}

function evenUpSizes(a, b) {
  if (a.length > b.length) {
    while (a.length > b.length) b.push("");
  } else if (b.length > a.length) {
    while (b.length > a.length) a.push("");
  }
}

module.exports = {
  phraseSwap,
  intrawordSwap,
  wordSwap,
  prefixSwap,
  suffixSwap,
  removeDoneTokens,
  regexReplace,
  wordOrdering,
  applySentenceCase,
  capitalizeFirstLetter,
  handleDuplicates,
  evenUpSizes,
  doneToken
};
