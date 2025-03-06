import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/MyJuiceCreator.module.css";
import { saveMyJuice } from "../../../reducers/myJuice";
import { addToCart } from "../../../reducers/cart";
import { Modal, Input, Flex, Radio, Button, Popover } from "antd";
import { gsap } from 'gsap';
// L'import calc n'est pas utilisé, nous le supprimons
// import { calc } from "antd/fr/theme/internal";

export const MyJuiceCreator = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const cart = useSelector((state) => state.cart.value);
  // Définition des volumes disponibles avec leurs multiplicateurs de prix
  const volumes = [
    { capacity: "250ml", priceMultiplier: 1 },
    { capacity: "1l", priceMultiplier: 3.5 }
  ];

  // État pour stocker le dégradé de couleurs du jus
  const [colorGradient, setColorGradient] = useState([]);

  // État pour les recettes sauvegardées
  const [savedJuice, setSavedJuice] = useState([]);

  // États pour la recette finale
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

  // État pour gérer l'ouverture/fermeture de la modal
  const [open, setOpen] = useState(false);

  // États pour les ingrédients et la recette en cours
  const [ingredients, setIngredients] = useState([]);
  const [juice, setJuice] = useState([]);

  // Références pour les animations
  const bottleRef = useRef(null);
  const fillRef = useRef(null);

  // Chargement des ingrédients depuis l'API
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ingredients`)
      .then((response) => response.json())
      .then((data) => {
        // Initialiser chaque ingrédient avec un pourcentage de 0
        let juiceRecipe = data.ingredients;
        juiceRecipe.forEach((i) => {
          i.percentage = 0;
        });
        setIngredients(juiceRecipe);
        setJuice(juiceRecipe);
      });
  }, []);

  // Mettre à jour le prix quand myJuice change
  useEffect(() => {
    calculatePrice(myJuice, volume);
  }, [myJuice]);

  // Animation du liquide 
  useEffect(() => {
    if (!fillRef.current) return;

    // Déclaration de bubbleInterval en dehors pour le nettoyage
    let bubbleInterval;

    // Fonction pour créer l'ondulation du liquide
    const liquidWave = () => {
      // Récupérer la hauteur actuelle du remplissage
      const fillHeight = calculateFillFromPercentage(juice);

      if (fillHeight > 0) {
        // Si le niveau est à 100%, appliquer un style différent
        if (fillHeight >= 100 && fillRef.current) {
          // Pour 100%, appliquer des bords droits et arrêter l'ondulation
          gsap.to(fillRef.current, {
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            boxShadow: "none", // Supprimer l'ombre pour un effet plein
            duration: 0.5,
            ease: "power2.out"
          });
        } else {
          // Animation d'ondulation pour moins de 100%
          gsap.to(fillRef.current, {
            boxShadow: `0 -5px 10px rgba(0,0,0,0.1) inset`, // Correction: rgba au lieu de regba
            borderTopLeftRadius: "40% 20px",
            borderTopRightRadius: "40% 20px",
            duration: 1.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
          });
        }

        // Création des bulles aléatoires dans le liquide
        bubbleInterval = setInterval(() => {
          if (fillHeight > 20 && fillRef.current) {
            // Créer 2-3 bulles à chaque intervalle pour une meilleure distribution
            const bubbleCount = Math.floor(Math.random() * 2) + 2;

            for (let i = 0; i < bubbleCount; i++) {
              // Position entre 5% et 95% pour une meilleure distribution horizontale
              const randomX = Math.floor(Math.random() * 90) + 5;
              const bubble = document.createElement('div');
              bubble.className = styles.bubble;
              bubble.style.left = `${randomX}%`; // Correction: ajout du %
              bubble.style.bottom = `${10 + Math.random() * 20}%`; // Variation de position initiale

              if (fillRef.current) {
                fillRef.current.appendChild(bubble);

                // Animation avec oscillation horizontale pour un mouvement plus naturel
                gsap.to(bubble, {
                  bottom: '100%',
                  x: Math.random() > 0.5 ? `+=${Math.random() * 15}` : `-=${Math.random() * 15}`,
                  opacity: 0,
                  scale: 1.2 + Math.random() * 0.5,
                  duration: 2 + Math.random() * 2,
                  ease: "power1.out",
                  onComplete: () => {
                    if (fillRef.current && fillRef.current.contains(bubble)) {
                      fillRef.current.removeChild(bubble);
                    }
                  }
                });
              }
            }
          }
        }, 2000);
      }
    }; // Point-virgule important ici!

    // Démarrer l'animation seulement si le contenu existe
    if (calculateFillFromPercentage(juice) > 0) {
      liquidWave();
    }

    // Fonction de nettoyage au démontage du composant
    return () => {
      gsap.killTweensOf(fillRef.current);
      if (bubbleInterval) clearInterval(bubbleInterval);
    };
  }, [juice]);

  // Effet de Splash à l'ajout d'ingrédient
  const addSplashEffect = () => {
    if (!fillRef.current || calculateFillFromPercentage(juice) <= 0) return;

    // Fonction pour créer des gouttes pour l'effet splash
    const createDroplet = () => {
      const droplet = document.createElement('div');
      droplet.className = styles.droplet;

      // Position aléatoire
      const side = Math.random() > 0.5 ? 1 : -1; // Correction: parfois -1, parfois 1
      droplet.style.left = `calc(50% + ${side * (Math.random() * 20 + 10)}px)`;
      droplet.style.top = '0%';

      if (bottleRef.current) {
        bottleRef.current.appendChild(droplet);

        // Animation pour la goutte
        gsap.to(droplet, {
          top: `${20 + Math.random() * 30}%`,
          x: side * (Math.random() * 30 + 10),
          opacity: 0,
          duration: 0.6 + Math.random() * 0.4,
          ease: "power1.out",
          onComplete: () => {
            if (bottleRef.current && bottleRef.current.contains(droplet)) {
              bottleRef.current.removeChild(droplet);
            }
          }
        });
      }
    }; // Point-virgule important ici!

    // Animation principale de splash
    gsap.to(fillRef.current, {
      borderTopLeftRadius: "70% 30px",
      borderTopRightRadius: "70% 30px",
      y: -5,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        // Créer quelques gouttes
        for (let i = 0; i < 3; i++) {
          createDroplet();
        }

        // Retour à la normale avec effet de rebond
        gsap.to(fillRef.current, {
          borderTopLeftRadius: "40% 20px",
          borderTopRightRadius: "40% 20px",
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });
      }
    });
  };

  // Fonction pour ouvrir/fermer la modal
  const showModal = () => {
    setOpen(!open);
  };

  // Calculer le pourcentage total du jus
  const calculateFillFromPercentage = (drink) => {
    return drink.reduce((acc, val) => (acc += val.percentage), 0);
  };

  // Mettre à jour le dégradé de couleurs
  const updateColorGradient = (newJuice) => {
    const fill = calculateFillFromPercentage(newJuice);
    let colorStop;

    if (colorStop > 100) {
      return colorStop;
    }

    setColorGradient(
      newJuice
        .filter((ingredient) => ingredient.percentage !== 0)
        .map((ingredient, i) => {
          let colorStart = "";
          if (i === 0) {
            colorStop = Number((ingredient.percentage / fill) * 100);
            colorStart += `${ingredient.color} 0%`;

            return `${colorStart}, ${ingredient.color} ${Number(ingredient.percentage / fill) * 100
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

  // Réinitialiser tous les ingrédients à 0
  const handleReset = () => {
    setJuice(ingredients);
  };

  // Ajouter un ingrédient au jus
  const handleButtonPlus = (dosage, color, name) => {
    const fill = calculateFillFromPercentage(juice);
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
      // Créer une nouvelle version de la recette avec le pourcentage mis à jour
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

      // Calculer le nouveau pourcentage total
      const newFill = calculateFillFromPercentage(newJuice);

      // Déclencher l'animation de splash avec un petit délai
      setTimeout(() => addSplashEffect(), 10);

      setJuice(newJuice);
      updateColorGradient(newJuice);

      // Si on atteint exactement 100%, forcer les bords droits
      if (newFill >= 100 && fillRef.current) {
        // Attendre que l'animation de splash se termine
        setTimeout(() => {
          if (fillRef.current) {
            // Arrêter toutes les animations en cours
            gsap.killTweensOf(fillRef.current);

            // Appliquer des bords droits pour un effet "plein"
            gsap.to(fillRef.current, {
              borderTopLeftRadius: "0px",
              borderTopRightRadius: "0px",
              boxShadow: "none",
              duration: 0.3,
              ease: "power2.out",
              onComplete: () => {
                // Petit effet visuel "plein" avec rebond
                gsap.to(fillRef.current, {
                  y: -2,
                  duration: 0.2,
                  ease: "power1.out",
                  onComplete: () => {
                    gsap.to(fillRef.current, {
                      y: 0,
                      duration: 0.4,
                      ease: "elastic.out(1, 0.3)"
                    });
                  }
                });
              }
            });
          }
        }, 800);
      }
    }
  };

  // Retirer un ingrédient du jus
  const handleButtonMinus = (dosage, color, name) => {
    const fill = calculateFillFromPercentage(juice);
    let isEmpty = false;

    if (fill > 0 && fill <= 100) {
      // Créer une nouvelle version de la recette avec le pourcentage diminué
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

      // Animation de "repos" du liquide quand on en retire
      if (!isEmpty && fillRef.current) {
        gsap.to(fillRef.current, {
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(fillRef.current, {
              borderTopLeftRadius: "40% 20px",
              borderTopRightRadius: "40% 20px",
              duration: 0.5,
            });
          }
        });
      }

      setJuice(minusJuice);
      if (!isEmpty) {
        updateColorGradient(minusJuice);
      }
    }
  };

  // Générer la liste des fruits
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
  });

  // Générer la liste des légumes
  const IngredientListVeg = ingredients.map((ingredient, i) => {
    if (ingredient.type === "Legume") {
      return (
        <div className={styles.ingredient} key={i}>
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
  });

  // Générer la liste des épices
  const IngredientListSpices = ingredients.map((ingredient, i) => {
    if (ingredient.type === "Epice" && ingredient.name !== "Poivre" && ingredient.name !== "Cannelle") {
      return (
        <div className={styles.Spice} key={i}>
          <div>
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
  });

  // Préparer la commande du jus
  const ConfigureMyJuice = () => {
    // Filtrer pour garder uniquement les ingrédients avec un pourcentage > 0
    const myJuiceOrder = juice.filter(
      (ingredient) => ingredient.percentage !== 0
    );

    myJuiceOrder.map((ingredient) => {
      Reflect.deleteProperty(ingredient, "color");
    });

    setMyJuice(myJuiceOrder);
    setOpen(true);
  };

  // Changer le volume sélectionné
  const onChangeVolume = (e) => {
    calculatePrice(myJuice, volumes[e.target.value]);
    setVolume(volumes[e.target.value]);
  };

  // Fonction d'arrondi à une précision donnée
  const roundTo = (num, precision) => {
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
  };

  // Calculer le prix en fonction des ingrédients et du volume
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

  // Finaliser la commande du jus
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
  };

  // Sauvegarder la recette
  const rememberMyJuice = () => {
    const favoriteJuice = {
      name: productName,
      composition: myJuice,
      price: price,
    };
    dispatch(saveMyJuice({ savedJuice }));
  };

  // Préparer le contenu de la modal
  let myIngredients;
  let modalContent =
    ((myIngredients = myJuice.map((ingredient, i) => {
      return (
        <li className={styles.MyingredientsList} key={i}>
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
                  {volumes.map((vol, i) => (
                    <Radio.Button value={i} key={i}>
                      {vol.capacity}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </Flex>
            </div>
            <div className={styles.pricetag}></div>
            <h4 className={styles.subTitle}>Prix</h4>
            <h2 className={styles.price}>
              {(price * volume.priceMultiplier).toFixed(2)} €
            </h2>
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

        {/* Container de la bouteille avec animations */}
        <div className={styles.bottleContainer}>
          {/* Bouteille avec référence pour animation */}
          <div
            ref={bottleRef}
            className={styles.bottle_bar}
          >
            {/* Éléments du col et du bouchon */}
            <div className={styles.bottle_neck}></div>
            <div className={styles.bottle_cap}></div>
            
            {/* Liquide avec références pour animation */}
            <div
              ref={fillRef}
              className={`${styles.bottle_bar_fill} ${calculateFillFromPercentage(juice) >= 100 ? styles.full : ''}`}
              style={{
                height: `${calculateFillFromPercentage(juice)}%`,
                backgroundImage: `linear-gradient(to top, ${colorGradient.join(",")})`,
              }}
            >
            </div>
          </div>

          <div className={styles.CompletionStatus}>
            <div className={styles.fill_label}>
              {calculateFillFromPercentage(juice)}%
            </div>

            <div
              className={styles.ButtonContainer}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: "10px",
                width: '100%',
              }}
            >
              <Button
                className={styles.Button}
                onClick={() => { ConfigureMyJuice(); }} // Correction: onClick au lieu de conClick
                disabled={calculateFillFromPercentage(juice) !== 100 ? true : false}
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