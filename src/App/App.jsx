import './App.css';
import React from 'react';
import '../fonts/roboto/roboto.css'
import '../fonts/roboto-slab/robotoslab.css'
import '../fonts/source_sans_pro/source_sans_pro.css'
import { ExchangeForm } from '../ExchangeForm/ExchangeForm'
import Api from '../Api/Api'

function App() {
  const api = new Api()
  const [cards, setCards] = React.useState([])
  const [initialCurrencyRight, setInitialCurrencyRight] = React.useState(null)
  const [initialCurrencyLeft, setInitialCurrencyLeft] = React.useState(null)
  const [error, setError] = React.useState(false)
  const [allValues, setAllValues] = React.useState({
    rightValue: '',
    leftValue: '',
  })
  const [minAmount, setMinAmount] = React.useState(0)

  const valuesInputChange = React.useCallback((e) => {
    const { name, value } = e.target;
    setAllValues(prevState => ({ ...prevState, [name]: value }))
  }, [setAllValues])

  React.useEffect(() => {
    api.getAllCurrencies('https://api.changenow.io/v1/currencies?active=true')
      .then(array => {
        const currentArr = array.filter(item => item.featured)
        setInitialCurrencyRight(currentArr[0])
        setInitialCurrencyLeft(currentArr[0])
        setCards(currentArr)
      })
      .catch(err => console.log(err))
  }, [])

  const getCurrencyRight = (currency) => {
    setInitialCurrencyRight(currency)
  }

  const getCurrencyLeft = (currency) => {
    setInitialCurrencyLeft(currency)
  }

  React.useEffect(() => {
    if (initialCurrencyLeft && initialCurrencyRight && initialCurrencyLeft !== initialCurrencyRight) {
      api.minimalExchangeAmount(initialCurrencyLeft.ticker, initialCurrencyRight.ticker)
        .then(amount => {
          if (!amount) {
            setError(true)
            return
          } else {
            setError(false)
          }
          setMinAmount(amount.minAmount)
          setAllValues({
            rightValue: amount.minAmount,
            leftValue: allValues.leftValue
          })
        })
        .catch(err => console.log(err))
    }
  }, [initialCurrencyLeft, initialCurrencyRight])

  const handlesubmit = () => {
    if (allValues.leftValue && allValues.rightValue) {
      if (Number(allValues.leftValue) > Number(minAmount)) {
        api.estimatedExchangeAmount(initialCurrencyLeft.ticker, initialCurrencyRight.ticker, Number(allValues.leftValue) + Number(allValues.rightValue))
          .then(estimate => {
            setAllValues({
              rightValue: estimate.estimatedAmount,
              leftValue: allValues.leftValue,
            })
          })
          .catch(err => {
            console.log(err)
            setError(true)
          })
      } else {
        setAllValues({
          rightValue: '-',
          leftValue: '',
        })
        setError(false)
      }
    } else {
      setError(true)
    }
  }


  return (
    <section className="app" >
      <div className="app__content">
        <h1 className="app__title">Crypto Exchange</h1>
        <p className="app__subtitle">Exchange fast and easy</p>
        <ExchangeForm
          nameInputRight={'rightValue'}
          nameInputLeft={'leftValue'}
          rightValue={allValues.rightValue}
          rightChangeInput={valuesInputChange}
          leftChangeInput={valuesInputChange}
          leftValue={allValues.leftValue}
          data={cards}
          getCurrencyRight={getCurrencyRight}
          getCurrencyLeft={getCurrencyLeft}
          initialCurrencyLeft={initialCurrencyLeft}
          error={error}
          handlesubmit={handlesubmit}
          initialCurrencyRight={initialCurrencyRight} />
      </div>
    </section>
  );
}

export default App;
