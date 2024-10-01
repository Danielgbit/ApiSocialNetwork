const url = `https://jsonplaceholder.typicode.com/posts`;

let isLoading = true;

const posts = [];

async function getData(newPost) {
    const res = await fetch(url);

    if (!res.ok) {
        console.error(`error ${res.status}`);
        return
    }

    isLoading = false;

    const data = await res.json();

    const limitedUsers = data.slice(0, 5);
    posts.push(limitedUsers);

    if (newPost && Object.keys(newPost).length > 0) {
        limitedUsers.push(newPost);
        posts.push(newPost);
    }

    limitedUsers.forEach((data) => {
        renderPostList(data)
    });

};


const renderData = document.querySelector('.render-data');

function renderPostList(data) {
    const listItems = document.createElement('li');
    listItems.classList.add('.list-items');


    if (isLoading) {
        listItems.innerHTML = `loading`;

    } else {
        listItems.innerHTML = `
            <strong>${data.title}</strong>
            <p>${data.body}</p>
            <div class='container-buttons-updatePost' >
                <button onClick="editPost()">Edit post</button>
                <button deletePost(${data.id})>Delete post</button>     
            </div>
    
            <section class="add-post-container update-post-container">
                <h3>update post</h3>
                <form>
                    <input type="text" id="titleUpdate" placeholder="Add title">
                    <textarea type="text" placeholder="Add descriptionUpdate" id="descriptionUpdate" maxlength="30" minlength="5"></textarea>
                    <button onclick="putData(event, ${data.id})">Send post</button>
                </form>
                <button onClick="closeForm()">Close form</button>
            </section>
        `
    }


    renderData.appendChild(listItems);
}


function emptyPosts() {
    return renderData.innerHTML = ''
};

const form = document.querySelector('form').addEventListener('click', (e) => {
    e.preventDefault();
});

async function postData() {
    const title = document.querySelector('#title');
    const description = document.querySelector('#description');

    if (title.value.trim() === '' || description.value.trim() === '') {
        alert('enter the fields correctly')
        return
    }

    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            body: description.value,
            userId: Date.now(),
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    const data = await res.json();

    await getData(data);
};


function closeForm() {
    const putFormPost = document.querySelector('.update-post-container');
    putFormPost.style.display = 'none';
}


function editPost(id) {
    const putFormPost = document.querySelector('.update-post-container');
    putFormPost.style.display = 'block';
};

async function putData(e, id) {
    e.preventDefault();

    const title = document.querySelector('#titleUpdate');
    const description = document.querySelector('#descriptionUpdate');


    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: title.value,
            body: description.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    const data = await res.json();
/* 
    const indexPost = posts && posts[0].findIndex((item) =>  item.id === data.id );

    if (indexPost != -1) {
        posts[indexPost] = data;
    }else {
        alert('error al encontrar indice');
    }; */

}