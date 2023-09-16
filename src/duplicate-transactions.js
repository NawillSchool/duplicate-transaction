function findDuplicateTransactions(transactions) {
  let clone = JSON.parse(JSON.stringify(transactions));
  let transDup = [], transMatch = [];
  let srcAcc, destAcc;

  clone.sort((a, b) => new Date(a.time) - new Date(b.time));

  function equal(trans1, trans2) {
    if (trans1.sourceAccount === trans2.sourceAccount && trans1.category === trans2.category
      && trans1.targetAccount === trans2.targetAccount && trans1.amount === trans2.amount) {
      return true;
    } else {
      return false;
    }
  }

  for (let i = 0; clone.length > 1; i++) {
    let len = clone.length;
    srcAcc = 0;
    destAcc = 1;
    transMatch = [srcAcc];

    while ((new Date(clone[destAcc].time) - new Date(clone[srcAcc].time)) <= 60000 && srcAcc < len - 1) {
      if (equal(clone[srcAcc], clone[destAcc])) {
        transMatch.push(destAcc);
        srcAcc = destAcc;
      }
      destAcc += 1;
      if (destAcc === len) { break;}
    }
    if (transMatch.length > 1) {
      let tmp = [];
      while (transMatch.length) {
        let eachDup = clone.splice(transMatch.pop(), 1);
        tmp.unshift(eachDup[0]);
      }
      transDup.push(tmp)
      transMatch = []
    } else {
        clone.shift()
    }
    if (transactions.length == 1) { break; }
  }
  return transDup;
}


export default findDuplicateTransactions;
