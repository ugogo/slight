//Declare vars
var document, jQuery, $, header, bodytext, saveAs, localStorage, prompt, Blob;

$(function(){
    var doc = document;
    var win = window;
    var body = doc.body;
    var fonts = ['source-serif-pro', 'source-sans-pro'];
    var colors = ['black', 'white'];
    var defaultTexts = {
        headerContent: 'My Great Document',
        bodyContent: 'Your text here. Delete me to get started!'
    };

    var $contrastBtn = $('#contrast');
    var $fontBtn = $('#font');
    var $contentEditable = $('[contenteditable]');

    var Storage = {
        get: function(val, cb){
            var val = win.localStorage.getItem(val);
            if(cb) cb();
            return val;
        },
        set: function(key, val, cb){
            win.localStorage.setItem(key, val);
            if(cb) cb();
        }
    };

    var toggleColors = function(){
        body.style.backgroundColor = colors[0];
        body.style.color = colors[1];
        colors.reverse();
    };
    var toggleFonts = function(){
        $contentEditable.css('fontFamily', fonts[1]);
        fonts.reverse();
    };


    $contrastBtn.on('click', toggleColors);

    $fontBtn.on('click', toggleFonts);

    $contentEditable
        .each(function(i, el){
            var $this = $(el);
            var scope = $this.attr('data-scope');
            var storageContent = Storage.get(scope);
            var content = storageContent || defaultTexts[scope];

            $this.html(content);
        })
        .on('paste', function (e) {
            e.preventDefault();
            var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Your text here! Delete me to get started.');
            console.log(text);
            document.execCommand('insertText', false, text);
        })
        .on('keyup', function(){
            var $this = $(this);
            var scope = $this.attr('data-scope');
            var content = $this.html();

            Storage.set(scope, content);
        });

});


document.getElementById('download').onclick = function () {
    header = document.getElementById('header').innerHTML;
    bodytext = document.getElementById('bodytext').innerHTML;
    var blob = new Blob([header + '\n' + bodytext], {
        type: "text/plain;charset=utf-8"
    });
    saveAs(blob, "slight.txt");
};
