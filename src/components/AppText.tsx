import { StyleSheet, Text, TextProps } from 'react-native';

export function AppText({ style, ...props }: TextProps) {
  return <Text style={[styles.text, style]} {...props} />;
}

const styles = StyleSheet.create({
  text: { color: '#fff' },
});
