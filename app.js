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


function renderPostList (data) {
    const renderData = document.querySelector('.render-data');
    const listItems = document.createElement('li');
    listItems.classList.add('.list-items');

    listItems.innerHTML = `
        <strong>${data.title}</strong>
        <p>${data.body}</p>
        <button editPost(${data.id})>Edit post</button>
        <button deletePost(${data.id})>Delete post</button>

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

