import {isDev, baseUrl} from './consist/GLOBAL_CONFIG'
import {isIphoneX} from './consist/UA'

// api
import ApiNews from './api/news'
import ApiPass from './api/pass'
import ApiRoute from './api/route'
import ApiHowTo from './api/howTo'
import ApiFollowNews from './api/followNews'
import ApiFollowShop from './api/followShop'
import ApiFollowComment from './api/followComment'
import ApiFollowShowArt from './api/followShowArt'
import ApiRank from './api/rank'

// page
import Top from './page/top'
import Register from './page/register'
import Login from './page/login'
import List from './page/list'
import Detail from './page/detail'
import Search from './page/search'
import MyCenter from './page/myCenter'
import MyInfoUpdate from './page/myInfoUpdate'
import MyPwUpdate from './page/myPwUpdate'
import MyList from './page/myList'
import Notice from './page/notice'
import Rank from './page/rank'

// partial
import Lang from './partial/langSelect'
import SearchItem from './partial/searchSelect'
import ListSelect from './partial/listSelect'
import Header from './partial/header'
import Menu from './partial/spMenu'
import callDownload from './partial/callDownload'
import newDetail from './partial/newDetail'
import passDetail from './partial/passDetail'
import error from './partial/error'
import ellipsis from './partial/ellipsis'

//util
import dispatcher from './util/dispatcher'
import {initModal} from './util/modal'

let Route = {
  "all": '.',
  "newsList": isDev ? 'news/list.html' : `^${baseUrl}news/toList`,
  "newsDetail": isDev ? 'news/detail.html' : `${baseUrl}news`,
  "passList": `^${baseUrl}pass/toList`,
  "passDetail": isDev ? 'pass/detail.html' : `${baseUrl}pass`,
  "routeList": `^${baseUrl}route/toList`,
  "routeDetail": `${baseUrl}route`,
  "howToList": `^${baseUrl}howTo/toList`,
  "howToDetail": `${baseUrl}howTo`,
  "search": isDev ? 'search/search.html' : `^${baseUrl}toSearch`,
  "top": isDev ? 'top/top.html' : `^${baseUrl}$`,
  "login": isDev ? 'login/login.html' : `^${baseUrl}login`,
  "register": isDev ? 'login/register.html' : `^${baseUrl}login/register`,
  "myCenter": isDev ? 'my_page/my_center.html' : `^${baseUrl}user/home$`,
  "myInfoUpdate": isDev ? 'my_page/my_info_update.html' : `^${baseUrl}user/home/info`,
  "myPwUpdate": isDev ? 'my_page/my_pw_update.html' : `^${baseUrl}user/home/changePwd`,
  "forgetPw": isDev ? 'login/forget_pw.html' : `^${baseUrl}login/pwd/reset`,
  "forgetEmail": isDev ? 'login/forget_email.html' : `^${baseUrl}login/forget`,
  "favArtList": `^${baseUrl}user/follow/news`,
  "favStoreList": isDev ? 'my_page/my_list.html' : `^${baseUrl}user/follow/shop`,
  "commentArtList": `^${baseUrl}user/comment`,
  "viewArtList": `^${baseUrl}user/visithistory`,
  "notice": isDev ? 'notice/notice.html' : `^${baseUrl}notice/toList`,
  "myEmailUp": isDev ? 'my_page/my_email_up.html' : `^${baseUrl}user/follow/shop`,
  "rank": isDev ? 'rank/rank.html' : `^${baseUrl}rank`
}

$(function () {
  FastClick.attach(document.body)
  dispatcher(Route.all, () => {
    if (isIphoneX) {
      $('.footerl_navi > .wrapper').css({height: 65, paddingBottom: 5})
    }

    // header系
    Header.bind()

    // lang select
    Lang.init()
    Lang.bind()

    // search系
    SearchItem.init()
    SearchItem.bind()

    // listSelect系
    ListSelect.init()
    ListSelect.bind()

    // menu系
    Menu.bind()

    // call download
    callDownload()

    // init modal
    initModal()

    // text ellipsis
    ellipsis()
  })

  dispatcher(Route.newsDetail, () => {
    newDetail() // swiper init
    Detail.init()
    Detail.bind()
  })

  dispatcher(Route.newsList, () => {
    List.init('news', ApiNews)
    List.bind()
  })

  dispatcher(Route.passDetail, () => {
    passDetail() // swiper init
    Detail.init()
    Detail.bind()
  })

  dispatcher(Route.passList, () => {
    List.init('pass', ApiPass)
    List.bind()
  })

  dispatcher(Route.routeDetail, () => {
    newDetail()
    Detail.init()
    Detail.bind()
  })

  dispatcher(Route.routeList, () => {
    List.init('route', ApiRoute)
    List.bind()
  })

  dispatcher(Route.howToDetail, () => {
    newDetail()
    Detail.init()
    Detail.bind()
  })

  dispatcher(Route.howToList, () => {
    List.init('howTo', ApiHowTo)
    List.bind()
  })

  dispatcher(Route.search, () => {
    Search.init()
    Search.bind()
  })

  dispatcher(Route.top, () => {
    Top.init()
    Top.bind()
  })

  dispatcher(Route.register, () => {
    Register.init()
    Register.bind()
  })

  dispatcher(Route.login, () => {
    Login.init()
    Login.bind()
  })

  dispatcher(Route.myCenter, () => {
    MyCenter.init()
    MyCenter.bind()
  })

  dispatcher(Route.myInfoUpdate, () => {
    MyInfoUpdate.init()
    MyInfoUpdate.bind()
  })

  dispatcher(Route.myPwUpdate, () => {
    MyPwUpdate.init()
    MyPwUpdate.bind()
  })
  dispatcher(Route.forgetPw, () => {
    MyPwUpdate.init()
    MyPwUpdate.bind()
  })
  dispatcher(Route.forgetEmail, () => {
    MyPwUpdate.init()
    MyPwUpdate.bind()
  })
  dispatcher(Route.myEmailUp, () => {
    MyPwUpdate.init()
    MyPwUpdate.bind()
  })
  dispatcher(Route.favArtList, () => {
    MyList.init('favArt', ApiFollowNews)
    MyList.bind('favArt', ApiFollowNews)
  })
  dispatcher(Route.favStoreList, () => {
    MyList.init('favStore', ApiFollowShop)
    MyList.bind('favStore', ApiFollowShop)
  })
  dispatcher(Route.commentArtList, () => {
    MyList.init('commentArt', ApiFollowComment)
    MyList.bind('commentArt', ApiFollowComment)
  })
  dispatcher(Route.viewArtList, () => {
    MyList.init('viewArt', ApiFollowShowArt)
    MyList.bind('viewArt', ApiFollowShowArt)
  })
  dispatcher(Route.notice, () => {
    Notice.init()
    Notice.bind()
  })

  dispatcher(Route.rank, () => {
    Rank.init('rank', ApiRank)
    Rank.bind()
  })
  dispatcher(location.pathname)
})
