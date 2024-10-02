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

    console.log(data);
    


    if (isLoading) {
        listItems.innerHTML = `loading`; //Loading

    } else {
        listItems.innerHTML = `
            <strong>${data.title}</strong>
            <p>${data.body}</p>
            <div class='container-buttons-updatePost' >
                <button onClick="editPostToggle(${data.id})">Edit post</button>
                <button deletePost(${data.id})>Delete post</button>     
            </div>
    
            <section class="add-post-container update-post-container">
                <h3>update post</h3>
                <form>
                    <input type="text" id="title-update" placeholder="Add title">
                    <textarea type="text" placeholder="Add description" id="description-update" maxlength="30" minlength="5"></textarea>
                    <button onclick="updateData(event, ${data.id})">Send post</button>
                </form>
                <button onClick="closeForm()">Close form</button>
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

    if (Object.keys(data).length === 0) {
        alert('error creating post');
    }else {
        isLoading = false;
        renderPostList(data);
        console.log(data);
        
    };
};


const editPostToggle = () => { 
    const seccionUpdateForm = document.querySelector('.update-post-container');
        if (seccionUpdateForm.style.display = 'none') {
            seccionUpdateForm.style.display = 'block'
        }else {
            seccionUpdateForm.style.display = 'none'
        };
} //Visibility


function updateData(e, id){
    e.preventDefault();

    const titleUpdate = document.querySelector('#title-update');
    const descriptionUpdate = document.querySelector('#description-update');


    if (titleUpdate.value.trim() === '' || descriptionUpdate.value.trim() === '') {
        alert('added the fields');
    };

    console.log(id);
    

};
