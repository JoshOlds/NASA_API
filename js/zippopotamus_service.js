function ZippopotamusService(){

    var baseURL = "https://api.zippopotam.us/us/";

    this.getZipData = function(zip){
        return new Promise(function(resolve, reject){

            $.get(baseURL + zip).then(
                function(data){
                    resolve(data);
                }
            ,
                function(data){
                    reject(data);
                }
            )
        })
    }
}