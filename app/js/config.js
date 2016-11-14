var config = {
  tv3: {
    videos: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/'
  },
  tve: {
    videos: 'http://origin-proyectos-lab-externos.rtve.es/webdocs/xavier-cugat/videos/'
  },
  local: {
    videos: window.location.href.replace(window.location.hash, "")+"videos/"
  },
  doc: {
    link: 0, // 0 = off, 1 = on
    url: "http://www.ccma.cat/tv3/documentals/xavier-cugat/"
  }
}
