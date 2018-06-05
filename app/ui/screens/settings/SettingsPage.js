// @flow
import React from 'react';
import { Colors } from '../Colors';
import { View, Text, StyleSheet, FlatList, Picker, Image } from 'react-native';
import logger from '../../../utils/Logger';
import settings from '../../../utils/Settings';
import Dropdown from '../settings/Dropdown'

export default class SettingsPage extends React.Component {

    constructor(props) {
        super(props);
        this._validateSettingsMap();
    }

    /** Settings Map Schema Info
     *  settingsOptionsMap = {
     *      <settingKey>: {                                     // Setting key has to match a key on the settings object to reference it
     *          label: <Name of setting for display>,
     *          options: [                                      // Options is an array of objects that populates the picker options
     *              { label: <Option 1>, value: <Value 1> },        // Label is what is shown to the user
     *              { label: <Option 2>, value: <Value 2> }         // Value is what is stored in the settings object                  
     *          ]
     *      }
     *  }
     */
    settingsOptionsMap = {
        logLevel: {
            label: "Log Level",
            options: [
                { label: "Error - Level 0", value: 0 },
                { label: "Notify - Level 1", value: 1 },
                { label: "Info - Level 2", value: 2 }
            ]
        },
        logLedd: {
            label: "Log Level",
            options: [
                { label: "Error - Level 0", value: 0 },
                { label: "Notify - Level 1", value: 1 },
                { label: "Info - Level 2", value: 2 }
            ]
        },
        lodddel: {
            label: "Log Level",
            options: [
                { label: "Error - Level 0", value: 0 },
                { label: "Notify - Level 1", value: 1 },
                { label: "Info - Level 2", value: 2 }
            ]
        },
    }

    _validateSettingsMap() {
        // Clone settings object to delete keys that don't need to be displayed
        let settingsClone = {...settings};
        delete settingsClone['id'];
        delete settingsClone['created'];
        
        // Check that all keys from settings exist in the options map
        for (let key in settingsClone) {
            if (!(key in this.settingsOptionsMap)) {
                console.warn("Key '" + key + "' missing from settingsOptionsMap in SettingsPage.js");
            }
        }

        // Check that all keys from options map exist in settings
        for (let key in this.settingsOptionsMap) {
            if (!(key in settingsClone)) {
                console.warn("Key '" + key + "' from settingsOptionsMap in SettingsPage.js does not exist in the settings object");
            }
        }
    }

    _keyExtractor(optionsKey, index) {
        return optionsKey;
    };

    _renderSettingsItem(optionsKey) {
        let viewObject = this.settingsOptionsMap[optionsKey];

        return (
            <View style={styles.settingsItem}>
                <View style={styles.colorBar} />
                <View style={styles.dataView}>
                    <Text style={styles.text}>
                        {viewObject.label || optionsKey}
                    </Text>
                    <Dropdown
                        style={styles.pickerWrapper}
                        pickerOptions={this.settingsOptionsMap[optionsKey].options}
                        selectedValue={settings[optionsKey]}
                        onValueChange={(itemValue, itemIndex) => {
                            console.log(itemValue, itemIndex);
                        }}
                    />
                </View>
            </View>
        );
    };

    render() {
        return(
            <View style={styles.container}>
                <FlatList 
                    data={Object.keys(this.settingsOptionsMap)}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => this._renderSettingsItem(item)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.PrimaryBackground,
        // backgroundColor: 'lightgrey',
        alignItems: 'center',
        flex: 1,
    },
    settingsItem: {
        backgroundColor: Colors.SecondaryBackground,
        marginVertical: 3,
        minHeight: 75,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingVertical: 5,
    },
    dataView: {
        width: '90%',
    },
    colorBar: {
        width: 5,
        height: '90%',
        backgroundColor: 'aquamarine',
    },
    text: {
        fontSize: 16,
        color: 'white',
    },

    pickerWrapper: {
        width: '50%',
    },
})