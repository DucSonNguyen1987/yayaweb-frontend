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
    { capacity: "250ml", priceMultiplier: 1 },
    { capacity: "1l", priceMultiplier: 3.5 }
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
  const [shake, setShake] = useState(false);
  const [splash, setSplash] = useState(false);

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
  const calculateFillFromPercentage = (drink) => {
    return drink.reduce((acc, val) => (acc += val.percentage), 0);
  };

  // Update le dégradé du fill en fonction des ingrédients et de leur montant (OPTIMISÉ)
  const updateColorGradient = (newJuice) => {
    // Filtrez d'abord les ingrédients qui ont un pourcentage
    const activeIngredients = newJuice.filter(ingredient => ingredient.percentage > 0);
    const fill = calculateFillFromPercentage(newJuice);
    
    // Si pas d'ingrédients actifs, retourner un tableau vide
    if (activeIngredients.length === 0 || fill === 0) {
      setColorGradient([]);
      return;
    }
    
    let currentStop = 0;
    
    // Créer le dégradé de couleurs
    const gradient = activeIngredients.map((ingredient, index) => {
      const percentage = (ingredient.percentage / fill) * 100;
      const start = currentStop;
      const end = currentStop + percentage;
      currentStop = end;
      
      // Pour le premier ingrédient, on commence à 0%
      if (index === 0) {
        return `${ingredient.color} 0%, ${ingredient.color} ${end}%`;
      } else {
        return `${ingredient.color} ${start}%, ${ingredient.color} ${end}%`;
      }
    });
    
    setColorGradient(gradient);
  };

  // Animation du liquide (OPTIMISÉ)
  const animateLiquid = () => {
    setShake(true);
    setSplash(true);
    
    // Ajout d'un délai pour les bulles en fonction du niveau de remplissage
    const fillLevel = calculateFillFromPercentage(juice);
    const bubbles = document.querySelectorAll(`.${styles.bubble}`);
    
    // Animation des bulles en fonction du niveau
    bubbles.forEach((bubble, index) => {
      setTimeout(() => {
        bubble.style.opacity = "1";
      }, index * 100);
    });
    
    setTimeout(() => {
      setShake(false);
    }, 500);
    
    setTimeout(() => {
      setSplash(false);
    }, 800);
  };

  // Reset à 0 les montants d'ingrédients (OPTIMISÉ)
  const handleReset = () => {
    setJuice(ingredients.map(ingredient => ({...ingredient, percentage: 0})));
    setColorGradient([]);
  };

  // Ajoute une dose d'un ingrédient dans la compo du jus (OPTIMISÉ)
  const handleButtonPlus = (dosage, color, name) => {
    // Utiliser la mise à jour fonctionnelle d'état pour assurer la cohérence
    setJuice(prevJuice => {
      const fill = calculateFillFromPercentage(prevJuice);
      
      // Vérifier si on peut ajouter l'ingrédient
      if (fill + dosage > 100) {
        return prevJuice; // Ne pas modifier l'état si on dépasse 100%
      }
      
      // Créer une nouvelle version du tableau de jus
      const newJuice = prevJuice.map(ingredient => {
        if (ingredient.name === name) {
          return {
            ...ingredient,
            percentage: ingredient.percentage + dosage
          };
        }
        return ingredient;
      });
      
      // Mise à jour du dégradé avec le nouveau jus
      setTimeout(() => updateColorGradient(newJuice), 0);
      
      // Déclencher l'animation
      setTimeout(() => animateLiquid(), 10);
      
      return newJuice;
    });
  };

  // Retire une dose d'un ingrédient dans la compo du jus (OPTIMISÉ)
  const handleButtonMinus = (dosage, color, name) => {
    setJuice(prevJuice => {
      const fill = calculateFillFromPercentage(prevJuice);
      
      if (fill <= 0) {
        return prevJuice; // Ne rien faire si déjà vide
      }
      
      const newJuice = prevJuice.map(ingredient => {
        if (ingredient.name === name && ingredient.percentage > 0) {
          return {
            ...ingredient,
            percentage: Math.max(0, ingredient.percentage - dosage)
          };
        }
        return ingredient;
      });
      
      // Mise à jour du dégradé avec le nouveau jus
      setTimeout(() => updateColorGradient(newJuice), 0);
      
      return newJuice;
    });
  };

  // Affiche la liste des fruits
  const IngredientListFruits = ingredients.map((ingredient, i) => {
    if (ingredient.type === "Fruit") {
      return (
        <div className={styles.ingredient} key={i}>
          <div className={styles.ingredientIcon}>
            <img src={`/icons/${ingredient.name}_Icon.png`} alt={ingredient.name} />
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
                calculateFillFromPercentage(juice) + ingredient.dosage > 100
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
    return null;
  });

  // Affiche les légumes
  const IngredientListVeg = ingredients.map((ingredient, i) => {
    if (ingredient.type === "Legume") {
      return (
        <div className={styles.ingredient} key={i}>
          <div className={styles.ingredientIcon}>
            <img src={`/icons/${ingredient.name}_Icon.png`} alt={ingredient.name} />
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
                calculateFillFromPercentage(juice) + ingredient.dosage > 100
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
    return null;
  });

  //Affiche la liste des épices
  const IngredientListSpices = ingredients.map((ingredient, i) => {
    if (ingredient.type === "Epice" && ingredient.name !== "Poivre" && ingredient.name !== "Cannelle") {
      return (
        <div className={styles.Spice} key={i}>
          <div >
            <img className={styles.ingredientIcon} src={`/icons/${ingredient.name}_Icon.png`} alt={ingredient.name} />
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
                calculateFillFromPercentage(juice) + ingredient.dosage > 100
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
    return null;
  });

  // Fonction de rendu des bulles (OPTIMISÉ)
  const renderBubbles = () => {
    const fillLevel = calculateFillFromPercentage(juice);
    const bubblesCount = Math.min(Math.floor(fillLevel / 10), 10);
    const bubbles = [];
    
    for (let i = 0; i < bubblesCount; i++) {
      const left = Math.floor(Math.random() * 80) + 10;
      const size = Math.floor(Math.random() * 6) + 4;
      const delay = Math.random() * 3;
      const duration = Math.random() * 3 + 3;
      const startingPoint = Math.max(10, 100 - fillLevel); // Fait apparaître les bulles au niveau du liquide
      
      bubbles.push(
        <div
          key={i}
          className={styles.bubble}
          style={{
            left: `${left}%`,
            bottom: `${startingPoint + Math.random() * 10}%`, // Commence près du niveau du liquide
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            opacity: 0, // Commence invisible
            transition: 'opacity 0.3s ease-in'
          }}
        />
      );
    }
    
    return bubbles;
  };

  // Ouvrir la modal de commande
  const ConfigureMyJuice = () => {
    const myJuiceOrder = juice.filter(
      (ingredient) => ingredient.percentage !== 0
    );

    const filteredMyJuiceOrder = myJuiceOrder.map((ingredient) => {
      // Créer une copie sans modifier l'original
      const { color, ...ingredientWithoutColor } = ingredient;
      return ingredientWithoutColor;
    });

    setMyJuice(filteredMyJuiceOrder);
    setOpen(true);
  };

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

    // Correction: Aucun effet de bord ici, juste un calcul
    if (vol.capacity === "1l") {
      calculatedPrice = calculatedPrice * vol.priceMultiplier;
    }

    setPrice(roundTo(calculatedPrice, 1));
  };

  //Nommer sa recette
  const nameMyJuice = (e) => {
    setProductName(e);
  };

  const orderMyJuice = () => {
    // Vérifier que le nom est défini
    if (!productName) {
      return; // Sortir si pas de nom défini
    }
    
    // ProductName => ProductId
    const formatedName = productName.replace(/\s+/g, "-"); // Correction: remplacer tous les espaces
    setProductId(formatedName);

    const descriptionText = `Created by ${user?.name || 'Customer'}`; // Sécurité si user est null
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
      productId: formatedName, // Utiliser le nom formaté
      name: productName,
      category,
      options,
      bottle,
      description: descriptionText, // Utiliser directement la valeur
      price,
      composition: recipe,
    };

    dispatch(addToCart({ product: myJuiceOrder, quantity }));
    setOpen(false);
  };

  const rememberMyJuice = () => {
    // Vérifier que le nom est défini
    if (!productName) {
      return; // Sortir si pas de nom défini
    }
    
    const favoriteJuice = {
      name: productName,
      composition: myJuice,
      price: price,
    };
    
    dispatch(saveMyJuice({ savedJuice: favoriteJuice })); // Corriger l'objet passé
  };

  // Formulaire de commande
  const myIngredients = myJuice.map((ingredient, i) => {
    return (
      <li className={styles.MyingredientsList} key={i}>
        {ingredient.name} {ingredient.percentage}%
      </li>
    );
  });
  
  const modalContent = (
    <Modal
      open={open}
      title="Commander mon jus"
      onCancel={showModal}
      footer={[
        <div className={styles.footer} key="footer">
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
            value={productName || ''}
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
              {volumes.map((vol, i) => <Radio.Button value={i} key={i}>{vol.capacity}</Radio.Button>)}
            </Radio.Group>
          </Flex>
        </div>
        <div className={styles.pricetag}></div>
        <h4 className={styles.subTitle}>Prix</h4>
        <h2 className={styles.price}>{(price * volume.priceMultiplier).toFixed(2)} €</h2>
      </div>
    </Modal>
  );

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

        {/*Bouteille optimisée avec des transitions fluides */}
        <div className={styles.bottleContainer}>
          <div className={`${styles.bottle_bar} ${shake ? styles.shake : ''}`}>
            <div
              className={`${styles.bottle_bar_fill}`}
              style={{
                height: `${calculateFillFromPercentage(juice)}%`,
                backgroundImage: `linear-gradient(to top, ${colorGradient.join(
                  ",")})`,
                transition: 'height 0.4s ease-out, background-image 0.5s ease',
              }}
            >
              {renderBubbles()}
              <div className={`${styles.splash} ${splash ? styles.active : ''}`}></div>
            </div>
          </div>

          <div className={styles.CompletionStatus}>
            <div className={styles.fill_label}>
              {calculateFillFromPercentage(juice)}%
            </div>
            <div className={styles.ButtonContainer}>
              <Button
                className={styles.Button}
                onClick={() => { ConfigureMyJuice(); }}
                disabled={calculateFillFromPercentage(juice) !== 100}
              >
                Commander ce jus
              </Button>
              <Button 
                className={styles.Button} 
                onClick={handleReset}
              >
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
            <h2 className={styles.category}>Épices</h2>
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