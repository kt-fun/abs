import { useCallback, useState } from "react";
import { create } from "zustand";
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import {BSBeatMap, getBSMapCoverURL} from "@/interfaces/beatmap";

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

interface PlayInfo {
  id: string,
  previewURL: string,
  coverURL: string,
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
    const playPreview = useCallback((playInfo:PlayInfo) => {
      if(state.playing && currentSong?.id == playInfo.id){
        stop()
      }else{
        plays(playInfo)
      }
    },[currentSong?.id, plays, state.playing, stop])
  return {
    currentSong,
    "play":plays,
    playPreview,
    state,
    stop,
  }
}


export const useBSMapSongPreview = (bsMap:BSBeatMap)=> {
  const bg = getBSMapCoverURL(bsMap)
  const {currentSong,state,playPreview,stop} = useSongPreview()
  const handlePlaySongPreview = useCallback(() => {
    playPreview({
      id:bsMap.id,
      previewURL:bsMap.versions[0].previewURL,
      coverURL:bg,
    })
  },[bg, bsMap.id, bsMap.versions, playPreview])

  return {
    play: handlePlaySongPreview,
    current: currentSong?.id == bsMap.id,
    loading: state.loading
  }

}