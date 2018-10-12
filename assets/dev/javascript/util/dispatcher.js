let path_func = []

export default function(path, callback) {
  path_func = path_func || [];
  if (callback) return path_func.push([path, callback]);
  for(var i = 0, l = path_func.length; i < l; ++i) {
    var func = path_func[i];
    var match = path.match(func[0]);
    match && func[1](match);
  }
};