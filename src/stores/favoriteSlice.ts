import { StateCreator } from "zustand"
import { Recipe } from "../types"
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice"
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice"

export type FavoriteSliceType = {
  favorites: Recipe[]
  handleClickFavorite: (recipe: Recipe) => void
  favoriteExists: (id: Recipe['idDrink']) => boolean
  loadFromStorage: () => void
}

export const createFavoritesSlice: StateCreator<FavoriteSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoriteSliceType> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExists(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
      }))
      createNotificationSlice(set, get, api).showNotification({ text: 'Se elimino de favoritos', error: false })
    } else {
      console.log('no existe')
      set((state) => ({
        //favorites: [...get().favorites, recipe]
        favorites: [...state.favorites, recipe]
      }))
      createNotificationSlice(set, get, api).showNotification({ text: 'Se agrego de favoritos', error: false })

    }
    createRecipesSlice(set, get, api).closeModal()
    localStorage.setItem('favorites', JSON.stringify(get().favorites))
  },
  favoriteExists: (id) => {
    return get().favorites.some(favorite => favorite.idDrink === id)
  },
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem('favorites') ?? '[]'
    set({
      favorites: JSON.parse(storedFavorites)
    })
  }
})

// Slice pattern