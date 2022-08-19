// Helper functions
export const isScriptLoaded = async (url) => {
  var scripts = document.getElementsByTagName('script');
  for (var i = scripts.length; i--;) {
    if (scripts[i].src == url) return true;
  }
  return false;
}