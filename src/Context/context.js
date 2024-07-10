import { useContext, createContext } from 'react';

export const AppContext = createContext({
    fetchingImages: async(folder,setImagesPath)=>{},
})

export const AppContextProvider = AppContext.Provider

export function useAppContext(){
    return useContext(AppContext)
}


