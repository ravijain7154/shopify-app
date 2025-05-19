// $('.changevid').click(function(e){
//   $(this).parent().addClass('active');
// });

// loadJSONcollection();
// function loadJSONcollection() {
//   console.log("triggered");
//   $.ajax({
//     url: "https://18243a13bc147ad531a548f8cb76e2a3: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@e3fab2.myshopify.com/admin/api/2023-07/products.json?limit=400",
//     type: "GET",
//     crossDomain: true,
//       beforeSend: function(xhr) {
//            xhr.setRequestHeader("Content-Type", "application/json"),
//            xhr.setRequestHeader("X-Shopify-Access-Token", "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")
//       },
//   })
//     .done(function (data) {
//       console.log(data);

//       // var productList = data;
//       // $(productList.products).each(function(index){
//       // 	console.log(this.title);
//       // });
//     })
//     .fail(function (data) {})
//     .always(function (data) {});
// }

// filters start

// Diamond Check FILTER....S

///////////////////////////////////////////////////////////
var parseQueryString = function (url) {
  var urlParams = {};
  url.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    function ($0, $1, $2, $3) {
      urlParams[$1] = $3;
    }
  );

  return urlParams;
};

var result_url;
var urlToParse = "";

var price_value = [
  0, 1, 3, 5, 7, 10, 30, 40, 50, 60, 70, 80, 90, 100, 150, 200, 283, 300, 350,
  400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100,
  1150, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300,
  2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600,
  3700, 3800, 3900, 4000, 4100, 4200, 4300, 4400, 4500, 4600, 4700, 4800, 4900,
  5000, 5100, 5200, 5300, 5400, 5500, 5600, 5700, 5800, 5900, 6000, 6100, 6200,
  6300, 6400, 6500, 6600, 6700, 6800, 6900, 7000, 7100, 7200, 7300, 7400, 7500,
  7600, 7700, 7800, 7900, 8000, 8100, 8200, 8300, 8400, 8500, 8600, 8700, 8800,
  8900, 9000, 9100, 9200, 9300, 9400, 9500, 9600, 9700, 9800, 9900, 10000,
  10100, 10200, 10300, 10400, 10500, 10600, 10700, 10800, 10900, 11000, 11100,
  11200, 11300, 11400, 11500, 11600, 11700, 11800, 11900, 12000, 12500, 13000,
  13500, 14000, 14500, 15000, 15500, 16000, 16500, 17000, 17500, 18000, 18500,
  19000, 19500, 20000, 20500, 21000, 21500, 22000, 22500, 23000, 23500, 24000,
  25000, 26000, 27000, 28000, 29000, 30000, 31000, 32000, 33000, 34000, 35000,
  36000, 37000, 38000, 39000, 40000, 45000, 50000, 55000, 60000, 65000, 70000,
  75000, 80000, 85000, 90000, 95000, 100000, 150000, 200000, 250000, 300000,
  350000, 400000, 450000, 500000, 600000, 700000, 800000, 900000, 1000000,
];

function find_range(range_from, range_to) {
  var array = [];
  from_index = price_value.indexOf(range_from);
  to_index = price_value.indexOf(range_to);
  for (i = from_index; i <= to_index; i++) {
    array.push(price_value[i]);
  }
  price_value = array;

  // $('#range_55_input_from').val(range_from);
  // $('#range_55_input_to').val(range_to);

  return array;
}
///////////////////////////////////////////////////////////


$(document).ready(function () {
  ///////////////////////////////////////////////////////////

        // SHAPE FILTER....Start
       
        $.fn.dataTable.ext.search.push(
          function( settings, searchData, index, rowData, counter ) {
            var positions = $('input:checkbox[name="checkbox[]"]:checked').map(function() {
              return this.value;
              
            }).get();
         
            if (positions.length === 0) {
              return true;
            }
            if (positions.indexOf(searchData[2]) !== -1) {
              return true;
            }
            return false;
          }
        );
    
           $('input:checkbox').on('change', function () {
              var a = table.draw();
              // Get the values of checked checkboxes
              var checkedValues = $('input:checkbox[name="checkbox[]"]:checked').map(function() {
                  return this.value;
              }).get();
          
              // Update the URL with the checked checkbox values
              // updateUrl(checkedValues);
                  updateURLWithFilters('Shape',checkedValues);
             
             
         
           });

// Function to update the URL
// function updateUrl(checkedValues) {
//     // Get the current URL
//     var url = window.location.href;
    
//     // Remove any existing checkbox parameters from the URL
//     url = url.split('?')[0];
    
//     // Add the checkbox values as parameters to the URL
//     if (checkedValues.length > 0) {
//         url += '?checkbox=' + checkedValues.join(',');
//     }

//     // Replace the current URL with the updated URL
//     window.history.replaceState({}, '', url);
// }
  
      // SHAPE FILTER....end



        // SHAPE FILTER....Start
           
           $('input:checkbox').on('change', function () {
              // var a = table.draw();
              // Get the values of checked checkboxes
              var checkedVal = $('input:checkbox[name="setting[]"]:checked').map(function() {
                  return this.value;
              }).get();
          
              // Update the URL with the checked checkbox values
              // updateUrl(checkedVal);
              if (checkedVal.length === 0) {
                        $('.new-grid .grid-item').show();
                    } else {
                        // Hide all products
                        $('.new-grid .grid-item').hide();
                        
                        // Show products that match the checked values
                        $.each(checkedVal, function(index, value) {
                            $('.new-grid .grid-item:contains("' + value + '")').show();
                        });
                    }
                  updateURLWithFilters('setting',checkedVal);
           });

// Function to update the URL

  
      // SHAPE FILTER....end


  
  
  ////////////////// Price filter range/////////////////////////////
$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = parseFloat( $('#range_55_input_from').val().replace(/\$/g, ''), 10 );
        var max = parseFloat( $('#range_55_input_to').val().replace(/\$/g, ''), 10 );
        var age = parseFloat( data[12].replace(/\$/g, '') ) || 0; // Use data for the age column

        if ( ( isNaN( min ) && isNaN( max ) ) ||
            ( isNaN( min ) && age <= max ) ||
            ( min <= age   && isNaN( max ) ) ||
            ( min <= age   && age <= max ) )
        {
            return true;
        }
        return false;
    }
);

$('#range_55_input_from, #range_55_input_to').keyup( function() {
    table.draw();
});

var from_price = 0;
var to_price = 1000000;

if (urlToParse.length) {
    var price_url = result_url.price;
    var price_url = price_url.split("%3B");
    if (price_url[1] != "") {
        from_price = price_url[0].replace(/\$/g, ''); // Remove $ sign
        to_price = price_url[1].replace(/\$/g, ''); // Remove $ sign
    }
}

var price_value1 = [parseInt(from_price), parseInt(to_price)];
var price_value2 = price_value.concat(price_value1);
price_value2.sort(function (a, b) {
    return a - b;
});

from_price = price_value2.indexOf(parseInt(from_price));
to_price = price_value2.indexOf(parseInt(to_price));

$("#range_55").ionRangeSlider({
    type: "double",
    from: from_price,
    to: to_price,
    values: price_value2,
    onStart: function (data) {
        from_value = data.from_value;
        to_value = data.to_value;
        $("#range_55_input_from").val("$" + from_value); // Add $ sign
        $("#range_55_input_to").val("$" + to_value); // Add $ sign
    },
    onChange: function (data) {
        from_value = data.from_value;
        to_value = data.to_value;
        $("#range_55_input_from").val("$" + from_value); // Add $ sign
        $("#range_55_input_to").val("$" + to_value); // Add $ sign
        table.draw();
        updateURLWithFilters('price', data.from_value, data.to_value);
        
    }
});

var slider_range_55 = $("#range_55").data("ionRangeSlider");
setSliderFromTo = function () {
    var from = $("#range_55_input_from").val().replace(/\$/g, ''); // Remove $ sign
    var to = $("#range_55_input_to").val().replace(/\$/g, ''); // Remove $ sign

    var price_value1 = [from, to];
    var price_value2 = price_value.concat(price_value1);
    price_value2.sort(function (a, b) {
        return a - b;
    });

    from = price_value2.indexOf(from);
    to = price_value2.indexOf(to);

    slider_range_55.update({
        min: 0,
        max: 100,
        from: from,
        to: to,
        values: price_value2,
    });
};

  ////////////////// Carat filter range/////////////////////////////
  $.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = parseFloat($('#range_56_input_from').val());
        var max = parseFloat($('#range_56_input_to').val());
        var carat = parseFloat(data[3]) || 0; // Assuming the carat value is in the fourth column (index 3)

        if ((isNaN(min) && isNaN(max)) ||
            (isNaN(min) && carat <= max) ||
            (min <= carat && isNaN(max)) ||
            (min <= carat && carat <= max)) {
            return true;
        }
        return false;
    }
);

$('#range_56_input_from, #range_56_input_to').keyup(function() {
    table.draw();
});

var from_carat = 0;
var to_carat = 20;

// If there are URL parameters for carat range, extract and set them
if (urlToParse.length) {
    var carat_url = result_url.size;
    var carat_url = carat_url.split("%3B");
    if (carat_url[1] != "") {
        from_carat = carat_url[0];
        to_carat = carat_url[1];
    }
}

$("#range_56").ionRangeSlider({
    type: "double",
    min: 0,
    max: 6,
    from: from_carat,
    to: to_carat,
    step: 0.01,
    max_postfix: "+",
    onStart: function(data) {
        $("#range_56_input_from").val(data.from);
        $("#range_56_input_to").val(data.to);
    },
    onChange: function(data) {
        $("#range_56_input_from").val(data.from);
        $("#range_56_input_to").val(data.to);
        table.draw();
        updateURLWithFilters('carat', data.from, data.to);
        
    }
});

var slider_range_56 = $("#range_56").data("ionRangeSlider");
setSliderFromTo1 = function() {
    var from = $("#range_56_input_from").val();
    var to = $("#range_56_input_to").val();
    slider_range_56.update({
        from: from,
        to: to
    });
};

// color filter 
  
 var from_color = 0;
var to_color = 9;
var from_color_val = "D";
var to_color_val = "M";

if (urlToParse.length) {
    var color_url = result_url.color;
    var color_url = color_url.split("%3B");
    if (color_url[1] != "") {
        from_color_val = color_url[0];
        to_color_val = color_url[1];

        // Find indices of colors in the color array
        var price_value1 = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
        from_color = price_value1.indexOf(from_color_val);
        to_color = price_value1.indexOf(to_color_val);
    }
}

var $range_color = $("#range_color");

$range_color.ionRangeSlider({
    type: "double",
    grid: true,
    from: from_color,
    to: to_color,
    values: ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"],
    onStart: function (data) {
        $("#range_color").val(from_color_val + ";" + to_color_val);
    },
    onChange: function (data) {
        var from_index = data.from;
        var to_index = data.to;

        // Get selected colors based on indices
        var color_arr = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
        var selected_colors = color_arr.slice(from_index, to_index + 1);

        // Construct search term for DataTables
        var colorStr = selected_colors.join("|");

        // Search DataTable column 4 (assuming color column is the fifth column)
        table.column(4).search(colorStr, true, false).draw();
      // Example usage to update URL with clarity filter values
          updateURLWithFilters('color',data.from_value, data.to_value);

    }
});
  ///////////////////////////////////////////////////////////

  /*****Clarity*******/
  var from_clarity = 0;
  var to_clarity = 9;
  var from_clarity_val = "FL";
  var to_clarity_val = "I2";
    // Function to parse clarity values from URL
  function parseClarityFromURL() {
    var clarity_url = window.location.href.split('clarity=')[1];
    if (clarity_url) {
      var clarity_range = clarity_url.split(';');
      from_clarity = clarity_range[0];
      to_clarity = clarity_range[1];
      from_clarity_val = clarity_range[0];
      to_clarity_val = clarity_range[1];
    }
  }
  if (urlToParse.length) {
    var clarity_url = result_url.clarity;
    var clarity_url = clarity_url.split("%3B");
    if (clarity_url[1] != "") {
      from_clarity = clarity_url[0];
      to_clarity = clarity_url[1];
      from_clarity_val = from_clarity;
      to_clarity_val = to_clarity;

      var clarity_value = ["FL",
        "IF",
        "VVS1",
        "VVS2",
        "VS1",
        "VS2",
        "SI1",
        "SI2",
        "I1",
        "I2",
      ];
      from_clarity = clarity_value.indexOf(from_clarity);
      to_clarity = clarity_value.indexOf(to_clarity);

      //console.log(from_index)
    }
  }

    // Initialize clarity filter from URL
  parseClarityFromURL();
  
  var $range_50 = $("#range_50"),
    $update_btn = $(".label_make_3X");
  $reset_btn = $(".label_make_reset");

  $range_50.ionRangeSlider({
    type: "double",
    grid: true,
    from: from_clarity,
    to: to_clarity,
    values: ["FL","IF","VVS1","VVS2","VS1","VS2","SI1","SI2","I1","I2"],
    onStart: function (data) {
      $("#range_50").val(from_clarity_val + ";" + to_clarity_val);
    },
    onChange: function (data) {
          var clarity_arr = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2"];
          const startIndex = data.from; // Index of the start value
          const endIndex = data.to; // Index of the end value
          
          // Get the clarity values within the selected range and those below it
          const selectedClarityValues = clarity_arr.slice(startIndex, endIndex + 1);
          
          // If VS1 or VS2 are selected, remove VVS1 and VVS2 from the selected clarity values
          if (selectedClarityValues.includes("VS1") || selectedClarityValues.includes("VS2")) {
            const indexToRemove = selectedClarityValues.indexOf("VVS1");
            if (indexToRemove !== -1) selectedClarityValues.splice(indexToRemove, 1);
            const indexToRemove2 = selectedClarityValues.indexOf("VVS2");
            if (indexToRemove2 !== -1) selectedClarityValues.splice(indexToRemove2, 1);
          }
          
          // Construct a pipe-separated string of clarity values for filtering
          let clarityStr = selectedClarityValues.join('|');
        
          // Apply the filter to the table
          table.columns(5).search('^(' + clarityStr + ')$', true, false, true).draw();
          updateURLWithFilters('clarity', data.from_value, data.to_value);
         
}
    // onFinish: function (data) {
    //   // submitForm();
    //   //console.log(data);
    // },
    // onUpdate: function (data) {
    //   setTimeout(function () {
    //     // submitForm();
    //   }, 1000);
    // },
  });

  // var rangClarity = $range_50.data("ionRangeSlider");

  // $update_btn.on("click", function () {
  //   rangClarity.update({
  //     from: 0,
  //     to: 9,
  //   });
  // });
  // $reset_btn.on("click", function () {
  //   rangClarity.update({
  //     from: 0,
  //     to:9,
  //     values: ["FL","IF","VVS1","VVS2","VS1","VS2","SI1","SI2","I1","I2"],
  //   });
  //   // updateURL(0, 9); 
  // });
    // Function to update URL with selected clarity range

  ///////////////////////////////////////////////////////////

  /*****Cut*******/
var from_cut = 0;
var to_cut = 3;
var from_cut_val = "EX";
var to_cut_val = "FR";
if (urlToParse.length) {
  var cut_url = result_url.cut;
  var cut_url = cut_url.split("%3B");
  if (cut_url[1] != "") {
    from_cut = cut_url[0];
    to_cut = cut_url[1];
    from_cut_val = from_cut;
    to_cut_val = to_cut;

    var price_value1 = ["EX", "VG", "GD", "FR"];
    from_cut = price_value1.indexOf(from_cut);
    to_cut = price_value1.indexOf(to_cut);
  }
}

var $range_51a = $("#range_51a"),
    $update_btn = $(".label_make_3X");
    $reset_btn = $(".label_make_reset");

$range_51a.ionRangeSlider({
  type: "double",
  grid: true,
  from: from_cut,
  to: to_cut,
  values: ["EX", "VG", "GD", "FR"],
  onStart: function (data) {
    $("#range_51a").val(from_cut_val + ";" + to_cut_val);
  },
  onChange: function (data) {
    
    var myArray = ["EX", "VG", "GD", "FR"];
    const startIndex = data.from; // Replace with the index of the desired start value
    const endIndex = data.to; // Replace with the index of the desired end value

    const selectedValues = getValuesByIndices(myArray, startIndex, endIndex);

    let selectedValues_str = selectedValues.toString();
    var newStr = selectedValues_str.replaceAll(",", "|");
    console.log(newStr);

    // table.columns(6).search('"'+newStr+'"' ,true,false).draw();
    table.columns(6).search('"'+newStr+'"' ,true,true).draw();
  },
  onFinish: function (data) {
    // submitForm();
  },
  onUpdate: function (data) {
    setTimeout(function () {
      // submitForm();
    }, 1000);
  },
});

var rangeCut = $range_51a.data("ionRangeSlider");

$update_btn.on("click", function () {
  rangeCut.update({
    from: 0,
    to: 0,
  });
});
$reset_btn.on("click", function () {
  rangeCut.update({
    from: 0,
    to: 3,
    values: ["EX", "VG", "GD", "FR"],
  });
});

  ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////
         /*****polish*******/

        var from_polish = 0;
        var to_polish = 3;
        var from_polish_val = 'EX';
        var to_polish_val = 'FR'; 
        if(urlToParse.length){
        var polish_url=result_url.polish;
        var polish_url=polish_url.split('%3B');
        if(polish_url[1]!="")
        {
          from_polish = polish_url[0];
          to_polish = polish_url[1];
          from_polish_val = from_polish;
          to_polish_val = to_polish;  
          //console.log(from_polish)
          
          var price_value1=["EX", "VG", "GD", "FR"];
          from_polish = price_value1.indexOf(from_polish);
          to_polish = price_value1.indexOf(to_polish);
          
        }
      }


    var $range_51ab = $("#range_51ab"),
            $update_btn = $(".label_make_3X");
            $reset_btn = $(".label_make_reset");

        $range_51ab.ionRangeSlider({
            type: "double",
            grid: true,
            from: from_polish,
            to:   to_polish,
            values: ["EX", "VG", "GD", "FR"],  
            onStart: function (data) {              
                 $("#range_51ab").val(from_polish_val+';'+to_polish_val);
            },
            onChange: function (data) {
                from = data.from;
                to = data.to;
                $("#range_51ab").val(from + " " + to);

                var polishArray = ["EX", "VG", "GD", "FR"];
                const startIndex = data.from; // Replace with the index of the desired start value
                const endIndex = data.to; // Replace with the index of the desired end value
            
                const polishValues = getValuesByIndices(polishArray, startIndex, endIndex);
            
                let polishValues_str = polishValues.toString();
                var polishStr = polishValues_str.replaceAll(",", "|");
                // console.log(polishStr);
            
                table.columns(7).search('"'+polishStr+'"' ,true,true).draw();
              
            },
            onFinish:  function (data) {
              
            },
            onUpdate:  function (data) {
               setTimeout(function() {
                 // submitForm();
                },1000);
            }
        });

        var rangePolish = $range_51ab.data("ionRangeSlider");

        $update_btn.on("click", function () {
            rangePolish.update({
              from: 0,
              to: 3
            });
        });

        $reset_btn.on("click", function () {
            rangePolish.update({
              from: 0,
              to: 3,
              values: ["EX", "VG", "GD", "FR"]
            });
        });
  // /*****Polish*******/

  ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////

  /*****Fluorescence*******/
  var from_fluor = 0;
  var to_fluor = 4;
  var from_fluor_val = "N";
  var to_fluor_val = "VS";
  if (urlToParse.length) {
    var fluor_url = result_url.fluor;
    var fluor_url = fluor_url.split("%3B");
    if (fluor_url[1] != "") {
      from_fluor = fluor_url[0];
      to_fluor = fluor_url[1];
      from_fluor_val = from_fluor;
      to_fluor_val = to_fluor;

      var price_value1 = ["NON", "FNT", "MED", "STG", "VST"];
      from_fluor = price_value1.indexOf(from_fluor);
      to_fluor = price_value1.indexOf(to_fluor);

      //console.log(from_index)
    }
  }

  var $range_fluor = $("#range_fluor"),
    $update_btn = $(".label_make_3X");
  $reset_btn = $(".label_make_reset");

  $range_fluor.ionRangeSlider({
    type: "double",
    grid: true,
    from: from_fluor,
    to: to_fluor,
    values: ["NON", "FNT", "MED", "STG", "VST"],
    onStart: function (data) {
      $("#range_fluor").val(from_fluor_val + ";" + to_fluor_val);
    },
    onChange: function (data) {
      from = data.from;
      to = data.to;
      $("#range_fluor").val(from + " " + to);

        var fluor_arr = ["NON", "FNT", "MED", "STG", "VST"];
        const startIndex = data.from; // Replace with the index of the desired start value
        const endIndex = data.to; // Replace with the index of the desired end value
    
          const fluorValues = getValuesByIndices(fluor_arr, startIndex, endIndex);
    
        let fluorValues_str = fluorValues.toString();
        var fluorStr = fluorValues_str.replaceAll(",", "|");
        // console.log(fluorStr);
    
        table.columns(9).search('"'+fluorStr+'"' ,true,true).draw();
        // Example usage to update URL with clarity filter values
        updateURLWithFilters('fluor', data.from , data.to);

    },
    onFinish: function (data) {
      // submitForm();
      //console.log(data);
    },
    onUpdate: function (data) {
      setTimeout(function () {
        // submitForm();
      }, 1000);
    },
  });

  var rangeFluor = $range_fluor.data("ionRangeSlider");

  $update_btn.on("click", function () {
    rangeFluor.update({
      from: 0,
      to: 0,
    });
  });
  $reset_btn.on("click", function () {
    rangeFluor.update({
      from: 0,
      to: 4,
      values: ["NON", "FNT", "MED", "STG", "VST"],
    });
  });

  ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////

  /*****Symmetry*******/
  var from_sys = 0;
  var to_sys = 3;
  var from_sys_val = "EX";
  var to_sys_val = "F";
  if (urlToParse.length) {
    var sys_url = result_url.sys;
    var sys_url = sys_url.split("%3B");
    if (sys_url[1] != "") {
      from_sys = sys_url[0];
      to_sys = sys_url[1];
      from_sys_val = from_sys;
      to_sys_val = to_sys;

      var price_value1 = ["EX", "VG", "GD", "F"];
      from_sys = price_value1.indexOf(from_sys);
      to_sys = price_value1.indexOf(to_sys);

      //console.log(from_index)
    }
  }

  var $range_sys = $("#range_sys"),
    $update_btn = $(".label_make_3X");
  $reset_btn = $(".label_make_reset");

  $range_sys.ionRangeSlider({
    type: "double",
    grid: true,
    from: from_sys,
    to: to_sys,
    values: ["EX", "VG", "GD", "F"],
    onStart: function (data) {
      $("#range_sys").val(from_sys_val + ";" + to_sys_val);
    },
    onChange: function (data) {
      from = data.from;
      to = data.to;
      $("#range_sys").val(from + " " + to);

      var symArray = ["EX", "VG", "G", "FR"];
                const startIndex = data.from; // Replace with the index of the desired start value
                const endIndex = data.to; // Replace with the index of the desired end value
            
                const symValues = getValuesByIndices(symArray, startIndex, endIndex);
            
                let symValues_str = symValues.toString();
                var symStr = symValues_str.replaceAll(",", "|");
                // console.log(symStr);
            
                table.columns(8).search('"'+symStr+'"' ,true,true).draw();
    },
    onFinish: function (data) {
      // submitForm();
      //console.log(data);
    },
    onUpdate: function (data) {
      setTimeout(function () {
        // submitForm();
      }, 1000);
    },
  });

  var rangeSys = $range_sys.data("ionRangeSlider");

  $update_btn.on("click", function () {
    rangeSys.update({
      from: 0,
      to: 0,
    });
  });
  $reset_btn.on("click", function () {
    rangeSys.update({
      from: 0,
      to: 3,
      values: ["EX", "VG", "GD", "F"],
    });
  });

  ///////////////////////////////////////////////////////////

  // Mined Diamonds and Lab Grown Diamonds start
  $.fn.dataTable.ext.search.push(function (
    settings,
    searchData,
    index,
    rowData,
    counter
  ) {
    var positions = $('input:checkbox[name="diamond[]"]:checked')
      .map(function () {
        // if(!positions){
        // alert($(this).val());
        // }
        return this.value;
      })
      .get();

    // alert(positions);
    if (positions.length === 0) {
      return true;
    }
    if (positions.indexOf(searchData[16]) !== -1) {
      return true;
    }
    return false;
  });

  $('#mined_or_grown input[type="checkbox"]').on("change", function () {
    $('input[name="' + this.name + '"]')
      .not(this)
      .prop("checked", false);
  });

  // Mined Diamonds and Lab Grown Diamonds end


  // STOCK FILTER.......S
  $("#stock").on("keyup", function () {
    table.columns(1).search(this.value).draw();
  });
  // STOCK FILTER.......E

  // $('#example').dataTable().fnDestroy();
  var table = $("#example").DataTable({
    // scrollCollapse: true,
    //displayLength: 25,
    //"lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ]
    // autowidth:true,
    // responsive: true,
      scrollX: true,
    // ordering: true,
    // bPaginate: true,
    // fixedHeader: true,
    // order: [[3, 'desc']],
  });

  // lab or mind filter
});

///////////////////////////////////////////////////////////

// ------

function getValuesByIndices(inputArray, startIndex, endIndex) {
  if (startIndex < 0) {
    startIndex = 0;
  }

  if (endIndex >= inputArray.length) {
    endIndex = inputArray.length - 1;
  }

  const result = [];

  for (let i = startIndex; i <= endIndex; i++) {
    result.push(inputArray[i]);
  }

  return result;
}
function updateURLWithFilters(filterName, fromValue, toValue) {
    // Get the current URL
    var url = window.location.href.split('?')[0]; // Get the base URL
    
    // Remove any existing parameters for the filter from the URL
    var urlParams = new URLSearchParams(window.location.search);
    urlParams.delete(filterName);
    
    // Encode the filter values and add them as parameters to the URL
    if (fromValue !== undefined && toValue !== undefined) {
        urlParams.set(filterName, encodeURIComponent(fromValue) + ';' + encodeURIComponent(toValue));
    } else if (fromValue !== undefined) {
        urlParams.set(filterName, encodeURIComponent(fromValue));
    } else if (toValue !== undefined) {
        urlParams.set(filterName, encodeURIComponent(toValue));
    }

    // Construct the new URL
    var newURL = url + '?' + urlParams.toString();

     newURL = newURL.replace(/%3B/g, ';');


    // Replace the current URL with the updated URL
    window.history.pushState({}, '', newURL);
     // Store filter values in sessionStorage
    var filterValues = {
        fromValue: fromValue,
        toValue: toValue
    };
    sessionStorage.setItem(filterName, JSON.stringify(filterValues));
}
window.addEventListener('load', function() {
     var urlParams = new URLSearchParams(window.location.search);
    var clarityFilter = urlParams.get('clarity');
    if (clarityFilter) {
        var clarityValues = clarityFilter.split(';');
        var fromValue = decodeURIComponent(clarityValues[0]);
        var toValue = decodeURIComponent(clarityValues[1]);
        // Apply filter values
        Example: applyClarityFilter(fromValue, toValue);
    }
});

