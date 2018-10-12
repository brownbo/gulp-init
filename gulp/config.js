var dir_root = './assets/'
var dir_dest = dir_root + 'build'; // 出力先ディレクトリ
var dir_src = dir_root + 'dev';  // ソースディレクトリ
var dir_styleguide = dir_root + 'styleguide';  // ソースディレクトリ
var serverResource = '../ts-web/src/main/resources/static/resources'

module.exports = {
  // 出力先の指定
  dest: dir_dest,

  // jsのビルド設定
  js: {
    entry: dir_src + '/javascript/',
    dest: dir_dest + '/javascript/',
    resource: serverResource + '/javascript/'
  },
  // scssのビルド設定
  stylesheet: {
    entry: dir_src + '/stylesheet/',
    dest: dir_dest + '/stylesheet/',
    resource: serverResource + '/stylesheet/'
  },
  // mocのビルド設定
  moc: {
    entry: dir_src + '/html/',
    dest: dir_dest
  },
  // imageのビルド設定
  image: {
    entry: dir_src + '/image/',
    dest: dir_dest + '/image/',
    resource: serverResource + '/image/'
  },
  font: {
    entry: dir_src + '/font/',
    dest: dir_dest + '/font/'
  },
  vendor: {
    entry: dir_src + '/vendor/',
    dest: dir_dest + '/vendor/'
  }
}