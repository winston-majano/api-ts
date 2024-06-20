import express, { Request, Response } from "express";

const app = express();


app.use(express.json());

const students = [
    { id: 1, name: "Carlos", age: 20, enroll: true },
    { id: 2, name: "Juan", age: 24, enroll: false },
    { id: 3, name: "Diego", age: 22, enroll: true },
    { id: 4, name: "Pedro", age: 28, enroll: false },
    { id: 5, name: "Maria", age: 29, enroll: true },
    { id: 6, name: "Antonio", age: 30, enroll: true },
];


app.get('/', (req: Request, res: Response) => {
    res.send('Node JS Api con Typescript');
});

//TODO: listando todos los etudiantes
app.get('/api/student', (req: Request, res: Response) => {
    res.send(students);
})

//lista un estudiante por su id
app.get('/api/student/:id', (req: Request, res: Response) => {
    const estudiante = students.find(c => c.id === parseInt(req.params.id));
    if (!estudiante) return res.status(404).send('Estudiante no encontrado!');
    else res.send(estudiante);

})

//crea un nuevo estudiante 
app.post('/api/student', (req: Request, res: Response) => {
    const estudiante = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll == true)
    }

    students.push(estudiante);
    res.send(estudiante);

});


//eliminar un estudiante 
app.delete('/api/student/:id', (req: Request, res: Response) => {
    const estudiante = students.find(c => c.id === parseInt(req.params.id));
    if (!estudiante) return res.status(404).send('Estudiante no encontrado!');

    const index = students.indexOf(estudiante);
    //eliminamos un indice de un arreglo
    students.splice(index, 1);
    //respondemos con el estudiante que ha borrado.
    res.send(estudiante);

})



app.listen(3000, () => {
    console.log("Server running on port: 3000");
})