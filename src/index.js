import 'bootstrap';
import './scss/index.scss';
import 'datatables.net';
import domtoimage from 'dom-to-image';

const colorArray = ['safe', 'danger', 'neutral'];

const init = function() {
  drawTable();
  $('.indicator').attr('index', -1); // circle + arrow
  attachMouseHandlers();
};

const attachMouseHandlers = function() {
  $('.indicator').on('click', clickHandler);
  $('.show-progress').on('click', showProgress);
  $('.show-regress').on('click', showRegress);
  $('.show-all').on('click', showAll);
  $('.download').on('click', downloadReport);
}

const downloadReport = function() {
  const progressReport = $('.weekly-report-table').clone();
  const regressReport = $('.weekly-report-table').clone();

  progressReport.attr('id', 'progress-report');
  regressReport.attr('id', 'regress-report');

  progressReport.appendTo('.clone-container');
  regressReport.appendTo('.clone-container');

  showProgress();
  showRegress();

  const nodes = [
    document.getElementById('weekly-report'),
    document.getElementById('progress-report'),
    document.getElementById('regress-report')
  ];

  nodes.forEach(function(val, index) {
    domtoimage.toPng(nodes[index])
    .then((dataUrl) => {
        const downloadAnchor = document.createElement('a');
        downloadAnchor.href = dataUrl;
        downloadAnchor.download = nodes[index].id;
        downloadAnchor.click();

        if (nodes[index].id === 'progress-report') {
          $('#progress-report').remove();
        } else if (nodes[index].id === 'regress-report') {
          $('#regress-report').remove();
        }
    })
    .catch((error) => {
        console.error('oops, something went wrong!', error);
    });
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

const showProgress = function() {
  $('#progress-report').find('.indicator.neutral').removeClass('neutral');
  $('#progress-report').find('.indicator.danger').removeClass('danger');
}

const showRegress = function() {
  $('#regress-report').find('.indicator.neutral').removeClass('neutral');
  $('#regress-report').find('.indicator.safe').removeClass('safe');
}

const showAll = function() {
  console.log($('.indicator').length);
}

init();
