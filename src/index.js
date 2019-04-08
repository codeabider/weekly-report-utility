import 'bootstrap';
import './scss/index.scss';
import 'datatables.net';
import domtoimage from 'dom-to-image';

const colorArray = ['danger', 'neutral', 'success'];

const init = function() {
  drawTable();
  $('.circle').attr('index', -1);
  $('.arrow').attr('index', -1);
  attachMouseHandlers();
};

const attachMouseHandlers = function() {
  $('.circle').on('click', clickHandler);
  $('.download').on('click', downloadReport);
}

const downloadReport = function() {
  const node = document.getElementById('weekly-report');
  domtoimage.toPng(node)
  .then( (dataUrl) => {
    $('.download').attr('href', dataUrl);
  })
  .catch( (error) => {
      console.error('oops, something went wrong!', error);
  });
}

const clickHandler = function(event) {
  let index = $(event.target).attr('index');
  $(event.target).attr('index', ++index);

  if (index === colorArray.length - 1) {
    $(event.target).attr('index', -1);
  }

  for (let i = 0; i < colorArray.length; i++) {
    if ($(event.target).hasClass(colorArray[i])) {
      $(event.target).removeClass(colorArray[i]);
    }
  }
  $(event.target).addClass(colorArray[index]);
}

const drawTable = function() {
  $('table').dataTable({
    bSort: false,
    bPaginate: false,
    bFilter: false,
    bInfo: false
  });
}

init();
