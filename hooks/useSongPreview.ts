import { use, useCallback, useEffect, useMemo, useState } from "react";
import { create } from "zustand";
import { useGlobalAudioPlayer } from 'react-use-audio-player';

interface SongPreview {
    previewURL: string;
    coverURL?: string;
    id: string;
}
export const useSongPreviewState = create<{
    currentSong: SongPreview | null;
    setCurrentSong: (song: SongPreview|null) => void;
}>()(
    (set) => ({
        currentSong: null,
        setCurrentSong: (song:SongPreview|null) => set(() => {
            return {currentSong:song}
        }),
    })
)

type State = {
    loaded: boolean;
    playing: boolean;
    loading: boolean;
    error: boolean;
}
const StateFSM = {
    INIT: {
        loaded: false,
        playing: false,
        loading: false,
        error: false,
    },
    LOADING: {
        loaded: false,
        playing: false,
        loading: true,
        error: false,
    },
    LOADED: {
        loaded: true,
        playing: false,
        loading: false,
        error: false,
    },
    PLAYING: {
        loaded: true,
        playing: true,
        loading: false,
        error: false,
    },
    ERROR: {
        loaded: false,
        playing: false,
        loading: false,
        error: true,
    },

}
export const useSongPreview = () => {

    const {setCurrentSong} = useSongPreviewState();
    const currentSong = useSongPreviewState((state) => state.currentSong)
    const {load,play,stop} = useGlobalAudioPlayer();
    const [state, setState] = useState<State>(StateFSM.INIT)
  const plays = useCallback((song: SongPreview) => {
    setCurrentSong(song);
    if(!song.previewURL) return;
    setState(StateFSM.LOADING)
    load(song.previewURL, {
        autoplay: true,
        onload: () => {
            setState(StateFSM.LOADED)
        },
        onplay: () => {
            setState(StateFSM.PLAYING)
        },
        onpause: () => {
            setCurrentSong(null);
            setState(StateFSM.INIT)
        },
        onstop: () => {
            setCurrentSong(null)
            setState(StateFSM.INIT)
        },
        onend: () => {
            setCurrentSong(null)
            setState(StateFSM.INIT)
        },
        
    });
    play();
  }, [setCurrentSong, load,play]);
  return {
    currentSong,
    "play":plays,
    state,
    stop,
  }
}