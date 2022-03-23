// const PostsView = (posts) => {
//   return `<nav class="home-nav">
//   <a id="all-posts-link" data-link>All Posts</a>
//   <div id="categories">By Category</div>
//   <a value="news" class="home-nav-link" data-link>News</a>
//   <a value="technology" class="home-nav-link" data-link>Technology</a>
//   <a value="politics" class="home-nav-link" data-link>Politics</a>
//   <a value="fashion" class="home-nav-link" data-link>Fashion</a>
//   <a value="sports" class="home-nav-link" data-link>Sports</a>
// </nav>

// <div id="home-content">
//   <div class="container">
//   <div>
//     <div class="text-typing">
//       <p>Welcome to Divulge</p>
//     </div>
//     <hr id="title-line"></hr>
//     </div>
//   </div>
//     <div id="cards-container">
//         ${posts.map((item) =>
//         `<a class="article-link" href="/posts/${item.id}"><div class="post-card">
//           <div class="article-title">${item.title}</div>
//           <div class="author">by ${item.user_name}</div>
//           <div class="card-container">
//             <img class="post-image" src="${item.image_url}"/>
//               <div>
//                 <div>${item.content.slice(0, 200).split(" ").join(" ") + "..."}</div>
//               </div>
//             </div>
//           </div></a>`
//         ).join('')}
//     </div>
//   <div>
//   `
// }

// export default PostsView


const PostsView = (posts) => {
  return `
        ${posts.map((item) =>
        `<a class="article-link" href="/posts/${item.id}"><div class="post-card">
          <div class="article-title">${item.title}</div>
          <div class="author">by ${item.user_name}</div>
          <div class="card-container">
            <img class="post-image" src="${item.image_url}"/>
              <div>
                <div>${item.content.slice(0, 200).split(" ").join(" ") + "..."}</div>
              </div>
            </div>
          </div></a>`
        ).join('')}
  `
}

export default PostsView
