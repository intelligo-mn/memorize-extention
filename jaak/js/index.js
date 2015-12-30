var $el = $('.writer'),
    txt = $el.text(),
    txtLen = txt.length,
    timeOut,
    char = 0;

$el.text('|');

(function typeIt() {   
    var humanize = Math.round(Math.random() * (200 - 30)) + 30;
    timeOut = setTimeout(function() {
        char++;
        var type = txt.substring(0, char);
        $el.text(type + '|');
        typeIt();

        if (char == txtLen) {
            $el.text($el.text().slice(0, -1)); // remove the '|'
            clearTimeout(timeOut);
        }

    }, humanize);
}());