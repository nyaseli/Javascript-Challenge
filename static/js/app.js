// from data.js
var tableData = data;

// selecting the element
var tableBody = d3.select("tbody");
var inputDate = d3.select("#datetime");
var shapeOptions = d3.select("#shapeSelect");
var countryOptions = d3.select("#countrySelect");
var stateOptions = d3.select("#stateSelect");
var cityOptions = d3.select("#citySelect");
var filterButton = d3.select("#filter-btn");
var clearButton = d3.select("#clear-btn");
var formBody = d3.select("form");

function getData(table){
    console.log(table.length);
    tableBody.html("");
    if (table.length === 0){
        var row = tableBody.append("tr");
        var cell = row.append("td");
        cell.attr("colspan","7");
        cell.text("No data found");
    }
    else{
        table.forEach((ufo) => {
        var row = tableBody.append("tr");  
        Object.entries(ufo).forEach(([k,v]) => {
        var cell = row.append("td");
        cell.text(v);
        });  
        })

}
};

function filterData(){
    d3.event.preventDefault();
    var inputDateVal = inputDate.property("value");
    var inputShapeVal = shapeOptions.property("value");
    var inputCountryVal = countryOptions.property("value");
    var inputStateVal = stateOptions.property("value");
    var inputCityVal = cityOptions.property("value");
    
    var filData = tableData;
    if (inputDateVal != ""){
        filData = filData.filter(ufo => ufo.datetime === inputDateVal);
        console.log("done");
    } 
    
    if (inputShapeVal.length <10 && inputShapeVal != "" && filData.length > 0){
        filData = filData.filter(ufo => ufo.shape === inputShapeVal);
        console.log(filData.length);
        console.log("shape");
    } 
    if (inputCountryVal.length <10 && inputCountryVal != "" && filData.length > 0){
        filData = filData.filter(ufo => ufo.country === inputCountryVal);
        console.log(filData.length);
        console.log("country");
    } 
    if (inputStateVal.length <12 && inputStateVal != "" && filData.length > 0){
        filData = filData.filter(ufo => ufo.state === inputStateVal);
        console.log(filData.length);
        console.log("state");
    } 
    if (inputCityVal.length <12 && inputCityVal != "" && filData.length > 0){
        filData = filData.filter(ufo => ufo.city === inputCityVal);
        console.log(filData.length);
        console.log("city");
    } 
    tableBody.html("");
    console.log(filData.length);
    getData(filData);

};
getData(tableData);

var shapeDrop = tableData.map(function(ufos){
    return ufos.shape;
});
var shapedropdownval = d3.set(shapeDrop).values();
shapedropdownval.forEach(shape => {
    var cell = shapeOptions.append("option");
    cell.property("value",shape).text(shape);  
});

var countryDrop = tableData.map(function(ufos){
    return ufos.country;
});
var countrydropdownval = d3.set(countryDrop).values();
countrydropdownval.forEach(country => {
    var cell = countryOptions.append("option");
    cell.property("value",country).text(country);  
});

var stateDrop = tableData.map(function(ufos){
    return ufos.state;
});
var statedropdownval = d3.set(stateDrop).values();
statedropdownval.forEach(state => {
    var cell = stateOptions.append("option");
    cell.property("value",state).text(state);  
});

var cityDrop = tableData.map(function(ufos){
    return ufos.city;
});
var citydropdownval = d3.set(cityDrop).values();
citydropdownval.forEach(city => {
    var cell = cityOptions.append("option");
    cell.property("value",city).text(city);  
});


filterButton.on("click",filterData);
formBody.on("submit",filterData);

clearButton.on("click",function(){
    inputDate.property("value","");
    countryOptions.property("value","");
    stateOptions.property("value","");
    cityOptions.property("value","");
    shapeOptions.property("value","");
    getData(tableData);
});

