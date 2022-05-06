import create from 'zustand';

interface storeProps {
  loginResponse: any;
  username: string;
  email: string;
  role: string;
}

const useStore = create<any>((set) => ({
  loggedUser: localStorage.getItem('loggedUser'),
  updateLoggedUser: (loggedUser: storeProps) => {
    console.log(loggedUser);
    localStorage.setItem(
      'loggedUser',
      JSON.stringify(loggedUser.loginResponse)
    );
    set({ username: JSON.stringify(loggedUser.loginResponse.user.username) });
  },
}));

export { useStore };
// export type { storeProps };
