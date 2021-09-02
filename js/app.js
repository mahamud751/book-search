document.getElementById('itemFound').style.display = 'none';
//  ----------------------------------Input----------------------------------------------------
const searchBook = async () => {
    const searchInput = document.getElementById('searchInput')
    toggle('block')
    const searchInputText = searchInput.value;
    searchInput.value = ''
    document.getElementById('itemFound').style.display = 'none';

    //  -----------------------------------Error----------------------------------------------------
    if (searchInputText === '') {
        toggle('none')
        const result = document.getElementById("result");
        result.innerText = "Field must not be empty !!";
    }
    else {
        const url = (`https://openlibrary.org/search.json?q=${searchInputText}`)
        const res = await fetch(url)
        const data = await res.json()
        searchBookDisplay(data)
    }
}

//  -----------------------------------Error----------------------------------------------------
const result = searchT => {
    const result = document.getElementById("result").style.display = searchT
    result.innerText = "Field must not be empty !!";
}
// -----------------------------------spinner-----------------------------------------------------
const toggle = searchT => {
    document.getElementById('spinner').style.display = searchT
    bookId.innerHTML = ''
}

//--------------------------------book total length and some error--------------------------------------->
const searchBookDisplay = (data) => {
    let bookCount = document.getElementById("bookCount");
    bookCount.style.display = "block";
    bookCount.innerText = `Total books found : ${data.numFound}`;

    //  -----------------------------------Error----------------------------------------------------
    if (data.numFound === 0) {
        bookCount.innerHTML = `
        <i class="fas fa-times-circle"></i>
        <span class="text-danger mt-5 fw-bold">Something went wrong! Please give a valid book name</span> 
        <i class="fas fa-times-circle"></i> <br>
        <img class="mt-5 img-fluid" src="img/sad.png" alt="" style="width: 300px;">
        `;
        result('none')
    }

    const bookId = document.getElementById('bookId')
    toggle('none')
    result('none')
    bookId.innerHTML = ''
    document.getElementById('itemFound').style.display = 'block'

    let totalCount = data.docs.slice(0, 30);

    //-----------------------------------Book Details loop----------------------------------------------------->

    totalCount.forEach(book => {
        // console.log(book)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `

        <div class="card">

             <img width="200px" height="600px" src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">

                <div class="card-body" >
                    <h5 class="card-title text-dark"><span class="fw-bold">Title : </span> ${book.title ? book.title : 'sorry! not Found'}</h5>

                    <h5 class="card-title text-dark"><span class="fw-bold">Author : </span> ${book.author_name ? book.author_name : 'sorry! not Found'}</h5>

                    <h5 class="card-title text-dark"><span class="fw-bold">Publisher : </span> ${book.publisher.slice(0, 1) ? book.publisher.slice(0, 1) : 'sorry! not Found'}</h5>

                    <h5 class="card-title text-dark"><span class="fw-bold">First published in: </span> ${book.first_publish_year ? book.first_publish_year : 'sorry! not Found'}</h5>
                </div>
        </div>

    `
        bookId.appendChild(div)

    })
}