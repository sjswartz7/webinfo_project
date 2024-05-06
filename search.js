function ProcessForm() {
    var title = document.getElementById("title").value;
    var author = document.getElementById("author").value;

    searchBooks(title);
    /*
    if (typeof title !== "string") {
        // Get a reference to the element where you want to print the error message
        var errorMessageElement = document.getElementById("error-message");

        // Check if the element exists before accessing it
        if (errorMessageElement) {
            errorMessageElement.textContent = "Please enter a valid string value.";
        } else {
            console.error("Error: No element with id 'error-message' found.");
        }
    }
    */
}


const outputElement = document.getElementById('books-output');
function searchBooks(query) {
  const apiUrl = `https://openlibrary.org/search.json?q=${query}`;
  fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Data not found');
            } else if (response.status === 500) {
                throw new Error('Server error');
            } else {
                throw new Error('Network response was not ok');
            }
        }
        return response.json();
    })
    .then(data => {
        const title = data.title;
        const subject = data.subject; //response fields: https://github.com/internetarchive/openlibrary/blob/b4afa14b0981ae1785c26c71908af99b879fa975/openlibrary/plugins/worksearch/schemes/works.py#L38-L91
        outputElement.innerHTML = `<p>Found book:  ${title} about ${subject}</p>`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
