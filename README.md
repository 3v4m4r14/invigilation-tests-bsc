# invigilation-tests-bsc

Application for testing likely components of an invigilation system for online tests. 

NB! Does not work online due to removed API keys!

## Getting Started

Some things to keep in mind when trying out this application. 

### Kairos app ID and API keys

For security purposes author's personal Kairos app ID and API key have been removed from this remote repository.
If you wish to use Kairos API, you need to create a configuration file config.js in the following format:

```
var config = {
    APP_ID : 'appIdHere',
    KEY : 'apiKeyHere'
};
```

## Built With

* [tracking.js](https://trackingjs.com/) - Face detection
* [Kairos](https://www.kairos.com/) - Face recognition
* [xLabs](https://xlabsgaze.com/) - Eye tracking

## Author

**Eva Maria Veitmaa** - [LinkedIn](https://www.linkedin.com/in/eva-maria-veitmaa/)

