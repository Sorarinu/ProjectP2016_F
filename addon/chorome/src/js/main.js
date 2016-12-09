/**
 * Created by namaz on 2016/12/09.
 */
$(function(){
    $('#upload-btn').on('click', function() {
        chrome.bookmarks.getTree(function (bookmark) {
            console.log(JSON.stringify(bookmark))
        })
    })
})