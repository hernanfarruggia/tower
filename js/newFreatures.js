var newModalNode = document.getElementById('new-modal');
var newModalOpen = false;
var newModalTemplates = {
  'transdatos-pay-link-modal': 'components/home/modals/pay-link.html',
  'tower-pay-link-modal': 'components/tower/modals/pay-link.html',
}

function avoidCloseNewModal (event) {
  event.preventDefault();
  event.stopPropagation();
}

function openNewModal (e, content) {
  console.log(e, content);
  e.preventDefault();
  $.get(content, function (data) {
    newModalOpen = true;
    var newTemplate = getModalTemplate(data);
    newModalNode.innerHTML = newTemplate;
  });
}

function closeNewModal () {
  newModalOpen = false;
  newModalNode.innerHTML = '';
}

function openPaymentLink () {
  window.open('https://sandboxpp.asjservicios.com.ar:8110/SearchDeuda/796741', '_blank');
}

function getModalTemplate (newTemplate) {
  var leftPosition = (document.documentElement.offsetWidth / 2) - 250;
  return '<div class="modal-container" style="display: ' + (newModalOpen ? 'block' : 'none') + '; height: ' + document.documentElement.offsetHeight + 'px;" onclick="closeNewModal()">' +
  '<div class="modal" style="border-radius: 8px; display: ' + (newModalOpen ? 'block' : 'none') + '; width: 500px; left: ' + leftPosition + 'px;" onclick="avoidCloseNewModal(event)">' +
      '<button class="modal--close-btn" type="button" onclick="closeNewModal()">X</button>' +
      '<div>' + newTemplate + '</div>' +
  '</div>' +
'</div>';
}