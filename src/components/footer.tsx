import React, { FC, useState, useContext } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import type { PropsFooterComponent } from 'src/types';
import { styles } from './footer-style';
import {
  RecordInIcon,
  RecordOutIcon,
  RecordDisable,
  SendIconWhite,
} from '../image';
import { Recorder } from '../services';
import { StyleContext } from '../context/StyleContext';

const FooterComponent: FC<PropsFooterComponent> = (props) => {
  const {
    modules,
    sendAudio,
    inputData,
    sendMessage,
    changeInputData,
    customizeConfiguration,
    placeholderText,
  } = props;
  const Record =
    modules?.AudioRecorderPlayer && modules?.RNFS
      ? new Recorder(
          modules?.AudioRecorderPlayer,
          modules?.RNFS,
          modules?.Record
        )
      : undefined;

  const [recorder] = useState<Recorder | undefined>(Record);
  const [recordStart, setRecordStart] = useState<boolean>(false);
  const [disableRecord, setDisableRecord] = useState<boolean>(false);

  const { appStyle } = useContext(StyleContext);

  const triggerRecord = async () => {
    if (disableRecord) {
      return;
    }

    if (recordStart) {
      setDisableRecord(true);
      var result = await recorder?.onStopRecord();
      const dirFile = result?.url?.split('/');
      if (dirFile) {
        sendAudio &&
          sendAudio(result?.url, dirFile[dirFile.length - 1], result?.data);
        setTimeout(() => {
          setDisableRecord(false);
        }, 3500);
      }
    } else {
      recorder?.onStartRecord();
    }
    setRecordStart((old) => !old);
  };

  const clickSendButton = () => {
    if (!inputData) return;
    sendMessage && sendMessage(inputData && inputData);
    changeInputData && changeInputData('');
  };

  const touchRecord = () => {
    if (customizeConfiguration?.permissionAudioCheck) {
      customizeConfiguration.permissionAudioCheck().then(() => triggerRecord());
    } else {
      triggerRecord();
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <TextInput
          style={[
            styles.textInput,
            {
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderLeftWidth: 1,
              borderColor: appStyle?.bottomInputBorderColor,
              borderTopRightRadius: recorder ? 0 : 10,
              borderBottomRightRadius: recorder ? 0 : 10,
              borderRightWidth: recorder ? 0 : 1,
            },
          ]}
          value={inputData && inputData}
          onChangeText={(text: string) =>
            changeInputData && changeInputData(text)
          }
          placeholder={
            (placeholderText && placeholderText) || 'Please write a message'
          }
          placeholderTextColor="grey"
          keyboardType="default"
        />
      </View>
      {modules?.AudioRecorderPlayer && modules?.RNFS && (
        <TouchableOpacity
          onPress={() => touchRecord()}
          style={[
            styles.audioButton,
            {
              borderRightWidth: 1,
              borderColor: appStyle?.bottomInputBorderColor,
              borderBottomWidth: 1,
              borderTopWidth: 1,
            },
          ]}
        >
          <Image
            style={styles.MicButtonIcon}
            source={
              recordStart
                ? RecordInIcon
                : disableRecord
                ? RecordDisable
                : RecordOutIcon
            }
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={clickSendButton}
        style={[
          styles.sendButton,
          { backgroundColor: appStyle?.bottomInputSendButtonColor },
        ]}
      >
        <Image style={[styles.SendButtonIcon]} source={SendIconWhite} />
      </TouchableOpacity>
    </View>
  );
};

export default FooterComponent;
