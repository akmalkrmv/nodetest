var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: {type: String},
  role: {type: String},
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
  category: { type: mongoose.Schema.ObjectId, ref: 'category' },
  words: [{ type: mongoose.Schema.ObjectId, ref: 'word' }]
});

var WordSchema = new mongoose.Schema({
  text: { type: String },
  audioUrl: { type: String },
  language: { type: mongoose.Schema.ObjectId, ref: 'language' },
  vocabulary: { type: mongoose.Schema.ObjectId, ref: 'vocabulary' }
});


var CategorySchema = new mongoose.Schema({
  text: { type: String },
  vocabularies: [{ type: mongoose.Schema.ObjectId, ref: 'vocabulary' }]
});


var DicitonarySchema = new mongoose.Schema({
  progress: { type: Number }, 
  added: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.ObjectId, ref: 'user' },
  vocabulary: { type: mongoose.Schema.ObjectId, ref: 'vocabulary' },
});


var TopicSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  added: { type: Date, default: Date.now },
  addedUser: { type: mongoose.Schema.ObjectId, ref: 'user' },
  // Todo: add reference for Tags, Categories and/or other data 
});

var User = mongoose.model('user', UserSchema);
var Word = mongoose.model('word', WordSchema);
var Topic = mongoose.model('topic', TopicSchema);
var Language = mongoose.model('language', LanguageSchema);
var Category = mongoose.model('category', CategorySchema);
var Vocabulary = mongoose.model('vocabulary', VocabularySchema);
var Dictionary = mongoose.model('dictionary', DicitonarySchema);

module.exports = {
  User: User,
  Word: Word,
  Language: Language,
  Category: Category,
  Vocabulary: Vocabulary,
  Dictionary: Dictionary,
}