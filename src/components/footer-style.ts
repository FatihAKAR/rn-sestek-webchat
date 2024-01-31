import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  textInput: {
    color: 'black',
    backgroundColor: 'white',
    height: '100%',
    padding: 5,
    // borderRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: 10,
  },
  SendButtonIcon: {
    width: 25,
    height: 25,
  },
  MicButtonIcon: {
    width: 25,
    height: 25,
  },
  audioButton: {
    height: '100%',
    width: 25,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingRight: 10,
    borderWidth: 0,
  },
  sendButton: {
    height: '100%',
    width: 53,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    border: 'none',
    borderRadius: 10,
  },
});
