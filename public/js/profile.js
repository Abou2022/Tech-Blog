console.log("hello");
document.querySelector("#newBlog").addEventListener("submit", (e) => {
  e.preventDefault();
  const blogObj = {
    title: document.querySelector("#title").value,
    body: document.querySelector("#body").value,
  };
  fetch("/api/blogs", {
    method: "POST",
    body: JSON.stringify(blogObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.reload();
    } else {
      alert("trumpet sound");
    }
  });
});
//check second time

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
console.log("++++++++++++")
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    }); 

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.justify-content-center')
  .addEventListener('click', delButtonHandler);