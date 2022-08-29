import '../styles/App.scss';
import '../styles/Filter.scss';
import { useState, useEffect } from 'react';
import callToApi from '../services/Fetch';
import ls from '../services/LocalStorage'
import InputSelect from './InputSelect';
import InputChecked from './InputChecked';
import InputText from './InputText';
import RenderCharactersData from './CharacterList';

function App() {

  const [charactersData, setCharactersData] = useState([]) // useState(ls.get('HarryPotterData', []));
  const [nameInput, setNameInput] = useState('');
  const [houseInput, setHouseInput] = useState('Gryffindor')
  const [speciesInput, setSpeciesInput] = useState('human')
  const [checkInput, setCheckInput] = useState([])


  useEffect(() => {
    callToApi()
      .then((result) => {
        setCharactersData(result);
      })
  }, [])

  // ls.set('HarryPotterData', charactersData);

  const handleResetButton = (ev) => {
    ev.preventDefault();
    setNameInput('')
    setHouseInput('Gryffindor')
    setSpeciesInput('human')
    setCheckInput([])
  }

  const handleNameInput = (ev) => {
    ev.preventDefault();
    setNameInput(ev.target.value)
  }

  const handleSelectInputForHouse = (ev) => {
    ev.preventDefault()
    setHouseInput(ev.target.value);
  }

  const handleSelectInputForSpecies = (ev) => {
    ev.preventDefault();
    setSpeciesInput(ev.target.value);
  }

  const handleClickCheck = (value) => {

    if (checkInput.includes(value)) {
      const newList = checkInput.filter(item => item !== value)
      console.log('value del check clicked is :' + newList);
      setCheckInput(newList)
    } else {
      setCheckInput([...checkInput, value])
      console.log('else del if' + value);
    }

  }


  const filteredHouse = (characterList) => {
    const properties = characterList.map((item) => item.house)
    const setproperty = new Set(properties)
    const arrayOfSetedProperty = Array.from(setproperty)

    return arrayOfSetedProperty
  }

  const filteredSpecies = (characterList) => {
    const properties = characterList.map((item) => item.species)
    const setproperty = new Set(properties)
    const arrayOfSetedProperty = Array.from(setproperty)

    return arrayOfSetedProperty
  }

  const filterCards = charactersData
    .filter((character) => {
      if (houseInput === 'all') {
        return true
      } else {
        return (character.house === houseInput)
      }
    }
    ).filter((character) => {
      if (speciesInput === 'all') {
        return true
      } else {
        return (character.species === speciesInput)
      }
    }
    ).filter((item) => item.name.toLowerCase().includes(nameInput.toLowerCase()))



  return (


    <div className='app'>
      <header>
        <h1 className='header-title'>Harry Potter Characters</h1>
      </header>

      <form className='form'>

        <fildset className='input-name'>

          <InputText
            labelText={'Nombre: '}
            inputId={'name'}
            placeholder={'Escribe un nombre '}
            inputValue={nameInput}
            onChange={handleNameInput}
            classNameInput={'form-text-input'}
            classNameLabel={'form-text-label'}
          />

        </fildset>
        <InputSelect
          labelText={'Casas: '}
          optionsArray={filteredHouse(charactersData)}
          value={houseInput}
          onChange={handleSelectInputForHouse}
        />

        <InputSelect
          labelText={'Especie: '}
          optionsArray={filteredSpecies(charactersData)}
          value={speciesInput}
          onChange={handleSelectInputForSpecies}
        />

        <InputChecked
          labelText={'Especie: '}
          optionsArray={filteredSpecies(charactersData)}
          value={checkInput}
          handleChecked={handleClickCheck}
        />

        <button className='form-button' onClick={handleResetButton}>Resest Filters</button>

      </form>



      <RenderCharactersData
        // onClick={handleCardClick}
        filterCards={filterCards}
        texInputValue={nameInput}
      />



      <footer className='footer'>
        <a
          href="#top"
          className="footer-arrow">
          <i className="fa-solid fa-arrow-up fa-xl footer-arrow" title="Ir arriba"></i>
        </a>
      </footer>

    </div>
  );
}

export default App;
