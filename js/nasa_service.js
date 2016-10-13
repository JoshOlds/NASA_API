function NasaService() {

    var baseURL = "https://api.nasa.gov/"
    var earthURL = "planetary/earth/imagery?"
    var APODURL = "planetary/apod?"
    var EPICURL = "EPIC/api/v1.0/images.php?"
    var EPICImageURL = "EPIC/archive/natural/png/"
    var apiKey = "VBcN97dbuwIlo9OCPltT33VsAwFYSPyI05kQusmF"

    var EPICdates = [];
    getEPICDates();

    this.getEarthImage = function (lon, lat, date) {
        return new Promise(function (resolve, reject) {
            var options = `lon=${lon}&lat=${lat}&date=${date}&cloud_score=false&api_key=${apiKey}`
            $.get(baseURL + earthURL + options).then(
                function (data) {
                    resolve(data);
                },
                function (error) {
                    reject(error);
                }
            );
        });
    }

    this.getAPODImage = function (date) {
        return new Promise(function (resolve, reject) {
            var options = `date=${date}&hd=true&api_key=${apiKey}`
            $.get(baseURL + APODURL + options).then(
                function (data) {
                    resolve(data);
                },
                function (error) {
                    reject(error);
                }
            );
        });
    }

    this.getEPICImage = function (date) {
        return new Promise(function (resolve, reject) {
            var options = `date=${date}&api_key=${apiKey}`
            $.get(baseURL + EPICURL + options).then(
                function (data) {
                    resolve(JSON.parse(data));
                },
                function (error) {
                    reject(error);
                }
            );
        });
    }

    function getEPICDates() {
        var options = `available_dates&api_key=${apiKey}`
        $.get(baseURL + EPICURL + options).then(
            function (data) {
                EPICdates = JSON.parse(data);
            },
            function (error) {
                console.log("ERROR: Could not fetch EPIC dates")
            }
        )
    }
    this.getEPICDates = function(){
        return EPICdates;
    }

    this.getEPICImageURL = function(imageID){
        return (baseURL + EPICImageURL + imageID + ".png?api_key=" + apiKey);
    }
}