import React, { Component } from "react";
import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null };
    this.getCard = this.getCard.bind(this);
  }
  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState({ deck: deck.data, drawn: [] });
  }

  async getCard() {
    //make request using Deck ID
    //https://deckofcardsapi.com/api/deck/<<deck_id>>/draw
    let id = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_BASE_URL}/${id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) {
        throw new Error("No more cards remaining.");
      }
      console.log(cardRes);

      let card = cardRes.data.cards[0];
      this.setState(st => ({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }));
    } catch (err) {
      alert(err);
    }
  }

 

  render() {
    return (
      <div>
        <h1>Card Dealer</h1>
        <button onClick={this.getCard}></button>
      </div>
    );
  }
}

export default Deck;
