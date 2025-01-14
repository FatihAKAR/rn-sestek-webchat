import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useContext,
  useEffect,
} from 'react';
import {
  Modal,
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { useChat } from '../plugin/useChat';
import type { PropsModalComponent } from '../types';
import BodyComponent from './body';
import FooterComponent from './footer';
import HeaderComponent from './header';
import { styles } from './modal-style';
import CloseModal from './closeModal';
import { StyleContext } from '../context/StyleContext';
import { ModalCompRef } from '../types/components/ModalComponent';
import GenerateBody from './body/GenerateBody';

const ModalComponent = forwardRef<ModalCompRef, PropsModalComponent>(
  (props, ref) => {
    const {
      url,
      defaultConfiguration,
      sessionId,
      client,
      modules,
      customizeConfiguration,
      closeConversation,
      closedModalManagment,
      closeModal,
      visible,
      clickClosedConversationModalFunc,
    } = props;

    const [inputData, setInputData] = useState<string>('');
    const changeInputData = (text: string) => setInputData(text);

    const [messageList, sendMessage, sendAudio] = useChat({
      url: url,
      defaultConfiguration: defaultConfiguration,
      sessionId: sessionId,
      client: client,
      rnfs: modules?.RNFS,
    });

    useImperativeHandle(ref, () => ({
      messageList: messageList,
    }));

    const { appStyle, handleStyle, getCssIntegration } =
      useContext(StyleContext);

    useEffect(() => {
      (async () => {
        // if (defaultConfiguration.integrationId) {
        //   await getCssIntegration(
        //     defaultConfiguration.integrationId,
        //     customizeConfiguration
        //   );
        // } else {
        //   handleStyle(
        //     customizeConfiguration,
        //     defaultConfiguration.tenant,
        //     defaultConfiguration.projectName
        //   );
        // }

        handleStyle(
          customizeConfiguration,
          defaultConfiguration?.tenant,
          defaultConfiguration?.projectName
        );
      })();
    }, []);

    return (
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={visible && Object.keys(appStyle).length > 0}
        onRequestClose={() => {
          closeModal && closeModal();
        }}
      >
        {appStyle.closeModalSettings?.use && (
          <CloseModal
            closeModal={closedModalManagment?.closeModal}
            setCloseModal={closedModalManagment?.setCloseModal}
            closeConversation={closeConversation}
            closeModalSettings={customizeConfiguration?.closeModalSettings}
          />
        )}

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          pointerEvents="box-none"
        >
          <View
            style={[
              styles.header,
              appStyle?.headerColor
                ? { backgroundColor: appStyle?.headerColor }
                : {},
            ]}
          >
            <HeaderComponent
              closeModal={closeModal}
              clickClosedConversationModalFunc={
                clickClosedConversationModalFunc
              }
              closeModalStatus={
                customizeConfiguration?.closeModalSettings?.use ? true : false
              }
              closeConversation={closeConversation}
              headerText={appStyle?.headerText || undefined}
              hideIcon={customizeConfiguration?.headerHideIcon}
              closeIcon={customizeConfiguration?.headerCloseIcon}
            />
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor:
                appStyle?.chatBody?.type == 'color'
                  ? appStyle?.chatBody?.value
                  : '#fff',
            }}
          >
            <GenerateBody
              BodyComponent={
                <BodyComponent
                  modules={modules}
                  customizeConfiguration={customizeConfiguration}
                  messageList={messageList}
                  changeInputData={changeInputData}
                  sendMessage={sendMessage}
                />
              }
            />
          </View>
          <View
            style={[
              styles.footer,
              appStyle?.bottomColor
                ? { backgroundColor: appStyle?.bottomColor }
                : {},
            ]}
          >
            <FooterComponent
              modules={modules}
              inputData={inputData}
              changeInputData={changeInputData}
              customizeConfiguration={customizeConfiguration}
              sendMessage={sendMessage}
              sendAudio={sendAudio}
              placeholderText={appStyle?.bottomInputText}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
);

export default ModalComponent;
