import toast from './toast'

export default () => {
  $('.x_copy_link').on('click', function (event) {
    event.preventDefault()
    let copyFrom = document.createElement("textarea")
    // テキストエリアへ値をセット
    copyFrom.textContent = _href || location.href

    // bodyタグの要素を取得
    let bodyElm = document.getElementsByTagName("body")[0]
    // 子要素にテキストエリアを配置
    bodyElm.appendChild(copyFrom)

    // テキストエリアの値を選択
    copyFrom.select()
    // コピーコマンド発行
    let retVal = document.execCommand('copy')
    // 追加テキストエリアを削除
    bodyElm.removeChild(copyFrom)
    // 処理結果を返却
    toast('Done')
    return retVal
  })
}
