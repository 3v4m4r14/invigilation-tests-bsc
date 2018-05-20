# invigilation-tests-bsc

Application for testing likely components of an invigilation system for online tests. 

NB! Does not work online due to removed API keys!

## Getting Started

Some things to keep in mind when trying out this application. 

### Speech recognition

Speech recognition functionality is currently available in Google Chrome web browser only.

### Kairos app ID and API keys

For security purposes author's personal Kairos app ID and API key have been removed from this remote repository.
If you wish to use Kairos API, you need your personal API key which you can get [HERE](https://developer.kairos.com/signup?plan_ids[]=2357355666521). If you have the key, create a configuration file config.js in the following format:

```
var config = {
    APP_ID : 'appIdHere',
    KEY : 'apiKeyHere'
};
```

### xLabs plugin for Chrome

The eye tracking functionality works only in Google Chrome web browser. To use it, a [plugin](https://chrome.google.com/webstore/detail/xlabs-headeyegaze-tracker/emeeadaoegehllidjmmokeaahobondco?hl=en) needs to be installed.

## Built With

* [tracking.js](https://trackingjs.com/) - Face detection
* [Kairos](https://www.kairos.com/) - Face recognition
* [xLabs](https://xlabsgaze.com/) - Eye tracking

## Author

**Eva Maria Veitmaa** - [LinkedIn](https://www.linkedin.com/in/eva-maria-veitmaa/)

## Thesis

"Attacks regarding online tests and ensuring the integrity of results based on the example of TTÜ admission test"

"Veebipõhiste testidega seotud ründed ja tulemuste rikkumatuse tagamine TTÜ sisseastumistesti näitel"

Tallinn University of Technology

2018
