const hexEncode = (str = '') => {
  var hex, i;

  var result = '';
  for (i = 0; i < str.length; i++) {
    hex = str.charCodeAt(i).toString(16);
    result += ('000' + hex).slice(-4);
  }

  return result;
};

const hexDecode = (str = '') => {
  var j;
  var hexes = str.match(/.{1,4}/g) || [];
  var back = '';
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
};

const getObjectFromLocalStorage = (key) => {
  try {
    const item = window.localStorage.getItem(key);
    if (item) {
      return JSON.parse(hexDecode(item));
    } else return null;
  } catch (error) {
    return null;
  }
};

const saveObjectToLocalStorage = ({ key, object = {} }) => {
  try {
    window.localStorage.setItem(key, hexEncode(JSON.stringify(object)));
  } catch (error) {}
};

const clearLocalStorage = (key) => {
  if (!key) window.localStorage.clear();
  else if (Array.isArray(key)) {
    key.forEach((k) => {
      window.localStorage.removeItem(k);
    });
  } else if (typeof key === 'string') {
    window.localStorage.removeItem(key);
  }
};

export {
  getObjectFromLocalStorage,
  saveObjectToLocalStorage,
  clearLocalStorage
};
