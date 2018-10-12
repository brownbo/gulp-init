export default () => {
  const pathName = location.pathname.split('/')
  if(Number(pathName[pathName.length-1]) > 200) {
    $('.x_'+Number(pathName[pathName.length-1])).show()
  }
}