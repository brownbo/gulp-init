import url from '../util/url'

//baseUrl
export const baseUrl = $('meta[name="baseUrl"]').attr('content') || '/nippon/'

// dev mode
let params = url.getQuery(window.location.href)
export let isDev = params.isDev === 'true'

// SP width
export let isSP = document.body.clientWidth <= 782