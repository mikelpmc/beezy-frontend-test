const genres = [
    {
        id: 0,
        name: 'Development',
        deleted: false
    },
    {
        id: 1,
        name: 'Novel',
        deleted: false
    },
    {
        id: 2,
        name: 'Fantasy',
        deleted: false
    }
];

const books = [
    {
        id: 0,
        title: 'Javascript, the good parts',
        price: 39.38,
        deleted: false,
        genre: 0
    },
    {
        id: 1,
        title: 'Clean Code',
        price: 59.99,
        deleted: false,
        genre: 0
    },
    {
        id: 2,
        title: 'Don Quixote',
        price: 99.99,
        deleted: false,
        genre: 1
    },
    {
        id: 3,
        title: 'The Lord Of The Rings: The Fellowship of the Ring',
        price: 10.2,
        deleted: false,
        genre: 2
    },
    {
        id: 4,
        title: 'The Lord Of The Rings: The Two Towers',
        price: 19.5,
        deleted: false,
        genre: 2
    },
    {
        id: 5,
        title: 'The Lord Of The Rings: The Return Of The King',
        price: 9,
        deleted: false,
        genre: 2
    }
];

module.exports = { genres, books };
