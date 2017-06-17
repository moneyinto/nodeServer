var loading = (function () {
    var _show = function () {
        var html = '<div id="loading"><div class="loading-box animated waiting"></div></div>';
        $('body').append(html);
    };

    var _hide = function () {
        $('#loading .loading-box').removeClass('waiting').addClass('loading-finish');
        setTimeout(function () {
           $('#loading').remove();
        }, 500);
    }

    return {
        show: _show,
        hide: _hide
    }
})()