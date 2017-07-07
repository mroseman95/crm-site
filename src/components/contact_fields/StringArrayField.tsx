import * as React from 'react';
import * as _ from 'lodash';

import StringArrayFieldElement from './StringArrayFieldElement';

export interface StringArrayFieldProps {
    name: string;
    label: string;
    initialValue: string[];
    handleChange: (name: string, value: string[]) => void;
    isMultiline?: boolean;
}

export interface StringArrayFieldState {
    values: string[];
    uuids: string[];
}

export default class StringArrayField extends React.Component<StringArrayFieldProps, StringArrayFieldState> {
    constructor(props: StringArrayFieldProps) {
        super(props);
        let initialUUIDs = props.initialValue.map(() => {
            return _.uniqueId(this.props.label);
        });
        this.state = {
            values: props.initialValue,
            uuids: initialUUIDs,
        }

        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleArrayFieldElementChange = this.handleArrayFieldElementChange.bind(this);
        this.handleAddButtonPress = this.handleAddButtonPress.bind(this);
        this.handleDeleteButtonPress = this.handleDeleteButtonPress.bind(this);
    }

    handleStateChange() {
        this.props.handleChange(this.props.name, this.state.values);
    }

    handleArrayFieldElementChange(uuid: string, newValue: string) {
        this.setState({
            values: this.state.values.map((value: string, index: number) => {
                return this.state.uuids[index] == uuid ? newValue: value;
            }),
        }, this.handleStateChange);
    }

    handleAddButtonPress(uuid: string) {
        this.setState({
            values: this.state.values.concat(['']),
            uuids: this.state.uuids.concat([_.uniqueId(this.props.label)]),
        }, this.handleStateChange);
    }

    handleDeleteButtonPress(uuid: string) {
        let index = this.state.uuids.indexOf(uuid);
        let newValues = this.state.values;
        newValues.splice(index, 1);
        let newUUIDs = this.state.uuids;
        newUUIDs.splice(index, 1);
        this.setState({
            values: newValues,
            uuids: newUUIDs,
        }, this.handleStateChange);
    }

    render() {
        return (
            <div className="add-contact-label-field">
                <div className="add-contact-label add-contact-label-stars">
                    <div className="add-contact-string-array-label">
                        <label>{this.props.label}</label>
                    </div>
                    <div className="add-contact-stars">
                        <div className="add-contact-star" />
                    </div>
                </div>
                <div className="add-contact-array-fields">
                    {
                        this.state.values.map((value: string, index: number) => {
                            return (
                                <StringArrayFieldElement
                                    key={this.state.uuids[index]}
                                    uuid={this.state.uuids[index]}
                                    initValue={value}
                                    firstElement={index == 0}
                                    includeDeleteButton={this.state.values.length > 1}
                                    handleChange={this.handleArrayFieldElementChange}
                                    handleAddButton={this.handleAddButtonPress}
                                    handleDeleteButton={this.handleDeleteButtonPress}
                                    isMultiline={this.props.isMultiline ? true : false}
                                />
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
