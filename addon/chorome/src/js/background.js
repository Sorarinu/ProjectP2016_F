(function () {
    // app state
    const state = {}
    // state init
    state.loginNow = false

    // message receiver
    chrome.runtime.onMessage.addListener(function (message) {
        if (message.type === 'loginCheck') {

        }

        if (message.type === 'login') {

        }
    })

    // サーバー側に仮ユーザとしてセッション登録する.
    fetch('https://nxtg-t.net/api/v1/init', {
        mode: 'cors'
    })

}).call(this)
