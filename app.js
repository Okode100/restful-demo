const express = require('express');
const app = express();

const Joi = require('joi');

  app.use(express.json());

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'},
]

app.get('/',(req,res) =>{
    res.send('Hello World!!!!');
})

app.get('/app/course', (req,res) =>{
    res.send(courses);
})

app.get('/app/course/:id', (req,res) =>{
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send("The course with the given ID is not found");
   res.send(course);
})

app.put('/app/course/:id', (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send("The course with the given ID is not found");

   const schema = {
    name: Joi.string().min(3).required()
}
 const result = Joi.validate(req.body, schema);
 console.log(result);

if(result.error){
    res.status(400).send(result.error.details[0].message);
}
course.name = req.body.name;
res.send(course);

})

app.post('/app/course', (req,resp) => {
    const schema = {
        name: Joi.string().min(3).required()
    }
     const result = Joi.validate(req.body, schema);
     console.log(result);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }
         
    const course = {
        id: courses.length + 1,
        name: req.params.name
    }
    courses.push(course);
    resp.send(course);
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`The server is up and running on port ${port}`));