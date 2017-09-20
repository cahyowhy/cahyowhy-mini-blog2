import Dimensions from 'Dimensions';
import {StyleSheet} from 'react-native';

const fullwidth = Dimensions.get('window').width;
const fullheight = Dimensions.get('window').height;
const grey = "#EAEAEA";
const Style = {
    DrawerContent: {
        marginTop: 55,
        marginBottom: 30
    },
    TabItemTop: {
        borderRightWidth: 0,
        borderLeftWidth: 0
    },
    FooterFoot: {
        position: 'absolute', flex: 0.1, left: 0, right: 0, bottom: 0, backgroundColor: 'green',
        flexDirection: 'row', height: 50, alignItems: 'center'
    },
    borderBottomDefault: {
        borderBottomColor: grey,
        borderBottomWidth: 1
    },
    textHeader: {
        color: '#FFFFFF',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 20
    },
    hide: {
        display: 'none'
    },
    visible: {
        flex: 1
    },
    noPadding: {
        padding: 0
    },
    listItemNavSub: {
        paddingLeft: 28,
        paddingRight: 36,
        borderBottomColor: 'transparent'
    },
    childListTextNav: {
        textAlign: 'left'
    },
    noMargin: {
        margin: 0
    },
    noBorderBottom: {
        borderBottomColor: 'transparent'
    },
    leftDrawerMain: {
        left: -fullwidth * 0.8,
    },
    cardContentEmpty: {
        padding: 16
    },
    DrawerMain: {
        width: fullwidth * 0.8,
        height: fullheight,
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 21
    }
};
export default Style;
