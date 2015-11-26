// This is for fuzzy search - adds isoScore field for each document and deletes original object ID if present
SavePackage = function(name, data) {
  data = _.clone(data);
  delete data._id;
  data.isoScore = (data.repoInfo)? data.repoInfo.isoScore : 0;
  TurtleLogs.update(name, {$set: data}, {upsert: true});
};