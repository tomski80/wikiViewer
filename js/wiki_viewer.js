
const node = document.getElementById("query");
node.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchWiki();
    }
});

const searchWiki = () => {

    var searchString = document.getElementById("query").value;
    var httpRequest = new XMLHttpRequest();

    if(!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
    }

    httpRequest.onreadystatechange = alertContents;
    httpRequest.responseType = "json";
    httpRequest.open('GET', 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+searchString+'&origin=*&format=json');
    httpRequest.send();


    function alertContents(){
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                displaySearchResult(httpRequest.response);
            } else {
                alert('There was a problem with the request.');
            }
        }
    }

    function displaySearchResult(result){
    
        myBlock = document.getElementById("content");
        while (myBlock.firstChild) {
            myBlock.removeChild(myBlock.firstChild);
        }

        for(var i = 0; i < result[1].length; i++){
            var fieldBox = document.createElement("div");
            fieldBox.setAttribute('class','field-box');

            var fieldTitle = document.createElement("h2");
            fieldTitle.setAttribute('class','field-title');
            fieldTitle.innerHTML = result[1][i];

            var fieldText = document.createElement("p");
            fieldText.setAttribute('class','field-text');
            fieldText.innerHTML = result[2][i];

            var fieldLink = document.createElement("a");
            fieldLink.setAttribute('class','field-link');
            fieldLink.setAttribute('href',result[3][i]);
            fieldLink.setAttribute('target','_blank');
            fieldLink.innerHTML = result[3][i];

            fieldBox.appendChild(fieldTitle);
            fieldBox.appendChild(fieldText);
            fieldBox.appendChild(fieldLink);

            myBlock.appendChild(fieldBox);
        };

        document.getElementById('query').value = '';
        return true;
    }
}

