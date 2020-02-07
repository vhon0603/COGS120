
/*
 * GET settings page.
 */

exports.view = function(req, res){
  res.render('settings');
};

function goToPage(url) {
  console.log("dis the settings")
  popupWindow = window.open(url,'popUpWindow','height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
}
