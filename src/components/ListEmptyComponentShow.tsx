import { StyleSheet, View } from 'react-native';
import { AppText } from './AppText';

export default function ListEmptyComponentShow() {

    const styles = StyleSheet.create({
        container: {
        flex: 1,
        paddingTop: 22,
        alignItems: "center"
    }
    });
    return (
        <View style={styles.container}>
            <AppText>There are no Items to show!</AppText>
        </View>
    );
};
