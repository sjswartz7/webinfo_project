let form = document.getElementById("search-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    ProcessForm()
});

function showResult(index, data){
    const template = document.getElementById("resultsTemplate");
    const resultsTemp = template.content.cloneNode(true);

    //Update container elements
    const bTitle = resultsTemp.querySelector(".book-title");
    bTitle.textContent = data.docs[index].title;
    const bSubj = resultsTemp.querySelector(".subject");
    bSubj.textContent = 'Subject: '+ data.docs[index].subject;
    const bLocation = resultsTemp.querySelector(".location");
    bLocation.textContent = 'Location: '+ data.docs[index].place;
    const bAuthor = resultsTemp.querySelector(".author");
    bAuthor.textContent = 'Author: '+data.docs[index].author;
    const bPubl = resultsTemp.querySelector(".publish-year");
    bPubl.textContent = 'First Publish Year: '+data.docs[index].first_publish_year;

    const booksOutput = document.getElementById('books-output');
    booksOutput.appendChild(resultsTemp);
}


async function ProcessForm() {
    document.getElementById('books-output').innerHTML = "";

    //show loading element
    document.getElementById("loading-container").style.display = "block";

    const data = await searchBooks();

    //hide loading element
    document.getElementById("loading-container").style.display = "none";

    for (var i = 0; i < 3; i++) {
        showResult(i, data)
    }
}

function isInputProvided(elementId) {
    const element = document.getElementById(elementId);
    return element !== null && element !== undefined && element.value!== "";
}

function encodePublishYear(){
    let begin= document.getElementById("start_publ_year").value;
    let end= document.getElementById("end_publ_year").value;
    return `[${begin}+TO+${end}]`;
}

async function searchBooks() { //TODO: show loading element while waiting
    // Build the base URL
    let url = 'http://openlibrary.org/search.json?q=';
    // Add parameters if provided
    url += 'Agatha Christie';
    if (isInputProvided('title')) {
        const t = document.getElementById("title").value;
        url += '&title=' + encodeURIComponent(t);
    }
    if (isInputProvided('location')) {
        const t = document.getElementById("location").value;
        url += '&place=' + encodeURIComponent(t);
    }
    const y = encodePublishYear();
    url += '&first_publish_year:' + y; //TODO: looking for a book with publish year set to a year the book  wasnt published, still gives th ebook as result ...


    // Fetch the data
    const response = await fetch(url)
        .then(a => a.json());
    return response;
}
