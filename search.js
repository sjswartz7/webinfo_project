let form = document.getElementById("search-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    ProcessForm()
});


async function ProcessForm() {
    document.getElementById('books-output').innerHTML = "";
    const data = await searchBooks();
    for (var i = 0; i < 3; i++) {
        document.getElementById("books-output").innerHTML += "<h2>" + data.docs[i].title + "</h2>"; //TODO: if nothing found, get error message
    }
}
//subject:travel place:istanbul
//publish_year:[* TO 1800] will find anything published before and up to the year 1800.

function isInputProvided(elementId) {
    const element = document.getElementById(elementId);
    return element !== null && element !== undefined;
}

async function searchBooks() {
    // Build the base URL
    let url = 'http://openlibrary.org/search.json?q=';
    // Add parameters if provided
    url += 'author=Agatha Christie';
    if (isInputProvided('title')) {
        const t = document.getElementById("title").value;
        url += ' title:' + encodeURIComponent(t); // TODO: Encode spaces to '+'
    }

    // Fetch the data
    const response = await fetch(url)
        .then(a => a.json());
    return response;
}
