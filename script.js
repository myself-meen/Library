const myLibrary=[];
function Book(id,title,author,pages,read){
    this.id=id;
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

function addBookToLibrary(id,title,author,pages,read){
    const book=new Book(id,title,author,pages,read);
    myLibrary.push(book);
    console.log(myLibrary);
}
function displayBooks(){
    const container=document.getElementById('book-container');
    container.innerHTML='';
    myLibrary.forEach((book)=>{
        const bookDiv=document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.innerHTML=`
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.read ? 'Yes' : 'No'}</p>
        <button class="delete-button" data-id="${book.id}">Delete</button>
        `;
        container.appendChild(bookDiv);
    }
    );
    const deleteButtons=document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button)=>{
        button.addEventListener('click',(e)=>{
            const id=e.target.getAttribute('data-id');
            deleteBook(id);
            displayBooks();
        });
    });
}
function deleteBook(id){
    const index=myLibrary.findIndex((book)=>book.id===id);
    if(index!==-1){
        myLibrary.splice(index,1);
    }
}

document.getElementById('book-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const id=Date.now().toString();
    const title=document.getElementById('title').value;
    const author=document.getElementById('author').value;
    const pages=document.getElementById('pages').value;
    const read=document.getElementById('read').checked;
    addBookToLibrary(id,title,author,pages,read);
    displayBooks();
    e.target.reset();
});

displayBooks();


