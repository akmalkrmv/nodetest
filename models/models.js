var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String }
});
var LanguageSchema = new mongoose.Schema({
  name: { type: String }
});
var VocabularySchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String }
});
var WordSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String }
});

var User = mongoose.model('user', UserSchema);
var Language = mongoose.model('language', LanguageSchema);
var Vocabulary = mongoose.model('vocabulary', VocabularySchema);
var Word = mongoose.model('word', WordSchema);


module.exports = {
  User: User,
  Language: Language,
  Vocabulary: Vocabulary,
  Word: Word
}