# MusicBuddy 
A web app that detects user's gaze, motion, and speech to provide custom autoscrolling on ukulele tabs. Final term project for MIT class 6.835- Intelligent Multimodal User Interfaces.

Full functionality tested on MacOS. Best performance under adequate light.

#### How to Run: Two Options
* Visit https://elainewlin.github.io/MusicBuddy/
* Start local server ```python -m SimpleHTTPServer ``` and then visit http://localhost:8000/

#### System Requirements
* Google Chrome (tested with version 57)
* Webcam, microphone, and ukulele
* Python 2.7 (for running locally)

#### External Libraries Used
* Gaze Detection: [WebGazer.js](https://webgazer.cs.brown.edu/) 
* Speech Detection: [WebSpeech API](https://www.google.com/intl/en/chrome/demos/speech.html)
* Motion Detection: Modified version of [diff-cam-engine](https://github.com/lonekorean/diff-cam-engine)
* Song Loading + Templating: [Mustache](https://mustache.github.io/) 
#### How to Load Different Songs From JSON
Use Mustache for rendering HTML templates from JSON files
* JSON File Structure
    - title: string with title of the song
    - artist: string with the artist of the song
    - allChords: array of strings of all chords in the song ex: ['Am', 'F', 'C', 'G']
    - lines: array of JSON objects for each chord-lyric pair in the song
        - count: id of the pair, used for jQuery selectors
        - chord: string with the chords + white spaces
        - lyrics: string with the lyrics
        - label: string with label of the section i.e. "Chorus", "Verse 1"
* JSON File Generator API (parser.py)
    - readURL(url): helper function to scrape HTML of a URL
    - toText(url): URL of a song --> text file of a song
    - allToText(): all songs URLs in urls.text --> all text files of songs
    - isLabel(line): helper function to check whether a line is "Verse", "Chorus", etc.
    - toJSON(fileName): text file of a song --> JSON file of a song
    - allToJSON(): all song text files in /text --> all JSON files in /json
    - addSong(url): URL of a song --> text files and JSON file of a song