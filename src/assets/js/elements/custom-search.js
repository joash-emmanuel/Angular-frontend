// Search 1

$('#input-search').on('keyup', function() {
  var rex = new RegExp($(this).val(), 'i');
    $('.items').hide();
    $('.items').filter(function() {
        return rex.test($(this).text());
    }).show();
});
