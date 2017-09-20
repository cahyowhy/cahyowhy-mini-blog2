import React, {Component} from 'react';
import {View} from 'react-native';
import {Footer, FooterTab, Button, Icon} from 'native-base';
import Style from '../style/style';

export default class FooterFoot extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {

    }

    render() {
        return (
            <Footer style={Style.FooterFoot}>
                <FooterTab>
                    <Button>
                        <Icon name='apps'/>
                    </Button>
                    <Button>
                        <Icon name='camera'/>
                    </Button>
                    <Button>
                        <Icon name='navigate'/>
                    </Button>
                    <Button>
                        <Icon name='person'/>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}