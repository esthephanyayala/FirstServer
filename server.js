
let express = require ("express");
let morgan = require("morgan");
let bodyParser = require('body-parser');

let app = express();
let jsonParser = bodyParser.json();

app.use(express.static('public'));//Say to my server were gonna user public directory

app.use(morgan("dev"));
 
let students = [{
    name : "Mario",
    id : 52436
},
{
    name : "Maria",
    id : 4321
},
{
    name : "Valentin",
    id : 1328
}
];

app.get("/api/students",(req, res, next) => {//1.- url 2.- any middle word that we want to use (execute something before lo de adentro de la funcion)

    return res.status(200).json(students); //status of success 200

    //res.statusMessage="Something went wrong. Please try again later.";
    //res.status(400).json({
     //   message:"Something went wrong. Please try again later.",
       // status:400
    });

    app.post("/api/postStudent", jsonParser, (req, res) =>{

        //url? id = 123 -> req.query.id
        //url/:id -> req.params.id
        //url/123 -> req.body

        let name = req.body.name;
        let id = req.body.id;

        if (name == null || id  == null ) {
            res.statusMessage = "Missing field in body!";
            return res.status(406).json({
                message : "Missing field in body!",
                status : 406
            });
        }
        for (let i = 0; i < students.length ; i++){
            if (id == students[i].id ){
                res.statusMessage = "Repeated identifier!";
                return res.status(406).json({
                    message : "Repeated identifier!",
                    status : 409
                });
            }
        }
        
        //console.log(req.body);
            students.push(req.body); //agrega lo que le pjgas en el post 
            res.statusMessage = "Succes!";
            return res.status(200).json({
                message: "success",
                status : 201
            });
        
        
    });

    app.get("/api/getStudentById/:id2", (req,res,next) =>{
        let id2 = req.params.id2;
        console.log(id2);
        
        for (let i = 0; i< students.length ; i++){
            if ( id2 == students[i].id){
                console.log(students[i]);
                
                return res.status(200).json({
                    message: students[i]

                });
            }
        }

    });

    



    //JS -> response.statusText = ""
//$.ajax({
// err.statusText;
// )}:
app.listen("8080", () => {
    console.log("App is running on port 8080")
    
});








