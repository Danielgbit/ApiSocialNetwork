const url = `https://jsonplaceholder.typicode.com/posts`;

let isLoading = true;
let posts = [];
//States ---

async function getData() {
    const res = await fetch(url);

    if (!res.ok) {
        console.error(`error ${res.status}`);
        return
    }

    isLoading = false;

    const data = await res.json();
    const limitedUsers = data.slice(0, 5);
    posts.push(...limitedUsers);

    posts.forEach((data) => {
        renderPostList(data)
    });
 
 };

const renderData = document.querySelector('.render-data');

function renderPostList(data) {
    const listItems = document.createElement('li');
    listItems.classList.add('.list-items');

    if (isLoading) {
        listItems.innerHTML = `loading`; //Loading

    } else {
        listItems.innerHTML = `
            <strong>${data.title}</strong>
            <p>${data.body}</p>
            <div class='container-buttons-updatePost' >
                <button onClick="editPostToggle(${data.id})">Edit post</button>
                <button onClick="deletePost(${data.id})">Delete post</button>     
            </div>
    
            <section id="editForm-${data.id}" class="add-post-container update-post-container">
                <div class='titleAndcloseForm-wrapper'>
                    <h3>update post</h3>
                    <button onClick="closeForm(${data.id})">
                        <i class='bx bx-chevron-down'></i>
                    </button>
                </div>            
                <form>
                    <input type="text" id="title-update-${data.id}" value='${data.title}' placeholder="Add title">
                    <textarea type="text" placeholder="Add description" id="description-update-${data.id}">${data.body}</textarea>
                    <button onclick="updateData(event, ${data.id})">Send post</button>
                </form>
            </section>
        `
    }


    renderData.appendChild(listItems);
}


function emptyPosts() {
    renderData.innerHTML = ''
    posts = [];
    return
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

    const res = await fetch(`${url}`, {
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

    const data = await res.json();

    if (Object.keys(data).length === 0) {
        alert('error creating post');
    }else {
        isLoading = false;
        renderPostList(data);
        console.log(data);
        
    };
};


const editPostToggle = (id) => { 
    const seccionUpdateForm = document.querySelector(`#editForm-${id}`);
        if (seccionUpdateForm.style.display = 'none') {
            seccionUpdateForm.style.display = 'block'
        };
} //Visibility

const closeForm = (id) => {
    const seccionUpdateForm = document.querySelector(`#editForm-${id}`);
    if (seccionUpdateForm.style.display = 'block') {
        seccionUpdateForm.style.display = 'none'
    };
};


async function updateData(e, id){
    e.preventDefault();
    
    const titleUpdate = document.querySelector(`#title-update-${id}`);
    const descriptionUpdate = document.querySelector(`#description-update-${id}`);


    if (titleUpdate.value.trim() === '' || descriptionUpdate.value.trim() === '') {
        alert('added the fields');
    };

    const res = await fetch(`${url}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          title: titleUpdate.value,
          body: descriptionUpdate.value,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    });

    const data = await res.json();

    const findIndex = posts.findIndex((item) => item.id === id);

    if (findIndex == -1) {
        alert('error finding the index');
    };
    
    posts[findIndex] = data;
    renderData.innerHTML = '';

    posts.forEach((item) => {
        renderPostList(item);
    });

};

function deletePost(id){
    const findIndex = posts.findIndex((item) => item.id === id );

    if (findIndex == -1) {
        alert('index not found')
        return;
    }

    posts.splice(findIndex, 1);
    renderData.innerHTML = '';
    posts.forEach((item) => {
        renderPostList(item);
    });
};