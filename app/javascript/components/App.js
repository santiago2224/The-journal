// This command is to import the React webpacker into the App
// useState and useEffect are hooks created from react, which is why they are in the same line as (import React, from 'react')
import React, {useState, useEffect} from "react";
//>import Journal from "./Journal";< is stating that the functions inside the ./Journal will apply inside the single page App.
import Journal from "./Journal";
//Axios is a library that helps us make http requests to external resources >https://dev.to/cesareferrari/working-with-axios-in-react-540c< for more info
import axios from "axios";
import JournalForm from "./JournalForm"
import Entries from, "./Entries"

const App = () =>{
  const [journal, setJournal] = useState ([]) 
                                //useState is a hook used specifically in React, that allows you to have state variables in functional components. 
                                //You pass the initial state to this function and it returns a variable with the current state value 
                                //(not necessarily the initial state) and another function to update this value.
    // the getJournal will get the Json data, and set new data to the getJournal in useState
    const getJournal = async () => {
      try{
        let res = await axios.get("/Journal")
        console.log(res)
        setJournal(res.data)
      }catch(err){
        console.log(err)
      }
    }
//What does useEffect do? 
//By using this Hook, you tell React that your component needs to do something after render. 
//React will remember the function you passed, 
//and call it later after performing the DOM (Document Object Model) updates.
    useEffect(()=>{
      getJournal()
    },[])

    const createEntries = async (newEntries) => {
      try {
        let res = await axios.post("/entries", {...newEntries})
  
        console.log(res.data)
        setJournal([res.data,...journal])
      } catch(err) {
        console.log(err)
      }
    }

    const deleteEntries = async (id) => {
      try {
        let res = await axios.delete(`/entries/${id}`)
  
        let filteredEntries = entries.filter(entries => entries.id !== id)
  
        setEntries(filteredEntries)
      } catch(err){
        console.log(err)
      }
    }

      return(
        <div>
          <h1>Journal</h1>
          <JournalForm createJournal={createJournal}/>
          <Entries entries={entries} deleteEntries={deleteEntries} updateEntries={updateEntries}/>

        </div>
      )

}

export default App;