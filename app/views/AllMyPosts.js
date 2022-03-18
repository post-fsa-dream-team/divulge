import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("AllMyPosts");
    }

    async getHtml() {

        // let getPosts = async () => {
        //   const options = {
        //      method: 'GET',
        //      headers: {
        //          'Content-Type': 'application/json'
        //      }
        //  };
        //  try {
        //      const response = await fetch("/posts")
        //      const json = await response.json();
        //      // console.log(json)
        //      return json
        //  } catch (err) {
        //      console.log('Error getting documents', err)
        //  }
        // }

        // let myPosts = [{ title: "post1", imageUrl: "https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-shaking-puppy.jpg?itok=4_quJCAy" }, { title: "post2", imageUrl: "https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-shaking-puppy.jpg?itok=4_quJCAy", content: "This is fake content" }, { title: "post3", imageUrl: "https://www.petmd.com/sites/default/files/styles/article_image/public/petmd-shaking-puppy.jpg?itok=4_quJCAy", content: "This is fake content" }]
        return `

        `;
    }
}