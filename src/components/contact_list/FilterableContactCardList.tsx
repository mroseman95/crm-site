import * as React from 'react';
import Contact from '../../types/Contact';
import ContactSearchBar from './ContactSearchBar';
import ContactCardList from './ContactCardList';

export interface FilterableContactCardListProps {
    contacts: Contact[];
    onContactEdit: (contact: Contact) => void;
}

export interface FilterableContactCardListState {
    contacts: Contact[];
}

export default class FilterableContactCardList extends React.Component<FilterableContactCardListProps, FilterableContactCardListState> {
    constructor(props: FilterableContactCardListProps) {
        super(props);
        this.state = {
            contacts: this.props.contacts,
        };

        this.handleSearchInput = this.handleSearchInput.bind(this);
    }

    handleSearchInput(search: string) {
        // TODO search through all emails, not jsut primary
        // same for company
        this.setState({
            contacts: search ? this.props.contacts.filter((contact) => { 
                return (
                    contact.firstName + ' ' + contact.lastName).toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
                    contact.email[contact.primaryEmail].toUpperCase().indexOf(search.toUpperCase()) !== -1 ||
                    contact.company[contact.primaryCompany].toUpperCase().indexOf(search.toUpperCase()) !== -1;
            }) : this.props.contacts,
        });
    }

    render() {
        return (
            <div className="filterable-contact-card-list">
                <ContactSearchBar onChange={this.handleSearchInput}/>
                <ContactCardList contacts={this.state.contacts} onContactCardEdit={this.props.onContactEdit}/>
            </div>
        );
    }
}