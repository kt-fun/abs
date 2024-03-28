import  {Card} from "@/components/ui/card";
import * as MapMetaLabel from "@/components/shared/labels/BSMapMetaLabels";
import {BSMapCountLabel} from "@/components/shared/labels/BSLabel";
import { BSUserWithStats } from "@/interfaces/beatsaver-user";
import {escapeHtml} from "@/lib/ContentEscape";


export default function BSMapperSideBar(
    {bsMapper}:{bsMapper:BSUserWithStats}
){
    return (
        <>
        <Card className=" group flex flex-col w-[256px] xl:w-[256px] rounded-lg" >
          <div
            className="h-[256px] xl:h-[256px] z-0 rounded-t-lg"
            style={{
                backgroundImage: `url('${bsMapper.avatar}')`,
                backgroundSize: 'cover',
            }}
          />
          <div className="p-2">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg line-clamp-3 text-ellipsis">
                        {bsMapper.name}
                    </span>
                </div>
                <div className="">
                    <div className="font-medium text-xs">
                        followers: {bsMapper.followData!.followers}
                    </div>
                    {
                        bsMapper.followData!.follows &&
                        <span className="font-medium text-xs">
                        following: {bsMapper.followData!.follows}
                        </span>
                    }
                </div>
                <div className="grid grid-cols-2 gap-1 justify-center">
                    <BSMapCountLabel count={bsMapper.stats!.totalMaps}/>
                    <MapMetaLabel.BSRatingLabel rate={bsMapper.stats!.avgScore/100} tooltip={"rate"}/>
                    <MapMetaLabel.ThumbUpCountLabel count={bsMapper.stats!.totalUpvotes}/>
                    <MapMetaLabel.ThumbDownCountLabel count={bsMapper.stats!.totalDownvotes}/>
                </div>
            <div className="flex flex-col justify-between  h-full pt-auto pb-0">
              {/*<p className="text-ellipsis overflow-hidden text-xs">*/}
              {/*  {bsMapper.description == "" ? "No description" : bsMapper.description}*/}
              {/*</p>*/}
              <p
                className="text-ellipsis overflow-hidden text-xs"
                dangerouslySetInnerHTML={{__html: escapeHtml(bsMapper.description)}}
              />
            </div>
          </div>
        </Card>
        </>
    )
}