# rn-sestek-webchat



 <img src="https://github.com/sestek/rn-sestek-webchat/assets/54579230/a6c0cee3-0711-4d3b-affd-1080950cd82c" width="250" height="473" />
 <img src="https://github.com/sestek/rn-sestek-webchat/assets/54579230/30a4e24a-558e-4206-90c9-bcce8920d831" width="250" height="473" />
 <img src="https://github.com/sestek/rn-sestek-webchat/assets/54579230/e845fa51-8736-452d-b541-9a74367f4876" width="250" height="473" />


## Install

```
npm install rn-sestek-webchat --save
```

###  If you want to send and listen audio you have to follow the steps below
##### Step 1: Install react-native-audio-recorder-player && Install react-native-audio-record
```
npm install react-native-audio-recorder-player@3.4.0
```

```
npm i --save  react-native-audio-record@0.2.2
```

- To record and " listen " audio, you need to install the package above and [click this link](https://www.npmjs.com/package/react-native-audio-recorder-player) to make the necessary integrations.
- To record and "send " audio, you need to install the package above and [click this link](https://www.npmjs.com/package/react-native-audio-record) to make the necessary integrations.

##### Step 2: Install react-native-fetch-blob

```
npm i --save react-native-fetch-blob@0.10.8
```

If you want to send audio, you must also install the "react-native-fetch-blob" package. Because it is needed to keep the recorded audio in the cache and listen again.
You can follow the [link](https://www.npmjs.com/package/react-native-fetch-blob) below to integrate

##### Step 3: Install react-native-slider

```
npm i --save @miblanchard/react-native-slider
```

If you use to slider, you must also install the "@miblanchard/react-native-slider" package. You can follow the [link](https://www.npmjs.com/package/@miblanchard/react-native-slider) below to integrate

### Listening to event from conversation
You can easily catch the event with the responseData state you create in your code. 
Create the state, then update your state in the setResponse function and send this function to ChatModal as props. 
You can also provide whether the state has changed or not with your useffect or alternative solutions.

### custom ActionData
The CustomActionData field can be used for any custom information wanted to be passed to the bot, that's not included in the context object parameters.  
It is recommended to be sent in key/value pairs. i.e.
customActionData: "{\"channel\":\"xxx\",\"phoneNumber\":\"xxx xxx xx xx\",\"customerName\":\"John Doe\"}",

## Usage

You may have a general understanding of how it works with the following snippet.

```javascript
import { ChatModal, ChatModalRef } from 'rn-sestek-webchat';
import AudioRecorderPlayer from 'react-native-audio-recorder-player'; //Required package to listen to audio files
import RNFetchBlob from 'react-native-fetch-blob'; //Required package to listen to audio files
import AudioRecord from 'react-native-audio-record'; //Required package to send audio files as waw
import AudioRecord from 'react-native-audio-record'; //Required package to send audio files as waw

const modalRef = useRef<ChatModalRef>(null);

const pressStartConversation = () => {
    modalRef.current?.startConversation();
}; // open chat wherever you want

const pressEndConversation = () => {
    if (!modalRef.current?.conversationStatus) {
      showMessage({
        backgroundColor: '#7f81ae',
        description: 'The conversation has already ended.',
        message: 'Warning',
      });
    }
    modalRef.current?.endConversation();
}; // stop chat anywhere you want

// capture event from conversation
const [responseData, setResponseData] = useState<any>({});
const setResponse = (value: any) => {
    setResponseData(value);
};

useEffect(() => {
    console.log('response event : ', modalRef.current.responseData);
}, [responseData]);

const pressTriggerVisible = () => {
    if (!modalRef.current?.conversationStatus) {
      showMessage({
        backgroundColor: '#7f81ae',
        description: 'First you need to start the conversation.',
        message: 'Warning',
      });
      return;
    }
    modalRef.current?.triggerVisible();
}; // hide chat anywhere you want

const pressGetMessageList = () => {
    const data = modalRef.current?.messageList;
    console.log(JSON.stringify(data));
}; // conversation history

const permissionAudioCheck = async () => {
  return new Promise<void>((resolve, reject) => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ).then(res => {
        if (res === PermissionsAndroid.RESULTS.GRANTED) {
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
}; // example check audio permission controller for android


const customActionDataExample = {
    tel: '900000000000',
}; // send webchat custom action data


 <ChatModal
  url={`https://eu.va.knovvu.com/webchat/chathub`}
  modules={{
    AudioRecorderPlayer: AudioRecorderPlayer,
    RNFS: RNFetchBlob,
    RNSlider: Slider,
    RNWebView: null,
    Record: AudioRecord,
  }}
  ref={modalRef}
  defaultConfiguration={{
    sendConversationStart: true,
    tenant: 'Demo',
    projectName: 'MasterBankingDemo_1_0',
    channel: 'Mobil',
    clientId: 'mobile-testing',
    enableNdUi: true,
    getResponseData: setResponse,
    customActionData: JSON.stringify(customActionDataExample),
  }}
  customizeConfiguration={{
    // Header
    headerColor: '#7743DB',
    headerText: 'Knovvu',
    headerTextColor: 'white',
    headerHideIcon: {
      type: 'component',
      value: require('./src/images/hide.png'),
    },
    headerCloseIcon: {
      type: 'component',
      value: require('./src/images/close.png'),
    },
    // Bottom
    bottomColor: 'white',
    bottomInputText: 'Bottom input text..',
    bottomInputBorderColor: '#d5d5d5',
    bottomInputSendButtonColor: '#7743DB',
    // User MessageBox
    userMessageBoxBackground: '#863CEB',
    userMessageBoxTextColor: 'white',
    userMessageBoxIcon: {
      type: 'uri',
      value: '',
    },
    userMessageBoxHeaderName: '',
    userMessageBoxHeaderNameColor: 'white',
    // ChatBot MessageBox
    chatBotMessageBoxBackground: '#EFEFEF',
    chatBotMessageBoxTextColor: 'black',
    chatBotMessageIcon: {
      type: 'component',
      value: require('./src/images/knovvu_logo.png'),
    },
    chatBotMessageBoxHeaderName: 'Knovvu',
    chatBotMessageBoxHeaderNameColor: 'black',
    chatBotMessageBoxButtonBackground: 'white',
    chatBotMessageBoxButtonTextColor: 'black',
    chatBotMessageBoxButtonBorderColor: '#863CEB',
    // Chat Body
    chatBody: {type: 'color', value: 'white'},
    // Chat Start Button
    chatStartButton: {
      type: 'component',
      value: require('./src/images/knovvu_logo.png'),
    },
    chatStartButtonBackground: 'white',
    chatStartButtonBackgroundSize: 70,
    chatStartButtonHide: false,
    // Slider
    sliderMaximumTrackTintColor: 'white',
    sliderThumbTintColor: '#C3ACD0',
    sliderMinimumTrackTintColor: '#C3ACD0',
    sliderPauseImage: {
      type: 'image',
      value: require('../src/image/pause-audio.png'),
    },
    sliderPlayImage: {
      type: 'image',
      value: require('../src/image/play-audio.png'),
    },
    // Before Func
    permissionAudioCheck: permissionAudioCheck,
    // Close Modal
    closeModalSettings: {
      use: true,
      text: "Chat'ten çıkmak istediğinize emin misiniz ?",
      textColor: 'black',
      background: 'white',
      buttons: {
        yesButton: {
          text: 'Evet',
          textColor: 'white',
          background: '#863CEB',
          borderColor: 'transparent',
        },
        noButton: {
          text: 'Hayır',
          textColor: 'black',
          background: 'transparent',
          borderColor: '#863CEB',
        },
      },
    },
  }}
/>
```

For other additional information, we have created a document that you can use in the table below.

| props              | type    | description                                                                                                                  |
| ------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| startConversation  | void    | Function that starts the chat for the user and automatically triggers the modal screen.                                      |
| endConversation    | void    | Function that ends the chat for the user and automatically closes the modal screen.                                          |
| triggerVisible     | void    | Function that opens and closes the modal screen after the chat starts and continues the conversation from where it left off. |
| messageList        | any     | Returns the active chat history.                                                                                             |
| conversationStatus | boolean | Indicates whether there is an active conversation or not.                                                                    |

