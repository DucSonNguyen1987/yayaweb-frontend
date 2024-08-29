import styles from '../styles/Account.module.css';
import { useLayoutEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';


function Account() {
    const router = useRouter();
    const user = useSelector((state) => state.user.value);
    console.log(user);
    // States for user account form
    const [gender, setGender] = useState(user.gender);
    const [firstName, setfirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [streetNumber, setStreetNumber] = useState("");
    const [streetName, setStreetName] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [city, setCity] = useState("");
    
    // State pour lister les erreurs dans le form
    const [errors, setErrors]= useState([]);

    // loading state
    const [isLoading, setIsLoading]= useState(true);
    
    useLayoutEffect(() => {
        async function handleRouteChange() {
            // redirect to home if user is not connected
            if(!user.accessToken) {
                await router.push('/');
            }
            setIsLoading(false);
        }
        void handleRouteChange();

    }, []);

    // TODO: fetch addresses from backend

    // display loading (while checking if user is connected)
    if(isLoading) {
        return <div className={styles.loading}></div>;
    }

    return (
      <div className={styles.accountPage}>
        <main className={styles.main}>
            <h1 className={styles.title}>Mon compte</h1>
            <h2>Mes informations personnelles</h2>
            {user && (
                <div className={styles.formAccount}>
                    <div>
                        <label for="email">Mon email</label>
                        <input
                        className={styles.Input}
                        type="text"
                        required
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        // onChange={(e)=>setEmail(e.target.value)}
                        disabled
                        />
                        {errors.email && (
                        <div className={styles.error}>{errors.email}</div>
                        )}
                    </div>
                    <div>
                        <label for="gender">Civilité</label>
                        <select
                        className={styles.select}
                        name="gender"
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        >
                        <option value="">Civilité</option>
                        <option value="male">Monsieur</option>
                        <option value="female">Madame</option>
                        <option value="other">Autre</option>
                        </select>
                    </div>
                    <div>
                        <label for="lastName">Nom</label>
                        <input
                        className={styles.Input}
                        type="text"
                        required
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        placeholder="Nom"
                        onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.firstName && (
                        <div className={styles.error}>{errors.firstName}</div>
                        )}
                    </div>
                    <div>
                        <label for="firstName">Prénom</label>
                        <input
                        className={styles.Input}
                        type="text"
                        required
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        placeholder="Prénom"
                        onChange={(e) => setfirstName(e.target.value)}
                        />
                        {errors.lastName && (
                        <div className={styles.error}>{errors.lastName}</div>
                        )}
                    </div>

                    <div>
                        <label for="phoneNumber">Téléphone portable</label>
                        <input
                        className={styles.Input}
                        type="text"
                        required
                        id="phoneNumber"
                        name="phoneNumber"
                        value={phoneNumber}
                        placeholder="Téléphone"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        {errors.phoneNumber && (
                        <div className={styles.error}>{errors.phoneNumber}</div>
                        )}
                    </div>

                    <div className={styles.passwordSection}>
                        <p className={styles.popovertitle}>Nouveau mot de passe</p>

                        <div className={styles.passwordFields}>
                        <div>
                            <input
                            className={styles.Input}
                            type="password"
                            required
                            name="password"
                            value={password}
                            placeholder="Mot de Passe"
                            onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && (
                            <div className={styles.error}>{errors.password}</div>
                            )}
                        </div>
                        <div>
                            <input
                            className={styles.Input}
                            type="password"
                            required
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirmer Mot de Passe"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {errors.confirmPassword && (
                            <div className={styles.error}>
                                {errors.confirmPassword}
                            </div>
                            )}
                        </div>
                        </div>
                    </div>
                    </div>
                )}

                <h2>Mes adresses</h2>
                N° Rue Code postal Ville Instructions de livraisons
                Utiliser comme addresse de facturation
        </main>
      </div>
    );
}

export default Account;
