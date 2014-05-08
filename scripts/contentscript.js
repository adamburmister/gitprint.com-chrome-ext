var NEW_PAGE_CHECK_DELAY = 1000;
var GITPRINT_APPLIED_CLASS_FLAG = 'gitprintified';
var CONTAINER_SELECTOR = '#file:not(.' + GITPRINT_APPLIED_CLASS_FLAG + '), #readme:not(.' + GITPRINT_APPLIED_CLASS_FLAG + ')';

function insertButtonsIntoPage($el) {
  var headers = $el.find('> span.name');
  if(headers.length === 0) {
    headers = $el.parent().find('.meta');
  }

  for(var i=0; i<headers.length; i++) {
    var $header = $(headers[i]);

    var $lnkPrint = $(
      '<a target="_blank" href="https://gitprint.com' + window.location.pathname + '?print" ' +
          'class="minibutton gitprint tooltipped tooltipped-n" ' +
          'aria-label="Print this markdown file with GitPrint.com">' +
        '<span class="octicon octicon-file-text"></span> Print'+
      '</a>'
    );

    var $lnkDownload = $(
      '<a href="https://gitprint.com' + window.location.pathname + '?download" ' +
          'class="minibutton gitprint-download tooltipped tooltipped-n" ' +
          'aria-label="Download this markdown file as PDF from GitPrint.com">' +
        '<span class="octicon octicon-file-pdf"></span> Download'+
      '</a>'
    );

    if($el.hasClass('md')) {
      var $actions = $('<div class="actions"><div class="button-group"></div></div>');
      var $btnBar = $actions.find('.button-group');
      
      $btnBar.prepend($lnkDownload);
      $btnBar.prepend($lnkPrint);

      $header.append($actions);
    } else {
      $header.find('.button-group').prepend($lnkDownload, $lnkPrint);
    }
  }
}

function markAsGitified($el) {
  $el.addClass(GITPRINT_APPLIED_CLASS_FLAG);
}

function addGitPrintToPage() {
  $(CONTAINER_SELECTOR).each(
    function(i, el) {
      var $el = $(el);
      insertButtonsIntoPage($el);
      markAsGitified($el);
    }
  );
}

// Add to non-gitprintified markdown areas
$(document).ready(function() {
  addGitPrintToPage();
  setInterval(addGitPrintToPage, NEW_PAGE_CHECK_DELAY);
});