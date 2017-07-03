import * as React from 'react';
import Contact from '../types/Contact';
import FilterableContactCardList from './FilterableContactCardList';
import ContactForm from './ContactForm';

export interface ContactManagementProps {
    initialContacts: Contact[];
}

export interface ContactManagementState {
    contacts: Contact[];
}


export default class ContactManagement extends React.Component<ContactManagementProps, ContactManagementState> {
    constructor(props: ContactManagementProps) {
        super(props);
        this.state = {
            contacts: props.initialContacts,
        };

        this.handleNewContact = this.handleNewContact.bind(this);
    }


    handleNewContact(contact: Contact) {
        let newContacts: Contact[] = this.state.contacts;
        newContacts.push(contact);
        this.setState({
            contacts: newContacts,
        });
    }

    render() {
        return (
            <div className="contact-management">
                <ContactForm newContact={true} onSubmit={this.handleNewContact} />
                <FilterableContactCardList contacts={this.state.contacts} />
            </div>
        );
    }
}