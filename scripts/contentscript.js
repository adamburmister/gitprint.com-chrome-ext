var readmeSelector = '#readme > span.name';
var fileSelector = '.file > .meta > .actions > .button-group';

var isFile = (document.querySelectorAll(fileSelector).length > 0);
var isReadme = (document.querySelectorAll(readmeSelector).length > 0);

var headers = [];
var headerSelector = '';

var gitprintIframe = null;

if(isFile) {
  headerSelector = fileSelector;
} else if(isReadme) {
  headerSelector = readmeSelector;
} else {
  return; // Nothing to do on this page
}

insertButtonsIntoHeader();
insertIframeIntoPage();

function insertButtonsIntoHeader() {
  var headers = document.querySelectorAll(headerSelector);
  for(var i=0; i<headers.length; i++) {
    var header = headers[i];

    var lnkPrint = document.createElement('a');
    lnkPrint.className = 'minibutton gitprint tooltipped tooltipped-n';
    lnkPrint.href = 'https://gitprint.com' + window.location.pathname + '?print';
    lnkPrint.target = '_blank';
    lnkPrint.setAttribute('aria-label', 'Print this markdown file with GitPrint.com');
    lnkPrint.innerHTML = '<span class="octicon octicon-file-text"></span> Print';

    lnkPrint.addEventListener('click', printFromIframe);

    var lnkDownload = document.createElement('a');
    lnkDownload.className = 'minibutton gitprint-download tooltipped tooltipped-n';
    lnkDownload.href = 'https://gitprint.com' + window.location.pathname + '?download';
    lnkDownload.setAttribute('aria-label', 'Download this markdown file as PDF from GitPrint.com');
    lnkDownload.innerHTML = '<span class="octicon octicon-file-pdf"></span> Download';

    if(isFile) {
      header.insertBefore(lnkPrint, header.childNodes[1]);
      header.insertBefore(lnkDownload, header.childNodes[2]);
    }
    if(isReadme) {
      var actions = document.createElement('div');
      actions.className = 'actions';
      actions.innerHTML = '<div class="button-group"></div>';
      
      var btnGroup = actions.querySelector('.button-group')
      
      btnGroup.appendChild(lnkPrint);
      btnGroup.appendChild(lnkDownload);

      header.insertBefore(actions, header.childNodes[0]);
    }
    
  }
}

function insertIframeIntoPage() {
  gitprintIframe = document.createElement('iframe');
  gitprintIframe.style.display = 'none';
  document.body.appendChild(gitprintIframe);
}

function printFromIframe(e) {
  e.preventDefault();

  var url = e.target.href;
  gitprintIframe.src = url;

  return false;
}