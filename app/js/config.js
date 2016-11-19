var config = {
  tv3: {
    videos: 'http://mp4-high-dwn.media.tv3.cat/g/tvcatalunya/'
  },
  tve: {
    videos: 'http://lab.rtve.es/webdocs/xavier-cugat/videos/'
  },
  local: {
    videos: window.location.href.replace(window.location.hash, '')+'videos/'
  },
  doc: {
    link: 1, // 0 = off, 1 = on
    url: "http://www.rtve.es/alacarta/videos/imprescindibles/imprescindibles-xavier-cugat-sexo-maracas-chihuahuas/3801124/"
  }
}

if (window.location.hostname.includes("github") || window.location.hostname.includes("0.0.0.0")){ config.local.videos = config.tve.videos; };


var video_playlist = [
  {desc: 'Xavier Cugat responde a las preguntas de una joven Julia Otero en el programa “La luna” (1989).',
  video: 'http://lab.rtve.es/webdocs/xavier-cugat/videos/01-01.mp4',
  thumb: '1466417568692.jpg',
  duration: 748},
  {desc: 'Cugui continúa repasando su carrera.',
  video: 'http://lab.rtve.es/webdocs/xavier-cugat/videos/01-02.mp4',
  thumb: '1466417568692.jpg',
  duration: 1158},
  {desc: 'Última parte de la entrevista de Julia Otero a Xavier Cugat, acompañado de su chihuahua Dalila.',
  video: 'http://lab.rtve.es/webdocs/xavier-cugat/videos/01-03.mp4',
  thumb: '1466417568692.jpg',
  duration: 534},
  {desc: '¿Es Xavier Cugat también un mago?',
  video: 'http://lab.rtve.es/webdocs/xavier-cugat/videos/02-01.mp4',
  thumb: '1466417752028.jpg',
  duration: 152},
  {desc: 'Xavier comenta las numerosas condecoraciones que ha recibido a lo largo de su vida. ¿Es verdad que fue nombrado jefe de una tribu india?',
  video: 'http://lab.rtve.es/webdocs/xavier-cugat/videos/02-02.mp4',
  thumb: '1466417752028.jpg',
  duration: 147},
  {desc: 'Cugat narra su relación con Frank Sinatra.',
  video: 'http://lab.rtve.es/webdocs/xavier-cugat/videos/02-03.mp4',
  thumb: '1466417752028.jpg',
  duration: 147},
  {desc: 'Cugui desvela sus inicios con el gran Caruso.',
  video: 'http://lab.rtve.es/webdocs/xavier-cugat/videos/02-04.mp4',
  thumb: '1466417752028.jpg',
  duration: 177},
  {desc: '¿Todas las mujeres con las que se casó Cugat eran menores de 18 años? Habría que comprobar las biografías de algunas…',
  video: 'http://lab.rtve.es/webdocs/xavier-cugat/videos/02-05.mp4',
  thumb: '1466417752028.jpg',
  duration: 126},
  {desc: 'Sus comienzos',
  video: 'http://lab.rtve.es/webdocs/xavier-cugat/videos/03-01.mp4',
  thumb: '1466589118771.jpg',
  duration: 601},
  {desc: 'Sus mujeres y EEUU',
  video: 'http://lab.rtve.es/webdocs/xavier-cugat/videos/03-02.mp4',
  thumb: '1466589118771.jpg',
  duration: 977},
  {desc: 'Sus curiosidades más personales',
  video: 'http://lab.rtve.es/webdocs/xavier-cugat/videos/03-03.mp4',
  thumb: '1466589118771.jpg',
  duration: 1050},
  {desc: 'Cugat repasa sus recuerdos desde su nacimiento y vida en Cuba',
  video: 'http://lab.rtve.es/webdocs/xavier-cugat/videos/04-01.mp4',
  thumb: '1467728998149.jpg',
  duration: 489},
  {desc: 'Su llegada a EE UU y (casi) todas las mujeres de su vida',
  video: 'http://lab.rtve.es/webdocs/xavier-cugat/videos/04-02.mp4',
  thumb: '1467728998149.jpg',
  duration: 1361},
  {desc: 'Cugat, el hombre de negocios',
  video: 'http://lab.rtve.es/webdocs/xavier-cugat/videos/04-03.mp4',
  thumb: '1467728998149.jpg',
  duration: 850},
  {desc: 'El debut de Nina en el Un, dos, tres, presentada y apadrinada por Cugat.',
  video: 'http://mvod.lvlt.rtve.es/resources/TE_NGVA/mp4/7/5/1411576524757.mp4',
  thumb: '1411576524757.jpg',
  duration: 141}
];
