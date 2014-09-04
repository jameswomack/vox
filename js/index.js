/*jshint -W079 */

var ArgValidator = require('./argValidator');

var takeTheStage = function takeTheStage(speechSynthesis){
  // Ensure our arguments are of the proper type
  ArgValidator.bind(this)(arguments, ['SpeechSynthesis']);

  var voiceMap = speechSynthesis.getVoices().reduce(function(context, voice){
    context[voice.name] = voice;
    return context;
  },{});

  function UtteranceWithName(voiceName){
    var msg = new window.SpeechSynthesisUtterance();
    msg.voice = voiceMap[voiceName];
    msg.voiceURI = msg.voice.voiceURI;
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 1;
    // msg.text = 'Hello World';
    msg.lang = navigator.language;
    return msg;
  }

  function Vox(voiceName){
    this.utterance = UtteranceWithName(voiceName);
  }

  Vox.prototype.say = function(text){
    this.utterance.text = text;
    window.speechSynthesis.speak(this.utterance);
  };

  window.Vox = Vox;
  window.vox = new Vox('Alex');
};

window.onload = function(){
  window.speechSynthesis.onvoiceschanged = function(event){
    var speechSynthesis = event.target;
    takeTheStage.bind(takeTheStage)(speechSynthesis);
  };
};

