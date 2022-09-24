import { Notify, Screen } from 'quasar';
let notify = null;

export const useRegXDob = () => {
  const dob =
    /^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/;
  return dob;
};

export const getNotified = (msg: string, title: string, timeOUT?: number) => {
  notify && notify();

  notify = Notify.create({
    message: `<strong>${title}</strong>`,
    position: Screen.lt.sm ? 'top' : 'bottom',
    caption: msg,
    html: true,
    type: 'negative',
    timeout: timeOUT || 5000,
    actions: [
      {
        icon: 'mdi-close-circle-outline',
        textColor: 'white',
        unelevated: true,
        round: true,
        dense: true,
      },
    ],
    classes: 'notifyCls',
  });
};
