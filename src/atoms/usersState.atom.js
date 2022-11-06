const { atom } = require('recoil');

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

const userStateAtom = atom({
  key: 'userStateAtom',
  default: '',
  effects: [localStorageEffect('current_user')],
});

export default userStateAtom;
