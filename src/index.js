import "bootstrap";
import "./scss/index.scss";
import "datatables";

var colorArray = new Array("danger", "neutral", "success");

init();

function init() {
  drawTable();
  $(".circle").attr("index", -1);
  $(".arrow").attr("index", -1);
  attachClickHandler();
}

function attachClickHandler() {
  $(".circle").on("click", clickHandler);
}

function clickHandler(event) {
  var index = $(event.target).attr("index");
  $(event.target).attr("index", ++index);

  if (index === colorArray.length - 1) {
    $(event.target).attr("index", -1);
  }

  for (var i = 0; i < colorArray.length; i++) {
    if ($(event.target).hasClass(colorArray[i])) {
      $(event.target).removeClass(colorArray[i]);
    }
  }
  $(event.target).addClass(colorArray[index]);
}

function drawTable() {
  $("table").dataTable({
    bSort: false,
    bPaginate: false,
    bFilter: true,
    bInfo: false
  });
}
