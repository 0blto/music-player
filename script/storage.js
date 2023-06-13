function imageExecutor(src) {
    const img = new Image()
    img.src = src
    return img
}

const musicStore = [
    {
        name: 'My Girl',
        author: 'ilyTOMMY',
        img: './resources/img/mygirl.jpg',
        soundtrack: './resources/music/ilytommy_mygirl.mp3'
    },
    {
        name: 'Hot (speed up)',
        author: 'Liili',
        img: './resources/img/hotliili.jpg',
        soundtrack: './resources/music/hotliili.mp3'
    },
    {
        name: 'бедный мальчик',
        author: 'nicebeatzprod',
        img: './resources/img/bedmal.jpg',
        soundtrack: './resources/music/nicebeatzbedmal.mp3'
    },
    {
        name: 'myulee',
        author: 'prombl',
        img: './resources/img/Zxc-cat.gif',
        soundtrack: './resources/music/myulee.mp3'
    }
]

function getMusic() {
    return musicStore
}