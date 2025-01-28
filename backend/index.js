const express = require('express');
const { createTodo, updateTodo } = require('./types');  // zod file
const todo = require('./db');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// Routes : ---------> 

// to get todo
app.get('/todos', async (req, res) => {

    try {
        const todos = await todo.find({});
        res.status(200);
        res.json({ todos });
    }
    catch (err) {
        res.status(404);
        res.json({
            msg: `data fetching error : ${err}`
        });

        console.log("Error in Get function ", err);
    }

});

// to add todo
app.post('/todo', async (req, res) => {

    try {
        const createPayload = req.body;
        const parsedPayload = createTodo.safeParse(createPayload);
        if (!parsedPayload.success) {
            res.status(411);
            res.json({
                msg: "Try Again Wrong Inputs Passed ",
            });
            return;
        }

        // put in mongodb 
        await todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false
        });

        const title = createPayload.title;
        res.status(200);
        res.json({
            msg: `${title} Added successfully`
        });

    }
    catch (err) {
        res.status(404);
        res.json({
            msg: `data adding error : ${err}`
        });
        console.log("Error in Post function ", err);
    }

});

// to markdown todo
app.put('/completed', async (req, res) => {

    try {

        const createPayload = req.body;
        const parsedPayload = updateTodo.safeParse(createPayload);

        if (!parsedPayload.success) {
            res.status(411);
            res.json({
                msg: "Wrong Way To Update Inputs"
            });
            return;
        }

        // update in mongoDB

        await todo.findByIdAndUpdate({
            _id: createPayload.id
        }, {
            completed: true
        });

        const title = (await todo.findById(createPayload.id)).title;

        res.status(200);
        res.json({
            Title: `${title} Updated Successfully`
        });
        // res.send("Hi i am put"); console.log("hi i am put");
    }
    catch (err) {
        res.status(404);
        res.json({
            msg: `data updating error : ${err}`
        });
        console.log("Error in Post function ");
    }
});

// app.delete('/todo', (req, res) => {

//     try {
//         res.send("Hi i am delete");
//         console.log("hi i am delete");
//     }
//     catch (err) {
//         res.send("there is some error in delete");
//         console.log("there is some error in delete ");
//     }
// });

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server Connected and Live on Port : ${PORT}`);
});


