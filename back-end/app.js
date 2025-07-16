const express = require('express');
const cors = require('cors');
const {getAllPost, getPost, createPost, deletePost, getUsers, getUser, createUser, getComments, createComment, getUpvotes, changeUpvotes, checkLogin} = require('./repository');

const app = express();
app.use(express.json(), cors())

/*app.get(), app.post(), app.put(), app.delete() */
// req.query displays the url query aka ?id=4&sorby=id:desc

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/api/posts', async (req, res) => {
    res.send(await getAllPost())
})

app.get('/api/posts/:id', async (req, res) => {
    let post = await getPost(req.params.id);

    if (post){
        res.send(post);
    } else {    
        res.status(404).send('Post not found');
    }
})

app.post('/api/posts', async (req, res) => {
    let newPost = await createPost(parseInt(req.body.authorid, 10), req.body.title, req.body.body)
    
    if (newPost){
        res.send(newPost);
    } else {    
        res.status(404).send('Failed to create post');
    }
})

app.delete('/api/posts/:id', async (req, res) => {
    let post = await deletePost(req.params.id)

    if (post){
        res.send(post);
    } else {    
        res.status(404).send('Failed to delete post');
    }
})

app.get('/api/users', async (req, res) => {
    res.send(await getUsers())
})

app.get('/api/users/:id', async (req, res) => {
    let user = await getUser(req.params.id);

    if (user){
        res.send(user);
    } else {    
        res.status(404).send('Failed to find user');
    }
})

app.post('/api/user', async (req, res) => {
    try {
        let newUser = await createUser(req.body.username, req.body.password);

        if (newUser){
            res.send(newUser);
        } else {    
            res.status(400).send('Failed to create user');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})

app.get('/api/comments/:postId', async (req, res) => { 
    res.send(await getComments(parseInt(req.params.postId)));
})

app.post('/api/comments', async (req, res) => {
    console.table(req.body)
    try {
        let newComment = await createComment(parseInt(req.body.postId), parseInt(req.body.authorId), req.body.body)
        res.send(newComment);   
    } catch (error) {
        res.status(400).send(error.message);
    }
})

app.get('/api/upvotes/:id', async (req,res) => {
    let upvotes = await getUpvotes(parseInt(req.params.id))
    res.send(upvotes)
})

app.put('/api/upvotes/:id', async (req, res) => {
    let upvotes = await changeUpvotes(parseInt(req.params.id), parseInt(req.body.incrementBy))
    res.send(upvotes)
})

app.post('/api/user/login', async (req, res) => {
    let userId = await checkLogin(req.body.username, req.body.password);
    
    if (userId && userId.length > 0){
        res.send(userId);
    } else {
        res.status(400).send({message: "username and password don't match"});
    }
})
 
app.listen(3000, () => console.log('listening on port 3000'));