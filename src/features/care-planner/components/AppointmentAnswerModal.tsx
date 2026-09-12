import { AudioModule, RecordingPresets, setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus, useAudioRecorder, useAudioRecorderState } from 'expo-audio';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, View } from 'react-native';

import type { AppointmentAnswer, AppointmentQuestion } from '../CarePlanner.types';
import { styles } from './CarePlanner.styles';
import { CareButton, CareField } from './CarePlannerUI';

export default function AppointmentAnswerModal({ question, answer, onSave, onClose }: { question: AppointmentQuestion; answer?: AppointmentAnswer; onSave: (answer: AppointmentAnswer) => void; onClose: () => void }) {
  const [text, setText] = useState(answer?.text ?? '');
  const [audioUri, setAudioUri] = useState(answer?.audioUri);
  const [busy, setBusy] = useState(false);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState('');
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);
  const player = useAudioPlayer(audioUri ?? null);
  const playerStatus = useAudioPlayerStatus(player);

  useEffect(() => () => { void setAudioModeAsync({ allowsRecording: false }).catch(() => {}); }, []);

  const record = async () => {
    setError(''); setBusy(true);
    try {
      if (recording) {
        await recorder.stop();
        setRecording(false);
        if (recorder.uri) setAudioUri(recorder.uri);
        await setAudioModeAsync({ allowsRecording: false });
      } else {
        player.pause();
        const permission = await AudioModule.requestRecordingPermissionsAsync();
        if (!permission.granted) { setError('Microphone access was not allowed. You can still type the answer.'); return; }
        await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true, shouldPlayInBackground: false });
        await recorder.prepareToRecordAsync();
        recorder.record();
        setRecording(true);
      }
    } catch { setError('The recording could not be completed. Please try again or type the answer.'); }
    finally { setBusy(false); }
  };

  const listen = async () => {
    setError('');
    try {
      if (playerStatus.playing) { player.pause(); return; }
      await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true });
      if (playerStatus.didJustFinish || playerStatus.currentTime >= playerStatus.duration) await player.seekTo(0);
      player.play();
    } catch { setError('This recording could not be played. Please try again.'); }
  };

  const close = async () => {
    if (busy) return;
    if (recording) {
      setBusy(true);
      try { await recorder.stop(); }
      catch { setError('Please stop the recording before closing.'); setBusy(false); return; }
    }
    player.pause();
    onClose();
  };

  return <Modal visible transparent animationType="fade" onRequestClose={close}>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalBackdrop}>
      <View accessibilityViewIsModal style={styles.modalCard}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.group}>
          <Text accessibilityRole="header" style={styles.cardTitle}>Doctor’s answer</Text>
          <Text style={styles.value}>{question.text}</Text>
          <CareField label="Answer" placeholder="Enter the doctor’s answer" multiline style={styles.answerInput} value={text} onChangeText={setText} />
          <CareButton label={busy ? 'Please wait…' : recording ? 'Stop recording' : audioUri ? 'Record a replacement' : 'Record answer'} outline disabled={busy} onPress={record} />
          {recording ? <Text accessibilityLiveRegion="polite" style={styles.error}>Recording · {Math.floor(recorderState.durationMillis / 1000)} seconds</Text> : null}
          {audioUri && !recording ? <>
            <CareButton label={playerStatus.playing ? 'Pause recording' : 'Listen to doctor’s answer'} outline disabled={busy} onPress={listen} />
            <CareButton label="Remove recording" outline disabled={busy} onPress={() => { player.pause(); setAudioUri(undefined); }} />
          </> : null}
          <Text style={styles.muted}>You can type an answer or keep a voice recording. Automatic transcription is not available.</Text>
          {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
        </ScrollView>
        <View style={styles.row}>
          <View style={styles.flex}><CareButton label="Cancel" outline disabled={busy} onPress={close} /></View>
          <View style={styles.flex}><CareButton label="OK" disabled={busy || recording || (!text.trim() && !audioUri)} onPress={() => { player.pause(); onSave({ text: text.trim(), audioUri }); }} /></View>
        </View>
      </View>
    </KeyboardAvoidingView>
  </Modal>;
}
