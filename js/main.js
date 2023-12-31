"use strict"
/*
Milestone 1
● Replica della grafica con la possibilità di avere messaggi scritti 
dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
● Visualizzazione dinamica della lista contatti: tramite la direttiva 
v-for, visualizzare nome e immagine di ogni contatto.

Milestone 2
● Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i
messaggi relativi al contatto attivo all’interno del pannello della conversazione.
Per utente attivo si intende al clic della conversazione nella contactlist.
Ogni utente ha il suo array di messaggi della conversazione (logica slider).
● Click sul contatto mostra la conversazione del contatto cliccato.

Milestone 3
● Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando
“enter” il testo viene aggiunto al thread sopra, come messaggio verde
● Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
un “ok” come risposta, che apparirà dopo 1 secondo.

Milestone 4
● Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i
contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo
“mar” rimangono solo Marco e Martina)
*/
const { createApp } = Vue

const app = createApp({
  data(){
    return {
      newMessage: {
        date: '25/07/2023 18:30:00',
        message: '',
        status: 'sent'
      },
      contactsList: [
        {
        name: 'Michele',
        avatar: './img/avatar_1.jpg',
        visible: true,
        messages: [
        {
        date: '10/01/2020 15:30:55',
        message: 'Hai portato a spasso il cane?',
        status: 'sent'
        },
        {
        date: '10/01/2020 15:50:00',
        message: 'Ricordati di stendere i panni',
        status: 'sent'
        },
        {
        date: '10/01/2020 16:15:22',
        message: 'Tutto fatto!',
        status: 'received'
        }
        ],
        },
        {
        name: 'Fabio',
        avatar: './img/avatar_2.jpg',
        visible: true,
        messages: [
        {
        date: '20/03/2020 16:30:00',
        message: 'Ciao come stai?',
        status: 'sent'
        },
        {
        date: '20/03/2020 16:30:55',
        message: 'Bene grazie! Stasera ci vediamo?',
        status: 'received'
        },
        {
        date: '20/03/2020 16:35:00',
        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
        status: 'sent'
        }
        ],
        },
        {
        name: 'Samuele',
        avatar: './img/avatar_3.jpg',
        visible: true,
        messages: [
        {
        date: '28/03/2020 10:10:40',
        message: 'La Marianna va in campagna',
        status: 'received'
        },
        {
        date: '28/03/2020 10:20:10',
        message: 'Sicuro di non aver sbagliato chat?',
        status: 'sent'
        },
        {
        date: '28/03/2020 16:15:22',
        message: 'Ah scusa!',
        status: 'received'
        }
        ],
        },
        {
        name: 'Alessandro B.',
        avatar: './img/avatar_4.jpg',
        visible: true,
        messages: [
        {
        date: '10/01/2020 15:30:55',
        message: 'Lo sai che ha aperto una nuova pizzeria?',
        status: 'sent'
        },
        {
        date: '10/01/2020 15:50:00',
        message: 'Si, ma preferirei andare al cinema',
        status: 'received'
        }
        ],
        },
        {
        name: 'Alessandro L.',
        avatar: './img/avatar_5.jpg',
        visible: true,
        messages: [
        {
        date: '10/01/2020 15:30:55',
        message: 'Ricordati di chiamare la nonna',
        status: 'sent'
        },
        {
        date: '10/01/2020 15:50:00',
        message: 'Va bene, stasera la sento',
        status: 'received'
        }
        ],
        },
        {
        name: 'Claudia',
        avatar: './img/avatar_6.jpg',
        visible: true,
        messages: [
        {
        date: '10/01/2020 15:30:55',
        message: 'Ciao Claudia, hai novità?',
        status: 'sent'
        },
        {
        date: '10/01/2020 15:50:00',
        message: 'Non ancora',
        status: 'received'
        },
        {
        date: '10/01/2020 15:51:00',
        message: 'Nessuna nuova, buona nuova',
        status: 'sent'
        }
        ],
        },
        {
        name: 'Federico',
        avatar: './img/avatar_7.jpg',
        visible: true,
        messages: [
        {
        date: '10/01/2020 15:30:55',
        message: 'Fai gli auguri a Martina che è il suo compleanno!',
        status: 'sent'
        },
        {
        date: '10/01/2020 15:50:00',
        message: 'Grazie per avermelo ricordato, le scrivo subito!',
        status: 'received'
        }
        ],
        },
        {
        name: 'Davide',
        avatar: './img/avatar_8.jpg',
        visible: true,
        messages: [
        {
        date: '10/01/2020 15:30:55',
        message: 'Ciao, andiamo a mangiare la pizza stasera?',
        status: 'received'
        },
        {
        date: '10/01/2020 15:50:00',
        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
        status: 'sent'
        },
        {
        date: '10/01/2020 15:51:00',
        message: 'OK!!',
        status: 'received'
        }
        ],
        }
      ],
      currentContact : null,
      searchFilter: "",
    }
  },
  methods: {
    getAvatarSrc(singleContact){
      return `${singleContact.avatar}`;
    },
    /*
    Una volta stampata la lista degli utenti, al click su un utente devo
    mostrare i suoi messaggi nella lista di destra.
    Se passo/salvo tutto l'oggetto del contatto cliccato e col 
    selezionatore accedo al singolo elemento.
    Per evitare di inserire ogni volta contactsList[indiceUtente].messages, ecc...
    */
    onUserClick(singleContact){
      this.currentContact = singleContact;
      // console.log(singleContact.messages);
    },
    getMessageClass(status) {
    // La funzione restituisce la classe "sent" se lo stato è "sent",
    // altrimenti restituisce la classe "received" se lo stato è "received".
    //Questo viene utilizzato per determinare quale classe CSS da applicare 
    // ai messaggi, a seconda del loro stato (sent o received).
      return status === 'sent' ? 'message-sent' : 'message-received';
    },
    addNewMessage(){
      const newMessage = {
        // tolocalestring mai visto, grazie internet
        date: new Date().toLocaleString(),
        message: this.newMessage.message,
        status: 'sent',
      };
      this.currentContact.messages.push(newMessage);
      
      // reset messaggio scritto nella search bar dopo aver premuto invio.
      this.newMessage.message = [];
      
      setTimeout(() => {
        const automaticResponse = {
          date: new Date().toLocaleString(),
          message: 'oke',
          status: 'received',
        }
        this.currentContact.messages.push(automaticResponse);
      }, 1000);

      // fatto a lezione con Florian, serve per far scrollare automaticamente il container all'ultimo messaggio inviato.
      // questa proprietà va data ovviamente al container che ha l'overflow.
      // Appena vue finisce di aggiornare l'html, esegue subito questa funzione.
      // oppure si può usare un timeout con setTimeout a 0 ms.
      this.$nextTick(() => {
        this.$refs.msgsContainer.scrollTop = this.$refs.msgsContainer.scrollHeight
      });
      
    },
  },
  beforeMount(){
    /* all'avvio della pagina, html cerca di accedere alla variabile currentContact,
      siccome questa è null avrò un errore.
      Allora prima che vue legge l'html assegno un valore iniziale alla variabile currentContact.
      l'evento beforemount viene eseguito esattamente prima della lettura dell'html.
      In questo modo visualizzo sempre il primo utente della lista.
    */
    this.currentContact = this.contactsList[0];
  },
  computed: {
    filteredContacts() {
      // Rimuove gli spazi bianchi all'inizio e alla fine della stringa (trim trovato online)
      let searchTerm = this.searchFilter.trim();
      // Prima di applicare il filtro, imposto una condizione per far sì che la lista venga filtrata
      // solo se digito nella search bar, altrimenti rimane tutto invariato.
      if (searchTerm === "") {
        // Se il filtro di ricerca è vuoto o contiene solo spazi bianchi, restituisce tutti i contatti
        return this.contactsList;
      } else {
        // Altrimenti, applica il filtro di ricerca e restituisce solo i contatti filtrati
        // stampati dall'array ricavato dal v-for.
        return this.contactsList.filter(contact =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    },
  }
}).mount("#app");

