/**
 * Created by namaz on 2016/12/09.
 */
$(function() {
  $('#upload-btn').on('click', function () {
    var convertUnit = function (bookmark) {
      var folder = false
      if (bookmark.children) {
        folder = true
      }

      var format = function (val) {
        if (val < 10) {
          return '0' + val
        }
        return val
      }

      var date = new Date(bookmark.dateAdded)
      var dateStr = date.getFullYear() + '/'
        + format(date.getMonth()) + '/'
        + format(date.getDate()) + ' '
        + format(date.getHours()) + ':' + format(date.getMinutes()) + ':' + format(date.getSeconds())

      return {
        reg_date: dateStr,
        id: bookmark.id,
        index: bookmark.index,
        folder: folder,
        parentId: bookmark.parentId,
        title: bookmark.title,
        url: bookmark.url,
        detail: bookmark.detail
      }
    }
    var res = []
    var convertBM = function (bookmark) {
      if (bookmark.children) {
        bookmark.children.forEach(function (bm) {
          convertBM(bm)
        })
      }
      res.push(convertUnit(bookmark))
    }

    chrome.bookmarks.getTree(function (bookmark) {
      bookmark.forEach(function (bm) {
        convertBM(bm)
      })

      $.ajax({
        url: 'https://nxtg-t.net/api/v1/signin',
        method: 'POST',
        requestType: 'json',
        data: {
          email: 'hoge@hoge.com', password: 'hogehoge'
        },
        xhrFields: {
          withCredentials: true
        }
      });
      $.ajax({
        url: 'https://nxtg-t.net/api/v1/bookmarks/upload/addon',
        method: 'POST',
        data: JSON.stringify(res),
        xhrFields: {
          withCredentials: true
        }
      }).then(function (res) {
        console.log(JSON.stringify(res))
      })
    })
  })
})