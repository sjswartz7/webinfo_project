const cardContainer = document.getElementById("card-container");

var bookList = Array(
    'Murder on the Orient Express','And Then There Were None','The Mysterious Affair at Styles',
    'Death on the Nile','The ABC Murders','The Murder of Roger Ackroyd', 'The Murder at the Vicarage',
    'Evil Under the Sun','The Body in the Library','Crooked House');

function getBooks(t){
    return fetch('https://openlibrary.org/search.json?q='+t)
        .then(a => a.json());
}

async function createCard(title) {
    const template = document.getElementById("cardTemplate");
    const cardClone = template.content.cloneNode(true); // clone the template with content

    // Wait for the response from getBooks before setting the image
    const response = await getBooks(title);

    // Update card content
    const cardTitle = cardClone.querySelector(".card-title");
    cardTitle.textContent = title;

    // Assuming the first book [0] has the ISBN
    if (response.docs[0] && response.docs[0].isbn) {
        const cardImg = cardClone.querySelector(".card-img-top");
        cardImg.src = "http://covers.openlibrary.org/b/isbn/"+response.docs[0].isbn[0]+"-S.jpg"; //-L for really big & high resolution, -S for small
    } else {
        // Handle cases where there's no ISBN or no books found
        console.error("No ISBN found for book:", title);
    }

    return cardClone;
}


// also async function cause if not the forEach loop might be trying
// to append the card before it's fully created (asynchronous operation).
async function loopThroughBooks() {
    bookList.forEach(async (title) => {
        const bookCard = await createCard(title);
        cardContainer.appendChild(bookCard);
    });
}
loopThroughBooks();

/*
bookList.forEach(title => {
    const bookCard = createCard(title);
    cardContainer.appendChild(bookCard);
    console.log(bookCard) //for debugging purposes
});
*/




