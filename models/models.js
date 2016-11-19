var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String }
});

var LanguageSchema = new mongoose.Schema({
  name: { type: String },
  words: [{ type: mongoose.Schema.ObjectId, ref: 'word' }]
});

var VocabularySchema = new mongoose.Schema({
  image: { data: Buffer, contentType: String },
  words: [{ type: mongoose.Schema.ObjectId, ref: 'word' }]
});

var WordSchema = new mongoose.Schema({
  text: { type: String },
  audio: { data: Buffer, contentType: String },
  languageId: { type: mongoose.Schema.ObjectId, ref: 'language' },
  vocabularyId: { type: mongoose.Schema.ObjectId, ref: 'vocabulary' }
});

LanguageSchema.virtual('wordTexts', {
  ref: 'word', 
  localField: '_id',
  foreignField: 'languageId'
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