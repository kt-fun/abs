import {BSBeatMap} from "@/interfaces/beatmap";
import {create} from "zustand";

interface BeatMapProps {
  beatmaps: BSBeatMap[],
  isLoading: boolean,
}

interface BeatMapAction {
  refresh: ()=>void,
  loadMore: ()=>void,
  addBeatmaps:(beatmaps:BSBeatMap[])=>void
}

export const useBeatMapStore =
  create<BeatMapProps & BeatMapAction>((set) => ({
    beatmaps: [],
    isLoading:false,
    refresh: async () => {
      set((state) => ({
        ...state,
        isLoading:true
      }))
      // const trunks = await fetchBeatMap()
      // await load user
      set((state) => ({
        beatmaps: [],
        isLoading: false
      }))
    },
    loadMore: async () => {
      set((state) => ({
        ...state,
        isLoading:true
      }))
      // const trunks = await fetchBeatMap()
      // await load user
      set((state) => ({
        beatmaps: [],
        isLoading: false
      }))
    },
    addBeatmaps: (beatmaps:BSBeatMap[])=> {
      set(
        (state) => ({
          isLoading:false,
          trunks: [...state.beatmaps, beatmaps]
        })
      )
    },
  }))


export const useBeatmaps = () => {
  const addBeatmaps = useBeatMapStore(state => state.addBeatmaps)
  const beatmaps = useBeatMapStore(state => state.beatmaps)
  const refresh = useBeatMapStore(state => state.refresh)
  return {
    beatmaps,
    refresh,
    addBeatmaps,
  }
}