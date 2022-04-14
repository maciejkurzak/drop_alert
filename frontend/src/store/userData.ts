import create from 'zustand';

interface storeProps {
  username: string;
  email: string;
  role: string;
}

const useStore = create<any>((set) => ({
  loggedUser: localStorage.getItem('loggedUser'),
  updateLoggedUser: (loggedUser: storeProps) => {
    // console.log(loggedUser);
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    set({ username: JSON.stringify(loggedUser) });
  },
}));

export { useStore };
// export type { storeProps };
