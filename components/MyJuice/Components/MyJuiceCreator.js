import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/MyJuiceCreator.module.css";
import { saveMyJuice } from "../../../reducers/myJuice";
import { addToCart } from "../../../reducers/cart";
import { Modal, Input, Flex, Radio, InputNumber, Button } from "antd";

export const MyJuiceCreator = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const cart = useSelector((state) => state.cart.value);
  // const myJuice = useSelector((state)=>state.myJuice.value)

  // state dégradé
  const [colorGradient, setColorGradient] = useState([]);

  // Recette Saved
  const [savedJuice, setSavedJuice] = useState([]);

  

  //Save recette finie
  const [myJuice, setMyJuice] = useState([]);
  const [productId, setProductId] = useState(null);
  const [productName, setProductName]= useState(null);
  const [composition, setComposition] = useState([]);
  const [volume, setVolume] = useState("250ml");
  const [category, setCategory]= useState("MYJUICE")
  const [quantity, setQuantity] = useState(6);
  const [price, setPrice] = useState(0);
  const [bottle, setBottle]= useState('verre');
  const [description, setDescription]= useState(null);

  // state ouverture/fermeture modal de commande
  const [open, setOpen] = useState(false);

  let ingredients = [
    {
      name: "Ananas",
      dosage: 10,
      color: "#F2B705",
      percentage: 0,
      price: 0.15,
    },
    { name: "Pomme",
      dosage: 10,
      color: "#F2EFBD",
      percentage: 0,
      price: 0.07 },
    {
      name: "Carotte",
      dosage: 10,
      color: "#F24405",
      percentage: 0,
      price: 0.067,
    },
    {
      name: "Gingembre",
      dosage: 2,
      color: "#F2DD72",
      percentage: 0,
      price: 0.027,
    },
    {
      name: "Curcuma",
      dosage: 0.75,
      color: "#F2790F",
      percentage: 0,
      price: 0.015,
    },
  ];
  
  // state recette Myjuice
  const [juice, setJuice] = useState(ingredients);

  useEffect(() => {
    calculatePrice(myJuice, volume);
  }, [myJuice]);

  // fonction ouverture/fermeture modal
  const showModal = () => {
    setOpen(!open);
  };

  

  // Update le fill de la bouteille en fonction du montant d'ingrédients
  const calculateFillFrompercentage = (drink) => {
    return drink.reduce((acc, val) => (acc += val.percentage), 0);
  };

  // Update le dégradé du fill en fonction des ingrédients et de leur montant
  const updateColorGradient = () => {
    const fill = calculateFillFrompercentage(juice);
    let colorStop;

    if (colorStop > 100) {
      return colorStop;
    }
    setColorGradient(
      juice
        .filter((ingredient) => ingredient.percentage !== 0)
        .map((ingredient, i, ingredients) => {
          console.log(
            ingredient.name,
            "ingredient.percentage",
            ingredient.percentage,
            "fill",
            fill
          );
          console.log("colorGradient", colorGradient);
          let colorStart = "";
          if (i === 0) {
            colorStop = Number((ingredient.percentage / fill) * 100);
            colorStart += `${ingredient.color} 0%`;
            console.log("colorStop", colorStop);
            return `${colorStart}, ${ingredient.color} ${
              Number(ingredient.percentage / fill) * 100
            }%`;
          } else {
            let colorString = ` ${ingredient.color} `;
            colorString +=
              Number((ingredient.percentage / fill) * 100) + Number(colorStop);
            colorString += "%";
            colorStop =
              Number((ingredient.percentage / fill) * 100) + Number(colorStop);

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
        percentage: 0,
      }))
    );
  };

  // Ajoute une dose d'un ingrédient dans la compo du jus
  const handleButtonPlus = (dosage, color, name) => {
    const fill = calculateFillFrompercentage(juice);
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
            percentage: ingredient.percentage + dosage,
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
    const fill = calculateFillFrompercentage(juice);
    console.log("juice", juice);

    if (fill > 0 && fill <= 100) {
      const minusJuice = juice.map((ingredient) => {
        if (ingredient.name !== name) {
          return ingredient;
        } else {
          if (ingredient.percentage > 0) {
            return {
              ...ingredient,
              percentage: ingredient.percentage - dosage,
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
        <Button
          className={styles.round_Button}
          onClick={() => handleButtonPlus(e.dosage, e.color, e.name)}
        >
          +
        </Button>
        <Button
          className={styles.round_Button}
          onClick={() => handleButtonMinus(e.dosage, e.color, e.name)}
        >
          -
        </Button>
      </div>
    );
  });

  // Ouvrir la modal de commande
  const ConfigureMyJuice = () => {
    const myJuiceOrder = juice.filter(
      (ingredient) => ingredient.percentage !== 0
    );

    myJuiceOrder.map((ingredient, i) => {
      Reflect.deleteProperty(ingredient, "color");
    });
    setMyJuice(myJuiceOrder);

    setOpen(true);
  };

  console.log("myJuice", myJuice);

// Choisir son format
  const onChangeVolume = (e) => {
    console.log(`radio checked:${e.target.value}`);
    calculatePrice(myJuice, e.target.value);
    setVolume(e.target.value);
  };
  console.log("volume", volume);

  // arrondir à 1 décimale
  const roundTo = (num, precision) => {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
  };

  //Calculer le prix d'1 pack de 6 en fonction du format
  const calculatePrice = (drink, vol) => {
    console.log("yo");
    let calculatedPrice = drink.reduce(
      (acc, val) => (acc += (val.percentage * val.price) / val.dosage),
      0
    );

    if (vol === "1l") {
      calculatedPrice *= 3.5;
    }

    
    setPrice(roundTo(calculatedPrice, 1));
  };

//Nommer sa recette
const nameMyJuice =(e)=>{
  setProductName(e)
}

const orderMyJuice = ()=>{
  // ProductName => ProductId
  const formatedName = productName.replace(" ","-");
  setProductId(formatedName);

  // Si user connecté, description = username
  if (user.isConnected){
    const descriptionText = `Created by ${user.name}`;
    setDescription(descriptionText);
  }

  const recipe = myJuice.map((ingredient)=>{
    return {name: ingredient.name, percentage : ingredient.percentage}
  })

  setComposition(recipe)

  const options = {volume: {capacity: volume, price :0}}
  
  const myJuiceOrder ={productId:productId, name:productName, category, options, bottle, description, price, composition};

  console.log("myJuiceOrder", myJuiceOrder)
  dispatch(addToCart({product: myJuiceOrder, quantity}));
  setOpen(false);

}
console.log(composition)

const rememberMyJuice =()=>{

  const favoriteJuice = {name: productName, composition: composition, price: price}
  console.log("favoriteJuice", favoriteJuice)
  dispatch(saveMyJuice({favoriteJuice}))
  
}
  

  // Formulaire de commande
  let myIngredients;
  let modalContent =
    ((myIngredients = myJuice.map((ingredient, i) => {
      return (
        <li className={styles.MyingredientsList}>
          {ingredient.name} {ingredient.percentage}%
        </li>
      );
    })),
    (
      <Modal
        open={open}
        title="Commander mon jus"
        onCancel={showModal}
        footer={[
          <div className={styles.footer}>
            <Button className={styles.Button} onClick={rememberMyJuice}>Enregistrer ce jus</Button>
            <Button className={styles.footerButton} key="submit" onClick={orderMyJuice}>
              Commander
            </Button>
            
          </div>
        ]}
      >
        <div className={styles.modalMain}>
          <div className={styles.recapContainer}>
            <Input
            className ={styles.Input}
            type= "text"
            name = "ProductName"
            value ={productName}
            placeholder = "Nommez votre recette"
            onChange={(e)=>setProductName(e.target.value)}
            ></Input>
            <h4 className={styles.subTitle}>Ingrédients</h4>

            {myIngredients}

            <h4 className={styles.subTitle}>Volume</h4>

            <Flex vertical gap="middle">
              <Radio.Group
                onChange={onChangeVolume}
                defaultValue={"250ml"}
                ButtonStyle="solid"
                ButtonCheckedBgDisabled="#444444"
                ButtonSolidCheckedColor="#F27C00"
              >
                <Radio.Button value="250">250ml</Radio.Button>
                <Radio.Button value="1l">1l</Radio.Button>
              </Radio.Group>
            </Flex>
          </div>
          <div className={styles.pricetag}></div>
          <h4 className={styles.subTitle}>Prix</h4>
          <h2 className={styles.price}>{price} €</h2>
        </div>

        
      </Modal>
    ));

  return (
    <div className={styles.mainContainer}>
      <div className={styles.ingredientList}>{IngredientList}</div>
      <div className={styles.bottleContainer}>
        <div className={styles.bottle_bar}>
          <div
            className={styles.bottle_bar_fill}
            style={{
              height: `${calculateFillFrompercentage(juice)}%`,
              backgroundImage: `linear-gradient(to top, ${colorGradient.join(
                ","
              )} )`,
            }}
          >
            {" "}
          </div>
        </div>

        <div className={styles.fill_label}>
          {calculateFillFrompercentage(juice)}%
        </div>
        <div className={styles.ButtonContainer}>
          <Button
            className={styles.Button}
            onClick={() => {
              ConfigureMyJuice();
            }}
          >
            Commander ce jus
          </Button>
          <Button className={styles.Button} onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      <div className={styles.ingredientList}>{IngredientList}</div>
      {modalContent}
    </div>
  );
};
