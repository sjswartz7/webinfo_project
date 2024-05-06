//var getagathabio = fetch('https://openlibrary.org/authors/OL27695A.json').then().then().catch();
//getagathabio

{
    //fetch("https://openlibrary.org/authors/OL27695A.json")
    // .then((res) => {
    //   if (!res.ok) {
    //      throw new Error
    //    (`HTTP error! Status: ${res.status}`);
    // }
    //return res.json();
    //})
    //.then((data) =>
    //  console.log(data))
    //const bio = document.getElementById("biography");
//})
    //      .catch((error) =>
    //        console.error("Unable to fetch data:", error));
//}


//let bio = fetchJSONData("https://openlibrary.org/authors/OL27695A.json");
//let bio=document.getElementById("biography")
//document.getElementById('biography')

//document.getElementById("biography").innerHTML = bio;
    //$document.ready(function () {
        fetch('https://openlibrary.org/authors/OL27695A.json')
            .then(response => response.json())
            .then(data => {
                const dataDisplay = document.getElementById("biography");
                dataDisplay.textContent = data.bio.value;
            })
            .catch(error => console.error("Error fetching JSON data:", error));}
    //});