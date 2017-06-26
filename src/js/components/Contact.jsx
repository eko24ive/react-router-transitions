import React, {Component} from 'react';
import Contacts from "../contacts";

export default class Contact extends Component {
  constructor(props) {
    super(props);

    this.contacts = Contacts;
  }

  getContacts() {
    return (
      <ul>
        {this.contacts.map((contact, index) => {
          return (
            <li key={index}>
              {contact.name}
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    return (
      <div>
        {this.getContacts()}
      </div>
    );
  }
}