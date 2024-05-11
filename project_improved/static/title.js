var bookList = Array(
    'Murder on the Orient Express','And Then There Were None','The Mysterious Affair at Styles',
    'Death on the Nile','The ABC Murders','The Murder of Roger Ackroyd', 'The Murder at the Vicarage',
    'Evil Under the Sun','The Body in the Library','Crooked House'
    );
var response ;

function getBooks(t){
    return fetch('https://openlibrary.org/search.json?q='+t)
        .then(a => a.json());
}

async function createCard(title) {
    const template = document.getElementById("cardTemplate");
    const cardClone = template.content.cloneNode(true); // clone the template with content

    // Wait for the response from getBooks before setting the image
    response = await getBooks(title);

    // Update card content
    const cardTitle = cardClone.querySelector(".card-title");
    cardTitle.textContent = title;

    // Assuming the first book [0] has the ISBN
    if (response.docs[0] && response.docs[0].isbn) {
        const cardImg = cardClone.querySelector(".card-img-top");
        cardImg.src = "http://covers.openlibrary.org/b/isbn/"+response.docs[0].isbn[0]+"-L.jpg"; //-L for really big & high resolution, -S for small
    } else {
        // Handle cases where there's no ISBN or no books found
        console.error("No ISBN found for book:", title);
    }

    return cardClone;
}


// also async function cause if not the forEach loop might be trying
// to append the card before it's fully created (asynchronous operation).
async function loopThroughBooks() {

    document.getElementById("loader").style.display = "block";

    for (const title of bookList) {
        const bookCard = await createCard(title);
        const cardContainer = document.getElementById('card-container');
        cardContainer.appendChild(bookCard);
    }

    document.getElementById("loader").style.display = "none";

    //ISSUE: a click on a card is only detected when all books are loaded
    const previewContainer = document.querySelector('.cards-preview');
    let previewBox = previewContainer.querySelectorAll('.preview');

    document.querySelectorAll('.card-container .card').forEach(card => {
        card.onclick = () =>{
            previewContainer.style.display = 'flex';
            let name = card.querySelector('.card-title').textContent;
            previewBox.forEach(preview =>{
                let target = preview.getAttribute('data-target');
                if(name == target){
                    populatePreview(preview,name, previewContainer);
                }
            });
        };
    });
}
async function populatePreview(p,name,cont){
    response = await getBooks(name);
    const prev = document.getElementById("cardPreviewTemplate").content.cloneNode(true); // clone the template with content
    const previewTitle = prev.querySelector(".preview-title");
    previewTitle.textContent = name;
    const previewAuthor = prev.querySelector(".preview-subtitle");
    previewAuthor.textContent = "Agatha Christie";
    const previewInfo = prev.querySelector(".preview-info");
    previewInfo.textContent = response.docs[0].subject.slice(0, 3).join(', ');
    const previewYear = prev.querySelector(".preview-year");
    previewYear.textContent = response.docs[0].first_publish_year;
    const previewRating = prev.querySelector(".preview-rating");
    previewRating.textContent = response.docs[0].ratings_average.toFixed(2);
    const previewLoc = prev.querySelector(".preview-location");
    previewLoc.textContent = response.docs[0].place;
    const previewISBN = prev.querySelector(".preview-isbn");
    previewISBN.textContent = response.docs[0].isbn[0];
    p.classList.add('active');


    p.innerHTML = ""
    p.appendChild(prev);

    const closeButton = p.querySelector('.fa-times');
    closeButton.addEventListener('click', () => {
        p.classList.remove('active');
        cont.style.display = 'none';
    });

}
loopThroughBooks();





