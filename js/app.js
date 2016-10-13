$(document).foundation();

var nasaService = new NasaService();
var pages = [
    $('#earth-page'),
    $('#apod-page'),
    $('#epic-page')
]
var epicDatesFlag = false;


function getEarth(lon, lat, date){
    var loadingText = "Loading... Please wait";
    var loadingElem = $('#earth-loading');
    var buttonElem = $('#button-earth-submit')
    buttonElem.addClass("disabled");
    loadingElem.html(loadingText);
    nasaService.getEarthImage(lon, lat, date).then(function(data){
        console.log(data)
        $('#error-earth').html("")
        loadingElem.html("")
        buttonElem.removeClass("disabled");
        updateEarth(data);
    })
    .catch(function(error){
        console.log("ERROR: " + error);
        $('#error-earth').html("Invalid Request, please try again!")
        loadingElem.html("")
        buttonElem.removeClass("disabled");
    })
}

function updateEarth(data){
    url = data.url;
    template = `<img class="earth-image" src="${url}" alt="Nasa Image">`
    $('#earth-image').html(template)
}

function getAPOD(date){
    var loadingText = "Loading... Please wait";
    var loadingElem = $('#apod-loading');
    var buttonElem = $('#button-apod-submit')
    buttonElem.addClass("disabled");
    loadingElem.html(loadingText);
    nasaService.getAPODImage(date).then(function(data){
        console.log(data)
        $('#error-apod').html("")
        loadingElem.html("")
        buttonElem.removeClass("disabled");
        updateAPOD(data);
    })
    .catch(function(error){
        console.log("ERROR: " + error);
        $('#error-apod').html("Invalid Request, please try again!")
        loadingElem.html("")
        buttonElem.removeClass("disabled");
    })
}

function updateAPOD(data){
    var url = data.hdurl;
    var copyright = "Copyright: " + data.copyright;
    if(data.copyright === undefined){copyright = ""}
    if (url === undefined){
        template = "<p class='text-center red'>No image for this day! Try again</p>"
    }else{
        template = `
        <h3>${data.title}</h3>
        <p>${data.explanation} </p>
        <p>${copyright} ${data.date} </p>
        <img src="${url}" alt="Photo of the day">`
    }
    $('#apod-image').html(template)
}

function updateEPICdates(){
    var dates = nasaService.getEPICDates();
    var template = ""
    dates.forEach(function(date){
        template += `
            <option value="${date}">${date}</option>
        `
    })
    $('#input-epic-date').html(template);
    if(dates.length < 1){
        setTimeout(updateEPICdates, 500);
        console.log("Retrying dates...")
        return false;
    }
    return true;
}

function getEPIC(date){
    var loadingText = "Loading... Please wait";
    var loadingElem = $('#epic-loading');
    var buttonElem = $('#button-epic-submit')
    buttonElem.addClass("disabled");
    loadingElem.html(loadingText);
    nasaService.getEPICImage(date).then(function(data){
        $('#error-epic').html("")
        loadingElem.html("")
        buttonElem.removeClass("disabled");
        updateEPIC(data);
    })
    .catch(function(error){
        console.log("ERROR: " + error);
        $('#error-epic').html("Invalid Request, please try again!")
        loadingElem.html("")
        buttonElem.removeClass("disabled");
    })
}

function updateEPIC(data){
    var template = ""
    for(var obj in data){
        var url = nasaService.getEPICImageURL(data[obj].image);
        template += `
        <div>
            <h5 class="text-center epic-caption">${data[obj].caption} on ${data[obj].date}</h5>
            <img src="${url}" alt="EPIC Image">
        </div>
        `
    }
    $('#epic-image').html(template);
}

function changePage(pageID){
    pages.forEach(function(element){
        if(element['0'].id != pageID){
            element.addClass('hidden')
        }else{
            element.removeClass('hidden')
        }
    })
}

$('#nav-earth').on('click', function(e){
    changePage('earth-page')
})
$('#nav-apod').on('click', function(e){
    changePage('apod-page')
})
$('#nav-epic').on('click', function(e){
    changePage('epic-page')
    if(!epicDatesFlag){
        updateEPICdates();
    }
})

$('#form-earth').on('submit', function(e){
    e.preventDefault();
    var lon = $('#input-earth-lon').val();
    var lat = $('#input-earth-lat').val();
    var date = $('#input-earth-date').val();
    getEarth(lon, lat, date);
})

$('#form-apod').on('submit', function(e){
    e.preventDefault();
    var date = $('#input-apod-date').val();
    getAPOD(date);
})

$('#form-epic').on('submit', function(e){
    e.preventDefault();
    var date = $('#input-epic-date').val();
    getEPIC(date);
})

