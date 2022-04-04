import AbstractView from "./AbstractView.js";
export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("MySinglePost");
        this.userId = params.userId;
        this.postId = params.postId;
    }
    async getMyPost(userId, postId) {
        try {
            const myPosts = await fetch(`http://localhost:3000/api/users/${userId}/posts/${postId}`)
            const data = await myPosts.json()
            return data
        } catch (error) {
            console.log('CANNOT SEE MY POST :(', error);
        }
    }
    async getHtml() {
        const postData = await this.getMyPost(this.userId, this.postId);
        // console.log(postData);
        return `
        ${postData.map((post) => {
           const {category, content, created_at, email,
            first_name,id, image_url, last_login, last_name, location, title, user_name} = post
            return `
            <h1>${title}</h1>
            <p>${created_at}</p>
            <p>by ${first_name} ${last_name}</p>
            <p>${location}</p>
            <p>${content}</p>
            <p>${category}</p>
            `
        })}
        `;
    }
}
