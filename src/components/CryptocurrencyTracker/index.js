// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CryptocurrenciesList from '../CryptocurrenciesList'

const apiUrl = 'https://apis.ccbp.in/crypto-currency-converter'

class CryptocurrencyTracker extends Component {
  state = {cryptocurrenciesData: [], isLoading: true}

  componentDidMount() {
    this.getCryptocurrencies()
  }

  getCryptocurrencies = async () => {
    const response = await fetch(apiUrl)
    const data = await response.json()

    this.setState({
      cryptocurrenciesData: data.map(eachCryptocurrency => ({
        id: eachCryptocurrency.id,
        currencyName: eachCryptocurrency.currency_name,
        currencyLogoUrl: eachCryptocurrency.currency_logo,
        usdValue: eachCryptocurrency.usd_value,
        euroValue: eachCryptocurrency.euroValue,
      })),
      isLoading: false,
    })
  }

  renderCryptoCurrenciesList = () => {
    const {cryptocurrenciesData} = this.state

    return <CryptocurrenciesList cryptocurrenciesData={cryptocurrenciesData} />
  }

  renderLoader = () => {
    ;<div data-testid="loader">
      <Loader type="Rings" color="#ffffff" />
    </div>
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="app-container">
        {isLoading ? this.renderLoader() : this.renderCryptoCurrenciesList()}
      </div>
    )
  }
}
export default CryptocurrencyTracker
