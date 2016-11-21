var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  dictionary: [{ type: mongoose.Schema.ObjectId, ref: 'dictionary' }]
});

var LanguageSchema = new mongoose.Schema({
  name: { type: String },
  cultureName: { type: String },
  cultureCode: { type: String },
  words: [{ type: mongoose.Schema.ObjectId, ref: 'word' }]
});

var VocabularySchema = new mongoose.Schema({
  imageUrl: { type: String },
  words: [{ type: mongoose.Schema.ObjectId, ref: 'word' }]
});

var WordSchema = new mongoose.Schema({
  text: { type: String },
  audioUrl: { type: String },
  language: { type: mongoose.Schema.ObjectId, ref: 'language' },
  vocabulary: { type: mongoose.Schema.ObjectId, ref: 'vocabulary' }
});

var DicitonarySchema = new mongoose.Schema({
  progress: { type: Number }, 
  added: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.ObjectId, ref: 'user' },
  vocabulary: { type: mongoose.Schema.ObjectId, ref: 'vocabulary' },
});

var User = mongoose.model('user', UserSchema);
var Word = mongoose.model('word', WordSchema);
var Language = mongoose.model('language', LanguageSchema);
var Vocabulary = mongoose.model('vocabulary', VocabularySchema);
var Dictionary = mongoose.model('dictionary', DicitonarySchema);


module.exports = {
  User: User,
  Language: Language,
  Vocabulary: Vocabulary,
  Word: Word
}