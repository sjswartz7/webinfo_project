let currentPage = 1;
const resultCountElem = document.getElementById("results-count");
const resultTotalElem = document.getElementById("results-total");
const loadMoreButton = document.getElementById("load-more");
var data;

let form = document.getElementById("search-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    ProcessForm()
});

loadMoreButton.addEventListener("click", () => {
    addResults(currentPage + 1, data);
});


function createResult(index, data){
    const template = document.getElementById("resultsTemplate");
    const resultsTemp = template.content.cloneNode(true);

    //Update container elements
    const bTitle = resultsTemp.querySelector(".book-title");
    bTitle.textContent = data.docs[index].title;
    const bAuthor = resultsTemp.querySelector(".author");
    bAuthor.textContent = 'Author: '+data.docs[index].author_name;
    const bSubj = resultsTemp.querySelector(".subject");
    bSubj.textContent = 'Subject: '+ data.docs[index].subject;
    const bLocation = resultsTemp.querySelector(".location");
    bLocation.textContent = 'Location: '+ data.docs[index].place;
    const bPubl = resultsTemp.querySelector(".publish-year");
    bPubl.textContent = 'First Publish Year: '+data.docs[index].first_publish_year;
    const bButton = resultsTemp.getElementById("interested");
    bButton.href = "https://www.google.com"; //TODO: make this link make sense
    const bImg = resultsTemp.querySelector(".book-image");
    bImg.src = "http://covers.openlibrary.org/b/isbn/"+data.docs[0].isbn[0]+"-M.jpg";

    const booksOutput = document.getElementById('books-output');
    booksOutput.appendChild(resultsTemp);
}


async function ProcessForm() {
    document.getElementById('books-output').innerHTML = "";

    //show loading element
    document.getElementById("loader").style.display = "block";

    data = await searchBooks();

    //hide loading element
    document.getElementById("loader").style.display = "none";
    addResults(currentPage,data);
    document.getElementById("result-actions").style.display = "block";

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

async function searchBooks() {
    // Build the base URL
    let url = 'http://openlibrary.org/search.json?';
    // Add parameters if provided
    url += 'author=Agatha Christie';
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

const addResults = (pageIndex,data) => {


    const resultLimit = data.docs.length;
    resultTotalElem.innerHTML = resultLimit;
    const resultIncrease = 9;
    const pageCount = Math.ceil(resultLimit / resultIncrease);

    currentPage = pageIndex;
    handleButtonStatus(pageCount);
    const startRange = (pageIndex - 1) * resultIncrease;
    const endRange = pageIndex * resultIncrease;
        pageIndex * resultIncrease > resultLimit ? resultLimit : pageIndex * resultIncrease;
    resultCountElem.innerHTML = endRange;
    for (let i = startRange + 1; i <= endRange; i++) {
        createResult(i, data);
    }
};

const handleButtonStatus = (pageCount) => {
    if (pageCount === currentPage) {
        loadMoreButton.classList.add("disabled");
        loadMoreButton.setAttribute("disabled", true);
    }
};






