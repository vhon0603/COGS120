
/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('index');
};

function goToPage(url) {
  console.log("hello")
  popupWindow = window.open(url,'popUpWindow','height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
}
