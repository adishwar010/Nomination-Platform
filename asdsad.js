db.paper.find().forEach(function (e) {
  if (e.attempted > 10) {
    let newResponse = [];
    for (let i = 0; i < e.responses.length; i++) {
      let flag = 0;
      for (let j = i + 1; j < e.responses.length; j++) {
        if (
          e.responses[i].questionId.toString() ===
          e.responses[j].questionId.toString()
        ) {
          flag = 1;
          break;
        }
      }
      if (flag === 0) {
        newResponse.push(e.responses[i]);
      }
    }
    db.paper.updateOne({ _id: e._id }, { $set: { responses: newResponse } });
  }
});
