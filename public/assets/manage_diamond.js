var mobile = (/iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
$(document).ready(function(){
   $(":checkbox").click(function(){
    var id = $(this).attr('id');
    var name = $(this).attr('name');
    var check = $(this).is(':checked');
    //console.log(name)
    if(name=="available[]" || name=="culet[]" || name=="color[]" || name=="fluorescence[]" || name=="hca[]" 
      || name=="clarity[]" || name=="cut[]" || name=="polish[]" || name=="symmetry[]" || name=="cert[]" || name=="pointer[]")
    {
       $(this).parent().toggleClass("active-label"); 
    }
    else if(name=="checkbox[]")
    { 
       $('label[for="' + id + '"]').toggleClass("active1");
    }
    else if(name=="vg3"){
        uncheckCPSF();
        $(this).closest("li").toggleClass("active-label");
        $('#ex3n,#fluor_None').prop("checked",false); 
        $('#ex3n,#fluor_None').closest("li").removeClass("active-label"); 
        //console.log(check)
        $('#cut_ID,#cut_EX,#pol_EX,#sym_EX,#sym_VG,#cut_VG,#pol_VG').prop("checked",check);
        if(check){
          $('#cut_ID,#cut_EX,#pol_EX,#sym_EX,#sym_VG,#cut_VG,#pol_VG').closest("li").addClass("active-label");
        }
        else{
          $('#cut_ID,#cut_EX,#pol_EX,#sym_EX,#sym_VG,#cut_VG,#pol_VG').closest("li").removeClass("active-label");
        } 
    }
     else if(name=="ex3")
    {
        uncheckCPSF();
        $(this).closest("li").toggleClass("active-label");
        $('#ex3n,#fluor_None').prop("checked",false); 
        $('#ex3n,#fluor_None').closest("li").removeClass("active-label"); 
        //console.log(check)
        $('#cut_ID,#cut_EX,#pol_EX,#sym_EX').prop("checked",check);
        if(check){
          $('#cut_ID,#cut_EX,#pol_EX,#sym_EX').closest("li").addClass("active-label");
        }
        else{
          $('#cut_ID,#cut_EX,#pol_EX,#sym_EX').closest("li").removeClass("active-label");
        } 
    }      
    else if(name=="ex3n")
    {
        uncheckCPSF();
        $(this).closest("li").toggleClass("active-label");
        $('#ex3').prop("checked",false); 
        $('#ex3').closest("li").removeClass("active-label"); 
        $('#cut_EX,#pol_EX,#sym_EX,#fluor_None').prop("checked",check);
        if(check) {
          $('#cut_EX,#pol_EX,#sym_EX,#fluor_None').closest("li").addClass("active-label");
        }
        else {
          $('#cut_EX,#pol_EX,#sym_EX,#fluor_None').closest("li").removeClass("active-label");
        }
    }

   });



});

function viewAs(id) {
  localStorage.setItem('dia_view', id);    
  if(id=='view_as_grid') {
     $("#view_as_list").prop("checked",false);
     $(".fa-list").removeClass("active");
     $(".fa-th").addClass("active");
     $("#per_page").val('60');
  } else if(id=='view_as_list') {
     $("#view_as_grid").prop("checked",false);
     $(".fa-th").removeClass("active");
     $(".fa-list").addClass("active");
     $("#per_page").val('200');
  }
  submitForm();
}

function uncheckCPSF() {
  $('.cut_check,.pol_check,.sym_check,.fluor_check').prop("checked",false);
  $('.cut_check,.pol_check,.sym_check,.fluor_check').closest("li").removeClass("active-label");
}
        
$(document).ready(function(){
    $(':checkbox:checked').each(function(){
      var val = $(this).attr('id');
      var val_class = $(this).attr('name');
      //alert(val_class);
      if(val_class=="checkbox[]")
      {
        $('label[for="' + val + '"]').addClass("active1");
      }
      else
      {
        $('label[for="' + val + '"]').addClass("active1"); 
        
      }
    });
});
// ++++++++++++++++++++Advance Search++++++++++++++++++++++++++++++++++++++++++
function show_search(){    
   event.preventDefault();

  // Stop event propagation
  event.stopPropagation();
    $("#more_filter").slideDown("3000");                
    $(".hide_show").html('<a href="javascript:void(0)" class=""><span class="" onclick="hide_search()" id="hide_advance"><i class="plus-toggle fa fa-minus"> </i> Hide Advance Filter</span></a>');        
}
function hide_search(){
    $("#more_filter").slideUp("3000");               
    $(".hide_show").html('<a href="javascript:void(0)" class=""><span class="" onclick="show_search()" id="show_advance"><i class="plus-toggle fa fa-plus"> </i> Show Advance Filter</span></a>');
}   
