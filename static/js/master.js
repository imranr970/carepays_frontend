
$(document).ready(function() {
  $('.dropdown--cta').on('click', function() {
    toggle($(this));
  });

  $("#profileEmergencyQuestionsForm").hide();

  $("#profileEmergencyQuestions").on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    $("#profileEmergencyQuestionsForm").toggle('fast');
  });

});

function toggle(div) {
  div.children('.dropdown--menu').toggleClass('dropdown--menu--visible');
}
