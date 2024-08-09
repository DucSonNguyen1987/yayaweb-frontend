import React from 'react'
import {useState}  from'react';

const signUpForm = () => {

  const [gender, setGender] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [firstName, setfirstName] = useState("");

    

const handleRegister =(e)=>{
  e.preventDefault();
  const userData ={gender, lastName, firstName, age, phoneNumber, email, password, streetNumber, streetName, zipCode, city };

}




  return (
    
    <form ref={form} className={styles.SingUpForm} onSubmit={handleRegister}>
        <div className={styles.infoContainer}>
          <div className={styles.infoSection}>
            <p className={styles.popovertitle}> Informations personnelles</p>
            <div>
              <select className={styles.select} name="gender" value={gender} onChange={()=> setGender(e.target.value)}>
                <option value="">Civilité</option>
                <option value="male">Monsieur</option>
                <option value="female">Madame</option>
                <option value="other">Autre</option>
              </select>
              {errors.gender && <div className={styles.error}>{errors.gender}</div>}
            </div>

            <div>
              <input
                className={styles.Input}
                type="text"
                required
                name="lastName"
                value={lastName}
                placeholder="Nom"
                onChange={()=>setLastName(e.target.value)}
              />
               {errors.firstName && <div className={styles.error}>{errors.firstName}</div>}
            </div>

            <div>
              <input
              className={styles.Input}
                type="text"
                required
                name="firstName"
                value={firstName}
                placeholder="Prénom"
                onChange={()=>setFirstName(e.target.value)}

              />
              {errors.lastName && <div className={styles.error}>{errors.lastName}</div>}
            </div>

            <div>
              <input
              className={styles.Input}
                type="number"
                required
                name="age"
                value={age}
                placeholder="Age"
                onChange={()=>setAge(e.target.value)}
              />
               {errors.age && <div className={styles.error}>{errors.age}</div>}
            </div>

            <div>
              <input
              className={styles.Input}
                type="text"
                required
                name="phoneNumber"
                value={phoneNumber}
                placeholder="Téléphone"
                onChange={()=>setPhoneNumber(e.target.value)}
              />
               {errors.phoneNumber && <div className={styles.error}>{errors.phoneNumber}</div>}
            </div>

            <div>
              <input
              className={styles.Input}
                type="text"
                required
                name="email"
                value={email}
                placeholder="Email"
                onChange={()=>setEmail(e.target.value)}
                
              />
              {errors.email && <div className={styles.error}>{errors.email}</div>}
            </div>
          </div>

          <div className={styles.addressSection}>
            <p className={styles.popovertitle}> Adresse</p>
            <div className={styles.addressFields}>
            <div>
              <input
              className={styles.Input}
                type="text"
                required
                name="streetNumber"
                value={streetNumber}
                placeholder="N°"
                onChange={()=>setStreetNumber(e.target.value)}
                
              />
              {errors.streetNumber && <div className={styles.error}>{errors.streetNumber}</div>}
            </div>

            <div>
              <input
              className={styles.Input}
                type="text"
                required
                name="streetName"
                value={streetName}
                placeholder="Nom de Rue"
                onChange={()=>setStreetName(e.target.value)}
                
              />
              {errors.streetName && <div className={styles.error}>{errors.streetName}</div>}
            </div>

            <div>
              <input
              className={styles.Input}
                type="text"
                required
                name="zipCode"
                value={zipCode}
                placeholder="Code Postal"
                onChange={()=>setZipCode(e.target.value)}
                
              />
              {errors.zipCode && <div className={styles.error}>{errors.zipCode}</div>}
            </div>

            <div>
              <input
              className={styles.Input}
                type="text"
                required
                name="city"
                value={city}
                placeholder="Ville"
                onChange={()=>setCity(e.target.value)}
              />
              {errors.city && <div className={styles.error}>{errors.city}</div>}

            </div>
            </div>
          
          </div>
        </div>

        <div className={styles.passwordSection}>
          <p className={styles.popovertitle}> Mot de Passe</p>

          <div className={styles.passwordFields}>
          <div>
            <input
            className={styles.Input}
              type="password"
              required
              name="password"
              value={password}
              placeholder="Mot de Passe"
              onChange={()=>setPassword(e.target.value)}
             
            />
             {errors.password && <div className={styles.error}>{errors.password}</div>}
          </div>
          <div>
            <input
            className={styles.Input}
              type="password"
              required
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirmer Mot de Passe"
              onChange={()=>setConfirmPassword(e.target.value)}
              
            />
            {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword}</div>}
          </div>
          </div>
          <button> S'inscrire</button>
        </div>
      </form>
  )
}

export default signUpForm;