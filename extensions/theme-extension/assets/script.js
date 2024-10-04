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

// Function to update pagination links with carat range values

const clarity_arr = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2"];

function updatePaginationLinks(selectedFilters) {
    const paginationLinks = document.querySelectorAll('.pagination a');
    paginationLinks.forEach(link => {
        let href = link.getAttribute('href');
        if (href) {
            const url = new URL(href, window.location.origin);
            selectedFilters.forEach((value, key) => {
              if (url.searchParams.has(key)) {
                if (key !== 'Shape' || !value.includes(url.searchParams.get(key))) {
                        url.searchParams.delete(key);
                    }
                    // url.searchParams.delete(key); // Remove existing parameter
                }
                   
              if(key === 'Shape' || key === 'ClarityFrom' || key === 'ClarityTo' || key === 'ColorFrom' || key === 'ColorTo' || key === 'CaratFrom' || key === 'CaratTo' || key === 'PriceFrom' || key === 'PriceTo'|| key === 'FluorFrom' || key === 'FluorTo' || key === 'SymFrom' || key === 'SymTo' || key === 'PolishFrom' || key === 'PolishTo' || key === 'CutFrom' || key === 'CutTo'){
                if (Array.isArray(value)) {
                    url.searchParams.set(key, value.join(','));
                 
                } else {
                    url.searchParams.set(key, value);
                }
                }
            });
            link.setAttribute('href', url.toString());
          
          
        }
    });
}
// Function to parse clarity values from URL
const filterInputs = document.querySelectorAll('input[name="checkbox[]"]');
filterInputs.forEach(input => {
      input.addEventListener('change', handleFilterChange);
  
});

function handleFilterChange() {
    const selectedFilters = new URLSearchParams();
    const filterInputs = document.querySelectorAll('input[name="checkbox[]"]:checked');

    filterInputs.forEach(input => {
        const key = 'Shape';
        const value = input.value;
        if (!selectedFilters.has(key)) {
            selectedFilters.set(key, [value]);
        } else {
            let existingValues = selectedFilters.getAll(key);
            existingValues.push(value);
            selectedFilters.set(key, existingValues);
        }
    });
    
    const allInputs = document.querySelectorAll('input[name="checkbox[]"]');
    allInputs.forEach(input => {
        if (!input.checked) {
            const key = 'Shape';
            const value = input.value;
            let existingValues = selectedFilters.getAll(key);
            existingValues = existingValues.filter(v => v !== value);
            if (existingValues.length > 0) {
                selectedFilters.set(key, existingValues);

            } else {
                selectedFilters.delete(key);

            }
        }
    });
  
    const clarityRange = $("#range_50").val();
    if (clarityRange) {
        const [fromValue, toValue] = clarityRange.split(';');
        selectedFilters.set('ClarityFrom', fromValue);
        selectedFilters.set('ClarityTo', toValue);
    } 
    const cutRange = $("#range_51a").val();
    if (cutRange) {
        const [fromValue, toValue] = cutRange.split(';');
        selectedFilters.set('CutFrom', fromValue);
        selectedFilters.set('CutTo', toValue);
    }
    const polishRange = $("#range_51ab").val();
    if (polishRange) {
        const [fromValue, toValue] = polishRange.split(';');
        selectedFilters.set('PolishFrom', fromValue);
        selectedFilters.set('PolishTo', toValue);
    }
    const fluorRange = $("#range_fluor").val();
    if (fluorRange) {
        const [fromValue, toValue] = fluorRange.split(';');
        selectedFilters.set('FluorFrom', fromValue);
        selectedFilters.set('FluorTo', toValue);
    }
    const symRange = $("#range_sys").val();
    if (symRange) {
        const [fromValue, toValue] = symRange.split(';');
        selectedFilters.set('SymFrom', fromValue);
        selectedFilters.set('SymTo', toValue);
    }
   const colorRange = $("#range_color").val();
    if (colorRange) {
        const [fromValue, toValue] = colorRange.split(';');
        selectedFilters.set('ColorFrom', fromValue);
        selectedFilters.set('ColorTo', toValue);
    }
  const caratRange = $("#range_56").val();
    if (caratRange) {
        const [fromValue, toValue] = caratRange.split(';');
        selectedFilters.set('CaratFrom', fromValue);
        selectedFilters.set('CaratTo', toValue);
     
    }
    const priceRange = $("#range_55").val();
    if (priceRange) {
        const [fromValue, toValue] = priceRange.split(';');
        selectedFilters.set('PriceFrom', fromValue);
        selectedFilters.set('PriceTo', toValue);
     
    }
   
    // if (filterInputs.length === 0 && !clarityRange  && !cutRange && !colorRange && !caratRange && !priceRange) {
    //    const url = new URL(window.location.href);
    //     url.searchParams.delete('page');
    //     updatePaginationLinks(url.searchParams);
    // } else {
    // Debugging: Log the state of selectedFilters after filter updates
    // console.log("Selected Filters (After Update):", selectedFilters.toString());
  
    updatePaginationLinks(selectedFilters);
    
      

}


// Add event listener for range inputs

$("#range_50, #range_51a, #range_51ab, #range_fluor, #range_sys, #range_color, #range_56, #range_55").on('change', handleFilterChange);


function parseURLParams(url) {
    const params = new URLSearchParams(url);
    const filters = {};
    for (const [key, value] of params.entries()) {
        filters[key] = value.split(',');
    }
    return filters;
}
 
 // Function to auto-check the shape checkbox
    function autoCheckShapeCheckbox(shapeTag) {
        const $checkbox = $('input:checkbox[name="checkbox[]"]').filter(function() {
            return this.value.toLowerCase() === shapeTag.toLowerCase();
        });

        if ($checkbox.length > 0) {
            // console.log("Checking checkbox for:", $checkbox.val());
            $checkbox.prop('checked', true);
  
            // console.log("Checkbox checked:", $checkbox.prop('checked'));
            $checkbox.trigger('change');
             const val = $checkbox.attr('id');
            $('label[for="' + val + '"]').addClass("active1");
            updateFilterInputsAndData();
          
            updateURLWithFilters('Shape', [$checkbox.val()]);
            filterGridView();
        }
    }

function updateFilterInputsAndData() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterInputs = document.querySelectorAll('input[name="checkbox[]"]');
    filterInputs.forEach(input => {
        const value = input.value;
        const filterKey = 'Shape';
        if (urlParams.has(filterKey) && urlParams.get(filterKey).includes(value)) {
            input.checked = true;
        } else {
            input.checked = false;
        }
    });
        
  const event = new Event('change');
    filterInputs.forEach(input => {
        input.dispatchEvent(event);
    });
    
}
function filterGridView() {
 
  var selectedShapes = $('input:checkbox[name="checkbox[]"]:checked').map(function() {
      return this.value;
  }).get();

 var minCarat = parseFloat($('#range_56_input_from').val());
  var maxCarat = parseFloat($('#range_56_input_to').val());
  var minPrice = parseFloat($("#range_55_input_from").val().replace(/\$/g, '')); // Remove $ sign
  var maxPrice = parseFloat($("#range_55_input_to").val().replace(/\$/g, '')); // Remove $ sign

  var $range_color = $("#range_color");
  var colorSlider = $range_color.data("ionRangeSlider");
  if (!colorSlider) {
      console.error("Color range slider is not initialized.");
      return;
  }

  var color_arr = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
  var fromColorIndex = colorSlider.result.from;
  var toColorIndex = colorSlider.result.to;
  var selected_colors = color_arr.slice(fromColorIndex, toColorIndex + 1);


  var $range_clarity = $("#range_50");

  
  var claritySlider = $range_clarity.data("ionRangeSlider");
  if (!claritySlider) {
      console.error("Clarity range slider is not initialized.");
      return;
  }

  var clarity_arr = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2"];
  const startIndex = claritySlider.result.from; 
  const endIndex = claritySlider.result.to; 
  const selectedClarityValues = clarity_arr.slice(startIndex, endIndex + 1);

  var $range_cut = $("#range_51a");

  
  var cutSlider = $range_cut.data("ionRangeSlider");
  if (!cutSlider) {
      console.error("Cut range slider is not initialized.");
      return;
  }
  var cut_array = ["EX", "VG", "GD", "FR"];
  const startCutIndex = cutSlider.result.from; 
  const endCutIndex = cutSlider.result.to; 
  const selectedCutValues = cut_array.slice(startCutIndex, endCutIndex + 1);


  
 var $range_polish = $("#range_51ab");

  
  var polishSlider = $range_polish.data("ionRangeSlider");
  if (!polishSlider) {
      console.error("Cut range slider is not initialized.");
      return;
  }
  var polish_array = ["EX", "VG", "GD", "FR"];
  const startPolishIndex = polishSlider.result.from; 
  const endPolishIndex = polishSlider.result.to; 
  const selectedPolishValues = polish_array.slice(startPolishIndex, endPolishIndex + 1);

  var $range_fluor = $("#range_fluor");

  
  var fluorSlider = $range_fluor.data("ionRangeSlider");
  if (!fluorSlider) {
      console.error("Cut range slider is not initialized.");
      return;
  }
  var fluor_array = ["N", "F", "M", "S", "VS"];
  const startFluorIndex = fluorSlider.result.from; 
  const endFluorIndex = fluorSlider.result.to; 
  const selectedFluorValues = fluor_array.slice(startFluorIndex, endFluorIndex + 1);

   var $range_sym = $("#range_sys");

  
  var symSlider = $range_sym.data("ionRangeSlider");
  if (!symSlider) {
      console.error("Sym range slider is not initialized.");
      return;
  }
  var sym_array = ["EX", "VG", "GD", "FR"];
  const startSymIndex = symSlider.result.from; 
  const endSymIndex = symSlider.result.to; 
  const selectedSymValues = sym_array.slice(startSymIndex, endSymIndex + 1);

  // Loop through each grid item
  $('.grid-item').each(function() {
        var shape = $(this).find('[data-shape]').data('shape');
        var carat = parseFloat($(this).find('[data-carat]').data('carat')) || 0; 
      
        var priceElement = $(this).find(".grid-product__price--current span:first-child");
        var priceText = priceElement.text();
        var price = parseFloat(priceText.replace(/[^\d.-]/g, '')); 
         
        var color_data = $(this).find('[data-color]').data('color');
        var clarity_data = $(this).find('[data-clarity]').data('clarity');
        var cut_data = $(this).find('[data-cut]').data('cut');
        var polish_data = $(this).find('[data-polish]').data('polish');
        var fluor_data = $(this).find('[data-fluor]').data('fluor');
        var sym_data = $(this).find('[data-sym]').data('sym');
    

        var shapeMatch = (selectedShapes.length === 0 || selectedShapes.includes(shape));

      // Check if the carat is within the selected range
      var caratMatch = (isNaN(minCarat) && isNaN(maxCarat)) ||
                       (isNaN(minCarat) && carat <= maxCarat) ||
                       (minCarat <= carat && isNaN(maxCarat)) ||
                       (minCarat <= carat && carat <= maxCarat);

      var priceMatch = (isNaN(minPrice) && isNaN(maxPrice)) ||
                       (isNaN(minPrice) && price <= maxPrice) ||
                       (minPrice <= price && isNaN(maxPrice)) ||
                       (minPrice <= price && price <= maxPrice);
                       
      var colorMatch = (selected_colors.length === 0 || selected_colors.includes(color_data));
      var clarityMatch = (selectedClarityValues.length === 0 || selectedClarityValues.includes(clarity_data));
      var cutMatch = (selectedCutValues.length === 0 || selectedCutValues.includes(cut_data));
       var polishMatch = (selectedPolishValues.length === 0 || selectedPolishValues.includes(polish_data));
       var fluorMatch = (selectedFluorValues.length === 0 || selectedFluorValues.includes(fluor_data));
       var symMatch = (selectedSymValues.length === 0 || selectedSymValues.includes(sym_data));
// console.log(polishMatch)

      if (shapeMatch && caratMatch && priceMatch && colorMatch && clarityMatch && cutMatch && polishMatch && fluorMatch && symMatch) {
          $(this).show(); // Show the grid item
      } else {
          $(this).hide(); // Hide the grid item
      }
  });
}


updateFilterInputsAndData();
filterGridView();

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
  350000, 400000, 450000, 500000, 600000, 700000, 800000, 900000, 1000000,5000000
];



function find_range(range_from, range_to) {
  var array = [];
  from_index = price_value.indexOf(range_from);
  to_index = price_value.indexOf(range_to);
  for (i = from_index; i <= to_index; i++) {
    array.push(price_value[i]);
  }
  price_value = array;

  $('#range_55_input_from').val(range_from);
  $('#range_55_input_to').val(range_to);

  return array;
}
///////////////////////////////////////////////////////////


$(document).ready(function () {
  ///////////////////////////////////////////////////////////
  var table = $("#example").DataTable({
      scrollX: true,
      // scrollY: '500px',
      paging: false,
      autoWidth: true
  });


$.fn.dataTable.ext.search.push(
          function( settings, searchData, index, rowData, counter ) {
            var positions = $('input:checkbox[name="checkbox[]"]:checked').map(function() {
              return this.value;
              
            }).get();
         
            if (positions.length === 0) {
              return true;
            }
            var shape = $(rowData[0]).find('[data-shape]').data('shape');
            
            if (positions.indexOf(searchData[2]) !== -1) {
              return true;
            }
            return false;
          }
        );
    
$('input:checkbox').on('change', function () {
              var a = table.draw();
              var checkedValues = $('input:checkbox[name="checkbox[]"]:checked').map(function() {
                  return this.value;
              }).get();
    
              updateURLWithFilters('Shape',checkedValues);
              if (checkedValues.length === 0) {
                    $(".grid-item").show();
                  } else{
                  $(".grid-item").each(function() {
                    var shape_data = $(this).find('[data-shape]').data('shape');
                    if (checkedValues.includes(shape_data)) {
                        $(this).show(); 
                    } else {
                        $(this).hide();
                    }
                });
        }
        filterGridView();
    });

  // SHAPE FILTER....end
// SHAPE FILTER....Start
    $('input:checkbox[name="setting[]"]').on('change', function () {
      
            $('.stone-box').removeClass('active'); // Remove active class from all stone-box elements

            $('input:checkbox[name="setting[]"]:checked').each(function() {
                var value = $(this).val();
                $('.stone-box').filter(function() {
                    return $(this).find('input:checkbox[value="' + value + '"]').length > 0;
                }).addClass('active');
            });

            var checkedVal = $('input:checkbox[name="setting[]"]:checked').map(function() {
                return this.value;
            }).get();
      
            if (checkedVal.length === 0) {
                        $('.new-grid .grid-item').show();
                        $('.stone-box').removeClass('active');
                    } else {
                        $('.new-grid .grid-item').hide();
                        
                        $.each(checkedVal, function(index, value) {
                            $('.new-grid .grid-item:contains("' + value + '")').show();
                        });
                    }
            updateURLWithFilters('setting', checkedVal);
        });


// SHAPE FILTER....end


  
////////////////// Price filter range/////////////////////////////
  
$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = parseFloat( $('#range_55_input_from').val().replace(/\$/g, ''), 10 );
        var max = parseFloat( $('#range_55_input_to').val().replace(/\$/g, ''), 10 );
        var age = parseFloat( data[7].replace(/\$/g, '') ) || 0; // Use data for the age column

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

var from_price = 0.00;
var to_price = 5000000.00;

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
  

        $(".grid-item").each(function() {
            var priceElement = $(this).find(".grid-product__price--current span:first-child");
            var priceText = priceElement.text();
            var price = parseFloat(priceText.replace(/[^\d.-]/g, '')); // Extract numeric value from price text
             if (!isNaN(price) && price >= from_value && price <= to_value) {
                $(this).show(); // Show the item if its price is within the selected range
            } else {
                $(this).hide(); // Hide the item if its price is outside the selected range
            }
        });
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('PriceFrom') && urlParams.has('PriceTo')) {
            const fromPrice = price_value[from_value];
            const toPrice = price_value[to_value];
            updateURLWithFilters('PriceFrom', fromPrice);
            updateURLWithFilters('PriceTo', toPrice);
            handleFilterChange();
            filterGridView();
        } else{
             updateURLWithFilters('price', data.from_value, data.to_value);
             handleFilterChange();
             filterGridView();
          }   
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
$('#range_55_input_from, #range_55_input_to').on('input', function() {
  filterGridView(); // Filter grid items when carat range changes
});
function parsepriceFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const priceFrom = parseFloat(urlParams.get('PriceFrom'));
    const priceTo = parseFloat(urlParams.get('PriceTo'));
      if (!isNaN(priceFrom) && !isNaN(priceTo)) {
       $('#range_55').data("ionRangeSlider").update({ from: priceFrom, to: priceTo });
       $("#range_55_input_from").val(priceFrom);
        $("#range_55_input_to").val(priceTo);
        table.draw();
        filterGridView();
           $(".grid-item").each(function() {
            var priceElement = $(this).find(".grid-product__price--current span:first-child");
            var priceText = priceElement.text();
            var price = parseFloat(priceText.replace(/[^\d.-]/g, '')); // Extract numeric value from price text
    
            if (!isNaN(price) && price >= priceFrom && price <= priceTo) {
                $(this).show(); // Show the item if its price is within the selected range
            } else {
                $(this).hide(); // Hide the item if its price is outside the selected range
            }
        });
    }
  else{
     const combinedPrice = urlParams.get('price');
         if (combinedPrice) {
            const price = combinedPrice.split(';');
            if(price.length === 2){
                  var from = parseFloat(price[0]);
                  var to = parseFloat(price[1]);
                  $('#range_55').data("ionRangeSlider").update({ from: from, to: to });
                  $("#range_55_input_from").val(from);
                  $("#range_55_input_to").val(to);
                  table.draw();
                  filterGridView();
                   $(".grid-item").each(function() {
                  var priceElement = $(this).find(".grid-product__price--current span:first-child");
                  var priceText = priceElement.text();
                  var price = parseFloat(priceText.replace(/[^\d.-]/g, '')); // Extract numeric value from price text
    
            if (!isNaN(price) && price >= from && price <= to) {
                $(this).show(); // Show the item if its price is within the selected range
            } else {
                $(this).hide(); // Hide the item if its price is outside the selected range
            }
        });
              
            }   
         }
  }
  }

  ////////////////// Carat filter range/////////////////////////////

  $.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = parseFloat($('#range_56_input_from').val());
        var max = parseFloat($('#range_56_input_to').val());
        var carat = parseFloat(data[3]) || 0; // Assuming the carat value is in the fourth column (index 3)

        if ((isNaN(min) && isNaN(max)) || (isNaN(min) && carat <= max) || (min <= carat && isNaN(max)) || (min <= carat && carat <= max)) {
            return true;
        }
        return false;
    }
);

  
$('#range_56_input_from, #range_56_input_to').keyup(function() { table.draw(); });

var from_carat = 0;
var to_carat = 100;
    var carat_arr = [from_carat,to_carat];
  
$("#range_56").ionRangeSlider({
    type: "double",
    min: 0,
    max: 40,
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
        $(".grid-product__title").each(function() {
        var carat_data = $(this).find('[data-carat]').data('carat');
        var showItem = false;
              if (carat_data) {
                 var caratValue = parseFloat(carat_data);
                  if (!isNaN(caratValue)) {
                      if (caratValue >= data.from && caratValue <= data.to) {
                          showItem = true;
                          
                      }
                  }
              }
              if (showItem) {
                  $(this).closest('.grid-item').show(); // Show the parent grid item
              } else {
                  $(this).closest('.grid-item').hide(); // Hide the parent grid item
              }
          });
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('CaratFrom') && urlParams.has('CaratTo')) {
            const fromCarat = carat_arr[data.from];
            const toCarat = carat_arr[data.to];
            updateURLWithFilters('CaratFrom', fromCarat);
            updateURLWithFilters('CaratTo', toCarat);
            handleFilterChange();
            filterGridView();

        } else{
            updateURLWithFilters('carat', data.from, data.to);
            handleFilterChange();
            filterGridView();
         } 
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
// Event handler for carat range input change
$('#range_56_input_from, #range_56_input_to').on('input', function() {
  filterGridView(); // Filter grid items when carat range changes
});

function parseCaratFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const caratFrom = parseFloat(urlParams.get('CaratFrom'));
    const caratTo = parseFloat(urlParams.get('CaratTo'));

    if (!isNaN(caratFrom) && !isNaN(caratTo)) {
        $('#range_56').data("ionRangeSlider").update({ from: caratFrom, to: caratTo });
        $("#range_56_input_from").val(caratFrom);
        $("#range_56_input_to").val(caratTo);
        table.draw();
        filterGridView(); 
        $(".grid-product__title").each(function() {
            var carat_data = $(this).find('[data-carat]').data('carat');
            var showItem = false;
            if (carat_data) {
                var caratValue = parseFloat(carat_data);
                if (!isNaN(caratValue)) {
                    if (caratValue >= caratFrom && caratValue <= caratTo) {
                        showItem = true;
                    }
                }
            }
            if (showItem) {
                $(this).closest('.grid-item').show(); // Show the parent grid item
            } else {
                $(this).closest('.grid-item').hide(); // Hide the parent grid item
            }
        });
    } else {
        const combinedCarat = urlParams.get('carat');
        if (combinedCarat) {
            const carat = combinedCarat.split(';');
            if (carat.length === 2) {
                var from = parseFloat(carat[0]);
                var to = parseFloat(carat[1]);
                $('#range_56').data("ionRangeSlider").update({ from: from, to: to });
                $("#range_56_input_from").val(from);
                $("#range_56_input_to").val(to);
                table.draw();
                $(".grid-product__title").each(function() {
                    var carat_data = $(this).find('[data-carat]').data('carat');
                    var showItem = false;
                    if (carat_data) {
                        var caratValue = parseFloat(carat_data);
                        if (!isNaN(caratValue)) {
                            if (caratValue >= from && caratValue <= to) {
                                showItem = true;
                            }
                        }
                    }
                    if (showItem) {
                        $(this).closest('.grid-item').show(); // Show the parent grid item
                    } else {
                        $(this).closest('.grid-item').hide(); // Hide the parent grid item
                    }
                });
                filterGridView();

            }
        }
    }
}



// color filter 
  
var from_color = 0;
var to_color = 9;
var from_color_val = "D";
var to_color_val = "M";
var $range_color = $("#range_color");

$range_color.ionRangeSlider({
    type: "double",
    grid: true,
    from: 0,
    to: 9,
    values: ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"],
    onStart: function (data) {
        $("#range_color").val(from_color_val + ";" + to_color_val);
    },
    onChange: function (data) {
      
        var from_index = data.from;
        var to_index = data.to;
        var color_arr = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
        var selected_colors = color_arr.slice(from_index, to_index + 1);
        var colorStr = selected_colors.join("|");
        var tab = table.column(4).search(colorStr, true, false).draw();
        filterGridView();
              
        $(".grid-product__title").each(function() {
        var color_data = $(this).find('[data-color]').data('color');
        var showItem = false;
              if (color_data) {
                  if (selected_colors.includes(color_data)) {
                          showItem = true;
                  }
              }
              if (showItem) {
                  $(this).closest('.grid-item').show(); // Show the parent grid item
              } else {
                  $(this).closest('.grid-item').hide(); // Hide the parent grid item
              }
          });
      const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('ColorFrom') && urlParams.has('ColorTo')) {
            const fromColor = color_arr[from_index];
            const toColor = color_arr[to_index];
            updateURLWithFilters('ColorFrom', fromColor);
            updateURLWithFilters('ColorTo', toColor);
            handleFilterChange();
filterGridView();


        } else{
             updateURLWithFilters('color',data.from_value, data.to_value);
             handleFilterChange();
            filterGridView();



          }
    }
});
  
$('#range_color').on('change', function() {
  filterGridView(); // Filter grid items when carat range changes
});

var colorSlider = $range_color.data("ionRangeSlider");
  
  function parseColorFromURL() {
    const color_arr = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
    const urlParams = new URLSearchParams(window.location.search);
    const colorFrom = urlParams.get('ColorFrom');
    const colorTo = urlParams.get('ColorTo');
    if (colorFrom && colorTo) {
        // Set the color range slider values based on URL parameters
        const colorValues = [colorFrom, colorTo];
        const colorIndexValues = colorValues.map(value => color_arr.indexOf(value));
        $range_color.data("ionRangeSlider").update({ from: colorIndexValues[0], to: colorIndexValues[1] });
        const selectedColorValues = color_arr.slice(colorIndexValues[0], colorIndexValues[1] + 1);
        const colorStr = selectedColorValues.join('|');
        table.columns(4).search('^(' + colorStr + ')$', true, false, true).draw();
        filterGridView();

      $(".grid-product__title").each(function() {
        var color_data = $(this).find('[data-color]').data('color');
        var showItem = false;
              if (color_data) {
                  if (selectedColorValues.includes(color_data)) {
                          showItem = true;
                  }
              }
              if (showItem) {
                  $(this).closest('.grid-item').show(); // Show the parent grid item
              } else {
                  $(this).closest('.grid-item').hide(); // Hide the parent grid item
              }
          });

      
    }
    else {
        // Check if combined color parameter exists
        const combinedColor = urlParams.get('color');
        if (combinedColor) {
            const colors = combinedColor.split(';');
            if (colors.length === 2) {

                const colorValues = [colors[0], colors[1]];
                const colorIndexValues = colorValues.map(value => color_arr.indexOf(value));
                $range_color.data("ionRangeSlider").update({ from: colorIndexValues[0], to: colorIndexValues[1] });
                const selectedColorValues = color_arr.slice(colorIndexValues[0], colorIndexValues[1] + 1);
                const colorStr = selectedColorValues.join('|');
                var tab = table.columns(4).search('^(' + colorStr + ')$', true, false, true).draw();
                filterGridView();


                // console.log("ssss",tab);
               $(".grid-product__title").each(function() {
                var color_data = $(this).find('[data-color]').data('color');
                var showItem = false;
                    if (color_data) {
                        if (selectedColorValues.includes(color_data)) {
                                showItem = true;
                        }
                    }
                    if (showItem) {
                        $(this).closest('.grid-item').show(); // Show the parent grid item
                    } else {
                        $(this).closest('.grid-item').hide(); // Hide the parent grid item
                    }
                });
            }
        }
    }
  }
  

  //   clarity filter 


 var from_clarity = 0;
  var to_clarity = 9;
  var from_clarity_val = "FL";
  var to_clarity_val = "I2";
  
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
          // if (selectedClarityValues.includes("VS1") || selectedClarityValues.includes("VS2")) {
          //   const indexToRemove = selectedClarityValues.indexOf("VVS1");
          //   if (indexToRemove !== -1) selectedClarityValues.splice(indexToRemove, 1);
          //   const indexToRemove2 = selectedClarityValues.indexOf("VVS2");
          //   if (indexToRemove2 !== -1) selectedClarityValues.splice(indexToRemove2, 1);
          // }
          
          // Construct a pipe-separated string of clarity values for filtering
          let clarityStr = selectedClarityValues.join('|');
        
          // Apply the filter to the table
          table.columns(5).search('^(' + clarityStr + ')$', true, false, true).draw();
            filterGridView();
           $(".grid-product__title").each(function() {
             var clarity_data = $(this).find('[data-clarity]').data('clarity');
             var showItem = false;
                if (clarity_data) {
                  if(selectedClarityValues.includes(clarity_data)) {
                            showItem = true;
                    }
                }
                if (showItem) {
                    $(this).closest('.grid-item').show(); // Show the parent grid item
                } else {
                    $(this).closest('.grid-item').hide(); // Hide the parent grid item
                }
            });
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('ClarityFrom') && urlParams.has('ClarityTo')) {
            const fromClarity = clarity_arr[startIndex];
            const toClarity = clarity_arr[endIndex];
            updateURLWithFilters('ClarityFrom', fromClarity);
            updateURLWithFilters('ClarityTo', toClarity);
            handleFilterChange();
            filterGridView();

        } else{
              updateURLWithFilters('clarity', data.from_value, data.to_value);
             handleFilterChange();
            filterGridView();
            }   
          }      
  });

  $('#range_50').on('change', function() {
    filterGridView(); // Filter grid items when carat range changes
  });

  function parseClarityFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const clarityFrom = urlParams.get('ClarityFrom');
    const clarityTo = urlParams.get('ClarityTo');
       // var table = $('#example').DataTable();
  
    if (clarityFrom && clarityTo) {
        const clarityValues = [clarityFrom, clarityTo];
        const clarityIndexValues = clarityValues.map(value => clarity_arr.indexOf(value));
        $range_50.data("ionRangeSlider").update({ from: clarityIndexValues[0], to: clarityIndexValues[1] });
        const selectedClarityValues = clarity_arr.slice(clarityIndexValues[0], clarityIndexValues[1] + 1);
        const clarityStr = selectedClarityValues.join('|');
        table.columns(5).search('^(' + clarityStr + ')$', true, false, true).draw();
        filterGridView();

       $(".grid-product__title").each(function() {
          var clarity_data = $(this).find('[data-clarity]').data('clarity');
          var showItem = false;
                if (clarity_data) {
                    if (selectedClarityValues.includes(clarity_data)) {
                            showItem = true;
                    }
                }
                if (showItem) {
                    $(this).closest('.grid-item').show(); // Show the parent grid item
                } else {
                    $(this).closest('.grid-item').hide(); // Hide the parent grid item
                }
            });
    }
      else{
        const combinedClarity = urlParams.get('clarity');
        if(combinedClarity){
          const claritys = combinedClarity.split(';');
          if(claritys.length == 2){}
                const clarityValues = [claritys[0], claritys[1]];
                const clarityIndexValues = clarityValues.map(value => clarity_arr.indexOf(value));
                $range_50.data("ionRangeSlider").update({ from: clarityIndexValues[0], to: clarityIndexValues[1] });
                const selectedClarityValues = clarity_arr.slice(clarityIndexValues[0], clarityIndexValues[1] + 1);
                const clarityStr = selectedClarityValues.join('|');
                table.columns(5).search('^(' + clarityStr + ')$', true, false, true).draw();
               filterGridView();

               $(".grid-product__title").each(function() {
              var clarity_data = $(this).find('[data-clarity]').data('clarity');
              var showItem = false;
                    if (clarity_data) {
                        if (selectedClarityValues.includes(clarity_data)) {
                                showItem = true;
                        }
                    }
                    if (showItem) {
                        $(this).closest('.grid-item').show(); // Show the parent grid item
                    } else {
                        $(this).closest('.grid-item').hide(); // Hide the parent grid item
                    }
                });
          
        }
      }
      
  }

    // Function to update URL with selected clarity range

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
     // table.columns().search('"'+newStr+'"' ,true,true).draw();
        table.columns(6).search('^(' + newStr + ')$', true, false, true).draw();
        filterGridView();

    
    $(".grid-product__title").each(function() {
          var cut_data = $(this).find('[data-cut]').data('cut');
          var showItem = false;
                if (cut_data) {
                  if(selectedValues.includes(cut_data)) {
                            showItem = true;
                    }
                }
                if (showItem) {
                    $(this).closest('.grid-item').show(); // Show the parent grid item
                } else {
                    $(this).closest('.grid-item').hide(); // Hide the parent grid item
                }
            });
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('CutFrom') && urlParams.has('CutTo')) {
            const fromCut = myArray[startIndex];
            const toCut = myArray[endIndex];
               updateURLWithFilters('CutFrom', fromCut);
              updateURLWithFilters('CutTo', toCut);
              handleFilterChange();
              filterGridView();

        } else{
            updateURLWithFilters('cut',data.from_value, data.to_value);
            handleFilterChange();
         filterGridView();

          }   
    
    
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

$('#range_51a').on('change', function() {
  filterGridView(); // Filter grid items when carat range changes
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

  function parseCutFromURL() {
    var cut_arr = ["EX", "VG", "GD", "FR"];
    const urlParams = new URLSearchParams(window.location.search);
    const cutFrom = urlParams.get('CutFrom');
    const cutTo = urlParams.get('CutTo');
   if (cutFrom && cutTo) {
        const cutValues = [cutFrom, cutTo];
        const cutIndexValues = cutValues.map(value => cut_arr.indexOf(value));
        $range_51a.data("ionRangeSlider").update({ from: cutIndexValues[0], to: cutIndexValues[1] });
        const selectedcutValues = cut_arr.slice(cutIndexValues[0],cutIndexValues[1]);
        const cutStr = selectedcutValues.join("|");
        table.columns(6).search('^(' + cutStr + ')$', true, false, true).draw();
        filterGridView();

        $(".grid-product__title").each(function() {
          var cut_data = $(this).find('[data-cut]').data('cut');
          var showItem = false;
                if (cut_data) {
                  if(selectedcutValues.includes(cut_data)) {
                            showItem = true;
                    }
                }
                if (showItem) {
                    $(this).closest('.grid-item').show(); // Show the parent grid item
                } else {
                    $(this).closest('.grid-item').hide(); // Hide the parent grid item
                }
            });
      }
     else{
        const combinedCut = urlParams.get('cut');
        if(combinedCut){
          const cuts = combinedCut.split(';');
          if(cuts.length == 2){}
                const cutValues = [cuts[0], cuts[1]];
                const cutIndexValues = cutValues.map(value => cut_arr.indexOf(value));
                $range_51a.data("ionRangeSlider").update({ from: cutIndexValues[0], to: cutIndexValues[1] });
                const selectedCutValues = cut_arr.slice(cutIndexValues[0], cutIndexValues[1] + 1);
                const cutStr = selectedCutValues.join('|');
                table.columns(6).search('^(' + cutStr + ')$', true, false, true).draw();
                filterGridView();

               $(".grid-product__title").each(function() {
              var cut_data = $(this).find('[data-cut]').data('cut');
              var showItem = false;
                    if (cut_data) {
                        if (selectedCutValues.includes(cut_data)) {
                                showItem = true;
                        }
                    }
                    if (showItem) {
                        $(this).closest('.grid-item').show(); // Show the parent grid item
                    } else {
                        $(this).closest('.grid-item').hide(); // Hide the parent grid item
                    }
                });
          
        }
      }
  }
      
  /*****Polish*******/
var from_polish = 0;
var to_polish = 3;
var from_polish_val = "EX";
var to_polish_val = "FR";
if (urlToParse.length) {
  var polish_url = result_url.polish;
  var polish_url = polish_url.split("%3B");
  if (polish_url[1] != "") {
    from_polish = polish_url[0];
    to_polish = polish_url[1];
    from_polish_val = from_polish;
    to_polish_val = to_polish;

    var price_value1 = ["EX", "VG", "GD", "FR"];
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
  to: to_polish,
  values: ["EX", "VG", "GD", "FR"],
  onStart: function (data) {
    $("#range_51ab").val(from_polish_val + ";" + to_polish_val);
  },
  onChange: function (data) {
    
    var myArray = ["EX", "VG", "GD", "FR"];
    const startIndex = data.from; // Replace with the index of the desired start value
    const endIndex = data.to; // Replace with the index of the desired end value

    const selectedValues = getValuesByIndices(myArray, startIndex, endIndex);
   
    let selectedValues_str = selectedValues.toString();
    var newStr = selectedValues_str.replaceAll(",", "|");
     // table.columns().search('"'+newStr+'"' ,true,true).draw();
        table.columns(7).search('^(' + newStr + ')$', true, false, true).draw();
        filterGridView();
   

    
    $(".grid-product__title").each(function() {
          var polish_data = $(this).find('[data-polish]').data('polish');
        
          var showItem = false;
                if (polish_data) {
                  if(selectedValues.includes(polish_data)) {
                            showItem = true;
                        
                    }
                }
                if (showItem) {
                    $(this).closest('.grid-item').show(); // Show the parent grid item
                  console.log(showItem);
                } else {
                    $(this).closest('.grid-item').hide(); // Hide the parent grid item
                }
            });
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('PolishFrom') && urlParams.has('PolishTo')) {
            const fromPolish = myArray[startIndex];
            const toPolish = myArray[endIndex];
               updateURLWithFilters('PolishFrom', fromPolish);
              updateURLWithFilters('PolishTo', toPolish);
              handleFilterChange();
              filterGridView();

        } else{
            updateURLWithFilters('polish',data.from_value, data.to_value);
            handleFilterChange();
           filterGridView();

          }   
    
    
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

$('#range_51ab').on('change', function() {
  filterGridView(); // Filter grid items when carat range changes
});

var rangePolish = $range_51ab.data("ionRangeSlider");

$update_btn.on("click", function () {
  rangePolish.update({
    from: 0,
    to: 0,
  });
});
$reset_btn.on("click", function () {
  rangePolish.update({
    from: 0,
    to: 3,
    values: ["EX", "VG", "GD", "FR"],
  });
});

  function parsePolishFromURL() {
    var polish_arr = ["EX", "VG", "GD", "FR"];
    const urlParams = new URLSearchParams(window.location.search);
    const polishFrom = urlParams.get('PolishFrom');
    const polishTo = urlParams.get('PolishTo');
   if (polishFrom && polishTo) {
        const polishValues = [polishFrom, polishTo];
        const polishIndexValues = polishValues.map(value => polish_arr.indexOf(value));
        $range_51ab.data("ionRangeSlider").update({ from: polishIndexValues[0], to: polishIndexValues[1] });
        const selectedpolishValues = polish_arr.slice(polishIndexValues[0],polishIndexValues[1]);
        const polishStr = selectedpolishValues.join("|");
        table.columns(7).search('^(' + polishStr + ')$', true, false, true).draw();
        filterGridView();

        $(".grid-product__title").each(function() {
          var polish_data = $(this).find('[data-polish]').data('polish');
          var showItem = false;
                if (polish_data) {
                  if(selectedpolishValues.includes(polish_data)) {
                            showItem = true;
                    }
                }
                if (showItem) {
                    $(this).closest('.grid-item').show(); // Show the parent grid item
                } else {
                    $(this).closest('.grid-item').hide(); // Hide the parent grid item
                }
            });
      }
     else{
        const combinedPolish = urlParams.get('polish');
        if(combinedPolish){
          const polishs = combinedPolish.split(';');
          if(polishs.length == 2){}
                const polishValues = [polishs[0], polishs[1]];
                const polishIndexValues = polishValues.map(value => polish_arr.indexOf(value));
                $range_51ab.data("ionRangeSlider").update({ from: polishIndexValues[0], to: polishIndexValues[1] });
                const selectedPolishValues = polish_arr.slice(polishIndexValues[0], polishIndexValues[1] + 1);
                const polishStr = selectedPolishValues.join('|');
                table.columns(7).search('^(' + polishStr + ')$', true, false, true).draw();
        filterGridView();

               $(".grid-product__title").each(function() {
              var polish_data = $(this).find('[data-polish]').data('polish');
              var showItem = false;
                    if (polish_data) {
                        if (selectedPolishValues.includes(polish_data)) {
                                showItem = true;
                        }
                    }
                    if (showItem) {
                        $(this).closest('.grid-item').show(); // Show the parent grid item
                    } else {
                        $(this).closest('.grid-item').hide(); // Hide the parent grid item
                    }
                });
          
        }
      }
  }
      

 
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

    var price_value1 = ["N", "F", "M", "S", "VS"];
    from_fluor = price_value1.indexOf(from_fluor);
    to_fluor = price_value1.indexOf(to_fluor);
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
  values: ["N", "F", "M", "S", "VS"],
  onStart: function (data) {
    $("#range_fluor").val(from_fluor_val + ";" + to_fluor_val);
  },
  onChange: function (data) {
    
    var myArray = ["N", "F", "M", "S", "VS"];
    const startIndex = data.from; // Replace with the index of the desired start value
    const endIndex = data.to; // Replace with the index of the desired end value

    const selectedValues = getValuesByIndices(myArray, startIndex, endIndex);
   
    let selectedValues_str = selectedValues.toString();
    var newStr = selectedValues_str.replaceAll(",", "|");
     // table.columns().search('"'+newStr+'"' ,true,true).draw();
        table.columns(7).search('^(' + newStr + ')$', true, false, true).draw();
        filterGridView();
   

    
    $(".grid-product__title").each(function() {
          var fluor_data = $(this).find('[data-fluor]').data('fluor');
        
          var showItem = false;
                if (fluor_data) {
                  if(selectedValues.includes(fluor_data)) {
                            showItem = true;
                        
                    }
                }
                if (showItem) {
                    $(this).closest('.grid-item').show(); // Show the parent grid item
                  console.log(showItem);
                } else {
                    $(this).closest('.grid-item').hide(); // Hide the parent grid item
                }
            });
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('FluorFrom') && urlParams.has('FluorTo')) {
            const fromFluor = myArray[startIndex];
            const toFluor = myArray[endIndex];
               updateURLWithFilters('FluorFrom', fromFluor);
              updateURLWithFilters('FluorTo', toFluor);
              handleFilterChange();
              filterGridView();

        } else{
            updateURLWithFilters('fluor',data.from_value, data.to_value);
            handleFilterChange();
           filterGridView();

          }   
    
    
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

$('#range_fluor').on('change', function() {
  filterGridView(); // Filter grid items when carat range changes
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
    values: ["N", "F", "M", "S", "VS"],
  });
});

  function parseFluorFromURL() {
    var fluor_arr = ["N", "F", "M", "S", "VS"];
    const urlParams = new URLSearchParams(window.location.search);
    const fluorFrom = urlParams.get('FluorFrom');
    const fluorTo = urlParams.get('FluorTo');
   if (fluorFrom && fluorTo) {
        const fluorValues = [fluorFrom, fluorTo];
        const fluorIndexValues = fluorValues.map(value => fluor_arr.indexOf(value));
        $range_fluor.data("ionRangeSlider").update({ from: fluorIndexValues[0], to: fluorIndexValues[1] });
        const selectedfluorValues = fluor_arr.slice(fluorIndexValues[0],fluorIndexValues[1]);
        const fluorStr = selectedfluorValues.join("|");
        table.columns(7).search('^(' + fluorStr + ')$', true, false, true).draw();
        filterGridView();

        $(".grid-product__title").each(function() {
          var fluor_data = $(this).find('[data-fluor]').data('fluor');
          var showItem = false;
                if (fluor_data) {
                  if(selectedfluorValues.includes(fluor_data)) {
                            showItem = true;
                    }
                }
                if (showItem) {
                    $(this).closest('.grid-item').show(); // Show the parent grid item
                } else {
                    $(this).closest('.grid-item').hide(); // Hide the parent grid item
                }
            });
      }
     else{
        const combinedFluor = urlParams.get('fluor');
        if(combinedFluor){
          const fluors = combinedFluor.split(';');
          if(fluors.length == 2){}
                const fluorValues = [fluors[0], fluors[1]];
                const fluorIndexValues = fluorValues.map(value => fluor_arr.indexOf(value));
                $range_fluor.data("ionRangeSlider").update({ from: fluorIndexValues[0], to: fluorIndexValues[1] });
                const selectedFluorValues = fluor_arr.slice(fluorIndexValues[0], fluorIndexValues[1] + 1);
                const fluorStr = selectedFluorValues.join('|');
                table.columns(7).search('^(' + fluorStr + ')$', true, false, true).draw();
        filterGridView();

               $(".grid-product__title").each(function() {
              var fluor_data = $(this).find('[data-fluor]').data('fluor');
              var showItem = false;
                    if (fluor_data) {
                        if (selectedFluorValues.includes(fluor_data)) {
                                showItem = true;
                        }
                    }
                    if (showItem) {
                        $(this).closest('.grid-item').show(); // Show the parent grid item
                    } else {
                        $(this).closest('.grid-item').hide(); // Hide the parent grid item
                    }
                });
          
        }
      }
  }
     


  
  ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////

  /*****Symmetry*******/
var from_sym = 0;
var to_sym = 3;
var from_sym_val = "EX";
var to_sym_val = "FR";
if (urlToParse.length) {
  var sym_url = result_url.sym;
  var sym_url = sym_url.split("%3B");
  if (sym_url[1] != "") {
    from_sym = sym_url[0];
    to_sym = sym_url[1];
    from_sym_val = from_sym;
    to_sym_val = to_sym;

    var price_value1 = ["EX", "VG", "GD", "FR"];
    from_sym = price_value1.indexOf(from_sym);
    to_sym = price_value1.indexOf(to_sym);
  }
}

var $range_sym = $("#range_sys"),
    $update_btn = $(".label_make_3X");
    $reset_btn = $(".label_make_reset");

$range_sym.ionRangeSlider({
  type: "double",
  grid: true,
  from: from_sym,
  to: to_sym,
  values: ["EX", "VG", "GD", "FR"],
  onStart: function (data) {
    $("#range_sys").val(from_sym_val + ";" + to_sym_val);
  },
  onChange: function (data) {
    
    var myArray = ["EX", "VG", "GD", "FR"];
    const startIndex = data.from; // Replace with the index of the desired start value
    const endIndex = data.to; // Replace with the index of the desired end value

    const selectedValues = getValuesByIndices(myArray, startIndex, endIndex);
   
    let selectedValues_str = selectedValues.toString();
    var newStr = selectedValues_str.replaceAll(",", "|");
     // table.columns().search('"'+newStr+'"' ,true,true).draw();
        table.columns(7).search('^(' + newStr + ')$', true, false, true).draw();
        filterGridView();
   

    
    $(".grid-product__title").each(function() {
          var sym_data = $(this).find('[data-sym]').data('sym');
        
          var showItem = false;
                if (sym_data) {
                  if(selectedValues.includes(sym_data)) {
                            showItem = true;
                        
                    }
                }
                if (showItem) {
                    $(this).closest('.grid-item').show(); // Show the parent grid item
                  console.log(showItem);
                } else {
                    $(this).closest('.grid-item').hide(); // Hide the parent grid item
                }
            });
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('SymFrom') && urlParams.has('SymTo')) {
            const fromSym = myArray[startIndex];
            const toSym = myArray[endIndex];
               updateURLWithFilters('SymFrom', fromSym);
              updateURLWithFilters('SymTo', toSym);
              handleFilterChange();
              filterGridView();

        } else{
            updateURLWithFilters('sym',data.from_value, data.to_value);
            handleFilterChange();
           filterGridView();

          }   
    
    
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

$('#range_sys').on('change', function() {
  filterGridView(); // Filter grid items when carat range changes
});

var rangeSym = $range_sym.data("ionRangeSlider");

$update_btn.on("click", function () {
  rangeSym.update({
    from: 0,
    to: 0,
  });
});
$reset_btn.on("click", function () {
  rangeSym.update({
    from: 0,
    to: 3,
    values: ["EX", "VG", "GD", "FR"],
  });
});

  function parseSymFromURL() {
    var sym_arr = ["EX", "VG", "GD", "FR"];
    const urlParams = new URLSearchParams(window.location.search);
    const symFrom = urlParams.get('SymFrom');
    const symTo = urlParams.get('SymTo');
   if (symFrom && symTo) {
        const symValues = [symFrom, symTo];
        const symIndexValues = symValues.map(value => sym_arr.indexOf(value));
        $range_sym.data("ionRangeSlider").update({ from: symIndexValues[0], to: symIndexValues[1] });
        const selectedsymValues = sym_arr.slice(symIndexValues[0],symIndexValues[1]);
        const symStr = selectedsymValues.join("|");
        table.columns(7).search('^(' + symStr + ')$', true, false, true).draw();
        filterGridView();

        $(".grid-product__title").each(function() {
          var sym_data = $(this).find('[data-sym]').data('sym');
          var showItem = false;
                if (sym_data) {
                  if(selectedsymValues.includes(sym_data)) {
                            showItem = true;
                    }
                }
                if (showItem) {
                    $(this).closest('.grid-item').show(); // Show the parent grid item
                } else {
                    $(this).closest('.grid-item').hide(); // Hide the parent grid item
                }
            });
      }
     else{
        const combinedSym = urlParams.get('sym');
        if(combinedSym){
          const syms = combinedSym.split(';');
          if(syms.length == 2){}
                const symValues = [syms[0], syms[1]];
                const symIndexValues = symValues.map(value => sym_arr.indexOf(value));
                $range_sym.data("ionRangeSlider").update({ from: symIndexValues[0], to: symIndexValues[1] });
                const selectedSymValues = sym_arr.slice(symIndexValues[0], symIndexValues[1] + 1);
                const symStr = selectedSymValues.join('|');
                table.columns(7).search('^(' + symStr + ')$', true, false, true).draw();
        filterGridView();

               $(".grid-product__title").each(function() {
              var sym_data = $(this).find('[data-sym]').data('sym');
              var showItem = false;
                    if (sym_data) {
                        if (selectedSymValues.includes(sym_data)) {
                                showItem = true;
                        }
                    }
                    if (showItem) {
                        $(this).closest('.grid-item').show(); // Show the parent grid item
                    } else {
                        $(this).closest('.grid-item').hide(); // Hide the parent grid item
                    }
                });
          
        }
      }
  }


  
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
        return this.value;
      })
      .get();
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
    table.columns(0).search(this.value).draw();
  });



function switchToGridView() {
        $('#table-container').removeClass('list-view').addClass('grid-view');
        $('#grid-view-btn').addClass('active');
        $('#list-view-btn').removeClass('active');
         table.destroy();
         table = $('#example').DataTable({
        scrollX: true,
        // scrollY: '500px',
        paging: false,
        autoWidth: true
    });
        parsepriceFromURL();
        parseCaratFromURL();
        parseColorFromURL();
        parseClarityFromURL();
        parseCutFromURL();
        parsePolishFromURL();
        parseFluorFromURL();
  parseSymFromURL()
        filterGridView()
     
      // parseColorFromURL();
    localStorage.setItem('selectedView', 'grid');
     
    }

    // Function to switch to list view
    function switchToListView() {
        $('#table-container').removeClass('grid-view').addClass('list-view');
        $('#list-view-btn').addClass('active');
        $('#grid-view-btn').removeClass('active');
         table.destroy();
         table = $('#example').DataTable({
        scrollX: true,
        // scrollY: '500px',
        paging: false,
        autoWidth: true
    });
        parsepriceFromURL();
        parseCaratFromURL();
        parseColorFromURL();
        parseClarityFromURL();
        parseCutFromURL();
        parsePolishFromURL();
      parseFluorFromURL();
      parseSymFromURL()
        filterGridView()
      
       localStorage.setItem('selectedView', 'list');
      
    }

    // Event listener for grid view button click
    $('#grid-view-btn').on('click', function() {
        switchToGridView();
        
    });

    // Event listener for list view button click
    $('#list-view-btn').on('click', function() {
        switchToListView();
    });

  // Check local storage for last selected view
    const lastSelectedView = localStorage.getItem('selectedView');
      if (lastSelectedView === null) {
        switchToGridView(); 
    } else {
    if (lastSelectedView === 'grid') {
        switchToGridView();
    } else {
        switchToListView();
    }
    }
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
    
  var url = window.location.href.split('?')[0]; // Get the base URL
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

    
    var newURL = url + '?' + urlParams.toString();

     newURL = newURL.replace(/%3B/g, ';');


    // Replace the current URL with the updated URL
    window.history.pushState({}, '', newURL);
    var filterValues = {
        fromValue: fromValue,
        toValue: toValue
    };
    sessionStorage.setItem(filterName, JSON.stringify(filterValues));
}


function formatMoney(amount, currency = '$', decimal = '.', thousands = ',') {
              const negative = amount < 0 ? '-' : '';
              const fixedAmount = Math.abs(parseFloat(amount) || 0).toFixed(2);
              const parts = fixedAmount.split('.');
              const integerPart = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${thousands}`);
              const decimalPart = parts[1] ? `${decimal}${parts[1]}` : '';
              return `${negative}${currency}${integerPart}${decimalPart}`;
          }



