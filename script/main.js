const listOfSongs = new Array() 
getMusic().forEach(element => listOfSongs.push(new Soundtrack(element.name, element.author, element.img, element.soundtrack)))
const player = new Player(listOfSongs)