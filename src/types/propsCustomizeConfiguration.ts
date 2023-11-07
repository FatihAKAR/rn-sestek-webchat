export default interface PropsCustomizeConfiguration {
  headerColor?: string;
  headerText?: string;
  bottomColor?: string;
  bottomInputText?: string;
  bottomVoiceIcon?: IconType;
  bottomSendIcon?: IconType;
  userMessageBoxIcon?: IconType;
  userMessageBoxTextColor?: string;
  userMessageBoxHeaderName?: string;
  userMessageBoxHeaderNameColor?: string;
  chatBotMessageIcon?: IconType;
  chatBotMessageBoxTextColor?: string;
  chatBotMessageBoxHeaderName?: string;
  chatBotMessageBoxHeaderNameColor?: string;
  chatBotMessageBoxBackground?: string;
  chatBotMessageBoxButtonBackground?: string;
  chatBotMessageBoxButtonTextColor?: string;
  chatBody?: BodyColorOrImageType;
  chatStartButtonHide?: boolean;
  chatStartButton?: IconType;
  chatStartButtonBackground?: string;
  chatStartButtonBackgroundSize?: number;
  closeIcon?: any;
  hideIcon?: any;
  userMessageBoxBackground?: string;
  sliderMinimumTrackTintColor?: string;
  sliderMaximumTrackTintColor?: string;
  sliderThumbTintColor?: string;
  sliderPlayImage?: BodyColorOrImageType;
  sliderPauseImage?: BodyColorOrImageType;
  closeModalSettings: object;
  beforeAudioClick?: () => Promise<void>;
}

interface BodyColorOrImageType {
  type: 'image' | 'color';
  value: any;
}

export interface IconType {
  type: 'uri' | 'component';
  value: any;
}
