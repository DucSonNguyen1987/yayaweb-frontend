import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/MyJuiceCreator.module.css";
import { saveMyJuice } from "../../../reducers/myJuice";
import { addToCart } from "../../../reducers/cart";
import { Modal, Input, Flex, Radio, Button, Popover } from "antd";

export const MyJuiceCreator = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const cart = useSelector((state) => state.cart.value);
  // const myJuice = useSelector((state)=>state.myJuice.value)
  const volumes = [
    {capacity: "250ml", priceMultiplier: 1},
    {capacity: "1l", priceMultiplier: 3.5}
  ];

  // state dégradé
  const [colorGradient, setColorGradient] = useState([]);

  // Recette Saved
  const [savedJuice, setSavedJuice] = useState([]);

  //Save recette finie
  const [myJuice, setMyJuice] = useState([]);
  const [productId, setProductId] = useState(null);
  const [productName, setProductName] = useState(null);
  const [composition, setComposition] = useState([]);
  const [volume, setVolume] = useState(volumes[0]);
  const [category, setCategory] = useState("MYJUICE");
  const [quantity, setQuantity] = useState(6);
  const [price, setPrice] = useState(0);
  const [bottle, setBottle] = useState("Verre");
  const [description, setDescription] = useState(null);

  // state ouverture/fermeture modal de commande
  const [open, setOpen] = useState(false);

  //liste des ingredients de la DB
  const [ingredients, setIngredients] = useState([]);

  // state recette Myjuice
  const [juice, setJuice] = useState([]);

  useEffect(() => {
    //Get ingredients from DB
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ingredients`)
      .then((response) => response.json())
      .then((data) => {
        // filter data form ingredients
        let juiceRecipe = data.ingredients;
        juiceRecipe.forEach((i) => {
          i.percentage = 0;
        });
        setIngredients(juiceRecipe);
        setJuice(juiceRecipe);
      });

  }, []);

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
  const updateColorGradient = (newJuice) => {
    const fill = calculateFillFrompercentage(newJuice);
    let colorStop;

    if (colorStop > 100) {
      return colorStop;
    }
    setColorGradient(
      newJuice
        .filter((ingredient) => ingredient.percentage !== 0)
        .map((ingredient, i) => {
          // console.log(
          //   ingredient.name,
          //   "ingredient.percentage",
          //   ingredient.percentage,
          //   "fill",
          //   fill
          // );
          
          let colorStart = "";
          if (i === 0) {
            colorStop = Number((ingredient.percentage / fill) * 100);
            colorStart += `${ingredient.color} 0%`;
            
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
    setJuice(ingredients)

    
    
  };
  
  // Ajoute une dose d'un ingrédient dans la compo du jus
  const handleButtonPlus = (dosage, color, name) => {
    const fill = calculateFillFrompercentage(juice);
    if (dosage > 100 - fill) {
      return false;
    }
    const ingredientFound = juice.find(
      (ingredient) => name === ingredient.name
    );
    if (!ingredientFound) {
      const NewJuice = [...juice, { name: name, percentage: dosage }];

      setJuice(NewJuice);
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

      updateColorGradient(newJuice);

      
    }
  };


  // Retire une dose d'un ingrédient dans la compo du jus
  const handleButtonMinus = (dosage, color, name) => {
    const fill = calculateFillFrompercentage(juice);
  

    let isEmpty = false;

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
          } else {
            isEmpty = true;
            return ingredient;
          }
        }
      });

      setJuice(minusJuice);
      if (!isEmpty) {
        updateColorGradient(minusJuice);
      }
    }
  };

  // Affiche la liste des fruits
  const IngredientListFruits = ingredients.map((ingredient, i) => {
    if (ingredient.type === "Fruit") {
      return (
        <div className={styles.ingredient} key={i}>
          <div className={styles.ingredientIcon}>
            <img src={`/icons/${ingredient.name}_Icon.png`} />
          </div>
          <div className={styles.ingredientNameBox}>
            <p className={styles.ingredientName}>{ingredient.name}</p>
          </div>
          <div className={styles.ingredientButton}>
            <Button
              className={styles.round_Button}
              onClick={() =>
                handleButtonPlus(
                  ingredient.dosage,
                  ingredient.color,
                  ingredient.name
                )
              }
              disabled={
                calculateFillFrompercentage(juice) + ingredient.dosage > 100
                  ? true
                  : false
              }
            >
              +
            </Button>
            <Button
              className={styles.round_Button}
              onClick={() =>
                handleButtonMinus(
                  ingredient.dosage,
                  ingredient.color,
                  ingredient.name
                )
              }
              disabled={juice[i].percentage === 0 ? true : false}
            >
              -
            </Button>
          </div>
          <div className={styles.ingredientAmount}>
            <p className={styles.amount}>{juice[i].percentage}%</p>
          </div>
        </div>
      );
    }
  });

  // Affiche les légumes
  const IngredientListVeg = ingredients.map((ingredient, i) => {
    if (ingredient.type === "Legume") {
      return (
        <div className={styles.ingredient}>
          <div className={styles.ingredientIcon}>
            <img src={`/icons/${ingredient.name}_Icon.png`} />
          </div>

          <div className={styles.ingredientNameBox}>
            <p className={styles.ingredientName}>{ingredient.name}</p>
          </div>

          <div className={styles.ingredientButton2}>
            <Button
              className={styles.round_Button}
              onClick={() =>
                handleButtonPlus(
                  ingredient.dosage,
                  ingredient.color,
                  ingredient.name
                )
              }
              disabled={
                calculateFillFrompercentage(juice) + ingredient.dosage > 100
                  ? true
                  : false
              }
            >
              +
            </Button>
            <Button
              className={styles.round_Button}
              onClick={() =>
                handleButtonMinus(
                  ingredient.dosage,
                  ingredient.color,
                  ingredient.name
                )
              }
              disabled={juice[i].percentage === 0 ? true : false}
            >
              -
            </Button>
          </div>
          <div className={styles.ingredientAmount}>
            <p className={styles.amount}>{juice[i].percentage}%</p>
          </div>
        </div>
      );
    }
  });

  //Affiche la liste des épices
  const IngredientListSpices = ingredients.map((ingredient, i) => {
    if (ingredient.type === "Epice" && ingredient.name !== "Poivre" && ingredient.name !== "Cannelle" ) {
      return (
        <div className={styles.Spice}>
          <div >
            <img className={styles.ingredientIcon} src={`/icons/${ingredient.name}_Icon.png`} />
          </div>

          <div className={styles.ingredientButton2}>
            <Button
              className={styles.round_Button}
              onClick={() =>
                handleButtonPlus(
                  ingredient.dosage,
                  ingredient.color,
                  ingredient.name
                )
              }
              disabled={
                calculateFillFrompercentage(juice) + ingredient.dosage > 100
                  ? true
                  : false
              }
            >
              +
            </Button>
            <Button
              className={styles.round_Button}
              onClick={() =>
                handleButtonMinus(
                  ingredient.dosage,
                  ingredient.color,
                  ingredient.name
                )
              }
              disabled={juice[i].percentage === 0 ? true : false}
            >
              -
            </Button>
          </div>
          <div className={styles.ingredientNameBox}>
            <p className={styles.ingredientName}>{ingredient.name}</p>
          </div>
          <div className={styles.ingredientAmount}>
            <p className={styles.amount}>{juice[i].percentage}%</p>
          </div>
        </div>
      );
    }
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

  console.log("myjuice", myJuice)

  // Choisir son format
  const onChangeVolume = (e) => {
  
    calculatePrice(myJuice, volumes[e.target.value]);
    setVolume(volumes[e.target.value]);
  };
  

  // arrondir à 1 décimale
  const roundTo = (num, precision) => {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
  };

  //Calculer le prix d'1 pack de 6 en fonction du format
  const calculatePrice = (drink, vol) => {
    
    let calculatedPrice = drink.reduce(
      (acc, val) => (acc += (val.percentage * val.price) / val.dosage),
      0
    );

    if (vol.capacity === "1l") {
      (calculatedPrice * vol.priceMultiplier).toFixed(2);
    }

    setPrice(roundTo(calculatedPrice, 1));
    
  };

  //Nommer sa recette
  const nameMyJuice = (e) => {
    setProductName(e);
  };

  const orderMyJuice = () => {
    // ProductName => ProductId
    const formatedName = productName.replace(" ", "-");
    setProductId(formatedName);

    
      const descriptionText = `Created by ${user.name}`;
      setDescription(descriptionText);
  

    const recipe = myJuice.map((ingredient) => {
      return {
        name: ingredient.name,
        percentage: ingredient.percentage,
        ingredient: ingredient._id,
      };
    });

    const options = { volume };

    const myJuiceOrder = {
      productId: productName,
      name: productName,
      category,
      options,
      bottle,
      description,
      price,
      composition: recipe,
    };

    
    dispatch(addToCart({ product: myJuiceOrder, quantity }));
    setOpen(false);
    console.log("myJuiceorder", myJuiceOrder)
  };
 

  const rememberMyJuice = () => {
    const favoriteJuice = {
      name: productName,
      composition: myJuice,
      price: price,
    };
    console.log("favoriteJuice", favoriteJuice);
    dispatch(saveMyJuice({ savedJuice }));
    
  };

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
            <Button className={styles.Button} onClick={rememberMyJuice}>
              Enregistrer ce jus
            </Button>
            <Button
              className={styles.footerButton}
              key="submit"
              onClick={orderMyJuice}
            >
              Commander
            </Button>
          </div>,
        ]}
      >
        <div className={styles.modalMain}>
          <div className={styles.recapContainer}>
            <Input
              className={styles.Input}
              type="text"
              name="ProductName"
              value={productName}
              placeholder="Nommez votre recette"
              onChange={(e) => setProductName(e.target.value)}
            ></Input>
            <h4 className={styles.subTitle}>Ingrédients</h4>

            {myIngredients}

            <h4 className={styles.subTitle}>Volume</h4>

            <Flex vertical gap="middle">
              <Radio.Group
                onChange={onChangeVolume}
                defaultValue={0}
                ButtonStyle="solid"
              >
                {volumes.map((vol,i) => <Radio.Button value={i} key={i}>{vol.capacity}</Radio.Button>)}
              </Radio.Group>
            </Flex>
          </div>
          <div className={styles.pricetag}></div>
          <h4 className={styles.subTitle}>Prix</h4>
          <h2 className={styles.price}>{(price * volume.priceMultiplier).toFixed(2)} €</h2>
        </div>
      </Modal>
    ));

  return (
    <div className={styles.main}>
      <div className={styles.titleContainer}>
        <h1>Créez votre jus</h1>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.FruitsList}>
          <div className={styles.CategoryTitle}>
            <h2>Fruits</h2>
          </div>

          <div className={styles.ingredientList1}>{IngredientListFruits}</div>
        </div>

        {/* loadingBar classique */}
        <div className={styles.bottleContainer}>
          <div className={styles.bottle_bar}>
            <div
              className={`${styles.bottle_bar_fill}`}
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
          <div className={styles.CompletionStatus}>
  <div className={styles.fill_label}>
    {calculateFillFrompercentage(juice)}%
  </div>
  <div className={styles.ButtonContainer}>
    <Button
      className={styles.Button}
      onClick={() => {
        ConfigureMyJuice();
      }}
      disabled={calculateFillFrompercentage(juice) !== 100 ? true : false}
    >
      Commander ce jus
    </Button>
    <Button className={styles.Button} onClick={handleReset}>
      Reset
    </Button>
  </div>
</div>
        </div>
        <div className={styles.VegList}>
          <div className={styles.CategoryTitle}>
            <h2>Légumes</h2>
          </div>
          <div className={styles.ingredientList2}>{IngredientListVeg}</div>
        </div>
      </div>

      <div>
      <div className={styles.SpiceList}>
          <div className={styles.CategoryTitle}>
            <h2 className={styles.category}>épices</h2>
          </div>
          <div className={styles.SpicesListContainer}>
        <div className={styles.ingredientList3}>{IngredientListSpices}</div>
      </div>
      </div>
      
      </div>

      

      {modalContent}
    </div>
  );
};
