/**
 * Created by namaz on 2016/12/09.
 */
$(function () {
    $('#loader').hide()
    // Login Action
    $('#login-btn').on('click',function () {
        var email = $('#mail-input').val()
        var password = $('#password-input').val()
        console.log('login try' + email + ':' + password)
        $('#loader').show()
        $.ajax({
            url: 'https://nxtg-t.net/api/v1/signin',
            method: 'POST',
            requestType: 'json',
            data: {
                email: email,
                password: password
            }
        }).then(function () {
            // ログインをbackground側に通知.
            chrome.runtime.sendMessage({
                type: 'login'
            });
            window.location.href = 'popup.html'
        })
    })


})