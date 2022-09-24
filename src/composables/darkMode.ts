export const darkModeState = () => {
  const $q = useQuasar(),
    dark = ref(false),
    setDark = () => {
      dark.value = LocalStorage.getItem('isDark') || false;
      $q.dark.set(dark.value);
      // classDark()
    };

  onMounted(() => {
    setDark();
    classDark(dark.value);
  });

  watch(dark, (val) => {
    LocalStorage.set('isDark', val);
    $q.dark.set(val);
    classDark(dark.value);
  });

  return dark;
};

function classDark(isDark: boolean) {
  if (isDark) {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
  } else {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
  }
}
