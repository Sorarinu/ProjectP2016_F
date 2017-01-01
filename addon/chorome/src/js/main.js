var app = new Vue({
  el: '#app',
  data: {
    alert: {
      show: false,
      msg: '',
      color: ''
    },
    user: {
      email: '',
      password: ''
    },
    login: false,
    loading: false
  },
  created: function() {
    this.initLogin()
  },
  methods: {
    signIn: function() {
      $.ajax({
        url: 'https://nxtg-t.net/api/v1/signin',
        method: 'POST',
        requestType: 'json',
        data: this.user,
        xhrFields: {
          withCredentials: true
        }
      }).done(function (res) {
        if (res.status === 'OK') {
          app.login = true
        } else {
        }
      })
    },
    initLogin: function() {
      $.ajax({
        url: 'https://nxtg-t.net/api/v1/init',
        method: 'GET',
        requestType: 'json',
        xhrFields: {
          withCredentials: true
        }
      }).done(function (res) {
        if (!res.login) {
          return
        }
        app.user.email = res.email
        app.login = true
      })
    },
    signOut: function() {
      $.ajax({
        url: 'https://nxtg-t.net/api/v1/signout',
        method: 'GET',
        xhrFields: {
          withCredentials: true
        }
      }).done(function (res) {
        app.login = false
      })
    },
    uploadBM: function() {
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
          url: 'https://nxtg-t.net/api/v1/bookmarks/upload/addon',
          method: 'POST',
          data: JSON.stringify(res),
          xhrFields: {
            withCredentials: true
          }
        })
      })
    },
    showAlert: function(msg, type) {
      var color = 'white'
      if(type === 'success') {
        color = 'green'
      }
      if(type === 'error') {
        color = 'red'
      }
      this.alert.color = color
      this.alert.msg = msg
      this.alert.show = true

      setTimeout(function (){
        this.alert.show = false
      }, 2000)
    }
  }
})
