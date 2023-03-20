import { formatDistanceToNow } from "date-fns";
import { enIN } from "date-fns/locale";

function NoticationItem({ details, onClick }) {
    return (
        <div onClick={() => onClick()} className="p-2 px-4 cursor-pointer font-light hover:bg-slate-900">
            <div className="flex items-center justify-between gap-4">
                <p className="line-clamp-1 font-medium text-gray-300">{details?.title || ""}</p>
                <span className="text-xs text-gray-400">
                    {!!details?.time
                        ? formatDistanceToNow(new Date(details?.time), {
                              includeSeconds: true,
                              addSuffix: "ago",
                              locale: enIN,
                          })
                        : ""}
                </span>
            </div>
            <p className="line-clamp-1 italic text-sm text-gray-400">{details?.description || ""}</p>
        </div>
    );
}

export default NoticationItem;
