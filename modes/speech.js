/*
 * Creates a SpeechRec object.
 * 
 * @param {Song} (args.song) the current Song that is being played
 * @param {int} (args.matchCutoff) the minimum number of words needed to be recognized in a lyric line
 * @param {String} (args.finalId) id of html element to display interim results
 * @param {String} (args.interimId) id of html element to display final results
 * @param {int} (args.endTimeout) timeout before recognition starts again (?)
 * @constructor
 */
var SpeechRec = function(args) {
  var that = this;

  /* Recognition Variables */
  var song = args.song;
  var matchCutoff = args.matchCutoff;
  var recognition = new webkitSpeechRecognition();
  var final_span = document.getElementById(args.finalId);
  var interim_span = document.getElementById(args.interimId);
  var endTimeout = args.endTimeout;
  var isStopped = true;

  /* Line tracking variables */
  var currentLine = 0;
  var lyrics = song.getLineElement(currentLine+1)[0].textContent;

  /*
   * Sets song view 
   */
  that.setSong = function(songview) {
    song = songview;
  }

  /*
   * Sets the current line that speech is tracking
   * @param {int} the new line number
   */
  that.setCurrentLine = function(newLineNum, fusing = false) {
    var info = {previousLine: currentLine, nextLine: newLineNum, fusing: fusing};
  	currentLine = newLineNum; // update current line before event trigger in case fusion
    $(that).triggerHandler("speechUpdate", info);
    if ((currentLine + 1) <= song.getTotalNumLines()) {
  	  lyrics = song.getLineElement(currentLine+1)[0].textContent;
    }
  };

  /*
   * Returns the current line that speech is tracking
   */
  that.getCurrentLine = function() {
  	return currentLine;
  };

  /*
   * Sets the current lyrics that speech recognition is now listening for
   * @param {int} the new line number
   */
  that.setLyrics = function(newLyrics) {
  	lyrics = newLyrics;
  };

  /*
   * Returns the lyrics that speech recognition is currently listening for
   */
  that.getLyrics = function() {
  	return lyrics;
  };

  /*
   * Sets up and begins speech recognition
   */
  that.start = function() {
    isStopped = false;
	  recognition.continuous = true;
	  recognition.interimResults = true;
	  recognition.onstart = onStart;
	  recognition.onresult = onResult;
	  recognition.onend = onEnd;
	  recognition.start();
	};

  /*
   * Ends speech recognition
   */
  that.stopRecognition = function() {
    recognition.stop();
    isStopped = true;
  }

  /**** Speech Recognition Helper Functions ****/

  /*
   * Compares speech recognition output with lyric line.
   *
   * @param {String} lyrics
   * @param {String} recognized speech
   */
  var userSaidPhrase = function(line, speech) {
    var expectedWords = line.toLowerCase().trim().split(' ');
    var lowerCaseCommands = speech.toLowerCase().trim();
    var nMatches = expectedWords.length >= matchCutoff ? matchCutoff : expectedWords.length;
    var wordsSaid = 0;
    expectedWords.forEach(function(word) {
      if (lowerCaseCommands.includes(word))
        wordsSaid += 1;
    });

    return wordsSaid >= nMatches;
  };

  var onStart = function() {
    if (final_span !== null && interim_span !== null) {
      final_span.innerHTML = '';
      interim_span.innerHTML = '';
    }
  };

  var onResult = function(event) {
    var interim_transcript = '';
    var final_transcript = '';
    var processed_line = false;

		for (var i = 0; i < event.results.length; i++) {
			var result = event.results[i];
			if (result.isFinal)
    		final_transcript += result[0].transcript;
    	else
    		interim_transcript += result[0].transcript;
		}

    if (final_span !== null && interim_span !== null) {
      final_span.innerHTML = final_transcript;
      interim_span.innerHTML = interim_transcript;
    }
    if (userSaidPhrase(lyrics, interim_transcript)) {
      if ((currentLine + 1) <= song.getTotalNumLines()) {
      	that.setCurrentLine(currentLine + 1);
      }
      processed_line = true;
    }

    else if (interim_transcript.trim().split(' ').length === 5) {
      processed_line = true;
    }

    // If line processed, kill recognition and restart
    if (processed_line) {
      recognition.stop();
    }
  };

  var onEnd = function(event) {
  	// Restart recognition if it has stopped
    if (!isStopped){
      setTimeout(function() {
        recognition.start();
      }, endTimeout);
    }
  };
 };