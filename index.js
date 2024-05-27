import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app=express();
const port=3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",async(req,res)=>{
    
try{

    const result=await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    const name=result.data.drinks[0].strDrink;
    const instruction=result.data.drinks[0].strInstructions;
    const category=result.data.drinks[0].strCategory;
    const thumb=result.data.drinks[0].strDrinkThumb;

    res.render("index.ejs",{Name:name,ins:instruction,Category:category,Thumb:thumb});
}catch(error){
    console.log(error.response.data);
    res.status(500);

}
});

app.get("/search",async(req,res)=>{
    let search=req.query.query;
    try {
        const result = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
        let drinks=[];
        if (result.data.drinks) {

            for(let i=0;i<result.data.drinks.length;i++){
                drinks.push({name:result.data.drinks[i].strDrink,thumb:result.data.drinks[i].strDrinkThumb});
            }
          
            res.render("index1.ejs", { drinks });
        } else {
            res.render("index1.ejs");
        }

    
}catch(error){
    console.log("error web");
    res.status(500);
}

});

app.get("/display",async(req,res)=>{
    const drinkName=req.query.name;
    

    
    try{
    
        const result=await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`);
        const name=result.data.drinks[0].strDrink;
        const instruction=result.data.drinks[0].strInstructions;
        const category=result.data.drinks[0].strCategory;
        const thumb=result.data.drinks[0].strDrinkThumb;
    
        res.render("index.ejs",{Name:name,ins:instruction,Category:category,Thumb:thumb});
    }catch(error){
        console.log(error.response.data);
        res.status(500);
    
    }
    });

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});


