fs = require('fs');

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

// PSM is sales / area
function calculatePSM(sales, area) {
	return sales/area;
}

fs.readFile("sales_data.json", "utf8", function (err,data) {

  var obj = JSON.parse(data);

  var totalChadstone = 0;

  var mostSalesKey = null;

  var totalVictoria = 0;

  var highestPSM = 0;
  var highestPSMKey = null;

  obj.forEach(function(item) {
 
	/*
	  Expected structure for item

      state: 'WA',
	  centre: 'Flinders Square',
	  totalSales: 4415,
	  unit: 'L2-57',
	  area: 209
	*/


	if ((mostSalesKey == null) || (item.totalSales > mostSalesKey.totalSales)) {
		mostSalesKey = item;
	}

	var PSM = calculatePSM(item.totalSales, item.area);

	if ((highestPSMKey == null) || (PSM > highestPSM)) {
		highestPSM = PSM;
		highestPSMKey = item;
	}

	if (item.centre == "Chadstone") {
		totalChadstone += item.totalSales;
	}

	if (item.state == "VIC") {
		totalVictoria += item.totalSales;
	}

  })
  
  console.log("1. Total Chadstone: $" + totalChadstone.formatMoney(2, '.', ','));
  console.log("2. Most Sales: " + mostSalesKey.centre + " - " + mostSalesKey.unit);
  console.log("3. Total Sales Victoria: $" + totalVictoria.formatMoney(2, '.', ','));
  console.log("4. Highest PSM: " + highestPSMKey.centre + " - " + highestPSMKey.unit);
  
  if (err) {
    return console.log(err);
  }
  
});
