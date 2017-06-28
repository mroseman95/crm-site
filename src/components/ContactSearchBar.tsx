import * as React from 'react';

export interface ContactSearchBarProps {
    onChange: (search: string) => void;
}

export interface ContactSearchBarState {
    inputValue: string;
}

export default class ContactSearchBar extends React.Component<ContactSearchBarProps, ContactSearchBarState> {
    constructor(props: ContactSearchBarProps) {
        super(props);
        this.state = { inputValue: '' };
    }

    render() {
        return (
            <form>
                <input 
                    className="contact-search-bar" 
                    type="text" 
                    value={this.state.inputValue}
                    onChange={(event) => {
                        this.setState({
                            inputValue: event.target.value,
                        }, () => this.props.onChange(this.state.inputValue));
                    }}
                    maxLength={100} 
                />
                <input className="contact-search-submit" type="submit" value="Submit" />
            </form>
        );
    }
}
