var dialog = (function () {
    var _show = function (content, sure, title) {
        var html = '<div id="dialog">' + 
                    '<div class="mask"></div>' + 
                    '<div class="dialog-box">' +
                    '<div class="dialog-alert">' + 
                    '<div class="dialog-header">' + (title || '提示')  + 
                    '<span class="dialog-close cursor-pointer" onclick="$(\'#dialog\').remove();">×</span></div>' + 
                    '<div class="dialog-content">' + content + '<button class="sure">确定</button></div></div></div></div>';
        $('body').append(html);
        $('.dialog-alert').fadeIn();
        $('#dialog').on('click', '.sure', function () {
            $('#dialog').remove();
            sure && sure();
        });
    };

    return {
        show: _show
    }
})()