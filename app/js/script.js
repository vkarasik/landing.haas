$(function () {
    $('a[href^="#"]').click(function () {
        var $linkHref = $(this).attr("href");
        var $ancorName = $('a[name="' + $linkHref.slice(1) + '"]');
        var ancorPosition = $ancorName.offset();
        $('body, html').animate({
            scrollTop: ancorPosition.top
        }, 500);
    })

    $('.openform').on('click', function(){
        $('.overlay').fadeIn()
    });

    $('.close').on('click', function(){
        $('.overlay').fadeOut()
    });

    $('.form').submit(function(e){
        e.preventDefault();// Отмена перезагрузки страницы при submit
        var $form = $(this);
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            success: function(response){
                $('form .callback').css({background: '#4caf50'}).text('Заявка принята!');
                setTimeout(function(){$('.overlay').fadeOut()}, 300);
            },
            error: function(response){
                alert('Произошла ошибка! Пожалуйста повторите отправку!');  
            }
        });
    });
});


// Я зрабіў усё што змог, хто зможа, хай зробіць лепш!
