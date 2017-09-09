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
    borderBottomDefault: {
        borderBottomColor: grey,
        borderBottomWidth: 1
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
    DrawerMain: {
        width: fullwidth * 0.8,
        height: fullheight,
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 21
    }
};
export default Style;
