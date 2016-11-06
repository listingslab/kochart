$( document ).ready(function() {
    Chart.defaults.global.animation = false;
    Chart.defaults.global.legend.display = false;
    Chart.defaults.global.defaultFontColor = '#fff';
    $.getJSON( '/api')
        .done(function( data ) {
            locationTitle = ko.observable(data.title + ', ' + data.address);
            locationLink = ko.observable(data.link);
            locationImg = ko.observable(data.img);

            lightingArr = ko.observableArray(data.sensor_data.lighting);
            lightingCurrent = ko.observable(data.sensor_data.lighting[0] + '%');
            lightingAverage = ko.observable(averagePercent(data.sensor_data.lighting));

            safetyArr = ko.observableArray(data.sensor_data.safety);
            safetyCurrent = ko.observable(data.sensor_data.safety[0] + '%');
            safetyAverage = ko.observable(averagePercent(data.sensor_data.safety));

            climateArr = ko.observableArray(data.sensor_data.climate);
            climateCurrent = ko.observable(data.sensor_data.climate[0] + '%');
            climateAverage = ko.observable(averagePercent(data.sensor_data.climate));

            securityArr = ko.observableArray(data.sensor_data.security);
            securityCurrent = ko.observable(data.sensor_data.security[0] + '%');
            securityAverage = ko.observable(averagePercent(data.sensor_data.security));

            utilisationArr = ko.observableArray(data.sensor_data.utilisation);
            utilisationCurrent = ko.observable(data.sensor_data.utilisation[0] + '%');
            utilisationAverage = ko.observable(averagePercent(data.sensor_data.utilisation));

            vm = new SensorViewModel();
            ko.applyBindings(vm);
            appInt = setInterval (appInterval, 2000);
        });
    doCookies ();
});

function appInterval (){
    variation = 7;

    lastVal = lightingArr.slice(0);
    lastVal = lastVal.shift();
    nextVal = randomInt(lastVal-variation, lastVal+variation);
    lightingArr.pop();
    lightingArr.unshift(nextVal);
    lightingAverage(averagePercent(lightingArr()));
    lightingCurrent(nextVal + '%');


    lastVal = safetyArr.slice(0);
    lastVal = lastVal.shift();
    nextVal = randomInt(lastVal-variation, lastVal+variation);
    safetyArr.pop();
    safetyArr.unshift(nextVal);
    safetyAverage(averagePercent(safetyArr()));
    safetyCurrent(nextVal + '%');

    lastVal = climateArr.slice(0);
    lastVal = lastVal.shift();
    nextVal = randomInt(lastVal-variation, lastVal+variation);
    climateArr.pop();
    climateArr.unshift(nextVal);
    climateAverage(averagePercent(climateArr()));
    climateCurrent(nextVal + '%');

    lastVal = securityArr.slice(0);
    lastVal = lastVal.shift();
    nextVal = randomInt(lastVal-variation, lastVal+variation);
    securityArr.pop();
    securityArr.unshift(nextVal);
    securityAverage(averagePercent(securityArr()));
    securityCurrent(nextVal + '%');

    lastVal = utilisationArr.slice(0);
    lastVal = lastVal.shift();
    nextVal = randomInt(lastVal-variation, lastVal+variation);
    utilisationArr.pop();
    utilisationArr.unshift(nextVal);
    utilisationAverage(averagePercent(utilisationArr()));
    utilisationCurrent(nextVal + '%');

}
function doCookies (){
    if (Cookies.get('seenModal') === undefined){
        var about = $('#aboutModal');
        about.modal('show');
        $('#aboutModal .modal-body').load('README.md');
        about.on('hidden.bs.modal', function () {
            Cookies.set('seenModal', 'yes', { expires: 365 });
        });
    }
}

function randomInt(min, max) {
    var ranVal = Math.floor(Math.random() * (max - min + 1)) + min;
    if (ranVal > 100){
        ranVal = 100;
    }else if (ranVal < 0){
        ranVal = 0;
    }
    return ranVal;
}

function averagePercent (arr){
    var ret = 0;
    for (var i=0; i<arr.length; i++){
        ret += arr[i];
    }
    ret = Math.floor(ret/arr.length);
    return ret + '%';
}

function make_labels (){
    var labels = [];
    for (var i = 0; i < 30; i++){
        labels.push(i+1);
    }
    return labels;
}

function SensorViewModel() {
    this.SensorData = {
        labels: make_labels (),
        datasets: [
            {
                label: "Lighting",
                fill: false,
                borderColor: "rgba(220,220,110,1)",
                pointRadius: 0,
                data: lightingArr
            },
            {
                label: "Safety",
                fill: false,
                borderColor: "rgba(140,220,110,1)",
                pointRadius: 0,
                data: safetyArr
            },
            {
                label: "Climate",
                fill: false,
                borderColor: "rgba(200,110,220,1)",
                pointRadius: 0,
                data: climateArr
            },
            {
                label: "Security",
                fill: false,
                borderColor: "rgba(220,70,70,1)",
                pointRadius: 0,
                data: securityArr
            },
            {
                label: "Utilisation",
                fill: false,
                borderColor: "rgba(110,220,220,1)",
                pointRadius: 0,
                data: utilisationArr
            }
        ]
    };
}

$( "#start" ).click(function() {
    if (appInt === null){
        appInt = setInterval (appInterval, 1000);
    }
});

$( "#stop" ).click(function() {
    clearInterval(appInt);
    appInt = null;
});

$( "#cookies" ).click(function() {
    Cookies.remove('seenModal');
});