/* 
    !(i) Take the selected Text ✔️
    !(ii) show button / hide botton  ✔️ 
    !(iii) click button and send data to extension
*/
import { variables } from './constants';
const { url, key, host } = variables;
console.log('working');

var selected = '';

// !creating button and popcard
const button = document.createElement('button');
button.id = 'search-btn';
button.innerHTML = 'Search using ChatGPT';
button.style.display = 'none';
button.className += 'glow-on-hover';
document.body.appendChild(button);

const popCard = document.createElement('div');
popCard.id = 'pop-card';
popCard.className += 'card ';

popCard.innerHTML =
    '<div id="loader"></div> <div  id="myDiv" class="animate-bottom"></div>';

console.log(popCard);
document.body.appendChild(popCard);

// !adding event listener for click on button
button.addEventListener('click', (e) => {
    e.stopPropagation();
    button.style.display = 'none';
    popCard.classList.remove('slide-out');
    popCard.classList.add('slide-in');

    // fetch('https://baconipsum.com/api/?type=meat-and-filler')
    //     .then((response) => response.json())
    //     .then((json) => {
    //         document.getElementById('loader').style.display = 'none';
    //         const myDiv = document.getElementById('myDiv');

    //         myDiv.style.display = 'flex';
    //         myDiv.innerHTML = json;
    //     });

    const res = getResponse(selected)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            const result = data?.choices[0]?.message?.content;
            document.getElementById('loader').style.display = 'none';
            const myDiv = document.getElementById('myDiv');

            myDiv.style.display = 'flex';
            myDiv.innerHTML = result;
        });
});

// !add a click event listener to the document
document.addEventListener('mouseup', function (e) {
    // get the selection object
    const selection = window.getSelection();
    // get the selected text as a string
    const selectedText = selection.toString();
    document.getElementById('search-btn').style.display = 'none';
    // ADD A NEW ELEMENT AT THE POSITION
    if (selectedText.length > 5) {
        selected = selectedText;
        document.getElementById('search-btn').style.display = 'inline';
    }

    if (document.getElementsByClassName('slide-in').length !== 0) {
        document.getElementById('pop-card').classList.remove('slide-in');
        document.getElementById('pop-card').classList.add('slide-out');
        document.getElementById('loader').style.display = 'block';
        document.getElementById('myDiv').style.display = 'none';
    }
});

//! Getting the output from the AI api
const getResponse = async (ourText) => {
    console.log('API request is about to send', ourText);
    // return ourText;

    const pass = {
        messages: [
            {
                role: 'assistant',
                content: `${ourText}`,
            },
        ],
    };

    const data = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': host,
            'access-control-allow-credentials': 'true',
            'access-control-allow-origin': '*',
        },
        body: JSON.stringify(pass),
    });
    console.log('we got the data');
    console.log(data);

    return data;
};
