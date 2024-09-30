const url = `https://jsonplaceholder.typicode.com/posts`;

async function getData () {
    const res = await fetch(url);

    if (!res.ok) {
        console.error(`error ${res.status}`);
        return
    }

    const data = await res.json();

    data.forEach((data) => {
        renderPostList(data)
    });
    
}

const renderData = document.querySelector('.render-data');

function renderPostList (data) {
    const listItems = document.createElement('li');
    listItems.classList.add('.list-items');

    listItems.innerHTML = `
        <strong>${data.title}</strong>
        <p>${data.body}</p>
        <div class='container-buttons-updatePost' >
            <button editPost(${data.id})>Edit post</button>
            <button deletePost(${data.id})>Delete post</button>     
        </div>

        <section class="add-post-container update-post-container">
            <h3>update post</h3>
            <form>
                <input type="text" id="title" placeholder="Add title">
                <textarea type="text" placeholder="Add description" id="description" maxlength="200" minlength="20"></textarea>
                <button type="submit" onclick="postData()">Send post</button>
            </form>
        </section>
    `

    renderData.appendChild(listItems);
}


function emptyPosts(){
    return renderData.innerHTML = ''
};

const form = document.querySelector('form').addEventListener('click', (e) => {
    e.preventDefault();
});

function postData(){
    const title = document.querySelector('#title');
    const description = document.querySelector('#description');

    if (title.value.trim() === '' || description.value.trim() === '') {
        alert('enter the fields correctly')
        return 
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: title.value,
          body: description.value,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    });

    
};
