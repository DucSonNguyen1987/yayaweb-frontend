import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/MyJuiceCreator.module.css";
import { saveMyJuice } from "../../../reducers/myJuice";
import { addToCart } from "../../../reducers/cart";
import { Modal, Input } from "antd";

export const MyJuiceCreator = () => {

const dispatch = useDispatch ();
const user = useSelector((state)=> state.user.value);
const cart = useSelector((state)=>state.cart.value);
// const myJuice = useSelector((state)=>state.myJuice.value)

  // state dégradé
  const [colorGradient, setColorGradient] = useState([]);

  // Recette Saved
  const [savedJuice, setSavedJuice]= useState([]);


let ingredients = [
    { name: "Ananas", dosage: 10, color: "#F2B705", amount: 0 },
    { name: "Pomme", dosage: 10, color: "#F2EFBD", amount: 0 },
    { name: "Carotte", dosage: 10, color: "#F24405", amount: 0 },
    { name: "Gingembre", dosage: 2, color: "#F2DD72", amount: 0 },
    { name: "Curcuma", dosage: 1.5, color: "#F2790F", amount: 0 },
  ];
  // state recette Myjuice
  const [juice, setJuice] = useState(ingredients);

  // fonction ouverture/fermeture modal
  const showModal = ()=>{
    setOpen(!open)
  };

  // state ouverture/fermeture modal de commande
    const [open, setOpen]= useState(false);

  // Update le fill de la bouteille en fonction du montant d'ingrédients 
  const calculateFillFromAmount = (drink) => {
    return drink.reduce((acc, val) => (acc += val.amount), 0);
  };

// Update le dégradé du fill en fonction des ingrédients et de leur montant
  const updateColorGradient = () => {
    const fill = calculateFillFromAmount(juice);
    let colorStop;

    if (colorStop > 100) {
      return colorStop;
    }
    setColorGradient(
      juice
        .filter((ingredient) => ingredient.amount !== 0)
        .map((ingredient, i, ingredients) => {
          console.log(
            ingredient.name,
            "ingredient.amount",
            ingredient.amount,
            "fill",
            fill
          );
          console.log("colorGradient", colorGradient);
          let colorStart = "";
          if (i === 0) {
            colorStop = Number((ingredient.amount / fill) * 100);
            colorStart += `${ingredient.color} 0%`;
            console.log("colorStop", colorStop);
            return `${colorStart}, ${ingredient.color} ${
              Number(ingredient.amount / fill) * 100
            }%`;
          } else {
            let colorString = ` ${ingredient.color} `;
            colorString +=
              Number((ingredient.amount / fill) * 100) + Number(colorStop);
            colorString += "%";
            colorStop =
              Number((ingredient.amount / fill) * 100) + Number(colorStop);

            return colorString;
          }
        })
    );
  };

  // Reset à 0 les montants d'ingrédients
  const handleReset = () => {
    setJuice(
      juice.map(({ name, dosage, color }) => ({
        name,
        dosage,
        color,
        amount: 0,
      }))
    );
  };

  // Ajoute une dose d'un ingrédient dans la compo du jus
  const handleButtonPlus = (dosage, color, name) => {
    const fill = calculateFillFromAmount(juice);
    if (dosage > 100 - fill) {
      return false;
    }

    if (fill < 100) {
      const newJuice = juice.map((ingredient) => {
        if (ingredient.name !== name) {
          return ingredient;
        } else {
          return {
            ...ingredient,
            amount: ingredient.amount + dosage,
          };
        }
      });
      setJuice(newJuice);

      updateColorGradient(juice);

      console.log("colorGradient", colorGradient);
    }
  };

  console.log("juice", juice);

  // Retire une dose d'un ingrédient dans la compo du jus
  const handleButtonMinus = (dosage, color, name) => {
    const fill = calculateFillFromAmount(juice);
    console.log("juice", juice);

    if (fill > 0 && fill <= 100) {
      const minusJuice = juice.map((ingredient) => {
        if (ingredient.name !== name) {
          return ingredient;
        } else {
          if (ingredient.amount > 0) {
            return {
              ...ingredient,
              amount: ingredient.amount - dosage,
            };
          }
        }
      });

      setJuice(minusJuice);

      updateColorGradient(juice);
    }
  };


  // Affiche la liste des ingrédients
  const IngredientList = ingredients.map((e) => {
    return (
      <div className={styles.ingredient}>
        <p className={styles.ingredientName}>{e.name}</p>
        <button
          className={styles.round_button}
          onClick={() => handleButtonPlus(e.dosage, e.color, e.name)}
        >
          +
        </button>
        <button
          className={styles.round_button}
          onClick={() => handleButtonMinus(e.dosage, e.color, e.name)}
        >
          -
        </button>
      </div>
    );
  });


  //Save recette finie 
 const [myJuice, setMyJuice] = useState([]);
 const [recipeName, setRecipeName]= useState("");

const SaveMyJuice = ()=>{
  
  setMyJuice (
    juice
    .filter((ingredient) => ingredient.amount !== 0)
  );
  setOpen(true);
}
 



console.log ("Myjuice", myJuice)


let myIngredients;
// Formulaire de commande

let modalContent = (

myIngredients = myJuice.map((ingredient,i)=> {
  return (<li>{ingredient.name} {ingredient.amount}%</li>)
}),


  <Modal
  open={open}
  title ="Commander mon jus"
  onCancel={showModal}
  footer ={[
    <div className={styles.footer}>
          <button className={styles.footerButton} key="Retour" onClick={showModal} >
            {" "}
            Retour
          </button>
          <button className={styles.footerButton} key="submit" >
           Commander
          </button>
      </div>
  ]}>

  <div className ={styles.recapContainer}>
    <Input
    className={styles.input}
    type ="text"
    placeholder= "Donnez un Nom à votre recette"
    id= "RecipeName"
    onChange={(e)=> setRecipeName(e.target.value)}
    value={recipeName}
    ></Input>
    <h3>ingrédients</h3>

    {myIngredients}

      




  </div>





  </Modal>
)






  return (
    <div className={styles.mainContainer}>
      <div className={styles.ingredientList}>{IngredientList}</div>
      <div className={styles.bottleContainer}>
        <div className={styles.bottle_bar}>
          <div
            className={styles.bottle_bar_fill}
            style={{
              height: `${calculateFillFromAmount(juice)}%`,
              backgroundImage: `linear-gradient(to top, ${colorGradient.join(
                ","
              )} )`,
            }}
          >
            {" "}
          </div>
        </div>

        <div className={styles.fill_label}>
          {calculateFillFromAmount(juice)}%
        </div>
        <div className ={styles.buttonContainer}>
        <button className={styles.button} onClick={()=>{SaveMyJuice()}} >Commander ce jus</button>
        <button className={styles.button} onClick={handleReset}>
          Reset
        </button>

        </div>
        
      </div>

      <div className={styles.ingredientList}>{IngredientList}</div>
      {modalContent}

    </div>
   
  );
};
