/* eslint-disable linebreak-style */
import 'bootstrap';
import './scss/index.scss';
import 'datatables.net';
import domtoimage from 'dom-to-image';

(() => {
  const colorArray = ['safe', 'danger', 'neutral'];

  const init = () => {
    drawTable();
    $('.indicator').attr('index', -1); // circle + arrow
    attachMouseHandlers();
  };

  const attachMouseHandlers = () => {
    $('.indicator').on('click', clickHandler);
    $('.download').on('click', downloadReport);
  }

  const downloadReport = () => {
    const progressReport = $('#weekly-report').clone();
    const regressReport = $('#weekly-report').clone();

    progressReport.attr('id', 'progress-report');
    regressReport.attr('id', 'regress-report');

    progressReport.appendTo('.clone-container');
    regressReport.appendTo('.clone-container');

    buildReports();

    const nodes = [
      document.getElementById('weekly-report'),
      document.getElementById('progress-report'),
      document.getElementById('regress-report')
    ];

    nodes.forEach((val, index) => {
      domtoimage.toPng(nodes[index])
      .then((dataUrl) => {
          const downloadAnchor = document.createElement('a');
          downloadAnchor.href = dataUrl;
          downloadAnchor.download = nodes[index].id;
          downloadAnchor.click();

          if (nodes[index].id === 'progress-report') {
            progressReport.remove();
          } else if (nodes[index].id === 'regress-report') {
            regressReport.remove();
          }
      })
      .catch((error) => {
          console.error('oops, something went wrong!', error);
      });
    });
  }

  const clickHandler = (event) => {
    let index = $(event.target).attr('index');
    $(event.target).attr('index', ++index);

    if (index === colorArray.length - 1) {
      $(event.target).attr('index', -1);
    }

    colorArray.forEach((val, i) => {
      if ($(event.target).hasClass(colorArray[i])) {
        $(event.target).removeClass(colorArray[i]);
      }
    });

    $(event.target).addClass(colorArray[index]);
  }

  const drawTable = () => {
    const columns = [null];
    $('table th').toArray().forEach((val, i, arr) => {
      if (i !== 0) {
        columns.push({
          'width': (100 / arr.length) + '%'
        });
      }
    });

    $('table').dataTable({
      'bSort': false,
      'bPaginate': false,
      'bFilter': false,
      'bInfo': false,
      columns
    });
  }

  const buildReports = () => {
    $('#progress-report, #regress-report').find('.indicator').addClass('opaque');

    $('#progress-report').find('.indicator.danger').removeClass('danger');
    $('#progress-report').find('.indicator.safe').removeClass('opaque');

    $('#regress-report').find('.indicator.safe').removeClass('safe');
    $('#regress-report').find('.indicator.danger').removeClass('opaque');
  }

  init();
})();
