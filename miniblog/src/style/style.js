import Dimensions from 'Dimensions';
import {StyleSheet} from 'react-native';

const fullwidth = Dimensions.get('window').width;
const fullheight = Dimensions.get('window').height;
const created_at = {fontWeight: '300', fontSize: 13, color: '#555'};
const grey = "#EAEAEA";
const Style = {
    DrawerContent: {
        ...StyleSheet.absoluteFillObject,
        width: fullwidth * 0.8,
        backgroundColor: 'white',
        height: fullheight - 50,
        marginTop: 50,
        zIndex: 0,
        paddingTop: 8,
        paddingBottom: 8,
    },
    images: {height: 200, width: null, flex: 1},
    postContent: {
        title: {
            color: '#111',
            marginBottom: 8,
            fontSize: 18,
            fontWeight: '700'
        },
        detail: {
            textAlign: 'justify',
            color: '#555',
            fontWeight: '300'
        }
    },
    blackColor: {color: '#000'},
    LiDrawCont: {borderBottomColor: 'transparent', borderBottomWidth: 0},
    formLogin: {
        item1: {borderBottomWidth: 0},
        item1Text: {fontSize: 30, color: '#111', borderBottomWidth: 4, borderBottomColor: '#111'},
        item2: {marginTop: 16},
        item4: {borderBottomWidth: 0, marginTop: 16, paddingRight: 8},
        item4Button: {flex: 1}
    },
    bg: {
        flex: 1, backgroundColor: '#eaeaea'
    },
    profileUser: {
        detail: {
            padding: 16
        },
        username: {
            marginTop: 8,
            color: '#111',
            fontWeight: '700'
        },
        colLeft: {
            width: fullwidth * 0.4
        },
        folWrapper: {
            alignItems: 'center',
            alignSelf: 'center',
            padding: 4,
            borderColor: '#c4c4c4',
            borderWidth: 1,
            borderRadius: 12
        },
        folTextDet: created_at,
        folTextTotal: {
            fontWeight: '700',
            fontSize: 18
        },
        btnEditProd: {
            borderColor: '#111',
        }
    },
    cardUser: [
        {fontWeight: '700', color: '#000'}, //for username
        created_at //for created_at
    ],
    FavWrapper: [
        {backgroundColor: '#FF4181'}, //for button fav
        created_at
    ],
    fontCreatedAt: created_at,
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
