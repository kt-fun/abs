import {AnimatePresence, motion, useAnimationControls, Variants} from "framer-motion";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useTranslation} from "@/hooks/useTranslation";
import {ListFilter} from "lucide-react";
import {BSGenreTags, BSStyleTags} from "@/interfaces/mapTags";
import BSMapTag from "@/components/BSMapTag";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {BSMapQueryOptions, FeatureOption, MapQueryParam} from "@/interfaces/bsmap-query-param";

type FeatureFilterProps = {
  queryParam: MapQueryParam,
  onUpdateQueryParam:(queryParam:MapQueryParam) => void
} & React.HTMLAttributes<HTMLDivElement>

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};
// const containerVariant = {
//   open: (height = 1000) => ({
//     clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
//     // clipPath: "inset(0% 0% 0% 0% round 10px)",
//     transition: {
//       type: "spring",
//       bounce: 0,
//       duration: 0.7,
//     }
//   }),
//   closed: {
//     clipPath: "circle(30px at 10px 0px)",
//     // clipPath: "inset(10% 50% 90% 50% round 10px)",
//     transition: {
//       type: "spring",
//       bounce: 0,
//       duration: 0.3
//     }
//   }
// }
const containerVariant = {
  open: {
    clipPath: "inset(0% 0% 0% 0% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05
    }
  },
  closed: {
    clipPath: "inset(10% 50% 90% 50% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3
    }
  }
}
const FeatureFilter = React.forwardRef<HTMLDivElement, FeatureFilterProps>((
  {
    queryParam,
    onUpdateQueryParam,
    ...props
  }:FeatureFilterProps,
  ref
)=> {
  const {t} = useTranslation()
  const [isOpen,setIsOpen] = useState(false)
  let controls = useAnimationControls();
  useEffect(() => {
    isOpen && controls.start("open")
  }, [controls, isOpen]);
  const containerRef = useRef(null)
  // const {height} = useDimensions(containerRef)
  const checkIfOptionChecked = useCallback((option:FeatureOption)=>{

    console.log("options",queryParam.options)
    if (!queryParam.options) return false


    return queryParam.options[option.label as keyof typeof queryParam.options] == true
  },[queryParam])
  const handleOptionChange = (option:FeatureOption)=>{
    const checked = checkIfOptionChecked(option)
    onUpdateQueryParam({
      ...queryParam,
      options: {
        ...queryParam.options,
        [option.label]: !checked
      }
    })
  }

  const [selectedStyleTags, setSelectedStyleTags] = useState<string[]>([])
  const [selectedGenreTags, setSelectedGenreTags] = useState<string[]>([])

  const handleStyleTagChange = (tag:string)=>{
    if (selectedStyleTags.includes(tag)){
      setSelectedStyleTags(selectedStyleTags.filter((t)=>t!=tag))
    }else{
      setSelectedStyleTags([...selectedStyleTags,tag])
    }
  }
  const handleGenreTagChange = (tag:string)=>{
    if (selectedGenreTags.includes(tag)){
      setSelectedGenreTags(selectedGenreTags.filter((t)=>t!=tag))
    }else{
      setSelectedGenreTags([...selectedGenreTags,tag])
    }
  }
  return (
    <>
      <div
        {...props}
        className={cn("flex items-center text-xs relative",props.className)}
        // ref={ref}
        ref={containerRef}
      >
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <motion.div layout className={"text-xs rounded-full p-1 px-2 bg-zinc-100 dark:bg-zinc-700/70 cursor-pointer flex items-center space-x-1"}>
              <ListFilter className={"h-4 w-4"}/>
              <span>{t('filter')}</span>
            </motion.div>
          </PopoverTrigger>
          <AnimatePresence>
            {
              isOpen &&
                <PopoverContent asChild>
                    <motion.div
                        className={"z-10 bg-zinc-100/70 dark:bg-zinc-900/70  p-2 m-2 rounded-lg mt-1 overflow-hidden text-left shadow backdrop-blur max-w-80"}
                        initial="closed"
                        animate={controls}
                        // custom={height}
                        exit="closed"
                        variants={containerVariant}
                    >
                        <div className={""}>
                            <div>
                              {t('style.selector')}
                            </div>
                            <div className={"flex flex-row flex-wrap gap-1"}>
                              {
                                BSStyleTags.map((tag) =>
                                  <span
                                    key={tag.slug}
                                    onClick={() => {
                                      handleStyleTagChange(tag.slug)
                                    }}
                                  >
                                <BSMapTag
                                  className={`${selectedStyleTags.includes(tag.slug) ? '' : 'opacity-40'} px-1  text-xs`}
                                  tag={tag}/>
                                  </span>
                          )
                          }
                            </div>
                        </div>
                        <div className={""}>
                            <div>
                              {t('genre.selector')}
                            </div>
                            <div className={"flex flex-row flex-wrap gap-1"}>
                              {
                                BSGenreTags.map((tag) =>
                                  <span
                                    key={tag.slug}
                                    onClick={()=>{handleGenreTagChange(tag.slug)}}
                                  >
                                  <BSMapTag
                                    className={`${selectedGenreTags.includes(tag.slug) ? '' : 'opacity-40'} px-1  text-xs`}
                                    tag={tag}/>
                                  </span>

                                )
                              }
                            </div>
                        </div>
                        <div>
                            <div>
                              {t('genre.selector')}
                            </div>

                            <div className={"flex flex-row flex-wrap gap-1"}>
                              {
                                BSMapQueryOptions.map((option) => {
                                  return (
                                    <motion.span
                                      key={option.label}
                                      onClick={() => {
                                        handleOptionChange(option)
                                      }}
                                      className={`${checkIfOptionChecked(option) ? '' : 'opacity-40'}  text-xs px-1 text-white rounded-md p-0.5 bg-green-600 inline-flex items-center justify-center space-x-1 cursor-pointer`}>
                                      {option.label}
                                    </motion.span>
                                  )
                                })
                              }
                            </div>
                        </div>

                    </motion.div>
                </PopoverContent>
            }
          </AnimatePresence>
        </Popover>
      </div>
    </>
  )
})

FeatureFilter.displayName = "FeatureFilter"

export default React.memo(motion(FeatureFilter))