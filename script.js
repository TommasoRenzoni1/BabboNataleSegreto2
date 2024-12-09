// Importa Firebase da URL remoti
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCtDr-5JrQQztL6glAF-BdKtHNB2apklXY",
    authDomain: "babbo-natale-segreto-43689.firebaseapp.com",
    projectId: "babbo-natale-segreto-43689",
    storageBucket: "babbo-natale-segreto-43689.firebasestorage.app",
    messagingSenderId: "1050913931216",
    appId: "1:1050913931216:web:ccd2dfdb8df9d3cec203d5",
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Funzioni
async function getArray() {
    const docRef = doc(db, "globalData", "array");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log(docSnap.data().items || []);
        return docSnap.data().items || [];
        
    } else {
        console.error("Documento non trovato!");
        return [];
    }
}

// Funzione per rimuovere un elemento e salvarlo
async function removeElementAndSave() {
  const array = await getArray();

  // Verifica che l'array sia effettivamente un array
  if (!Array.isArray(array)) {
      console.error("I dati recuperati non sono un array!");
      return;
  }

  if (array.length === 0) {
      console.log("Nessun elemento rimasto!");
      return;
  }

  // Estrai un indice casuale
  const randomIndex = Math.floor(Math.random() * array.length);

  // Rimuovi l'elemento casuale
  const removedElement = array.splice(randomIndex, 1)[0]; // `splice` restituisce un array, quindi prendiamo il primo elemento

  console.log(`Elemento estratto: ${removedElement}`);
  let elemento = removedElement;
  console.log(elemento);

  // Salva l'array aggiornato
  await setDoc(doc(db, "globalData", "array"), { items: array });
  return removedElement;
}

// Aggiungi un event listener al bottone
document.getElementById("removeButton").addEventListener("click", () => {
  // Disabilita il bottone subito dopo il primo click
  const button = document.getElementById("removeButton");
  button.disabled = true;

  

  removeElementAndSave().then((element) => {
      if (element) {
          // Aggiorna il messaggio con l'elemento estratto
          document.getElementById("message").innerHTML = `Devi fare il regalo a: ${element} !!!`;
      } else {
          document.getElementById("message").innerHTML = "Sono finite le persone a cui fare regali!!!";
      }
      document.getElementById("bye").innerHTML = "Hai finito, puoi chiudere questa pagina. Arrivederci!!1!1!1";
  });
});

document.getElementById("removeButton").addEventListener("click", () => {
    const message = document.getElementById("message");

    // Trigger fade-in
    message.style.visibility = "visible"; // Make the element visible
    message.style.opacity = "1"; // Start the opacity transition
});





