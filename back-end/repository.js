const queryDb = require('./PgConnector');

async function getAllPost() {
    const query = "SELECT * FROM full_post_info order by upvotes desc;";
    let posts = await queryDb(query);
    
    return posts
}

async function getPost(postId) {
    const  query = "SELECT * FROM full_post_info where id=$1;";
    const queryParameters = [postId];
    let post = await queryDb(query, queryParameters);

    return post
}

async function createPost(authorId, title, body) {
    const query = `INSERT INTO public.posts(authorid, title, body)VALUES ($1, $2, $3) returning id, authorid, title, body;`;
    const queryParameters = [authorId, title, body];
    let newPost = await queryDb(query, queryParameters);

    return newPost;
}

async function deletePost(postId) {
    const query = "DELETE FROM posts where id=$1 returning id";
    const queryParameters =  [postId];
    let post = await queryDb(query, queryParameters);

    return post
}

async function getUsers() {
    const query = "SELECT * FROM public.users;";
    let users = await queryDb(query);
    
    return users
}

async function getUser(userId) {
    const query = "SELECT * FROM public.users where id=$1;";
    const queryParameters = [userId];
    let user = await queryDb(query, queryParameters);

    return user
}

async function createUser(username, hashedPassword) {
    const query = "INSERT INTO public.users(name, password) VALUES ($1, $2) returning id;";
    const queryParameters = [username, hashedPassword];
    let userId = await queryDb(query, queryParameters);

    return userId;
}

async function createComment(postId, authorId, body) {
    const query = `INSERT INTO public.comments(postid, authorid, body) VALUES ($1, $2, $3) returning id;`;
    const queryParameters = [postId, authorId, body];
    let newComment = await queryDb(query, queryParameters);

    return newComment;
}

async function getComments(postId) {
    const query = `SELECT * FROM public.comments WHERE postid = $1;`;
    const queryParameters = [postId];
    let comments = await queryDb(query, queryParameters);

    return comments;
}

async function getUpvotes(postId) {
    const query = "SELECT upvotes FROM public.posts WHERE id = $1;";
    const queryParameters = [postId];
    let upvotes = await queryDb(query, queryParameters);

    return upvotes;
}

async function changeUpvotes(postId, change) {
    const query = "UPDATE public.posts SET upvotes = upvotes + $2 WHERE id = $1 returning upvotes;";
    const queryParameters = [postId, change];
    let newUpvotes = await queryDb(query, queryParameters);

    return newUpvotes;
}

async function checkLogin(username, hashedPassword) {
    const query = "SELECT id FROM public.users where username = $1 AND password = $2";
    const queryParameters = [username, hashedPassword];
    let login = await queryDb(query, queryParameters);
    
    return login
}

module.exports = {getAllPost, getPost, createPost, deletePost, getUsers, getUser, createUser, getComments, createComment, getUpvotes, changeUpvotes, checkLogin}
